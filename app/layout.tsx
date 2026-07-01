import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Alex Moreno — Desarrollador Full Stack",
  description:
    "Portafolio personal de Alex Moreno, desarrollador full stack especializado en experiencias web modernas, escalables y de alto rendimiento.",
  keywords: ["portafolio", "desarrollador", "full stack", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Alex Moreno" }],
  openGraph: {
    title: "Alex Moreno — Desarrollador Full Stack",
    description: "Portafolio personal de Alex Moreno, desarrollador full stack.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} bg-[#0f0f0f] text-[#e2e8f0] antialiased`}
      >
        <LocaleProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <LanguageToggle />
        </LocaleProvider>
      </body>
    </html>
  );
}