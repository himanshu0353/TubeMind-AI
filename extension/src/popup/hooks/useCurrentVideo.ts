import { useEffect, useState } from "react";
import { MessageTypes} from "../../shared/messages";

function useCurrentVideo(){
    const [video, setVideo] = useState({
        videoId:"",
    });

    useEffect(() => {
        async function loadVideo() {
            try {
                const response = await chrome.runtime.sendMessage({
                    type: MessageTypes.GET_ACTIVE_VIDEO,
                });
                console.log('video response:', response);
                setVideo(response)
            } catch (error) {
                console.error("Failed to fetch active video:", error);
            }
            
        }
        loadVideo();
    }, []);
    return video;
}

export default useCurrentVideo;