import { Check, Landmark } from "lucide-react";
import type { PaymentBankId, PaymentMethod } from "../types/payment.types";

const bankAccent = {
  orange: "bg-orange-50 text-orange-700 border-orange-100",
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  navy: "bg-slate-100 text-slate-800 border-slate-200",
} as const;

export function PaymentMethodSelection({
  methods,
  selectedBankId,
  onSelect,
  disabled,
}: {
  methods: PaymentMethod[];
  selectedBankId: PaymentBankId | null;
  onSelect: (bankId: PaymentBankId) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className="mt-6 grid gap-3 sm:grid-cols-3"
      role="radiogroup"
      aria-label="Pilih metode pembayaran"
    >
      {methods.map((method) => {
        const selected = selectedBankId === method.id;
        return (
          <button
            key={method.id}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onSelect(method.id)}
            className={`relative min-h-44 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-default ${
              selected
                ? "border-blue-600 bg-blue-50/70 shadow-[0_10px_30px_rgba(37,99,235,0.1)]"
                : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`grid h-11 min-w-11 place-items-center rounded-xl border px-2 text-xs font-black ${bankAccent[method.accent]}`}
              >
                {method.shortName}
              </span>
              <span
                className={`grid size-6 place-items-center rounded-full border ${
                  selected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 text-transparent"
                }`}
              >
                <Check className="size-3.5" />
              </span>
            </div>
            <span className="mt-5 block text-sm font-extrabold text-slate-950">
              {method.name}
            </span>
            <span className="mt-2 block text-xs leading-5 text-slate-500">
              {method.description}
            </span>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-600">
              <Landmark className="size-3.5" />
              Virtual Account
            </span>
          </button>
        );
      })}
    </div>
  );
}
