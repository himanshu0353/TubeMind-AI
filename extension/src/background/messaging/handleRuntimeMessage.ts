
import { MessageTypes } from "../../shared/messages";
import { handleGetActiveVideo } from "../handlers/handleGetActiveVideo";

export function handleRuntimeMessage( 
    message:any,
    _sender : chrome.runtime.MessageSender,
    sendResponse: (response?:any) => void
){
    if(message.type === MessageTypes.GET_ACTIVE_VIDEO){
        handleGetActiveVideo(sendResponse);

        return true;
    }

}