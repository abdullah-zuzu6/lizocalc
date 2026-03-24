import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import dynamic from "next/dynamic";
import NoPrefetchLink from "@/components/NoPrefetchLink";

const AdvancedMortgageCalculator= dynamic(() => import("./clientside"), {
  ssr: false,
});
const faqData = [
  {
    question: "How do I calculate my monthly mortgage payment manually?",
    answer: "You can determine your monthly payment using the standard formula: $M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]$. In this equation, **P** represents your principal loan amount, **i** is your monthly interest rate (annual rate divided by 12), and **n** is the total number of monthly payments (e.g., 360 for a 30-year term). For a $300,000 loan at 6%, your monthly principal and interest would be $1,798.65.",
  },
  {
    question: "What is the 'Rule of 72' in mortgage and interest planning?",
    answer: "The Rule of 72 is a quick shortcut to estimate how long it takes for a value to double at a fixed interest rate. By dividing 72 by your annual interest rate, you find the approximate years. For example, if your home value appreciates at 6% annually, it would take roughly 12 years ($72 / 6 = 12$) for the property value to double, assuming consistent market growth.",
  },
  {
    question: "How does a 15-year mortgage compare to a 30-year mortgage in total cost?",
    answer: "While a 15-year mortgage has higher monthly payments, it saves massive amounts in interest. On a $200,000 loan at 5%, a 30-year term results in ~$160,000 in total interest. A 15-year term at the same rate costs only ~$84,000 in interest. By choosing the shorter term, you effectively save $76,000 and build home equity twice as fast.",
  },
  {
    question: "How much does a 1% interest rate increase change my buying power?",
    answer: "Generally, a 1% increase in mortgage rates reduces your purchasing power by about 10%. If you qualify for a $400,000 loan at 5%, your monthly payment (principal and interest) is ~$2,147. If the rate jumps to 6%, that same $2,147 payment only covers a loan of roughly $358,000. This $42,000 difference is why tracking rate trends is vital for buyers.",
  },
  {
    question: "What are the common 'hidden costs' included in a full mortgage payment?",
    answer: "A standard 'PITI' payment includes Principal, Interest, Taxes, and Insurance. Beyond the bank loan, you must factor in Property Taxes (approx. 1.2% of home value annually), Homeowners Insurance, and potentially Private Mortgage Insurance (PMI) if your down payment is less than 20%. These can add $300–$600+ to your basic monthly estimate.",
  },
  {
    question: "Does making one extra mortgage payment per year really help?",
    answer: "Yes, making just one extra full payment annually can shave 4 to 5 years off a 30-year mortgage. This works because the extra payment goes entirely toward the principal balance, reducing the amount of interest calculated in every subsequent month. It is one of the most effective ways to build wealth and reach a debt-free status earlier.",
  },
];

export const metadata: Metadata = {
 title: " Mortgage Calculator: Monthly Payments, Taxes & Extra Pay",
description: "Estimate your total home cost with our advanced mortgage calculator. Includes property taxes, HOA fees, home insurance, and an amortization schedule to see how extra payments save you interest.",
  keywords: [
    "calculate mortgage payments",
    "home loan interest tool",
    "mortgage amortization schedule",
    "piti calculator online",
    "real estate financing tool",
    "lizocalc mortgage tool",
    "house affordability calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/mortgage-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Mortgage Calculator | Precise Home Financing",
    description:
      "Planning to buy a home? Use our advanced mortgage calculator to break down your monthly costs, including interest and taxes, with a complete repayment plan.",
    url: "https://lizocalc.com/calculators/financial/mortgage-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Mortgage Calculator | LizoCalc",
    description:
      "Instantly calculate home loan payments and view your full mortgage amortization with our professional-grade financial tool.",
  },
};

export default function MortgagePage() {
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
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://lizocalc.com/calculators/financial/mortgage-calculator#breadcrumb",
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
                    name: "Mortgage Calculator",
                    item: "https://lizocalc.com/calculators/financial/mortgage-calculator",
                  },
                ],
              },
              {
  "@type": "WebPage",
  "@id": "https://lizocalc.com/calculators/financial/mortgage-calculator",
  url: "https://lizocalc.com/calculators/financial/mortgage-calculator",
  name: "Advanced Mortgage Calculator",
  description: "Use our advanced mortgage calculator to estimate monthly mortgage payments, interest, taxes, and insurance instantly.",
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
                  "https://lizocalc.com/calculators/financial/mortgage-calculator#app",
                name: "Advanced Mortgage Calculator",
                url: "https://lizocalc.com/calculators/financial/mortgage-calculator",
                description:
                  "Advanced mortgage calculator to estimate monthly payments, interest, taxes, and amortization schedule.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Mortgage Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate monthly mortgage payments",
                  "Estimate total interest",
                  "View amortization schedule",
                  "Add extra monthly payments",
                  "Calculate taxes and insurance",
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
           Mortgage Calculator: Plan Your Home Loan with Precision
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedMortgageCalculator />

        
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Mortgage Calculator</strong> — also widely known as the home loan payment calculator or monthly mortgage estimator — is one of the most essential financial tools for anyone buying, refinancing, or simply planning a home purchase. Whether you're a first-time buyer dreaming of your own place, a growing family looking to upgrade, an investor comparing properties, or a homeowner thinking about refinancing, this calculator takes the guesswork out of the biggest purchase most people ever make.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>mortgage calculator</strong> instantly shows your total monthly payment, full amortization schedule, and exact savings from extra payments. Just enter the home price, down payment, interest rate, loan term, and optional costs like taxes and insurance — and get crystal-clear results with interactive charts and year-by-year breakdowns. The tool is fully mobile-friendly, works offline after first load, remembers your last numbers (with your consent), handles large loan amounts smoothly, and never shows any ads. Perfect for quick home shopping, refinancing decisions, or long-term planning. Jump right in and try it now on our{" "}
          <NoPrefetchLink
            href="/calculators/financial/mortgage-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            mortgage calculator page
          </NoPrefetchLink>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Your Total Monthly Mortgage Payment
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Quick &amp; Easy Step-by-Step Guide
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>
                  Enter the home price and choose your down payment percentage (or dollar amount) — the calculator instantly shows the loan amount.
                </li>
                <li>
                  Add the interest rate and loan term (15, 20, or 30 years are most common).
                </li>
                <li>
                  Include property taxes, homeowners insurance, and HOA fees for your true monthly payment (PITI).
                </li>
                <li>
                  Hit calculate and instantly see your monthly payment, total interest, and full amortization schedule.
                </li>
              </ol>
              <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
                Pro tip: The tool updates live as you type, lets you compare multiple scenarios side-by-side, and gives friendly warnings if numbers look unrealistic so you can focus on finding the perfect loan.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Inputting Your Home Price and Down Payment Percentage
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Start with the full purchase price of the home. Then choose your down payment — either as a percentage (20% is classic for avoiding private mortgage insurance) or a fixed amount. The calculator instantly subtracts it and shows your exact loan amount. A higher down payment means a smaller loan, lower monthly payments, and less total interest over time.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Adjusting Interest Rates and Loan Terms for Better Accuracy
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Rates change daily, so try different values (current averages are around 6–7% for 30-year fixed). Longer terms (30 years) give lower monthly payments but more total interest. Shorter terms (15 years) cost more each month but save tens of thousands in interest. The live calculator lets you test every scenario in seconds.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Including Advanced Costs: Property Taxes, Insurance, and HOA Fees
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Your real monthly housing cost is more than just principal and interest. Add annual property taxes (divided by 12), homeowners insurance, and any HOA or condo fees. The calculator combines everything into one realistic “PITI” payment so you know exactly what you can afford before you fall in love with a house.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Visualize Your Debt with an Interactive Amortization Schedule
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Viewing Annual vs. Monthly Principal and Interest Breakdowns
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The amortization schedule shows every single payment for the entire loan — month by month and year by year. Early on, most of your payment goes to interest. Later, almost all of it pays down principal. Switch between monthly and annual views to see the big picture instantly.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Tracking Your Remaining Loan Balance Year-by-Year
          </h4>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Watch the balance drop every year. After 10 years on a 30-year loan, you might still owe 75–80% of the original amount — but the numbers change dramatically once you hit the halfway mark. This year-by-year view helps you plan major life decisions like selling or refinancing.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Monitoring Cumulative Interest Paid Over the Life of the Loan
          </h4>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            See the running total of interest paid. On a $300,000 loan at 6.5% for 30 years, you could pay over $350,000 in interest alone. The schedule makes this crystal clear and motivates smarter choices.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Using the Amortization Graph to See Your Equity Growth
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The interactive graph shows two lines: remaining loan balance dropping and your home equity growing (assuming modest home price appreciation). It’s the best visual way to understand how fast you’re building real wealth with every payment.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Save Thousands by Making Extra Monthly Payments
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Impact of Accelerated Payments on Your Loan Term
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Adding just $100–200 extra each month can shave 5–10 years off a 30-year loan. The calculator instantly shows the new payoff date and how much time you’ll gain.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How Small Extra Payments Reduce Total Interest Charges
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Every extra dollar goes straight to principal after the first payment, so it stops earning interest immediately. Small changes create huge savings over decades.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Calculating Savings with the "Extra Monthly Payment" Feature
          </h4>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Example: $300,000 loan at 6.5% for 30 years.
          </p>
          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Extra Payment</th>
                  <th className="p-4 text-left font-semibold">New Term</th>
                  <th className="p-4 text-left font-semibold">Interest Saved</th>
                  <th className="p-4 text-left font-semibold">Years Saved</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">$0</td>
                  <td className="p-4">30 years</td>
                  <td className="p-4 font-bold text-green-400">$0</td>
                  <td className="p-4">0</td>
                </tr>
                <tr>
                  <td className="p-4">$100</td>
                  <td className="p-4">26 years 3 months</td>
                  <td className="p-4 font-bold text-green-400">$48,200</td>
                  <td className="p-4">3.7</td>
                </tr>
                <tr>
                  <td className="p-4">$200</td>
                  <td className="p-4">23 years 8 months</td>
                  <td className="p-4 font-bold text-green-400">$92,800</td>
                  <td className="p-4">6.3</td>
                </tr>
                <tr>
                  <td className="p-4">$500</td>
                  <td className="p-4">18 years 9 months</td>
                  <td className="p-4 font-bold text-green-400">$172,500</td>
                  <td className="p-4">11.2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            The built-in extra payment slider updates everything instantly so you can test different amounts and see the life-changing difference.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Understanding the Mortgage Calculation Formula
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Standard Fixed-Rate Mortgage Equation
          </h3>
          <p className="text-gray-200 text-base mb-4">
            The classic formula used by banks and our calculator:
          </p>
          <p className="text-gray-200 text-base mb-6">
            <span className="font-mono text-green-300">M = P × [r(1+r)^n] / [(1+r)^n - 1]</span>
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Where M = monthly payment, P = loan principal, r = monthly interest rate (annual rate ÷ 12), n = total number of payments (years × 12). Our tool does all the heavy math for you in milliseconds.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Why Your Actual Payment Might Differ from the "P &amp; I" Estimate
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The formula above gives only principal and interest (P&amp;I). Your real payment usually includes property taxes, homeowners insurance, and sometimes mortgage insurance or HOA fees — creating the full PITI payment. Lenders also consider your debt-to-income ratio, credit score, and closing costs. That’s why our calculator includes every optional field so you get the complete picture, not just the basic estimate.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Mortgage Planning FAQ: Common Home Buying Questions
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            What is a good down payment for a $400,000 home?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            20% ($80,000) is ideal — it avoids private mortgage insurance and gives better loan rates. Even 10% ($40,000) works for many first-time buyers, but expect extra monthly costs. Use the calculator to see how different percentages change your payment.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How does a higher interest rate affect my buying power?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Every 1% increase in rate can reduce the house you can afford by roughly 10–12%. At 6% you might qualify for $400,000; at 7% the same payment might only stretch to $360,000. Test both rates in the calculator to see the real impact.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            When should I include HOA and "Other Costs" in my budget?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Always. HOA fees, flood insurance, or maintenance can add $200–600+ monthly. Include them from day one so you never get surprised by the true cost of homeownership.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Is it better to pay off a mortgage early or invest the extra cash?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            It depends on your risk tolerance and expected investment returns. If you can earn more than your mortgage rate (after taxes), investing often wins. The calculator’s extra payment feature lets you compare both strategies side-by-side.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Benefits of Using Our Advanced Finance Tools
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Compare Loans with our Interest and Payment Calculators
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Pair the mortgage calculator with our companion tools to compare fixed vs. adjustable rates, 15-year vs. 30-year loans, or refinancing options. See exactly which loan saves you the most money over time.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Secure Data Handling: How Your Functional Preferences are Saved
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Nothing is stored on our servers. Your numbers stay only in your browser (local storage with your permission) and disappear when you clear your cache. We respect your privacy completely while still letting you return later and pick up exactly where you left off.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Finance Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Pair your mortgage planning with these other free, fast calculators from our collection:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <NoPrefetchLink
                href="/calculators/financial/compound-interest-calculator"
                className="text-blue-400 hover:underline"
              >
                Compound Interest Calculator
              </NoPrefetchLink>{" "}
              — see how your down payment or extra payments can grow
            </li>
            <li>
              <NoPrefetchLink
                href="/calculators/financial/payment-calculator"
                className="text-blue-400 hover:underline"
              >
                Payment Calculator
              </NoPrefetchLink>{" "}
              — Calculate your payments 
            </li>
            
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Buying a home is exciting — but getting the numbers right is everything. Our free, accurate, and easy-to-use mortgage calculator puts you in control so you can buy confidently, save thousands, and build real wealth. Bookmark it today and run every scenario before you sign on the dotted line!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
