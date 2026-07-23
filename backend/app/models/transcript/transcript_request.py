from pydantic import BaseModel


class TranscriptRequest(BaseModel):
    videoId: str