import { useState, useEffect } from "react";
import { QuizIntro } from "./components/QuizIntro";
import { LeadCapture } from "./components/LeadCapture";
import { QuizProgress } from "./components/QuizProgress";
import { QuizQuestion } from "./components/QuizQuestion";
import { QuizResults } from "./components/QuizResults";
import {
  initGA,
  trackQuizStart,
  trackQuizLeadCapture,
  trackQuizComplete,
} from "../lib/analytics";

const quizQuestions = [
  {
    question:
      "Do you have a complete visual identity — logo, colour palette, and typography — that you use consistently across everything?",
    category: "visual",
    options: [
      { text: "Not really — it's a mix of things", points: 1 },
      { text: "Partially — some elements are set", points: 2 },
      { text: "Yes — it's defined and consistent", points: 3 },
    ],
  },
  {
    question:
      "Does your visual identity feel like a true reflection of the quality and calibre of your work?",
    category: "visual",
    options: [
      { text: "Honestly, no — it's holding me back", points: 1 },
      { text: "It's okay, but could be stronger", points: 2 },
      { text: "Yes — it positions me well", points: 3 },
    ],
  },
  {
    question:
      "Do you have brand guidelines — a clear reference for how your brand looks and sounds — that you or others can follow?",
    category: "visual",
    options: [
      { text: "No guidelines at all", points: 1 },
      { text: "Informal notes or a basic style guide", points: 2 },
      { text: "Yes — a proper brand guidelines document", points: 3 },
    ],
  },
  {
    question:
      "Does your website clearly communicate who you work with, what you do, and why someone should choose you — within the first few seconds?",
    category: "digital",
    options: [
      { text: "It's unclear or outdated", points: 1 },
      { text: "Somewhat — but it could be sharper", points: 2 },
      { text: "Yes — it's clear and compelling", points: 3 },
    ],
  },
  {
    question:
      "Does your website feel visually consistent with the rest of your brand — social media, proposals, email?",
    category: "digital",
    options: [
      { text: "No — they feel like different businesses", points: 1 },
      { text: "Roughly aligned, but inconsistencies exist", points: 2 },
      { text: "Yes — everything feels cohesive", points: 3 },
    ],
  },
  {
    question:
      "Is there a clear and easy next step on your website — an action you want visitors to take?",
    category: "digital",
    options: [
      { text: "Not really — no obvious CTA", points: 1 },
      { text: "There's something, but it's not prominent", points: 2 },
      { text: "Yes — it's clear and drives enquiries", points: 3 },
    ],
  },
  {
    question:
      "From the first enquiry to project delivery, does every interaction a client has with your business feel intentional, polished, and on-brand?",
    category: "client",
    options: [
      { text: "Not consistently — it varies", points: 1 },
      { text: "Most of it is — some gaps remain", points: 2 },
      { text: "Yes — it's a seamless experience", points: 3 },
    ],
  },
  {
    question:
      "Do you have a structured onboarding process that sets the tone and builds confidence with new clients?",
    category: "client",
    options: [
      { text: "No structured process", points: 1 },
      { text: "Informal — it varies by client", points: 2 },
      { text: "Yes — a clear, repeatable system", points: 3 },
    ],
  },
  {
    question:
      "When a client is referred to you, would your brand make that referral feel instantly credible and premium?",
    category: "client",
    options: [
      { text: "I'm not confident it would", points: 1 },
      { text: "Mostly — there's room to improve", points: 2 },
      { text: "Yes — my brand backs the referral", points: 3 },
    ],
  },
  {
    question:
      "Do your proposals and client documents look as good as the work you deliver?",
    category: "proposals",
    options: [
      { text: "Not at all — they're basic", points: 1 },
      { text: "Reasonable but not impressive", points: 2 },
      { text: "Yes — they reflect my standard", points: 3 },
    ],
  },
  {
    question:
      "Can you produce a branded proposal, contract, or quote quickly — without starting from scratch each time?",
    category: "proposals",
    options: [
      { text: "No — it's a time-consuming process", points: 1 },
      { text: "Sometimes — I have rough templates", points: 2 },
      { text: "Yes — I have a streamlined system", points: 3 },
    ],
  },
  {
    question:
      "Do your documents — emails, invoices, contracts — all carry the same visual identity?",
    category: "proposals",
    options: [
      { text: "No — they're all different", points: 1 },
      { text: "Some are branded, some aren't", points: 2 },
      { text: "Yes — fully consistent", points: 3 },
    ],
  },
  {
    question:
      "Do you have a clear brand voice — a consistent way you communicate that sounds unmistakably like you?",
    category: "messaging",
    options: [
      { text: "No — my tone varies a lot", points: 1 },
      { text: "I have a sense of it but it's not defined", points: 2 },
      { text: "Yes — it's clear and consistent", points: 3 },
    ],
  },
  {
    question:
      "Does your social media presence reflect the quality of your brand and attract the kind of clients you want to work with?",
    category: "messaging",
    options: [
      { text: "Not really — it's inconsistent", points: 1 },
      { text: "It's getting there but needs work", points: 2 },
      { text: "Yes — it's working well for me", points: 3 },
    ],
  },
  {
    question:
      "Can you articulate in one or two sentences exactly who you help, what you do, and why it matters — in a way that makes the right people want to work with you?",
    category: "messaging",
    options: [
      { text: "Not confidently", points: 1 },
      { text: "I can, but it doesn't always land", points: 2 },
      { text: "Yes — it's sharp and effective", points: 3 },
    ],
  },
];

export default function App() {
  const [quizState, setQuizState] = useState<
    "intro" | "lead" | "quiz" | "results"
  >("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    Record<number, { text: string; points: number }>
  >({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [leadData, setLeadData] = useState<{
    firstName: string;
    email: string;
    businessType: string;
  } | null>(null);

  // Initialize Google Analytics on mount
  useEffect(() => {
    initGA();
  }, []);

  const handleStart = () => {
    trackQuizStart();
    setQuizState("lead");
  };

  const handleLeadSubmit = (data: {
    firstName: string;
    email: string;
    businessType: string;
  }) => {
    trackQuizLeadCapture(data.businessType);
    setLeadData(data);
    setQuizState("quiz");
  };

  const handleSelectOption = (option: string, points: number) => {
    setSelectedOption(option);
    setAnswers({ ...answers, [currentQuestion]: { text: option, points } });

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        trackQuizComplete(totalScore);
        setQuizState("results");
      }
    }, 500);
  };

  const handleRestart = () => {
    setQuizState("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
    setLeadData(null);
  };

  const totalScore = Object.values(answers).reduce(
    (sum, answer) => sum + answer.points,
    0
  );

  const categoryScores = quizQuestions.reduce(
    (scores, question, index) => {
      if (answers[index]) {
        scores[question.category] =
          (scores[question.category] || 0) + answers[index].points;
      }
      return scores;
    },
    {} as Record<string, number>
  );

  return (
    <div className="min-h-screen bg-background">
      {quizState === "intro" && <QuizIntro onStart={handleStart} />}

      {quizState === "lead" && <LeadCapture onSubmit={handleLeadSubmit} />}

      {quizState === "quiz" && (
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <QuizProgress
              currentStep={currentQuestion + 1}
              totalSteps={quizQuestions.length}
            />
          </div>
          <QuizQuestion
            question={quizQuestions[currentQuestion].question}
            options={quizQuestions[currentQuestion].options}
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
          />
        </div>
      )}

      {quizState === "results" && (
        <QuizResults
          score={totalScore}
          categoryScores={categoryScores}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}