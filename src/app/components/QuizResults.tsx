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
    b
