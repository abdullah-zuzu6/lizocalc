import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import AdvancedPaymentCalculator from './clientside'


const faqData = [
  {
    question: "How do I calculate a monthly payment manually?",
    answer: "To calculate a fixed monthly payment, use the formula: $M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]$. Here, **P** is the loan principal, **i** is the monthly interest rate (annual rate divided by 12), and **n** is the total number of months. For a $10,000 loan at 12% interest for 2 years (24 months), your payment is $10,000 [ 0.01(1.01)^{24} ] / [ (1.01)^{24} – 1 ]$, which equals $470.73.",
  },
  {
    question: "What is an amortization schedule and why does it matter?",
    answer: "An amortization schedule is a table detailing each periodic payment on a loan. In the beginning, a larger portion of your payment goes toward **Interest** because the balance is high. As you pay down the principal, the interest portion decreases, and more of your money goes toward the **Principal**. Understanding this helps you see exactly when you will own your asset outright.",
  },
  {
    question: "How much can one extra payment per year save me?",
    answer: "Making one extra payment annually significantly reduces your total interest and shortens your loan term. This is because 100% of that extra payment is applied to the principal balance. On a 30-year mortgage of $300,000 at 6%, one extra payment per year can shave roughly 4 to 5 years off the loan and save you over $60,000 in total interest charges.",
  },
  {
    question: "What is the difference between an 'Interest-Only' and a 'Principal-Plus-Interest' payment?",
    answer: "An **Interest-Only** payment covers only the cost of borrowing, meaning your loan balance never decreases. A **Principal-Plus-Interest** payment ensures that a portion of your money actually pays off the debt. While interest-only payments are lower initially, they often lead to a 'balloon payment' or significantly higher costs later when the principal repayment period begins.",
  },
  {
    question: "How do I calculate the 'Total Cost' of a loan?",
    answer: "The total cost is found by multiplying your monthly payment by the total number of months in the term. **Total Cost = (Monthly Payment × Term in Months)**. For a $20,000 auto loan with a $450 monthly payment for 60 months, you will pay back $27,000. Subtracting the original $20,000 shows that the 'cost of credit'—the total interest paid—is $7,000.",
  },
  {
    question: "Does the payment date affect how much interest I pay?",
    answer: "Yes, if your loan uses **Daily Simple Interest**. In this case, interest accrues every day based on your current balance. If you pay a few days early, less interest has built up, so more of your payment goes toward the principal. Conversely, paying late means more interest has accrued, leaving less of your payment to reduce the actual loan balance.",
  },
];

export const metadata: Metadata = {
 title: " Payment Calculator | Amortization Schedule & Loan Estimator",
description: "Calculate your monthly loan payments and view a complete amortization schedule with LizoCalc. Estimate principal and interest breakdowns for any currency and loan term.",
  keywords: [
    "monthly payment calculator",
    "loan repayment estimator",
    "calculate principal and interest",
    "debt payment schedule tool",
    "fixed rate loan calculator",
    "lizocalc payment tool",
    "loan amortization breakdown",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/financial/payment-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Payment Calculator | Accurate Repayment Tool",
    description:
      "Planning a purchase? Use our advanced payment calculator to determine your monthly budget, interest costs, and total loan value with precision.",
    url: "https://www.lizocalc.com/calculators/financial/payment-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Payment Calculator | LizoCalc",
    description:
      "Instantly calculate your monthly loan payments and view a complete amortization schedule with our professional-grade financial tool.",
  },
};

export default function PaymentPage() {
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
                  "https://www.lizocalc.com/calculators/financial/payment-calculator#breadcrumb",
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
                    name: "Payment Calculator",
                    item: "https://www.lizocalc.com/calculators/financial/payment-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/financial/payment-calculator",
                url: "https://www.lizocalc.com/calculators/financial/payment-calculator",
                name: "Advanced Payment Calculator",
                description: "Use our advanced payment calculator to estimate monthly loan payments, interest costs, and repayment schedules instantly.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://www.lizocalc.com"
                },
                "mainEntityOfPage": {
  "@type": "SoftwareApplication",
  "@id": "https://www.lizocalc.com/calculators/financial/payment-calculator#app"
}
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/financial/payment-calculator#app",
                name: "Advanced Payment Calculator",
                url: "https://www.lizocalc.com/calculators/financial/payment-calculator",
                description:
                  "Advanced payment calculator to estimate monthly payments, interest, and complete amortization schedule.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Payment Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate monthly loan payments",
                  "Estimate total interest payable",
                  "View full amortization schedule",
                  "Compare payment frequencies",
                  "Assess impact of extra principal payments",
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
  "target": ["https://www.lizocalc.com/calculators/financial/payment-calculator"]
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
              Payment Calculator: Master Your Loan Repayment Schedule
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedPaymentCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Payment Calculator</strong> — also known as the EMI calculator or monthly loan payment calculator — is one of the most essential financial tools for anyone planning a major purchase or managing debt. Whether you’re a young professional in Sahiwal, Punjab, saving for your first car or motorbike on easy installments, a family in Pakistan calculating home loan EMIs, a business owner in Lahore comparing bank financing options, or an international investor planning a mortgage anywhere in the world, knowing your exact monthly payment keeps your budget crystal clear and stress-free.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>LizoCalc Payment Calculator</strong> instantly computes your monthly installment, total interest, and full amortization schedule. Just enter loan amount, interest rate, and term — and get precise results with beautiful visuals. The tool is fully mobile-friendly, works offline after first load, remembers your last calculations (with consent), supports multiple currencies, and never shows ads. Perfect for residents comparing bike loans at local banks, Pakistani families planning house financing, or global users evaluating mortgages. Jump right in and calculate your payments instantly on our{" "}
          <Link
            href="/calculators/financial/payment-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            Payment Calculator page
          </Link>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Your Monthly Loan Payments
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Determining Total Principal and Interest with Precision
              </h3>
              <p className="text-gray-200 leading-relaxed mb-6 text-base">
                The core of any loan is knowing exactly how much you will pay back in total — not just the borrowed amount, but the interest added on top. LizoCalc uses the standard loan amortization formula to give you 100% accurate figures in seconds.
              </p>
              <p className="text-center my-6 font-mono text-xl text-green-300 bg-gray-900/70 p-5 rounded-2xl border border-gray-700">
                M = P × [r(1 + r)<sup>n</sup>] / [(1 + r)<sup>n</sup> − 1]
              </p>
              <p className="text-gray-200 text-base mb-6">
                Where <strong>M</strong> = monthly payment, <strong>P</strong> = loan principal (e.g., Rs. 500,000 for a bike ), <strong>r</strong> = monthly interest rate (annual rate ÷ 12 ÷ 100), <strong>n</strong> = total number of payments (years × 12).
              </p>
              <p className="text-gray-200 text-base">
                Example: Rs. 1,200,000 home loan at 9% for 5 years = Rs. 24,890 monthly payment. Total paid = Rs. 1,493,400 (Rs. 293,400 interest). LizoCalc shows this breakdown instantly so you never overpay.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                The Impact of Annual Interest Rates on Your Payment Amount
              </h3>
              <p className="text-gray-200 leading-relaxed mb-6 text-base">
                Even a 1% difference in interest rate can change your monthly budget by thousands of rupees — especially important in Pakistan where bank rates fluctuate between 8% and 18% depending on the loan type.
              </p>
              <div className="overflow-x-auto mt-8 mb-8">
                <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-blue-900/70">
                      <th className="p-4 text-left font-semibold">Loan Amount</th>
                      <th className="p-4 text-left font-semibold">Term</th>
                      <th className="p-4 text-left font-semibold">Rate</th>
                      <th className="p-4 text-left font-semibold">Monthly Payment</th>
                      <th className="p-4 text-left font-semibold">Total Interest</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                    <tr>
                      <td className="p-4">Rs. 800,000</td>
                      <td className="p-4">5 years</td>
                      <td className="p-4">8%</td>
                      <td className="p-4 font-bold text-green-400">Rs. 16,230</td>
                      <td className="p-4">Rs. 173,800</td>
                    </tr>
                    <tr>
                      <td className="p-4">Rs. 800,000</td>
                      <td className="p-4">5 years</td>
                      <td className="p-4">12%</td>
                      <td className="p-4 font-bold text-green-400">Rs. 17,870</td>
                      <td className="p-4">Rs. 272,200</td>
                    </tr>
                    <tr>
                      <td className="p-4">Rs. 800,000</td>
                      <td className="p-4">5 years</td>
                      <td className="p-4">18%</td>
                      <td className="p-4 font-bold text-green-400">Rs. 20,420</td>
                      <td className="p-4">Rs. 425,200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-300 italic text-base">LizoCalc updates the payment instantly as you slide the rate — helping Sahiwal and Pakistani borrowers choose the best bank offer every time.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                How Loan Terms in Years and Months Affect Your Budget
              </h3>
              <p className="text-gray-200 leading-relaxed mb-6 text-base">
                Longer loan terms lower your monthly payment but increase total interest paid. Shorter terms raise monthly EMI but save lakhs in interest. LizoCalc lets you switch between years and months effortlessly.
              </p>
              <p className="text-gray-200 text-base">
                Example: Rs. 2,500,000 car loan at 10% — 3 years = Rs. 80,650/month (total interest Rs. 407,400). Same loan for 7 years = Rs. 41,900/month but total interest jumps to Rs. 1,009,600. The tool’s real-time calculator shows exactly how changing from 60 to 84 months affects your household budget.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Key Features of the LizoCalc Payment Tool
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Multi-Currency Support for Global Financial Planning
              </h3>
              <p className="text-gray-200 text-base">
                Whether you borrow in Pakistani Rupees, US Dollars, Euros, or British Pounds, LizoCalc supports 15+ major currencies with live conversion. Perfect for overseas Pakistanis financing property back home or international students  planning education loans. Switch currencies with one tap — rates and payments update automatically.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Interactive Monthly vs. Yearly Amortization Views
              </h3>
              <p className="text-gray-200 text-base">
                Toggle between monthly and yearly views instantly. Monthly view shows every single payment; yearly view gives a high-level summary for quick budget planning. Ideal for families in Pakistan comparing 5-year bike loans versus 15-year home mortgages.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Dynamic Principal and Interest Breakdown Tables
              </h3>
              <p className="text-gray-200 text-base">
                Every row in the amortization table clearly shows how much of each payment goes to principal versus interest. Early payments are mostly interest; later ones clear principal faster. LizoCalc highlights this shift with color coding — green for principal, red for interest — making it easy to understand even for first-time borrowers.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Real-Time Remaining Balance Tracking (Sticky Header View)
              </h3>
              <p className="text-gray-200 text-base">
                As you scroll through the full schedule, a sticky header always displays your current remaining balance, total paid so far, and percentage of loan cleared. Perfect for checking “how much is left after 24 months?” while planning extra payments or refinancing.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Understanding Your Amortization Schedule
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                What is Amortization? Visualizing Debt Reduction
              </h3>
              <p className="text-gray-200 leading-relaxed mb-6 text-base">
                Amortization is the process of paying off debt with regular payments that cover both principal and interest. Each month the loan balance decreases until it reaches zero. LizoCalc generates a complete visual amortization schedule so you see exactly when you will be debt-free.
              </p>
              <p className="text-gray-200 text-base">
                Real example for a Rs. 600,000 bike loan in Sahiwal at 11% for 4 years (48 months):
              </p>
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-blue-900/70">
                      <th className="p-4 text-left">Month</th>
                      <th className="p-4 text-left">Payment</th>
                      <th className="p-4 text-left">Principal</th>
                      <th className="p-4 text-left">Interest</th>
                      <th className="p-4 text-left">Remaining</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                    <tr><td className="p-4">1</td><td className="p-4">Rs. 15,580</td><td className="p-4">Rs. 9,980</td><td className="p-4">Rs. 5,600</td><td className="p-4">Rs. 590,020</td></tr>
                    <tr><td className="p-4">24</td><td className="p-4">Rs. 15,580</td><td className="p-4">Rs. 13,450</td><td className="p-4">Rs. 2,130</td><td className="p-4">Rs. 310,000</td></tr>
                    <tr><td className="p-4">48</td><td className="p-4">Rs. 15,580</td><td className="p-4">Rs. 15,430</td><td className="p-4">Rs. 150</td><td className="p-4">Rs. 0</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Calculating the Principal-to-Interest Ratio Over Time
              </h3>
              <p className="text-gray-200 text-base">
                In the beginning, 60–70% of your EMI goes toward interest. By the end, 95%+ clears principal. LizoCalc’s dynamic pie charts and ratio bars update live so you can see exactly when the balance starts dropping faster — a powerful motivator for extra payments.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Why the Remaining Balance Drops Faster in Later Periods
              </h3>
              <p className="text-gray-200 text-base">
                Because interest is calculated on the remaining balance. As the balance shrinks, less interest accrues each month, so more of your fixed payment attacks the principal. This “snowball effect” is why paying even Rs. 1,000 extra per month in the early years can shave years off your loan and save tens of thousands of rupees.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Step-by-Step Guide for Accurate Results
          </h2>

          <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700">
            <ol className="list-decimal list-inside text-gray-200 space-y-8 text-base leading-relaxed">
              <li>
                <strong>Step 1: Entering Your Total Loan or Purchase Amount</strong><br />
                Type the exact amount you want to borrow — Rs. 450,000 for a new bike in Sahiwal or $25,000 for an overseas education loan. LizoCalc instantly validates and shows the impact on monthly payments.
              </li>
              <li>
                <strong>Step 2: Customizing the Loan Duration in Years and Months</strong><br />
                Choose 1–30 years or fine-tune down to exact months. The tool automatically converts and recalculates — perfect when banks offer 36, 48, or 60-month plans.
              </li>
              <li>
                <strong>Step 3: Inputting Your Fixed Annual Interest Rate</strong><br />
                Enter the rate your bank quoted (e.g., 9.5% for a Pakistani car loan). Toggle between fixed and reducing balance if needed. LizoCalc immediately shows your monthly EMI, total repayment, and full schedule.
              </li>
            </ol>
            <p className="text-gray-300 italic mt-8 text-base">
              Pro tip: After calculating, use the “What-If” slider to test extra monthly payments or different rates. Download the full amortization PDF with one click — ready to take to your bank in Sahiwal or anywhere else.
            </p>
          </div>
        </section>

        <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
          Whether you’re planning your first loan in Sahiwal, comparing home financing across Pakistan, or managing international debt, LizoCalc’s free Payment Calculator gives you world-class accuracy, crystal-clear amortization schedules, and total control over your financial future. Start calculating smarter today and take the guesswork out of every installment!
        </p>
      </article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}