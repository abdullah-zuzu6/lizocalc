import { Metadata } from "next";
import Terms from "./client";

export const metadata: Metadata = {
  title: "Terms of Use | LizoCalc",
  description: "Terms and conditions for using LizoCalc.",
  alternates: {
    canonical: "https://www.lizocalc.com/terms",
  },
   robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <Terms/>;
}