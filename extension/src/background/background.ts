import { MessageTypes } from "../shared/messages";
import {handleGetActiveVideo} from "./handlers/handleGetActiveVideo"

console.log('background is running');

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if(message.type === MessageTypes.GET_ACTIVE_VIDEO){
    handleGetActiveVideo(sendResponse);

    return true;
  }
})
