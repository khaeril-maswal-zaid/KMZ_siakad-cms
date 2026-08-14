import { CalendarDays, GraduationCap, MapPin, Route } from "lucide-react";
import type { DashboardSelection } from "../types";
import { useCampusProfile } from "@/hooks/campus-profile";

export function SelectionCard({
  selection,
}: {
  selection: DashboardSelection;
}) {
  const details = [
    {
      label: "Jenjang",
      value: selection.level,
      icon: <GraduationCap className="size-4" />,
    },
    {
      label: "Fakultas",
      value: selection.faculty,
      icon: <GraduationCap className="size-4" />,
    },
    {
      label: "Program Studi",
      value: selection.programName,
      icon: <GraduationCap className="size-4" />,
    },
    {
      label: "Gelombang",
      value: selection.waveName,
      icon: <CalendarDays className="size-4" />,
    },
    {
      label: "Sistem Kuliah",
      value: selection.studySystem,
      icon: <MapPin className="size-4" />,
    },
    {
      label: "Jalur Masuk",
      value: selection.admissionPathName,
      icon: <Route className="size-4" />,
    },
  ];

  const campus = useCampusProfile();

  return (
    <aside className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(30,64,110,0.1)]">
      <div className="bg-[#0a57c7] px-6 py-6 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-100">
          Pilihanmu
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-[-0.03em]">
          {campus?.name ?? "Belum tersedia"}
        </h2>
      </div>
      <div className="space-y-4 p-5">
        {details.map((detail) => (
          <div className="flex items-start gap-3" key={detail.label}>
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
              {detail.icon}
            </span>
            <div>
              <p className="text-[11px] font-semibold text-slate-400">
                {detail.label}
              </p>
              <p className="mt-0.5 text-sm font-bold leading-5 text-slate-900">
                {detail.value || "Belum tersedia"}
              </p>
            </div>
          </div>
        ))}
        <button
          type="button"
          disabled
          className="min-h-11 w-full rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50"
        >
          Pilihan studi tersimpan
        </button>
      </div>
    </aside>
  );
}
