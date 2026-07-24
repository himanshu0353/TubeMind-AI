import { useEffect, useRef } from "react";
import type { ChatMessage } from "../types/chat";
import AIMessage from "./AIMessage";
import EmptyState from "./EmptyState";
import LoadingMessage from "./LoadingMessage";
import UserMessage from "./UserMessage";

interface ChatWindowProps {
  messages: ChatMessage[];
  loading: boolean;
}

function ChatWindow({ messages, loading }: ChatWindowProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <section className="min-h-0 flex-1 overflow-y-auto px-4 py-4" aria-label="Chat history">
      {messages.length === 0 && !loading ? <EmptyState /> : <div className="space-y-4">{messages.map((message) => message.role === "user" ? <UserMessage key={message.id} message={message} /> : <AIMessage key={message.id} message={message} />)}{loading && <LoadingMessage />}<div ref={endRef} /></div>}
    </section>
  );
}

export default ChatWindow;
