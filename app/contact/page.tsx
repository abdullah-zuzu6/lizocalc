import { Metadata } from "next";
import Contact from "./client";

export const metadata: Metadata = {
  title: "Contact Us | LizoCalc",
  description:
    "Contact LizoCalc for support, feedback, calculator issues, or suggestions.",
  alternates: {
    canonical: "https://www.lizocalc.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <Contact/>
}