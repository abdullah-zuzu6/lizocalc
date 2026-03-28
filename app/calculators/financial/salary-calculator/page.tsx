import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import AdvancedSalaryCalculator from './clientside'
import Link from "next/link";

const faqData = [
  {
    question: "How do I calculate my net 'take-home' pay from my gross salary?",
    answer: "Your net pay is calculated using the formula: **Net Pay = Gross Salary - (Taxes + Mandatory Deductions + Voluntary Contributions)**. Mandatory deductions typically include Federal Income Tax, Social Security (6.2%), and Medicare (1.45%). For example, if your gross monthly salary is $5,000 and your total effective tax rate is 22%, your estimated take-home pay would be $3,900.",
  },
  {
    question: "How do I convert my hourly wage to an annual salary?",
    answer: "To find your annual salary, use the formula: **Annual Salary = Hourly Rate × Hours per Week × 52 Weeks**. If you work a standard 40-hour week at $25 per hour, your calculation is $25 \times 40 \times 52 = $52,000 per year. This assumes you are paid for every week of the year, including any paid time off (PTO).",
  },
  {
    question: "What is the difference between Gross Pay and Net Pay?",
    answer: "Gross Pay is the total amount of money you earn before any deductions are taken out. **Net Pay**, often called 'take-home pay,' is the actual amount that hits your bank account after taxes, health insurance premiums, and retirement contributions (like a 401k) have been subtracted. Understanding this difference is critical for creating an accurate monthly household budget.",
  },
  {
    question: "How does an 'Exempt' vs. 'Non-Exempt' status affect my salary?",
    answer: "Non-exempt employees are entitled to **Overtime Pay** (usually 1.5x the hourly rate) for any hours worked over 40 in a week. Exempt employees are paid a set salary regardless of how many hours they work and are generally not eligible for overtime. If a non-exempt worker earning $20/hr works 45 hours, they earn $(40 \times 20) + (5 \times 30) = $950 for that week.",
  },
  {
    question: "How many working hours are in a typical year?",
    answer: "A standard full-time work year consists of **2,080 hours**. This is calculated by multiplying 40 hours per week by 52 weeks ($40 \times 52 = 2,080$). When calculating your 'effective' hourly rate from a salary, remember to subtract any unpaid holidays or leave. For a $60,000 salary, the base hourly rate is $60,000 / 2,080 \approx $28.85 per hour.",
  },
  {
    question: "How do pre-tax contributions like a 401(k) affect my taxes?",
    answer: "Pre-tax contributions reduce your **Taxable Income**. If you earn $4,000 a month and contribute $400 to a traditional 401(k), the government only calculates your income tax based on $3,600. This effectively lowers your immediate tax bill while allowing your retirement savings to grow. Use the formula: **Taxable Income = Gross Pay - Pre-tax Deductions** to see your new tax base.",
  },
];

export const metadata: Metadata = {
  title: "Salary Calculator | Convert Hourly to Annual & Adjusted Pay",

description: "Easily convert your pay between hourly, monthly, and annual rates. Our salary calculator accounts for vacation days and holidays to show your true adjusted income.",
  keywords: [
    "salary after tax calculator",
    "calculate net take home pay",
    "annual to hourly salary tool",
    "payroll tax estimator",
    "income tax breakdown calculator",
    "lizocalc salary tool",
    "gross to net pay calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/financial/salary-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Salary Calculator | Accurate Income Tool",
    description:
      "Find out exactly how much you'll take home. Our advanced salary calculator provides a clear breakdown of taxes and deductions for better financial planning.",
    url: "https://www.lizocalc.com/calculators/financial/salary-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Salary Calculator | LizoCalc",
    description:
      "Instantly calculate your net pay and tax deductions with our professional-grade salary and income calculator.",
  },
};

export default function SalaryPage() {
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
                  "https://www.lizocalc.com/calculators/financial/salary-calculator#breadcrumb",
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
                    name: "Financial Calculators",
                    item: "https://www.lizocalc.com/calculators/financial",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Salary Calculator",
                    item: "https://www.lizocalc.com/calculators/financial/salary-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/financial/salary-calculator",
                url: "https://www.lizocalc.com/calculators/financial/salary-calculator",
                name: "Advanced Salary Calculator",
                description: "Use our advanced salary calculator to estimate your net take-home pay after taxes, deductions, and bonuses instantly.",
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
                  "https://www.lizocalc.com/calculators/financial/salary-calculator#app",
                name: "Advanced Salary Calculator",
                url: "https://www.lizocalc.com/calculators/financial/salary-calculator",
                description:
                  "Advanced salary calculator to estimate net pay, tax impact, and annual take-home income.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Salary Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate net take-home pay",
                  "Estimate federal and state tax impact",
                  "Incorporate annual bonuses",
                  "Calculate pay periods (monthly, bi-weekly)",
                  "Factor in pre-tax deductions",
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
             Salary Calculator: Convert Your Hourly, Monthly, and Annual Pay
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedSalaryCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Salary Calculator</strong> — also widely known as the Take-Home Pay Calculator, Hourly Wage Converter, Annual Income Tool, or Adjusted Salary Estimator —
          is one of the most important and frequently used concepts in personal finance, career planning, and everyday money management. Whether you're a high school or college student figuring out your first part-time job, a young professional negotiating a raise, a parent balancing family budgets, or anyone comparing job offers across countries, understanding your true take-home pay — after accounting for hours worked, vacation, and holidays — helps you make smarter decisions about your time and money.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>salary calculator</strong> takes all the guesswork out of the
          process. Simply enter your base pay, choose your pay period, set your weekly hours, add paid time off, and instantly see unadjusted vs. adjusted figures, true hourly rates, and projections for every pay frequency. The tool shows clean results with highlighted breakdowns, interactive charts, and (when you expand it) step-by-step explanations using real math. It is fully mobile-friendly, works offline after first load (progressive web app style), remembers your last calculations (with your consent), supports any amount up to millions, and never shows any ads. Perfect for homework checks, exam preparation, comparing job offers worldwide, or planning your financial future. Jump right in and try it now on our{" "}
          <Link
            href="/calculators/financial/salary-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            salary calculator page
          </Link>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Your Take-Home Salary
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step 1: Input Your Base Pay and Select a Pay Period
              </h3>
              <p className="text-gray-200 text-base leading-relaxed mb-4">
                Type your gross salary — for example $65,000 per year, €4,200 monthly, or £3,500 monthly. Then choose the pay period: Annual, Monthly, Bi-weekly, Weekly, or Hourly. The calculator instantly converts everything and shows live previews.
              </p>
              <p className="text-gray-300 italic text-sm">
                Pro tip: Enter the exact figure from your offer letter — even small differences add up over years.
              </p>
            </div>

            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step 2: Set Your Weekly Work Hours and Days
              </h3>
              <p className="text-gray-200 text-base leading-relaxed mb-4">
                Tell us how many hours you work per week (standard 40) and how many days (usually 5). This lets the tool calculate your true hourly rate and daily earnings accurately.
              </p>
            </div>

            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step 3: Account for Paid Time Off (Vacation &amp; Holidays)
              </h3>
              <p className="text-gray-200 text-base leading-relaxed mb-4">
                Add your paid vacation days (e.g., 15) and paid holidays (e.g., 10). The calculator automatically adjusts your “true” hourly rate and shows how much more you actually earn per hour worked.
              </p>
            </div>

            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step 4: Compare Unadjusted vs. Adjusted Salary Results
              </h3>
              <p className="text-gray-200 text-base leading-relaxed">
                Results appear instantly in big, clear numbers:
                <br />
                • Unadjusted gross figures
                <br />
                • Adjusted take-home salary (real earnings after time off)
                <br />
                • True hourly rate
                <br />
                • Projections for every pay frequency
              </p>
              <p className="text-gray-300 italic mt-6 text-base">
                Everything updates live as you type. Scroll down for detailed breakdowns, formulas, and comparison tables.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Key Features of Our Professional Income Tool
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Multi-Currency Support for Global Salary Comparison
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Switch instantly between USD, EUR, GBP, CAD, AUD, and more. All calculations update automatically so you can compare job offers from different countries fairly.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Smart Adjustment for Holidays and Vacation Time
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Most calculators ignore paid time off. Ours automatically reduces working days and shows your real earning power — the number that actually matters for budgeting.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Detailed Frequency Breakdowns (Bi-weekly, Semi-monthly, and Quarterly)
          </h3>
          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Frequency</th>
                  <th className="p-4 text-left font-semibold">Unadjusted Pay</th>
                  <th className="p-4 text-left font-semibold">Adjusted Pay</th>
                  <th className="p-4 text-left font-semibold">Example ($65,000 Annual)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Bi-weekly</td>
                  <td className="p-4">$2,500.00</td>
                  <td className="p-4">$2,596.15</td>
                  <td className="p-4 font-bold text-green-400">26 pays/year</td>
                </tr>
                <tr>
                  <td className="p-4">Semi-monthly</td>
                  <td className="p-4">$2,708.33</td>
                  <td className="p-4">$2,812.50</td>
                  <td className="p-4 font-bold text-green-400">24 pays/year</td>
                </tr>
                <tr>
                  <td className="p-4">Quarterly</td>
                  <td className="p-4">$16,250.00</td>
                  <td className="p-4">$16,875.00</td>
                  <td className="p-4 font-bold text-green-400">4 pays/year</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Real-Time Income Projections Based on Custom Work Schedules
          </h3>
          <p className="text-gray-200 text-base">
            Work 37.5 hours? 4-day week? 6-day week? Change any number and watch every projection update instantly — perfect for freelancers, shift workers, and remote professionals.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Understanding Adjusted vs. Unadjusted Salary
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            What is "Unadjusted Salary" in Your Projections?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            This is the raw gross amount before any time-off adjustments — the number most employers quote. It assumes you work every possible day of the year.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How Vacation and Holidays Impact Your "True" Hourly Rate
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Paid time off means fewer actual working hours, so your real hourly rate is higher than the simple division suggests. Example: A $65,000 salary with 25 paid days off becomes worth $32.05/hour instead of $31.25/hour.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            The 260-Day Work Year: Our Calculation Logic Explained
          </h3>
          <p className="text-gray-200 text-base">
            Standard full-time schedule: 52 weeks × 5 days = 260 working days per year (before subtracting holidays). We use this proven benchmark so your adjusted figures are realistic and comparable worldwide.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Salary Conversion Formulas &amp; Examples
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            How to Convert Monthly Salary to Hourly Pay
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Simple unadjusted formula:
          </p>
          <h4 className="text-xl font-bold text-blue-300 mb-2">
            Hourly = (Monthly × 12) / (52 × Weekly Hours)
          </h4>
          <p className="text-gray-200 text-base">
            Example: €4,000 monthly at 40 hours/week = €23.08/hour unadjusted.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            The Formula for Annual Adjusted Income
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Adjusted Annual = Base Annual × (Total Possible Days / Actual Working Days)
          </p>
          <p className="text-gray-200 text-base">
            Where Actual Working Days = 260 − Vacation Days − Holidays. This shows your real earning power.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Calculating Bi-Weekly vs. Semi-Monthly Pay Periods
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Bi-weekly (26 pays/year): Annual ÷ 26<br />
            Semi-monthly (24 pays/year): Annual ÷ 24
          </p>
          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Base Annual</th>
                  <th className="p-4 text-left font-semibold">Bi-weekly Pay</th>
                  <th className="p-4 text-left font-semibold">Semi-monthly Pay</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">$65,000</td>
                  <td className="p-4">$2,500.00</td>
                  <td className="p-4">$2,708.33</td>
                </tr>
                <tr>
                  <td className="p-4">$78,000</td>
                  <td className="p-4">$3,000.00</td>
                  <td className="p-4">$3,250.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Finance Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Pair your salary planning with these other free, fast calculators from our collection:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/financial/loan-calculator"
                className="text-blue-400 hover:underline"
              >
                Loan Calculator
              </Link>{" "}
              — see monthly payments and total interest on loans
            </li>
            <li>
              <Link
                href="/calculators/financial/compound-interest-calculator"
                className="text-blue-400 hover:underline"
              >
                Compound Interest Calculator
              </Link>{" "}
              — watch your savings grow with different compounding
            </li>
            
            <li>
              <Link
                href="/calculators/financial/roi-calculator"
                className="text-blue-400 hover:underline"
              >
                Investment Return Calculator
              </Link>{" "}
              — project growth of stocks and funds
            </li>
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Take control of your income today — our salary calculator is fast, accurate, completely free, and always ready whenever you need it. Bookmark it now and make every job offer, raise, or career move smarter and more confident for your financial future!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}