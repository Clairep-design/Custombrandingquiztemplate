const logo = "https://raw.githubusercontent.com/Clairep-design/Custombrandingquiztemplate/main/src/assets/Sonder-logo.png";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-12">
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Sonder by Claire" className="h-16" />
      </div>
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-muted-foreground">
          Question {currentStep} of {totalSteps}
        </p>
        <p className="text-sm text-muted-foreground">{Math.round(progress)}%</p>
      </div>
      <div className="w-full h-0.5 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
