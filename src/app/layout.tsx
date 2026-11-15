import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { VehicleConfigProvider } from "@/lib/vehicle-config";
import { LocaleProvider } from "@/locales/locale-provider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "AERON — Beyond Electric",
  description: "AERON ONE — жаңа буын электр спортседанының цифрлық концепциясы.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#080a0d" },
    { media: "(prefers-color-scheme: dark)", color: "#080a0d" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LocaleProvider>
          <VehicleConfigProvider>
            <SiteHeader />
            {children}
          </VehicleConfigProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
