from pydantic import BaseModel

class TranscriptSegment(BaseModel):
    text : str
    start : float
    duration : float