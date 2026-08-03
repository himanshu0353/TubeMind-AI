import { MessageTypes, type CurrentVideoResponse } from "../../shared/messages";

export async function handleGetActiveVideo(
    sendResponse: (response: CurrentVideoResponse | null) => void
){
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    if (!tab?.id || !tab.url) {
        sendResponse(null);
        return;
    }

    try {
        const response = await chrome.tabs.sendMessage(
            tab.id,
            {
                type: MessageTypes.GET_CURRENT_VIDEO,
            }
        );

        if (response) {
            sendResponse(response);
            return;
        }
    } catch (error) {
        console.warn("Content script message failed, executing tab URL fallback:", error);
    }

    // Fallback: parse video metadata directly from tab URL
    try {
        const urlObj = new URL(tab.url);
        if (urlObj.hostname.includes("youtube.com")) {
            const videoId = urlObj.searchParams.get("v");
            const isShort = urlObj.pathname.includes("/shorts/");
            const shortId = isShort ? urlObj.pathname.split("/shorts/")[1]?.split("?")[0] : null;

            const finalVideoId = videoId || shortId;

            if (finalVideoId) {
                sendResponse({
                    videoId: finalVideoId,
                    url: tab.url,
                    title: tab.title || "YouTube Video",
                    channelName: null,
                    thumbnail: `https://img.youtube.com/vi/${finalVideoId}/hqdefault.jpg`,
                    isShort: Boolean(isShort),
                });
                return;
            }
        }
    } catch (fallbackErr) {
        console.error("Fallback URL parsing failed:", fallbackErr);
    }

    sendResponse(null);
}