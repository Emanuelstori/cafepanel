import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Café Dourado Painel",
  description: "Painel da Café Dourado",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Providers>
          <main className="w-screen h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
