import { MessageTypes,
    type CurrentVideoResponse,
 } from "../shared/messages";

function registerMessageListener() {
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
        console.log('message received:', message);
        if(message.type === MessageTypes.GET_CURRENT_VIDEO ){
            const response: CurrentVideoResponse = {
                videoId: getCurrentVideoID(),
                url: window.location.href,
                title:document.title,

                channelName : getChannelName(),
                thumbnail : getThumbnail(),
                isShort : getIsShort(),
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

function getChannelName(): string | null{
    const channel = document.querySelector(
        "#owner #channel-name a"
    );
    return channel?.textContent?.trim()?? null;
}

function getThumbnail(): string | null {
    const videoId = getCurrentVideoID();

    if(!videoId){
        return null;
    }

    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function getIsShort(): boolean{
    return window.location.pathname.startsWith("/shorts/");
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