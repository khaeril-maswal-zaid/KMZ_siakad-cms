import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Copy,
  CreditCard,
  LoaderCircle,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { PaymentMethodSelection } from "./payment-method-selection";
import { usePaymentPage } from "../hooks";
import { toast } from "sonner";
import { PaymentInstructions } from "./payment-instructions";
import PaymentDetail from "./payment-detail";
import { useRouter } from "next/navigation";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function PaymentMethod() {
  const router = useRouter();

  const {
    methods,
    payment,
    applicant,
    selection,
    selectPaymentBank,
    setVirtualAccount,
    generateVirtualAccount,
    simulatePayment,
    completePayment,
  } = usePaymentPage();

  const selectedMethod =
    methods.find((method) => method.id === payment.selectedBankId) ?? null;
  const isPaid = Boolean(payment.receipt);

  async function handleGenerateVirtualAccount() {
    const bankId = payment.selectedBankId;
    if (!bankId) {
      toast.error("Pilih bank untuk membuat Virtual Account.");
      return;
    }
    if (!applicant || !selection) {
      return;
    }
    const accountId = applicant.accountId;
    const amount = selection.registrationFee;

    try {
      const virtualAccount = await generateVirtualAccount.mutateAsync({
        accountId,
        bankId,
        amount,
      });
      setVirtualAccount(virtualAccount);
      toast.success("Virtual Account berhasil dibuat.");
    } catch {
      toast.error("Virtual Account belum berhasil dibuat. Silakan coba lagi.");
    }
  }

  async function handleSimulatePayment() {
    if (!payment.virtualAccount) {
      return;
    }

    try {
      const receipt = await simulatePayment.mutateAsync({
        virtualAccount: payment.virtualAccount,
      });
      completePayment(receipt);
      toast.success("Pembayaran berhasil diverifikasi.");
    } catch {
      toast.error("Simulasi pembayaran belum berhasil. Silakan coba kembali.");
    }
  }

  async function copyVirtualAccount() {
    if (!payment.virtualAccount) {
      return;
    }
    try {
      await navigator.clipboard.writeText(payment.virtualAccount.number);
      toast.success("Nomor Virtual Account disalin.");
    } catch {
      /* ignore clipboard errors in dev */
    }
  }

  return (
    <div className="space-y-7">
      {!isPaid && (
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(30,64,110,0.06)] sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
              <CreditCard className="size-5" />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-600">
                Metode pembayaran
              </p>
              <h2 className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-slate-950">
                Pilih bank yang paling nyaman.
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                Satu nomor Virtual Account akan dibuat khusus untuk
                pendaftaranmu.
              </p>
            </div>
          </div>

          <PaymentMethodSelection
            methods={methods}
            selectedBankId={payment.selectedBankId}
            onSelect={selectPaymentBank}
            disabled={generateVirtualAccount.isPending}
          />

          {!payment.virtualAccount && (
            <button
              type="button"
              disabled={
                !payment.selectedBankId || generateVirtualAccount.isPending
              }
              onClick={() => void handleGenerateVirtualAccount()}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:hover:translate-y-0 sm:w-auto"
            >
              {generateVirtualAccount.isPending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Membuat Virtual Account...
                </>
              ) : (
                <>
                  Buat Virtual Account
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          )}
        </div>
      )}

      {payment.virtualAccount && (
        <div
          className={`overflow-hidden rounded-[28px] border bg-white shadow-[0_14px_45px_rgba(30,64,110,0.08)] ${
            isPaid ? "border-emerald-200" : "border-blue-200"
          }`}
        >
          <div
            className={`px-5 py-5 sm:px-7 ${
              isPaid ? "bg-emerald-50" : "bg-blue-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`grid size-10 place-items-center rounded-2xl ${
                  isPaid
                    ? "bg-emerald-500 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                {isPaid ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <ReceiptText className="size-5" />
                )}
              </span>
              <div>
                <p
                  className={`text-xs font-extrabold uppercase tracking-[0.14em] ${
                    isPaid ? "text-emerald-700" : "text-blue-700"
                  }`}
                >
                  {isPaid ? "Pembayaran berhasil" : "Virtual Account aktif"}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {isPaid
                    ? "Transaksi telah terverifikasi."
                    : "Selesaikan pembayaran sebelum masa berlaku habis."}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <PaymentDetail
                label="Nama Bank"
                value={payment.virtualAccount.bankName}
              />
              <PaymentDetail
                label="Total Pembayaran"
                value={currencyFormatter.format(payment.virtualAccount.amount)}
              />
              <div className="sm:col-span-2">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  Nomor Virtual Account
                </p>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <span className="min-w-0 flex-1 break-all font-mono text-xl font-black tracking-[0.08em] text-slate-950 sm:text-2xl">
                    {payment.virtualAccount.number}
                  </span>
                  <button
                    type="button"
                    onClick={() => void copyVirtualAccount()}
                    className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-blue-700 shadow-sm transition-colors hover:bg-blue-600 hover:text-white"
                    aria-label="Salin nomor Virtual Account"
                  >
                    <Copy className="size-4" />
                  </button>
                </div>
              </div>
              <PaymentDetail
                label={isPaid ? "Waktu Pembayaran" : "Masa Berlaku"}
                value={
                  isPaid && payment.receipt
                    ? dateFormatter.format(new Date(payment.receipt.paidAt))
                    : dateFormatter.format(
                        new Date(payment.virtualAccount.expiresAt),
                      )
                }
                icon={<Clock3 className="size-4" />}
              />
              <PaymentDetail
                label={isPaid ? "Nomor Referensi" : "Status"}
                value={
                  payment.receipt?.referenceNumber ?? "Menunggu Pembayaran"
                }
                icon={<BadgeCheck className="size-4" />}
              />
            </div>

            {isPaid ? (
              <button
                type="button"
                onClick={() => router.push("/dashboard/formulir")}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-700 sm:w-auto"
              >
                Lanjutkan ke Formulir
                <ArrowRight className="size-4" />
              </button>
            ) : (
              <div className="mt-7 rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-blue-700" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Simulasi pembayaran
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Tombol ini tersedia sementara karena payment gateway belum
                      terhubung.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={simulatePayment.isPending}
                  onClick={() => void handleSimulatePayment()}
                  className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-bold text-white transition-all hover:bg-blue-700 disabled:cursor-wait disabled:bg-blue-400 sm:w-auto"
                >
                  {simulatePayment.isPending ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Memverifikasi pembayaran...
                    </>
                  ) : (
                    "Simulasikan Pembayaran Berhasil"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedMethod && payment.virtualAccount && (
        <PaymentInstructions method={selectedMethod} />
      )}
    </div>
  );
}
