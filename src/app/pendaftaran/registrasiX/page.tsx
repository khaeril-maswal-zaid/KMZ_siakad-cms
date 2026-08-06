import RegistrationPage from "@/features/registration/page/RegistrationPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrasi Akun | PMB Universitas Arunika",
  description: "Buat akun calon mahasiswa untuk memantau seluruh proses PMB.",
};

export default function Page() {
  return <RegistrationPage />;
}
