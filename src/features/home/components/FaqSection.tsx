import { CircleHelp } from "lucide-react";

import type { FaqItem } from "@/features/home/types";
type FaqSectionProps = {
  faqs: FaqItem[];
};

export function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <section id="faq" className="scroll-mt-16 px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-[1160px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
            <CircleHelp className="size-5" />
          </span>

          <p className="section-kicker mt-7">Pertanyaan umum</p>

          <h2 className="mt-4 text-4xl font-bold tracking-[-0.05em] text-slate-950 sm:text-5xl">
            Masih ada yang ingin ditanyakan?
          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
            Temukan jawaban cepat atau hubungi tim PMB untuk bantuan yang lebih
            personal.
          </p>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((item, index) => (
            <details className="faq-item group py-1" key={item.id}>
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-base font-bold text-slate-950 marker:hidden">
                <span className="flex items-center gap-4">
                  <span className="text-xs font-black text-blue-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {item.question}
                </span>

                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition-all group-open:rotate-45 group-open:bg-blue-600 group-open:text-white">
                  <span className="text-xl font-light leading-none">+</span>
                </span>
              </summary>

              <p className="pb-7 pl-10 pr-12 text-sm leading-7 text-slate-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
