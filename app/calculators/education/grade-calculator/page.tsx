import { Metadata } from "next";
import AdvancedGradeCalculator from "./clientside";
import { GraduationCap } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is a grade point average calculated?",
    answer:
      "The GPA is calculated by dividing the total amount of quality points earned by the total amount of credit hours attempted.",
  },
  {
    question: "Can I include weighted grades?",
    answer:
      "Yes, our calculator includes options to adjust for weighted assignments and course credits to give you an accurate academic projection.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Grade Calculator",
  description:
    "Use our advanced grade calculator to estimate your semester GPA, track academic performance, and project final grades instantly.",

  keywords: [
    "grade calculator",
    "GPA calculator",
    "semester grade calculator",
    "weighted grade calculator",
    "advanced grade calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/education/grade-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Grade Calculator | LizoCalc",
    description:
      "Free advanced grade calculator to calculate semester GPA and track academic progress.",
    url: "https://lizocalc.com/calculators/education/grade-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Grade Calculator | LizoCalc",
    description:
      "Calculate your GPA and track academic performance with our free grade calculator.",
  },
};

export default function GradePage() {
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
                  "https://lizocalc.com/calculators/education/grade-calculator#breadcrumb",
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
                    name: "Education Calculators",
                    item: "https://lizocalc.com/calculators/education",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Grade Calculator",
                    item: "https://lizocalc.com/calculators/education/grade-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/education/grade-calculator",
                url: "https://lizocalc.com/calculators/education/grade-calculator",
                name: "Advanced Grade Calculator",
                description: "Use our advanced grade calculator to estimate your semester GPA, track academic performance, and project final grades instantly.",
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
                  "https://lizocalc.com/calculators/education/grade-calculator#app",
                name: "Advanced Grade Calculator",
                url: "https://lizocalc.com/calculators/education/grade-calculator",
                description:
                  "Advanced grade calculator to estimate semester GPA, weighted grades, and track academic progress.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "Grade Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate semester GPA",
                  "Support for weighted grades",
                  "Track multiple courses",
                  "Instant academic standing projection",
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
              <GraduationCap className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Grade Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedGradeCalculator />
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
          What is this Grade Calculator?
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