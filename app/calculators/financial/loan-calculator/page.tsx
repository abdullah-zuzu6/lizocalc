import { Metadata } from "next";
import AdvancedLoanCalculator from "./clientside";
import { Landmark } from "lucide-react"; // Updated icon for general loan context
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is a loan payment calculated?",
    answer:
      "The monthly payment is calculated using the standard amortization formula based on your total loan amount, annual interest rate, and the repayment term.",
  },
  {
    question: "Can I pay off my loan early?",
    answer:
      "Yes, our calculator allows you to see how extra payments reduce your principal balance and shorten the overall loan term, saving you money on interest.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Loan Calculator",
  description:
    "Use our advanced loan calculator to estimate monthly payments, interest, and total repayment costs for your personal or business loans instantly.",

  keywords: [
    "loan calculator",
    "personal loan calculator",
    "loan payment calculator",
    "monthly loan calculator",
    "advanced loan calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/loan-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Loan Calculator | LizoCalc",
    description:
      "Free advanced loan calculator to calculate monthly payments and amortization schedules.",
    url: "https://lizocalc.com/calculators/financial/loan-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Loan Calculator | LizoCalc",
    description:
      "Calculate loan payments, interest, and amortization with our free loan calculator.",
  },
};

export default function LoanPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === SINGLE JSON-LD SCRIPT (BEST PRACTICE) === */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://lizocalc.com/calculators/financial/loan-calculator#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://lizocalc.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Calculators",
                    item: "https://lizocalc.com/calculators",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Financial Calculators",
                    item: "https://lizocalc.com/calculators/financial",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Loan Calculator",
                    item: "https://lizocalc.com/calculators/financial/loan-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/financial/loan-calculator",
                url: "https://lizocalc.com/calculators/financial/loan-calculator",
                name: "Advanced Loan Calculator",
                description: "Use our advanced loan calculator to estimate monthly loan payments, interest, and total repayment costs instantly.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://lizocalc.com"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://lizocalc.com/calculators/financial/loan-calculator#app",
                name: "Advanced Loan Calculator",
                url: "https://lizocalc.com/calculators/financial/loan-calculator",
                description:
                  "Advanced loan calculator to estimate monthly payments, interest, and amortization schedule for various loan types.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Loan Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate monthly loan payments",
                  "Estimate total interest cost",
                  "View detailed amortization schedule",
                  "Add extra monthly payments",
                  "Compare different loan terms",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@type": "Organization",
                  name: "LizoCalc",
                  url: "https://lizocalc.com",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: faqData.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-600/10">
              <Landmark className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Loan Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedLoanCalculator />
      </section>

      {/* SEO Content */}
      <article
        className="max-w-6xl mx-auto px-6 py-16 
        prose prose-blue prose-lg lg:prose-xl
        prose-headings:font-extrabold
        prose-h2:text-blue-900
        prose-h2:border-b-2
        prose-h2:border-blue-200
        prose-h2:pb-2
        prose-p:text-gray-600
        prose-p:leading-relaxed"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          What is this Loan Calculator?
        </h2>

        <p>1000+ words of SEO content here...</p>

        <h3>How it works</h3>

        <p>Your explanation...</p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}