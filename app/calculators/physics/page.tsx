import type { Metadata } from "next";
import Script from "next/script";
import PhysicsCalculators from "./OtherCalculators";

export const metadata: Metadata = {
  title: "4+ Physics Calculators | Density, Mass, Speed etc",
  description:
    "Free online physics calculators for density, mass, speed, and weight. Solve ρ = m/V, W = mg, and average-speed problems with clear units and real examples.",

  keywords: [
    "physics calculators",
    "density calculator",
    "mass calculator",
    "speed calculator",
    "weight calculator",
    "mass vs weight",
    "average speed calculator",
    "density formula",
    "weight on moon calculator",
    "physics tools",
    "g/cm3 to kg/m3",
    "force mass acceleration",
  ],

  openGraph: {
    title: "Physics Calculators | Density, Mass, Speed & Weight",
    description:
      "Free density, mass, speed, and weight calculators built on standard physics formulas. Clear units, worked examples, and FAQs.",
    url: "https://www.lizocalc.com/calculators/physics",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Physics Calculators | Density, Mass, Speed & Weight",
    description:
      "Free online density, mass, speed, and weight calculators by LizoCalc.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/physics",
  },

  category: "Physics",
  applicationName: "LizoCalc",
  authors: [{ name: "LizoCalc" }],
};

const SITE_URL = "https://www.lizocalc.com";
const PAGE_URL = `${SITE_URL}/calculators/physics`;

// ---------- JSON-LD SCHEMAS ----------

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: {
        "@type": "WebPage",
        "@id": SITE_URL,
        name: "Home",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculators",
      item: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/calculators`,
        name: "Calculators",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Physics Calculators",
      item: {
        "@type": "WebPage",
        "@id": PAGE_URL,
        name: "Physics Calculators",
      },
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between mass and weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mass is the amount of matter in an object and is measured in kilograms. Weight is the gravitational force acting on that mass (W = mg) and is measured in newtons. Your mass stays the same on the Moon; your weight does not.",
      },
    },
    {
      "@type": "Question",
      name: "How do you calculate density?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Density equals mass divided by volume (ρ = m / V). Make sure mass and volume use consistent units — for example grams and cubic centimeters, or kilograms and cubic meters.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my density value different from the textbook table?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common reasons are temperature differences, impurities in the sample, measurement error in volume, or mixed units. Textbook values are usually given at a standard temperature (often 20 °C).",
      },
    },
    {
      "@type": "Question",
      name: "How much would I weigh on the Moon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Roughly one-sixth of your Earth weight, because the Moon’s surface gravity is about 1.62 m/s² compared with Earth’s 9.81 m/s². Enter your mass into the Weight Calculator and select the Moon to see the exact number.",
      },
    },
    {
      "@type": "Question",
      name: "Is average speed the same as velocity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Average speed is a scalar (distance over time). Velocity is a vector and includes direction. The Speed Calculator on this page computes average speed.",
      },
    },
    {
      "@type": "Question",
      name: "What value of g should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most introductory courses accept 9.8 m/s² or 9.81 m/s². Some problems simplify to 10 m/s². Always check what your textbook or instructor specifies.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these calculators for lab reports?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They are excellent for checking arithmetic and units, but a formal lab report still needs your measured data, uncertainty analysis, and the derivation or method you used. Do not submit calculator output as a substitute for your own work.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert g/cm³ to kg/m³?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Multiply by 1000. For example, the density of water is 1 g/cm³, which equals 1000 kg/m³.",
      },
    },
    {
      "@type": "Question",
      name: "Does mass change with location?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Mass is independent of gravity. Only weight changes when you move to a different planet or moon.",
      },
    },
    {
      "@type": "Question",
      name: "What is specific gravity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Specific gravity is the ratio of a substance’s density to the density of water (usually at 4 °C). It is a dimensionless number and is often used in material identification.",
      },
    },
    {
      "@type": "Question",
      name: "Why do two speed calculators give slightly different answers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually a difference in rounding, unit conversion, or whether the tool treats the motion as constant speed versus average speed over a changing path. Confirm both tools are solving the same form of the equation.",
      },
    },
    {
      "@type": "Question",
      name: "Can density be used to identify an unknown material?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, within limits. Measure mass and volume, compute density, then compare with a reliable density table. Many materials have overlapping ranges, so density alone is rarely definitive without other tests.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Physics Calculators | Density, Mass, Speed & Weight",
  description:
    "Free online physics calculators for density, mass, speed, and weight. Solve ρ = m/V, W = mg, and average-speed problems with clear units and real examples.",
  url: PAGE_URL,
  isPartOf: {
    "@type": "WebSite",
    name: "LizoCalc",
    url: SITE_URL,
  },
  about: {
    "@type": "Thing",
    name: "Physics Calculators",
  },
  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Physics Calculators",
  itemListElement: [
    "Density Calculator",
    "Mass Calculator",
    "Speed Calculator",
    "Weight Calculator",
  ].map((name, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
  })),
};

export default function Page() {
  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <PhysicsCalculators />
    </>
  );
}