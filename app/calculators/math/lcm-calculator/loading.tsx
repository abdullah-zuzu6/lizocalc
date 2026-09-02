export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar Skeleton (Static height — matches real Navbar) */}
      <div className="h-16 w-full bg-gray-900 border-b border-gray-800"></div>

      {/* Hero Section Skeleton
          Matches the real hero: h1 + paragraph, py-12 section padding */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="h-10 w-2/3 bg-gray-800 animate-pulse rounded-lg"></div>
          <div className="h-4 w-full bg-gray-800/70 animate-pulse rounded"></div>
          <div className="h-4 w-3/4 bg-gray-800/70 animate-pulse rounded"></div>
        </div>
      </section>

      {/* Calculator Skeleton
          The real AgeCalculator renders a 12-col grid: a 4-col input panel
          (~500px tall) next to an 8-col results panel (min-h-[560px]).
          On mobile these stack, so the skeleton needs enough height to
          cover both without collapsing before the real component mounts. */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 h-[500px] bg-gray-800/40 animate-pulse rounded-2xl border border-gray-700"></div>
          <div className="lg:col-span-8 h-[560px] bg-gray-800/30 animate-pulse rounded-[3rem] border-4 border-dashed border-gray-700"></div>
        </div>
      </section>

      {/* Quick Answer Box Skeleton (matches real 3-column box height) */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="h-64 w-full bg-blue-900/10 animate-pulse rounded-3xl border border-blue-500/10"></div>
      </section>

      {/* Article Content Skeleton */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-6">
        <div className="h-8 w-1/4 bg-gray-800 animate-pulse rounded"></div>
        <div className="h-4 w-full bg-gray-800 animate-pulse rounded"></div>
        <div className="h-4 w-5/6 bg-gray-800 animate-pulse rounded"></div>
        <div className="h-4 w-4/6 bg-gray-800 animate-pulse rounded"></div>
      </section>
    </main>
  );
}