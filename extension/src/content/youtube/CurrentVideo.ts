import type { CurrentVideoResponse } from "../../shared/messages";

function getCurrentVideoID(): string | null {
    const url = new URL(window.location.href);

    return url.searchParams.get("v");
}

function getCurrentVideoTitle(): string | null {
    const title = document.querySelector(
        "ytd-watch-metadata h1"
    );

    return title?.textContent?.trim() ?? null;
}

function getChannelName(): string | null {
    const channel = document.querySelector(
        "#owner #channel-name a"
    );

    return channel?.textContent?.trim() ?? null;
}

function getThumbnail(): string | null {
    const videoId = getCurrentVideoID();

    if (!videoId) {
        return null;
    }

    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function getIsShort(): boolean {
    return window.location.pathname.startsWith("/shorts/");
}

export function getCurrentVideo(): CurrentVideoResponse {
    return {
        videoId: getCurrentVideoID(),
        url: window.location.href,
        title: getCurrentVideoTitle(),
        channelName: getChannelName(),
        thumbnail: getThumbnail(),
        isShort: getIsShort(),
    };
}