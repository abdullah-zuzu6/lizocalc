import { Metadata } from "next";
import DateCalculatorClient from "./clientside"; // Assuming your client component is named this
import { Calendar } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How does the date calculator handle leap years?",
    answer:
      "The calculator uses the standard Gregorian calendar system, automatically accounting for leap years (February 29th) when calculating the difference between two dates.",
  },
  {
    question: "Does 'Include end day' change the result?",
    answer:
      "Yes. Typically, date calculations are exclusive of the end day. Checking this box adds 1 day to the total count, which is often used for calculating the total duration of a contract or event.",
  },
];

export const metadata: Metadata = {
  title: "Date Calculator | Calculate Days Between Dates",
  description:
    "Use our free date calculator to find the exact number of days between two dates or add/subtract time from a specific date easily.",

  keywords: [
    "date calculator",
    "days between dates",
    "add days to date",
    "subtract days from date",
    "duration calculator",
    "time calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/time/date-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Date Calculator | LizoCalc",
    description:
      "Free date calculator to estimate duration between dates and perform date arithmetic.",
    url: "https://lizocalc.com/calculators/time/date-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Date Calculator | LizoCalc",
    description:
      "Calculate duration between dates and add or subtract time with our free date calculator.",
  },
};

export default function DateCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === JSON-LD STRUCTURED DATA === */}
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
                "@id": "https://lizocalc.com/calculators/time/date-calculator#breadcrumb",
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
                    name: "Date Calculator",
                    item: "https://lizocalc.com/calculators/time/date-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/time/date-calculator",
                url: "https://lizocalc.com/calculators/time/date-calculator",
                name: "Date Calculator",
                description: "Use our free date calculator to find the exact number of days between two dates or add/subtract time from a specific date easily.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://lizocalc.com"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://lizocalc.com/calculators/time/date-calculator#app",
                name: "Date Calculator",
                url: "https://lizocalc.com/calculators/time/date-calculator",
                description: "Calculate duration between dates and add or subtract time accurately using the Gregorian calendar.",
                applicationCategory: "UtilityApplication",
                applicationSubCategory: "Date Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements: "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate days between two dates",
                  "Add time to a specific date",
                  "Subtract time from a specific date",
                  "Include/Exclude end day option",
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
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Date Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <DateCalculatorClient />
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
          What is this Date Calculator?
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