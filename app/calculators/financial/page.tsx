import type { Metadata } from "next";
import Script from "next/script";
import FinancialCalculators from "./OtherCalculator";

export const metadata: Metadata = {
  title: "9+ Free Financial Calculators | Loan, Mortgage & ROI etc",
  description:
    "Use 9+ free financial calculators to calculate mortgages, loans, EMI, compound interest, ROI, inflation, salary, savings, and payments. Accurate formulas used by banks and lenders for smarter financial planning.",

  keywords: [
    "financial calculators",
    "free financial calculators",
    "mortgage calculator",
    "loan calculator",
    "EMI calculator",
    "auto loan calculator",
    "compound interest calculator",
    "interest calculator",
    "payment calculator",
    "salary calculator",
    "ROI calculator",
    "inflation calculator",
    "financial planning calculator",
    "loan payment calculator",
    "mortgage payment calculator",
    "loan amortization calculator",
    "APR calculator",
    "investment calculator",
    "savings calculator",
    "bank loan calculator",
    "finance tools",
  ],

  openGraph: {
    title:
      "9+ Free Financial Calculators | Mortgage, Loan, ROI, EMI & Interest Tools",
    description:
      "Calculate mortgages, loans, EMI, compound interest, ROI, inflation, salary, savings, and payments with accurate financial calculators using real banking formulas.",
    url: "https://www.lizocalc.com/calculators/financial",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "9+ Free Financial Calculators | Mortgage, Loan, ROI & EMI Tools",
    description:
      "Free mortgage, loan, EMI, ROI, salary, inflation, savings, and compound interest calculators built with accurate financial formulas.",
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
    canonical: "https://www.lizocalc.com/calculators/financial",
  },

  category: "Finance",

  applicationName: "LizoCalc",

  authors: [
    {
      name: "LizoCalc",
    },
  ],
};

const SITE_URL = "https://www.lizocalc.com";
const PAGE_URL = `${SITE_URL}/calculators/financial`;

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
      name: "Financial Calculators",
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
      name: "Is a financial calculator, like a TI-84 or HP, still worth buying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most people, no. A web-based calculator does the math instantly and for free. Physical financial calculators still matter for people pursuing specific professional certifications like the CFP exam. For everyday budgeting, loan, or savings questions, an online tool is faster and just as accurate.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use a spreadsheet or a calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on what you want to do. Spreadsheets are more flexible for testing scenarios or tracking something over time. A calculator is faster when you just need an answer. Many people use both: a calculator to check a number and a spreadsheet to track it over time.",
      },
    },
    {
      "@type": "Question",
      name: "How much will $10,000 be worth in 20 years?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the growth rate and compounding frequency. At 7% per year compounded annually, $10,000 grows to about $38,700 in 20 years. Use the Compound Interest Calculator to test your own numbers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a loan calculator and a payment calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A loan calculator shows the full picture of a loan: the amount borrowed, interest rate, term, and total interest. A payment calculator breaks an amount down into smaller payments, useful for things like payment plans and financed purchases.",
      },
    },
    {
      "@type": "Question",
      name: "Do these calculators account for taxes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Salary Calculator includes tax withholding to estimate take-home pay. The other calculators, like the mortgage and loan calculators, do the math without taxes since tax situations vary by person. Talk to a tax professional for tax-specific questions.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my bank's mortgage payment estimate differ from this calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The difference usually comes from added costs like property tax escrow, PMI, or HOA fees that the calculator doesn't include. The base principal-and-interest number should match; the bank adds other costs on top.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I recheck these numbers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Recheck anytime your interest rate, term, or loan amount changes. It's also worth rechecking your loan and mortgage numbers whenever interest rates shift, since that can affect refinancing options.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "9+ Free Financial Calculators | Loan, Mortgage & ROI etc",
  description:
    "Use 9+ free financial calculators to calculate mortgages, loans, EMI, compound interest, ROI, inflation, salary, savings, and payments.",
  url: PAGE_URL,
  isPartOf: {
    "@type": "WebSite",
    name: "LizoCalc",
    url: SITE_URL,
  },
  about: {
    "@type": "Thing",
    name: "Financial Calculators",
  },
  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Financial Calculators",
  itemListElement: [
    "Mortgage Calculator",
    "Loan Calculator",
    "Auto Loan Calculator",
    "Interest Calculator",
    "Payment Calculator",
    "Compound Interest Calculator",
    "Inflation Calculator",
    "Salary Calculator",
    "ROI Calculator",
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

      <FinancialCalculators />

      
    </>
  );
}

