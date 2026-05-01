import { NextResponse } from "next/server";

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>

  <!-- =========================
       CATEGORY LANDING PAGES
  ========================== -->
  <url>
    <loc>https://www.lizocalc.com/blogs/education</loc>
    <lastmod>2026-04-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.lizocalc.com/blogs/finance</loc>
    <lastmod>2026-04-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.lizocalc.com/blogs/health</loc>
    <lastmod>2026-04-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- =========================
        EDUCATION BLOG
  ========================== -->
  <url>
    <loc>https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade</loc>
    <lastmod>2026-04-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>

    <image:image>
      <image:loc>
        https://www.lizocalc.com/images/blogs/education/how-to-calculate-final-grade-before-exams.webp
      </image:loc>
      <image:title>
        How to Calculate Final Grade Before Exams
      </image:title>
      <image:caption>
        Infographic showing weighted final grade formula, score needed, and worked examples.
      </image:caption>
    </image:image>
  </url>

  <!-- =========================
        FINANCE BLOG
  ========================== -->
  <url>
    <loc>https://www.lizocalc.com/blogs/finance/loan-payment-calculate-guide</loc>
    <lastmod>2026-04-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>

    <image:image>
      <image:loc>
        https://www.lizocalc.com/images/blogs/finance/loan-payment-amortization-chart.webp
      </image:loc>
      <image:title>
        Loan Payment Amortization Schedule Chart
      </image:title>
      <image:caption>
        Loan amortization chart showing monthly payment breakdown, principal, interest, and remaining balance.
      </image:caption>
    </image:image>
  </url>

  <!-- =========================
        HEALTH BLOG
  ========================== -->
  <url>
    <loc>https://www.lizocalc.com/blogs/health/what-is-bmi</loc>
    <lastmod>2026-04-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>

    <image:image>
      <image:loc>
        https://www.lizocalc.com/images/blogs/health/bmi-formula-visual.webp
      </image:loc>
      <image:title>
        BMI Formula Visual Guide
      </image:title>
      <image:caption>
        BMI formula infographic showing metric and imperial BMI formulas with healthy BMI ranges.
      </image:caption>
    </image:image>

    <image:image>
      <image:loc>
        https://www.lizocalc.com/images/blogs/health/bmi-category-range-bar.webp
      </image:loc>
      <image:title>
        BMI Category Range Bar
      </image:title>
      <image:caption>
        BMI category scale from underweight to obesity with numeric BMI values.
      </image:caption>
    </image:image>

    <image:image>
      <image:loc>
        https://www.lizocalc.com/images/blogs/health/male-vs-female-fat-distribution-diagram.webp
      </image:loc>
      <image:title>
        Male vs Female Fat Distribution Diagram
      </image:title>
      <image:caption>
        Comparison of male apple-shaped and female pear-shaped fat distribution patterns.
      </image:caption>
    </image:image>
  </url>

</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}