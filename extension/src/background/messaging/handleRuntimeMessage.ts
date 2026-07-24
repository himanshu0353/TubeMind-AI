
import { MessageTypes } from "../../shared/messages";
import { handleGetActiveVideo } from "../handlers/handleGetActiveVideo";
// import { handleGetTranscript } from "../handlers/handleGetTranscript";

export function handleRuntimeMessage( 
    message:any,
    _sender : chrome.runtime.MessageSender,
    sendResponse: (response?:any) => void
){
    if(message.type === MessageTypes.GET_ACTIVE_VIDEO){
        handleGetActiveVideo(sendResponse);
        
        return true;
    }
    // if(message.type === MessageTypes.GET_TRANSCRIPT){
        
            // handleGetTranscript()
            // .then((response) => {
            //     sendResponse(response);
            // })
            // .catch((error)=> {
            //     console.error('failed to load transcript:', error);

            //     sendResponse({
            //         transcript: "",
            //     });
            // });
            // return true;
        // }

}