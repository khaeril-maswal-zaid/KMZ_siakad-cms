export function ErrorComponent({ refetch }: { refetch: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f5f8fd] px-5">
      <div className="w-full max-w-md rounded-[28px] border border-rose-100 bg-white p-6 text-center shadow-[0_20px_60px_rgba(30,64,110,0.1)]">
        <h1 className="text-lg font-bold text-slate-950">
          Data pilihan belum berhasil dimuat
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Terjadi kendala saat memuat program, sistem kuliah, dan jalur masuk.
        </p>
        <button
          type="button"
          onClick={() => {
            void refetch();
          }}
          className="mt-5 min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
        >
          Coba lagi
        </button>
      </div>
    </div>
  );
}
