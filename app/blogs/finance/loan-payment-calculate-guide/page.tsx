import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";

const faqData = [
  {
    question: "How do I manually calculate monthly loan payments?",
    answer:
      "Use the standard amortization formula: M = P × [r(1+r)^n] ÷ [(1+r)^n − 1]. Where P is your principal (loan amount), r is your monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments (years × 12). For a $10,000 loan at 8% annual interest over 3 years: r = 0.006667, n = 36, and M = $313.36.",
  },
  {
    question: "What is the formula for loan payment calculation?",
    answer:
      "The universal loan payment formula is M = P × [r(1+r)^n] ÷ [(1+r)^n − 1]. This formula applies to personal loans, car loans, mortgages, and student loans. The key variables are P (principal), r (monthly interest rate), and n (number of payments). It assumes fixed monthly payments and a fixed interest rate throughout the loan term.",
  },
  {
    question: "How do banks calculate EMI?",
    answer:
      "Banks use the same amortization formula: EMI = P × [r(1+r)^n] ÷ [(1+r)^n − 1]. EMI (Equated Monthly Instalment) is the term used across South Asia, particularly in Pakistan, India, and Bangladesh. The bank converts your annual interest rate to monthly, multiplies your loan term into months, and applies the formula to arrive at a fixed monthly figure.",
  },
  {
    question: "Does paying extra reduce total interest?",
    answer:
      "Yes — significantly. Extra payments reduce your outstanding principal faster, which means less principal for interest to accrue on each month. On a $10,000 loan at 8% over 36 months, paying an extra $50 per month can save approximately $420 in total interest and cut the repayment period by around 8 months. Even a single extra payment early in the loan term produces outsized savings.",
  },
  {
    question: "How much of my payment goes to interest first?",
    answer:
      "Early in a loan, the majority of each payment covers interest. This is because interest is calculated on the full remaining balance, which is highest at the start. For example, on a $10,000 loan at 8%, your very first payment of $313.36 includes $66.67 in interest and only $246.69 in principal. By month 36, almost the entire payment is principal. This pattern is called front-loaded interest.",
  },
  {
    question: "What is an amortization schedule?",
    answer:
      "An amortization schedule is a complete table showing every payment over the life of a loan. Each row lists the payment number, total payment amount, how much goes to principal, how much goes to interest, and the remaining balance after that payment. The schedule clearly shows how early payments are mostly interest, and later payments are mostly principal — a pattern called amortization.",
  },
  {
    question: "What is the difference between APR and interest rate?",
    answer:
      "The interest rate is the cost of borrowing the principal — expressed as a percentage per year. APR (Annual Percentage Rate) includes the interest rate plus all fees associated with the loan (origination fees, processing charges, insurance). APR is always equal to or higher than the interest rate and represents the true cost of borrowing. When comparing loans, always compare APR, not just the headline interest rate.",
  },
  {
    question: "How much loan can I afford to take?",
    answer:
      "A widely used guideline is the 28/36 rule: your monthly housing payment should not exceed 28% of your gross monthly income, and total monthly debt (including all loans) should not exceed 36%. Another check is your debt-to-income (DTI) ratio — total monthly debt payments divided by gross monthly income. Most lenders prefer a DTI below 43%. Calculate your monthly payment first, then check it against these benchmarks before borrowing.",
  },
];

export const metadata: Metadata = {
  title: "How to Calculate Your Loan Payment Step by Step — Formula, Examples & Schedule",
  description:
    "Learn how to calculate your monthly loan payment using the exact formula. Includes step-by-step examples, amortization schedule, interest rate comparisons, and a free loan payment calculator.",
  keywords: [
    "how to calculate loan payment",
    "monthly loan payment formula",
    "loan EMI calculation",
    "loan payment calculator",
    "amortization schedule",
    "calculate loan payment",
    "interest payment calculator",
    "loan repayment formula",
    "monthly payment calculator",
    "loan EMI formula",
    "personal loan payment",
    "car loan payment calculation",
    "mortgage payment formula",
    "loan amortization",
    "how to calculate EMI",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "How to Calculate Your Loan Payment Step by Step — Formula, Examples & Schedule",
    description:
      "The complete guide to calculating loan payments: the exact formula, a step-by-step worked example, amortization schedule, extra payment impact, and interest rate comparisons.",
    url: "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide",
    siteName: "LizoCalc",
    type: "article",
    images: [
      {
        url: "https://www.lizocalc.com/images/blogs/finance/loan-payment-amortization-chart.webp",
        width: 1400,
        height: 788,
        alt: "Loan amortization schedule chart showing remaining balance, principal paid, and interest paid over 36 months",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate Your Loan Payment — Step-by-Step Formula & Examples",
    description:
      "Master the loan payment formula with worked examples, amortization schedules, and interest comparison tables.",
    images: [
      "https://www.lizocalc.com/images/blogs/finance/loan-payment-amortization-chart.webp",
    ],
  },
};

export default function LoanPaymentCalculateGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          STRUCTURED DATA
      ═══════════════════════════════════════════════════════ */}
      <Script
        id="structured-data-loan-payment-guide"
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
                  "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide#breadcrumb",
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
                    name: "Finance",
                    item: "https://www.lizocalc.com/blogs/finance",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "How to Calculate Your Loan Payment",
                    item: "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide",
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
                  "Finance Calculators",
                  "Loan Payment",
                  "Amortization",
                  "EMI Calculation",
                  "Web Development",
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
                  "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide#article",
                headline:
                  "How to Calculate Your Loan Payment Step by Step — Formula, Examples & Schedule",
                description:
                  "A complete, practical guide to calculating monthly loan payments: the exact amortization formula, a full worked example, amortization schedule table, extra payment analysis, interest rate comparisons, and loan affordability checks.",
                url: "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide",
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
                  "@id":
                    "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide",
                },
                isPartOf: {
                  "@id": "https://www.lizocalc.com/#website",
                },
                breadcrumb: {
                  "@id":
                    "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide#breadcrumb",
                },
                image: [
                  "https://www.lizocalc.com/images/blogs/finance/loan-payment-amortization-chart.webp",
                ],
                about: {
                  "@type": "Thing",
                  name: "Loan Payment Calculation",
                },
                keywords:
                  "calculate loan payment, monthly loan payment formula, loan EMI calculation, amortization schedule, interest payment calculator, loan repayment",
                articleSection: "Finance",
                wordCount: 3200,
                citation: [
                  {
                    "@type": "CreativeWork",
                    name: "Consumer Financial Protection Bureau — Understanding Loan Costs",
                    url: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loans-interest-rate-and-its-apr-en-135/",
                    publisher: {
                      "@type": "Organization",
                      name: "Consumer Financial Protection Bureau",
                    },
                  },
                  {
                    "@type": "CreativeWork",
                    name: "Investopedia — Amortization",
                    url: "https://www.investopedia.com/terms/a/amortization.asp",
                    publisher: {
                      "@type": "Organization",
                      name: "Investopedia",
                    },
                  },
                ],
              },

              /* ── 6. WEBPAGE ── */
              {
                "@type": "WebPage",
                "@id":
                  "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide",
                url: "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide",
                name: "How to Calculate Your Loan Payment Step by Step — Formula, Examples & Schedule",
                description:
                  "Learn how to calculate monthly loan payments using the exact formula, with step-by-step examples, amortization schedules, and interest comparisons.",
                inLanguage: "en",
                datePublished: "2026-04-30",
                dateModified: "2026-04-30",
                isPartOf: {
                  "@id": "https://www.lizocalc.com/#website",
                },
                mainEntity: {
                  "@id":
                    "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide#article",
                },
                author: {
                  "@id": "https://www.lizocalc.com/#author",
                },
                publisher: {
                  "@id": "https://www.lizocalc.com/#org",
                },
                breadcrumb: {
                  "@id":
                    "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide#breadcrumb",
                },
              },

              /* ── 7. DEFINED TERM ── */
              {
                "@type": "DefinedTerm",
                "@id":
                  "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide#term",
                name: "Loan Amortization",
                description:
                  "Loan amortization is the process of paying off a debt through scheduled, fixed payments over time. Each payment covers both interest and principal, with interest making up a larger share early in the loan and principal growing larger toward the end.",
                inDefinedTermSet: {
                  "@type": "DefinedTermSet",
                  name: "Finance & Loan Terms — LizoCalc",
                },
              },

              /* ── 8. IMAGE OBJECT ── */
              {
                "@type": "ImageObject",
                "@id":
                  "https://www.lizocalc.com/images/blogs/finance/loan-payment-amortization-chart.webp#image1",
                url: "https://www.lizocalc.com/images/blogs/finance/loan-payment-amortization-chart.webp",
                contentUrl:
                  "https://www.lizocalc.com/images/blogs/finance/loan-payment-amortization-chart.webp",
                name: "Loan Amortization Schedule Chart",
                caption:
                  "Line chart showing loan amortization over 36 months — remaining balance (blue), principal paid (green), and interest paid (purple).",
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

              /* ── 9. HOW-TO ── */
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide#howto",
                name: "How to Calculate a Monthly Loan Payment",
                description:
                  "Step-by-step guide to calculating a monthly loan payment using the amortization formula.",
                totalTime: "PT5M",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Identify your loan inputs",
                    text: "Gather your principal (P), annual interest rate, and loan term in years.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Convert annual rate to monthly",
                    text: "Divide the annual interest rate by 12 to get the monthly rate (r). Example: 8% ÷ 12 = 0.6667% = 0.006667.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Convert years to months",
                    text: "Multiply the loan term in years by 12 to get n (number of payments). Example: 3 years × 12 = 36 months.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Apply the formula",
                    text: "M = P × [r(1+r)^n] ÷ [(1+r)^n − 1]. For a $10,000 loan at 8% over 36 months: M = $313.36.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 5,
                    name: "Calculate total cost",
                    text: "Multiply your monthly payment by n to get total paid. Subtract P to find total interest. Example: $313.36 × 36 = $11,281. Interest = $11,281 − $10,000 = $1,281.",
                  },
                ],
              },

              /* ── 10. FAQ PAGE ── */
              {
                "@type": "FAQPage",
                "@id":
                  "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide#faq",
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide",
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
                <Link href="/blogs/finance" className="hover:text-blue-400">
                  Finance
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li className="text-gray-300">How to Calculate Your Loan Payment</li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            How to Calculate Your Loan Payment Step by Step — Formula, Examples &amp; Amortization Schedule
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
            <span>Published: May 01, 2026</span>
            <span>·</span>
            <span>12 min read</span>
            <span>·</span>
            <span className="text-green-400">✅ Factually reviewed</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ARTICLE BODY
      ═══════════════════════════════════════════════════════ */}
      <article className="max-w-4xl mx-auto px-6 py-14 text-white">

        {/* ── QUICK ANSWER BOX ── */}
        <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6 mb-8">
          <p className="text-white font-semibold text-lg mb-2">
            ⚡ Quick Answer: How to Calculate a Loan Payment
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            Use the standard loan payment formula:{" "}
            <strong>M = P × [r(1+r)^n] ÷ [(1+r)^n − 1]</strong>. Where{" "}
            <strong>P</strong> is the loan amount, <strong>r</strong> is the
            monthly interest rate (annual rate ÷ 12), and <strong>n</strong> is
            the total number of monthly payments (years × 12). For a $10,000
            loan at 8% annual interest over 3 years, the monthly payment is{" "}
            <strong>$313.36</strong>.
          </p>
        </div>

        {/* ── DISCLAIMER ── */}
        <div className="bg-yellow-900/20 border border-yellow-600/40 rounded-xl p-4 mb-10 text-sm text-yellow-200 leading-relaxed">
          <strong>Financial Disclaimer:</strong> This guide is for educational
          purposes only and is based on standard amortization mathematics. It
          does not constitute financial advice. Actual loan payments may vary
          based on lender fees, compounding frequency, and other terms. Always
          verify your figures with your lender before signing any loan
          agreement.
        </div>

        {/* ══════════════════════════════════════════════════
            H2: INTRODUCTION
        ══════════════════════════════════════════════════ */}
        <section className="mt-10" id="introduction">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Why You Should Calculate Your Loan Payment Before Borrowing
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Most people focus on the loan amount — and completely miss the
            monthly payment. That is how overborrowing happens. A $25,000 car
            loan at 9% over 60 months sounds manageable until you realize the
            monthly payment is $519 and the total interest paid is over $6,000.
            Running the numbers before you sign changes everything.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            A <strong>loan payment</strong> is the fixed amount you pay to your
            lender every month. Each payment covers two things: a portion that
            reduces your principal (the amount you originally borrowed) and a
            portion that covers interest (the lender&apos;s charge for lending
            you money). Understanding how these two components split — and how
            that split changes month by month — is the foundation of smart
            borrowing.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Whether you are taking a personal loan, financing a car, applying
            for a mortgage, or repaying a student loan — the calculation method
            is the same. The <strong>monthly loan payment formula</strong>,
            the <strong>loan EMI calculation</strong>, and the concept of an{" "}
            <strong>amortization schedule</strong> all flow from a single
            equation. This guide walks through all of it — no financial
            background required.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-3">
            Three Things That Determine Your Monthly Payment
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Before touching any formula, it helps to understand the three levers
            that control your monthly payment:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Variable</th>
                  <th className="p-4 text-left font-semibold">What it is</th>
                  <th className="p-4 text-left font-semibold">Effect on payment</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Loan Amount (Principal)</td>
                  <td className="p-4 text-gray-300">The total amount you borrow</td>
                  <td className="p-4 text-gray-300">Higher amount → higher payment</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Interest Rate</td>
                  <td className="p-4 text-gray-300">Annual cost of borrowing, as a percentage</td>
                  <td className="p-4 text-gray-300">Higher rate → higher payment</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Loan Term</td>
                  <td className="p-4 text-gray-300">How many months or years to repay</td>
                  <td className="p-4 text-gray-300">Longer term → lower payment but more total interest</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            Stretching the loan term reduces the monthly payment — but it
            increases the total interest you pay over the life of the loan.
            Shortening the term does the opposite. This trade-off is at the
            heart of every borrowing decision.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: KEY INPUTS
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="key-inputs">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Key Inputs Needed to Calculate a Loan Payment
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Before applying the formula, gather these four pieces of information.
            They appear on every loan offer sheet — if a lender cannot provide
            all four clearly, that is a red flag.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Input</th>
                  <th className="p-4 text-left font-semibold">Symbol</th>
                  <th className="p-4 text-left font-semibold">Meaning</th>
                  <th className="p-4 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-green-300">Loan Amount</td>
                  <td className="p-4 font-mono text-yellow-300">P</td>
                  <td className="p-4 text-gray-300">Principal — total amount borrowed</td>
                  <td className="p-4 text-gray-300">$10,000</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-green-300">Annual Interest Rate</td>
                  <td className="p-4 font-mono text-yellow-300">Annual r</td>
                  <td className="p-4 text-gray-300">Yearly cost of the loan as a percentage</td>
                  <td className="p-4 text-gray-300">8% per year</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-green-300">Loan Term</td>
                  <td className="p-4 font-mono text-yellow-300">n (months)</td>
                  <td className="p-4 text-gray-300">Total repayment period in months</td>
                  <td className="p-4 text-gray-300">36 months (3 years)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-green-300">Payment Frequency</td>
                  <td className="p-4 font-mono text-yellow-300">—</td>
                  <td className="p-4 text-gray-300">How often payments are made</td>
                  <td className="p-4 text-gray-300">Monthly (most common)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            This guide uses monthly payments — the standard in most personal
            loans, car loans, and mortgages worldwide. If your loan uses biweekly
            or weekly payments, the formula is the same but you divide the annual
            rate by 26 (biweekly) or 52 (weekly) and adjust the payment count
            accordingly.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: THE FORMULA
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="loan-payment-formula">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            The Monthly Loan Payment Formula — Explained
          </h2>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            The Standard Amortization Formula
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-base mb-6 overflow-x-auto">
            M = P × [ r(1 + r)^n ] ÷ [ (1 + r)^n − 1 ]
            <br />
            <br />
            <span className="text-gray-400 text-sm">
              Where:
              <br />
              M = Monthly payment
              <br />
              P = Principal (loan amount)
              <br />
              r = Monthly interest rate (annual rate ÷ 12)
              <br />
              n = Total number of monthly payments (years × 12)
            </span>
          </div>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            This formula is used universally — by banks, lenders, and financial
            software worldwide. In South Asia, the same formula drives what is
            called the <strong>EMI (Equated Monthly Instalment)</strong>{" "}
            calculation. The name differs; the math is identical.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            How to Convert Inputs Before Using the Formula
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Two conversions are required before plugging in your numbers. These
            are the most common sources of error when people calculate manually:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-gray-800/50 border border-blue-700/50 rounded-2xl p-5">
              <h4 className="text-base font-semibold text-blue-300 mb-3">
                Convert Annual Rate → Monthly Rate
              </h4>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-sm">
                r = Annual rate ÷ 12
                <br />
                <br />
                Example:
                <br />
                8% ÷ 12 = 0.6667%
                <br />= 0.006667 (decimal)
              </div>
            </div>
            <div className="bg-gray-800/50 border border-blue-700/50 rounded-2xl p-5">
              <h4 className="text-base font-semibold text-blue-300 mb-3">
                Convert Years → Months
              </h4>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-sm">
                n = Years × 12
                <br />
                <br />
                Example:
                <br />
                3 years × 12
                <br />= 36 months
              </div>
            </div>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            Always use the decimal form of the monthly rate — <code className="bg-gray-800 px-1 rounded text-green-300">0.006667</code>, not{" "}
            <code className="bg-gray-800 px-1 rounded text-green-300">0.6667%</code> — when applying the formula. Forgetting this
            conversion is one of the most common calculation mistakes.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: WORKED EXAMPLE
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="worked-example">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Step-by-Step Worked Example — $10,000 Personal Loan
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Let us walk through a complete, realistic calculation from beginning
            to end. No shortcuts — every step shown.
          </p>

          <div className="bg-blue-900/20 border border-blue-700 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">
              Loan Details
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-800/60 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">Loan Amount</p>
                <p className="text-white font-bold text-xl">$10,000</p>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">Annual Interest</p>
                <p className="text-white font-bold text-xl">8%</p>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">Loan Term</p>
                <p className="text-white font-bold text-xl">3 Years</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-yellow-300 mb-3">
                Step 1 — Convert annual rate to monthly
              </h3>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
                r = 8% ÷ 12 = 0.6667% = 0.006667
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-yellow-300 mb-3">
                Step 2 — Convert years to months
              </h3>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
                n = 3 × 12 = 36 months
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-yellow-300 mb-3">
                Step 3 — Apply the formula
              </h3>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
                (1 + r)^n = (1.006667)^36 = 1.27024
                <br />
                <br />
                Numerator: r × (1+r)^n = 0.006667 × 1.27024 = 0.008469
                <br />
                Denominator: (1+r)^n − 1 = 1.27024 − 1 = 0.27024
                <br />
                <br />
                M = 10,000 × (0.008469 ÷ 0.27024)
                <br />
                M = 10,000 × 0.031336
                <br />
                M = <strong>$313.36</strong>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-yellow-300 mb-3">
                Step 4 — Calculate total cost and total interest
              </h3>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
                Total paid = $313.36 × 36 = $11,281
                <br />
                Total interest = $11,281 − $10,000 = <strong>$1,281</strong>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-green-900/60">
                  <th className="p-4 text-left font-semibold">Result</th>
                  <th className="p-4 text-left font-semibold">Value</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-green-300">Monthly Payment</td>
                  <td className="p-4 font-bold text-white text-lg">$313.36</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-green-300">Total Amount Paid</td>
                  <td className="p-4 font-bold text-white">$11,281</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-green-300">Total Interest Paid</td>
                  <td className="p-4 font-bold text-yellow-400">$1,281</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-green-300">Loan Term</td>
                  <td className="p-4 text-gray-300">36 months</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            You do not need to run these steps every time. Use our{" "}
            <Link
              href="/calculators/financial/loan-calculator"
              className="text-blue-400 hover:underline"
            >
              Loan Payment Calculator
            </Link>{" "}
            to get your result instantly — enter your principal, rate, and term,
            and the calculator does the rest.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: AMORTIZATION SCHEDULE + IMAGE
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="amortization-schedule">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Loan Amortization Schedule — How Every Payment Breaks Down
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            An <strong>amortization schedule</strong> is a complete month-by-month
            breakdown of every payment you make. It answers the question most
            borrowers never ask: <em>how much of this payment actually reduces
            my debt?</em>
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The answer surprises most people. In the early months, the majority
            of each payment goes toward interest — not principal. This is because
            interest is calculated on the full outstanding balance, which is at
            its highest point when you first borrow. As your balance falls, each
            month&apos;s interest charge shrinks, and more of your fixed payment
            goes toward reducing principal. This gradual shift is called
            amortization.
          </p>

          {/* AMORTIZATION CHART IMAGE */}
          <figure className="my-8">
            <div className="rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/images/blogs/finance/loan-payment-amortization-chart.webp"
                alt="Loan amortization schedule line chart for a $10,000 loan at 8% over 36 months, showing three lines: remaining loan balance declining from $10,000 to $0 (blue), cumulative principal paid rising from $0 to approximately $5,300 (green), and cumulative interest paid rising then flattening at $1,281 (purple)"
                title="Loan Amortization Schedule Chart — $10,000 at 8% over 36 Months — LizoCalc"
                width={1400}
                height={788}
                className="w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
            <figcaption className="mt-3 text-sm text-gray-400 text-center italic leading-relaxed">
              <strong className="text-gray-300">Figure 1:</strong> Loan
              amortization schedule for a $10,000 personal loan at 8% annual
              interest over 36 months. The blue line shows the remaining loan
              balance falling from $10,000 to zero. The green line shows
              cumulative principal paid, which accelerates as the loan matures.
              The purple line shows cumulative interest paid, which front-loads
              early in the term and flattens near the end. Total interest paid:
              $1,281. — LizoCalc Finance Visuals, 2026.
            </figcaption>
          </figure>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Sample Amortization Table — First 5 Payments
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Based on the $10,000 loan at 8% over 36 months ($313.36/month):
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Payment #</th>
                  <th className="p-4 text-left font-semibold">Payment</th>
                  <th className="p-4 text-left font-semibold">Principal</th>
                  <th className="p-4 text-left font-semibold">Interest</th>
                  <th className="p-4 text-left font-semibold">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-gray-300">1</td>
                  <td className="p-4">$313.36</td>
                  <td className="p-4 text-green-400 font-semibold">$246.69</td>
                  <td className="p-4 text-red-400">$66.67</td>
                  <td className="p-4">$9,753.31</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">2</td>
                  <td className="p-4">$313.36</td>
                  <td className="p-4 text-green-400 font-semibold">$248.34</td>
                  <td className="p-4 text-red-400">$65.02</td>
                  <td className="p-4">$9,504.97</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">3</td>
                  <td className="p-4">$313.36</td>
                  <td className="p-4 text-green-400 font-semibold">$250.00</td>
                  <td className="p-4 text-red-400">$63.37</td>
                  <td className="p-4">$9,254.97</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">12</td>
                  <td className="p-4">$313.36</td>
                  <td className="p-4 text-green-400 font-semibold">$264.11</td>
                  <td className="p-4 text-red-400">$49.25</td>
                  <td className="p-4">$7,127.18</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">24</td>
                  <td className="p-4">$313.36</td>
                  <td className="p-4 text-green-400 font-semibold">$281.78</td>
                  <td className="p-4 text-red-400">$31.58</td>
                  <td className="p-4">$4,456.41</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">36</td>
                  <td className="p-4">$313.36</td>
                  <td className="p-4 text-green-400 font-semibold">$311.26</td>
                  <td className="p-4 text-red-400">$2.09</td>
                  <td className="p-4 text-green-400 font-bold">$0.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            Notice how Payment #1 sends $66.67 to interest but Payment #36
            sends only $2.09. The monthly payment amount never changes — but
            the proportion going to interest steadily falls throughout the loan
            life.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: EXTRA PAYMENTS
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="extra-payment-impact">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            What Happens When You Pay Extra?
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Extra payments are one of the most powerful — and most
            underused — tools in personal finance. When you pay more than your
            required monthly payment, the excess goes entirely toward principal.
            This reduces the balance on which interest is calculated next month,
            creating a compounding effect over time.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The impact is largest when you make extra payments early in the
            loan — because that is when the balance is highest and interest is
            consuming the most of each payment. A single extra payment in month
            1 saves more interest than the same extra payment in month 30.
          </p>

          <div className="bg-green-900/20 border border-green-600/40 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-300 mb-4">
              Extra Payment Example — $10,000 at 8% over 36 Months
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-5">
                <p className="text-gray-400 text-xs mb-2 uppercase tracking-wide">Standard Payment</p>
                <p className="text-white font-bold text-lg">$313.36 / month</p>
                <div className="mt-3 space-y-1 text-sm text-gray-300">
                  <p>Total paid: <span className="text-white font-semibold">$11,281</span></p>
                  <p>Total interest: <span className="text-red-400 font-semibold">$1,281</span></p>
                  <p>Payoff: <span className="text-white font-semibold">36 months</span></p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-5 border border-green-700/50">
                <p className="text-gray-400 text-xs mb-2 uppercase tracking-wide">With Extra $50/Month</p>
                <p className="text-green-400 font-bold text-lg">$363.36 / month</p>
                <div className="mt-3 space-y-1 text-sm text-gray-300">
                  <p>Total paid: <span className="text-white font-semibold">~$10,861</span></p>
                  <p>Total interest: <span className="text-green-400 font-semibold">~$861</span></p>
                  <p>Payoff: <span className="text-green-400 font-semibold">~28 months</span></p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-900/60 rounded-xl text-center">
              <p className="text-green-300 font-semibold">
                Extra $50/month saves approximately <span className="text-white">$420 in interest</span> and cuts repayment by <span className="text-white">8 months</span>
              </p>
            </div>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            If you receive a bonus, tax refund, or freelance payment, consider
            directing a portion toward your loan principal. Even a single
            lump-sum extra payment mid-loan can meaningfully reduce total
            interest. Always confirm with your lender that there is no
            prepayment penalty before doing this.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: INTEREST RATE COMPARISON
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="interest-rate-comparison">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Interest Rate Comparison — How Rate Changes Your Total Cost
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            A difference of just 3–4 percentage points in interest rate can add
            hundreds of dollars to your total repayment. The table below
            illustrates this clearly — same $10,000 loan, same 36-month term,
            different interest rates:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Interest Rate</th>
                  <th className="p-4 text-left font-semibold">Monthly Payment</th>
                  <th className="p-4 text-left font-semibold">Total Paid</th>
                  <th className="p-4 text-left font-semibold">Total Interest</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-green-400">5%</td>
                  <td className="p-4">$299.71</td>
                  <td className="p-4">$10,790</td>
                  <td className="p-4 text-green-400 font-semibold">$790</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-400">8%</td>
                  <td className="p-4">$313.36</td>
                  <td className="p-4">$11,281</td>
                  <td className="p-4 text-yellow-400 font-semibold">$1,281</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-orange-400">12%</td>
                  <td className="p-4">$332.14</td>
                  <td className="p-4">$11,957</td>
                  <td className="p-4 text-orange-400 font-semibold">$1,957</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-red-400">18%</td>
                  <td className="p-4">$361.34</td>
                  <td className="p-4">$13,008</td>
                  <td className="p-4 text-red-400 font-semibold">$3,008</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-red-600">24%</td>
                  <td className="p-4">$392.00</td>
                  <td className="p-4">$14,112</td>
                  <td className="p-4 text-red-600 font-semibold">$4,112</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            Going from 5% to 18% on a $10,000 loan costs you an extra $2,218
            in interest over the same 3-year period. This is why improving your
            credit score before applying — or shopping around for a better rate —
            is one of the highest-return financial moves you can make.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: LOAN TYPES
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="loan-types">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Applying the Formula Across Different Loan Types
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The same amortization formula works across virtually every type of
            fixed-rate installment loan. What changes is not the formula — but
            the typical principal amounts, interest rates, and repayment terms
            involved.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-blue-300 mb-3">
                🏠 Mortgage Loans
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                The largest loan most people ever take. Same formula applies
                but with much larger principals ($100,000–$1M+) and longer
                terms (15–30 years). Over 30 years, total interest can easily
                exceed the original loan amount.
              </p>
              <p className="text-gray-400 text-xs">Typical term: 15–30 years · Rate: 4–8%</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-blue-300 mb-3">
                🚗 Car Loans (Auto Loans)
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                Standard fixed-rate installment loans. The formula applies
                directly. Because terms are shorter (3–7 years), total interest
                is lower than mortgages, but the rate is often higher.
              </p>
              <p className="text-gray-400 text-xs">Typical term: 36–84 months · Rate: 5–15%</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-blue-300 mb-3">
                💳 Personal Loans
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                Unsecured loans used for anything from debt consolidation to
                home improvement. Higher interest rates than secured loans
                because there is no collateral. The worked example in this
                guide uses a personal loan.
              </p>
              <p className="text-gray-400 text-xs">Typical term: 12–60 months · Rate: 7–25%</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-blue-300 mb-3">
                🎓 Student Loans
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                Government-backed student loans may use income-driven repayment
                plans rather than standard amortization. However, standard
                fixed repayment plans follow the same formula exactly.
              </p>
              <p className="text-gray-400 text-xs">Typical term: 10–25 years · Rate: 3–9%</p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 md:col-span-2">
              <h3 className="text-base font-semibold text-blue-300 mb-3">
                🏢 Business Loans
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                Installment-based business loans (term loans) use identical
                amortization mechanics. Some business loans use interest-only
                periods followed by principal repayment — in those cases, a
                modified calculation is needed. For standard term loans, the
                formula above applies directly.
              </p>
              <p className="text-gray-400 text-xs">Typical term: 1–10 years · Rate: 6–30%</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: COMMON MISTAKES
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="common-mistakes">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Common Mistakes When Calculating Loan Payments
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            These are the errors that cause people to underestimate their true
            loan cost. Each is easy to avoid once you know it exists.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-800/50 border-l-4 border-red-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-red-300 mb-2">
                1. Forgetting to convert annual rate to monthly
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                This is the most common error. The formula requires the monthly
                rate (r), not the annual rate. If your loan is 8% per year, you
                must use <code className="bg-gray-900 px-1 rounded">0.006667</code> in the
                formula — not <code className="bg-gray-900 px-1 rounded">0.08</code>. Using
                the annual rate directly will produce a wildly incorrect result.
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-orange-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-orange-300 mb-2">
                2. Ignoring fees and origination charges
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Many lenders charge origination fees (0.5–8% of the loan),
                processing fees, or insurance premiums on top of the stated
                interest rate. These do not show up in the monthly payment
                formula but are part of the true cost. The APR figure accounts
                for these — the interest rate figure does not.
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-yellow-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-yellow-300 mb-2">
                3. Using the wrong loan term unit
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The formula uses <strong>months</strong> for n — not years. A
                5-year loan is 60 months, not 5. Plugging 5 into the formula
                instead of 60 will produce a completely wrong monthly payment
                and apparent total cost.
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-purple-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-purple-300 mb-2">
                4. Confusing APR with the interest rate
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lenders sometimes advertise the interest rate but quote the APR
                in fine print, or vice versa. The interest rate drives the
                formula. The APR reflects total borrowing cost including fees.
                When comparing two loan offers, compare APR — not just the
                headline interest rate.
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-blue-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-blue-300 mb-2">
                5. Assuming a longer term always saves money
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                A longer loan term reduces monthly payments but dramatically
                increases total interest paid. A $20,000 car loan at 7% over
                48 months costs $1,856 in interest. Stretched to 72 months,
                the same loan costs $2,826 in interest — $970 more — even
                though the monthly payment feels more comfortable.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: APR VS INTEREST RATE
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="apr-vs-interest-rate">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            APR vs Interest Rate — What Is the Difference?
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            This distinction matters more than most borrowers realize.
            Understanding it ensures you are comparing loan offers on a level
            playing field.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Term</th>
                  <th className="p-4 text-left font-semibold">What it measures</th>
                  <th className="p-4 text-left font-semibold">Used for</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-green-300">Interest Rate</td>
                  <td className="p-4 text-gray-300">The annual cost of borrowing the principal only</td>
                  <td className="p-4 text-gray-300">Calculating the monthly payment (M in the formula)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">APR (Annual Percentage Rate)</td>
                  <td className="p-4 text-gray-300">Interest rate + all lender fees, expressed annually</td>
                  <td className="p-4 text-gray-300">Comparing the true total cost across different lenders</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-6">
            <h3 className="text-base font-semibold text-blue-300 mb-3">
              Practical Example
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              Lender A offers a 7.5% interest rate with no fees. Lender B offers
              a 7.0% interest rate but charges a 2% origination fee ($200 on a
              $10,000 loan). Lender B&apos;s APR, after including the fee
              spread across the loan term, works out to approximately 8.5% —
              making it the more expensive option despite the lower headline rate.
            </p>
            <p className="text-gray-400 text-xs italic">
              Always ask for the APR figure, not just the interest rate, when
              comparing loan offers.
            </p>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            In Pakistan and other South Asian markets, some lenders quote a
            flat rate rather than a reducing balance rate. A flat rate of 8%
            on a $10,000 loan means you pay interest on the original $10,000
            throughout the term — even as you repay the principal. This is
            significantly more expensive than a reducing balance (amortizing)
            loan at the same stated rate. Always clarify which method your
            lender uses.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: LOAN AFFORDABILITY
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="loan-affordability">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            How Much Loan Can You Afford? — Affordability Guidelines
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Knowing your monthly payment is step one. Knowing whether you can
            comfortably afford it — without stretching your finances to the
            breaking point — is step two. Two frameworks help here.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                The 28/36 Rule
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                A widely used guideline for mortgage borrowers:
              </p>
              <ul className="text-gray-300 text-sm space-y-2 leading-relaxed list-disc list-inside">
                <li>
                  Monthly housing costs (mortgage + insurance + taxes) should
                  not exceed <strong className="text-white">28%</strong> of
                  gross monthly income
                </li>
                <li>
                  Total monthly debt payments (all loans combined) should not
                  exceed <strong className="text-white">36%</strong> of gross
                  monthly income
                </li>
              </ul>
              <p className="text-gray-400 text-xs mt-3 italic">
                Example: On a $5,000/month gross income, total debt should stay
                under $1,800/month.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Debt-to-Income Ratio (DTI)
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                DTI = total monthly debt payments ÷ gross monthly income
              </p>
              <ul className="text-gray-300 text-sm space-y-2 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-green-400 font-bold">Below 36%</span>
                  <span>— generally comfortable, most lenders approve</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400 font-bold">36–43%</span>
                  <span>— borderline; lender discretion varies</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">Above 43%</span>
                  <span>— high risk; many lenders will decline</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-700/50 rounded-2xl p-5 mb-6">
            <h3 className="text-base font-semibold text-blue-300 mb-2">
              Quick Affordability Check — Before You Borrow
            </h3>
            <ol className="text-gray-200 text-sm space-y-2 leading-relaxed list-decimal list-inside">
              <li>Calculate your proposed monthly payment using the formula above</li>
              <li>Add it to all existing monthly debt payments (car loan, credit card minimums, other loans)</li>
              <li>Divide that total by your gross monthly income</li>
              <li>If the result is above 0.36 (36%), reconsider the loan amount or term</li>
            </ol>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            These ratios are guidelines, not rules — your personal cash flow,
            job stability, and savings cushion all matter. But they give you
            a fast sanity check before you commit to a monthly obligation.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: CALCULATOR CTA
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="calculate-loan-payment">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Calculate Your Loan Payment Now — Free Tool
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Now that you understand the formula, the amortization mechanics, and
            what affects your total cost — check your own numbers using our free
            tool. Enter your loan amount, interest rate, and term to instantly
            see your monthly payment, total interest, and a full amortization
            schedule. No sign-up required.
          </p>

          <Link
            href="/calculators/financial/loan-calculator"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors duration-200"
          >
            Open Loan Payment Calculator →
          </Link>

          <p className="text-gray-400 text-sm mt-4">
            Free · No sign-up · Works on mobile · Metric &amp; imperial · Full
            amortization schedule included
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
            This article is based on standard financial mathematics and
            guidelines from internationally recognised financial bodies. All
            sources were verified in April 2026.
          </p>

          <ol className="space-y-4 text-sm text-gray-300 leading-relaxed list-decimal list-inside">
            <li>
              Consumer Financial Protection Bureau (CFPB).{" "}
              <em>
                What is the difference between a loan&apos;s interest rate and its
                APR?
              </em>{" "}
              Available at:{" "}
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loans-interest-rate-and-its-apr-en-135/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                consumerfinance.gov
              </a>
              . — Source for APR vs interest rate distinction.
            </li>
            <li>
              Investopedia.{" "}
              <em>Amortization: Definition, Formula, and Calculation.</em>{" "}
              Available at:{" "}
              <a
                href="https://www.investopedia.com/terms/a/amortization.asp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                investopedia.com
              </a>
              . — Source for amortization schedule explanation and formula
              derivation.
            </li>
            <li>
              Federal Reserve.{" "}
              <em>
                Consumer Handbook on Adjustable-Rate Mortgages.
              </em>{" "}
              Board of Governors of the Federal Reserve System. — Source for
              loan term and repayment structure principles.
            </li>
            <li>
              Bankrate.{" "}
              <em>Debt-to-income ratio: What is it and how to calculate it.</em>{" "}
              Available at:{" "}
              <a
                href="https://www.bankrate.com/mortgages/debt-to-income-ratio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                bankrate.com
              </a>
              . — Source for debt-to-income ratio guidelines and the 28/36 rule.
            </li>
            <li>
              Mishkin, F.S.{" "}
              <em>The Economics of Money, Banking, and Financial Markets.</em>{" "}
              12th ed. Pearson, 2018. — Foundation source for amortization
              mathematics and loan pricing principles.
            </li>
          </ol>
        </section>

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
              Content based on standard amortization mathematics, CFPB
              guidelines, and peer-reviewed financial literature. See full
              references above.
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
          The loan payment formula takes 30 seconds to run. The financial
          clarity it gives you lasts the entire life of the loan.
        </p>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}