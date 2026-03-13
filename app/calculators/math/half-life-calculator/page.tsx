import { Metadata } from "next";
import { Home} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import HalfLifeCalculator from "./clientside";

const faqData = [
  {
    question: "What is half-life?",
    answer:
      "Half-life describes the time required for a quantity to reduce to half of its initial value.",
  },
  {
    question: "How is half-life used in calculations?",
    answer:
      "It is used to determine remaining quantity over time, decay constants, and decay percentages.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Half-Life Calculator",
  description:
    "Use our advanced half-life calculator to compute remaining quantity, decay constants, and half-lives elapsed.",
  keywords: [
    "half-life calculator",
    "radioactive decay calculator",
    "decay constant calculator",
    "remaining quantity calculator",
    "advanced half-life calculator",
  ],
  alternates: {
    canonical: "https://lizocalc.com/calculators/math/half-life-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Advanced Half-Life Calculator | LizoCalc",
    description:
      "Free advanced half-life calculator to compute remaining amount, decay constant, and decay percentage.",
    url: "https://lizocalc.com/calculators/math/half-life-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Half-Life Calculator | LizoCalc",
    description:
      "Calculate remaining quantity, half-lives elapsed, and decay constants with our free half-life calculator.",
  },
};

export default function HalfLifePage() {
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
                "@id": "https://lizocalc.com/calculators/math/half-life-calculator#breadcrumb",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://lizocalc.com" },
                  { "@type": "ListItem", position: 2, name: "Calculators", item: "https://lizocalc.com/calculators" },
                  { "@type": "ListItem", position: 3, name: "Math Calculators", item: "https://lizocalc.com/calculators/math" },
                  { "@type": "ListItem", position: 4, name: "Half-Life Calculator", item: "https://lizocalc.com/calculators/math/half-life-calculator" },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/math/half-life-calculator",
                url: "https://lizocalc.com/calculators/math/half-life-calculator",
                name: "Advanced Half-Life Calculator",
                description: "Use our advanced half-life calculator to compute remaining quantity, decay constants, and half-lives elapsed.",
                inLanguage: "en",
                isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://lizocalc.com" },
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://lizocalc.com/calculators/math/half-life-calculator#app",
                name: "Advanced Half-Life Calculator",
                url: "https://lizocalc.com/calculators/math/half-life-calculator",
                description: "Advanced half-life calculator to compute remaining quantity, decay constants, and total decay.",
                applicationCategory: "ScienceApplication",
                applicationSubCategory: "Half-Life Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements: "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate remaining amount",
                  "Compute decay constant",
                  "Compute half-lives elapsed",
                  "Calculate decay percentage",
                  "Reset and recalculate instantly",
                ],
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                creator: { "@type": "Organization", name: "LizoCalc", url: "https://lizocalc.com" },
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
              <Home className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Half-Life Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <HalfLifeCalculator/>
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
          What is this Half-Life Calculator?
        </h2>

        <p>1000+ words of SEO content here about half-life, decay, radioactive materials, carbon dating, and practical applications.</p>

        <h3>How it works</h3>

        <p>Enter the initial amount, half-life time, and total time to calculate remaining amount, decay constant, half-lives elapsed, and decay percentage instantly.</p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
