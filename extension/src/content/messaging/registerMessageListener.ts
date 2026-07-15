import { getTranscript } from "../youtube/transcript";
import { MessageTypes, type CurrentVideoResponse,type TranscriptResponse } from "../../shared/messages";
import { getCurrentVideo } from "../youtube/CurrentVideo";


export function registerMessageListener(){
    chrome.runtime.onMessage.addListener(
        async(message, _sender, sendResponse) => {
            if(message.type === MessageTypes.GET_CURRENT_VIDEO){
                const response: CurrentVideoResponse = getCurrentVideo();

                sendResponse(response)
            }
            return true;

            if(message.type === MessageTypes.GET_TRANSCRIPT){
                try{
                    const transcript = await getTranscript();

                    const response : TranscriptResponse = {
                        transcript
                    };
                    sendResponse(response);
                }catch(error){
                    console.error('Failed to fetch transcript of this video!', error);

                    const response: TranscriptResponse={
                        transcript : "",
                    }; 
                    sendResponse(response);
                }
                return true;
            }
            return false
        }
    );
}

