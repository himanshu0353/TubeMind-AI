from langchain_huggingface import HuggingFaceEmbeddings
from app.core.config import settings

class EmbeddingService:
    def __init__(self):
        self._embeddings = None

    def get_embedding(self):
        if self._embeddings is None:
            self._embeddings = HuggingFaceEmbeddings(
                model_name = settings.EMBEDDING_MODEL,
                model_kwargs = {
                    "device": "cpu",
                },
                encode_kwargs = {
                    "normalize_embeddings": True
                },
            )
        return self._embeddings