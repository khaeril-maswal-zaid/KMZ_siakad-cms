"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PmbFlowShell } from "@/components/PmbFowShell";
import { LoadingComponent } from "@/components/LoadingComponent";
import { ErrorComponent } from "@/components/ErrorComponent";
import { RegistrationForm } from "../components/RegistrationForm";
import { RegistrationSummary } from "../components/RegistrationSummary";
import { useRegistrationData } from "../hooks";
import type { RegistrationFormValues } from "../types";

export default function RegistrationPage({
  prevStep,
}: {
  prevStep: () => void;
}) {
  const { selection, waveName, registrationFee, isLoading, error, refetch } =
    useRegistrationData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(values: RegistrationFormValues) {
    setIsSubmitting(true);
    try {
      toast.success("Data registrasi berhasil disimpan sementara.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent refetch={refetch} />;
  }

  return (
    <PmbFlowShell
      currentStep={2}
      eyebrow="Tahap 2 dari 5"
      title="Buat akun pendaftaranmu."
      description="Isi data akun yang aktif agar seluruh informasi dan progres PMB dapat kamu pantau dengan aman."
    >
      <section className="mx-auto grid max-w-[1180px] gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:px-10">
        <RegistrationForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

        <RegistrationSummary
          selection={selection}
          waveName={waveName}
          registrationFee={registrationFee}
          onSubmit={() => {
            toast.info("Aksi ringkasan belum terhubung ke backend.");
          }}
          prevStep={prevStep}
          disabled={!selection}
          isLoading={isSubmitting}
        />
      </section>
    </PmbFlowShell>
  );
}
