import { useEffect } from "react";
import { MessageTypes} from "../../shared/messages";

function useCurrentVideo(){
    useEffect(() => {
        async function loadVideo() {
            try {
                const response = await chrome.runtime.sendMessage({
                    type: MessageTypes.GET_ACTIVE_VIDEO,
                });

                console.log("Popup received:", response);
            } catch (error) {
                console.error("Failed to fetch active video:", error);
            }
        }

        loadVideo();
    }, []);
}

export default useCurrentVideo;