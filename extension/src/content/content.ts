import { registerMessageListener } from "./messaging/registerMessageListener";
import { getCurrentVideo } from "./youtube/CurrentVideo";



function logCurrentVideo() {
  console.log(getCurrentVideo());
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