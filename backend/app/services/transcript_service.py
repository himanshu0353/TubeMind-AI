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

    # Production language preference
    PREFERRED_LANGUAGES = [
        "en",
        "en-US",
        "en-GB",
        "hi",
    ]

    def __init__(self):
        self.ytt_api = YouTubeTranscriptApi()

    def _convert_segments(self, transcript):
        return [
            TranscriptSegment(
                text=snippet.text,
                start=snippet.start,
                duration=snippet.duration,
            )
            for snippet in transcript
        ]

    def get_transcript(self, video_id: str) -> list[TranscriptSegment]:

        try:
            # First try preferred languages
            transcript = self.ytt_api.fetch(
                video_id,
                languages=self.PREFERRED_LANGUAGES,
            )

            return self._convert_segments(transcript)

        except NoTranscriptFound:

            # Fall back to any available transcript
            try:
                transcript_list = self.ytt_api.list(video_id)

                available = list(transcript_list)

                if not available:
                    raise TranscriptNotFoundError(
                        "No transcript available for this video."
                    )

                transcript = available[0].fetch()

                return self._convert_segments(transcript)

            except NoTranscriptFound:
                raise TranscriptNotFoundError(
                    "No transcript found for this video."
                )

        except TranscriptsDisabled:
            raise TranscriptDisabledError(
                "Transcript is disabled for this video."
            )

        except VideoUnavailable:
            raise VideoUnavailableError(
                "Video is unavailable."
            )

        except Exception as e:
            raise TranscriptError(
                f"Failed to fetch transcript: {e}"
            ) from e