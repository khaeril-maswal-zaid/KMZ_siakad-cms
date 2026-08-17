import { CalendarDays, GraduationCap, MapPin, Route } from "lucide-react";
import { StudySelection } from "../features/program-selection/types";

type FieldSummarySelection = {
  level?: string;
  faculty?: string;
  programName?: string;
  studySystem?: string;
  admissionPathName?: string;
  waveName?: string;
};

type SelectionSummaryCardProps = {
  selection: FieldSummarySelection | null;
};

export function FieldSummaryCard({ selection }: SelectionSummaryCardProps) {
  const items = [
    {
      label: "Jenjang",
      value: selection?.level ?? "Belum dipilih",
      icon: GraduationCap,
    },
    {
      label: "Fakultas",
      value: selection?.faculty ?? "Belum dipilih",
      icon: GraduationCap,
    },
    {
      label: "Program Studi",
      value: selection?.programName ?? "Belum dipilih",
      icon: GraduationCap,
    },
    {
      label: "Sistem Kuliah",
      value: selection?.studySystem ?? "Belum dipilih",
      icon: MapPin,
    },
    {
      label: "Jalur Masuk",
      value: selection?.admissionPathName ?? "Belum dipilih",
      icon: Route,
    },
    {
      label: "Gelombang",
      value: selection?.waveName ?? "Belum dipilih",
      icon: CalendarDays,
    },
  ];

  return (
    <>
      {items.map((item) => (
        <div
          className="flex items-start gap-3 rounded-2xl px-2 py-3 mb-0"
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
    </>
  );
}
