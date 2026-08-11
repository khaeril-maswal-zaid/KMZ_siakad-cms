"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { PmbFlowShell } from "@/components/PmbFowShell";
import { LoadingComponent } from "@/components/LoadingComponent";
import { ErrorComponent } from "@/components/ErrorComponent";
import { RegistrationForm } from "../components/RegistrationForm";
import { RegistrationSummary } from "../components/RegistrationSummary";
import { useRegisterUser, useRegistrationData } from "../hooks";
import { registrationFormSchema } from "../schema";
import type { RegistrationFormValues } from "../types";

export default function RegistrationPage({
  prevStep,
}: {
  prevStep: () => void;
}) {
  const { selection, waveName, registrationFee, isLoading, error, refetch } =
    useRegistrationData();

  const registrationForm = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      whatsapp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerUserMutation = useRegisterUser();

  async function handleSubmit(values: RegistrationFormValues) {
    if (!selection) {
      toast.error("Pilihan program belum tersedia.");
      return;
    }

    try {
      await registerUserMutation.mutateAsync({
        full_name: values.fullName,
        email: values.email,
        phone: values.whatsapp,
        password: values.password,
        password_confirmation: values.confirmPassword,
        admission_path_id: selection.admissionPathId,
        class_schedule_id: selection.studySystemId,
        study_program_id: selection.programId,
      });
      toast.success("Akun pendaftaran berhasil dibuat.");
    } catch (requestError: unknown) {
      const responseData = axios.isAxiosError(requestError)
        ? (requestError.response?.data as
            | {
                message?: string;
                errors?: Record<string, string[]>;
              }
            | undefined)
        : undefined;

      const validationMessages = Object.entries(responseData?.errors ?? {})
        .flatMap(([field, messages]) =>
          messages.map((message) => `${field}: ${message}`),
        )
        .join("\n");

      toast.error(responseData?.message ?? "Pendaftaran gagal.", {
        description:
          validationMessages || "Silakan periksa data dan coba lagi.",
      });
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
        <RegistrationForm form={registrationForm} />

        <RegistrationSummary
          selection={selection}
          waveName={waveName}
          registrationFee={registrationFee}
          onSubmit={() => {
            void registrationForm.handleSubmit(handleSubmit)();
          }}
          prevStep={prevStep}
          disabled={!selection}
          isLoading={registerUserMutation.isPending}
        />
      </section>
    </PmbFlowShell>
  );
}
