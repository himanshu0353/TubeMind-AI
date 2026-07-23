from langchain_core.documents import Document
from app.models.transcript.transcript_response import TranscriptSegment


class DocumentBuilder:
    @staticmethod
    def build(
        transcript: list[TranscriptSegment],
    ) -> list[Document]:

        document = []

        for segment in transcript:
            document.append(
                Document(
                    page_content=segment.text,
                    metadata = {
                        'start': segment.start,
                        'duration':segment.duration,
                    },
                )
            )

        return document
    