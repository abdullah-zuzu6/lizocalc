export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar Skeleton (Static height) */}
      <div className="h-16 w-full bg-gray-900 border-b border-gray-800"></div>

      {/* Hero Section Skeleton — mirrors the real hero's py-12 section
          and h1 size so there's no jump when real content swaps in */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="h-10 w-2/3 bg-gray-800 animate-pulse rounded-lg"></div>
        </div>
      </section>

      {/* Calculator Skeleton — matches the real <section className="px-4 py-8"> wrapper */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto h-[500px] w-full bg-gray-800/40 animate-pulse rounded-3xl border border-gray-700"></div>
      </section>

      {/* Article Content Skeleton — the real page has no "quick answer"
          box before the article, so it was removed here too. A skeleton
          with sections the real DOM doesn't have is exactly what causes
          a jump when the real page swaps in. */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-6">
        <div className="h-8 w-1/4 bg-gray-800 animate-pulse rounded"></div>
        <div className="h-4 w-full bg-gray-800 animate-pulse rounded"></div>
        <div className="h-4 w-5/6 bg-gray-800 animate-pulse rounded"></div>
        <div className="h-4 w-4/6 bg-gray-800 animate-pulse rounded"></div>
      </section>
    </main>
  );
}