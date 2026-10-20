export default function LoadingKatalog() {
  return (
    <div className="py-8 animate-pulse md:py-12">
      {/* Skeleton Header & Tagline */}
      <div className="mb-8 flex flex-col gap-3">
        <div className="h-8 w-48 rounded-lg bg-permukaan sm:h-10 sm:w-64" />
        <div className="h-4 w-full max-w-lg rounded bg-permukaan" />
      </div>

      {/* Skeleton Filter & Pencarian */}
      <div className="mb-8 flex flex-col gap-4">
        <div className="h-10 w-full max-w-md rounded-lg bg-permukaan" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-20 rounded-full bg-permukaan" />
          ))}
        </div>
      </div>

      {/* Skeleton Grid Produk */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div
            key={n}
            className="flex flex-col overflow-hidden rounded-2xl border border-garis bg-latar"
          >
            <div className="aspect-square w-full bg-permukaan" />
            <div className="flex flex-col gap-2 p-3">
              <div className="h-3 w-16 rounded bg-permukaan" />
              <div className="h-4 w-3/4 rounded bg-permukaan" />
              <div className="mt-2 h-6 w-24 rounded bg-permukaan" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
