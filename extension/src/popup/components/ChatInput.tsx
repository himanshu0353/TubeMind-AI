import { useEffect, useRef } from "react";

interface ChatInputProps {
  value: string;
  disabled: boolean;
  canSend: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

function ChatInput({ value, disabled, canSend, onChange, onSubmit }: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  }

  return (
    <div className="border-t border-zinc-800/80 bg-zinc-950 px-4 pb-2 pt-3">
      <div className="flex items-end gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2 shadow-lg shadow-black/20 transition duration-200 focus-within:border-blue-500/70 focus-within:ring-1 focus-within:ring-blue-500/30">
        <textarea ref={inputRef} value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={handleKeyDown} disabled={disabled} rows={1} placeholder="Ask anything about this video..." aria-label="Ask a question" className="max-h-24 min-h-6 flex-1 resize-none bg-transparent py-1 text-xs leading-5 text-zinc-100 outline-none placeholder:text-zinc-600 disabled:cursor-not-allowed" />
        <button type="button" onClick={onSubmit} disabled={disabled || !canSend} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-sm font-bold text-white transition duration-200 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/70 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500" aria-label="Send question">
          &#8593;
        </button>
      </div>
      <p className="mt-1.5 text-center text-[9px] text-zinc-600">Enter to send <span className="text-zinc-700">&#8226;</span> Shift+Enter for a new line</p>
    </div>
  );
}

export default ChatInput;
