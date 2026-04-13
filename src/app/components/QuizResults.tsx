const clairePhoto = "https://raw.githubusercontent.com/Clairep-design/Custombrandingquiztemplate/main/src/assets/Quiz_Results%20Page_Claire%20Prangley%20Sonder%20Studio%20Creative_PageShootSwoonBW.jpg";
import { trackCTAClick } from "../../lib/analytics";

interface QuizResultsProps {
  score: number;
  categoryScores: Record<string, number>;
  onRestart: () => void;
}

interface ResultTier {
  title: string;
  range: string;
  headline: string;
  description: string;
  cta: string;
  bgColor: string;
}

const resultTiers: ResultTier[] = [
  {
    title: "Building blocks",
    range: "15–24 pts",
    headline: "Every great brand starts somewhere. Yours has real potential — and a clear path forward.",
    description:
      "Your brand has foundations that can be built on. The gaps are identifiable and we know exactly how to close them.",
    cta: "Let's map out your brand strategy →",
    bgColor: "bg-[#A8CCC4]/10 border-[#A8CCC4]",
  },
  {
    title: "In motion",
    range: "25–32 pts",
    headline: "You're making moves — but some gaps are quietly costing you.",
    description:
      "Elements of your brand are working well. A few focused priorities will create real momentum and start converting better clients.",
    cta: "Let's find your highest-impact priorities →",
    bgColor: "bg-[#B8AED1]/10 border-[#B8AED1]",
  },
  {
    title: "Taking shape",
    range: "33–39 pts",
    headline: "Strong foundations, some real opportunities.",
    description:
      "Your brand is doing well — clear opportunities exist to sharpen it into something truly standout. This is the level where refinement creates outsized results.",
    cta: "Let's uncover your brand opportunities →",
    bgColor: "bg-[#D4A5A5]/10 border-[#D4A5A5]",
  },
  {
    title: "Brand powerhouse",
    range: "40–45 pts",
    headline: "You're operating at a high level. Time to make it exceptional.",
    description:
      "You've built something solid. The work now is fine-tuning the details that turn a strong brand into a market-leading one.",
    cta: "Let's take your brand to its peak →",
    bgColor: "bg-[#E8D5B7]/10 border-[#E8D5B7]",
  },
];

function getResultTier(score: number): ResultTier {
  if (score <= 24) return resultTiers[0];
  if (score <= 32) return resultTiers[1];
  if (score <= 39) return resultTiers[2];
  return resultTiers[3];
}

export function QuizResults({
  score,
  categoryScores,
  onRestart,
}: QuizResultsProps) {
  const tier = getResultTier(score);

  const categories = [
    { name: "Visual Identity", key: "visual", max: 9 },
    { name: "Digital Presence", key: "digital", max: 9 },
    { name: "Client Experience", key: "client", max: 9 },
    { name: "Proposals & Documents", key: "proposals", max: 9 },
    { name: "Messaging & Social Media", key: "messaging", max: 9 },
  ];

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
            Your Results
          </p>
          <h1 className="text-5xl md:text-6xl tracking-tight">
            {score} / 45
          </h1>
        </div>

        <div className={`p-12 border ${tier.bgColor}`}>
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl tracking-tight mb-2">{tier.title}</h2>
                <p className="text-sm text-muted-foreground">{tier.range}</p>
              </div>
            </div>

            <p className="text-xl leading-relaxed">{tier.headline}</p>
            <p className="text-muted-foreground leading-relaxed">
              {tier.description}
            </p>

            
              href="https://www.sonderbyclaire.co.nz/contact"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick(tier.cta)}
              className="bg-primary text-primary-foreground px-8 py-4 hover:bg-primary/90 transition-colors inline-block"
            >
              {tier.cta}
            </a>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl tracking-tight">Your category breakdown</h3>

          <div className="space-y-6">
            {categories.map((category) => {
              const categoryScore = categoryScores[category.key] || 0;
              const percentage = (categoryScore / category.max) * 100;

              return (
                <div key={category.key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {categoryScore} / {category.max}
                    </p>
                  </div>
                  <div className="w-full h-2 bg-muted">
                    <div
                      className="h-full bg-primary transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card p-12 border border-border space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img
              src={clairePhoto}
              alt="Claire from Sonder by Claire"
              className="w-32 h-32 object-cover flex-shrink-0"
            />
            <div className="space-y-6 flex-1">
              <h3 className="text-2xl tracking-tight">Ready to act on this?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A VIP Brand Intensive is the fastest way to move from insight to
                momentum. In a focused half-day session, we'll audit your brand,
                identify your highest-leverage opportunities, and leave you with a
                clear action plan — and in many cases, we start building
                immediately.
              </p>
              <p className="font-medium">Investment: $399</p>
              
                href="https://www.sonderbyclaire.co.nz/appointments"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-8 py-4 hover:bg-primary/90 transition-colors inline-block"
              >
                Book your VIP Brand Intensive →
              </a>
            </div>
          </div>
        </div>

        <div className="text-center py-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Not quite ready to book? Follow along on Instagram for weekly brand
            strategy insights designed for service-based founders.
          </p>
          
            <a href="https://instagram.com/sonderbyclaire"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @sonderbyclaire
          </a>
        </div>

        <div className="text-center">
          <button
            onClick={onRestart}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Take the assessment again
          </button>
        </div>
      </div>
    </div>
  );
}
