import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pembayaran | PMB Universitas Arunika",
  description:
    "Selesaikan pembayaran biaya pendaftaran melalui Virtual Account.",
};

export default function Page() {
  return <PaymentPage />;
}
