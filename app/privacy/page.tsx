import { Metadata } from "next";
import Privacy from "./client";

export const metadata: Metadata = {
  title: "Privacy Policy | LizoCalc",
  description:
    "Read how LizoCalc handles cookies, browser storage, analytics, and user privacy.",
  alternates: {
    canonical: "https://www.lizocalc.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <Privacy/>;
}