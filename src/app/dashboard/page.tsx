import { DashboardPage } from "@/features/dashboard/page/DashboardPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Camaba | PMB Universitas Arunika",
  description:
    "Pantau progres pendaftaran dan status penerimaan mahasiswa baru.",
};

export default function Page() {
  return <DashboardPage />;
}
