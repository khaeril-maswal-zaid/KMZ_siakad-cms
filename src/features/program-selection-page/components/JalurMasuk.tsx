import { Check, Route } from "lucide-react";
import type { AdmissionPath } from "@/features/master/admission-path/types";
import { ChoiceSection } from "./ChoiceSection";

type JalurMasukProps = {
  admissionPaths: AdmissionPath[];
  selectedAdmissionPathId: string;
  onAdmissionPathChange: (id: string) => void;
};

export function JalurMasuk({
  admissionPaths,
  selectedAdmissionPathId,
  onAdmissionPathChange,
}: JalurMasukProps) {
  return (
    <ChoiceSection
      icon={<Route className="size-5" />}
      eyebrow="Jalur masuk"
      title="Tentukan jalur pendaftaran."
      description="Pilih jalur yang sesuai dengan riwayat pendidikan dan skema masukmu."
    >
      <div
        className="grid gap-3"
        role="radiogroup"
        aria-label="Pilih jalur masuk"
      >
        {admissionPaths.map((path) => {
          const selected = selectedAdmissionPathId === path.id;

          return (
            <button
              key={path.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onAdmissionPathChange(path.id)}
              className={`
                group rounded-2xl border p-4
                text-left transition-all

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-600

                ${
                  selected
                    ? "border-blue-600 bg-blue-50/80 shadow-[0_10px_30px_rgba(37,99,235,0.1)]"
                    : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                }
              `}
            >
              <span className="flex items-start justify-between gap-4">
                <span className="min-w-0">
                  <span className="block text-sm font-extrabold leading-5 text-slate-950">
                    {path.name}
                  </span>

                  <span className="mt-2 block text-xs leading-5 text-slate-500">
                    {path.description}
                  </span>
                </span>

                <span
                  className={`
                    grid size-6 shrink-0
                    place-items-center
                    rounded-full border

                    ${
                      selected
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 text-transparent group-hover:border-blue-200"
                    }
                  `}
                >
                  <Check className="size-3.5" />
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </ChoiceSection>
  );
}
