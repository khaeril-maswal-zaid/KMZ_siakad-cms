import { Info } from "lucide-react";

export function Information() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3.5 text-xs text-blue-800">
      <Info className="size-4" />

      <span>
        Program studi, sistem kuliah, dan jalur masuk akan tersimpan dalam
        ringkasan pendaftaran.
      </span>
    </div>
  );
}
