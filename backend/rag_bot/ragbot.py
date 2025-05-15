import os
import requests
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma

from dotenv import load_dotenv
from pathlib import Path

# === Load Mistral API Key from .env ===

load_dotenv(dotenv_path="rag-bot-key.env")


BASE_DIR = Path(__file__).resolve().parent
persist_directory = os.getenv("CHROMA_DIR", str(BASE_DIR / "chroma_store"))



MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"
MISTRAL_HEADERS = {
    "Authorization": f"Bearer {MISTRAL_API_KEY}",
    "Content-Type": "application/json"
}

def query_mistral_api(prompt: str):
    """Query the official Mistral API with context-aware prompt."""
    payload = {
        "model": "mistral-small",  # or mistral-tiny / mistral-medium
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 150
    }

    response = requests.post(MISTRAL_API_URL, headers=MISTRAL_HEADERS, json=payload)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]


embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-MiniLM-L3-v2")
db = Chroma(
    persist_directory=persist_directory,
    embedding_function=embedding_model,
    collection_name="karteek_context"
)

# === Example Usage ===
if __name__ == "__main__":
    query = "Who is Karteek Varma?"
    docs = db.similarity_search(query, k=2)
    print("🔍 Retrieved Chunks:")
    for i, doc in enumerate(docs):
        print(f"Chunk {i+1}:\n{doc.page_content}\n{'='*40}")

    context = "\n\n".join([doc.page_content for doc in docs])

    final_prompt = f"Use the following context to answer the question.\n\nContext:\n{context}\n\nQuestion: {query}"
    result = query_mistral_api(final_prompt)
    print("🤖 Response:", result)
