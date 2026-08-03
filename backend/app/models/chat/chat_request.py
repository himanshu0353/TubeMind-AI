from typing import List, Optional
from pydantic import BaseModel
from app.models.transcript.transcript_response import TranscriptSegment

class ChatRequest(BaseModel):
    video_id: str
    question: str
    transcript: Optional[List[TranscriptSegment]] = None