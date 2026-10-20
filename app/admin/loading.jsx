export default function LoadingAdmin() {
  return (
    <div className="py-8 animate-pulse md:py-12">
      {/* Header Admin */}
      <div className="mb-6 flex items-center justify-between">
        <div className="h-8 w-44 rounded-lg bg-permukaan" />
        <div className="h-10 w-36 rounded-lg bg-permukaan" />
      </div>

      {/* Skeleton Tabel Produk */}
      <div className="overflow-x-auto rounded-2xl border border-garis bg-latar">
        <div className="h-12 w-full border-b border-garis bg-permukaan" />
        <div className="divide-y divide-garis">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-permukaan" />
                <div className="h-4 w-40 rounded bg-permukaan" />
              </div>
              <div className="h-4 w-24 rounded bg-permukaan" />
              <div className="h-4 w-28 rounded bg-permukaan" />
              <div className="flex gap-2">
                <div className="h-8 w-16 rounded-lg bg-permukaan" />
                <div className="h-8 w-16 rounded-lg bg-permukaan" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
