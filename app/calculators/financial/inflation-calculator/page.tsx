import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import AdvancedInflationCalculator from './clientside'

const faqData = [
  {
    question: "How do I calculate the impact of inflation on my money manually?",
    answer: "To find the future value of a sum adjusted for inflation, use the formula $FV = PV \times (1 + r)^n$. Here, **PV** is the present value, **r** is the annual inflation rate (as a decimal), and **n** is the number of years. For example, if inflation averages 3% per year, $1,000 today will effectively cost $1,343.92 in 10 years to maintain the same purchasing power.",
  },
  {
    question: "What is 'Purchasing Power' and why does it decrease over time?",
    answer: "Purchasing power is the amount of goods or services that one unit of currency can buy. Inflation increases the prices of goods, meaning each dollar buys a smaller percentage of a product than it did before. To calculate the 'real' value of $100 after 5 years of 4% inflation, use $PV = FV / (1 + r)^n$. That $100 would only buy what $82.19 buys today.",
  },
  {
    question: "How is the Consumer Price Index (CPI) used to measure inflation?",
    answer: "The CPI tracks the average change over time in the prices paid by consumers for a 'market basket' of goods and services (like food, housing, and fuel). Economists calculate inflation by comparing the CPI of two different periods: **Inflation Rate = [(New CPI - Old CPI) / Old CPI] x 100**. If the CPI rises from 200 to 210, the inflation rate for that period is 5%.",
  },
  {
    question: "What is the difference between 'Nominal' and 'Real' interest rates?",
    answer: "The **Nominal Rate** is the interest rate stated on your bank account or loan. The **Real Rate** is the nominal rate minus the inflation rate ($Real = Nominal - Inflation$). If your savings account earns 5% interest (nominal) but inflation is 3%, your 'real' wealth only grows by 2%. If inflation exceeds your interest rate, you are effectively losing money in terms of purchasing power.",
  },
  {
    question: "How can I protect my savings from high inflation?",
    answer: "To beat inflation, you must seek an **Internal Rate of Return (IRR)** that exceeds the annual inflation rate. Historically, keeping cash in a standard savings account (0.1% to 1%) results in a loss of value during 3% inflation. Investing in 'inflation-hedged' assets like Treasury Inflation-Protected Securities (TIPS), real estate, or a diversified stock portfolio is often necessary to grow wealth in real terms.",
  },
  {
    question: "Why do central banks target a 2% inflation rate?",
    answer: "Most central banks (like the Federal Reserve) target a modest 2% inflation rate because it encourages spending and investment rather than hoarding cash. It provides a 'safety buffer' against **Deflation** (falling prices), which can lead to economic stagnation and unemployment. A predictable, low inflation rate helps businesses and consumers plan for long-term financial stability.",
  },
];

export const metadata: Metadata = {
  title: "Inflation Calculator: Real Value of Money",
  description:
    "Use our free inflation calculator to see how the purchasing power of your money has changed. Calculate cumulative inflation and equivalent values using official CPI data",
  keywords: [
    "historical inflation calculator",
    "purchasing power of the dollar",
    "calculate money value over time",
    "cpi inflation tool",
    "cost of living adjustment",
    "lizocalc inflation tool",
    "future value of money inflation",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/inflation-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Inflation Calculator | Historical Price Tool",
    description:
      "Understand the impact of inflation on your savings. Our advanced tool calculates price changes and historical purchasing power with precision.",
    url: "https://lizocalc.com/calculators/financial/inflation-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Inflation Calculator | LizoCalc",
    description:
      "Instantly track how inflation affects the value of your money from the past to the present day.",
  },
};

export default function InflationPage() {
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
                  "https://lizocalc.com/calculators/financial/inflation-calculator#breadcrumb",
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
                    name: "Financial ",
                    item: "https://lizocalc.com/calculators/financial",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Inflation Calculator",
                    item: "https://lizocalc.com/calculators/financial/inflation-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/financial/inflation-calculator",
                url: "https://lizocalc.com/calculators/financial/inflation-calculator",
                name: "Advanced Inflation Calculator",
                description: "Use our advanced inflation calculator to estimate the change in purchasing power, historical inflation rates, and future value of money instantly.",
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
                  "https://lizocalc.com/calculators/financial/inflation-calculator#app",
                name: "Advanced Inflation Calculator",
                url: "https://lizocalc.com/calculators/financial/inflation-calculator",
                description:
                  "Advanced inflation calculator to estimate changes in purchasing power and historical price trends.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Inflation Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate inflation-adjusted value",
                  "Estimate historical purchasing power",
                  "Compare costs across different years",
                  "Analyze CPI-based data",
                  "Visualize inflation trends",
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
            
            <h1 className="text-3xl md:text-4xl font-bold">
            Inflation Calculator: Calculate the Purchasing Power of Your Money
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedInflationCalculator />
      </section>

      {/* SEO Content */}
    <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Inflation Calculator</strong> is one of the most useful money tools you can have. It shows exactly how much buying power your cash has lost — or will lose — over time because of rising prices. Whether you're a student learning economics, a young professional saving for your first home, a parent planning for kids' education, or someone building retirement funds, understanding inflation helps you make smarter decisions with your money.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our free, no-sign-up inflation calculator makes it simple and fast. Pick your currency symbol, type in any amount and two dates, and instantly see the real value adjusted for inflation. You get the updated amount, the total percentage change, and a clear breakdown — all in seconds. The tool works great on phones and tablets, loads offline after the first visit, saves your recent calculations if you allow it, handles big numbers easily, and has zero ads. Ideal for school projects, family budgeting, retirement planning, or just satisfying your curiosity about money over time. Try it right now on our{" "}
          <Link
            href="/calculators/financial/inflation-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            inflation calculator page
          </Link>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate the Real Value of Money Over Time
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                A Step-by-Step Guide to Using the Calculator
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>
                  Choose the currency symbol you normally use from the dropdown — it makes every number feel familiar and easy to read.
                </li>
                <li>
                  Enter the original amount and pick the start date and end date. You can go back as far as 1913 or look ahead to 2026 projections.
                </li>
                <li>
                  See the result instantly: the inflation-adjusted value, the total percentage increase in prices, and a simple year-by-year explanation.
                </li>
              </ol>
              <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
                Quick tip: Just start typing and the calculator updates live. It blocks wrong dates, warns you about very long periods, and keeps everything clear so you can focus on the numbers that matter to you.
              </p>
            </div>
          </div>

          <h4 className="text-xl font-bold text-blue-300 mt-10 mb-3">
            Step 1: Select Your Local Currency Symbol
          </h4>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Pick the symbol that matches the money you use every day. Whether it's dollars, euros, pounds, or any other currency, all results will appear with that symbol. This small choice makes the whole experience feel natural and much easier to understand.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Step 2: Enter the Base Amount and Historical Dates
          </h4>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Type any amount — for example, 1,000 or 100,000 — then choose the starting year (or month) and the ending year (or month). You can compare prices from 100 years ago, last decade, or even project a few years into the future.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Step 3: Analyze Cumulative Inflation Percentages
          </h4>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Look at the main result: it shows exactly what your original amount is worth in today's (or future) money, plus the total percentage prices have risen. Scroll down to see a breakdown, average yearly rates, and how much buying power has changed. This is the part that really opens your eyes.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Understanding the CPI-Based Inflation Formula
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            How Our Calculator Uses the Consumer Price Index (CPI)
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The Consumer Price Index (CPI) tracks the average price changes of everyday goods and services — food, housing, transport, healthcare, clothing, and more. Our calculator uses the official U.S. CPI data from the Bureau of Labor Statistics because it's the most complete, consistent, and widely trusted long-term record available worldwide. It covers monthly data from 1913 to the present and includes reliable projections up to 2026.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            The Mathematical Formula Behind Inflation Adjustments
          </h3>
          <p className="text-gray-200 text-base mb-4">
            The calculation is straightforward:
          </p>
          <p className="text-gray-200 text-base mb-6">
            <span className="font-mono text-green-300">Adjusted Value = Original Amount × (CPI₂ / CPI₁)</span>
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            CPI₁ is the index number for the starting year, CPI₂ is for the ending year. The result tells you how much money you would need at the later date to buy the same things you could buy at the earlier date. The cumulative inflation percentage is simply <span className="font-mono text-green-300">(CPI₂ / CPI₁ - 1) × 100</span>.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Why We Include Data from 1913 to 2026 Projections
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Reliable CPI records began in 1913, giving more than 110 years of accurate price history — perfect for seeing long-term trends. We also include projections to 2026 based on central bank forecasts and economist consensus (around 2–3% annual growth in recent years). This lets you look both backward and forward so you can plan with real numbers instead of guesses.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Practical Examples: What Was 100 Worth in the Past?
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Comparing Purchasing Power: 1913 vs. Today
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Using real CPI values: 1913 annual CPI ≈ 9.9, recent annual CPI ≈ 317.7.
          </p>
          <p className="text-gray-200 text-base mb-6">
            Adjusted Value = 100 × (317.7 / 9.9) ≈ 100 × 32.1 = <strong>3,210</strong>
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            In other words, 100 units of money in 1913 had the same buying power as about 3,210 units today. Prices have risen over 3,100% in that time — a clear picture of how inflation changes everything over a lifetime.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How 2026 Projections Affect Your Future Savings
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            With 2026 CPI projected around 325–330, that same 100 from 1913 would be worth roughly 3,280–3,330 in 2026 money. More practically: If you have 10,000 saved today, and prices rise 2.5–3% per year, you'll need about 10,250–10,300 next year for the same lifestyle. The calculator shows these future numbers right away so you can adjust your saving plan early.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Calculating the Cost of Living Adjustments (COLA)
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Many pensions, salaries, and benefits increase each year using a similar formula. Example: A monthly payment of 2,000 from 2020 (CPI ≈ 258.8) adjusted to today (CPI ≈ 317.7):
          </p>
          <p className="text-gray-200 text-base mb-6">
            New Amount = 2,000 × (317.7 / 258.8) ≈ 2,000 × 1.228 ≈ <strong>2,456</strong>
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            This kind of adjustment keeps income in line with rising costs. Use the calculator to check if your pay, allowance, or pension is keeping up — or to plan fair increases.
          </p>

          <div className="overflow-x-auto mt-12 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Year</th>
                  <th className="p-4 text-left font-semibold">CPI (approx.)</th>
                  <th className="p-4 text-left font-semibold">What 100 Units Bought Then Is Worth Today</th>
                  <th className="p-4 text-left font-semibold">Total Price Increase Since 1913</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">1913</td>
                  <td className="p-4">9.9</td>
                  <td className="p-4 font-bold text-green-400">~3,210</td>
                  <td className="p-4">~3,110%</td>
                </tr>
                <tr>
                  <td className="p-4">1950</td>
                  <td className="p-4">24.1</td>
                  <td className="p-4 font-bold text-green-400">~1,320</td>
                  <td className="p-4">~1,220%</td>
                </tr>
                <tr>
                  <td className="p-4">2000</td>
                  <td className="p-4">172.2</td>
                  <td className="p-4 font-bold text-green-400">~185</td>
                  <td className="p-4">~85%</td>
                </tr>
                <tr>
                  <td className="p-4">Today</td>
                  <td className="p-4">317.7</td>
                  <td className="p-4 font-bold text-green-400">100</td>
                  <td className="p-4">—</td>
                </tr>
                <tr>
                  <td className="p-4">2026 (proj.)</td>
                  <td className="p-4">~325–330</td>
                  <td className="p-4 font-bold text-green-400">~96–97 (future equivalent)</td>
                  <td className="p-4">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why You Should Track Inflation Impact
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Hidden Erosion of Cash Savings
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Money that sits still loses value quietly every year. Even moderate inflation of 2–4% halves real purchasing power in 18–35 years. Tracking inflation shows you exactly how much extra you need to save just to stay even.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Planning for Retirement with Inflation-Adjusted Goals
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            If you need 3,000 per month to live comfortably now, in 20 years at 3% average inflation you'll actually need around 5,400 per month for the same lifestyle. The calculator helps you set realistic targets and adjust monthly savings so your future self isn't caught short.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How Inflation Influences Investment ROI and Compound Interest
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Real return = your investment gain minus inflation. A 7% return with 3% inflation gives only 4% real growth. Use this calculator together with a compound interest tool to see your true wealth growth — and decide whether stocks, bonds, real estate, or other options make sense for beating inflation.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Finance Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Combine inflation tracking with these other free calculators:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/financial/compound-interest-calculator"
                className="text-blue-400 hover:underline"
              >
                Compound Interest Calculator
              </Link>{" "}
              — watch real growth after inflation
            </li>
            
           
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Inflation quietly changes the value of money every single day. With this simple, accurate, and completely free inflation calculator you can see the real picture, plan better, and protect your financial future. Bookmark it, use it often, and stay one step ahead!
          </p>
        </section>
      </article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}