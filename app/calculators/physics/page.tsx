import type { Metadata } from 'next';
import OtherCalculators from './OtherCalculators';

export const metadata: Metadata = {
  title: "Physics Calculators | Force, Motion, Energy, Density & More",
  description:
    "Free online physics calculators for density, mass, speed, velocity, force, energy, gravity, pressure, and more. Accurate and easy-to-use tools for students and professionals.",

  keywords: [
    "physics calculator",
    "density calculator",
    "mass calculator",
    "speed calculator",
    "velocity calculator",
    "force calculator",
    "energy calculator",
    "gravity calculator",
    "pressure calculator",
    "kinematics calculator",
    "physics tools",
  ],

  // Open Graph
  openGraph: {
    title: "Physics Calculators | Force, Motion, Energy, Density & More",
    description:
      "Free physics calculators including density, force, energy, velocity, and gravity. Perfect for students and quick calculations.",
    url: "https://www.lizocalc.com/calculators/physics",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
  },

  // Twitter / X Cards
  twitter: {
    card: "summary_large_image",
    title: "Physics Calculators | Force, Motion, Energy, Density & More",
    description:
      "Free online physics calculators for density, force, energy, and motion by LizoCalc.",
  },

  // Other SEO
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/physics",
  },
};

export default function Page() {
  return <OtherCalculators />;
}