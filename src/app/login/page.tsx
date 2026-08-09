import { LoginPage } from "@/features/auth/login/page/LoginPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Camaba | PMB Universitas Arunika",
  description:
    "Masuk ke dashboard calon mahasiswa untuk melanjutkan proses PMB.",
};

export default function Page() {
  return <LoginPage />;
}
