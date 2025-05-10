import torch
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from backend.rag_bot.ragbot import model, tokenizer, db



app = FastAPI()

# Set CORS to allow requests from React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174", "http://127.0.0.1:5174",
        "http://localhost:5173", "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        query = req.message
        retrieved_docs = db.similarity_search(query, k=3)
        context = "\n\n".join([doc.page_content for doc in retrieved_docs])
        print(f"📄 Retrieved context:\n{context}\n{'='*80}")

        prompt = f"""You are an expert assistant who answers strictly based on the provided context. Do not answer from prior knowledge or go outside from the available knowledge.

        Context:
        {context}

        Question: {query}

        Answer:"""

        inputs = tokenizer(
            prompt,
            return_tensors="pt",
            padding=True,
            truncation=True
        ).to(model.device)

        with torch.no_grad():
            output_ids = model.generate(
                input_ids=inputs["input_ids"],
                max_new_tokens=150,
                pad_token_id=tokenizer.eos_token_id,
                eos_token_id=tokenizer.eos_token_id,
            )

        generated_tokens = output_ids[0][inputs["input_ids"].shape[-1]:]
        response = tokenizer.decode(generated_tokens, skip_special_tokens=True).strip()

        for stop in ["Question", "Exercise", '"', '"""#']:
            if stop in response:
                response = response.split(stop)[0].strip()

        return {"response": response}

    except Exception as e:
        print("🚨 Error in /chat:", e)
        return {"response": "Oops! Internal error: " + str(e)}

# ===== Static Frontend Support Below =====

frontend_path = frontend_path = os.path.join(os.path.dirname(__file__), "../frontend/dist")
static_path = os.path.join(frontend_path, "static")

# Mount /static route
if os.path.exists(static_path):
    app.mount("/static", StaticFiles(directory=static_path), name="static")
else:
    print(f"⚠️ Warning: Static files not found at {static_path}")

# Serve the index.html for the root
@app.get("/")
async def serve_index():
    return FileResponse(os.path.join(frontend_path, "index.html"))

# Catch-all for client-side routing
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    return FileResponse(os.path.join(frontend_path, "index.html"))