import type { Metadata } from "next";
import Script from "next/script";
import FitnessCalculators from "./OtherCalculator";

export const metadata: Metadata = {
  title: "8+ Health Calculators | BMI, BMR, TDEE & Calorie Tools",
  description:
    "Free online health and fitness calculators. Calculate BMI, BMR, TDEE, daily calories, body fat percentage, macros, calorie deficit, and sleep with accurate, easy-to-use tools.",

  keywords: [
    "health calculators",
    "fitness calculators",
    "bmi calculator",
    "bmr calculator",
    "tdee calculator",
    "calorie calculator",
    "body fat calculator",
    "macros calculator",
    "calorie deficit calculator",
    "sleep calculator",
    "ideal weight calculator",
    "body fat percentage calculator",
    "fitness tools",
  ],

  openGraph: {
    title: "Health & Fitness Calculators | BMI, BMR, TDEE & Calorie Tools",
    description:
      "Free BMI, BMR, TDEE, calorie, body fat, macros, calorie deficit, and sleep calculators to help you achieve your health and fitness goals.",
    url: "https://www.lizocalc.com/calculators/health",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Health & Fitness Calculators | BMI, BMR, TDEE & Calorie Tools",
    description:
      "Free online BMI, BMR, TDEE, calorie, body fat, and sleep calculators by LizoCalc.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/health",
  },

  category: "Health",

  applicationName: "LizoCalc",

  authors: [
    {
      name: "LizoCalc",
    },
  ],
};

const SITE_URL = "https://www.lizocalc.com";
const PAGE_URL = `${SITE_URL}/calculators/health`;

// ---------- JSON-LD SCHEMAS ----------

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculators",
      item: `${SITE_URL}/calculators`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Health Calculators",
      item: PAGE_URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which health calculator should I use first?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The BMI Calculator and the Calorie Calculator are good starting points. BMI gives you a quick sense of where you stand, and the Calorie Calculator gives you a number to plan meals around. The Body Fat Calculator and the Calorie Deficit Calculator are more useful once you have a specific goal in mind.",
      },
    },
    {
      "@type": "Question",
      name: "Are online health calculators accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They're accurate as long as the underlying formula is sound and you're honest with your inputs. Even the best BMR and TDEE formulas can be off by around 10%, so results depend heavily on how accurately you report your activity level.",
      },
    },
    {
      "@type": "Question",
      name: "Why do different websites give different results for the same numbers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually because they're using different formulas or different assumptions about activity level. A site using the Harris-Benedict formula will typically give a higher BMR than one using Mifflin-St Jeor.",
      },
    },
    {
      "@type": "Question",
      name: "Can these calculators replace a doctor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. These calculators are built on population-level formulas and can't account for your medical history, medications, or diagnosed conditions. This matters even more if you're pregnant, have a history of disordered eating, or manage a chronic condition.",
      },
    },
    {
      "@type": "Question",
      name: "Which formula is most accurate for BMR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Mifflin-St Jeor equation is generally considered more accurate than the older Harris-Benedict formula, and it's the one used for the BMR and TDEE calculators on this page.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I recalculate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every 4–6 weeks if you're actively trying to lose or gain weight, or any time your weight shifts by more than about 5 kg, since your BMR and TDEE change as your body composition changes.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between BMR and TDEE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMR is the number of calories your body burns at rest. TDEE adds in the calories you burn from daily activity. When setting a calorie target for weight loss or gain, use your TDEE, not your BMR.",
      },
    },
    {
      "@type": "Question",
      name: "How is the Calorie Deficit Calculator different from the Calorie Calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Calorie Calculator estimates how many calories you should eat to maintain your current weight. The Calorie Deficit Calculator works backward from a weight-loss goal and a timeframe to tell you how large a deficit you need.",
      },
    },
    {
      "@type": "Question",
      name: "Is BMI a reliable health measure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMI is a useful screening tool used by many health organizations, but it doesn't measure body fat directly, and it can be misleading for people who carry more muscle than average.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the Body Fat Calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The U.S. Navy tape-measurement method used here is reasonably accurate and correlates well with clinical measurements, though it's not as precise as methods like DEXA scanning. It's a solid tool for tracking your own progress over time.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if my macro split is right for me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There's no single right answer — it depends on your goals, training style, and how your body responds. A good starting point is hitting your protein target first, then adjusting carbs and fat based on how you feel and perform.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my calorie deficit target keep changing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As you lose weight, your BMR and TDEE both drop, since a smaller body burns fewer calories at rest and during activity. Recalculating periodically keeps your deficit target aligned with where your body actually is now.",
      },
    },
    {
      "@type": "Question",
      name: "How much sleep do I actually need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most adults need about 7–9 hours per night, though this varies by age — teenagers generally need more, and older adults sometimes need somewhat less.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Health & Fitness Calculators | BMI, BMR, TDEE & Calorie Tools",
  description:
    "Free online health and fitness calculators. Calculate BMI, BMR, TDEE, daily calories, body fat percentage, macros, calorie deficit, and sleep.",
  url: PAGE_URL,
  isPartOf: {
    "@type": "WebSite",
    name: "LizoCalc",
    url: SITE_URL,
  },
  about: {
    "@type": "Thing",
    name: "Health and Fitness Calculators",
  },
  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Health Calculators",
  itemListElement: [
    "BMI Calculator",
    "Calorie Calculator",
    "Body Fat Calculator",
    "BMR Calculator",
    "TDEE Calculator",
    "Macros Calculator",
    "Calorie Deficit Calculator",
    "Sleep Calculator",
  ].map((name, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
  })),
};

export default function Page() {
  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <FitnessCalculators />
    </>
  );
}