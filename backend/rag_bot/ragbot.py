from pathlib import Path
from langchain_chroma import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from dotenv import load_dotenv
import os

# Load .env
load_dotenv()

# Paths
BASE_DIR = Path(__file__).resolve().parent
persist_directory = os.getenv("CHROMA_DIR", str(BASE_DIR / "chroma_store"))

# ✅ Always load embeddings
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-MiniLM-L3-v2")

# Vector DB
db = Chroma(
    persist_directory=persist_directory,
    embedding_function=embedding_model,
    collection_name="karteek_context"
)
