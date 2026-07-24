import { useState } from "react";
import { askQuestion } from "../../api/chat";

export function useChat(){
    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("")

    const ask = async (videoId: string, requestedQuestion = question): Promise<string | null> => {
        const trimmedQuestion = requestedQuestion.trim();
        if(!trimmedQuestion || !videoId) return null;

        setLoading(true);

        setError("");

        try{
            const response = await askQuestion({
                video_id: videoId,
                question: trimmedQuestion,
            });

            setAnswer(response.answer);
            return response.answer;
        }catch(err){
            setError(
                err instanceof Error 
                ? err.message
                : "Somethinf went wrong"
            );
            return null;
        }finally{
            setLoading(false)
        }
    };

    return {
        question,
        setQuestion,
        answer,loading,
        error, ask,
    };

}