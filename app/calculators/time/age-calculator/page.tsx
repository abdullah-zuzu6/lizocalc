import { Metadata } from "next";
import AgeCalculator from "./clientside";
import { Cake, Calendar, Clock, History } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How does the Age Calculator determine my exact age?",
    answer:
      "The calculator compares your birth date with the current date (or a specific target date). It precisely accounts for leap years and the varying number of days in each month to provide an accurate breakdown in years, months, and days.",
  },
  {
    question: "Can I calculate how old I will be on a future date?",
    answer:
      "Yes! By changing the 'Age at the Date of' field, you can determine your exact age for any future event, such as a retirement date, an upcoming anniversary, or a travel plan.",
  },
  {
    question: "Does the calculator account for leap years?",
    answer:
      "Absolutely. Our algorithm considers the extra day in February during leap years to ensure that your total days lived and exact age are 100% mathematically correct.",
  },
];

export const metadata: Metadata = {
  title: "Age Calculator | Exact Age in Years, Months, & Days",
  description:
    "Free advanced age calculator to find your exact age, total days lived, and time until your next birthday. Precise, fast, and easy to use.",

  keywords: [
    "age calculator",
    "exact age calculator",
    "chronological age calculator",
    "how old am i",
    "birthday calculator",
    "age in days",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/time/age-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Exact Age Calculator | LizoCalc",
    description:
      "Calculate your exact age in years, months, and days instantly with our free tool.",
    url: "https://lizocalc.com/calculators/time/age-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Age Calculator - Find Your Exact Age",
    description:
      "Find out exactly how many years, months, and days you have been alive.",
  },
};

export default function AgeCalculatorPage() {
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
                "@id": "https://lizocalc.com/calculators/time/age-calculator#breadcrumb",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://lizocalc.com" },
                  { "@type": "ListItem", position: 2, name: "Calculators", item: "https://lizocalc.com/calculators" },
                  { "@type": "ListItem", position: 3, name: "Time Calculators", item: "https://lizocalc.com/calculators/time" },
                  { "@type": "ListItem", position: 4, name: "Age Calculator", item: "https://lizocalc.com/calculators/time/age-calculator" },
                ],
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://lizocalc.com/calculators/time/age-calculator#app",
                name: "Advanced Age Calculator",
                url: "https://lizocalc.com/calculators/time/age-calculator",
                description: "Calculate exact age, total days lived, and countdown to next birthday.",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Any",
                inLanguage: "en",
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
              <Cake className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Age Calculator</h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AgeCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 prose prose-blue prose-lg lg:prose-xl prose-headings:font-extrabold prose-h2:text-blue-900 prose-h2:border-b-2 prose-h2:border-blue-200 prose-h2:pb-2 prose-p:text-gray-600 prose-p:leading-relaxed">
        <h2>The Ultimate Guide to Calculating Your Exact Age</h2>
        <p>
          Have you ever wondered exactly how many days you've been on this planet? While most of us simply keep track of our years, our <strong>Advanced Age Calculator</strong> provides a much deeper dive. Whether you need your chronological age for a legal document, a school application, or just pure curiosity, this tool offers 100% accuracy.
        </p>

        <h3>Why Use a Chronological Age Calculator?</h3>
        <p>
          Calculating age manually is trickier than it looks. You have to account for the varying number of days in months (28, 30, or 31) and the quadrennial occurrence of leap years. Our tool automates this complex math instantly. 
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
          <div className="p-4 bg-white border rounded-xl shadow-sm">
            <Calendar className="text-blue-500 mb-2" />
            <h4 className="font-bold">Legal & Official Use</h4>
            <p className="text-sm text-gray-500">Perfect for verifying eligibility for government services, exams, or retirement benefits.</p>
          </div>
          <div className="p-4 bg-white border rounded-xl shadow-sm">
            <Clock className="text-blue-500 mb-2" />
            <h4 className="font-bold">Milestone Tracking</h4>
            <p className="text-sm text-gray-500">Know exactly when you hit 10,000 days or 500 months of life.</p>
          </div>
        </div>

        <h3>How to Use the Calculator</h3>
        <p>
          Using the LizoCalc Age Calculator is straightforward:
        </p>
        <ol>
          <li><strong>Select Date of Birth:</strong> Use the dropdown menus to pick your day, month, and year of birth.</li>
          <li><strong>Choose Target Date:</strong> By default, this is set to "Today," but you can change it to any date in history or the future.</li>
          <li><strong>Calculate:</strong> The results will update instantly to show your age in years, months, and days.</li>
        </ol>

        <h3>Fascinating Facts About Time and Aging</h3>
        <p>
          Did you know that if you are 25 years old, you have lived through approximately 6 leap years and roughly 9,125 days? Time is the most valuable resource we have, and tracking it helps us appreciate the milestones we've achieved. From your first steps to your current professional journey, every day is a data point in your unique story.
        </p>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}