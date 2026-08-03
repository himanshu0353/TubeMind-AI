from fastapi import APIRouter, HTTPException

from app.models.chat.chat_request import ChatRequest
from app.models.chat.chat_response import ChatResponse

from app.services.transcript_service import TranscriptService
from app.rag.rag_pipeline import RAGPipeline
from app.rag.chat_service import ChatServices

from app.services.transcript_service import TranscriptService
from app.rag.retrieval_chain import RetrievalChain

router = APIRouter(
    prefix = "/chat",
    tags = ["Chat"],
)


rag_pipeline = RAGPipeline()
retrival_chain = RetrievalChain()

@router.post(
    "",
    response_model=ChatResponse,
)
def chat(request: ChatRequest):

    try:

        
        retriever = rag_pipeline.get_retriever(
            request.video_id,
            request.transcript,
        )
        docs = retriever.invoke(request.question)

        print("=" * 80)
        print(f"Retrieved {len(docs)} documents")

        for i, doc in enumerate(docs):
            print(f"\n------ Document {i+1} ------")
            print(doc.page_content)
        print("=" * 80)

        chain = retrival_chain.build(
            retriever,
        )

        chat_service = ChatServices(
            chain,
        )

        response = chat_service.ask(
            request.question,
        )

        return ChatResponse(
            answer = response['answer'],
        )

    

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )