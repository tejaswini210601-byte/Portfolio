import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PROFILE, asset } from "@/lib/data";

// Fonts are stored in src/fonts (no Google Fonts request at runtime).
// Fredoka = round, friendly headings · Nunito = soft, readable body text.
const fredoka = localFont({ src: "../fonts/Fredoka.woff2", variable: "--font-fredoka", weight: "300 700", display: "swap" });
const nunito = localFont({ src: "../fonts/Nunito.woff2", variable: "--font-body", weight: "200 1000", display: "swap" });
const script = localFont({ src: "../fonts/DancingScript-Bold.woff2", variable: "--font-script", weight: "700", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://tejaswini210601-byte.github.io"),
  title: `${PROFILE.name} | Coding, Robotics & Maths Educator`,
  description: PROFILE.resumeSummary,
  icons: { icon: asset("/favicon.svg") },
  openGraph: {
    title: `${PROFILE.name} | Coding, Robotics & Maths Educator`,
    description: "Helping kids aged 5–17 fall in love with coding, robotics and maths. 500+ students, 6+ years.",
    images: [asset("/og.jpg")],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#f1a323", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
