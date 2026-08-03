import { apiFetch } from "./client";
import type { TranscriptSegment } from "../shared/messages";

export interface ChatRequest {
    video_id : string;
    question : string;
    transcript?: TranscriptSegment[];
}

export interface ChatResponse {
    answer: string;
}

export async function askQuestion(
    request : ChatRequest
): Promise<ChatResponse>{
    return apiFetch<ChatResponse>('/chat', {
        method : "POST",
        body: JSON.stringify(request),
    });
}