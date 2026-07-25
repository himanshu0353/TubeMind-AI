interface HeaderProps {
  isConnected: boolean;
}

function Header({ isConnected }: HeaderProps) {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/95 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-lg ring-1 ring-blue-400/20" aria-hidden="true">
            &#129504;
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold tracking-tight text-white">TubeMind</h1>
            <p className="truncate text-[10px] text-zinc-500">Your daily YouTube Partner</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 text-[10px] font-medium text-zinc-400" aria-label={`Backend status: ${isConnected ? "Connected" : "Offline"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-emerald-400" : "bg-red-400"}`} aria-hidden="true" />
          {isConnected ? "Connected" : "Offline"}
        </div>
      </div>
    </header>
  );
}

export default Header;
