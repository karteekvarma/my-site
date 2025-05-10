import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_bot.ragbot import model, tokenizer, db


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174","http://127.0.0.1:5174", "http://localhost:5173","http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    #allow_origins=["*"]  # during debugging only, allows any origin

)

# This defines the expected shape of the request body
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")

async def chat(req: ChatRequest):
    print("🟡 /chat endpoint hit")

    try: 
        query = req.message
        print(f"🟢 User query: {query}")
 
        retrieved_docs = db.similarity_search(query, k=1)
        
        context = "\n\n".join([doc.page_content for doc in retrieved_docs])
        print(f"📄 Retrieved context:\n{context}\n{'='*80}")

        prompt = f"""You are an expert assistant who answers strictly based on the provided context. Do not answer from prior knowledge or go outside from the avaliable knowledge.

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

        for stop in ["Question", "Exercise"]:
            if stop in response:
                response = response.split(stop)[0].strip()

        return {"response": response}

    except Exception as e:
            print("🚨 Error in /chat:", e)
            return {"response": "Oops! Internal error: " + str(e)}
