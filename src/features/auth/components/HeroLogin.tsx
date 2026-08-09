import { ShieldCheck } from "lucide-react";

export function HeroLogin() {
  return (
    <div className="max-w-2xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700 shadow-sm">
        <ShieldCheck className="size-3.5" />
        Portal Camaba
      </span>
      <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.055em] text-slate-950 sm:text-5xl">
        Masuk untuk melanjutkan proses PMB.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
        Gunakan akun yang dibuat saat registrasi untuk mengakses dashboard,
        pembayaran, formulir, dan jadwal Seleksi Tes Potensi Akademik.
      </p>
    </div>
  );
}
