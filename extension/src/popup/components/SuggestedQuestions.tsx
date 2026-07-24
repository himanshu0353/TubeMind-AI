const suggestions = [
  "Summarize",
  "Key points",
  "Explain simply",
  "Interview questions",
  "Quiz me",
  "Important concepts",
];

interface SuggestedQuestionsProps {
  disabled: boolean;
  onSelect: (question: string) => void;
}

function SuggestedQuestions({ disabled, onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="px-4 pt-3" aria-label="Suggested questions">
      <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(suggestion)}
            className="shrink-0 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-[10px] font-medium text-zinc-300 transition duration-200 hover:border-blue-400/60 hover:bg-blue-500/10 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/60 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SuggestedQuestions;
