
export enum MessageTypes {
    GET_CURRENT_VIDEO= 'GET_CURRENT_VIDEO',
    GET_ACTIVE_VIDEO = 'GET_ACTIVE_VIDEO'
}

export interface GetCurrentVideoRequest{
    type : MessageTypes.GET_CURRENT_VIDEO;
}

export interface CurrentVideoResponse{
    videoId : string | null;
    url :string;
}