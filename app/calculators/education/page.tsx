import type { Metadata } from "next";
import Script from "next/script";
import OtherCalculators from "./OtherCalculators";

export const metadata: Metadata = {
  title: "5+ Education Calculators | GPA, CGPA & Grade Tools",
  description:
    "Free online education calculators. Calculate GPA, CGPA, final grade, weighted grade, and required scores with tools that match your school's scale and credit hours.",

  keywords: [
    "education calculators",
    "gpa calculator",
    "cgpa calculator",
    "grade calculator",
    "final grade calculator",
    "weighted grade calculator",
    "college gpa calculator",
    "high school gpa calculator",
    "cumulative gpa calculator",
    "semester gpa calculator",
    "what score do i need calculator",
    "grade point average calculator",
    "academic calculators",
  ],

  openGraph: {
    title: "Education Calculators | GPA, CGPA & Grade Tools",
    description:
      "Free GPA, CGPA, final grade, weighted grade, and grade calculators that match your school's scale and credit-hour system.",
    url: "https://www.lizocalc.com/calculators/education",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Education Calculators | GPA, CGPA & Grade Tools",
    description:
      "Free online GPA, CGPA, final grade, and weighted grade calculators by LizoCalc.",
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
    canonical: "https://www.lizocalc.com/calculators/education",
  },

  category: "Education",

  applicationName: "LizoCalc",

  authors: [
    {
      name: "LizoCalc",
    },
  ],
};

const SITE_URL = "https://www.lizocalc.com";
const PAGE_URL = `${SITE_URL}/calculators/education`;

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
      name: "Education Calculators",
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
      name: "How do you calculate GPA by hand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Multiply each course's grade point value by its credit hours to get quality points, add up the quality points for all your courses, then divide by your total credit hours. That final number is your GPA.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between GPA and CGPA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GPA usually refers to your average for a single term or semester. CGPA (Cumulative GPA) is the same calculation run across every term you've completed, so it reflects your entire academic record rather than just the current one.",
      },
    },
    {
      "@type": "Question",
      name: "Is a 3.5 GPA good?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On a standard 4.0 scale, a 3.5 GPA is generally considered strong — it typically corresponds to a B+/A- average. Whether it's good enough for a specific goal depends on the context, since competitive programs and scholarships often set their own thresholds.",
      },
    },
    {
      "@type": "Question",
      name: "How is weighted GPA different from unweighted GPA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An unweighted GPA treats every course the same, usually on a 4.0 scale. A weighted GPA gives extra points for honors, AP, or IB courses, often pushing the scale up to 5.0, to reflect that those courses are harder.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert a percentage grade to GPA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your school's official conversion table, since schools don't all use the same cutoffs. As a common example, 90-100% often maps to a 4.0, 80-89% to a 3.0-3.9 range, and so on — but always check your institution's specific scale rather than assuming a generic one applies.",
      },
    },
    {
      "@type": "Question",
      name: "Does GPA reset each semester?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your semester or term GPA is calculated fresh each term, but it doesn't erase anything — it simply reflects that term's courses. Your CGPA keeps accumulating across every term, so past grades continue to factor in there.",
      },
    },
    {
      "@type": "Question",
      name: "What GPA do I need to get into college?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This varies enormously by school and program, and many colleges also recalculate your GPA using their own methodology rather than accepting your transcript's number as-is. Check the specific admissions requirements for each school you're applying to rather than relying on a general benchmark.",
      },
    },
    {
      "@type": "Question",
      name: "Can I raise my GPA in one semester?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A single strong semester can raise your term GPA significantly, but its effect on your CGPA depends on how many credit hours you've already completed. The more credits already on your record, the more diluted the impact of any one term becomes.",
      },
    },
    {
      "@type": "Question",
      name: "What score do I need on my final to get an A?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That depends on your current grade and how much the final is worth. The Final Grade Calculator on this page works it out directly: enter your current grade, the final's weight, and your target grade, and it solves for the score you need.",
      },
    },
    {
      "@type": "Question",
      name: "How many credit hours do I need to graduate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This is set by your specific degree program, not by a universal standard, and can range widely depending on the school and major. Check your degree audit or academic advisor for the exact number that applies to you.",
      },
    },
    {
      "@type": "Question",
      name: "What is a passing GPA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most schools set a minimum GPA (often around 2.0 on a 4.0 scale) to remain in good academic standing, though the exact threshold varies by institution and program. Falling below it can trigger academic probation rather than automatic failure.",
      },
    },
    {
      "@type": "Question",
      name: "Do transfer credits count toward my CGPA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Often not in the way you'd expect — many schools count transfer credits toward your total credit hours but exclude the grades themselves from your CGPA calculation. Check your new school's transfer credit policy directly, since this varies a lot between institutions.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Education Calculators | GPA, CGPA & Grade Tools",
  description:
    "Free online education calculators. Calculate GPA, CGPA, final grade, weighted grade, and required scores with tools that match your school's scale and credit hours.",
  url: PAGE_URL,
  isPartOf: {
    "@type": "WebSite",
    name: "LizoCalc",
    url: SITE_URL,
  },
  about: {
    "@type": "Thing",
    name: "Education and Grade Calculators",
  },
  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Education Calculators",
  itemListElement: [
    "GPA Calculator",
    "Grade Calculator",
    "CGPA Calculator",
    "Final Grade Calculator",
    "Weighted Grade Calculator",
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

      <OtherCalculators />
    </>
  );
}