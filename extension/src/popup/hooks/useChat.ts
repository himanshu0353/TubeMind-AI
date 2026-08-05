import { useState } from "react";
import { askQuestion } from "../../api/chat";
import { MessageTypes, type TranscriptResponse } from "../../shared/messages";
import { fetchYouTubeTranscript } from "../../content/youtube/youtubeTranscript";

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
            let transcript: TranscriptResponse["transcript"] = [];

            try {
                const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (activeTab?.id) {
                    const response: TranscriptResponse = await chrome.tabs.sendMessage(activeTab.id, {
                        type: MessageTypes.GET_TRANSCRIPT,
                        videoId,
                    });
                    if (response && Array.isArray(response.transcript) && response.transcript.length > 0) {
                        transcript = response.transcript;
                    }
                }
            } catch (tabErr) {
                console.warn("Tab message failed, executing direct fetchYouTubeTranscript fallback:", tabErr);
            }

            // Direct fallback: if content script message returned no transcript, fetch directly in extension
            if (transcript.length === 0) {
                try {
                    transcript = await fetchYouTubeTranscript(videoId);
                } catch (fetchErr) {
                    console.warn("Direct fetchYouTubeTranscript fallback failed:", fetchErr);
                }
            }

            if (transcript.length === 0) {
                throw new Error("Could not retrieve transcript for this video. Please verify captions/subtitles are enabled on YouTube for this video.");
            }

            const response = await askQuestion({
                video_id: videoId,
                question: trimmedQuestion,
                transcript,
            });

            setAnswer(response.answer);
            return response.answer;
        }catch(err){
            setError(
                err instanceof Error 
                ? err.message
                : "Something went wrong"
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
