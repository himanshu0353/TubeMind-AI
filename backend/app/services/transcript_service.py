from youtube_transcript_api import (
    YouTubeTranscriptApi,
    TranscriptsDisabled,
    NoTranscriptFound,
    VideoUnavailable,
)

from app.exceptioning.transcript_exception import (
    TranscriptError,
    TranscriptDisabledError,
    TranscriptNotFoundError,
    VideoUnavailableError,
)

from app.models.transcript.transcript_response import TranscriptSegment


class TranscriptService:
    def get_transcript(self, video_id: str) -> list[TranscriptSegment]:
        raise TranscriptError(
            "Server-side YouTube transcript extraction is disabled. Transcripts must be extracted by the client extension."
        )