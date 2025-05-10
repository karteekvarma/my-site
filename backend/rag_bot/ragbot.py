
import os
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

# === Paths ===
BASE_DIR = os.path.dirname(__file__)
CACHE_DIR = os.path.join(BASE_DIR, "cache_dir")
persist_directory = os.path.join(BASE_DIR, "chroma_store")

# === Tokenizer ===
tokenizer = AutoTokenizer.from_pretrained(
    "microsoft/phi-2",
    cache_dir=CACHE_DIR
)
tokenizer.pad_token = tokenizer.eos_token

# === Optional Quantization Config (for GPU use only) ===
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16
)

# === Model ===
model = AutoModelForCausalLM.from_pretrained(
    "microsoft/phi-2",
    cache_dir=CACHE_DIR,
    device_map="auto"
)

# === Embedding model + Chroma vector DB ===
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

db = Chroma(
    persist_directory=persist_directory,
    embedding_function=embedding_model,
    collection_name="karteek_context"
)