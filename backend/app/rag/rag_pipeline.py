from app.models.transcript.transcript_response import TranscriptSegment

from app.rag.document_builder import DocumentBuilder
from app.rag.text_splitter import TextSplitter
from app.rag.embedding_service import EmbeddingService
from app.rag.vector_store import VectorStore
from app.services.transcript_service import TranscriptService


class RAGPipeline:

    def __init__(self):
        self.transcript_service = TranscriptService()

        self.document_builder = DocumentBuilder()

        self.text_splitter = TextSplitter()

        self.embedding_service = EmbeddingService()

        self.vector_store = VectorStore(
            self.embedding_service,
        )
        

    def get_retriever(
            self, 
            video_id: str,
            transcript: list[TranscriptSegment] = None,
    ):
        
        if self.vector_store.exists(video_id):
            self.vector_store.load(video_id)
        else:
            if not transcript:
                raise ValueError("Transcript is required for initial video indexing.")

            documents = self.document_builder.build(
                transcript,
            )
            print(f"Documents: {len(documents)}")
            print(documents[0].page_content[:300])

            chunks = self.text_splitter.split(
                documents,
            )
            print(f"Chunks: {len(chunks)}")
            print(chunks[0].page_content[:300])

            self.vector_store.create(
                video_id,
                chunks
            )

        return self.vector_store.get_retriever()