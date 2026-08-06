"use client";

import type { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AtSign,
  Eye,
  EyeOff,
  LockKeyhole,
  Phone,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import type { RegistrationFormValues } from "../types";
import { registrationFormSchema } from "../schema";

const inputClassName =
  "min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

export function RegistrationForm({
  onSubmit,
  isSubmitting = false,
}: {
  onSubmit: (values: RegistrationFormValues) => void;
  isSubmitting?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
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

  const password = useWatch({ control, name: "password" });
  const passwordScore = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  return (
    <form
      id="registration-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7"
      noValidate
    >
      <div className="overflow-hidden rounded-[28px] border border-blue-100 bg-blue-50/70 p-5 shadow-[0_14px_45px_rgba(30,64,110,0.04)] sm:p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-700">
          Buat akun camaba
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
          Satu akun untuk seluruh proses PMB.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Akun ini akan menjadi akses utama untuk masuk ke dashboard,
          melanjutkan pembayaran, mengisi formulir, dan melihat jadwal Seleksi
          Tes Potensi Akademik setelah data pendaftaran dikirim. Gunakan email
          dan nomor WhatsApp aktif agar informasi PMB mudah diterima.
        </p>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(30,64,110,0.06)] sm:p-7">
        <div className="flex items-start gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
            <UserRound className="size-5" />
          </span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-600">
              Data akun
            </p>
            <h2 className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-slate-950">
              Kenalkan dirimu.
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Gunakan email dan nomor WhatsApp yang selalu aktif.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FormField
            label="Nama lengkap"
            error={errors.fullName?.message}
            icon={<UserRound className="size-4" />}
          >
            <input
              {...register("fullName")}
              className={`${inputClassName} pl-11`}
              placeholder="Sesuai identitas resmi"
              autoComplete="name"
            />
          </FormField>

          <FormField
            label="Email"
            error={errors.email?.message}
            icon={<AtSign className="size-4" />}
          >
            <input
              {...register("email")}
              type="email"
              className={`${inputClassName} pl-11`}
              placeholder="nama@email.com"
              autoComplete="email"
            />
          </FormField>

          <FormField
            label="Nomor WhatsApp"
            error={errors.whatsapp?.message}
            icon={<Phone className="size-4" />}
          >
            <input
              {...register("whatsapp")}
              inputMode="numeric"
              className={`${inputClassName} pl-11`}
              placeholder="08xxxxxxxxxx"
              autoComplete="tel"
            />
          </FormField>

          <FormField
            label="Password"
            error={errors.password?.message}
            icon={<LockKeyhole className="size-4" />}
            action={
              <PasswordToggle
                visible={showPassword}
                onClick={() => setShowPassword((current) => !current)}
              />
            }
          >
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className={`${inputClassName} px-11`}
              placeholder="Minimal 8 karakter"
              autoComplete="new-password"
            />
          </FormField>

          <div className="sm:col-start-2">
            <div className="mb-2 grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((item) => (
                <span
                  key={item}
                  className={`h-1.5 rounded-full transition-colors ${
                    item <= passwordScore ? "bg-blue-600" : "bg-slate-100"
                  }`}
                />
              ))}
            </div>
            <p className="text-[11px] leading-4 text-slate-400">
              Password lebih kuat dengan huruf besar, angka, dan simbol.
            </p>
          </div>

          <div className="sm:col-span-2 sm:max-w-[calc(50%-0.625rem)]">
            <FormField
              label="Konfirmasi password"
              error={errors.confirmPassword?.message}
              icon={<LockKeyhole className="size-4" />}
              action={
                <PasswordToggle
                  visible={showConfirmation}
                  onClick={() => setShowConfirmation((current) => !current)}
                />
              }
            >
              <input
                {...register("confirmPassword")}
                type={showConfirmation ? "text" : "password"}
                className={`${inputClassName} px-11`}
                placeholder="Ulangi password"
                autoComplete="new-password"
              />
            </FormField>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Menyimpan..." : "Simpan dan lanjutkan"}
        </button>
      </div>
    </form>
  );
}

function FormField({
  label,
  error,
  icon,
  action,
  children,
}: {
  label: string;
  error?: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        {children}
        {action}
      </span>
      {error && (
        <span className="mt-1.5 block text-xs font-medium text-rose-600">
          {error}
        </span>
      )}
    </label>
  );
}

function PasswordToggle({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
      className="absolute right-2.5 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
    >
      {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </button>
  );
}
