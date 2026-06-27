import { Metadata } from "next";
import SavedCalculatorsPage from "./client";

export const metadata: Metadata = {
  title: "My Toolkit | Saved Calculators | LizoCalc",
  description:
    "Access, manage, and quickly open your saved calculators and tools in one place on LizoCalc.",
  alternates: {
    canonical: "https://www.lizocalc.com/saved-calculators",
  },
  robots: {
   index: false,
    follow: true,
  },
};

export default function Page() {
  return <SavedCalculatorsPage/>;
}