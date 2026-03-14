import { Metadata } from "next";
import HoursCalculator from "./clientside";
import { Clock } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How are hours calculated between two times?",
    answer:
      "The calculator determines the duration by converting both start and end times into minutes from the start of the day (00:00), accounting for AM/PM and potential midnight crossovers.",
  },
  {
    question: "Does this calculator support overnight shifts?",
    answer:
      "Yes, our calculator automatically detects when an end time is earlier than a start time and assumes the duration spans across midnight to the next day.",
  },
];

export const metadata: Metadata = {
  title: "Hours Calculator | Calculate Time Difference ",
  description:
    "Use our hours calculator to find the exact duration between two times, including AM/PM support and midnight crossover calculation.",

  keywords: [
    "hours calculator",
    "time difference calculator",
    "calculate hours between times",
    "duration calculator",
    "shift hours calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/time/hours-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Hours Calculator | LizoCalc",
    description:
      "Free hours calculator to calculate time duration between two points in a 12-hour format.",
    url: "https://lizocalc.com/calculators/time/hours-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hours Calculator | LizoCalc",
    description:
      "Calculate time duration and hours between two specific times with our free hours calculator.",
  },
};

export default function HoursPage() {
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
                  "https://lizocalc.com/calculators/time/hours-calculator#breadcrumb",
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
                    name: "Time Calculators",
                    item: "https://lizocalc.com/calculators/time",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Hours Calculator",
                    item: "https://lizocalc.com/calculators/time/hours-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/time/hours-calculator",
                url: "https://lizocalc.com/calculators/time/hours-calculator",
                name: "Hours Calculator",
                description: "Use our hours calculator to find the exact duration between two times, including AM/PM support and midnight crossover calculation.",
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
                  "https://lizocalc.com/calculators/time/hours-calculator#app",
                name: "Hours Calculator",
                url: "https://lizocalc.com/calculators/time/hours-calculator",
                description:
                  "Free hours calculator to determine the exact time duration between two times, supporting overnight calculations.",
                applicationCategory: "UtilityApplication",
                applicationSubCategory: "Time Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate duration between two times",
                  "Supports AM/PM format",
                  "Handles overnight (midnight) shifts",
                  "Provides result in decimal hours and minutes",
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
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Hours Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <HoursCalculator />
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
          What is this Hours Calculator?
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