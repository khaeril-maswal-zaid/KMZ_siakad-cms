import { Mail, MapPin, MessageCircleMore, Phone } from "lucide-react";
import Link from "next/link";
import { CampusLogo } from "@/features/home/components/CampusLogo";
import type { PmbLandingData } from "@/features/home/types";

interface FooterProps {
  campus: PmbLandingData["campus"];
}

export function Footer({ campus }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/70 px-5 pb-8 pt-14 sm:px-8">
      <div className="mx-auto max-w-[1160px]">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.3fr_0.7fr_1fr]">
          {/* Branding */}
          <div>
            <CampusLogo campus={campus} />

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
              {campus.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-bold text-slate-900">Tautan</p>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-500">
              <Link className="hover:text-blue-700" href="#program-studi">
                Program Studi
              </Link>

              <Link className="hover:text-blue-700" href="#alur">
                Alur Pendaftaran
              </Link>

              <Link className="hover:text-blue-700" href="#faq">
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-bold text-slate-900">Kontak PMB</p>

            <div className="mt-5 space-y-3 text-sm text-slate-500">
              <a
                href={campus.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-blue-700"
              >
                <MessageCircleMore className="size-4 text-blue-600" />

                {campus.contact.whatsapp}
              </a>

              <a
                href={`mailto:${campus.contact.email}`}
                className="flex items-center gap-3 hover:text-blue-700"
              >
                <Mail className="size-4 text-blue-600" />

                {campus.contact.email}
              </a>

              <span className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blue-600" />

                {campus.contact.address}
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-3 border-t border-slate-200 pt-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {campus.institutionType} {campus.name}.
            Hak cipta dilindungi.
          </p>

          <p className="inline-flex items-center gap-2">
            <Phone className="size-3.5" />
            Pusat bantuan PMB: {campus.contact.helpHours}
          </p>
        </div>
      </div>
    </footer>
  );
}
