export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface CurrentVideo {
  videoId: string | null;
  url?: string;
  title?: string | null;
  channelName?: string | null;
  thumbnail?: string | null;
  isShort?: boolean;
}
