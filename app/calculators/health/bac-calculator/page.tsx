import { Metadata } from "next";
import BACCalculator from "./clientside";
import { Home } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is BAC calculated?",
    answer:
      "BAC (Blood Alcohol Content) is calculated based on your weight, gender, number of drinks, and time spent drinking. This calculator estimates your BAC level.",
  },
  {
    question: "Can I use this to know if I am legally intoxicated?",
    answer:
      "This calculator provides an estimate of your BAC. Legal intoxication limits vary by country, so always follow local laws and never drink and drive.",
  },
];

export const metadata: Metadata = {
  title: "BAC Calculator",
  description:
    "Use our BAC calculator to estimate your blood alcohol content based on drinks, weight, gender, and time.",
  keywords: [
    "BAC calculator",
    "blood alcohol content calculator",
    "alcohol calculator",
    "drink calculator",
    "alcohol level estimation",
  ],
  alternates: {
    canonical: "https://lizocalc.com/calculators/health/bac-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "BAC Calculator | LizoCalc",
    description:
      "Free BAC calculator to estimate your blood alcohol content level quickly and accurately.",
    url: "https://lizocalc.com/calculators/health/bac-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BAC Calculator | LizoCalc",
    description:
      "Estimate your blood alcohol content with our free BAC calculator based on drinks, weight, gender, and time.",
  },
};

export default function BACPage() {
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
                  "https://lizocalc.com/calculators/health/bac-calculator#breadcrumb",
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
                    name: "BAC Calculator",
                    item: "https://lizocalc.com/calculators/health/bac-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/bac-calculator",
                url: "https://lizocalc.com/calculators/health/bac-calculator",
                name: "BAC Calculator",
                description:
                  "Use our BAC calculator to estimate your blood alcohol content based on drinks, weight, gender, and time.",
                inLanguage: "en",
                isPartOf: {
                  "@type": "WebSite",
                  name: "LizoCalc",
                  url: "https://lizocalc.com",
                },
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://lizocalc.com/calculators/health/bac-calculator#app",
                name: "BAC Calculator",
                url: "https://lizocalc.com/calculators/health/bac-calculator",
                description:
                  "BAC calculator to estimate blood alcohol content level based on drinks, weight, gender, and time.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "BAC Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Estimate your BAC level",
                  "Supports multiple drinks and time intervals",
                  "Adjust for gender and weight",
                  "Instant BAC calculation",
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
            <h1 className="text-3xl md:text-4xl font-bold">BAC Calculator</h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <BACCalculator />
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
          What is this BAC Calculator?
        </h2>

        <p>1000+ words of SEO content here explaining BAC, factors affecting blood alcohol content, safe drinking tips, and legal limits.</p>

        <h3>How it works</h3>

        <p>Enter your drinks, weight, gender, and time spent drinking. The calculator estimates your BAC level instantly and helps you understand your approximate alcohol level.</p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
