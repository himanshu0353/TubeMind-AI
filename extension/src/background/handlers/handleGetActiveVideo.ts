import { MessageTypes, type CurrentVideoResponse } from "../../shared/messages";

export async function handleGetActiveVideo(
    sendResponse:(response:CurrentVideoResponse | null) => void
){
    const[tab] = await chrome.tabs.query({
        active:true,
        currentWindow:true
    });

    if(!tab?.id){
        sendResponse(null);

        return;
    }

    try{
        const response = await chrome.tabs.sendMessage(
            tab.id,
            {
                type:MessageTypes.GET_CURRENT_VIDEO,
            }
        );

        sendResponse(response);
    }catch(error){
        console.error(error);

        sendResponse(null);
    }
}