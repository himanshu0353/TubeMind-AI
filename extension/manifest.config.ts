import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,

  name: "TubeMind AI",

  description: "Chat with any YouTube video using AI.",

  version: "1.0.0",

  action: {
    default_popup: "index.html",
  },

  background :{
    service_worker: "src/background/background.ts",
    type: "module"
  },

  content_scripts : [
    {
      matches: ['https://www.youtube.com/*'],
      js: ['src/content/content.ts']
    }
  ],
});