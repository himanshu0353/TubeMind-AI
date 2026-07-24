import type { CurrentVideo } from "../types/chat";

interface VideoCardProps {
  video: CurrentVideo | null;
}

function VideoCard({ video }: VideoCardProps) {
  const hasVideo = Boolean(video?.videoId);

  return (
    <section className="mx-4 mt-3 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 shadow-lg shadow-black/10" aria-label="Current video">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">Current video</span>
        <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${hasVideo ? "bg-emerald-400/10 text-emerald-300" : "bg-zinc-800 text-zinc-500"}`}>
          {hasVideo ? "Ready" : "Not found"}
        </span>
      </div>
      <p className="line-clamp-2 text-xs font-medium leading-5 text-zinc-200">
        {video?.title || (hasVideo ? "YouTube video" : "Open a YouTube video to start")}
      </p>
      <p className="mt-1 truncate font-mono text-[10px] text-blue-400/80">
        {video?.videoId || "No YouTube video detected"}
      </p>
    </section>
  );
}

export default VideoCard;
