import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function NextActionCard({
  action,
  label,
  href,
}: {
  action: string;
  label: string;
  href: string;
}) {
  return (
    <aside className="rounded-[28px] border border-blue-100 bg-blue-50 p-6">
      <div className="flex items-center gap-2 text-blue-700">
        <CheckCircle2 className="size-5" />
        <p className="text-xs font-extrabold uppercase tracking-[0.14em]">
          Langkah berikutnya
        </p>
      </div>
      <p className="mt-4 text-sm font-bold leading-6 text-slate-900">
        {action}
      </p>
      <Link
        href={href}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
      >
        {label}
        <ArrowRight className="size-4" />
      </Link>
    </aside>
  );
}
