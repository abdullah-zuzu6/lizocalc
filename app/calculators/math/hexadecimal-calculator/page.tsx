import { Metadata } from "next";
import { Home } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import HexCalculator from "./clientside";

const faqData = [
  {
    question: "How do I convert decimal numbers to hexadecimal?",
    answer:
      "Enter the decimal number in the input field, and the calculator will instantly convert it to a hexadecimal value.",
  },
  {
    question: "Can I convert hexadecimal back to decimal?",
    answer:
      "Yes, you can input hexadecimal numbers using digits 0-9 and letters A-F to get their decimal equivalents.",
  },
];

export const metadata: Metadata = {
  title: "Hexadecimal Calculator",
  description:
    "Use our hexadecimal calculator to convert between decimal and hexadecimal values quickly and accurately.",
  keywords: [
    "hexadecimal calculator",
    "decimal to hex calculator",
    "hex to decimal converter",
    "number conversion tool",
    "hex calculator online",
  ],
  alternates: {
    canonical: "https://lizocalc.com/calculators/math/hexadecimal-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Hexadecimal Calculator | LizoCalc",
    description:
      "Free hexadecimal calculator to convert decimal numbers to hex and vice versa.",
    url: "https://lizocalc.com/calculators/math/hexadecimal-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hexadecimal Calculator | LizoCalc",
    description:
      "Convert decimal numbers to hexadecimal and back with our free hex calculator.",
  },
};

export default function HexadecimalPage() {
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
                  "https://lizocalc.com/calculators/math/hexadecimal-calculator#breadcrumb",
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
                    name: "Hexadecimal Calculator",
                    item: "https://lizocalc.com/calculators/math/hexadecimal-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/math/hexadecimal-calculator",
                url: "https://lizocalc.com/calculators/math/hexadecimal-calculator",
                name: "Hexadecimal Calculator",
                description:
                  "Use our hexadecimal calculator to convert decimal numbers to hexadecimal and back instantly.",
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
                  "https://lizocalc.com/calculators/math/hexadecimal-calculator#app",
                name: "Hexadecimal Calculator",
                url: "https://lizocalc.com/calculators/math/hexadecimal-calculator",
                description:
                  "Hexadecimal calculator to convert decimal numbers to hexadecimal and vice versa.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Convert decimal to hexadecimal",
                  "Convert hexadecimal to decimal",
                  "Supports digits 0-9 and letters A-F",
                  "Instant conversion results",
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
            <h1 className="text-3xl md:text-4xl font-bold">Hexadecimal Calculator</h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <HexCalculator/>
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
          What is this Hexadecimal Calculator?
        </h2>

        <p>1000+ words of SEO content explaining hexadecimal numbers, decimal conversion, uses in computing, and tips for fast conversions.</p>

        <h3>How it works</h3>

        <p>Simply enter a decimal number to get its hexadecimal equivalent or vice versa. The calculator only allows inputs 0-9 and A-F for accurate conversion.</p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}