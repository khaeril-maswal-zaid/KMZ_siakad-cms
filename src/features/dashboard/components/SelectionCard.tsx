"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useCampusProfile } from "@/hooks/campus-profile";
import type { DashboardSelection } from "../types";
import { useUpdateSelection } from "../hooks";
import { StudyProgramDialog } from "./study-program-dialog";
import { FieldSummaryCard } from "@/components/FieldSummaryCard";

export function SelectionCard({
  selection,
}: {
  selection: DashboardSelection;
}) {
  const campus = useCampusProfile();
  const [selectionDialogOpen, setSelectionDialogOpen] = useState(false);
  const updateSelectionMutation = useUpdateSelection();

  async function handleConfirm(values: {
    programId: string;
    studySystemId: string;
    admissionPathId: string;
  }) {
    try {
      await updateSelectionMutation.mutateAsync({
        study_program_id: values.programId,
        class_schedule_id: values.studySystemId,
        admission_path_id: values.admissionPathId,
      });

      toast.success("Pilihan studi berhasil diperbarui.");
      setSelectionDialogOpen(false);
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

      toast.error(responseData?.message ?? "Pilihan studi gagal diperbarui.", {
        description:
          validationMessages || "Silakan periksa pilihan dan coba lagi.",
      });
    }
  }

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
        <FieldSummaryCard selection={selection} />

        <button
          type="button"
          onClick={() => setSelectionDialogOpen(true)}
          className="min-h-11 w-full rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        >
          Ubah pilihan studi
        </button>
      </div>

      {selectionDialogOpen && (
        <StudyProgramDialog
          open
          currentSelection={{
            programId: selection.programId,
            studySystemId: selection.studySystemId,
            admissionPathId: selection.admissionPathId,
          }}
          isSaving={updateSelectionMutation.isPending}
          onClose={() => {
            if (!updateSelectionMutation.isPending) {
              setSelectionDialogOpen(false);
            }
          }}
          onConfirm={(values) => void handleConfirm(values)}
        />
      )}
    </aside>
  );
}
