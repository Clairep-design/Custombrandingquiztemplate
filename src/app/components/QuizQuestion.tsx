interface QuizQuestionProps {
  question: string;
  options: { text: string; points: number }[];
  selectedOption: string | null;
  onSelect: (option: string, points: number) => void;
}

export function QuizQuestion({
  question,
  options,
  selectedOption,
  onSelect,
}: QuizQuestionProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="space-y-10">
        <h2 className="text-3xl md:text-4xl leading-tight tracking-tight">
          {question}
        </h2>

        <div className="space-y-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(option.text, option.points)}
              className={`w-full text-left px-8 py-6 border transition-all duration-200 ${
                selectedOption === option.text
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-5 h-5 border-2 flex-shrink-0 mt-0.5 transition-colors ${
                    selectedOption === option.text
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {selectedOption === option.text && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary-foreground" />
                    </div>
                  )}
                </div>
                <span className="text-lg">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
