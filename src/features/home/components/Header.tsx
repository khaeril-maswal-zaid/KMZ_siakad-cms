import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CampusLogo } from "@/features/home/components/CampusLogo";
import type { CampusProfile } from "@/features/home/types";

type HeaderProps = {
  campus: CampusProfile;
};

export function Header({ campus }: HeaderProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <CampusLogo campus={campus} />

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-8 lg:flex"
        >
          {[
            ["Program Studi", "#program-studi"],
            ["Alur Pendaftaran", "#alur"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-blue-700"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="inline-flex min-h-10 items-center justify-center rounded-xl px-3 text-sm font-bold text-slate-700 transition-colors hover:bg-white/70 hover:text-blue-700 sm:px-4"
          >
            Login
          </Link>

          <Link
            href="#program-studi"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 sm:px-5"
          >
            Daftar
            <ArrowRight className="hidden size-4 sm:block" />
          </Link>
        </div>
      </div>
    </header>
  );
}
