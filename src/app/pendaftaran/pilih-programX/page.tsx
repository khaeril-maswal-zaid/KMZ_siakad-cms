import { ProgramSelectionPage } from "@/features/program-selection/page/ProgramSelectionPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pilih Program Studi | PMB Universitas Arunika",
  description:
    "Konfirmasi program studi untuk memulai pendaftaran mahasiswa baru.",
};

export default async function ChooseProgramPage({
  searchParams,
}: {
  searchParams: Promise<{
    program_studi?: string | string[];
  }>;
}) {
  const query = await searchParams;

  const initialProgramId =
    typeof query.program_studi === "string" ? query.program_studi : undefined;

  return <ProgramSelectionPage initialProgramId={initialProgramId} />;
}
