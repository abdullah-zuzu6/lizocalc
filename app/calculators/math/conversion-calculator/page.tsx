import { Metadata } from "next";
import ConversionCalculator from "./clientside";
import { ArrowRightLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How are unit conversions calculated?",
    answer:
      "Unit conversions are calculated using precise mathematical conversion factors for length, weight, and temperature to ensure accurate results.",
  },
  {
    question: "Can I convert between different measurement systems?",
    answer:
      "Yes, our unit converter supports seamless conversion between metric and imperial systems, including meters, feet, kilograms, pounds, and more.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Unit Converter",
  description:
    "Use our advanced unit converter to estimate length, weight, and temperature conversions instantly with high precision.",

  keywords: [
    "unit converter",
    "measurement converter",
    "metric to imperial converter",
    "length converter",
    "weight converter",
    "temperature converter",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/math/conversion-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Unit Converter | LizoCalc",
    description:
      "Free advanced unit converter to calculate measurements across metric and imperial systems.",
    url: "https://lizocalc.com/calculators/math/conversion-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Unit Converter | LizoCalc",
    description:
      "Calculate length, weight, and temperature conversions with our free unit converter.",
  },
};

export default function ConversionPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === SINGLE JSON-LD SCRIPT === */}
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
                  "https://lizocalc.com/calculators/math/conversion-calculator#breadcrumb",
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
                    name: "Math Calculators",
                    item: "https://lizocalc.com/calculators/math",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Unit Converter",
                    item: "https://lizocalc.com/calculators/math/conversion-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/math/conversion-calculator",
                url: "https://lizocalc.com/calculators/math/conversion-calculator",
                name: "Advanced Unit Converter",
                description: "Use our advanced unit converter to estimate measurements across various systems instantly.",
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
                  "https://lizocalc.com/calculators/math/conversion-calculator#app",
                name: "Advanced Unit Converter",
                url: "https://lizocalc.com/calculators/math/conversion-calculator",
                description:
                  "Advanced unit converter to estimate length, weight, and temperature conversions.",
                applicationCategory: "UtilitiesApplication",
                applicationSubCategory: "Unit Converter",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Convert length units",
                  "Convert weight units",
                  "Convert temperature scales",
                  "High precision results",
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
              <ArrowRightLeft className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Unit Converter
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <ConversionCalculator />
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
          What is this Unit Converter?
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