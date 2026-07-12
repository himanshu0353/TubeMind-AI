import { MessageTypes, type CurrentVideoResponse } from "../../shared/messages";

export async function handleGetActiveVideo(
    sendResponse:(response:CurrentVideoResponse | null) => void
){
    const[tab] = await chrome.tabs.query({
        active:true,
        currentWindow:true
    });

    console.log("Active tab:", tab);
    if(!tab?.id){
        sendResponse(null);

        return;
    }

    console.log("Sending message to tab:", tab.id);
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