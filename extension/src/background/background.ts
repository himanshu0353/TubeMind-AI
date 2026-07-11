import { MessageTypes } from "../shared/messages";

console.log("🚀 Background started");

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  console.log("Activated Tab:", tabId);

  const tab = await chrome.tabs.get(tabId);

  console.log("Tab URL:", tab.url);

  if (!tab.url?.startsWith("https://www.youtube.com/")) {
    console.log("Not a YouTube tab");
    return;
  }

  try {
    console.log("Sending message...");

    const response = await chrome.tabs.sendMessage(tabId, {
      type: MessageTypes.GET_CURRENT_VIDEO,
    });

    console.log("Response:", response);
  } catch (error) {
    console.error("SendMessage Error:", error);
  }
});