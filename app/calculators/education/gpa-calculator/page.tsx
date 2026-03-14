import { Metadata } from "next";
import GPACalculator from "./clientside";
import { Home } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is GPA calculated?",
    answer:
      "GPA is calculated by taking the sum of grade points earned for each course multiplied by its credit hours, then dividing by the total credit hours attempted.",
  },
  {
    question: "Can I calculate GPA for multiple semesters?",
    answer:
      "Yes, this calculator allows you to compute GPA for individual semesters as well as cumulative GPA across multiple semesters.",
  },
];

export const metadata: Metadata = {
  title: "GPA Calculator",
  description:
    "Use our GPA calculator to calculate your Grade Point Average (GPA) instantly for single or multiple semesters.",

  keywords: [
    "GPA calculator",
    "grade point average calculator",
    "semester GPA calculator",
    "cumulative GPA calculator",
    "academic GPA calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/education/gpa-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "GPA Calculator | LizoCalc",
    description:
      "Free GPA calculator to compute your semester or cumulative GPA quickly and accurately.",
    url: "https://lizocalc.com/calculators/education/gpa-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GPA Calculator | LizoCalc",
    description:
      "Calculate your GPA for single or multiple semesters using our free GPA calculator.",
  },
};

export default function GPAPage() {
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
                  "https://lizocalc.com/calculators/education/gpa-calculator#breadcrumb",
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
                    name: "GPA Calculator",
                    item: "https://lizocalc.com/calculators/education/gpa-calculator",
                  },
                ],
              },
              {
  "@type": "WebPage",
  "@id": "https://lizocalc.com/calculators/education/gpa-calculator",
  url: "https://lizocalc.com/calculators/education/gpa-calculator",
  name: "GPA Calculator",
  description: "Use our GPA calculator to instantly compute your Grade Point Average for single or multiple semesters.",
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
                  "https://lizocalc.com/calculators/education/gpa-calculator#app",
                name: "GPA Calculator",
                url: "https://lizocalc.com/calculators/education/gpa-calculator",
                description:
                  "Educational GPA calculator to compute semester and cumulative GPA accurately.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "GPA Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate semester GPA",
                  "Compute cumulative GPA",
                  "Support multiple grading scales",
                  "Instant calculation with accurate results",
                  "Simple and easy to use",
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
            <h1 className="text-3xl md:text-4xl font-bold">
             GPA Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <GPACalculator />

        
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
          What is this GPA Calculator?
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
