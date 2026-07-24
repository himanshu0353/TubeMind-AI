import type { ChatMessage } from "../types/chat";

interface UserMessageProps {
  message: ChatMessage;
}

function formatTime(timestamp: Date) {
  return timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end" aria-label="Your message">
      <div className="max-w-[86%]">
        <div className="rounded-2xl rounded-br-md bg-blue-500 px-3.5 py-2.5 text-xs leading-5 text-white shadow-lg shadow-blue-950/20">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className="mt-1 text-right text-[9px] text-zinc-600">{formatTime(message.timestamp)}</p>
      </div>
    </div>
  );
}

export default UserMessage;
