from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_google_genai import ChatGoogleGenerativeAI

from app.core.config import settings
from app.rag.prompts import RAG_PROMPT

class RetrievalChain:

    def __init__(self):

        self.llm = ChatGoogleGenerativeAI(
            model = settings.GEMINI_MODEL,
            google_api_key = settings.GEMINI_API_KEY,
            temperature = 0,
        )

    def build(self, retriever,):
        document_chain = create_stuff_documents_chain(
            self.llm,
            RAG_PROMPT,
        )

        return create_retrieval_chain(retriever, document_chain)

        