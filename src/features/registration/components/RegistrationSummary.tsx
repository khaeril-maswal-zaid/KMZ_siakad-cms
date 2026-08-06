"use client";

import { SelectionSummaryCard } from "@/components/SelectionSummaryCard";
import type { StudySelection } from "@/features/program-selection-page/types";

export function RegistrationSummary({
  selection,
  waveName,
  registrationFee,
  onSubmit,
  prevStep,
  disabled,
  isLoading = false,
}: {
  selection: StudySelection | null;
  waveName: string;
  registrationFee: number;
  onSubmit: () => void;
  prevStep: () => void;
  disabled: boolean;
  isLoading?: boolean;
}) {
  return (
    <div className="lg:sticky lg:top-6">
      <SelectionSummaryCard
        selection={selection}
        waveName={waveName}
        registrationFee={registrationFee}
        actionLabel="Buat Akun Pendaftaran"
        onAction={onSubmit}
        disabled={disabled}
        isLoading={isLoading}
      />

      <button
        type="button"
        onClick={prevStep}
        className="mt-4 min-h-11 w-full rounded-xl text-xs font-bold text-slate-500 transition-colors hover:bg-white hover:text-blue-700"
      >
        Kembali ke pemilihan program
      </button>
    </div>
  );
}
