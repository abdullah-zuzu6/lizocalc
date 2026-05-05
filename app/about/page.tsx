import { Metadata } from "next";
import About from "./client";

export const metadata: Metadata = {
  title: "About LizoCalc | Calculator Platform",
  description:
    "Learn about LizoCalc, our mission, and the developer behind the platform.",
  alternates: {
    canonical: "https://www.lizocalc.com/about",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
return <About/>
}