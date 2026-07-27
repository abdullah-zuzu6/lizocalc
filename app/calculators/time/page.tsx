import type { Metadata } from "next";
import Script from "next/script";
import TimeCalculators from "./OtherCalculators";

export const metadata: Metadata = {
  title: "4+ Time Calculators | Age, Date & Hours Tools",
  description:
    "Free online time calculators for age, date difference, time duration, and working hours. Accurate tools for personal dates, planning, and time tracking.",

  keywords: [
    "age calculator",
    "date calculator",
    "time calculator",
    "hours calculator",
    "date difference calculator",
    "time duration calculator",
    "age in days calculator",
    "hours between dates",
    "working hours calculator",
    "time tools",
  ],

  openGraph: {
    title: "Time Calculators | Age, Date Difference & Hours Tools",
    description:
      "Free age calculator, date difference, time duration, and hours calculators by LizoCalc.",
    url: "https://www.lizocalc.com/calculators/time",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Time Calculators | Age, Date Difference & Hours Tools",
    description:
      "Free online age, date difference, and time duration calculators by LizoCalc.",
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
    canonical: "https://www.lizocalc.com/calculators/time",
  },

  category: "Time",
  applicationName: "LizoCalc",
  authors: [{ name: "LizoCalc" }],
};

const SITE_URL = "https://www.lizocalc.com";
const PAGE_URL = `${SITE_URL}/calculators/time`;

// ---------- JSON-LD SCHEMAS ----------

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: {
        "@type": "WebPage",
        "@id": SITE_URL,
        name: "Home",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculators",
      item: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/calculators`,
        name: "Calculators",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Time Calculators",
      item: {
        "@type": "WebPage",
        "@id": PAGE_URL,
        name: "Time Calculators",
      },
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you calculate exact age?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Subtract the birth date from the target date and express the result in years, months and days, taking month lengths and leap years into account. The Age Calculator does this automatically.",
      },
    },
    {
      "@type": "Question",
      name: "How many days are between two dates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on whether you count the end date. The Date Calculator can show the difference; just be consistent about inclusive or exclusive counting.",
      },
    },
    {
      "@type": "Question",
      name: "Does a leap year change my age calculation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If the period includes 29 February, the total number of days is one higher than in a non-leap year. Good age calculators handle this automatically.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate hours worked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the start time and end time, then subtract any unpaid breaks. If the shift crosses midnight, treat the end time as the next day. The Hours Calculator is built for this.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between date difference and time duration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Date difference counts calendar days between two dates. Time duration counts hours, minutes and seconds and does not care about calendar dates.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these calculators for payroll?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They are useful for checking and planning, but official payroll should follow your company’s system and local labour rules, which may round or define hours differently.",
      },
    },
    {
      "@type": "Question",
      name: "Why do two age calculators sometimes give different results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually because they use a different target date, or one counts full months differently around month-end and leap days. Check the exact dates each tool is using.",
      },
    },
    {
      "@type": "Question",
      name: "How do I add days to a date?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the Date Calculator: enter the starting date and the number of days to add (or subtract). It returns the resulting calendar date.",
      },
    },
    {
      "@type": "Question",
      name: "What if my shift goes past midnight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Count the hours from the start time to midnight, then from midnight to the end time, and add them. Most Hours Calculators handle this when you enter the correct end time on the next day.",
      },
    },
    {
      "@type": "Question",
      name: "Is age calculated to today or to a specific date?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You choose. Many forms need age on a deadline date, not on the day you fill the form. Always set the target date the organiser requires.",
      },
    },
    {
      "@type": "Question",
      name: "Do time zones affect these calculators?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The basic tools on this page work with the dates and times you enter and do not automatically convert time zones. For travel or distributed teams you may need to adjust the times first.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is a date difference across many years?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is exact as long as leap years are handled correctly. The main source of disagreement between tools is the rule for counting the end day, not the calendar arithmetic itself.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Time Calculators | Age, Date Difference & Hours Tools",
  description:
    "Free online time calculators for age, date difference, time duration, and working hours. Accurate tools for personal dates, planning, and time tracking.",
  url: PAGE_URL,
  isPartOf: {
    "@type": "WebSite",
    name: "LizoCalc",
    url: SITE_URL,
  },
  about: {
    "@type": "Thing",
    name: "Time Calculators",
  },
  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Time Calculators",
  itemListElement: [
    "Age Calculator",
    "Date Calculator",
    "Time Calculator",
    "Hours Calculator",
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

      <TimeCalculators />
    </>
  );
}