import { useState } from "react";

interface LeadCaptureProps {
  onSubmit: (data: {
    firstName: string;
    email: string;
    businessType: string;
  }) => void;
}

export function LeadCapture({ onSubmit }: LeadCaptureProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && email && businessType && consent) {
      setIsSubmitting(true);

      // Submit to Formspree
      try {
        const response = await fetch("https://tally.so/r/pb751J", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            email,
            businessType,
            consent,
            timestamp: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          // Continue with quiz
          onSubmit({ firstName, email, businessType });
        } else {
          console.error("Form submission failed");
          // Still allow them to continue even if Formspree fails
          onSubmit({ firstName, email, businessType });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        // Still allow them to continue even if there's an error
        onSubmit({ firstName, email, businessType });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-xl w-full">
        <div className="bg-card p-12 shadow-sm">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-4xl tracking-tight">
                Let's personalise your results
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-input focus:outline-none focus:ring-1 focus:ring-ring"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-input focus:outline-none focus:ring-1 focus:ring-ring"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="businessType" className="block text-sm">
                  Business type
                </label>
                <select
                  id="businessType"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-input focus:outline-none focus:ring-1 focus:ring-ring"
                  required
                >
                  <option value="">Select your business type</option>
                  <option value="interior-design">Interior design</option>
                  <option value="architecture">Architecture</option>
                  <option value="coaching">Coaching</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other service business</option>
                </select>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4"
                  required
                />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                  I'd like to receive my results and occasional brand insights
                  from Sonder by Claire. No spam, ever.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-8 py-4 hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={
                  !firstName || !email || !businessType || !consent || isSubmitting
                }
              >
                {isSubmitting ? "Submitting..." : "Continue to assessment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
