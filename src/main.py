from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This defines the expected shape of the request body
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    user_message = req.message
    return {"response": f"From Backend: I heard you say {user_message}"}

###########################################################################

######## Just a simple endpoint to test the server and your skills#########

###########################################################################

#@app.get("/mimic")
#async def mimic(message: str):
    #user_message = message
    #return {"response": {user_message}}

###########################################################################
###########################################################################
###########################################################################
