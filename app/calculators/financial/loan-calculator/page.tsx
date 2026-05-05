import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import AdvancedLoanCalculator from "./clientside";
import Link from "next/link";

const faqData = [
  {
    question: "How do I calculate the total interest paid on a personal loan?",
    answer: "To find the total interest, use the formula: **Total Interest = (Monthly Payment × Number of Months) – Loan Principal**. For instance, if you borrow $10,000 at 7% for 3 years with a monthly payment of $308.77, you will pay back $11,115.72 in total. Subtracting the $10,000 principal reveals a total interest cost of $1,115.72.",
  },
  {
    question: "What is the difference between Interest Rate and APR?",
    answer: "The interest rate is the percentage cost of borrowing the principal. The **Annual Percentage Rate (APR)** is a broader measure that includes the interest rate plus any lender fees or closing costs. If a $5,000 loan has a 10% interest rate but $200 in origination fees, the APR would be approximately 11.4%. Always compare loans by APR for a true cost comparison.",
  },
  {
    question: "How does my credit score impact my loan interest rate?",
    answer: "Lenders use credit scores to assess risk. Generally, a 'Good' score (700+) can secure rates between 6%–12%, while a 'Fair' score (600-660) might face rates of 20% or higher. On a $15,000 loan, the difference between a 7% and 18% rate is over $4,800 in extra interest over 5 years, highlighting the value of credit health.",
  },
  {
    question: "Can I save money by paying off my loan early?",
    answer: "Yes, because interest is usually calculated on the remaining balance (daily or monthly), paying early reduces the principal faster. If you have a $20,000 loan at 8% interest and pay an extra $100 per month, you could save over $1,200 in interest and shorten a 5-year term by nearly a year. Always check for 'prepayment penalties' in your loan agreement.",
  },
  {
    question: "What is a 'Fixed' vs. 'Variable' interest rate loan?",
    answer: "A **Fixed Rate** remains the same for the entire loan term, ensuring your monthly payments never change. A **Variable Rate** is tied to an index (like the Prime Rate) and can fluctuate. While variable rates often start lower, they carry the risk of increasing your monthly payment if market interest rates rise during your repayment period.",
  },
  {
    question: "How do I calculate a loan's monthly payment manually?",
    answer: "The formula for a standard amortizing loan is $P = L [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]$. Here, **L** is the loan amount, **i** is the monthly interest rate, and **n** is the number of payments. For a $5,000 loan at 12% annual interest (0.01 monthly) over 24 months, the math is $5,000 [ 0.01(1.01)^{24} ] / [ (1.01)^{24} – 1 ]$, resulting in a $235.37 monthly payment.",
  },
];

export const metadata: Metadata = {
  title: "Loan Calculator | Amortized, Deferred & Bond Schedule",

description: "Calculate monthly payments and full amortization schedules for amortized, deferred, and bond-style loans. Customize compounding and payback frequencies for precise financial planning.",
  keywords: [
    "personal loan repayment tool",
    "calculate monthly loan payments",
    "loan amortization schedule",
    "total interest calculator",
    "debt repayment estimator",
    "lizocalc loan tool",
    "business loan calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/financial/loan-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Loan Calculator | Accurate Amortization Tool",
    description:
      "Planning a loan? Use our advanced calculator to breakdown your monthly payments, interest rates, and total cost of borrowing with precision.",
    url: "https://www.lizocalc.com/calculators/financial/loan-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Loan Calculator | LizoCalc",
    description:
      "Instantly calculate loan payments and view your complete repayment schedule with our professional-grade financial calculator.",
  },
};

export default function LoanPage() {
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
                  "https://www.lizocalc.com/calculators/financial/loan-calculator#breadcrumb",
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
                    name: "Financial",
                    item: "https://www.lizocalc.com/calculators/financial",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Loan Calculator",
                    item: "https://www.lizocalc.com/calculators/financial/loan-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/financial/loan-calculator",
                url: "https://www.lizocalc.com/calculators/financial/loan-calculator",
                name: "Advanced Loan Calculator",
                description: "Use our advanced loan calculator to estimate monthly loan payments, interest, and total repayment costs instantly.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://www.lizocalc.com"
                },
                "mainEntityOfPage": {
  "@type": "SoftwareApplication",
  "@id": "https://www.lizocalc.com/calculators/financial/loan-calculator#app"
}
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/financial/loan-calculator#app",
                name: "Advanced Loan Calculator",
                url: "https://www.lizocalc.com/calculators/financial/loan-calculator",
                description:
                  "Advanced loan calculator to estimate monthly payments, interest, and amortization schedule for various loan types.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Loan Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate monthly loan payments",
                  "Estimate total interest cost",
                  "View detailed amortization schedule",
                  "Add extra monthly payments",
                  "Compare different loan terms",
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
                "potentialAction": {
  "@type": "UseAction",
  "target": ["https://www.lizocalc.com/calculators/financial/loan-calculator"]
}
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
              Loan Calculator: Plan Your Amortized, Deferred, or Bond Payments
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedLoanCalculator />
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Loan Calculator</strong> — also widely known as the Amortization Calculator, Mortgage Payment Calculator, Loan Payment Calculator, or Debt Payoff Tool —
          is one of the most important and frequently used concepts in personal finance, banking, and everyday money management. Whether you're a high school or college student learning about borrowing, a young adult buying your first car or home, a parent planning for education or family expenses, or anyone comparing different lending offers, understanding exactly how much you'll pay each month and how much total interest you'll owe makes every financial decision clearer and smarter.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>loan calculator</strong> takes all the hard work out of the
          process. Simply choose your loan type, enter the amount and rate, set your term, and customize frequencies — and get instant monthly payments, full amortization schedules, total interest, and payoff timelines. The tool shows clean results with highlighted breakdowns, interactive charts, and (when you expand it) step-by-step math explanations. It is fully mobile-friendly, works offline after first load (progressive web app style), remembers your last calculations (with your consent), supports any amount up to millions, and never shows any ads. Perfect for homework checks, exam preparation, comparing bank offers, or planning real-life goals. Jump right in and try it now on our{" "}
          <Link
            href="/calculators/financial/loan-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            loan calculator page
          </Link>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the Advanced Loan Calculator
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step 1: Select Your Loan Type (Amortized, Deferred, or Bond)
              </h3>
              <p className="text-gray-200 text-base leading-relaxed mb-4">
                Choose the structure that matches your loan. <strong>Amortized</strong> is the most common (standard car loans, mortgages, personal loans). <strong>Deferred</strong> is perfect for student loans or interest-only periods. <strong>Bond</strong> calculates the present value when you know the final amount due.
              </p>
              <p className="text-gray-300 italic text-sm">
                Pro tip: Most everyday loans are amortized — switch types instantly to see how your payments change.
              </p>
            </div>

            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step 2: Input Your Principal Amount and Interest Rate
              </h3>
              <p className="text-gray-200 text-base leading-relaxed mb-4">
                Enter the loan amount (e.g., $25,000) and the annual interest rate (e.g., 6.75%). The calculator accepts rates up to 5 decimal places for precision and updates results instantly as you type.
              </p>
            </div>

            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step 3: Define Your Term in Years and Months
              </h3>
              <p className="text-gray-200 text-base leading-relaxed mb-4">
                Set the total length — for example, 5 years (60 months) or 30 years (360 months). You can mix years and months for total flexibility. The tool automatically calculates the exact number of payment periods.
              </p>
            </div>

            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step 4: Customize Compounding and Payback Frequencies
              </h3>
              <p className="text-gray-200 text-base leading-relaxed mb-4">
                Pick how often interest is compounded (monthly, daily, continuous) and how often you make payments (monthly, biweekly, weekly). This is where you see the real impact on your monthly payment and total cost.
              </p>
              <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
                Everything updates live — no calculate button needed. Scroll down to see your full amortization table, total interest paid, and debt-free date.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Understanding Different Loan Structures
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Amortized Loans: Paying Down Principal and Interest Together
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Each payment reduces both the principal and interest. Early payments are mostly interest; later ones are mostly principal. This is the standard structure for home mortgages and auto loans worldwide.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Deferred Loans: Calculating Growth with Delayed Payments
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Interest accrues during a grace period but payments start later. Ideal for student loans or construction loans. Our calculator shows exactly how much the balance grows before you begin paying.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Bond Calculations: Finding Initial Value Based on Due Amount
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            These calculate how much you should pay today for a bond that will be worth a fixed amount at maturity. Great for zero-coupon bonds or lump-sum future obligations.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Features of Our Professional Loan Planning Tool
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Dynamic Amortization Schedule with Detailed Breakdowns
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            See every single payment broken down into principal, interest, and remaining balance. Click any row to highlight it. Exportable as PDF or CSV for your records.
          </p>

          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Payment #</th>
                  <th className="p-4 text-left font-semibold">Amount</th>
                  <th className="p-4 text-left font-semibold">Principal</th>
                  <th className="p-4 text-left font-semibold">Interest</th>
                  <th className="p-4 text-left font-semibold">Balance</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">1</td>
                  <td className="p-4">$536.82</td>
                  <td className="p-4">$119.82</td>
                  <td className="p-4">$417.00</td>
                  <td className="p-4">$99,880.18</td>
                </tr>
                <tr>
                  <td className="p-4">2</td>
                  <td className="p-4">$536.82</td>
                  <td className="p-4">$120.32</td>
                  <td className="p-4">$416.50</td>
                  <td className="p-4">$99,759.86</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Multi-Currency Support (USD, EUR, PKR)
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Switch instantly between major currencies. All calculations, schedules, and totals update automatically so you can compare international offers easily.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Flexible Compounding Options from Daily to Continuously
          </h3>
          <p className="text-gray-200 text-base">
            Choose monthly, quarterly, daily, or true continuous compounding. See exactly how it affects your monthly payment and total interest.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Automated Payback Frequency Adjustments
          </h3>
          <p className="text-gray-200 text-base">
            Switch from monthly to biweekly payments and watch your loan finish years earlier with thousands saved in interest.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Math Behind the Calculations
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Amortization Formula: How Periodic Payments are Derived
          </h3>
          <p className="text-gray-200 text-base mb-4">
            The standard formula for fixed monthly payments on an amortized loan:
          </p>
          <h4 className="text-xl font-bold text-blue-300 mb-2">
            M = P × <span className="font-mono text-green-300">r(1 + r)^n / ((1 + r)^n − 1)</span>
          </h4>
          <p className="text-gray-200 text-base">
            where M = monthly payment, P = principal, r = monthly interest rate, n = number of payments.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Calculating Deferred Interest Using Compound Growth
          </h3>
          <p className="text-gray-200 text-base mb-4">
            During the deferral period, balance grows as:
          </p>
          <h4 className="text-xl font-bold text-blue-300 mb-2">
            Future Value = P × (1 + r)<sup>t</sup>
          </h4>
          <p className="text-gray-200 text-base">
            Example: $20,000 at 6% for 2 years deferred grows to $22,545 before payments begin.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Present Value Discounting for Bond-Style Loans
          </h3>
          <p className="text-gray-200 text-base mb-4">
            How much to pay today for a future lump sum:
          </p>
          <h4 className="text-xl font-bold text-blue-300 mb-2">
            Present Value = FV / (1 + r)<sup>n</sup>
          </h4>
          <p className="text-gray-200 text-base">
            Example: A $10,000 bond due in 10 years at 5% is worth only $6,139 today.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Benefits of Precise Loan Modeling
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Avoid Hidden Costs with Accurate Interest Projections
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            See the true total cost of borrowing before you sign. Many people are surprised to learn they pay almost as much in interest as the original loan amount on long-term mortgages.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Compare Lending Offers Across Different Compounding Schedules
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            One lender quotes 6.5% monthly, another 6.75% daily — our tool converts everything to the same language so you pick the cheapest option every time.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Visualize Your Debt-Free Date with Real-Time Results
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Change one number (extra payment, shorter term, biweekly schedule) and instantly see how many years and how many thousands of dollars you save. Perfect motivation to pay off debt faster.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Finance Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Pair your loan planning with these other free, fast calculators from our collection:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/financial/compound-interest-calculator"
                className="text-blue-400 hover:underline"
              >
                Compound Interest Calculator
              </Link>{" "}
              — see how savings grow with different compounding
            </li>
            
            <li>
              <Link
                href="/calculators/financial/interest-calculator"
                className="text-blue-400 hover:underline"
              >
                Simple Interest Calculator
              </Link>{" "}
              — quick contrast with compound loans
            </li>
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Take control of your borrowing today — our advanced loan calculator is fast, accurate, completely free, and always ready whenever you need it. Bookmark it now and make every loan decision smarter, clearer, and more confident for your financial future!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}