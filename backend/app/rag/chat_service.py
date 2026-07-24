from langchain_classic.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI
from app.rag.retrieval_chain import RetrievalChain

class ChatServices:

    def __init__(self,chain):
        self.chain = chain

    def ask(
            self, question :str,
    ):

        
        response = self.chain.invoke(
            {
                "input": question,
            }
        )

        return {
            "answer": response['answer'],
            "context": response['context'],
        }