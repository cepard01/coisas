import type { Metadata } from "next";
import { Nunito, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DaisyFlower — The deterministic gardening simulator for Discord",
  description:
    "DaisyFlower is a cozy, UI-first gardening game for Discord. Plant seeds, react to weather, harvest flowers, discover mutations, and grow your botanical collection — all through buttons, menus, and guided panels.",
  keywords: [
    "DaisyFlower",
    "Discord bot",
    "gardening game",
    "farm simulator",
    "Discord game",
    "TypeScript bot",
    "cozy game",
    "deterministic simulation",
  ],
  authors: [{ name: "DaisyFlower Project" }],
  openGraph: {
    title: "DaisyFlower — The deterministic gardening simulator for Discord",
    description:
      "Plant seeds, care for your garden, react to weather, harvest flowers, and discover rare mutations — all inside Discord.",
    siteName: "DaisyFlower",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DaisyFlower — Gardening simulator for Discord",
    description:
      "A cozy, UI-first gardening game built with TypeScript, Discord.js v14, MongoDB, and Redis.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${fraunces.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
