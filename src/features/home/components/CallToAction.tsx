import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-28">
      <div className="relative mx-auto max-w-[1160px] overflow-hidden rounded-[32px] bg-blue-600 px-6 py-10 text-white shadow-[0_24px_64px_rgba(37,99,235,0.25)] sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14 lg:py-12">
        <div className="absolute -right-16 -top-24 size-64 rounded-full border-[44px] border-white/[0.07]" />

        <div className="absolute bottom-0 right-1/3 h-32 w-32 rounded-full bg-cyan-300/15 blur-2xl" />

        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100">
            Siap mengambil langkah pertama?
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            Mulai perjalanan kampusmu hari ini.
          </h2>
        </div>

        <Link
          href="#program-studi"
          className="relative mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-bold text-blue-700 shadow-lg transition-transform hover:-translate-y-0.5 lg:mt-0"
        >
          Lihat program studi
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
