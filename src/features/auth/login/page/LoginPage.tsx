"use client";

import { CampusLogo } from "@/components/CampusLogo";
import Link from "next/link";
import { FormLogin } from "../components/FormLogin";
import { HeroLogin } from "../components/HeroLogin";
import { LoadingComponent } from "@/components/LoadingComponent";
import { Pointer } from "@/components/Pointer";

export function LoginPage() {
  const data = {
    isLoading: false,
  };

  if (!data) {
    return <LoadingComponent />;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f8fd] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            aria-label="Kembali ke Landing Page PMB"
            className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
          >
            <CampusLogo />
          </Link>
          <Link
            href="/pendaftaran"
            className="inline-flex min-h-10 items-center justify-center rounded-xl px-4 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-700"
          >
            Daftar PMB
          </Link>
        </div>
      </header>

      <main className="relative">
        <Pointer />
        <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1180px] items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_420px] lg:px-10">
          <HeroLogin />

          <FormLogin />
        </section>
      </main>
    </div>
  );
}
