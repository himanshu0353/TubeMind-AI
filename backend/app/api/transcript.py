#its only routes, this file does not fetch transcript itself. It delegates it work to Service layer.

from fastapi import APIRouter, HTTPException
from app.models.transcript.transcript_request import TranscriptRequest
from app.services.transcript_service import TranscriptService
from app.exceptioning.transcript_exception import (
     TranscriptError,
     TranscriptDisabledError,
     TranscriptNotFoundError,
     VideoUnavailableError,
)

router = APIRouter(
    prefix = '/transcript',
    tags = ['Transcript'],
)
transcript_service = TranscriptService()

@router.post('/')
async def get_transcript(request: TranscriptRequest):
    try:
        transcript = transcript_service.get_transcript(
            request.videoId
        )

        return {
        'transcript': transcript
        }

    except TranscriptNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

    except TranscriptDisabledError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except VideoUnavailableError as e:
        raise HTTPException(status_code=404, detail=str(e))

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Internal Server Error"
        )