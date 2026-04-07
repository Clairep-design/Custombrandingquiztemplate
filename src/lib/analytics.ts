// Google Analytics utility functions

export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with your Google Analytics Measurement ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === "undefined") return;

  // Load gtag script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window.gtag === "undefined") return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window.gtag === "undefined") return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Specific quiz tracking events
export const trackQuizStart = () => {
  trackEvent("quiz_start", "Quiz", "Brand Experience Assessment");
};

export const trackQuizLeadCapture = (businessType: string) => {
  trackEvent("lead_capture", "Quiz", businessType);
};

export const trackQuizComplete = (score: number) => {
  trackEvent("quiz_complete", "Quiz", "Completion", score);
};

export const trackCTAClick = (ctaName: string) => {
  trackEvent("cta_click", "Engagement", ctaName);
};

// Type declarations for window.gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
