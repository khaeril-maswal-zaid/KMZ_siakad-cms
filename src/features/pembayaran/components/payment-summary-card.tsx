import {
  BadgeCheck,
  Building2,
  CalendarDays,
  GraduationCap,
  MapPin,
  ReceiptText,
  Route,
  UserRound,
} from "lucide-react";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function PaymentSummaryCard({
  applicant,
  selection,
  paid,
}: {
  applicant: any;
  selection: any;
  paid: boolean;
}) {
  const items = [
    { label: "Nama Camaba", value: applicant.fullName, icon: UserRound },
    { label: "Gelombang", value: selection.waveName, icon: CalendarDays },
    { label: "Jenjang", value: selection.level, icon: GraduationCap },
    { label: "Fakultas", value: selection.faculty, icon: Building2 },
    {
      label: "Program Studi",
      value: selection.programName,
      icon: GraduationCap,
    },
    { label: "Sistem Kuliah", value: selection.studySystem, icon: MapPin },
    { label: "Jalur Masuk", value: selection.admissionPathName, icon: Route },
  ];

  return (
    <aside className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(30,64,110,0.1)]">
      <div className="bg-[#0a57c7] px-6 py-6 text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-100">
              Ringkasan tagihan
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-[-0.03em]">
              Biaya Pendaftaran
            </h2>
          </div>
          <ReceiptText className="size-6 text-blue-100" />
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-1">
          {items.map((item) => (
            <div
              className="flex items-start gap-3 rounded-2xl px-1 py-2.5"
              key={item.label}
            >
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
                <item.icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-slate-400">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm font-bold leading-5 text-slate-900">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-500">
              Total pembayaran
            </span>
            <span className="text-lg font-extrabold text-slate-950">
              {currencyFormatter.format(selection.registrationFee)}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
            <span className="text-xs font-semibold text-slate-500">Status</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
                paid
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              <BadgeCheck className="size-3.5" />
              {paid ? "Pembayaran Berhasil" : "Menunggu Pembayaran"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
