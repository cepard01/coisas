import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DaisyFlower — A gardening simulator for Discord",
  description:
    "DaisyFlower is a cozy, UI-first gardening game for Discord. Plant seeds, react to weather, harvest flowers, discover mutations, and grow your botanical collection.",
  keywords: [
    "DaisyFlower",
    "Discord bot",
    "gardening game",
    "farm simulator",
    "Discord game",
    "cozy game",
  ],
  authors: [{ name: "DaisyFlower Project" }],
  openGraph: {
    title: "DaisyFlower — A gardening simulator for Discord",
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
        className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
