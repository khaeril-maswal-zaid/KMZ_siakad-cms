import { RegistrationFlowPage } from "@/features/registration-flow/page/RegistrationFlowPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pendaftaran Mahasiswa Baru | PMB Universitas Arunika",
  description:
    "Daftar akun, pilih program studi, dan mulai proses Penerimaan Mahasiswa Baru Universitas Arunika.",
};

export default async function RegistrationRoute({
  searchParams,
}: {
  searchParams: Promise<{
    program_studi?: string | string[];
  }>;
}) {
  const query = await searchParams;

  const initialProgramId =
    typeof query.program_studi === "string" ? query.program_studi : undefined;

  return <RegistrationFlowPage initialProgramId={initialProgramId} />;
}
