
import { useState } from "react";
import "./App.css";
import ChatInput from "./popup/components/ChatInput";
import ChatWindow from "./popup/components/ChatWindow";
import ErrorBanner from "./popup/components/ErrorBanner";
import Footer from "./popup/components/Footer";
import Header from "./popup/components/Header";
import SuggestedQuestions from "./popup/components/SuggestedQuestions";
import VideoCard from "./popup/components/VideoCard";
import { useChat } from "./popup/hooks/useChat";
import useCurrentVideo from "./popup/hooks/useCurrentVideo";
import type { ChatMessage, CurrentVideo } from "./popup/types/chat";


function App() {
  const rawVideo = useCurrentVideo();
  const video = rawVideo as CurrentVideo | null;
  const { question, setQuestion, loading, error, ask } = useChat();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [lastQuestion, setLastQuestion] = useState("");

  async function submitQuestion(questionToSend = question) {
    const trimmedQuestion = questionToSend.trim();
    if (!trimmedQuestion || !video?.videoId || loading) return;

    setMessages((currentMessages) => [...currentMessages, {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmedQuestion,
      timestamp: new Date(),
    }]);
    setLastQuestion(trimmedQuestion);
    setQuestion("");

    const answer = await ask(video.videoId, trimmedQuestion);
    if (answer) {
      setMessages((currentMessages) => [...currentMessages, {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: answer,
        timestamp: new Date(),
      }]);
    }
  }

  function retryLastQuestion() {
    if (lastQuestion) void submitQuestion(lastQuestion);
  }

  return (
    <main className="flex h-[600px] w-[400px] flex-col overflow-hidden bg-zinc-950 text-white">
      <Header isConnected={Boolean(video?.videoId)} />
      <VideoCard video={video} />
      <SuggestedQuestions disabled={loading || !video?.videoId} onSelect={(suggestion) => void submitQuestion(suggestion)} />
      <ChatWindow messages={messages} loading={loading} />
      {error && <ErrorBanner message={error} onRetry={retryLastQuestion} />}
      <ChatInput value={question} disabled={loading || !video?.videoId} canSend={Boolean(question.trim())} onChange={setQuestion} onSubmit={() => void submitQuestion()} />
      <Footer />
    </main>
  );
}

export default App;