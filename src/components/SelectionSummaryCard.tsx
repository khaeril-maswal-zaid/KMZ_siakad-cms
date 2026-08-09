import {
  ArrowRight,
  CalendarDays,
  GraduationCap,
  LoaderCircle,
  MapPin,
  ReceiptText,
  Route,
} from "lucide-react";
import { StudySelection } from "../features/program-selection/types";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

type SelectionSummaryCardProps = {
  selection: StudySelection | null;
  waveName: string;
  registrationFee: number;
  actionLabel: string;
  onAction: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export function SelectionSummaryCard({
  selection,
  waveName,
  registrationFee,
  actionLabel,
  onAction,
  disabled = false,
  isLoading = false,
}: SelectionSummaryCardProps) {
  const items = [
    {
      label: "Jenjang",
      value: selection?.level ?? "Belum dipilih",
      icon: GraduationCap,
    },
    {
      label: "Fakultas",
      value: selection ? selection.faculty : "Belum dipilih",
      icon: GraduationCap,
    },
    {
      label: "Program Studi",
      value: selection ? selection.programName : "Belum dipilih",
      icon: GraduationCap,
    },
    {
      label: "Sistem Kuliah",
      value: selection?.studySystem || "Belum dipilih",
      icon: MapPin,
    },
    {
      label: "Jalur Masuk",
      value: selection?.admissionPathName || "Belum dipilih",
      icon: Route,
    },
    {
      label: "Gelombang",
      value: waveName,
      icon: CalendarDays,
    },
  ];

  return (
    <aside className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(30,64,110,0.1)]">
      <div className="bg-[#0a57c7] px-6 py-6 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-100">
          Ringkasan pilihan
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-[-0.03em]">
          Langkah pertamamu
        </h2>
      </div>

      <div className="space-y-1 p-5">
        {items.map((item) => (
          <div
            className="flex items-start gap-3 rounded-2xl px-2 py-3"
            key={item.label}
          >
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
              <item.icon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-slate-400">
                {item.label}
              </p>
              <p
                className={`mt-0.5 text-sm font-bold ${
                  item.value === "Belum dipilih"
                    ? "text-slate-400"
                    : "text-slate-900"
                }`}
              >
                {item.value}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-3 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
            <ReceiptText className="size-4 text-blue-600" />
            Biaya
          </span>
          <span className="text-base font-extrabold text-slate-950">
            {currencyFormatter.format(registrationFee)}
          </span>
        </div>

        <button
          type="button"
          disabled={disabled || isLoading}
          onClick={onAction}
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:hover:translate-y-0"
        >
          {isLoading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <>
              {actionLabel}
              <ArrowRight className="size-4" />
            </>
          )}
        </button>

        {disabled && (
          <p className="px-2 pb-1 pt-3 text-center text-[11px] leading-4 text-slate-400">
            Lengkapi pilihan program, sistem kuliah, dan jalur masuk untuk
            melanjutkan.
          </p>
        )}
      </div>
    </aside>
  );
}
