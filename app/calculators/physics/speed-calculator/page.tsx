import { Metadata } from "next";
import SpeedCalculator from "./clientside";
import { Zap } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "What is speed in physics?",
    answer:
      "Speed is the rate at which an object covers distance over time. It is commonly calculated using the formula Speed = Distance ÷ Time.",
  },
  {
    question: "How do you calculate speed?",
    answer:
      "Speed can be calculated by dividing the total distance traveled by the total time taken. Our calculator automatically computes speed when you enter distance and time.",
  },
];

export const metadata: Metadata = {
  title: "Speed Calculator ",

  description:
    "Use our physics speed calculator to calculate speed, distance, or time instantly using the formula Speed = Distance ÷ Time.",

  keywords: [
    "speed calculator",
    "physics speed calculator",
    "calculate speed formula",
    "distance time speed calculator",
    "speed formula calculator",
  ],

  alternates: {
    canonical: "http://lizocalc.com/calculators/physics/speed-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Speed Calculator | LizoCalc",
    description:
      "Free physics speed calculator to calculate speed, distance, and time using simple formulas.",
    url: "http://lizocalc.com/calculators/physics/speed-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Speed Calculator | LizoCalc",
    description:
      "Calculate speed, distance, or time instantly with our free physics speed calculator.",
  },
};

export default function SpeedCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      {" "}
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
                  "http://lizocalc.com/calculators/physics/speed-calculator#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "http://lizocalc.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Calculators",
                    item: "http://lizocalc.com/calculators",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Physics Calculators",
                    item: "http://lizocalc.com/calculators/physics",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Speed Calculator",
                    item: "http://lizocalc.com/calculators/physics/speed-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id":
                  "http://lizocalc.com/calculators/physics/speed-calculator",
                url: "http://lizocalc.com/calculators/physics/speed-calculator",
                name: "Speed Calculator",
                description:
                  "Use our physics speed calculator to calculate speed, distance, and time instantly.",
                inLanguage: "en",
                isPartOf: {
                  "@type": "WebSite",
                  name: "LizoCalc",
                  url: "http://lizocalc.com",
                },
              },

              {
                "@type": "SoftwareApplication",
                "@id":
                  "http://lizocalc.com/calculators/physics/speed-calculator#app",
                name: "Speed Calculator",
                url: "http://lizocalc.com/calculators/physics/speed-calculator",
                description:
                  "Physics speed calculator to estimate speed, distance, or time using the formula Speed = Distance ÷ Time.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "Physics Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate speed from distance and time",
                  "Calculate distance using speed and time",
                  "Calculate time using distance and speed",
                  "Supports physics formulas",
                  "Works on all devices",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@type": "Organization",
                  name: "LizoCalc",
                  url: "http://lizocalc.com",
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
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Speed Calculator</h1>
          </div>
        </div>
      </section>
      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <SpeedCalculator />
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
          What is this Speed Calculator?
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
