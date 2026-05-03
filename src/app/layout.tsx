import type { Metadata } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-c",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-b",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ader Studio — Arquitectura",
  description:
    "Aportando valor arquitectónico a través del diseño contextual, la honestidad material y la precisión tecnológica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${barlowCondensed.variable} ${barlow.variable}`}>
      <head>
        <link rel="preload" href="/images/logo-mark.jpg" as="image" />
        <link rel="preload" href="/images/logo-full.jpg" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
