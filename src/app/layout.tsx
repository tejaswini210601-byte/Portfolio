import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PROFILE, asset } from "@/lib/data";

// Fonts are self-hosted from src/fonts (no Google Fonts request at runtime).
const interTight = localFont({
  src: "../fonts/InterTight.woff2",
  variable: "--font-inter-tight",
  weight: "100 900",
  display: "swap",
});
const instrument = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.woff2", style: "normal", weight: "400" },
    { path: "../fonts/InstrumentSerif-Italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-instrument",
  display: "swap",
});
const jetbrains = localFont({
  src: "../fonts/JetBrainsMono.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.shortRole}`,
  description: PROFILE.resumeSummary,
  icons: { icon: asset("/favicon.svg") },
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.shortRole}`,
    description: PROFILE.role,
    images: [asset("/og.jpg")],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#f4f2ee", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
