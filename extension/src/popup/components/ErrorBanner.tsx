interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
}

function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div className="mx-4 mb-2 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-950/40 px-3 py-2.5 text-[11px] text-red-200" role="alert">
      <span className="mt-0.5 text-red-400" aria-hidden="true">!</span>
      <p className="min-w-0 flex-1 leading-4">{message}</p>
      <button type="button" onClick={onRetry} className="shrink-0 font-medium text-red-300 underline underline-offset-2 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400/60">Retry</button>
    </div>
  );
}

export default ErrorBanner;
