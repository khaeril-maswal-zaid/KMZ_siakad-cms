import React from "react";

export function PaymentDetail({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 flex items-center gap-2 text-sm font-extrabold leading-5 text-slate-950">
        {icon && <span className="text-blue-600">{icon}</span>}
        {value}
      </p>
    </div>
  );
}

export default PaymentDetail;
