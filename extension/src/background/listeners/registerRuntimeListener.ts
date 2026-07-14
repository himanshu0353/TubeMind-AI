
import { handleRuntimeMessage } from "../messaging/handleRuntimeMessage";


export function registerRuntimeListener(){
    chrome.runtime.onMessage.addListener(handleRuntimeMessage);

}