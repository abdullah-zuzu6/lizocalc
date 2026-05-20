import { NextResponse } from "next/server";

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <url>
    <loc>https://www.lizocalc.com/calculators/education/cgpa-calculator</loc>
    <lastmod>2026-04-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://www.lizocalc.com/images/cgpa-formula-diagram.webp</image:loc>
      <image:title>CGPA formula calculation example</image:title>
      <image:caption>Step-by-step CGPA calculation using credit hours and grade points</image:caption>
    </image:image>
  </url>
<url>
  <loc>https://www.lizocalc.com/calculators/education/weighted-grade-calculator</loc>
  <lastmod>2026-05-21</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
  <image:image>
    <image:loc>https://www.lizocalc.com/images/education/weighted-grade-formula-example.webp</image:loc>
    <image:title>Weighted grade formula example with score and percentage calculations</image:title>
    <image:caption>Step-by-step weighted grade calculation using scores, weights, and the formula Σ(Score × Weight) / ΣWeights</image:caption>
  </image:image>
</url>

  <url>
    <loc>https://www.lizocalc.com/calculators/time/age-calculator</loc>
    <lastmod>2026-04-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp</image:loc>
      <image:title>Chronological age calculation method</image:title>
      <image:caption>Borrowing method used in precise age calculation between two dates</image:caption>
    </image:image>
    <image:image>
      <image:loc>https://www.lizocalc.com/images/time/age-milestone-birthday-tracking.webp</image:loc>
      <image:title>Age milestone tracking calendar</image:title>
      <image:caption>Visual tracking of birthdays and life milestones over time</image:caption>
    </image:image>
  </url>

  <url>
    <loc>https://www.lizocalc.com/calculators/time/hours-calculator</loc>
    <lastmod>2026-04-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://www.lizocalc.com/images/time/alarm-clock-minimal.webp</image:loc>
      <image:title>Decimal Hours vs Time Minutes Comparison</image:title>
      <image:caption>Minimalist clock showing that 7 hours 30 minutes equals 7.50 decimal hours to avoid common payroll mistakes.</image:caption>
    </image:image>
  </url>

  <url>
    <loc>https://www.lizocalc.com/calculators/time/time-calculator</loc>
    <lastmod>2026-04-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://www.lizocalc.com/images/time/time-unit-conversion-flow.webp</image:loc>
      <image:title>Time Unit Conversion Flow</image:title>
      <image:caption>Visual flow showing conversion from hours → minutes → seconds (base-60 system)</image:caption>
    </image:image>
    <image:image>
      <image:loc>https://www.lizocalc.com/images/time/total-seconds-breakdown.webp</image:loc>
      <image:title>Total Seconds Breakdown</image:title>
      <image:caption>Step-by-step breakdown of converting time into total seconds, minutes, and decimal hours</image:caption>
    </image:image>
  </url>

  <url>
    <loc>https://www.lizocalc.com/calculators/time/date-calculator</loc>
    <lastmod>2026-04-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp</image:loc>
      <image:title>Date Calculator — Days Between Dates Interface</image:title>
      <image:caption>LizoCalc Date Calculator showing Starting Date and Ending Date calendars with a double-headed arrow labeled Days Between Dates, and quick-select buttons for 30 Days, 60 Days, and 90 Days From Today.</image:caption>
    </image:image>
  </url>

</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}