import Link from "next/link";
import { ArrowUp, LogOut } from "lucide-react";
import { CampusLogo } from "@/components/CampusLogo";
import { useAuth } from "@/providers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function PmbSiteHeader() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  async function handleLogout() {
    logout();
    toast.success("Logout berhasil");
    router.push("/");
  }

  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label="Kembali ke Landing Page PMB"
          className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
        >
          <CampusLogo />
        </Link>
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 sm:px-4 sm:text-sm"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 sm:px-5"
          >
            Login
            <ArrowUp className="hidden size-4 sm:block" />
          </Link>
        )}
      </div>
    </header>
  );
}
