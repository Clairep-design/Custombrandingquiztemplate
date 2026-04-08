const heroImage = "/src/assets/Quiz Page 1 Image_ID5021.jpg";

interface QuizIntroProps {
  onStart: () => void;
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
                Sonder by Claire
              </p>
              <h1 className="text-5xl md:text-6xl leading-[1.1] tracking-tight">
                How strong is your brand experience?
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Your brand is speaking before you say a word. Discover exactly
                where it's working — and where it's quietly costing you clients.
              </p>
            </div>

            <div className="space-y-6 py-4">
              <div className="flex gap-4 items-start">
                <div className="w-1 h-12 bg-primary flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Takes 3–5 minutes</p>
                  <p className="text-sm text-muted-foreground">
                    15 focused questions across your most important brand
                    touchpoints.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-1 h-12 bg-primary flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Personalised results</p>
                  <p className="text-sm text-muted-foreground">
                    Tailored insights that show you exactly where to direct
                    your energy.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-1 h-12 bg-primary flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Built for founders</p>
                  <p className="text-sm text-muted-foreground">
                    Designed for service-based businesses ready to build brands
                    with real impact.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onStart}
              className="bg-primary text-primary-foreground px-8 py-4 hover:bg-primary/90 transition-colors w-full md:w-auto"
            >
              Discover my brand score →
            </button>
          </div>

          <div className="hidden md:block">
            <img
              src={heroImage}
              alt="Brand assessment workspace"
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
