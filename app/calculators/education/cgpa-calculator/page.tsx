import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import CGPACalculator from "./clientside";
import Image from "next/image";
const faqData = [
  {
    question: "How do I convert CGPA to a percentage?",
    answer:
      "The conversion formula varies by university and region. A widely used standard (like that used by many technical boards) is: Percentage = (CGPA - 0.5) × 10. For a 4.0 scale, another common method is: Percentage = CGPA × 25. However, always refer to the official back-page of your transcript for the specific conversion formula used by your institution.",
  },
  {
    question: "How does a 'Fail' or 'Retake' grade affect my CGPA?",
    answer:
      "A failing grade (F) counts as 0.0 points but still includes the credit hours in your denominator, which can significantly lower your CGPA. If you retake the course, most universities use a 'Grade Replacement' policy where the new, higher grade replaces the old one in the CGPA calculation, though the original 'F' may still appear on your transcript.",
  },
  {
    question: "What is considered a 'Good' CGPA for jobs and internships?",
    answer:
      "While 'good' is subjective, a CGPA of 3.0 or higher is generally the minimum threshold for most multinational companies and competitive internships. A CGPA above 3.5 is considered excellent and is often the requirement for honors lists, scholarships, and admission into top-tier graduate or Ivy League programs.",
  },
  {
    question: "Is there a difference between CGPA and GPA on a resume?",
    answer:
      "Yes. GPA usually refers to a single semester's performance, whereas CGPA is your total average across your entire degree. On a resume, you should always list your CGPA as it provides a complete picture of your academic consistency. If your major-specific grades are higher than your overall average, you may also list a 'Major CGPA' separately.",
  },

  {
    question: "Does CGPA matter for jobs?",
    answer:
      "Many multinational companies use CGPA as an initial filtering criterion for internships and entry-level roles, though work experience and skills often become more important later.",
  },
  {
    question: "How can I improve my CGPA fast?",
    answer:
      "Focus on high-credit courses where you have room for improvement, utilize retake policies for failed subjects, and maintain consistent study habits.",
  },
];
export const metadata: Metadata = {
  title: "CGPA Calculator | Semester to Cumulative GPA (4.0 & 10.0 Scale)",
  description:
    "Free online CGPA calculator to find your cumulative grade point average across all semesters. Supports SGPA to CGPA conversion, weighted 4.0 scale, and percentage calculation for scholarships and jobs.",
  keywords: [
    "CGPA calculator",
    "calculate CGPA from SGPA",
    "cumulative grade point average calculator",
    "4.0 scale CGPA calculator",
    "university CGPA calculator",
    "semester GPA to CGPA",
    "CGPA to percentage converter",
    "engineering CGPA calculator",
    "weighted cumulative GPA",
    "how to find cumulative GPA",
    "LizoCalc CGPA tool",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/education/cgpa-calculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "CGPA Calculator – Track Your Cumulative Academic Progress | LizoCalc",
    description:
      "Easily calculate your total CGPA by combining semester SGPAs and credit hours. Perfect for university students tracking their academic standing.",
    url: "https://www.lizocalc.com/calculators/education/cgpa-calculator",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.lizocalc.com/images/cgpa-formula-diagram.webp",
        width: 1200,
        height: 630,
        alt: "CGPA Calculator Tool - Cumulative GPA 4.0 Scale and Percentage Conversion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculate Your CGPA Instantly – Weighted & Cumulative Tool",
    description:
      "Track your academic journey with the LizoCalc CGPA Calculator. Simple, fast, and optimized for student applications.",
    images: ["https://www.lizocalc.com/images/cgpa-formula-diagram.webp"],
  },
};
export default function GPAPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              // ── 1. BREADCRUMB ──────────────────────────────────────
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://www.lizocalc.com/calculators/education/cgpa-calculator#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.lizocalc.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Calculators",
                    item: "https://www.lizocalc.com/calculators",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Education",
                    item: "https://www.lizocalc.com/calculators/education",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "CGPA Calculator",
                    item: "https://www.lizocalc.com/calculators/education/cgpa-calculator",
                  },
                ],
              },

              // ── 2. WEBPAGE ─────────────────────────────────────────
              {
                "@type": "WebPage",
                "@id":
                  "https://www.lizocalc.com/calculators/education/cgpa-calculator",
                url: "https://www.lizocalc.com/calculators/education/cgpa-calculator",
                name: "CGPA Calculator – Cumulative GPA on 4.0 & 10.0 Scale | LizoCalc",
                description:
                  "Free online CGPA calculator to find cumulative grade point average across all semesters. Supports weighted, unweighted, and percentage conversions with step-by-step working.",
                primaryImageOfPage:
                  "https://www.lizocalc.com/images/cgpa-formula-diagram.webp",
                inLanguage: "en",
                datePublished: "2026-04-10",
                dateModified: "2026-04-10",
                isPartOf: {
                  "@type": "WebSite",
                  name: "LizoCalc",
                  url: "https://www.lizocalc.com",
                },
                // Inside the WebPage object (@type: "WebPage")
                author: {
                  "@type": "Person",
                  name: "Rana Muhammad Abdullah",
                  jobTitle:
                    "Founder of LizoCalc (Web Tool Developer – Mathematical & Utility Calculators)",
                  url: "https://www.lizocalc.com/about",
                },
                publisher: {
                  "@type": "Organization",
                  name: "LizoCalc",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.lizocalc.com/logo.webp",
                  },
                },
                mainEntity: {
                  "@type": "SoftwareApplication",
                  "@id":
                    "https://www.lizocalc.com/calculators/education/cgpa-calculator#app",
                },
              },

              // ── 3. SOFTWARE APPLICATION ────────────────────────────
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/education/cgpa-calculator#app",
                name: "CGPA Calculator",
                url: "https://www.lizocalc.com/calculators/education/cgpa-calculator",
                image:
                  "https://www.lizocalc.com/images/cgpa-formula-diagram.webp",
                description:
                  "Advanced CGPA calculator supporting weighted and unweighted calculations. Features include SGPA to CGPA conversion and target grade planning.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "Academic Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on all modern browsers.",
                audience: {
                  "@type": "Audience",
                  audienceType:
                    "University Students, High School Students, Academic Counselors",
                },
                featureList: [
                  "Calculate CGPA from semester SGPA and credits",
                  "Support for both 4.0 and 10.0 scales",
                  "Weighted and Unweighted GPA options",
                  "Target CGPA planner tool",
                  "Automatic CGPA to Percentage conversion",
                  "Step-by-step calculation breakdown",
                  "Works offline after first load",
                  "Mobile-friendly, zero ads",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@type": "Organization",
                  name: "LizoCalc",
                  url: "https://www.lizocalc.com",
                  logo: "https://www.lizocalc.com/logo.webp",
                },
                potentialAction: {
                  "@type": "UseAction",
                  target: [
                    "https://www.lizocalc.com/calculators/education/cgpa-calculator",
                  ],
                },
              },

              //

              // ── 5. HOWTO #2 — How to Calculate CGPA Manually ──
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/education/cgpa-calculator#howto-calculate-cgpa",
                name: "How to Calculate CGPA Manually",
                image:
                  "https://www.lizocalc.com/images/cgpa-formula-diagram.webp",
                description:
                  "Learn the mathematical formula to find CGPA by weighting SGPAs across different semesters.",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Multiply SGPA by Credits",
                    text: "For each semester, multiply the SGPA by the total credits of that semester to get Quality Points.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Sum All Quality Points",
                    text: "Add the quality points from all semesters together.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Sum All Credits",
                    text: "Add the total number of credit hours attempted across all semesters.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Divide and Solve",
                    text: "Divide the total quality points by the total credits. CGPA = Total Points / Total Credits.",
                  },
                ],
                tool: [{ "@type": "HowToTool", name: "Academic Transcript" }],
              },

              // ── 6. HOWTO #3 — How to Convert CGPA to Percentage ──
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/education/cgpa-calculator#howto-convert-cgpa",
                name: "How to Convert CGPA to Percentage",
                image:
                  "https://www.lizocalc.com/images/cgpa-formula-diagram.webp",
                description:
                  "The standard method for converting your 4.0 or 10.0 scale CGPA into a percentage score.",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Identify Your Scale",
                    text: "Determine if your CGPA is on a 4.0 or 10.0 scale.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Apply the Formula",
                    text: "For a 4.0 scale, multiply your CGPA by 25. For a 10.0 scale, a common formula is (CGPA - 0.5) × 10.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Check Institutional Rules",
                    text: "Verify with your university (e.g., HEC or local boards) as some use specific lookup tables instead of direct multiplication.",
                  },
                ],
                tool: [{ "@type": "HowToTool", name: "Conversion Formula" }],
              },

              // ── 7. FAQ PAGE ────────────────────────────────────────
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
          <h1 className="text-3xl md:text-4xl font-bold">
            CGPA Calculator: Calculate Cumulative GPA (4.0 & 10 Scale){" "}
          </h1>
          <p className="text-lg text-gray-200 mb-2">
            CGPA is calculated by multiplying each semester GPA by its credit
            hours, adding all results, and dividing by total credits. It shows
            your overall academic performance across all semesters in a single
            value.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30 my-4">
            <p className="font-mono text-green-400">
              Formula: CGPA = Σ (SGPA × Credits) ÷ Total Credits
            </p>
            <p className="text-sm text-gray-300 mt-2">
              Example: (3.8 × 20 + 3.4 × 22) ÷ 42 = <strong>3.59</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="px-4 py-8">
        <CGPACalculator />
      </section>
      {/* 🔥 CGPA Quick Answer Box - Optimized for AI Overview */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-950 via-gray-950 to-gray-950 border border-blue-500/30 rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            CGPA Quick Answer
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-white">
            {/* 1. Definition */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-3">
                What is CGPA?
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                CGPA is the weighted average of all semester results based on
                credit hours.{" "}
              </p>
            </div>

            {/* 2. Formula */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-3">CGPA Formula</h3>
              <div className="bg-gray-900 p-4 rounded-xl text-green-400 text-sm font-mono border border-gray-700">
                CGPA = Σ (SGPA × Credits) ÷ Total Credits
              </div>

              <ul className="mt-4 text-gray-400 text-sm space-y-1">
                <li>• SGPA = Semester GPA</li>
                <li>• Credits = Credit hours</li>
                <li>• Σ = Total sum</li>
              </ul>
            </div>

            {/* 3. Example */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-3">Example</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Semester 1: 3.8 (20 credits)
                <br />
                Semester 2: 3.4 (22 credits)
              </p>
              <p className="text-yellow-400 font-semibold mt-2 text-sm">
                CGPA = (3.8×20 + 3.4×22) ÷ 42 = 3.59
              </p>
            </div>
          </div>

          {/* Bottom Section (Important for AI extraction) */}
          <div className="mt-10 border-t border-gray-800 pt-6">
            <h3 className="text-blue-400 font-semibold mb-3">
              CGPA Range Guide
            </h3>

            <ul className="text-sm text-gray-300 space-y-1">
              <li>
                • 3.5 – 4.0 → <span className="text-green-400">Excellent</span>
              </li>
              <li>
                • 3.0 – 3.5 → <span className="text-blue-300">Good</span>
              </li>
              <li>
                • 2.5 – 3.0 → <span className="text-yellow-300">Average</span>
              </li>
              <li>
                • Below 2.5 →{" "}
                <span className="text-red-400">Needs Improvement</span>
              </li>
            </ul>

            <p className="text-gray-500 text-xs mt-3">
              Note: CGPA evaluation standards may vary by university and
              country.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content - Expanded to 1200+ words */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white selection:bg-blue-500/30">
        {/* Hero Section: Intent-Based SEO */}
        <div className="space-y-4 mb-8">
          <p className="text-gray-400 text-base leading-relaxed border-l-4 border-blue-500 pl-4">
            Whether you are aiming for the Dean's list, applying for an{" "}
            <strong>scholarships</strong>, or preparing your resume for
            technical roles, maintaining an accurate CGPA is essential. Simply
            input your semester-wise points and credits to see where you stand
            on the 4.0 scale.
          </p>
        </div>
        {/* Logic & Definition Section (AEO/GEO Optimized) */}

        {/* Mathematical Breakdown Section */}
        <section className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 text-center mb-12">
            The Mathematics of Academic Success
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-blue-500/50 transition-all">
              <h4 className="text-green-400 font-mono text-sm mb-4">STEP 01</h4>
              <h3 className="text-xl font-bold text-white mb-3">
                Identify Quality Points
              </h3>
              <p className="text-gray-400 text-sm">
                Multiply the numerical value of your grade by the credit weight
                of the course.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-blue-500/50 transition-all">
              <h4 className="text-green-400 font-mono text-sm mb-4">STEP 02</h4>
              <h3 className="text-xl font-bold text-white mb-3">
                Aggregate Sums
              </h3>
              <p className="text-gray-400 text-sm">
                Add all Quality Points from every semester and divide by the
                total credits attempted.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-blue-500/50 transition-all">
              <h4 className="text-green-400 font-mono text-sm mb-4">STEP 03</h4>
              <h3 className="text-xl font-bold text-white mb-3">
                Apply Weighting
              </h3>
              <p className="text-gray-400 text-sm">
                Adjust for Honors (+0.5) or AP/IB (+1.0) to find your Weighted
                CGPA.
              </p>
            </div>
          </div>

          {/* <div className="text-center bg-gray-900/80 p-12 rounded-3xl border border-blue-500/20 shadow-2xl"> */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-300 mb-8 uppercase tracking-widest">
              CGPA Formula (Step-by-Step Calculation with Example){" "}
            </h3>
            <figure>
              <Image
                src="/images/cgpa-formula-diagram.webp"
                alt="CGPA formula calculation example with credits and grade points (4.0 scale)"
                width={850}
                height={500}
                priority
                className="rounded-xl mx-auto mb-6"
              />
              <figcaption className="text-gray-500 text-sm italic">
                Fig 1.1: Technical breakdown of the Cumulative Grade Point
                Average calculation logic.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">
            CGPA vs. GPA vs. SGPA
          </h2>
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <p>
              <strong>CGPA:</strong> Cumulative performance across your entire
              degree program.
            </p>
            <p>
              <strong>GPA:</strong> Often refers to a specific term or a single
              course grade.
            </p>
            <p>
              <strong>SGPA:</strong> Your performance specifically for one
              semester.
            </p>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Your CGPA in 3 Simple Steps
          </h2>

          <p className="text-gray-200 text-lg mb-8 leading-relaxed">
            Tracking your cumulative performance doesn’t have to be complicated.
            Whether you are using a 4.0 scale or a percentage-based system,
            follow this streamlined process to find your current standing:
          </p>

          <ol className="space-y-12">
            {/* Step 1 */}
            <li className="bg-gray-800/30 p-8 rounded-3xl border border-gray-700 relative">
              <span className="absolute -top-4 -left-4 bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-lg">
                1
              </span>
              <h3 className="text-2xl font-semibold text-white mb-4 ml-4">
                Determine Your Grade Points for Each Course
              </h3>
              <p className="text-gray-300 mb-4">
                First, convert your letter grades into their numerical
                equivalents based on your school’s grading scale.
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>
                  <strong>Regular Classes:</strong> A = 4.0, B = 3.0, C = 2.0.
                </li>
                <li>
                  <strong>Honors/AP Classes:</strong> Add 0.5 or 1.0 to the
                  standard value for weighted calculations.
                </li>
              </ul>
            </li>

            {/* Step 2 */}
            <li className="bg-gray-800/30 p-8 rounded-3xl border border-gray-700 relative">
              <span className="absolute -top-4 -left-4 bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-lg">
                2
              </span>
              <h3 className="text-2xl font-semibold text-white mb-4 ml-4">
                Calculate Total Quality Points
              </h3>
              <p className="text-gray-300 mb-4">
                Quality points represent the "weight" of your grade relative to
                the course's difficulty and time commitment.
              </p>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 font-mono text-sm text-blue-300">
                Formula: Grade Point Value × Credit Hours = Quality Points
              </div>
              <p className="mt-4 text-gray-400 italic">
                Example: An &apos;A&apos; (4.0) in a 3-credit Calculus class
                gives you 12 Quality Points.
              </p>
            </li>

            {/* Step 3 */}
            <li className="bg-gray-800/30 p-8 rounded-3xl border border-gray-700 relative">
              <span className="absolute -top-4 -left-4 bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-lg">
                3
              </span>
              <h3 className="text-2xl font-semibold text-white mb-4 ml-4">
                Divide by Total Attempted Credits
              </h3>
              <p className="text-gray-300 mb-4">
                Finally, sum up all quality points earned across every semester
                and divide by the total number of credit hours you have
                attempted.
              </p>
              <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30">
                <p className="text-white font-bold text-center text-xl">
                  CGPA = Total Quality Points / Total Credits
                </p>
              </div>
            </li>
          </ol>

          <div className="mt-12 p-6 bg-yellow-900/10 border border-yellow-700/30 rounded-2xl">
            <p className="text-yellow-200 text-sm">
              <strong>Pro Tip:</strong> Most universities exclude
              &quot;Pass/Fail&quot; or &quot;Incomplete&quot; credits from the
              total credit count, as they do not carry grade point values.
              Always double-check your school&apos;s specific policy on retaken
              courses.
            </p>
          </div>
        </section>
        {/* Advanced Technical Conversion Table */}
        <section className="mt-24 px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-10">
            Standard 4.0 Scale Conversion Matrix
          </h2>

          <div className="relative rounded-3xl border border-gray-800 bg-gray-900/50 overflow-hidden">
            {/* Wrapper for horizontal scrolling on mobile */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-blue-600 text-white font-bold uppercase text-xs md:text-sm">
                  <tr>
                    <th className="p-4 md:p-6 whitespace-nowrap">
                      Letter Grade
                    </th>
                    <th className="p-4 md:p-6 whitespace-nowrap">
                      Percentage Range
                    </th>
                    <th className="p-4 md:p-6 text-center whitespace-nowrap">
                      Standard GPA
                    </th>
                    <th className="p-4 md:p-6 text-center whitespace-nowrap">
                      Honors (+0.5)
                    </th>
                    <th className="p-4 md:p-6 text-center whitespace-nowrap">
                      AP/IB (+1.0)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {[
                    {
                      grade: "A / A+",
                      range: "93–100%",
                      gpa: "4.0",
                      honors: "4.5",
                      ap: "5.0",
                    },
                    {
                      grade: "B+",
                      range: "87–89%",
                      gpa: "3.3",
                      honors: "3.8",
                      ap: "4.3",
                    },
                    {
                      grade: "B",
                      range: "83–86%",
                      gpa: "3.0",
                      honors: "3.5",
                      ap: "4.0",
                    },
                    {
                      grade: "C",
                      range: "73–76%",
                      gpa: "2.0",
                      honors: "2.5",
                      ap: "3.0",
                    },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-blue-500/10 transition-colors"
                    >
                      <td className="p-4 md:p-6 font-bold whitespace-nowrap">
                        {row.grade}
                      </td>
                      <td className="p-4 md:p-6 whitespace-nowrap text-gray-300">
                        {row.range}
                      </td>
                      <td className="p-4 md:p-6 text-center text-green-400 font-mono">
                        {row.gpa}
                      </td>
                      <td className="p-4 md:p-6 text-center font-mono text-gray-400">
                        {row.honors}
                      </td>
                      <td className="p-4 md:p-6 text-center font-mono text-blue-400">
                        {row.ap}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Optional Hint for Mobile Users */}
          <p className="mt-4 text-gray-500 text-sm md:hidden text-center">
            ← Swipe to view full scale →
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Boost Your CGPA (Quick Tips)
          </h2>

          <p className="text-gray-200 text-lg mb-8 leading-relaxed">
            Improving your cumulative average is a marathon, not a sprint. By
            implementing these high-impact habits, you can steadily climb the
            4.0 scale and open doors to better opportunities.you can{" "}
            <Link
              href="/calculators/education/gpa-calculator"
              className="text-cyan-700"
            >
              Calculate your single-semester GPA
            </Link>{" "}
            to simulate how different grade improvements will affect your
            overall CGPA, helping you set realistic goals for each semester.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Tip 1 */}
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all group">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400">
                1. Attendance of Every Class
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Consistency is the foundation of success. Being present allows
                you to catch subtle cues about exam topics and ensures you don't
                miss out on participation points that can bridge the gap between
                a B+ and an A.
              </p>
            </div>

            {/* Tip 2 */}
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all group">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400">
                2. Turn in All Assignments
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Never leave a zero on your grade book. Even if an assignment
                isn&apos;t perfect, <strong>partial credit</strong>{" "}
                significantly sustains your CGPA, whereas a zero can take
                multiple exams to recover from.
              </p>
            </div>

            {/* Tip 3 */}
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all group">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400">
                3. Ask for Help Early to make concept easy
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Don&apos;t wait until the final exam to address confusion. Visit
                your professor during office hours or talk to your teacher as
                soon as a concept feels unclear. Early intervention is the key
                to mastering difficult subjects.
              </p>
            </div>

            {/* Tip 4 */}
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all group">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400">
                4. Study Consistently every day
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Leverage the <strong>Spaced Repetition</strong> technique.
                Studying for 30 minutes daily is scientifically proven to be
                more effective for long-term retention than 10-hour all-night
                cramming sessions.
              </p>
            </div>
          </div>

          {/* Full Width High-Value Tip */}
          <div className="mt-6 bg-gradient-to-r from-blue-900/40 to-transparent p-8 rounded-2xl border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              5. Join Active Study Groups
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Learning with others makes academic rigour more manageable and
              engaging. Explaining a concept to a peer is one of the best ways
              to solidify your own understanding. Plus, study groups provide a
              support system that keeps you accountable to your goals.
            </p>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-blue-300 text-sm font-medium">
              <li>• Share diverse perspectives</li>
              <li>• Fill gaps in your notes</li>
              <li>• Collaborative problem solving</li>
              <li>• Increased motivation</li>
            </ul>
          </div>

          <p className="text-center text-gray-500 italic mt-12 text-sm">
            Small changes in your daily routine can lead to massive improvements
            in your final CGPA results.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More calculators Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Complement your mass calculations with these free tools:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/education/grade-calculator"
                className="text-blue-400 hover:underline"
              >
                Grade Calculator
              </Link>{" "}
              — calculate your grade based on assignments and exams
            </li>
          </ul>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/education/gpa-calculator"
                className="text-blue-400 hover:underline"
              >
                GPA Calculator
              </Link>{" "}
              — calculate your cumulative GPA based on credit hours and grades
            </li>
          </ul>
        </section>

        <div className="mt-10 text-sm text-gray-400 border-t pt-4">
          <p>
            <strong>Written by:</strong> LizoCalc Education Team
          </p>
          <p>
            <strong>Reviewed by:</strong> Academic GPA & University Grading
            Specialist
          </p>
          <p>
            <strong>Experience:</strong> 5+ years in academic calculator systems
            and grading models
          </p>
        </div>
        <p className="text-gray-500 text-xs mt-12 border-t border-gray-800 pt-6 italic">
          <strong>Note:</strong> LizoCalc provides this CGPA tool for
          informational purposes only. This calculation method is based on
          standard university grading systems used in HEC Pakistan guidelines,
          US GPA system, and CBSE academic structure.
        </p>

        <section className="mt-20">
          <div className="text-xs text-gray-600 mt-12 border-t border-gray-800 pt-6">
            <p>
              * Note: Weighting systems, honors additions, and percentage
              conversions vary by country and specific university policy. Always
              verify your result against your official transcript.*
            </p>
          </div>
        </section>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}
