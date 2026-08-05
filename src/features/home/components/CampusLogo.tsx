import { GraduationCap } from "lucide-react";

import type { CampusProfile } from "@/features/home/types";

type CampusLogoProps = {
  campus: Pick<CampusProfile, "institutionType" | "name">;

  compact?: boolean;
};

export function CampusLogo({ campus, compact = false }: CampusLogoProps) {
  return (
    <div
      className="flex items-center gap-3"
      aria-label={`${campus.institutionType} ${campus.name}`}
    >
      <span
        className="
          relative grid size-10 shrink-0 
          place-items-center overflow-hidden 
          rounded-[14px] 
          bg-[#1267e8] 
          text-white 
          shadow-[0_8px_20px_rgba(18,103,232,0.25)]
        "
      >
        <span
          className="
            absolute 
            -right-2 
            -top-3 
            size-7 
            rounded-full 
            bg-cyan-300/50
          "
        />

        <GraduationCap className="relative size-5" strokeWidth={2.2} />
      </span>

      {!compact && (
        <span className="leading-none">
          <span
            className="
              block 
              text-[10px] 
              font-bold 
              uppercase 
              tracking-[0.22em] 
              text-[#1267e8]
            "
          >
            {campus.institutionType}
          </span>

          <span
            className="
              mt-1 
              block 
              text-[17px] 
              font-bold 
              tracking-[-0.03em] 
              text-slate-950
            "
          >
            {campus.name}
          </span>
        </span>
      )}
    </div>
  );
}
