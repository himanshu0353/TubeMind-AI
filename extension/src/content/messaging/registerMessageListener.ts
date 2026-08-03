import { getTranscript } from "../youtube/transcript";
import { MessageTypes, type CurrentVideoResponse, type TranscriptResponse } from "../../shared/messages";
import { getCurrentVideo } from "../youtube/CurrentVideo";


export function registerMessageListener(){
    chrome.runtime.onMessage.addListener(
        (message, _sender, sendResponse) => {
            if(message.type === MessageTypes.GET_CURRENT_VIDEO){
                const response: CurrentVideoResponse = getCurrentVideo();

                sendResponse(response);
                return true;
            }

            if(message.type === MessageTypes.GET_TRANSCRIPT){
                const videoId = message.videoId || getCurrentVideo().videoId;
                if (!videoId) {
                    sendResponse({ transcript: [], error: "No active video ID" } as TranscriptResponse);
                    return true;
                }

                getTranscript(videoId)
                    .then((transcript) => {
                        const response: TranscriptResponse = { transcript };
                        sendResponse(response);
                    })
                    .catch((error) => {
                        console.error('Failed to fetch transcript of this video!', error);
                        const response: TranscriptResponse = {
                            transcript: [],
                            error: error instanceof Error ? error.message : "Failed to extract transcript",
                        }; 
                        sendResponse(response);
                    });
                return true;
            }
            return false;
        }
    );
}


