import os
from pathlib import Path
from langchain_chroma import Chroma

# Optional: Load from .env
from dotenv import load_dotenv
load_dotenv()

# Directory setup
BASE_DIR = Path(__file__).resolve().parent
persist_directory = os.getenv("CHROMA_DIR", str(BASE_DIR / "chroma_store"))

# Only load embeddings if needed
RUNNING_ON_RENDER = os.getenv("RENDER_EXTERNAL_URL") is not None


if RUNNING_ON_RENDER:
    # On Render: Don't use an embedding model
    embedding_model = None
else:
    # Local dev: Load embedding model
    from langchain_community.embeddings import HuggingFaceEmbeddings
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-MiniLM-L3-v2")

# Load the Chroma vector DB
db = Chroma(
    persist_directory=persist_directory,
    embedding_function=embedding_model,
    collection_name="karteek_context"
)
