import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";

const faqData = [
  {
    question: "How do you calculate a loan payment by hand?",
    answer:
      "You use the amortization formula: M = Loan Amount × [r(1+r)^n] ÷ [(1+r)^n − 1], where r is the monthly interest rate (annual rate ÷ 12) and n is the total number of payments (years × 12). Plug in your numbers and solve. For a $20,000 car loan at 6% over 5 years, this works out to $386.66 per month.",
  },
  {
    question: "What is the formula for a loan payment?",
    answer:
      "The formula is M = Loan Amount × [r(1+r)^n] ÷ [(1+r)^n − 1]. This is the standard formula lenders use for fixed-rate, fully amortized loans — including auto loans, personal loans, and mortgages. In South Asia this same math is what produces your EMI (Equated Monthly Instalment).",
  },
  {
    question: "How is interest calculated on a loan payment?",
    answer:
      "Each month, interest is calculated by multiplying your remaining balance by the monthly interest rate. As your balance drops, the interest portion of each payment gets smaller, and more of your fixed payment goes toward paying down the loan amount — even though the total payment itself never changes.",
  },
  {
    question: "What is the difference between an amortized loan and a simple interest loan?",
    answer:
      "An amortized loan has a fixed payment where the split between interest and principal shifts every month as your balance shrinks. A simple interest loan calculates total interest up front as Loan Amount × Rate × Time, and that interest does not recalculate based on a shrinking balance the way amortized interest does.",
  },
  {
    question: "Does paying extra toward my loan reduce interest or principal?",
    answer:
      "Extra payments typically go straight toward reducing the loan amount. Because less principal is outstanding, less interest accrues on future payments — which is why consistent extra payments can shorten your loan term significantly.",
  },
  {
    question: "How do I calculate the total interest I'll pay over the life of a loan?",
    answer:
      "Multiply your monthly payment by the total number of payments, then subtract the original loan amount. For the $20,000 car loan example: ($386.66 × 60) − $20,000 = $3,199.60 in total interest.",
  },
  {
    question: "Why did my loan payment change even though I have a fixed rate?",
    answer:
      "If your interest rate is truly fixed, the principal and interest portion of your payment will not change. But if your loan includes an escrow account for property taxes and insurance, those costs get reassessed periodically and can raise or lower your total monthly bill even though the loan rate itself hasn't moved.",
  },
  {
    question: "How do I calculate a loan payment if I'm making a down payment?",
    answer:
      "Subtract your down payment from the purchase price first, then use that reduced number as the loan amount in the formula. A larger down payment means a smaller loan amount, which lowers both your monthly payment and your total interest paid.",
  },
  {
    question: "What is the difference between APR and interest rate?",
    answer:
      "The interest rate is the annual cost of borrowing the principal, expressed as a percentage. APR (Annual Percentage Rate) includes that interest rate plus lender fees like origination charges, giving a fuller picture of the loan's true cost. When comparing offers from different lenders, compare APR rather than just the headline interest rate.",
  },
];

export const metadata: Metadata = {
  title: "How to Calculate Your Loan Payment Step by Step",
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
      "The complete guide to calculating loan payments: the exact formula, a step-by-step worked example, amortization schedule, mortgage and simple-interest examples, and interest rate comparisons.",
    url: "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide",
    siteName: "LizoCalc",
    type: "article",
    images: [
      {
        url: "https://www.lizocalc.com/images/blogs/finance/loan-payment-amortization-chart.webp",
        width: 1400,
        height: 788,
        alt: "Loan amortization schedule chart showing remaining balance, principal paid, and interest paid over time",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate Your Loan Payment — Step-by-Step Formula & Examples",
    description:
      "Master the loan payment formula with worked examples for car loans, mortgages, and simple-interest loans, plus a full amortization schedule.",
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
                  "A complete, practical guide to calculating monthly loan payments: the exact amortization formula, worked examples for a car loan, a mortgage, and a simple-interest loan, a full amortization schedule, and interest rate comparisons.",
                url: "https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide",
                inLanguage: "en",
                datePublished: "2026-05-01",
                dateModified: "2026-08-08",
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
                  "calculate loan payment, monthly loan payment formula, loan EMI calculation, amortization schedule, car loan payment, mortgage payment, simple interest loan",
                articleSection: "Finance",
                wordCount: 3000,
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
                  {
                    "@type": "CreativeWork",
                    name: "Consumer Financial Protection Bureau — What is an escrow account?",
                    url: "https://www.consumerfinance.gov/ask-cfpb/what-is-an-escrow-or-impound-account-en-158/",
                    publisher: {
                      "@type": "Organization",
                      name: "Consumer Financial Protection Bureau",
                    },
                  },
                  {
                    "@type": "CreativeWork",
                    name: "Investopedia — Simple Interest",
                    url: "https://www.investopedia.com/terms/s/simple_interest.asp",
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
                  "Learn how to calculate monthly loan payments using the exact formula, with worked examples for a car loan, a mortgage, and a simple-interest loan.",
                inLanguage: "en",
                datePublished: "2026-04-30",
                dateModified: "2026-08-08",
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
                  "Loan amortization is the process of paying off a debt through fixed scheduled payments over time. Each payment covers both interest and principal, with interest making up a larger share early in the loan and principal growing larger toward the end.",
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
                  "Line chart illustrating a typical loan amortization curve — remaining balance (blue), cumulative principal paid (green), and cumulative interest paid (purple) — over the life of a loan.",
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
                    text: "Gather your loan amount, annual interest rate, and loan term in years.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Convert annual rate to monthly",
                    text: "Divide the annual interest rate by 12 to get the monthly rate. Example: 6% ÷ 12 = 0.5% = 0.005.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Convert years to months",
                    text: "Multiply the loan term in years by 12 to get the number of payments. Example: 5 years × 12 = 60 payments.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Apply the formula",
                    text: "M = Loan Amount × [r(1+r)^n] ÷ [(1+r)^n − 1]. For a $20,000 loan at 6% over 60 months: M = $386.66.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 5,
                    name: "Calculate total cost",
                    text: "Multiply your monthly payment by the number of payments to get total paid. Subtract the loan amount to find total interest. Example: $386.66 × 60 = $23,199.60. Interest = $23,199.60 − $20,000 = $3,199.60.",
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
            <span>11 min read</span>
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
            <strong>M = Loan Amount × [r(1+r)^n] ÷ [(1+r)^n − 1]</strong>. Where{" "}
            <strong>r</strong> is the monthly interest rate (annual rate ÷ 12)
            and <strong>n</strong> is the total number of monthly payments
            (years × 12). For a $20,000 car loan at 6% annual interest over 5
            years, the monthly payment is <strong>$386.66</strong>.
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
            Check the Math Before You Sign
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            You are looking at a loan offer. It could be for a car, a personal
            loan to pay off credit cards, or even a mortgage. The lender gives
            you an interest rate and a term — but they don&apos;t always tell
            you what your monthly payment will actually be. Before you sign
            anything, it&apos;s worth checking their math yourself.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            You don&apos;t need to be a finance expert to figure this out. You
            need one formula, a calculator, and about ten minutes. Below is
            the full breakdown, with real numbers.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-3">
            What Determines Your Loan Payment
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            There are three things that decide what you&apos;ll pay each month:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Factor</th>
                  <th className="p-4 text-left font-semibold">What it is</th>
                  <th className="p-4 text-left font-semibold">Effect on payment</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Loan Amount</td>
                  <td className="p-4 text-gray-300">The amount you are actually borrowing</td>
                  <td className="p-4 text-gray-300">Bigger loan → bigger payment</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Interest Rate</td>
                  <td className="p-4 text-gray-300">The percentage rate, converted into a monthly rate for the math</td>
                  <td className="p-4 text-gray-300">Higher rate → higher payment, even on the same loan amount</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Loan Term</td>
                  <td className="p-4 text-gray-300">How many months you have to pay it back</td>
                  <td className="p-4 text-gray-300">Longer term → lower payment, but more interest overall</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            Change any one of these and your payment changes with it. This is
            why two people borrowing the exact same amount can end up with
            very different monthly bills.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: THE FORMULA
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="loan-payment-formula">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            The Loan Payment Formula
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Most loans are <strong>amortized loans</strong>. Each payment
            covers a mix of interest and principal, and the payment amount
            stays the same for the life of the loan. The formula for that
            fixed payment is:
          </p>

          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-base mb-6 overflow-x-auto">
            M = Loan Amount × [ r(1 + r)^n ] ÷ [ (1 + r)^n − 1 ]
            <br />
            <br />
            <span className="text-gray-400 text-sm">
              Where:
              <br />
              M = your monthly payment
              <br />
              Loan Amount = the amount you are borrowing
              <br />
              r = monthly interest rate (annual rate ÷ 12, as a decimal)
              <br />
              n = total number of payments (loan term in years × 12)
            </span>
          </div>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            It looks intimidating the first time you see it. It isn&apos;t
            that hard once you plug in numbers — and it&apos;s the same
            formula banks and lenders use worldwide. In South Asia,
            particularly Pakistan, India, and Bangladesh, this exact
            calculation is what produces your <strong>EMI (Equated Monthly
            Instalment)</strong>. The name is different; the math is
            identical.
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            Two conversions trip people up the most: use the monthly rate
            as a decimal (<code className="bg-gray-800 px-1 rounded text-green-300">0.005</code>,
            not <code className="bg-gray-800 px-1 rounded text-green-300">0.5%</code>), and use the
            total number of <em>months</em> for n, not years.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: WORKED EXAMPLE — CAR LOAN
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="worked-example">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Worked Example — $20,000 Car Loan at 6% for 5 Years
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Let&apos;s say you are borrowing $20,000 for a car. The annual
            interest rate is 6%, and you are paying it off over 5 years. Here
            is the full calculation, step by step.
          </p>

          <div className="bg-blue-900/20 border border-blue-700 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">
              Loan Details
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-800/60 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">Loan Amount</p>
                <p className="text-white font-bold text-xl">$20,000</p>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">Annual Interest</p>
                <p className="text-white font-bold text-xl">6%</p>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">Loan Term</p>
                <p className="text-white font-bold text-xl">5 Years</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-yellow-300 mb-3">
                Step 1 — Convert the annual rate to a monthly rate
              </h3>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
                r = 6% ÷ 12 = 0.5% per month = 0.005
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-yellow-300 mb-3">
                Step 2 — Figure out the number of payments
              </h3>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
                n = 5 years × 12 months = 60 payments
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-yellow-300 mb-3">
                Step 3 — Plug everything into the formula
              </h3>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
                (1.005)^60 = 1.34885
                <br />
                <br />
                Numerator: 0.005 × 1.34885 × 20,000 = 134.885
                <br />
                Denominator: 1.34885 − 1 = 0.34885
                <br />
                <br />
                M = 134.885 ÷ 0.34885
                <br />
                M = <strong>$386.66 per month</strong>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-yellow-300 mb-3">
                Step 4 — Calculate total cost and total interest
              </h3>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
                Total paid = $386.66 × 60 = $23,199.60
                <br />
                Total interest = $23,199.60 − $20,000 = <strong>$3,199.60</strong>
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
                  <td className="p-4 font-bold text-white text-lg">$386.66</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-green-300">Total Amount Paid</td>
                  <td className="p-4 font-bold text-white">$23,199.60</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-green-300">Total Interest Paid</td>
                  <td className="p-4 font-bold text-yellow-400">$3,199.60</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-green-300">Loan Term</td>
                  <td className="p-4 text-gray-300">60 months</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            Everything else — mortgages, personal loans, any fixed-payment
            loan — uses this same formula. You just plug in different
            numbers. You don&apos;t need to run these steps by hand every
            time, though. Use our{" "}
            <Link
              href="/calculators/financial/loan-calculator"
              className="text-blue-400 hover:underline"
            >
              Loan Payment Calculator
            </Link>{" "}
            to get your result instantly, including a full amortization
            schedule.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: LOAN AMORTIZATION SCHEDULE (KEPT SECTION — DATA UPDATED)
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="amortization-schedule">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Loan Amortization Schedule — How Every Payment Breaks Down
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Your payment stays the same every month — the split between
            interest and principal does not. This is one of the most
            misunderstood parts of borrowing, so it&apos;s worth walking
            through carefully.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Each month, interest owed is calculated as:{" "}
            <strong>Remaining Balance × Monthly Interest Rate</strong>. Early
            in the loan, most of your payment goes toward interest because
            the balance is still high. In month 1 of the $20,000 car loan
            example, interest owed is 20,000 × 0.005 = $100. Your payment is
            $386.66, so $100 goes to interest and the remaining $286.66 goes
            toward the loan amount. As the balance falls each month, the
            interest charge shrinks slightly and a little more of your
            payment goes toward paying off the loan — a pattern called{" "}
            <strong>amortization</strong>.
          </p>

          {/* AMORTIZATION CHART IMAGE */}
          <figure className="my-8">
            <div className="rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/images/blogs/finance/loan-payment-amortization-chart.webp"
                alt="Illustrative loan amortization line chart showing remaining balance declining, cumulative principal paid rising, and cumulative interest paid front-loading early and flattening late in the loan term"
                title="Loan Amortization Schedule Chart — LizoCalc"
                width={1400}
                height={788}
                className="w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
            <figcaption className="mt-3 text-sm text-gray-400 text-center italic leading-relaxed">
              <strong className="text-gray-300">Figure 1:</strong> A
              representative amortization curve. The blue line shows the
              remaining loan balance falling to zero. The green line shows
              cumulative principal paid, which accelerates as the loan
              matures. The purple line shows cumulative interest paid, which
              front-loads early and flattens near the end — the same pattern
              shown in the table below for the $20,000 car loan example. —
              LizoCalc Finance Visuals, 2026.
            </figcaption>
          </figure>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Sample Amortization Table — First 6 Payments
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Based on the $20,000 car loan at 6% over 60 months ($386.66/month):
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Month</th>
                  <th className="p-4 text-left font-semibold">Payment</th>
                  <th className="p-4 text-left font-semibold">Interest Paid</th>
                  <th className="p-4 text-left font-semibold">Principal Paid</th>
                  <th className="p-4 text-left font-semibold">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-gray-300">1</td>
                  <td className="p-4">$386.66</td>
                  <td className="p-4 text-red-400">$100.00</td>
                  <td className="p-4 text-green-400 font-semibold">$286.66</td>
                  <td className="p-4">$19,713.34</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">2</td>
                  <td className="p-4">$386.66</td>
                  <td className="p-4 text-red-400">$98.57</td>
                  <td className="p-4 text-green-400 font-semibold">$288.09</td>
                  <td className="p-4">$19,425.25</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">3</td>
                  <td className="p-4">$386.66</td>
                  <td className="p-4 text-red-400">$97.13</td>
                  <td className="p-4 text-green-400 font-semibold">$289.53</td>
                  <td className="p-4">$19,135.72</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">4</td>
                  <td className="p-4">$386.66</td>
                  <td className="p-4 text-red-400">$95.68</td>
                  <td className="p-4 text-green-400 font-semibold">$290.98</td>
                  <td className="p-4">$18,844.74</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">5</td>
                  <td className="p-4">$386.66</td>
                  <td className="p-4 text-red-400">$94.22</td>
                  <td className="p-4 text-green-400 font-semibold">$292.44</td>
                  <td className="p-4">$18,552.30</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">6</td>
                  <td className="p-4">$386.66</td>
                  <td className="p-4 text-red-400">$92.76</td>
                  <td className="p-4 text-green-400 font-semibold">$293.90</td>
                  <td className="p-4">$18,258.40</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            The interest column keeps shrinking, and the principal column
            keeps growing, all the way through month 60, where the balance
            reaches zero on schedule. Most lenders will give you a full
            schedule when you close on a loan — but if you ever want to
            build your own, this is exactly how it&apos;s constructed: one
            row at a time, using the leftover balance from the row before it.
            Our{" "}
            <Link
              href="/calculators/financial/loan-calculator"
              className="text-blue-400 hover:underline"
            >
              Loan Payment Calculator
            </Link>{" "}
            builds the full table automatically.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: MORTGAGE EXAMPLE
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="mortgage-example">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Calculating Payments for a Mortgage
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Mortgages use the exact same formula — they just involve bigger
            numbers and longer terms, usually 15 or 30 years, which is 180 or
            360 payments.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Say you&apos;re borrowing $300,000 at 5.5% for 30 years. The
            monthly interest rate is 0.055 ÷ 12 = 0.00458333, and the total
            number of payments is 30 × 12 = 360. Run that through the formula
            and you get a monthly payment of about <strong>$1,703</strong>.
          </p>
          <div className="bg-yellow-900/20 border border-yellow-600/40 rounded-xl p-4 mb-4 text-sm text-yellow-200 leading-relaxed">
            Keep in mind — that $1,703 figure is principal and interest only.
            Your actual mortgage bill will likely be higher, because property
            taxes, homeowners insurance, and private mortgage insurance
            typically get added in. Most lenders roll those costs into one
            combined payment through an escrow account.
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            You can run your own numbers — whatever the loan amount, rate, or
            term — with our{" "}
            <Link
              href="/calculators/financial/mortgage-calculator"
              className="text-blue-400 hover:underline"
            >
              Mortgage Calculator
            </Link>
            .
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: SIMPLE INTEREST LOANS
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="simple-interest-loans">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            What If the Loan Isn&apos;t Amortized?
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Not every loan works this way. Some personal loans, and most
            credit cards, use <strong>simple interest</strong> instead —
            interest calculated directly on the loan amount rather than
            baked into a fixed, shrinking-balance payment schedule. The
            formula for simple interest is much shorter:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-base mb-6 overflow-x-auto">
            Total Interest = Loan Amount × Rate × Time
          </div>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            If you borrow $5,000 at 8% simple interest for 3 years: 5,000 ×
            0.08 × 3 = $1,200 in total interest, meaning you&apos;d pay back
            $6,200 altogether. That interest is often divided evenly across
            your payment schedule.
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            The key difference: with simple interest, the interest charge
            does not shrink as your balance goes down the way it does with an
            amortized loan. It&apos;s worth checking your loan agreement to
            see which type you actually have — the math, and your total cost,
            can end up quite different.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: INTEREST RATE COMPARISON (KEPT SECTION — UNCHANGED)
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
            H2: APR VS INTEREST RATE (KEPT SECTION — UNCHANGED)
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
            H2: CALCULATOR CTA
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="calculate-loan-payment">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Calculate Your Loan Payment Now — Free Tool
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Once you understand the formula, you'll probably still want a
            calculator for anything beyond a quick sanity check — and that's
            fine. The value of knowing the formula isn't that you'll use it
            every day; it's that you can spot-check a lender's numbers and
            understand exactly why your payment is what it is.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Enter your loan amount, interest rate, and term below to instantly
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
            amortization schedule included. Buying a house? Try our{" "}
            <Link
              href="/calculators/financial/mortgage-calculator"
              className="text-blue-400 hover:underline"
            >
              Mortgage Calculator
            </Link>{" "}
            instead.
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
            guidance from recognised financial bodies. All sources were
            verified in April 2026.
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
              . — Source for the APR vs interest rate distinction.
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
              . — Source for the amortization schedule explanation and
              formula derivation.
            </li>
            <li>
              Consumer Financial Protection Bureau (CFPB).{" "}
              <em>What is an escrow or impound account?</em> Available at:{" "}
              <a
                href="https://www.consumerfinance.gov/ask-cfpb/what-is-an-escrow-or-impound-account-en-158/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                consumerfinance.gov
              </a>
              . — Source for how taxes and insurance get bundled into a
              mortgage payment via escrow.
            </li>
            <li>
              Investopedia.{" "}
              <em>Simple Interest: Who Benefits, With Formula and Example.</em>{" "}
              Available at:{" "}
              <a
                href="https://www.investopedia.com/terms/s/simple_interest.asp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                investopedia.com
              </a>
              . — Source for the simple-interest formula and how it differs
              from amortized interest.
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
              guidance, and financial literature. See full references above.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-gray-400 text-right">
            <span>📅 Published: May 01, 2026</span>
            <span>🔄 Updated: Aug 08, 2026</span>
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