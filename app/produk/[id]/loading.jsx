export default function LoadingDetailProduk() {
  return (
    <div className="py-8 animate-pulse md:py-12">
      <article className="grid gap-8 md:grid-cols-2">
        {/* Skeleton Foto Produk */}
        <div className="aspect-square w-full rounded-2xl border border-garis bg-permukaan" />

        {/* Skeleton Informasi Produk */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="h-4 w-32 rounded bg-permukaan" />
          <div className="h-4 w-20 rounded bg-permukaan" />
          <div className="h-8 w-3/4 rounded bg-permukaan sm:h-10" />
          <div className="h-8 w-36 rounded-md bg-permukaan" />
          <div className="space-y-2 py-2">
            <div className="h-4 w-full rounded bg-permukaan" />
            <div className="h-4 w-5/6 rounded bg-permukaan" />
            <div className="h-4 w-2/3 rounded bg-permukaan" />
          </div>
          <div className="mt-4 h-12 w-full max-w-sm rounded-lg bg-permukaan" />
          <div className="h-12 w-full max-w-sm rounded-lg bg-permukaan" />
        </div>
      </article>

      {/* Skeleton Produk Terkait */}
      <section className="mt-16 border-t border-garis pt-10">
        <div className="mb-6 h-6 w-36 rounded bg-permukaan" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="flex flex-col overflow-hidden rounded-2xl border border-garis bg-latar"
            >
              <div className="aspect-square w-full bg-permukaan" />
              <div className="flex flex-col gap-2 p-3">
                <div className="h-3 w-16 rounded bg-permukaan" />
                <div className="h-4 w-3/4 rounded bg-permukaan" />
                <div className="mt-2 h-6 w-20 rounded bg-permukaan" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
