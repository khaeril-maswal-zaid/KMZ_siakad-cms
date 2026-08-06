import QueryProvider from "@/providers/query-provider";
import type { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full">
        <QueryProvider>{children}</QueryProvider>
        <Toaster
          richColors
          closeButton
          position="top-center"
          toastOptions={{ className: "font-sans" }}
        />
      </body>
    </html>
  );
}
