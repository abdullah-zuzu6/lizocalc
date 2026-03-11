import { Metadata } from "next";
import AdvancedMortgageCalculator from "./clientside";
import { Home } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is a mortgage payment calculated?",
    answer:
      "The monthly payment is calculated using the standard amortization formula based on your principal, interest rate, and term.",
  },
  {
    question: "Can I make extra payments?",
    answer:
      "Yes, our calculator includes an extra payment field to show you how much interest you can save over time.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Mortgage Calculator | LizoCalc",
  description:
    "Use our advanced mortgage calculator to estimate monthly payments, interest, taxes, and insurance instantly.",

  keywords: [
    "mortgage calculator",
    "home loan calculator",
    "mortgage payment calculator",
    "monthly mortgage calculator",
    "advanced mortgage calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/mortgage-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Mortgage Calculator | LizoCalc",
    description:
      "Free advanced mortgage calculator to calculate monthly payments and amortization.",
    url: "https://lizocalc.com/calculators/financial/mortgage-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Mortgage Calculator | LizoCalc",
    description:
      "Calculate mortgage payments, interest, and amortization with our free mortgage calculator.",
  },
};

export default function MortgagePage() {
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
                  "https://lizocalc.com/calculators/financial/mortgage-calculator#breadcrumb",
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
                    name: "Mortgage Calculator",
                    item: "https://lizocalc.com/calculators/financial/mortgage-calculator",
                  },
                ],
              },
              {
  "@type": "WebPage",
  "@id": "https://lizocalc.com/calculators/financial/mortgage-calculator",
  url: "https://lizocalc.com/calculators/financial/mortgage-calculator",
  name: "Advanced Mortgage Calculator",
  description: "Use our advanced mortgage calculator to estimate monthly mortgage payments, interest, taxes, and insurance instantly.",
  "inLanguage": "en",   // <-- add this
  "isPartOf": {
    "@type": "WebSite",
    "name": "LizoCalc",
    "url": "https://lizocalc.com"
  }
},

              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://lizocalc.com/calculators/financial/mortgage-calculator#app",
                name: "Advanced Mortgage Calculator",
                url: "https://lizocalc.com/calculators/financial/mortgage-calculator",
                description:
                  "Advanced mortgage calculator to estimate monthly payments, interest, taxes, and amortization schedule.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Mortgage Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate monthly mortgage payments",
                  "Estimate total interest",
                  "View amortization schedule",
                  "Add extra monthly payments",
                  "Calculate taxes and insurance",
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
              <Home className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Advanced Mortgage Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedMortgageCalculator />

        <div className="bg-card rounded-2xl border border-border p-8 mt-8 max-w-6xl mx-auto">
          <h3 className="font-semibold text-lg mb-6">Related Calculators</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/calculators/financial/loan-calculator"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Loan Calculator</p>
              <p className="text-sm text-muted-foreground">
                Calculate personal loan payments
              </p>
            </Link>

            <Link
              href="/calculators/financial/interest-calculator"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Interest Calculator</p>
              <p className="text-sm text-muted-foreground">
                Calculate compound interest
              </p>
            </Link>

            <Link
              href="/calculators/financial/payment-calculator"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Payment Calculator</p>
              <p className="text-sm text-muted-foreground">
                Calculate payments
              </p>
            </Link>
          </div>
        </div>
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
          What is this Mortgage Calculator?
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
