export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar Skeleton (Static height) */}
      <div className="h-16 w-full bg-gray-900 border-b border-gray-800"></div>

      {/* Hero Section Skeleton */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="h-10 w-2/3 bg-gray-800 animate-pulse rounded-lg"></div>
        </div>
      </section>

      {/* Calculator Skeleton */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="h-[400px] w-full bg-gray-800/40 animate-pulse rounded-3xl border border-gray-700"></div>
      </section>

      {/* Quick Answer Box Skeleton */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="h-48 w-full bg-blue-900/10 animate-pulse rounded-2xl border border-blue-500/10"></div>
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