function LoadingMessage() {
  return (
    <div className="flex justify-start" aria-live="polite" aria-label="Thinking">
      <div className="rounded-2xl rounded-bl-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-xs text-zinc-400">
        <span className="mr-2">Thinking</span>
        <span className="inline-flex gap-1 align-middle" aria-hidden="true">
          <span className="thinking-dot h-1 w-1 rounded-full bg-cyan-400" />
          <span className="thinking-dot h-1 w-1 rounded-full bg-cyan-400 [animation-delay:150ms]" />
          <span className="thinking-dot h-1 w-1 rounded-full bg-cyan-400 [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  );
}

export default LoadingMessage;
