import { ChevronDown, CircleCheckBig, Smartphone } from "lucide-react";
import { PaymentMethod } from "../types/payment.types";

export function PaymentInstructions({ method }: { method: PaymentMethod }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(30,64,110,0.06)] sm:p-7">
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
          <Smartphone className="size-5" />
        </span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-600">
            Petunjuk pembayaran
          </p>
          <h2 className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-slate-950">
            Bayar melalui {method.shortName}.
          </h2>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {method.instructions.map((instruction, index) => (
          <details
            key={instruction.channel}
            open={index === 0}
            className="group rounded-2xl border border-slate-200 bg-white"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 text-sm font-bold text-slate-900">
              {instruction.channel}
              <ChevronDown className="size-4 text-slate-400 transition-transform group-open:rotate-180" />
            </summary>
            <ol className="space-y-3 border-t border-slate-100 px-4 py-4">
              {instruction.steps.map((step, stepIndex) => (
                <li className="flex gap-3" key={step}>
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-50 text-[10px] font-black text-blue-700">
                    {stepIndex + 1}
                  </span>
                  <span className="pt-0.5 text-xs leading-5 text-slate-600">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </details>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-emerald-50 px-4 py-3.5 text-xs leading-5 text-emerald-800">
        <CircleCheckBig className="mt-0.5 size-4 shrink-0" />
        Nominal sudah terisi otomatis. Pastikan nama camaba dan jumlah tagihan
        sesuai sebelum mengonfirmasi pembayaran.
      </div>
    </div>
  );
}
