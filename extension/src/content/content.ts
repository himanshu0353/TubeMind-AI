import { MessageTypes,
    type CurrentVideoResponse,
 } from "../shared/messages";

function registerMessageListener() {
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
        if(message.type === MessageTypes.GET_CURRENT_VIDEO ){
            const response: CurrentVideoResponse = {
                videoId: getCurrentVideoID(),
                url: window.location.href,
            }
            sendResponse(response)
        }

        return true;
    });
}

function getCurrentVideoID() : string | null {
    const url = new URL(window.location.href)

    return url.searchParams.get("v")
}

function logCurrentVideo() {
  console.log("Current URL:", window.location.href);

  console.log("Video ID:", getCurrentVideoID());
}

function init(){
    console.log('TubeMind content script injected');
    
    logCurrentVideo();
    registerMessageListener()
    document.addEventListener('yt-navigate-finish', () => {
        console.log('Youtube navigation');

        logCurrentVideo();
    });

}

init();