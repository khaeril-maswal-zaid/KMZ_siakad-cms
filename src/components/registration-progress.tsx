import { Check } from "lucide-react";

const registrationSteps = [
  { number: 1, label: "Pilih Prodi" },
  { number: 2, label: "Registrasi" },
  { number: 3, label: "Dashboard" },
  { number: 4, label: "Pembayaran" },
  { number: 5, label: "Formulir" },
] as const;

export function RegistrationProgress({
  currentStep,
}: {
  currentStep: 1 | 2 | 3 | 4 | 5;
}) {
  return (
    <ol
      className="grid grid-cols-5"
      aria-label="Tahapan pendaftaran PMB"
    >
      {registrationSteps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <li className="relative" key={step.number}>
            {index < registrationSteps.length - 1 && (
              <span
                aria-hidden
                className={`absolute left-[calc(50%+22px)] right-[calc(-50%+22px)] top-5 h-0.5 ${
                  step.number < currentStep ? "bg-blue-600" : "bg-slate-200"
                }`}
              />
            )}
            <div className="relative flex flex-col items-center text-center">
              <span
                className={`grid size-10 place-items-center rounded-full border-2 text-xs font-black transition-colors ${
                  isCompleted
                    ? "border-blue-600 bg-blue-600 text-white"
                    : isActive
                      ? "border-blue-600 bg-white text-blue-700 shadow-[0_0_0_5px_rgba(37,99,235,0.1)]"
                      : "border-slate-200 bg-white text-slate-400"
                }`}
              >
                {isCompleted ? <Check className="size-4" /> : step.number}
              </span>
              <span
                className={`mt-3 text-[9px] font-bold leading-3.5 sm:text-[11px] sm:leading-4 ${
                  isActive || isCompleted ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
