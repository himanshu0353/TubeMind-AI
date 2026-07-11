
export enum MessageTypes {
    GET_CURRENT_VIDEO= 'GET_CURRENT_VIDEO',
}

export interface getCurrentVideoRequest{
    type : MessageTypes.GET_CURRENT_VIDEO;
}

export interface CurrentVideoResponse{
    videoId : string | null;
    url :string;
}