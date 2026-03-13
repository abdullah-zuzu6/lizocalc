import { Metadata } from "next";
import TriangleCalculator from "./clientside";
import { Home } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is the area of a triangle calculated?",
    answer:
      "The area of a triangle can be calculated using formulas like 1/2 * base * height, Heron's formula, or using trigonometry depending on the given data.",
  },
  {
    question: "Can I calculate triangle sides if only angles are given?",
    answer:
      "Yes, if you know one side and the angles, you can calculate the other sides using the sine rule.",
  },
];

export const metadata: Metadata = {
  title: "Triangle Calculator | Advanced Geometry Tool",
  description:
    "Use our triangle calculator to calculate area, perimeter, height, angles, and sides easily.",

  keywords: [
    "triangle calculator",
    "triangle area calculator",
    "triangle height calculator",
    "triangle perimeter calculator",
    "triangle side calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/math/triangle-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Triangle Calculator | LizoCalc",
    description:
      "Free triangle calculator to compute area, perimeter, height, sides, and angles quickly.",
    url: "https://lizocalc.com/calculators/math/triangle-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Triangle Calculator | LizoCalc",
    description:
      "Calculate triangle area, perimeter, angles, and sides with our free triangle calculator.",
  },
};

export default function TrianglePage() {
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
                  "https://lizocalc.com/calculators/math/triangle-calculator#breadcrumb",
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
                    name: "Triangle Calculator",
                    item: "https://lizocalc.com/calculators/math/triangle-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/math/triangle-calculator",
                url: "https://lizocalc.com/calculators/math/triangle-calculator",
                name: "Triangle Calculator",
                description:
                  "Use our triangle calculator to compute area, perimeter, sides, height, and angles instantly.",
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
                  "https://lizocalc.com/calculators/math/triangle-calculator#app",
                name: "Triangle Calculator",
                url: "https://lizocalc.com/calculators/math/triangle-calculator",
                description:
                  "Advanced triangle calculator to compute area, perimeter, height, angles, and sides.",
                applicationCategory: "MathApplication",
                applicationSubCategory: "Triangle Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements: "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate triangle area",
                  "Calculate perimeter",
                  "Calculate height",
                  "Calculate angles",
                  "Calculate sides",
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
            <h1 className="text-3xl md:text-4xl font-bold">Triangle Calculator</h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <TriangleCalculator />
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
          What is this Triangle Calculator?
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