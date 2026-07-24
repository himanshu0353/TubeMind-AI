function EmptyState() {
  return (
    <div className="flex h-full min-h-44 flex-col items-center justify-center px-8 text-center">
      <div className="mb-3 text-3xl" aria-hidden="true">&#129504;</div>
      <h2 className="text-sm font-semibold text-zinc-200">Ask anything about this video.</h2>
      <p className="mt-2 text-[11px] leading-5 text-zinc-500">Your video-aware assistant is ready to help you learn faster.</p>
      <div className="mt-5 grid w-full grid-cols-2 gap-2 text-left text-[10px] text-zinc-500">
        <span className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 px-2.5 py-2">Summarize this video</span>
        <span className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 px-2.5 py-2">Explain the topic</span>
        <span className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 px-2.5 py-2">Key concepts</span>
        <span className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 px-2.5 py-2">Interview questions</span>
      </div>
    </div>
  );
}

export default EmptyState;
