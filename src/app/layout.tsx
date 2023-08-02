import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Providers } from "./providers";

const roboto = Roboto({
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Pesquisador de livros",
  description: "procure seus livros aqui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={roboto.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
