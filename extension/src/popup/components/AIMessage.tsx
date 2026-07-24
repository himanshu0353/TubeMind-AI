import { useState } from "react";
import type { ChatMessage } from "../types/chat";

interface AIMessageProps {
  message: ChatMessage;
}

function formatTime(timestamp: Date) {
  return timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function renderContent(content: string) {
  return content.split("\n").map((line, index) => {
    const trimmed = line.trim();
    const isHeading = trimmed.startsWith("#");
    const isBullet = /^[-*]\s/.test(trimmed);
    const text = trimmed.replace(/^#{1,3}\s*/, "").replace(/^[-*]\s/, "");

    return (
      <span key={`${line}-${index}`} className="block min-h-[1.25rem]">
        {isHeading ? <strong className="font-semibold text-white">{text}</strong> : isBullet ? <span className="flex gap-2"><span className="text-cyan-400">&#8226;</span><span>{text}</span></span> : text}
      </span>
    );
  });
}

function AIMessage({ message }: AIMessageProps) {
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex justify-start" aria-label="TubeMind response">
      <div className="max-w-[92%]">
        <div className="rounded-2xl rounded-bl-md border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs leading-5 text-zinc-300 shadow-lg shadow-black/10">
          <div>{renderContent(message.content)}</div>
          <div className="mt-2 flex items-center gap-3 border-t border-zinc-800/80 pt-2">
            <button type="button" onClick={copyMessage} className="text-[10px] text-zinc-500 transition duration-200 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/60" aria-label="Copy response">
              {copied ? "Copied" : "Copy"}
            </button>
            <span className="text-[10px] text-zinc-700" aria-hidden="true">|</span>
            <button type="button" disabled className="text-[10px] text-zinc-600" aria-label="Add video timestamp">
              Timestamp
            </button>
          </div>
        </div>
        <p className="mt-1 text-[9px] text-zinc-600">{formatTime(message.timestamp)}</p>
      </div>
    </div>
  );
}

export default AIMessage;
