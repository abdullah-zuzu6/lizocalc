import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";

const faqData = [
  {
    question: "What is BMI in simple terms?",
    answer:
      "BMI (Body Mass Index) is a number calculated from your height and weight that estimates whether you have a healthy amount of body fat. It does not directly measure fat, but it gives a useful screening number. A BMI between 18.5 and 24.9 is considered normal for most adults.",
  },
  {
    question: "What is the BMI formula?",
    answer:
      "The metric formula is BMI = weight (kg) ÷ height² (m²). For example, if you weigh 70 kg and are 1.75 m tall: BMI = 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 ≈ 22.86. In imperial units: BMI = (weight in pounds × 703) ÷ height in inches².",
  },
  {
    question: "What is a healthy BMI range?",
    answer:
      "For adults, a BMI of 18.5–24.9 is considered normal or healthy. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is classified as obese. These are general thresholds — they do not account for muscle mass, age, or ethnicity.",
  },
  {
    question: "Is BMI different for men and women?",
    answer:
      "The BMI formula and categories are the same for both sexes. However, women naturally carry more body fat than men at the same BMI. A woman and a man with identical BMIs may have different health risks because fat distribution differs between sexes.",
  },
  {
    question: "Why is BMI not always accurate?",
    answer:
      "BMI does not distinguish between fat and muscle mass. A muscular athlete can have an 'overweight' BMI while having very little body fat. It also does not show where fat is stored — abdominal fat carries more risk than fat on the hips. For elderly people, BMI may underestimate fat because muscle mass decreases with age.",
  },
  {
    question: "How is BMI calculated for children?",
    answer:
      "For children and teens (ages 2–19), BMI is calculated the same way but is then compared to age- and sex-specific growth charts rather than fixed thresholds. A child's BMI percentile tells you how their measurement compares to others of the same age and sex.",
  },
  {
    question: "What is a better measure than BMI?",
    answer:
      "Waist-to-hip ratio, waist circumference, and body fat percentage are all more precise indicators of health risk. Waist circumference above 94 cm for men or 80 cm for women signals higher risk regardless of BMI. For the most accurate picture, these measurements are used alongside BMI.",
  },
  {
    question: "Is BMI useful for Pakistani adults?",
    answer:
      "Some research suggests South Asians, including Pakistanis, face higher metabolic risks at lower BMI thresholds. The WHO has proposed adjusted cutoffs (23 for overweight, 27.5 for obese) for Asian populations. It is best to discuss your individual numbers with a doctor who understands your background.",
  },
];

export const metadata: Metadata = {
  title: "What is BMI? Meaning, Formula, Limitations & Real Health Use",
  description:
    "Understand BMI: what it means, the exact formula in kg and lbs, healthy ranges, a worked example, limitations, and when it is actually useful — explained clearly with visuals.",
  keywords: [
    "what is bmi",
    "body mass index meaning",
    "bmi formula kg",
    "bmi ranges",
    "healthy bmi",
    "normal bmi",
    "bmi limitations",
    "bmi vs body fat",
    "bmi calculator guide",
    "bmi meaning",
    "how to calculate bmi",
    "what is my bmi",
    "bmi index",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/blogs/health/what-is-bmi",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "What is BMI? Meaning, Formula, Limitations & Real Health Use",
    description:
      "The clearest explanation of BMI: formula, healthy ranges, worked example, male vs female differences, and when BMI is — and is not — a reliable health measure.",
    url: "https://www.lizocalc.com/blogs/health/what-is-bmi",
    siteName: "LizoCalc",
    type: "article",
    images: [
      {
        url: "https://www.lizocalc.com/images/blogs/health/bmi-formula-visual.webp",
        width: 1400,
        height: 788,
        alt: "BMI formula visual guide showing metric and imperial formulas with category range bar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What is BMI? Formula, Ranges & Limitations Explained",
    description:
      "Clear, honest guide to BMI: what it is, how to calculate it, its real limits, and better alternatives.",
    images: [
      "https://www.lizocalc.com/images/blogs/health/bmi-formula-visual.webp",
    ],
  },
};

export default function WhatIsBMIPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />



{
  /* ═══════════════════════════════════════════════════════
      STRUCTURED DATA
  ═══════════════════════════════════════════════════════ */
}
<Script
  id="structured-data-what-is-bmi"
  type="application/ld+json"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        /* ── 1. BREADCRUMB ── */
        {
          "@type": "BreadcrumbList",
          "@id":
            "https://www.lizocalc.com/blogs/health/what-is-bmi#breadcrumb",
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
              name: "Blogs",
              item: "https://www.lizocalc.com/blogs",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Health",
              item: "https://www.lizocalc.com/blogs/health",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "What is BMI?",
              item: "https://www.lizocalc.com/blogs/health/what-is-bmi",
            },
          ],
        },

        /* ── 2. PERSON ── */
        {
          "@type": "Person",
          "@id": "https://www.lizocalc.com/#author",
          name: "Rana Muhammad Abdullah",
          url: "https://www.lizocalc.com/about",
          jobTitle: "MERN Stack Developer & Tool Maker",
          description:
            "Mechatronics & Control Engineering student, MERN Stack developer, and productivity tool maker behind LizoCalc.",
          knowsAbout: [
            "Health Calculators",
            "BMI",
            "Body Mass Index",
            "Web Development",
            "Mechatronics",
          ],
          sameAs: [
            "https://github.com/abdullah-zuzu6",
            "https://www.linkedin.com/in/abdullahsajjad06/",
          ],
        },

        /* ── 3. ORGANIZATION ── */
        {
          "@type": "Organization",
          "@id": "https://www.lizocalc.com/#org",
          name: "LizoCalc",
          url: "https://www.lizocalc.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.lizocalc.com/logo.png",
          },
          foundingDate: "2026",
          founder: {
            "@id": "https://www.lizocalc.com/#author",
          },
          sameAs: [
            "https://github.com/abdullah-zuzu6",
            "https://www.linkedin.com/in/abdullahsajjad06/",
          ],
        },

        /* ── 4. WEBSITE ── */
        {
          "@type": "WebSite",
          "@id": "https://www.lizocalc.com/#website",
          url: "https://www.lizocalc.com",
          name: "LizoCalc",
          publisher: {
            "@id": "https://www.lizocalc.com/#org",
          },
        },

        /* ── 5. BLOG POSTING ── */
        {
          "@type": "BlogPosting",
          "@id":
            "https://www.lizocalc.com/blogs/health/what-is-bmi#article",
          headline:
            "What is BMI? Meaning, Formula, Limitations & Real Health Use",
          description:
            "A clear, honest guide to BMI: what body mass index means, the exact formula, healthy ranges, a worked example, male vs female differences, limitations, and better alternatives.",
          url: "https://www.lizocalc.com/blogs/health/what-is-bmi",
        
          inLanguage: "en",
          datePublished: "2026-05-01",
          dateModified: "2026-05-01",
          author: {
            "@id": "https://www.lizocalc.com/#author",
          },
          publisher: {
            "@id": "https://www.lizocalc.com/#org",
          },
          mainEntityOfPage: {
            "@id": "https://www.lizocalc.com/blogs/health/what-is-bmi",
          },
          isPartOf: {
            "@id": "https://www.lizocalc.com/#website",
          },
          breadcrumb: {
            "@id":
              "https://www.lizocalc.com/blogs/health/what-is-bmi#breadcrumb",
          },
          image: [
            "https://www.lizocalc.com/images/blogs/health/bmi-formula-visual.webp",
          ],
          about: {
            "@type": "Thing",
            name: "Body Mass Index",
          },
          keywords:
            "BMI, body mass index, BMI formula, healthy BMI, normal BMI, BMI ranges, BMI limitations, what is BMI",
          articleSection: "Health",
          wordCount: 2400,
          citation: [
            {
              "@type": "CreativeWork",
              name: "WHO | Body mass index - BMI",
              url: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations",
              publisher: {
                "@type": "Organization",
                name: "World Health Organization",
              },
            },
            {
              "@type": "CreativeWork",
              name: "Appropriate body-mass index for Asian populations and its implications for policy and intervention strategies",
              url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(03)15268-3/fulltext",
              publisher: {
                "@type": "Organization",
                name: "The Lancet",
              },
            },
            {
              "@type": "CreativeWork",
              name: "BMI in Adults — CDC",
              url: "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html",
              publisher: {
                "@type": "Organization",
                name: "Centers for Disease Control and Prevention",
              },
            },
          ],
        },

        /* ── 6. WEBPAGE ── */
        {
          "@type": "WebPage",
          "@id": "https://www.lizocalc.com/blogs/health/what-is-bmi",
          url: "https://www.lizocalc.com/blogs/health/what-is-bmi",
          name: "What is BMI? Meaning, Formula, Limitations & Real Health Use",
          description:
            "Understand BMI: what it means, the exact formula in kg and lbs, healthy ranges, limitations, and when it is actually useful.",
          inLanguage: "en",
          datePublished: "2026-05-01",
          dateModified: "2026-05-01",
          isPartOf: {
            "@id": "https://www.lizocalc.com/#website",
          },
          mainEntity: {
            "@id":
              "https://www.lizocalc.com/blogs/health/what-is-bmi#article",
          },
          author: {
            "@id": "https://www.lizocalc.com/#author",
          },
          publisher: {
            "@id": "https://www.lizocalc.com/#org",
          },
          breadcrumb: {
            "@id":
              "https://www.lizocalc.com/blogs/health/what-is-bmi#breadcrumb",
          },
        },

        /* ── 7. DEFINED TERM ── */
        {
          "@type": "DefinedTerm",
          "@id": "https://www.lizocalc.com/blogs/health/what-is-bmi#term",
          name: "Body Mass Index (BMI)",
          description:
            "BMI is a numerical value calculated from a person's weight and height. It is used to screen for weight categories that may lead to health problems. BMI = weight (kg) ÷ height² (m²).",
          inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: "Health & Medical Terms — LizoCalc",
          },
        },

        /* ── 8. IMAGE OBJECT 1 ── */
        {
          "@type": "ImageObject",
          "@id":
            "https://www.lizocalc.com/images/blogs/health/bmi-formula-visual.webp#image1",
          url: "https://www.lizocalc.com/images/blogs/health/bmi-formula-visual.webp",
          contentUrl:
            "https://www.lizocalc.com/images/blogs/health/bmi-formula-visual.webp",
          name: "BMI Formula Visual Guide",
          caption:
            "BMI formula visual showing metric and imperial formulas with BMI category ranges.",
          width: 1400,
          height: 788,
          encodingFormat: "image/webp",
          inLanguage: "en",
          representativeOfPage: true,
          author: {
            "@id": "https://www.lizocalc.com/#org",
          },
          copyrightHolder: {
            "@id": "https://www.lizocalc.com/#org",
          },
        },


        

        /* ── . FAQ PAGE ── */
{
  "@type": "FAQPage",
  "@id": "https://www.lizocalc.com/blogs/health/what-is-bmi#faq",
  isPartOf: {
    "@id": "https://www.lizocalc.com/blogs/health/what-is-bmi",
  },
  mainEntity: (faqData || []).map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
},
        /* ── 9. IMAGE OBJECT 2 ── */
        {
          "@type": "ImageObject",
          "@id":
            "https://www.lizocalc.com/images/blogs/health/bmi-category-range-bar.webp#image2",
          url: "https://www.lizocalc.com/images/blogs/health/bmi-category-range-bar.webp",
          contentUrl:
            "https://www.lizocalc.com/images/blogs/health/bmi-category-range-bar.webp",
          name: "BMI Category Range Bar",
          caption:
            "BMI category range bar from underweight to obese.",
          width: 1400,
          height: 788,
          encodingFormat: "image/webp",
          inLanguage: "en",
          representativeOfPage: false,
          author: {
            "@id": "https://www.lizocalc.com/#org",
          },
          copyrightHolder: {
            "@id": "https://www.lizocalc.com/#org",
          },
        },

        /* ── 10. IMAGE OBJECT 3 ── */
        {
          "@type": "ImageObject",
          "@id":
            "https://www.lizocalc.com/images/blogs/health/male-vs-female-fat-distribution-diagram.webp#image3",
          url: "https://www.lizocalc.com/images/blogs/health/male-vs-female-fat-distribution-diagram.webp",
          contentUrl:
            "https://www.lizocalc.com/images/blogs/health/male-vs-female-fat-distribution-diagram.webp",
          name: "Male vs Female Fat Distribution Diagram",
          caption:
            "Diagram comparing male apple shape and female pear shape fat distribution.",
          width: 1400,
          height: 788,
          encodingFormat: "image/webp",
          inLanguage: "en",
          representativeOfPage: false,
          author: {
            "@id": "https://www.lizocalc.com/#org",
          },
          copyrightHolder: {
            "@id": "https://www.lizocalc.com/#org",
          },
        },
      ],
    }),
  }}
/>

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-gray-400 mb-4" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li>
                <Link href="/blogs" className="hover:text-blue-400">
                  Blogs
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li>
                <Link href="/blogs/health" className="hover:text-blue-400">
                  Health
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li className="text-gray-300">What is BMI?</li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            What is BMI? Meaning, Formula, Limitations &amp; Real Health Use
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
            <span>Published: May 01, 2026</span>
            <span>·</span>
            <span>10 min read</span>
            <span>·</span>
            <span className="text-green-400">✅ Factually reviewed</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ARTICLE BODY
      ═══════════════════════════════════════════════════════ */}
      <article className="max-w-4xl mx-auto px-6 py-14 text-white">
        {/* ── AI OVERVIEW / QUICK ANSWER BOX ── */}
        <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6 mb-8">
          <p className="text-white font-semibold text-lg mb-2">
            ⚡ Quick Answer: What is BMI?
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            <strong>BMI (Body Mass Index)</strong> is a simple calculation using
            height and weight to estimate body fat. The meaning of BMI is
            straightforward — it classifies individuals into underweight,
            normal, overweight, or obese categories using the formula{" "}
            <strong>weight (kg) ÷ height² (m²)</strong>. A BMI between{" "}
            <strong>18.5 and 24.9</strong> is considered a normal, healthy BMI
            for most adults.
          </p>
        </div>

        {/* ── DISCLAIMER ── */}
        <div className="bg-yellow-900/20 border border-yellow-600/40 rounded-xl p-4 mb-10 text-sm text-yellow-200 leading-relaxed">
          <strong>Medical Disclaimer:</strong> BMI is a general screening guide,
          not a medical diagnosis. The information in this article is based on
          WHO guidelines and peer-reviewed research. Always consult a qualified
          healthcare professional before making health decisions based on your
          BMI number.
        </div>

        {/* ══════════════════════════════════════════════════
            H2: WHAT IS BMI
        ══════════════════════════════════════════════════ */}
        <section className="mt-10" id="what-is-bmi">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            What is BMI? (Simple Meaning)
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            BMI stands for <strong>Body Mass Index</strong>. The body mass index
            meaning is simple: it is a single number that estimates how much
            body fat you are likely carrying based on your height and weight —
            without any blood tests, scans, or equipment.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Think of it this way: two people of the same height can weigh very
            different amounts. The BMI index captures that difference and maps
            it onto a scale that health professionals use to flag potential
            weight-related risks — from malnutrition at the lower end to
            obesity-related conditions at the higher end.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            The concept was developed in the 1830s by Belgian mathematician
            Adolphe Quetelet and was formally adopted by the global medical
            community in the 1970s.
            <sup className="text-blue-400 text-xs ml-1">[1]</sup> Today it
            remains the most widely used population-level screening tool
            worldwide — not because it is perfect, but because it is fast, free,
            and requires no specialist equipment.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-3">
            What is a Normal BMI for Adults?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            A <strong>normal BMI</strong> for adults is any value between{" "}
            <strong>18.5 and 24.9 kg/m²</strong>, according to the World Health
            Organization.
            <sup className="text-blue-400 text-xs ml-1">[2]</sup> This is also
            referred to as a <strong>healthy BMI</strong>. Below 18.5 signals
            underweight, and 25 or above moves into overweight territory.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-3">
            What is My BMI? — How to Find Out in 3 Steps
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-2">
            Finding out your own BMI takes under a minute:
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-2 text-base leading-relaxed ml-2 mb-4">
            <li>Measure your weight in kilograms (or pounds)</li>
            <li>Measure your height in metres (or inches)</li>
            <li>
              Divide weight by height squared — or use our{" "}
              <Link
                href="/calculators/health/bmi-calculator"
                className="text-blue-400 hover:underline"
              >
                BMI Calculator
              </Link>{" "}
              to get your result instantly
            </li>
          </ol>
          <p className="text-gray-400 text-sm italic">
            &ldquo;Whats my bmi?&rdquo; is one of the most searched health
            queries worldwide — the answer is always one calculation away.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: BMI FORMULA + IMAGE 1
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="bmi-formula">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            BMI Formula — Metric and Imperial (kg/m²)
          </h2>

          {/* IMAGE 1 — Formula Visual */}
          <figure className="my-8">
            <div className="rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/images/blogs/health/bmi-formula-visual.webp"
                alt="BMI formula visual guide showing the metric formula (weight in kg divided by height in metres squared) and imperial formula (weight in lbs multiplied by 703 divided by height in inches squared), with a colour-coded BMI category range bar"
                title="BMI Formula: Metric vs Imperial — Visual Guide by LizoCalc"
                width={1400}
                height={788}
                className="w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
            <figcaption className="mt-3 text-sm text-gray-400 text-center italic leading-relaxed">
              <strong className="text-gray-300">Figure 1:</strong> The BMI
              formula in both metric (international) and imperial (US) formats.
              The metric formula uses weight in kg and height in metres; the
              imperial formula multiplies weight in pounds by 703 then divides
              by height in inches squared. Both produce an equivalent kg/m²
              result. The colour-coded bar below illustrates the four WHO
              standard BMI categories. — LizoCalc Health Visuals, 2026.
            </figcaption>
          </figure>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Metric Formula — BMI Formula kg/m²
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-base mb-6 overflow-x-auto">
            BMI = weight (kg) ÷ height² (m²)
            <br />
            <br />
            Unit: <strong>kg/m²</strong>
          </div>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The <strong>BMI formula kg/m²</strong> unit means you are dividing
            your mass in kilograms by the square of your height in metres. The
            resulting number has no physical unit in everyday use — you simply
            compare it to the category thresholds in the table below.
            <sup className="text-blue-400 text-xs ml-1">[2]</sup>
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Imperial Formula (pounds and inches)
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-base mb-6 overflow-x-auto">
            BMI = (weight (lbs) × 703) ÷ height² (inches²)
            <br />
            <br />
            The factor 703 converts the result to the same kg/m² scale
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            Both formulas produce an equivalent result. If you are entering
            pounds and feet, convert feet to total inches first (e.g., 5 ft 9 in
            = 69 inches total).
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: BMI CATEGORIES + IMAGE 2
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="bmi-categories">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            BMI Categories — Standard Range Table
          </h2>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            What is a Healthy BMI? — WHO Standard Ranges
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The World Health Organization defines the following BMI ranges for
            adults aged 18 and above.
            <sup className="text-blue-400 text-xs ml-1">[2]</sup> These
            thresholds apply to both men and women:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Category</th>
                  <th className="p-4 text-left font-semibold">
                    BMI Range (kg/m²)
                  </th>
                  <th className="p-4 text-left font-semibold">Health Signal</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-blue-300">
                    Underweight
                  </td>
                  <td className="p-4 font-bold">Below 18.5</td>
                  <td className="p-4 text-gray-300">
                    Possible nutrient deficiency, low bone density
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-green-400">
                    Normal weight
                  </td>
                  <td className="p-4 font-bold">18.5 – 24.9</td>
                  <td className="p-4 text-gray-300">
                    Generally healthy range for most adults
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-400">
                    Overweight
                  </td>
                  <td className="p-4 font-bold">25.0 – 29.9</td>
                  <td className="p-4 text-gray-300">
                    Elevated risk of heart disease, type 2 diabetes
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-orange-400">
                    Obese (Class I)
                  </td>
                  <td className="p-4 font-bold">30.0 – 34.9</td>
                  <td className="p-4 text-gray-300">
                    Significantly higher chronic disease risk
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-red-400">
                    Obese (Class II)
                  </td>
                  <td className="p-4 font-bold">35.0 – 39.9</td>
                  <td className="p-4 text-gray-300">
                    High risk; medical guidance strongly recommended
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-red-600">
                    Obese (Class III)
                  </td>
                  <td className="p-4 font-bold">40.0 and above</td>
                  <td className="p-4 text-gray-300">
                    Very high risk; also called severe or morbid obesity
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* IMAGE 2 — Category Range Bar */}
          <figure className="my-8">
            <div className="rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/images/blogs/health/bmi-category-range-bar.webp"
                alt="BMI category range bar showing colour-coded scale from underweight (below 18.5) through normal weight (18.5 to 24.9), overweight (25 to 29.9), to obese (30 and above), with body silhouettes and threshold markers"
                title="BMI Category Range Bar — WHO Standard Classifications"
                width={1400}
                height={788}
                className="w-full h-auto"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
            <figcaption className="mt-3 text-sm text-gray-400 text-center italic leading-relaxed">
              <strong className="text-gray-300">Figure 2:</strong> BMI
              categories visualised as a colour-coded range bar — blue for
              underweight, green for normal weight, yellow-orange for
              overweight, and red for obese. Threshold values (18.5, 25.0, 30.0,
              40+) are marked with category labels and body silhouettes for each
              classification. Based on WHO global BMI guidelines.
              <sup className="text-blue-400 text-xs ml-1">[2]</sup> — LizoCalc
              Health Visuals, 2026.
            </figcaption>
          </figure>

          <p className="text-gray-400 text-sm italic">
            Note: The WHO Expert Consultation on Obesity proposed adjusted
            action thresholds of 23.0 (overweight) and 27.5 (obese) for Asian
            populations, including South Asians.
            <sup className="text-blue-400 text-xs ml-1">[3]</sup> Speak to your
            doctor about which thresholds apply to you.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: EXAMPLE CALCULATION
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="bmi-example">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            BMI Example Calculation — Step by Step
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Most health blogs show the formula and nothing else. Here are two
            complete worked examples — metric and imperial — so you can follow
            every step with your own numbers.
          </p>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-5">
              Metric Example (kg and metres)
            </h3>
            <p className="text-gray-300 mb-4">
              Person: Weight = <strong>70 kg</strong>, Height ={" "}
              <strong>1.75 m</strong>
            </p>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Step 1 — Square the height
              <br />
              1.75 × 1.75 = 3.0625 m²
              <br />
              <br />
              Step 2 — Divide weight by that result
              <br />
              70 ÷ 3.0625 = <strong>22.86 kg/m²</strong>
              <br />
              <br />
              Result: BMI = 22.86 → <strong>Normal weight ✓</strong>
            </div>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-5">
              Imperial Example (lbs and inches)
            </h3>
            <p className="text-gray-300 mb-4">
              Person: Weight = <strong>154 lbs</strong>, Height ={" "}
              <strong>5 ft 9 in (= 69 inches total)</strong>
            </p>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Step 1 — Square the height in inches
              <br />
              69 × 69 = 4,761 inches²
              <br />
              <br />
              Step 2 — Multiply weight by 703
              <br />
              154 × 703 = 108,262
              <br />
              <br />
              Step 3 — Divide
              <br />
              108,262 ÷ 4,761 = <strong>22.74 kg/m²</strong>
              <br />
              <br />
              Result: BMI ≈ 22.74 → <strong>Normal weight ✓</strong>
            </div>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            You do not need to do this manually every time. Use our{" "}
            <Link
              href="/calculators/health/bmi-calculator"
              className="text-blue-400 hover:underline"
            >
              BMI Calculator
            </Link>{" "}
            to get your result in seconds — metric or imperial, with your
            category shown instantly.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: BMI FOR MEN VS WOMEN + IMAGE 3
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="bmi-men-vs-women">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            BMI for Men vs Women — Same Number, Different Meaning
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The BMI formula and category thresholds are identical for men and
            women. However, the same BMI value does not always indicate the same
            level of health risk between the sexes — because fat distribution
            differs significantly between males and females.
            <sup className="text-blue-400 text-xs ml-1">[4]</sup>
          </p>

          {/* IMAGE 3 — Fat Distribution */}
          <figure className="my-8">
            <div className="rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/images/blogs/health/male-vs-female-fat-distribution-diagram.webp"
                alt="Diagram comparing male apple-shaped body fat distribution (visceral abdominal fat, higher cardiovascular risk) versus female pear-shaped body fat distribution (subcutaneous fat on hips and thighs, lower initial risk), with a comparison table showing main fat type, hormone influence, and typical trends"
                title="Body Fat Distribution: Male Apple Shape vs Female Pear Shape — LizoCalc"
                width={1400}
                height={788}
                className="w-full h-auto"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
            <figcaption className="mt-3 text-sm text-gray-400 text-center italic leading-relaxed">
              <strong className="text-gray-300">Figure 3:</strong> Body fat
              distribution patterns differ by sex. Males typically store fat
              viscerally around the abdomen (apple shape), driven by
              testosterone and cortisol — a pattern associated with higher
              cardiovascular and metabolic risk. Females typically store fat
              subcutaneously on the hips, buttocks, and thighs (pear shape),
              driven by estrogen and progesterone — a pattern associated with
              lower initial metabolic risk. Two people with identical BMIs can
              therefore carry very different health profiles.
              <sup className="text-blue-400 text-xs ml-1">[4]</sup> — LizoCalc
              Health Visuals, 2026.
            </figcaption>
          </figure>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Women — Pear Shape
              </h3>
              <ul className="text-gray-200 text-sm space-y-2 leading-relaxed list-disc list-inside">
                <li>Naturally carry 6–11% more body fat than men</li>
                <li>Higher fat partly due to estrogen and progesterone</li>
                <li>Fat stored primarily on hips, buttocks, and thighs</li>
                <li>
                  Subcutaneous (under-skin) fat is metabolically less harmful
                </li>
                <li>
                  A BMI of 22 in a woman may mean a higher fat percentage than a
                  man at the same BMI
                </li>
              </ul>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Men — Apple Shape
              </h3>
              <ul className="text-gray-200 text-sm space-y-2 leading-relaxed list-disc list-inside">
                <li>Generally carry more muscle mass at the same BMI</li>
                <li>More prone to visceral (abdominal) fat accumulation</li>
                <li>Visceral fat increases heart disease and diabetes risk</li>
                <li>
                  A muscular man may show overweight BMI with very low fat
                </li>
                <li>
                  Waist circumference adds critical context beyond BMI alone
                </li>
              </ul>
            </div>
          </div>

          <p className="text-gray-200 text-base leading-relaxed mt-6">
            The key takeaway: two people with an identical BMI of 27 can have
            completely different health profiles depending on their sex, muscle
            mass, and where their fat is stored. The BMI index is a starting
            point — not the full picture.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: BMI BY AGE
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="bmi-by-age">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            BMI by Age — Adults vs Children
          </h2>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Adults (18 and over)
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The standard WHO BMI thresholds apply to adults aged 18 and above.
            For most adults, these ranges are consistent across age groups,
            though older adults (65+) may face a different risk profile because
            muscle mass naturally declines with age — a process called
            sarcopenia.
            <sup className="text-blue-400 text-xs ml-1">[5]</sup> An elderly
            person with a &ldquo;normal&rdquo; BMI may actually have too little
            muscle and too much fat.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Children and Teenagers (2–19 years)
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            For children and teens, BMI is calculated with the same formula but
            interpreted using{" "}
            <strong>age- and sex-specific growth charts</strong> to produce a{" "}
            <strong>BMI percentile</strong> — not a fixed category.
            <sup className="text-blue-400 text-xs ml-1">[6]</sup>
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">
                    BMI Percentile (Children/Teens)
                  </th>
                  <th className="p-4 text-left font-semibold">Category</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Below 5th percentile</td>
                  <td className="p-4 text-blue-300 font-semibold">
                    Underweight
                  </td>
                </tr>
                <tr>
                  <td className="p-4">5th to below 85th percentile</td>
                  <td className="p-4 text-green-400 font-semibold">
                    Healthy weight
                  </td>
                </tr>
                <tr>
                  <td className="p-4">85th to below 95th percentile</td>
                  <td className="p-4 text-yellow-400 font-semibold">
                    Overweight
                  </td>
                </tr>
                <tr>
                  <td className="p-4">95th percentile and above</td>
                  <td className="p-4 text-red-400 font-semibold">Obese</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            Never use the adult BMI table for a child. Normal BMI ranges shift
            significantly between ages 2 and 19 — a 7-year-old and a 16-year-old
            with the same BMI number are in completely different health
            categories.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: LIMITATIONS
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="bmi-limitations">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Limitations of BMI — What It Cannot Tell You
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            This section is what most health blogs skip — and it is arguably the
            most important part. BMI vs body fat is not the same measurement.
            BMI has real, well-documented limitations that every user should
            understand before acting on their result.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-800/50 border-l-4 border-red-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-red-300 mb-2">
                1. It does not distinguish fat from muscle
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                A professional rugby player or bodybuilder can have a BMI of
                28–30 and be classified as &ldquo;overweight&rdquo; despite very
                low body fat. Muscle is denser and heavier than fat. BMI sees
                only total weight — it cannot differentiate between 10 kg of fat
                and 10 kg of muscle.
                <sup className="text-blue-400 text-xs ml-1">[7]</sup>
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-orange-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-orange-300 mb-2">
                2. It ignores fat distribution
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Two people with an identical BMI of 26 can have completely
                different health risks depending on where their fat sits.
                Visceral fat around the abdominal organs is far more dangerous
                than subcutaneous fat on the hips and thighs. BMI does not tell
                you which type you have.
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-yellow-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-yellow-300 mb-2">
                3. Less accurate for older adults
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                As people age, muscle mass decreases and body fat tends to
                increase even if weight stays the same. An elderly person may
                have a &ldquo;normal&rdquo; BMI while actually having too much
                fat and too little muscle, increasing fall risk and metabolic
                problems.
                <sup className="text-blue-400 text-xs ml-1">[5]</sup>
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-purple-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-purple-300 mb-2">
                4. Not calibrated for every ethnicity — especially South Asians
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The standard WHO thresholds were developed primarily from
                European populations. Research published in <em>The Lancet</em>{" "}
                shows that South Asians — including Pakistanis and Indians —
                tend to develop metabolic diseases at lower BMI values than
                Europeans.
                <sup className="text-blue-400 text-xs ml-1">[3]</sup> The WHO
                Expert Consultation recommends adjusted action points of 23.0
                (overweight) and 27.5 (obese) for Asian populations.
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-blue-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-blue-300 mb-2">
                5. Does not apply during pregnancy
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                BMI is not a valid measure during pregnancy. Weight gain is
                expected and healthy during gestation. Standard BMI categories
                do not apply, and separate pregnancy weight gain guidelines
                exist based on pre-pregnancy BMI.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: BETTER ALTERNATIVES
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="bmi-alternatives">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Better Alternatives to BMI
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            If BMI vs body fat measurement is the real goal, here are four
            options that provide more complete information — and that most
            people can measure at home:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-green-300 mb-2">
                Waist Circumference
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                Measures abdominal fat directly. Measure at the narrowest point
                of your torso, just above the belly button.
              </p>
              <p className="text-gray-400 text-xs">
                Risk threshold: &gt;94 cm (men) / &gt;80 cm (women)
                <sup className="text-blue-400 ml-1">[2]</sup>
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-green-300 mb-2">
                Waist-to-Hip Ratio (WHR)
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                Divide your waist measurement by your hip measurement. A higher
                ratio signals more abdominal fat and greater cardiovascular
                risk.
              </p>
              <p className="text-gray-400 text-xs">
                High risk: &gt;1.0 (men) / &gt;0.85 (women)
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-green-300 mb-2">
                Body Fat Percentage
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                The most direct measure of fatness. Measured via DEXA scan,
                hydrostatic weighing, or smart scales. Unlike BMI, it
                distinguishes fat from muscle entirely.
              </p>
              <p className="text-gray-400 text-xs">
                Healthy range: 10–20% (men) / 18–28% (women)
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-green-300 mb-2">
                Waist-to-Height Ratio
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                Divide your waist measurement by your height. Research suggests
                this is a stronger predictor of cardiometabolic risk than BMI,
                particularly across different ethnicities.
              </p>
              <p className="text-gray-400 text-xs">
                Healthy: keep waist below half your height
              </p>
            </div>
          </div>

          <p className="text-gray-200 text-base leading-relaxed mt-6">
            The best approach is to use BMI as one data point alongside waist
            circumference and waist-to-hip ratio — not as a standalone health
            verdict.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: WHEN BMI IS USEFUL
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="when-bmi-is-useful">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            When BMI is Actually Useful
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Given its limitations, should you bother with BMI at all? Yes — in
            the right context, it remains a practical and widely accepted tool:
          </p>

          <ul className="space-y-3 text-gray-200 text-base leading-relaxed">
            <li className="flex gap-3">
              <span className="text-green-400 font-bold mt-0.5">✓</span>
              <span>
                <strong>General health screening:</strong> Doctors use BMI as a
                first-pass filter to identify patients who may benefit from
                further testing. It is fast, requires no lab work, and gives a
                rough baseline in under a minute.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-400 font-bold mt-0.5">✓</span>
              <span>
                <strong>Population-level research:</strong> Public health
                agencies use BMI to track obesity trends across populations and
                regions over time. For this aggregate purpose, individual
                inaccuracies largely average out.
                <sup className="text-blue-400 text-xs ml-1">[1]</sup>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-400 font-bold mt-0.5">✓</span>
              <span>
                <strong>Tracking personal change over time:</strong> Even if
                your absolute BMI number is imperfect, tracking the direction of
                change over months can signal whether a diet or fitness plan is
                producing results.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-400 font-bold mt-0.5">✓</span>
              <span>
                <strong>Clinical and insurance eligibility:</strong> Many
                clinical programmes, insurance products, and bariatric
                procedures use BMI thresholds as eligibility criteria — so
                knowing your number has practical administrative value.
              </span>
            </li>
          </ul>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: CALCULATOR CTA
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="calculate-bmi">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Calculate Your BMI Now — Free Tool
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Now that you understand what BMI means, how to calculate bmi
            manually, and where its limits lie — check your own number using our
            free tool. It works in both metric and imperial, shows your WHO
            category instantly, and requires no sign-up.
          </p>

          <Link
            href="/calculators/health/bmi-calculator"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors duration-200"
          >
            Open BMI Calculator →
          </Link>

          <p className="text-gray-400 text-sm mt-4">
            Free · No sign-up · Works on mobile · Metric &amp; imperial · Result
            in under 1 seconds
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            REFERENCES
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="references">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            References &amp; Sources
          </h2>
          <p className="text-gray-400 text-sm mb-5 italic">
            This article is based on peer-reviewed research and guidelines from
            internationally recognised health organisations. All sources were
            accessed in April 2026.
          </p>

          <ol className="space-y-4 text-sm text-gray-300 leading-relaxed list-decimal list-inside">
            <li>
              Keys A, Fidanza F, Karvonen MJ, Kimura N, Taylor HL.{" "}
              <em>Indices of relative weight and obesity.</em> Journal of
              Chronic Diseases. 1972;25(6):329–343. — Original paper
              establishing BMI as a population screening measure.
            </li>
            <li>
              World Health Organization.{" "}
              <em>BMI Classification — Global Database on Body Mass Index.</em>{" "}
              Geneva: WHO; 2004. Available at:{" "}
              <a
                href="https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                who.int
              </a>
              . — Source for all BMI category thresholds (18.5, 25.0, 30.0).
            </li>
            <li>
              WHO Expert Consultation.{" "}
              <em>
                Appropriate body-mass index for Asian populations and its
                implications for policy and intervention strategies.
              </em>{" "}
              The Lancet. 2004;363(9403):157–163.{" "}
              <a
                href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(03)15268-3/fulltext"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                DOI: 10.1016/S0140-6736(03)15268-3
              </a>
              . — Source for adjusted Asian BMI thresholds (23.0 overweight,
              27.5 obese).
            </li>
            <li>
              Centers for Disease Control and Prevention (CDC).{" "}
              <em>Body Mass Index: Considerations for Practitioners.</em>{" "}
              Atlanta: CDC; 2011. Available at:{" "}
              <a
                href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                cdc.gov
              </a>
              . — Source for sex-based differences in BMI and fat distribution.
            </li>
            <li>
              Cruz-Jentoft AJ, Baeyens JP, Bauer JM, et al.{" "}
              <em>
                Sarcopenia: European consensus on definition and diagnosis.
              </em>{" "}
              Age and Ageing. 2010;39(4):412–423. — Source for age-related
              muscle decline and BMI accuracy in older adults.
            </li>
            <li>
              Centers for Disease Control and Prevention (CDC).{" "}
              <em>BMI for Children and Teens.</em> Available at:{" "}
              <a
                href="https://www.cdc.gov/bmi/child-teen-calculator/bmi-categories.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                cdc.gov
              </a>
              . — Source for children's BMI percentile system (ages 2–19).
            </li>
            <li>
              Nevill AM, Stewart AD, Olds T, Holder R.{" "}
              <em>
                Relationship between adiposity and body size reveals limitations
                of BMI.
              </em>{" "}
              American Journal of Physical Anthropology. 2006;129(1):151–156. —
              Source for BMI limitations regarding muscle mass vs fat mass.
            </li>
          </ol>
        </section>

        {/* ══════════════════════════════════════════════════
            RELATED POSTS
        ══════════════════════════════════════════════════ */}
        {/* <section className="mt-16">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Related Health Guides on LizoCalc
          </h2>
          <ul className="space-y-3 text-base">
            <li>
              <Link
                href="/blogs/health/bmi-ranges-explained"
                className="text-blue-400 hover:underline"
              >
                BMI ranges explained: what is a normal and healthy BMI?
              </Link>
            </li>
            <li>
              <Link
                href="/blogs/health/bmi-chart-women"
                className="text-blue-400 hover:underline"
              >
                BMI chart for women: how to read and use it
              </Link>
            </li>
            <li>
              <Link
                href="/blogs/health/bmi-chart-men"
                className="text-blue-400 hover:underline"
              >
                BMI chart for men: ranges, categories and what they mean
              </Link>
            </li>
            <li>
              <Link
                href="/blogs/health/how-to-calculate-bmi"
                className="text-blue-400 hover:underline"
              >
                How to calculate BMI manually: formula with examples
              </Link>
            </li>
            <li>
              <Link
                href="/blogs/health/bmi-scale-categories"
                className="text-blue-400 hover:underline"
              >
                BMI scale: underweight, normal, overweight and obese categories
              </Link>
            </li>
            <li>
              <Link
                href="/blogs/health/bmi-index-vs-body-fat"
                className="text-blue-400 hover:underline"
              >
                BMI index vs body fat: what the number actually tells you
              </Link>
            </li>
          </ul>
        </section> */}

        {/* ══════════════════════════════════════════════════
            E-E-A-T BYLINE
        ══════════════════════════════════════════════════ */}
        <div className="flex items-center gap-4 mt-16 p-5 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RA
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">
              Written by Rana Muhammad Abdullah
            </p>
            <p className="text-gray-400 text-xs leading-relaxed mt-0.5">
              MERN Stack Developer &amp; Tool Maker · Mechatronics &amp; Control
              Engineering Student ·{" "}
              <a
                href="https://www.linkedin.com/in/abdullahsajjad06/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Content based on WHO guidelines, CDC recommendations, and
              peer-reviewed research. See full references above.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-gray-400 text-right">
            <span>📅 Published: May 01, 2026</span>
            <span>🔄 Updated: May 01, 2026</span>
            <span>✅ Factually reviewed</span>
          </div>
        </div>

        {/* Closing statement */}
        <p className="text-gray-300 italic text-center mt-16 text-lg font-medium leading-relaxed">
          BMI is not a verdict — it is a starting point. Use it alongside other
          measurements, understand its limits, and always consult a healthcare
          professional for personal medical decisions.
        </p>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}
