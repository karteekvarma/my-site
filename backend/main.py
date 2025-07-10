import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from rag_bot.ragbot import db
from pathlib import Path
from requests.exceptions import HTTPError

# Force loading the correct file from the rag_bot folder
env_path = Path(__file__).resolve().parent / "rag_bot" / "rag-bot-key.env"
load_dotenv(dotenv_path=env_path)


MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
print("🔑 MISTRAL_API_KEY:", MISTRAL_API_KEY[0:] + "..." if MISTRAL_API_KEY else "NOT FOUND")
      
MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"
MISTRAL_HEADERS = {
    "Authorization": f"Bearer {MISTRAL_API_KEY}",
    "Content-Type": "application/json"
}

def query_mistral_api(prompt: str) -> str:
    payload = {
        "model": "mistral-small-2503",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant. Answer strictly from the given information as per the question."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.75,
        "max_tokens": 250
    }

    response = requests.post(MISTRAL_API_URL, headers=MISTRAL_HEADERS, json=payload)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

# === FastAPI app ===
app = FastAPI()

# === CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173",
        "https://karteekvarma.github.io"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Pydantic model ===
class ChatRequest(BaseModel):
    message: str

# === Chat endpoint ===
@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        query = req.message
        retrieved_docs = db.similarity_search(query, k=2)
        context = "\n\n".join([doc.page_content for doc in retrieved_docs])

        #print(f"📄 Retrieved context:\n{context}\n{'='*80}")

        if not context.strip():
            return {"response": "No relevant documents found. Please rephrase your question."}

        prompt = f"""Use the following context to answer the question. If the context is insufficient, question asked should be politely rejected mentioning that the question is out of scope and not enough information is available, and instead the user can ask more about the projects or educational background.

Context:
{context}

Question: {query}"""

        response = query_mistral_api(prompt)
        response = response[:response.rfind('.')] + '.' if '.' in response else response
        return {"response": response.strip()}

    except HTTPError as http_err:
        print("🚨 HTTPError:", http_err)
        print("🚨 Response body:", http_err.response.text)
        return {"response": "Oops! Mistral API error: " + http_err.response.text}
    except Exception as e:
        print("🚨 General Error in /chat:", e)
        return {"response": "Oops! Internal error: " + str(e)}

# === Static frontend support ===
frontend_path = os.path.join(os.path.dirname(__file__), "../frontend/dist")
assets_path = os.path.join(frontend_path, "assets")

if os.path.exists(assets_path):
    app.mount("/assets", StaticFiles(directory=assets_path), name="assets")
else:
    print(f"⚠️ Warning: Static assets not found at {assets_path}")

@app.get("/")
async def serve_index():
    return FileResponse(os.path.join(frontend_path, "index.html"))

@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    return FileResponse(os.path.join(frontend_path, "index.html"))
