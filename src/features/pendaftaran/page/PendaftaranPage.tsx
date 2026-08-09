"use client";

import { ProgramSelectionPage } from "@/features/program-selection/page/ProgramSelectionPage";
import RegistrationPage from "@/features/auth/registration/page/RegistrationPage";
import { useState } from "react";

export function PendaftaranPage({
  initialProgramId,
}: {
  initialProgramId?: string;
}) {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && (
        <ProgramSelectionPage
          initialProgramId={initialProgramId}
          nextStep={() => setStep(2)}
        />
      )}
      {step === 2 && <RegistrationPage prevStep={() => setStep(1)} />}
    </>
  );
}
