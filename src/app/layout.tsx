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
  title: "DaisyFlower — Cultive seu jardim dentro do Discord",
  description:
    "DaisyFlower é um jogo de jardim tranquilo para Discord. Plante sementes, cuide das flores, reaja ao clima e descubra mutações raras. Grátis, em português.",
  keywords: [
    "DaisyFlower",
    "bot Discord",
    "jogo de jardim",
    "simulador de fazenda",
    "jogo Discord",
    "jogo tranquilo",
  ],
  authors: [{ name: "DaisyFlower" }],
  openGraph: {
    title: "DaisyFlower — Cultive seu jardim dentro do Discord",
    description:
      "Plante sementes, cuide do seu jardim, reaja ao clima e descubra mutações raras — tudo dentro do Discord.",
    siteName: "DaisyFlower",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DaisyFlower — Jogo de jardim para Discord",
    description:
      "Um simulador de jardim tranquilo, grátis e em português para Discord.",
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
