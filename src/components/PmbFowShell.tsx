"use client";

import { ArrowUp, LogOut, MessageCircleMore, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { CampusLogo } from "@/components/CampusLogo";
import { RegistrationProgress } from "@/components/RegistrationProgress";
import { CampusProfile } from "@/types/campus-profile";
import { PmbSiteFooter } from "./PmbSiteFooter";

type PmbFlowShellProps = {
  currentStep: 1 | 2 | 3 | 4 | 5;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  authenticatedArea?: boolean;
  campus?: CampusProfile;
};

export function PmbFlowShell({
  currentStep,
  eyebrow,
  title,
  description,
  children,
}: PmbFlowShellProps) {
  const helpUrl = "Halo Admin PMB, saya butuh bantuan terkait pendaftaran.";

  async function handleLogout() {
    toast.info("Fitur logout belum diimplementasikan.");
  }

  const isAuthenticated = false;

  return (
    <div className="min-h-screen bg-[#f5f8fd] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            aria-label="Kembali ke Landing Page PMB"
            className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
          >
            <CampusLogo />
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 sm:px-4 sm:text-sm"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/pendaftaran/login"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 sm:px-5"
            >
              Login
              <ArrowUp className="hidden size-4 sm:block" />
            </Link>
          )}
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-white">
          <div className="pointer-events-none absolute left-1/2 top-0 h-52 w-[720px] -translate-x-1/2 rounded-full bg-blue-100/70 blur-[90px]" />
          <div className="relative mx-auto max-w-[1060px] px-5 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-12">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-700">
                <ShieldCheck className="size-3.5" />
                {eyebrow}
              </span>
              <h1 className="mt-5 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                {description}
              </p>
            </div>
            <div className="mx-auto mt-9 max-w-2xl">
              <RegistrationProgress currentStep={currentStep} />
            </div>
          </div>
        </section>

        {children}
      </main>

      <PmbSiteFooter />

      <a
        href={helpUrl}
        className="fixed bottom-5 right-5 z-50 inline-flex min-h-13 items-center gap-3 rounded-full bg-emerald-500 px-4 text-sm font-extrabold text-white shadow-[0_18px_40px_rgba(16,185,129,0.34)] transition-all hover:-translate-y-0.5 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        aria-label="Butuh bantuan via WhatsApp"
      >
        <MessageCircleMore className="size-5" />
        <span className="hidden sm:inline">Butuh Bantuan?</span>
      </a>
    </div>
  );
}
