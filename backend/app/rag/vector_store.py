from pathlib import Path

from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS

class VectorStore:
    def __init__(self, embedding_service):
        self.embedding_service = embedding_service
        self.vector_store = None

        self.storage_path = Path("storage/faiss")

    @property
    def embeddings(self):
        if callable(self.embedding_service):
            return self.embedding_service()
        elif hasattr(self.embedding_service, "get_embedding"):
            return self.embedding_service.get_embedding()
        return self.embedding_service

    def _get_video_path(
            self, 
            video_id: str,
    )->Path:
        return self.storage_path/video_id

    def exists(self, video_id:str)->bool:
        return self._get_video_path(video_id).exists()

    def create(self,video_id:str, documents:list[Document],):
        self.vector_store = FAISS.from_documents(
            documents,
            self.embeddings,
        )

        self.save(video_id)

    def save(self, video_id:str,):
        path = self._get_video_path(video_id)

        path.mkdir(
            parents=True,
            exist_ok=True,
        )

        self.vector_store.save_local(str(path))

    def load(
            self, video_id:str,
    ):
        path=self._get_video_path(video_id)

        self.vector_store = FAISS.load_local(
            str(path),
            self.embeddings,
            allow_dangerous_deserialization=True,
        )

    def get_retriever(self, search_kwargs: dict | None =None,):
        search_type='mmr'
        if search_kwargs is None:
            search_kwargs ={
                "k":20,
            }

        return self.vector_store.as_retriever(
            search_kwargs= search_kwargs,
        )
    