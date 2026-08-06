export function ChoiceSection({
  icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(30,64,110,0.06)] sm:p-7">
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
          {icon}
        </span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-600">
            {eyebrow}
          </p>
          <h2 className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-slate-950">
            {title}
          </h2>
          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
