
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
):Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`,{
        headers:{
            "content-Type":"application/json",
            ...(options?.headers || {}),
        },
        ...options
    });

    if (!response.ok){
        const error = await response.json();

        throw new Error(error.detail || "Request failed");
    }

    return response.json()
}