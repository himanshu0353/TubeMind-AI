
export enum MessageTypes {
    GET_CURRENT_VIDEO = 'GET_CURRENT_VIDEO',
    GET_ACTIVE_VIDEO = 'GET_ACTIVE_VIDEO',
    GET_TRANSCRIPT = 'GET_TRANSCRIPT',
}

export interface TranscriptSegment {
    text: string;
    start: number;
    duration: number;
}

export interface GetCurrentVideoRequest {
    type: MessageTypes.GET_CURRENT_VIDEO;
}

export interface CurrentVideoResponse {
    videoId: string | null;
    url: string;
    title: string | null;

    channelName: string | null;
    thumbnail: string | null;
    isShort: boolean;
}

export interface GetTranscriptRequest {
    type: MessageTypes.GET_TRANSCRIPT;
    videoId: string;
}

export interface TranscriptResponse {
    transcript: TranscriptSegment[];
    error?: string;
}


