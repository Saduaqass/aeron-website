import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "AERON — Beyond Electric",
  description: "AERON ONE — электрический спортседан нового поколения. Технология, воплощённая в движении.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
