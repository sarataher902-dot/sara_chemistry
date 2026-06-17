export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-navy-950 w-full" />

      {/* Hero skeleton */}
      <div className="h-80 bg-gradient-to-br from-navy-900 to-navy-950" />

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-6">
        <div className="h-6 bg-navy-100 rounded-full w-32 mx-auto" />
        <div className="h-10 bg-navy-100 rounded-xl w-2/3 mx-auto" />
        <div className="h-5 bg-navy-50 rounded-lg w-1/2 mx-auto" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-navy-50 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
