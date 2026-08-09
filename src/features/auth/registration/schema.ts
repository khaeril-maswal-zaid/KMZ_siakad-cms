import { z } from "zod";

export const registrationFormSchema = z
  .object({
    fullName: z.string().min(2, "Nama lengkap wajib diisi"),
    email: z.string().email("Email tidak valid"),
    whatsapp: z.string().min(7, "Nomor WhatsApp wajib diisi"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });
