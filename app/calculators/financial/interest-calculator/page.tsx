import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import AdvancedInterestCalculator from './clientside'


const faqData = [
  {
    question: "How do I calculate simple interest manually?",
    answer: "Simple interest is calculated using the formula $I = P \times r \times t$. Here, **P** is the principal amount, **r** is the annual interest rate (as a decimal), and **t** is the time in years. For example, if you invest $5,000 at a 6% interest rate for 3 years, your interest earned would be $5,000 \times 0.06 \times 3 = $900.",
  },
  {
    question: "What is the compound interest formula and how does it work?",
    answer: "Compound interest is 'interest on interest.' The formula is $A = P(1 + r/n)^{nt}$, where **A** is the final balance, **n** is the number of times interest compounds per year, and **t** is the number of years. If you invest $1,000 at 5% compounded monthly ($n=12$) for 10 years, you end up with ~$1,647.01—significantly more than the $1,500 you'd get with simple interest.",
  },
  {
    question: "What is the difference between Nominal Interest Rate and Effective Annual Yield (APY)?",
    answer: "The nominal rate is the stated annual interest rate, while the **Effective Annual Yield (APY)** accounts for the effects of compounding. The more frequently interest compounds (daily vs. annually), the higher the APY. For a 10% nominal rate compounded monthly, the APY is actually 10.47%. This is the true rate of return you actually earn on an investment.",
  },
  {
    question: "How does the frequency of compounding affect my savings?",
    answer: "Compounding frequency determines how often interest is added to your account balance. Common frequencies include daily, monthly, quarterly, and annually. The more frequent the compounding, the faster your money grows. For a $10,000 investment at 5%, annual compounding yields $500 in one year, while daily compounding yields $512.67. Over decades, this small difference creates massive wealth gaps.",
  },
  {
    question: "What is the 'Rule of 72' in interest calculations?",
    answer: "The Rule of 72 is a mental shortcut to estimate how long it takes to double your money. Simply divide 72 by your annual interest rate. For example, at a 10% interest rate, your money will double in approximately 7.2 years ($72 / 10 = 7.2$). This rule helps investors quickly compare different interest-bearing assets without a complex calculator.",
  },
  {
    question: "How do taxes affect the interest I earn on my savings?",
    answer: "In most regions, interest earned is considered taxable income. To find your 'Real Return,' use the formula: **After-Tax Rate = Interest Rate \times (1 - Tax Rate)**. If you earn 5% interest but are in a 22% tax bracket, your actual return is $5\% \times 0.78 = 3.9\%$. When factoring in inflation, your 'purchasing power' growth might be even lower, which is a key consideration for long-term savers.",
  },
];

export const metadata: Metadata = {
 title: " Interest Calculator | Compare Simple & Compound Growth",
description: "Calculate interest on savings and investments with LizoCalc. Estimate compound growth, adjust for inflation and taxes, and visualize your wealth accumulation path.",
 keywords: [
    "simple interest formula tool",
    "calculate investment returns",
    "savings interest calculator",
    "accrued interest estimator",
    "financial growth calculator",
    "lizocalc interest tool",
    "yearly interest earnings",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/financial/interest-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Interest Calculator | Accurate Financial Growth",
    description:
      "Planning your savings? Use our advanced interest calculator to compare simple vs. compound growth and see exactly how your money earns over time.",
    url: "https://www.lizocalc.com/calculators/financial/interest-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Interest Calculator | LizoCalc",
    description:
      "Instantly calculate interest earned on savings or investments with our professional-grade financial calculator.",
  },
};
export default function InterestPage() {
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
                  "https://www.lizocalc.com/calculators/financial/interest-calculator#breadcrumb",
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
                    name: "Financial ",
                    item: "https://www.lizocalc.com/calculators/financial",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Interest Calculator",
                    item: "https://www.lizocalc.com/calculators/financial/interest-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/financial/interest-calculator",
                url: "https://www.lizocalc.com/calculators/financial/interest-calculator",
                name: "Advanced Interest Calculator",
                description: "Use our advanced interest calculator to estimate simple and compound interest, total growth, and investment earnings instantly.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://www.lizocalc.com"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/financial/interest-calculator#app",
                name: "Advanced Interest Calculator",
                url: "https://www.lizocalc.com/calculators/financial/interest-calculator",
                description:
                  "Advanced interest calculator to estimate simple and compound interest, growth over time, and total returns.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Interest Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate simple interest",
                  "Calculate compound interest",
                  "Estimate total investment growth",
                  "Compare different compounding frequencies",
                  "Visualize earnings over time",
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
            
            <h1 className="text-3xl md:text-4xl font-bold">
             Interest Calculator: Visualize Your Wealth Accumulation Path
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedInterestCalculator />
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Interest Calculator</strong> — your powerful compound interest and savings growth tool — is one of the most important financial resources for building wealth in today’s economy. Whether you’re a young professional in Sahiwal, Punjab, saving for your first home or a motorbike, a family in Pakistan planning for children’s education, a retiree in Lahore protecting your fixed deposits, or an investor anywhere in the world aiming for long-term financial freedom, mastering interest calculations turns regular savings into exponential growth. 
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>LizoCalc Interest Calculator</strong> removes all the guesswork. Simply enter your initial principal, monthly contributions, expected annual rate, compounding frequency, inflation rate, and tax percentage — then watch accurate projections appear instantly. The tool is fully mobile-friendly, works offline after first load, remembers your last inputs (with consent), handles large numbers without crashing, and includes stunning visualizations — all with zero ads. Perfect for  residents planning bank savings accounts, Pakistani investors comparing mutual funds, or global users forecasting retirement. Jump right in and see your money grow on our{" "}
          <Link
            href="/calculators/financial/interest-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            Interest Calculator page
          </Link>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Interest on Your Investments
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Difference Between Simple and Compound Interest
              </h3>
              <p className="text-gray-200 leading-relaxed mb-6 text-base">
                Simple interest is calculated only on the original principal amount. The formula is straightforward:
              </p>
              <p className="text-gray-200 mb-6">
                <span className="font-mono text-green-300">I = P × r × t</span> 
                <span className="text-xs text-gray-400 ml-2">(I = interest, P = principal, r = annual rate, t = time in years)</span>
              </p>
              <p className="text-gray-200 leading-relaxed mb-6 text-base">
                Compound interest, however, earns interest on both the principal <strong>and</strong> previously accumulated interest — the famous “interest on interest” effect. This is why compound interest grows exponentially and is the foundation of every serious investment strategy worldwide.
              </p>

              <div className="overflow-x-auto mt-8 mb-8">
                <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-blue-900/70">
                      <th className="p-4 text-left font-semibold">Aspect</th>
                      <th className="p-4 text-left font-semibold">Simple Interest</th>
                      <th className="p-4 text-left font-semibold">Compound Interest (Annual)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                    <tr>
                      <td className="p-4">Formula</td>
                      <td className="p-4 font-mono">P × r × t</td>
                      <td className="p-4 font-mono">P(1 + r)^t</td>
                    </tr>
                    <tr>
                      <td className="p-4">Example: Rs. 100,000 at 8% for 5 years</td>
                      <td className="p-4 font-bold text-green-400">Rs. 140,000 total</td>
                      <td className="p-4 font-bold text-green-400">Rs. 146,933 total</td>
                    </tr>
                    <tr>
                      <td className="p-4">Growth Pattern</td>
                      <td className="p-4">Linear</td>
                      <td className="p-4">Exponential</td>
                    </tr>
                    <tr>
                      <td className="p-4">Best For</td>
                      <td className="p-4">Short-term loans</td>
                      <td className="p-4">Long-term investments </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-300 italic text-base">Over 10–20 years the gap becomes massive — exactly why every Pakistani investor and global saver should always choose compounding.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Using the Compound Interest Formula for Accurate Projections
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4 text-base">
                The standard compound interest formula used by LizoCalc is:
              </p>
              <p className="text-center my-6 font-mono text-xl text-green-300 bg-gray-900/70 p-5 rounded-2xl border border-gray-700">
                A = P × (1 + r/n)<sup>(n × t)</sup>
              </p>
              <p className="text-gray-200 text-base mb-6">
                Where <strong>A</strong> = final amount, <strong>P</strong> = initial principal, <strong>r</strong> = annual interest rate (decimal), <strong>n</strong> = number of times interest is compounded per year, <strong>t</strong> = time in years.
              </p>
              <p className="text-gray-200 text-base">
                For continuous compounding (the mathematical maximum), the formula becomes:
              </p>
              <p className="font-mono text-green-300 text-center my-4">A = P × e<sup>(r × t)</sup></p>
              <p className="text-gray-200 text-base">LizoCalc automatically switches between these based on your chosen frequency, giving you precise projections whether you invest in daily-compounding digital savings apps or traditional annual fixed deposits in Pakistan.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                How Initial Investment and Contributions Drive Growth
              </h3>
              <p className="text-gray-200 leading-relaxed mb-6 text-base">
                A larger initial principal gives compounding more time to work its magic. Adding regular monthly contributions (SIP-style in Pakistan) supercharges growth because each new deposit immediately starts earning interest on interest.
              </p>
              <p className="text-gray-200 text-base">
                The full future-value formula with monthly contributions is:
              </p>
              <p className="font-mono text-green-300 text-center my-6 bg-gray-900/70 p-6 rounded-2xl border border-gray-700 text-lg">
                FV = P(1 + r/n)<sup>(n×t)</sup> + PMT × [((1 + r/n)<sup>(n×t)</sup> − 1) / (r/n)]
              </p>
              <p className="text-gray-200 text-base">Even small monthly deposits of Rs. 5,000  salary can add lakhs over 15–20 years — LizoCalc shows you exactly how much.</p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Powerful Features of the LizoCalc Interest Tool
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Adjusting for Inflation and Tax Rates in Real-Time
              </h3>
              <p className="text-gray-200 text-base mb-4">
                Inflation in Pakistan (often 8–15% in recent years) quietly erodes purchasing power. LizoCalc lets you input current inflation and instantly shows your <strong>real</strong> future value.
              </p>
              <p className="text-gray-200 text-base">
                Tax on interest income (withholding tax in Pakistan typically 15% for most citizens) is also adjustable in real-time. The tool automatically deducts tax only from the interest portion, giving you a true after-tax projection — essential for accurate planning whether you live in  anywhere else.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Flexible Compounding Frequencies: Daily to Continuously
              </h3>
              <p className="text-gray-200 text-base mb-6">
                Choose from annually, semi-annually, quarterly, monthly, daily, or continuous compounding. More frequent compounding = higher effective yield.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-blue-900/70">
                      <th className="p-4 text-left">Frequency</th>
                      <th className="p-4 text-left">Effective Annual Rate (8% nominal)</th>
                      <th className="p-4 text-left">Rs. 100,000 after 10 years</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                    <tr><td className="p-4">Annual</td><td className="p-4">8.00%</td><td className="p-4 font-bold text-green-400">Rs. 215,892</td></tr>
                    <tr><td className="p-4">Monthly</td><td className="p-4">8.30%</td><td className="p-4 font-bold text-green-400">Rs. 222,000</td></tr>
                    <tr><td className="p-4">Daily</td><td className="p-4">8.33%</td><td className="p-4 font-bold text-green-400">Rs. 222,500</td></tr>
                    <tr><td className="p-4">Continuous</td><td className="p-4">8.33%</td><td className="p-4 font-bold text-green-400">Rs. 222,554</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Visualizing Your Progress with Wealth Breakdown Pie Charts
              </h3>
              <p className="text-gray-200 text-base">
                LizoCalc instantly generates beautiful pie charts showing the exact breakdown: original principal, total contributions, gross interest earned, tax deducted, and inflation-adjusted real value. At a glance you see what percentage of your future wealth came from smart compounding versus your own deposits — incredibly motivating for long-term savers in Pakistan and worldwide.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Tracking Your Accumulation Path via Interactive Bar Graphs
              </h3>
              <p className="text-gray-200 text-base">
                Year-by-year stacked bar graphs show how your balance grows over time. Hover or tap any bar to see the split between principal, contributions, and interest earned that year. Perfect for comparing scenarios — “What if I increase monthly deposits by Rs. 2,000?” — and for presenting clear plans to your family or financial advisor.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Optimizing Your Savings Strategy
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                The Impact of Monthly vs. Annual Contributions
              </h3>
              <p className="text-gray-200 text-base">
                Contributing monthly instead of once a year allows each deposit to start compounding immediately. Example: Rs. 60,000 annual contribution vs. Rs. 5,000 monthly at 8% over 15 years. Monthly mode adds roughly Rs. 35,000–45,000 extra purely from earlier compounding. LizoCalc shows the exact difference in seconds.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                How Compounding Frequency Affects Your Final Balance
              </h3>
              <p className="text-gray-200 text-base">
                Switching from annual to monthly compounding on a Rs. 200,000 principal at 7% for 20 years increases the final amount by over Rs. 80,000. Daily or continuous compounding squeezes out every last paisa. The tool’s real-time slider lets you see the impact instantly — a game-changer for Pakistani fixed-deposit shoppers and international investors alike.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Calculating Your Inflation-Adjusted Future Purchasing Power
              </h3>
              <p className="text-gray-200 text-base mb-4">
                The real future value formula used by LizoCalc is:
              </p>
              <p className="font-mono text-green-300 text-center">Real Value = Nominal Amount / (1 + inflation rate)<sup>t</sup></p>
              <p className="text-gray-200 text-base">
                Enter Pakistan’s average inflation (or your local rate) and instantly discover whether your Rs. 5 million retirement target in 15 years will actually buy a house  or only half of one. Adjust your savings rate accordingly and stay ahead of rising costs.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Step-by-Step Calculation Guide
          </h2>

          <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700">
            <ol className="list-decimal list-inside text-gray-200 space-y-8 text-base leading-relaxed">
              <li>
                <strong>Step 1: Setting Your Initial Principal and Monthly Deposits</strong><br />
                Enter your starting amount  and monthly contribution (even Rs. 1,000 makes a difference). LizoCalc automatically calculates the future value of both the lump sum and the recurring deposits.
              </li>
              <li>
                <strong>Step 2: Choosing an Expected Annual Interest Rate</strong><br />
                Use realistic rates: 6–8% for bank FDs in Pakistan, 10–12% for equity mutual funds, or 4–6% for international bonds. The tool instantly recalculates everything as you slide the rate — perfect for scenario planning.
              </li>
              <li>
                <strong>Step 3: Factoring in Tax Withholdings on Interest Earned</strong><br />
                Input your applicable tax rate (15% withholding tax for most Pakistani citizens on bank interest). LizoCalc separates interest income, applies tax only to that portion, and shows net after-tax balance plus inflation-adjusted purchasing power in one clean view.
              </li>
            </ol>
            <p className="text-gray-300 italic mt-8 text-base">
              Pro tip: After entering all values, click “Compare Scenarios” to run side-by-side projections (monthly vs annual contributions, different rates, etc.). Save your favorite scenario with one tap — your personalized wealth roadmap is ready.
            </p>
          </div>
        </section>

        <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
          Whether you are just starting your first savings journey  or managing a portfolio worth crores, LizoCalc’s free Interest Calculator gives you world-class accuracy, beautiful visuals, and complete control — all in one place. Start calculating today and watch your money work harder for you!
        </p>
      </article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}