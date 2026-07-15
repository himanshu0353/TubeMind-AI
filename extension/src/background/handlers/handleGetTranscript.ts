
import {
    MessageTypes,
    type GetTranscriptRequest,
    type TranscriptResponse,
} from "../../shared/messages";

export async function handleGetTranscript() : Promise<TranscriptResponse>{
    const [activeTab] = await chrome.tabs.query({
        active:true,
        currentWindow  : true,
    });

    if(!activeTab?.id){
        throw new Error('No active tab found ');
    }

    const request: GetTranscriptRequest ={
        type: MessageTypes.GET_TRANSCRIPT,
    };

    const response = await chrome.tabs.sendMessage<GetTranscriptRequest,TranscriptResponse>
        (activeTab.id, request);

    return response;
}