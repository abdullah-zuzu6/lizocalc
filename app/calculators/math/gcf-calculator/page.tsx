import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";

import GCFCalculator from "./clientside";
import Link from "next/link";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Greatest common factor (gcf) Calculator",
  description:
    "Find the GCF of two or more numbers instantly. Free calculator with factoring, prime factorization, and Euclid's algorithm examples.",
  keywords: [
    "gcf calculator",
    "greatest common factor calculator",
    "hcf calculator",
    "gcd calculator",
    "euclid's algorithm calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/gcf-calculator",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "GCF Calculator | Find the Greatest Common Factor",
    description:
      "Find the GCF of two or more numbers instantly, with factoring, prime factorization, and Euclid's algorithm examples.",
    url: "https://www.lizocalc.com/calculators/math/gcf-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GCF Calculator | Find the Greatest Common Factor",
    description:
      "Find the GCF of two or more numbers instantly, with worked examples for each method.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.lizocalc.com/#website",
      url: "https://www.lizocalc.com",
      name: "LizoCalc",
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": "https://www.lizocalc.com/#person-abdullah",
      name: "Rana Muhammad Abdullah",
      url: "https://www.linkedin.com/in/abdullahsajjad06/",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/calculators/math/gcf-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Math", item: "https://www.lizocalc.com/calculators/math" },
        { "@type": "ListItem", position: 4, name: "GCF Calculator", item: "https://www.lizocalc.com/calculators/math/gcf-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/math/gcf-calculator",
      url: "https://www.lizocalc.com/calculators/math/gcf-calculator",
      name: "GCF Calculator | Find the Greatest Common Factor",
      description:
        "Find the greatest common factor (GCF) of two or more numbers, with factoring, prime factorization, and Euclid's algorithm examples.",
      inLanguage: "en",
      datePublished: "2025-06-01",
      dateModified: "2026-09-09",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/math/gcf-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/math/gcf-calculator#app",
      name: "GCF Calculator",
      url: "https://www.lizocalc.com/calculators/math/gcf-calculator",
      description: "Find the GCF of two or more numbers, with a full factor breakdown.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
    },
  ],
};
const tocItems = [
  { id: "what-is-gcf", label: "What Is the Greatest Common Factor" },
  { id: "how-to-find", label: "How to Find the Greatest Common Factor" },
  { id: "factoring", label: "Factoring" },
  { id: "prime-factorization", label: "Prime Factorization" },
  { id: "euclids-algorithm", label: "Euclid's Algorithm" },
  { id: "where-its-used", label: "Where the GCF Comes in Handy" },
];

export default function GCFPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Script
        id="structured-data-gcf-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Greatest common factor (gcf) Calculator
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Find the GCF of two or more numbers, with the working shown for factoring, prime factorization, and Euclid's algorithm.
          </p>
          <ShareBar />
        </div>
      </section>

      <section className="px-4 py-8">
        <GCFCalculator />
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          Type two or more numbers into the calculator above and it will find their greatest common
          factor, along with the full list of factors for each number. Below, the same idea gets
          worked out by hand, three different ways.
        </p>

        <nav aria-label="Table of contents" className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-7 mb-16">
          <AuthorBio />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4">Table Of Contents</h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="flex items-center gap-2 text-blue-300 underline underline-offset-2 hover:text-blue-200 text-base">
                  <span aria-hidden="true">-&gt;</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section id="what-is-gcf" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What is the greatest common factor?
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The greatest common factor (GCF) of two or more numbers is the largest number that
            divides all of them with no remainder. Some call it the GCD, greatest common divisor.
            Others call it the HCF, highest common factor. Same number, different name depending
            on where you learned it.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Take 12 and 18. Both divide evenly by 1, 2, 3, and 6. Six is the biggest number on
            that shared list, so GCF(12, 18) = 6.
          </p>
        </section>

        <section id="how-to-find" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to find the greatest common factor
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            There is more than one way to get there. Small numbers are easy enough to factor by
            hand. Once the numbers get bigger, prime factorization or Euclid's algorithm gets you
            to the answer a lot faster than listing out every factor.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Below are all three methods, worked through on the same four number pairs, so you can
            see how each one lands on the same result.
          </p>
        </section>

        <section id="factoring" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Factoring
          </h2>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            List every number that divides your value evenly, then compare the lists across all
            your inputs. Whatever the largest shared number is, that is the GCF.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-3">
            How to find the GCF of 18 and 24 by factoring
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`Factors of 18: 1, 2, 3, 6, 9, 18
Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24
Shared factors: 1, 2, 3, 6
GCF(18, 24) = 6`}
          </pre>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Find the GCF of 24 and 36 by factoring
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24
Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36
Shared factors: 1, 2, 3, 4, 6, 12
GCF(24, 36) = 12`}
          </pre>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Find the GCF of 12 and 18 by factoring
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`Factors of 12: 1, 2, 3, 4, 6, 12
Factors of 18: 1, 2, 3, 6, 9, 18
Shared factors: 1, 2, 3, 6
GCF(12, 18) = 6`}
          </pre>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Find the GCF of 30 and 45 by factoring
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`Factors of 30: 1, 2, 3, 5, 6, 10, 15, 30
Factors of 45: 1, 3, 5, 9, 15, 45
Shared factors: 1, 3, 5, 15
GCF(30, 45) = 15`}
          </pre>
        </section>

        <section id="prime-factorization" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Prime factorization
          </h2>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            Break each number down into its prime building blocks, then multiply the primes both
            numbers share, using the lower power whenever a prime shows up in both.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-3">
            How to find the GCF of 18 and 24 by prime factorization
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`18 = 2 x 3^2
24 = 2^3 x 3
Shared primes at their lowest power: 2^1 x 3^1
GCF(18, 24) = 6`}
          </pre>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Find the GCF of 24 and 36 by prime factorization
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`24 = 2^3 x 3
36 = 2^2 x 3^2
Shared primes at their lowest power: 2^2 x 3^1
GCF(24, 36) = 12`}
          </pre>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Find the GCF of 12 and 18 by prime factorization
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`12 = 2^2 x 3
18 = 2 x 3^2
Shared primes at their lowest power: 2^1 x 3^1
GCF(12, 18) = 6`}
          </pre>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Find the GCF of 30 and 45 by prime factorization
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`30 = 2 x 3 x 5
45 = 3^2 x 5
Shared primes at their lowest power: 3^1 x 5^1
GCF(30, 45) = 15`}
          </pre>
        </section>

        <section id="euclids-algorithm" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Euclid's algorithm
          </h2>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            Euclid's algorithm skips factoring altogether. Divide the larger number by the
            smaller one, keep the remainder, then repeat with the smaller number and that
            remainder. Once the remainder hits 0, the last divisor you used is the GCF. It is the
            fastest method once the numbers get large, since it only takes a handful of steps no
            matter how big the input is.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-3">
            How to find the GCF of 18 and 24 by Euclid's algorithm
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`24 = 1 x 18 + 6
18 = 3 x 6 + 0
GCF(18, 24) = 6`}
          </pre>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Find the GCF of 24 and 36 by Euclid's algorithm
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`36 = 1 x 24 + 12
24 = 2 x 12 + 0
GCF(24, 36) = 12`}
          </pre>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Find the GCF of 12 and 18 by Euclid's algorithm
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`18 = 1 x 12 + 6
12 = 2 x 6 + 0
GCF(12, 18) = 6`}
          </pre>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Find the GCF of 30 and 45 by Euclid's algorithm
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`45 = 1 x 30 + 15
30 = 2 x 15 + 0
GCF(30, 45) = 15`}
          </pre>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Find the GCF of 182664, 154875, and 137688 by Euclid's algorithm
          </h3>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            This is where Euclid's algorithm earns its keep. Listing factors of a 6-digit number
            is not realistic by hand, but the division steps stay just as short as they were above.
          </p>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            First, find GCF(182664, 154875):
          </p>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`182664 = 1 x 154875 + 27789
154875 = 5 x 27789 + 15930
27789  = 1 x 15930 + 11859
15930  = 1 x 11859 + 4071
11859  = 2 x 4071  + 3717
4071   = 1 x 3717  + 354
3717   = 10 x 354  + 177
354    = 2 x 177   + 0
GCF(182664, 154875) = 177`}
          </pre>
          <p className="text-gray-200 leading-relaxed mb-2 mt-6 text-base">
            Then run that result against the third number, GCF(177, 137688):
          </p>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`137688 = 777 x 177 + 159
177    = 1 x 159   + 18
159    = 8 x 18    + 15
18     = 1 x 15    + 3
15     = 5 x 3     + 0
GCF(177, 137688) = 3`}
          </pre>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            So GCF(182664, 154875, 137688) = GCF(GCF(182664, 154875), 137688) = <strong>3</strong>.
          </p>
        </section>

        <section id="where-its-used" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where the GCF comes in handy
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Reduce 24/36 to lowest terms and you are dividing by the GCF, 12, to land on 2/3.
            Split 24 red marbles and 36 blue marbles into identical bags and the GCF sets the
            largest bag count again: 12 bags of 2 red and 3 blue. Anywhere you need the biggest
            common unit for cutting, grouping, or simplifying, the GCF is doing the work.
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Math Calculators"
            links={[
              { label: "LCM Calculator", href: "/calculators/math/lcm-calculator" },
              { label: "Fraction Calculator", href: "/calculators/math/fraction-calculator" },
              { label: "Binary Calculator", href: "/calculators/math/binary-calculator" },
              { label: "Date Calculator", href: "/calculators/math/date-calculator" },
            ]}
            seeAllHref="/calculators/math"
          />
        </section>
      </article>

      <Footer />
    </main>
  );
}