import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import ROICalculator from "./clientside";

const faqData = [
  {
    question: "How do I calculate the Return on Investment (ROI) manually?",
    answer: "To calculate ROI, use the formula: $ROI = [(Current Value - Cost) / Cost] \times 100$. For example, if you invest $5,000 in a business venture and later sell your stake for $6,500, your net profit is $1,500. Dividing $1,500 by your initial $5,000 cost gives a decimal of 0.30, which equals a **30% ROI**.",
  },
  {
    question: "What is the difference between ROI and Annualized ROI?",
    answer: "Standard ROI only measures the total gain, regardless of time. **Annualized ROI** accounts for the investment period to show your yearly performance. If Investment A returns 20% in 1 year and Investment B returns 20% over 5 years, Investment A is much stronger. The formula for annualized return is $[(1 + Total ROI)^{1/n} - 1] \times 100$, where **n** is the number of years.",
  },
  {
    question: "What is a 'good' ROI for a typical investment?",
    answer: "A 'good' ROI depends on the asset class and risk level. Historically, the S&P 500 (the stock market) averages an annual ROI of about **10%**. Real estate often ranges from 8%–12%, while high-risk startups may seek 100%+. Generally, any ROI that exceeds the current inflation rate and the interest rate on 'safe' government bonds is considered a positive real return.",
  },
  {
    question: "How do I calculate ROI when there are ongoing costs?",
    answer: "To find the 'True ROI,' you must include all expenses (maintenance, taxes, fees) in the cost basis. The formula becomes: **ROI = (Final Value - Initial Cost - Ongoing Expenses) / (Initial Cost + Ongoing Expenses)**. If you buy a rental property for $200,000 but spend $20,000 on repairs before selling it for $250,000, your ROI is calculated on a total cost of $220,000, resulting in a 13.6% return.",
  },
  {
    question: "Can ROI be negative, and what does it mean?",
    answer: "Yes, a negative ROI means you have lost money on the investment. If you invest $1,000 and the value drops to $800, your ROI is **-20%**. Calculating negative ROI is vital for 'Stop-Loss' planning, helping investors decide when to exit a failing position to protect their remaining capital from further devaluation.",
  },
  {
    question: "What is the limitation of using ROI as a sole metric?",
    answer: "The biggest limitation of ROI is that it ignores **Time** and **Risk**. A 50% ROI sounds excellent, but it is less impressive if it took 20 years to achieve. Additionally, ROI doesn't account for 'Opportunity Cost'—the profit you could have made by choosing a different investment. For a complete picture, investors usually pair ROI with **Internal Rate of Return (IRR)** and **Net Present Value (NPV)**.",
  },
];

export const metadata: Metadata = {
 title: "ROI Calculator: Calculate Return on Investment & Annualized Gains",
description: "Measure your investment performance with our free ROI calculator. Calculate total profit, percentage return, and annualized ROI using specific dates or time duration.",
  keywords: [
    "calculate return on investment",
    "investment profit calculator",
    "roi percentage tool",
    "business profitability calculator",
    "marketing roi estimator",
    "lizocalc investment tool",
    "annualized roi formula",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/financial/roi-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced ROI Calculator | Accurate Profitability Tool",
    description:
      "Measure your investment success. Our advanced ROI calculator provides precise results for net profit and total returns to help you make smarter financial decisions.",
    url: "https://www.lizocalc.com/calculators/financial/roi-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced ROI Calculator | LizoCalc",
    description:
      "Instantly calculate your investment ROI and net profit with our professional-grade financial calculator.",
  },
};

export default function ROIPage() {
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
                  "https://www.lizocalc.com/calculators/financial/roi-calculator#breadcrumb",
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
                    name: "ROI Calculator",
                    item: "https://www.lizocalc.com/calculators/financial/roi-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/financial/roi-calculator",
                url: "https://www.lizocalc.com/calculators/financial/roi-calculator",
                name: "Advanced ROI Calculator",
                description: "Use our advanced ROI calculator to estimate the return on investment, net profit, and investment efficiency instantly.",
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
                  "https://www.lizocalc.com/calculators/financial/roi-calculator#app",
                name: "Advanced ROI Calculator",
                url: "https://www.lizocalc.com/calculators/financial/roi-calculator",
                description:
                  "Advanced ROI calculator to estimate return on investment, total gain, and profitability percentage.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "ROI Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate percentage ROI",
                  "Estimate net profit from investment",
                  "Analyze investment gain vs cost",
                  "Compare different financial scenarios",
                  "Assess investment efficiency",
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
              ROI Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
<ROICalculator/>
      </section>

      {/* SEO Content */}
   <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>ROI Calculator</strong> — also widely known as the Return on Investment calculator or investment performance tool — is one of the most powerful financial tools for measuring exactly how much money your investments are truly making. Whether you're a student learning about personal finance for your class 12 exams, a young professional in Pakistan tracking your first stock portfolio, a business owner measuring marketing campaign success, a real estate investor in Punjab comparing rental properties, or a global investor analyzing crypto gains, this calculator turns complex numbers into clear, actionable insights.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>ROI calculator</strong> instantly computes both simple ROI and annualized returns (CAGR) using official math formulas. Enter your initial investment, final value, and timeframe — and get instant results with beautiful charts, year-by-year breakdowns, and currency support for PKR, USD, EUR, and more. The tool is fully mobile-friendly, works offline after first load, remembers your last calculations (with your consent), handles large amounts smoothly, and never shows any ads. Perfect for students, families, business owners, and serious investors worldwide. Jump right in and try it now on our{" "}
          <Link
            href="/calculators/financial/roi-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            ROI calculator page
          </Link>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Your Return on Investment (ROI)
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Quick &amp; Easy Step-by-Step Guide
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>
                  Enter your initial investment amount and the final value (or current value) of your investment.
                </li>
                <li>
                  Choose your timeframe — either specific "From" and "To" dates or a simple number of months/years.
                </li>
                <li>
                  Select your preferred currency (PKR, USD, or any other) and hit calculate for instant results.
                </li>
                <li>
                  Review the total ROI, annualized return, profit breakdown, and interactive chart.
                </li>
              </ol>
              <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
                Pro tip: The calculator updates live as you type, supports partial years for precision, and gives smart warnings if your numbers seem unrealistic so you can focus on smart investing decisions.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Step 1: Enter Your Initial Investment and Final Return
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Type the exact amount you originally put in (your cost basis) and the final amount you received or the current market value. This can be stocks sold after one year, a rental property sold after five years, or even a marketing campaign where you spent $5,000 and generated $18,000 in sales. The calculator instantly shows your profit and percentage return.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Step 2: Choose Your Timeframe: Date Range vs. Duration
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            You have two easy options: pick exact calendar dates (From and To) for precise real-world tracking, or simply enter the number of months or years your money was invested. This flexibility makes the tool perfect for both short-term traders  and long-term global investors.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Calculating ROI Using Specific 'From' and 'To' Dates
          </h4>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Select the exact purchase date and sale (or valuation) date. The calculator automatically counts the exact number of days and converts it to years for accurate annualized returns — essential when comparing investments held for 2 years and 3 months versus exactly 3 years.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Measuring Gains Based on Months or Years of Investment
          </h4>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            For quick estimates, just enter “24 months” or “5 years.” This method is perfect for planning future investments or comparing hypothetical scenarios without needing exact calendar dates.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Customizing Your Currency for Global Investment Tracking
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Choose any currency symbol — PKR for investors in Pakistan, USD for international stocks, or EUR for European real estate. All results, charts, and breakdowns instantly update in your chosen currency, making this the perfect tool for global portfolios.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Understanding Your ROI Results: Simple vs. Annualized
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Total ROI Percentage: How Much Did You Grow?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            This big, bold number shows your overall growth. A 50% ROI means your money grew by half. Simple and powerful — but it doesn’t tell you how fast it happened. That’s where annualized ROI comes in.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Why Annualized ROI is the Gold Standard for Investors
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Also called Compound Annual Growth Rate (CAGR), this number shows what your yearly return would have been if the growth happened steadily every year. It lets you fairly compare a 2-year investment with a 10-year one. Professional investors worldwide use annualized ROI as the true benchmark.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Visualizing Your Profit with the Investment Breakdown Chart
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The interactive chart instantly shows your original investment, total profit, and percentage split in a clean pie or bar format. Watch how your money grew over time with the equity growth line. It turns numbers into a story you can understand at a glance — whether you’re reviewing crypto gains or rental property returns.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Mathematics of ROI: Formulas and Examples
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Basic ROI Formula Used in Our Calculator
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Simple and powerful:
          </p>
          <p className="text-gray-200 text-base mb-6">
            <span className="font-mono text-green-300">ROI = ((Amount Returned − Amount Invested) / Amount Invested) × 100</span>
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Example: You invested Rs. 50,000 and received Rs. 75,000 back. ROI = ((75,000 − 50,000) / 50,000) × 100 = 50%. Your money grew by 50%.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How Annualized ROI (CAGR) Accounts for Time
          </h3>
          <p className="text-gray-200 text-base mb-4">
            The professional formula:
          </p>
          <p className="text-gray-200 text-base mb-6">
            <span className="font-mono text-green-300">Annualized ROI = [ (Amount Returned / Amount Invested)<sup>1/n</sup> − 1 ] × 100</span>
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            (Where n is the number of years). Same example above held for 3 years: Annualized ROI = [(75,000 / 50,000)<sup>1/3</sup> − 1] × 100 ≈ 14.47% per year. This is the number serious investors compare.
          </p>

          <div className="overflow-x-auto mt-12 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Investment</th>
                  <th className="p-4 text-left font-semibold">Initial (Rs.)</th>
                  <th className="p-4 text-left font-semibold">Final (Rs.)</th>
                  <th className="p-4 text-left font-semibold">Years</th>
                  <th className="p-4 text-left font-semibold">Total ROI</th>
                  <th className="p-4 text-left font-semibold">Annualized ROI</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Stocks</td>
                  <td className="p-4">100,000</td>
                  <td className="p-4">145,000</td>
                  <td className="p-4">2</td>
                  <td className="p-4 font-bold text-green-400">45%</td>
                  <td className="p-4 font-bold text-green-400">20.4%</td>
                </tr>
                <tr>
                  <td className="p-4">Crypto</td>
                  <td className="p-4">20,000</td>
                  <td className="p-4">50,000</td>
                  <td className="p-4">1.5</td>
                  <td className="p-4 font-bold text-green-400">150%</td>
                  <td className="p-4 font-bold text-green-400">78.3%</td>
                </tr>
                <tr>
                  <td className="p-4">Rental Property</td>
                  <td className="p-4">2,500,000</td>
                  <td className="p-4">3,200,000</td>
                  <td className="p-4">5</td>
                  <td className="p-4 font-bold text-green-400">28%</td>
                  <td className="p-4 font-bold text-green-400">5.1%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            When to Use an ROI Calculator
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Evaluating Stock Market and Crypto Performance
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Bought Bitcoin at $30,000 and sold at $65,000? Or shares of a company that doubled? Plug in the numbers and see your real annualized return. Compare different assets instantly and decide where to put your next rupee.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Calculating ROI for Real Estate and Rental Properties
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Include purchase price, sale price, rental income, maintenance, and taxes. The calculator shows true net ROI and annualized growth — the same method professional property investors in Pakistan and worldwide use before buying.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Measuring Marketing Spend and Business Capital Efficiency
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Spent Rs. 200,000 on Facebook ads and generated Rs. 800,000 in sales? ROI = 300%. Use the tool to test every campaign and double down on what actually works for your business.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Frequently Asked Questions about ROI
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            What is considered a good ROI?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            It depends on risk. Stocks often target 7–12% annualized, real estate 5–10%, and high-risk crypto can be 20%+. Anything above inflation (currently 3–7% globally) is generally positive. Use our calculator to compare against benchmarks.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Does the ROI calculator include inflation?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            No — it shows nominal returns. For real purchasing power, pair it with our free inflation calculator to see true growth after prices rise.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Can I calculate ROI for multiple investments at once?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Yes — run separate calculations and compare side-by-side, or use our portfolio tools for combined views. The live results make it easy to test “what-if” scenarios.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How accurate is the annualized ROI formula?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            100% mathematically accurate — it’s the exact CAGR formula used by banks, fund managers, and financial analysts worldwide. Our calculator follows the same standard.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Finance Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Pair your ROI analysis with these other free, fast calculators from our collection:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/finance/compound-interest-calculator"
                className="text-blue-400 hover:underline"
              >
                Compound Interest Calculator
              </Link>{" "}
              — project future growth of your investments
            </li>
           
            <li>
              <Link
                href="/calculators/financial/inflation-calculator"
                className="text-blue-400 hover:underline"
              >
                Inflation Calculator
              </Link>{" "}
              — see real purchasing power after inflation
            </li>
            <li>
              <Link
                href="/calculators/financial/mortgage-calculator"
                className="text-blue-400 hover:underline"
              >
                Mortgage Calculator
              </Link>{" "}
              — calculate home investment returns
            </li>
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Smart investing starts with knowing your numbers. Our free, accurate, and easy-to-use ROI calculator helps you measure success, compare opportunities, and make better decisions — whether you’re from anywhere in the world. Bookmark it today and start tracking every rupee you invest!
          </p>
        </section>
      </article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}