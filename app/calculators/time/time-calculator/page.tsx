import { Metadata } from "next";
import TimeCalculator from "./clientside";
import { Clock } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How does the time calculator work?",
    answer:
      "The time calculator converts your input into various units (seconds, minutes, hours) based on standard chronological conversion factors.",
  },
  {
    question: "Can I use this for scheduling?",
    answer:
      "Yes, this tool helps you quickly calculate total durations, which is useful for time management, project scheduling, and daily planning.",
  },
];

export const metadata: Metadata = {
  title: "Time Calculator | Convert Hours, Minutes, and Seconds",
  description:
    "Use our free time calculator to instantly convert and calculate total durations in hours, minutes, and seconds.",

  keywords: [
    "time calculator",
    "convert time",
    "hours to minutes",
    "time duration calculator",
    "calculate time difference",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/time/time-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Time Calculator | LizoCalc",
    description:
      "Easily convert and calculate time durations with our simple online time calculator.",
    url: "https://lizocalc.com/calculators/time/time-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Time Calculator | LizoCalc",
    description:
      "Calculate total time durations and convert units instantly.",
  },
};

export default function TimePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === STRUCTURED DATA FOR TIME CALCULATOR === */}
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
                "@id": "https://lizocalc.com/calculators/time/time-calculator#breadcrumb",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://lizocalc.com" },
                  { "@type": "ListItem", position: 2, name: "Calculators", item: "https://lizocalc.com/calculators" },
                  { "@type": "ListItem", position: 3, name: "Time Calculator", item: "https://lizocalc.com/calculators/time/time-calculator" },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/time/time-calculator",
                url: "https://lizocalc.com/calculators/time/time-calculator",
                name: "Time Calculator",
                description: "Easily convert and calculate time durations in hours, minutes, and seconds.",
                inLanguage: "en",
                isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://lizocalc.com" }
              },
              {
                "@type": "FAQPage",
                mainEntity: faqData.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: { "@type": "Answer", text: item.answer },
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
              Time Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <TimeCalculator />
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
          What is this Time Calculator?
        </h2>

        <p>1000+ words of SEO content here regarding time conversion...</p>

        <h3>How it works</h3>

        <p>Your explanation of time units...</p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}