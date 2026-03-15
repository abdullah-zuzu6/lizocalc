import { Metadata } from "next";
import { PiggyBank } from "lucide-react"; // Changed icon to fit 401k
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Advanced401kDashboard from "./clientside";

const faqData = [
  {
    question: "How is a 401k contribution calculated?",
    answer:
      "A 401k contribution is typically calculated as a percentage of your gross annual salary, which is then deferred into your retirement account before taxes.",
  },
  {
    question: "Can I adjust my 401k contributions?",
    answer:
      "Yes, our calculator allows you to input different contribution percentages to see how they impact your long-term retirement savings growth.",
  },
];

export const metadata: Metadata = {
  title: "401k Calculator",
  description:
    "Use our advanced 401k calculator to estimate your retirement savings growth, employer match, and total balance over time.",

  keywords: [
    "401k calculator",
    "retirement calculator",
    "401k savings calculator",
    "retirement savings planner",
    "advanced 401k calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/401k-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "401k Calculator | LizoCalc",
    description:
      "Free advanced 401k calculator to estimate your retirement savings and employer match.",
    url: "https://lizocalc.com/calculators/financial/401k-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "401k Calculator | LizoCalc",
    description:
      "Calculate your 401k retirement growth and savings with our free calculator.",
  },
};

export default function FourOhOneKPage() {
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
                  "https://lizocalc.com/calculators/financial/401k-calculator#breadcrumb",
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
                    name: "401k Calculator",
                    item: "https://lizocalc.com/calculators/financial/401k-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/financial/401k-calculator",
                url: "https://lizocalc.com/calculators/financial/401k-calculator",
                name: "401k Calculator",
                description: "Use our advanced 401k calculator to estimate your retirement savings growth, employer match, and total balance over time.",
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
                  "https://lizocalc.com/calculators/financial/401k-calculator#app",
                name: "401k Calculator",
                url: "https://lizocalc.com/calculators/financial/401k-calculator",
                description:
                  "Advanced 401k calculator to estimate retirement savings growth, employer match, and future balance.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Retirement Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate retirement savings growth",
                  "Include employer match contributions",
                  "Estimate future portfolio balance",
                  "Visualize compound interest impact",
                  "Adjust annual contribution rates",
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
            <div className="p-3 rounded-lg bg-green-600/10">
              <PiggyBank className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              401k Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <Advanced401kDashboard />
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
          What is this 401k Calculator?
        </h2>

        <p>1000+ words of SEO content about retirement planning here...</p>

        <h3>How it works</h3>

        <p>Your explanation of how 401k matching and compounding works...</p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}