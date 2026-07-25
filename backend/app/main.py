from fastapi import FastAPI
from app.api.transcript import router as transcript_router
from app.api.chat import router as chat_router
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(
    title="TubeMind AI API",
    version="1.0.0",
    description="Backend API for TubeMind AI",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_origin_regex=settings.ALLOW_ORIGIN_REGEX or None,
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