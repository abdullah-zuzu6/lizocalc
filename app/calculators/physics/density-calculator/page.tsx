import { Metadata } from "next";
import DensityCalculator from "./clientside"; // Assuming your component is named DensityCalculator
import { FlaskConical } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is density calculated?",
    answer:
      "Density is calculated by dividing an object's mass by its volume, using the formula ρ = m / V (density = mass / volume).",
  },
  {
    question: "What are the standard units for density?",
    answer:
      "In the SI system, density is commonly measured in kilograms per cubic meter (kg/m³). Other common units include grams per cubic centimeter (g/cm³).",
  },
];

export const metadata: Metadata = {
  title: "Density Calculator | Calculate Mass, Volume & Density",
  description:
    "Use our free density calculator to instantly find the density, mass, or volume of an object. Supports multiple units and scientific calculations.",

  keywords: [
    "density calculator",
    "calculate density",
    "mass vs volume",
    "physics calculator",
    "density formula",
    "calculate mass",
    "calculate volume",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/physics/density-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Density Calculator | LizoCalc",
    description:
      "Calculate density, mass, or volume instantly with our free online physics calculator.",
    url: "https://lizocalc.com/calculators/physics/density-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Density Calculator | LizoCalc",
    description:
      "Quickly calculate density, mass, and volume with our advanced physics tool.",
  },
};

export default function DensityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === STRUCTURED JSON-LD DATA === */}
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
                "@id": "https://lizocalc.com/calculators/physics/density-calculator#breadcrumb",
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
                    name: "Physics Calculators",
                    item: "https://lizocalc.com/calculators/physics",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Density Calculator",
                    item: "https://lizocalc.com/calculators/physics/density-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/physics/density-calculator",
                url: "https://lizocalc.com/calculators/physics/density-calculator",
                name: "Density Calculator",
                description: "Use our density calculator to estimate mass, volume, and material density instantly.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://lizocalc.com"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://lizocalc.com/calculators/physics/density-calculator#app",
                name: "Density Calculator",
                url: "https://lizocalc.com/calculators/physics/density-calculator",
                description: "Calculate density, mass, or volume using our advanced physics utility.",
                applicationCategory: "PhysicsApplication",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements: "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate density given mass and volume",
                  "Solve for missing mass",
                  "Solve for missing volume",
                  "Material density presets",
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
              <FlaskConical className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Density Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <DensityCalculator />
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
          What is this Density Calculator?
        </h2>
        <p>1000+ words of SEO content here regarding physics density...</p>
        <h3>How it works</h3>
        <p>Your explanation...</p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}