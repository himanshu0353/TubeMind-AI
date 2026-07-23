from youtube_transcript_api import (
    YouTubeTranscriptApi,
    TranscriptsDisabled,
    NoTranscriptFound,
    VideoUnavailable,)

from app.exceptioning.transcript_exception import (
     TranscriptError,
     TranscriptDisabledError,
     TranscriptNotFoundError,
     VideoUnavailableError,
)
from app.models.transcript.transcript_response import TranscriptSegment
class TranscriptService:
        def __init__(self):
            self.ytt_api = YouTubeTranscriptApi()

        def get_transcript(self, video_id :str) -> list[TranscriptSegment]:
            try:
                transcript = self.ytt_api.fetch(video_id)

                segment = []

                for snippet in transcript:
                     segment.append(
                          TranscriptSegment(
                               text = snippet.text,
                               start= snippet.start,
                               duration= snippet.duration,
                          )
                     )

                return segment
            except TranscriptsDisabled:
                raise TranscriptDisabledError(
                         'Transcript is disabled for this video'
                )

            except NoTranscriptFound:
                raise TranscriptNotFoundError(
                     'No transcript found for this video'
                )

            except VideoUnavailable:
                raise VideoUnavailableError(
                     "Video is unavailable for this video"
                )

            except Exception as e:
                 raise Exception(f'Failed to fetch transcript: {str(e)}')