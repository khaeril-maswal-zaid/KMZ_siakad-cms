import { MapPin } from "lucide-react";
import type { ClassSchedule } from "@/features/master/class-schedule";
import { ChoiceSection } from "./ChoiceSection";

const studySessionLabels: Record<string, string> = {
  morning: "Reguler Pagi",
  evening: "Reguler Malam",
  weekend: "Akhir Pekan",
};

type SistemKuliahProps = {
  campuses: string[];
  availableStudySystems: ClassSchedule[];

  selectedCampus: string;
  selectedSession: string;

  onCampusChange: (campus: string) => void;
  onSessionChange: (session: string) => void;
};

export function SistemKuliah({
  campuses,
  availableStudySystems,
  selectedCampus,
  selectedSession,
  onCampusChange,
  onSessionChange,
}: SistemKuliahProps) {
  return (
    <ChoiceSection
      icon={<MapPin className="size-5" />}
      eyebrow="Sistem kuliah"
      title="Pilih lokasi dan waktu belajar."
      description="Pilih sistem kuliah yang paling realistis dengan jadwal harianmu."
    >
      <div>
        <p className="mb-2 text-[11px] font-bold text-slate-500">Kampus</p>

        <div
          className="grid gap-2 sm:grid-cols-3"
          role="radiogroup"
          aria-label="Pilih kampus"
        >
          {campuses.map((campus) => {
            const selected = selectedCampus === campus;

            return (
              <button
                key={campus}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onCampusChange(campus)}
                className={`
                  min-h-12 rounded-2xl border px-3
                  text-left text-xs font-extrabold leading-4
                  transition-all
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-600

                  ${
                    selected
                      ? "border-blue-600 bg-blue-50 text-blue-700 shadow-[0_8px_22px_rgba(37,99,235,0.1)]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50"
                  }
                `}
              >
                {campus}
              </button>
            );
          })}
        </div>
      </div>

      {availableStudySystems.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-[11px] font-bold text-slate-500">
            Waktu kuliah
          </p>

          <div
            className="grid gap-2 sm:grid-cols-3"
            role="radiogroup"
            aria-label="Pilih waktu kuliah"
          >
            {availableStudySystems.map((system) => {
              const selected = selectedSession === system.session;

              return (
                <button
                  key={system.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onSessionChange(system.session)}
                  className={`
                    min-h-12 rounded-2xl border px-3
                    text-left text-xs font-extrabold leading-4
                    transition-all
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-600

                    ${
                      selected
                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-[0_8px_22px_rgba(37,99,235,0.1)]"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50"
                    }
                  `}
                >
                  {studySessionLabels[system.session] ?? system.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </ChoiceSection>
  );
}
