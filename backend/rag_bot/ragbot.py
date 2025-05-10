# loader

from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

import torch

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("microsoft/phi-2")
tokenizer.pad_token = tokenizer.eos_token


bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16
)

model = AutoModelForCausalLM.from_pretrained(
    "microsoft/phi-2",
    device_map="auto",
    quantization_config=bnb_config,
    offload_folder="./offload"
)

# Load embedding model and persistent vector DB
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")


db = Chroma(
    persist_directory="C:\\Users\\varma\\my-site\\backend\\chroma_store",
    embedding_function=embedding_model,
    collection_name="karteek_context"
)

#import os
#print(os.listdir("./chroma_store"))

# turn your vectorstore into a retriever
#retriever = db.as_retriever(search_kwargs={"k": 1})

# quick check—run this once in a REPL or at module import time:
# docs = retriever.get_relevant_documents("Where does he live?")
# print(f"🔥 Retrieved {len(docs)} docs!")
# for d in docs:
#     print("→", d.page_content[:200].replace("\n"," "), "…")
