import { Metadata } from "next";
import Terms from "./client";

export const metadata: Metadata = {
  title: "Terms of Use |",
  description:
    "The plain-language rules for using LizoCalc's free calculators — what you can do, what we're responsible for, and what we're not.",
  alternates: {
    canonical: "https://www.lizocalc.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms of Use ",
    description:
      "How LizoCalc works, what these calculators are for, and the terms that cover using them.",
    url: "https://www.lizocalc.com/terms",
    siteName: "LizoCalc",
    type: "website",
  },
};

export default function Page() {
  return <Terms />;
}