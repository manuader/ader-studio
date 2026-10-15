import type { Metadata } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";
import { introSkipScript } from "@/components/logo-intro/introState";

// Apply before first paint; normal in-page menu navigation still follows anchors.
const mobileStartScript = `(function(){if(!matchMedia('(max-width: 900px)').matches || location.pathname !== '/')return;history.scrollRestoration='manual';function top(){if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);window.scrollTo({top:0,left:0,behavior:'instant'});}top();window.addEventListener('pageshow',top);window.addEventListener('load',top,{once:true});})();`;

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
    <html lang="es" className={`${barlowCondensed.variable} ${barlow.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introSkipScript }} />
        <script dangerouslySetInnerHTML={{ __html: mobileStartScript }} />
        <link rel="preload" href="/images/logo-mark.webp" as="image" />
        <link rel="preload" href="/images/logo-full.webp" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
