import type { Metadata } from 'next';
import OtherCalculators from './OtherCalculators';

export const metadata: Metadata = {
  title: "Time Calculators | Age, Date Difference, Hours & Duration Tools",
  description:
    "Free online time calculators including age calculator, date difference, time duration, hours between dates, and more. Accurate and easy to use.",

  keywords: [
    "age calculator",
    "date calculator",
    "time calculator",
    "hours calculator",
    "date difference calculator",
    "time duration calculator",
    "age in days calculator",
    "hours between dates",
    "time tools",
  ],

  // Open Graph
  openGraph: {
    title: "Time Calculators | Age, Date Difference, Hours & Duration Tools",
    description:
      "Free age calculator, date difference, time duration, and hours calculators by LizoCalc.",
    url: "https://www.lizocalc.com/calculators/time",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
  },

  // Twitter / X Cards
  twitter: {
    card: "summary_large_image",
    title: "Time Calculators | Age, Date Difference, Hours & Duration Tools",
    description:
      "Free online age, date difference, and time duration calculators by LizoCalc.",
  },

  // Other SEO
  robots: {
   index: false,
    follow: true,
  },

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time",
  },
};

export default function Page() {
  return <OtherCalculators />;
}