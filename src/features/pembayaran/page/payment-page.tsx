"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PaymentSummaryCard } from "../components/payment-summary-card";
import { usePaymentPage } from "../hooks";
import { PmbFlowShell } from "@/components/PmbFlowShell";
import { PaymentMethod } from "../components/payment-method";

export function PaymentPage() {
  const router = useRouter();

  const { payment, applicant, selection } = usePaymentPage();

  const isPaid = Boolean(payment.receipt);

  return (
    <PmbFlowShell
      authenticatedArea
      currentStep={4}
      eyebrow="Tahap 4 dari 5"
      title="Selesaikan pembayaranmu."
      description="Pilih bank, buat Virtual Account, dan ikuti petunjuk pembayaran. Status akan diperbarui otomatis setelah transaksi berhasil."
    >
      <section className="mx-auto grid max-w-[1180px] gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:px-10">
        <PaymentMethod />

        <div className="lg:sticky lg:top-6">
          <PaymentSummaryCard
            applicant={applicant}
            selection={selection}
            paid={isPaid}
          />
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mt-4 min-h-11 w-full rounded-xl text-xs font-bold text-slate-500 transition-colors hover:bg-white hover:text-blue-700"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </section>
    </PmbFlowShell>
  );
}
