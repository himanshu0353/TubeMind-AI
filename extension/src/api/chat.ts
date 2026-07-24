import { apiFetch } from "./client";

export interface ChatRequest {
    video_id : string;
    question : string;
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