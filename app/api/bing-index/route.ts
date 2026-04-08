// app/api/bing-index/route.ts
import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

export async function GET() {
  try {
    const sitemapUrl = 'https://www.lizocalc.com/sitemap.xml';

    const sitemapResponse = await fetch(sitemapUrl, {
      next: { revalidate: 0 } // Force fresh fetch
    });

    if (!sitemapResponse.ok) {
      throw new Error(`Failed to fetch sitemap: ${sitemapResponse.status}`);
    }

    const sitemapXml = await sitemapResponse.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      isArray: (tagName) => tagName === 'url' // Ensure urls is always array
    });

    const jsonObj = parser.parse(sitemapXml);

    let urls: string[] = [];

    // Handle both single sitemap and sitemap index cases
    if (jsonObj.urlset?.url) {
      urls = Array.isArray(jsonObj.urlset.url)
        ? jsonObj.urlset.url.map((item: any) => item.loc)
        : [jsonObj.urlset.url.loc];
    } else if (jsonObj.sitemapindex?.sitemap) {
      // If it's a sitemap index, you might want to handle nested sitemaps
      return NextResponse.json({
        success: false,
        error: "Sitemap index detected. This endpoint only handles flat sitemaps for now."
      });
    }

    if (urls.length === 0) {
      return NextResponse.json({ success: false, error: "No URLs found in sitemap" });
    }

    // IndexNow limit is 10,000 URLs per request
    if (urls.length > 10000) {
      return NextResponse.json({
        success: false,
        error: `Too many URLs (${urls.length}). IndexNow limit is 10,000 per request.`
      });
    }

    const payload = {
      host: "www.lizocalc.com",
      key: "d157fadcac8e4af4a05269b856fdca54",
      keyLocation: "https://www.lizocalc.com/d157fadcac8e4af4a05269b856fdca54.txt",
      urlList: urls,
    };

    const bingResponse = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json; charset=utf-8' 
      },
      body: JSON.stringify(payload),
    });

    const resultText = await bingResponse.text();

    if (bingResponse.ok) {
      return NextResponse.json({
        success: true,
        message: `Successfully submitted ${urls.length} URLs to IndexNow`,
        urlsSubmitted: urls.length,
        response: resultText
      });
    } else {
      return NextResponse.json({
        success: false,
        status: bingResponse.status,
        error: resultText
      }, { status: bingResponse.status });
    }

  } catch (error: any) {
    console.error("IndexNow submission error:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}