import type { Metadata } from "next";
import Script from "next/script";
import MathCalculators from "./OtherCalculators";


export const metadata: Metadata = {
  title: "12+ Math Calculators | Percentage, Fraction, LCM & More",
  description:
    "Free online math calculators for percentages, fractions, LCM, GCF, permutations, combinations, z-scores, scientific functions, binary, and more. Clear results for students and everyday use.",

  keywords: [
    "math calculators",
    "percentage calculator",
    "fraction calculator",
    "lcm calculator",
    "gcf calculator",
    "scientific calculator",
    "permutation combination calculator",
    "z score calculator",
    "triangle calculator",
    "pythagorean theorem calculator",
    "binary calculator",
    "hexadecimal calculator",
    "math tools",
  ],

  openGraph: {
    title: "Math Calculators | Percentage, Fraction, LCM & More",
    description:
      "Free percentage, fraction, LCM, GCF, permutation, combination, z-score, and scientific calculators by LizoCalc.",
    url: "https://www.lizocalc.com/calculators/math",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Math Calculators | Percentage, Fraction, LCM & More",
    description:
      "Free online percentage, fraction, LCM, GCF, and scientific calculators by LizoCalc.",
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
    canonical: "https://www.lizocalc.com/calculators/math",
  },

  category: "Math",

  applicationName: "LizoCalc",

  authors: [
    {
      name: "LizoCalc",
    },
  ],
};

const SITE_URL = "https://www.lizocalc.com";
const PAGE_URL = `${SITE_URL}/calculators/math`;

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
      name: "Math Calculators",
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
      name: "What is the difference between LCM and GCF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LCM (Least Common Multiple) is the smallest positive number that is a multiple of each number in a set. GCF (Greatest Common Factor) is the largest positive number that divides each number in the set. LCM is useful for adding fractions; GCF is useful for simplifying them.",
      },
    },
    {
      "@type": "Question",
      name: "When do I use permutation vs combination?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use permutations when order matters (for example, ranking or assigning distinct roles). Use combinations when order does not matter (for example, choosing a team or a set of items). The formulas and results are different.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate a percentage of a number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Multiply the number by the percentage written as a decimal. For example, 25% of 80 is 0.25 × 80 = 20. The Percentage Calculator also handles reverse percentages and percent change.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my scientific calculator give a different trig answer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Check whether it is in degree mode or radian mode. Sin(30) in degrees is 0.5; in radians it is a different value. Most school problems use degrees unless stated otherwise.",
      },
    },
    {
      "@type": "Question",
      name: "What does a z-score tell me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A z-score says how many standard deviations a value is from the mean. A z-score of 0 is exactly average; positive values are above the mean and negative values are below. It is most meaningful when the data are roughly normal.",
      },
    },
    {
      "@type": "Question",
      name: "How do I simplify a fraction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Divide the numerator and denominator by their greatest common factor. The Fraction Calculator does this automatically and shows the reduced form.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these calculators on exams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That depends on your teacher or exam rules. Many tests allow basic calculators but not phones or unrestricted web tools. Even when a calculator is allowed, you are often still required to show steps.",
      },
    },
    {
      "@type": "Question",
      name: "What is percent change?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Percent change is (new value − old value) / old value × 100%. It can be positive (increase) or negative (decrease). It is different from simply finding a percentage of a number.",
      },
    },
    {
      "@type": "Question",
      name: "How do binary and hexadecimal calculators help?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They convert between bases and perform arithmetic in binary or hex. This is useful in computer science, digital electronics, and programming contexts where those bases are common.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Pythagorean theorem only for right triangles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The relationship a² + b² = c² holds for right triangles, where c is the hypotenuse. For other triangles you need different formulas (for example, the Law of Cosines).",
      },
    },
    {
      "@type": "Question",
      name: "Why do two percentage calculators sometimes disagree?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually because one is computing “percent of” while the other is computing “percent change,” or because of different rounding. Confirm both tools are answering the same question.",
      },
    },
    {
      "@type": "Question",
      name: "Do I still need to learn the formulas if calculators exist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Calculators are fastest when you already understand the idea. Exams, word problems, and real situations still require you to choose the right method and interpret the result.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Math Calculators | Percentage, Fraction, LCM & More",
  description:
    "Free online math calculators for percentages, fractions, LCM, GCF, permutations, combinations, z-scores, scientific functions, binary, and more.",
  url: PAGE_URL,
  isPartOf: {
    "@type": "WebSite",
    name: "LizoCalc",
    url: SITE_URL,
  },
  about: {
    "@type": "Thing",
    name: "Math Calculators",
  },
  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Math Calculators",
  itemListElement: [
    "Scientific Calculator",
    "Fraction Calculator",
    "Percentage Calculator",
    "Triangle Calculator",
    "Pythagorean Theorem Calculator",
    "Half Life Calculator",
    "Binary Calculator",
    "Hexadecimal Calculator",
    "Least Common Multiple (LCM) Calculator",
    "Greatest Common Factor (GCF) Calculator",
    "Permutation and Combination Calculator",
    "Z Score Calculator",
    "Conversion Calculator",
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

      <MathCalculators />
    </>
  );
}