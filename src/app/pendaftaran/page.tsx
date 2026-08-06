import { PendaftaranPage } from "@/features/pendaftaran/page/PendaftaranPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pendaftaran Mahasiswa Baru | PMB Universitas Arunika",
  description:
    "Daftar akun, pilih program studi, dan mulai proses Penerimaan Mahasiswa Baru Universitas Arunika.",
};

export default async function Pendaftaran({
  searchParams,
}: {
  searchParams: Promise<{
    program_studi?: string | string[];
  }>;
}) {
  const query = await searchParams;

  const initialProgramId =
    typeof query.program_studi === "string" ? query.program_studi : undefined;

  return <PendaftaranPage initialProgramId={initialProgramId} />;
}
