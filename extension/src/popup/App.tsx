
import './App.css'
import useCurrentVideo from './popup/hooks/useCurrentVideo';
import  {useChat}  from './popup/hooks/useChat';


function App() {
  const video = useCurrentVideo()
  const {question, setQuestion, answer, loading, error, ask} = useChat();

  return (
     <div className="w-[400px] h-[500px] bg-zinc-950 text-white flex flex-col">

      <header className="border-b border-zinc-800 p-4">
        <h1 className="text-xl font-bold">
          TubeMind AI
        </h1>
      </header>

      <div className="flex-1 p-4 space-y-4">

        {/* Current Video */}

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3">

          <h2 className="text-sm font-semibold text-zinc-300">
            Current Video
          </h2>

          <p className="mt-2 break-all text-xs text-blue-400">
            {video.videoId || "No YouTube video detected"}
          </p>

        </div>

        {/* Question */}

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything about this video..."
          rows={5}
          className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm outline-none focus:border-blue-500"
        />

        {/* Button */}

        <button
          onClick={() => ask(video.videoId)}
          disabled={loading || !video.videoId}
          className="w-full rounded-lg bg-blue-600 py-2 font-medium transition hover:bg-blue-700 disabled:bg-zinc-700"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {/* Error */}

        {error && (
          <div className="rounded-lg bg-red-900/40 border border-red-700 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Answer */}

        {answer && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3">

            <h2 className="mb-2 text-sm font-semibold text-zinc-300">
              Answer
            </h2>

            <p className="whitespace-pre-wrap text-sm leading-6">
              {answer}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;