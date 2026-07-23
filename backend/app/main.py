from fastapi import FastAPI
from app.api.transcript import router as transcript_router

app = FastAPI(
    title = "TubeMind AI API",
    version = '1.0.0',
    description= 'Backend API for TubeMind AI'
)

app.include_router(transcript_router)

@app.get('/')
async def root():
    return {
        'message':'TubeMind AI is running'
    }