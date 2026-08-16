import { ArrowRight, AtSign, Eye, EyeOff, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { loginFormSchema } from "../schema";
import { useLogin } from "../hooks";

const inputClassName =
  "min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

export function FormLogin() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = loginFormSchema.safeParse({
      email: identifier.trim(),
      password,
    });

    if (!parsed.success) {
      const firstMessage = parsed.error.flatten().fieldErrors;
      const message =
        firstMessage.email?.[0] ??
        firstMessage.password?.[0] ??
        "Data login tidak valid";

      toast.error(message);
      return;
    }

    try {
      await loginMutation.mutateAsync(parsed.data);

      toast.success("Login berhasil");
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Login gagal. Periksa email dan password Anda.";

      toast.error(message);
      console.log(message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(30,64,110,0.12)] sm:p-7"
      noValidate
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-600">
        Login Camaba
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
        Selamat datang kembali.
      </h2>

      <div className="mt-7 space-y-5">
        <label className="block">
          <span className="mb-2 block text-xs font-bold text-slate-700">
            Email
          </span>
          <span className="relative block">
            <AtSign className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              className={`${inputClassName} pl-11`}
              placeholder="nama@email.com"
              type="email"
              autoComplete="email"
            />
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold text-slate-700">
            Password
          </span>
          <span className="relative block">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={showPassword ? "text" : "password"}
              className={`${inputClassName} px-11`}
              placeholder="Masukkan password"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={
                showPassword ? "Sembunyikan password" : "Tampilkan password"
              }
              className="absolute right-2.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-wait disabled:bg-blue-400 disabled:hover:translate-y-0"
      >
        {loginMutation.isPending ? "Memproses login..." : "Masuk ke Dashboard"}
        {!loginMutation.isPending && <ArrowRight className="size-4" />}
      </button>

      <p className="mt-5 text-center text-xs leading-5 text-slate-500">
        Belum punya akun?{" "}
        <Link
          href="/pendaftaran"
          className="font-bold text-blue-700 hover:text-blue-800"
        >
          Mulai pendaftaran
        </Link>
      </p>
    </form>
  );
}
