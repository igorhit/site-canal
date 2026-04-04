import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caminho dos Campeões Builds",
  description: "Builds para Caminho dos Campeões",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.className}>
      <body className="min-h-screen bg-[#0a0e1a]">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
