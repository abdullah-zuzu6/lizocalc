import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <url>
    <loc>https://www.lizocalc.com/calculators/education/cgpa-calculator</loc>
    
    <image:image>
      <image:loc>https://www.lizocalc.com/images/cgpa-formula-diagram.webp</image:loc>
      <image:title>CGPA formula calculation example (4.0 scale)</image:title>
      <image:caption>Step by step CGPA formula with grade points and credit hours for accurate calculation</image:caption>
    </image:image>

  </url>

</urlset>`, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}