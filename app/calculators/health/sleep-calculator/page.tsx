import { Metadata } from "next";
import AdvancedSleepCalculator from "./clientside";
import { Moon } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is a sleep schedule calculated?",
    answer:
      "A sleep schedule is calculated by working backward from your desired wake-up time in 90-minute intervals, which represent the average duration of a full human sleep cycle.",
  },
  {
    question: "Why are 90-minute cycles used?",
    answer:
      "Humans typically cycle through different stages of sleep in about 90 minutes. Waking up at the end of a cycle rather than in the middle of deep sleep helps you feel more refreshed.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Sleep Calculator ",
  description:
    "Use our advanced sleep calculator to find the best times to go to bed and wake up, helping you wake up feeling refreshed by timing your sleep cycles.",

  keywords: [
    "sleep calculator",
    "bedtime calculator",
    "sleep cycle calculator",
    "wake up time calculator",
    "advanced sleep calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/health/sleep-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Sleep Calculator | LizoCalc",
    description:
      "Free advanced sleep calculator to plan your bedtime and wake-up time based on sleep cycles.",
    url: "https://lizocalc.com/calculators/health/sleep-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Sleep Calculator | LizoCalc",
    description:
      "Calculate your optimal bedtime and wake-up time with our free health calculator.",
  },
};

export default function SleepPage() {
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
                  "https://lizocalc.com/calculators/health/sleep-calculator#breadcrumb",
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
                    name: "Health Calculators",
                    item: "https://lizocalc.com/calculators/health",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Sleep Calculator",
                    item: "https://lizocalc.com/calculators/health/sleep-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/sleep-calculator",
                url: "https://lizocalc.com/calculators/health/sleep-calculator",
                name: "Advanced Sleep Calculator",
                description: "Use our advanced sleep calculator to find the best times to go to bed and wake up, helping you wake up feeling refreshed by timing your sleep cycles.",
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
                  "https://lizocalc.com/calculators/health/sleep-calculator#app",
                name: "Advanced Sleep Calculator",
                url: "https://lizocalc.com/calculators/health/sleep-calculator",
                description:
                  "Advanced sleep calculator to determine optimal bedtimes and wake-up times using sleep cycle logic.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "Sleep Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate optimal bedtime",
                  "Calculate ideal wake-up times",
                  "Sleep cycle-based recommendations",
                  "Improve sleep quality and wakefulness",
                  "Easy to use planning tool",
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
              <Moon className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Sleep Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedSleepCalculator />
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
          What is this Sleep Calculator?
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