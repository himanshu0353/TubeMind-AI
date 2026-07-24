from fastapi import FastAPI
from app.api.transcript import router as transcript_router
from app.api.chat import router as chat_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title = "TubeMind AI API",
    version = '1.0.0',
    description= 'Backend API for TubeMind AI'
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "chrome-extension://lpfbhkhkenbbmagebdpkaoklocpcmehp",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transcript_router)
app.include_router(chat_router)

@app.get('/')
async def root():
    return {
        'message':'TubeMind AI is running'
    }