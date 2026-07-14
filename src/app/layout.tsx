import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { I18nProvider } from "@/hooks/use-i18n";
import { LangUpdater } from "@/components/site/LangUpdater";

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
  title: "DaisyFlower — Grow your garden inside Discord",
  description:
    "DaisyFlower is a calm garden game for Discord. Plant seeds, tend to flowers, react to weather, and discover rare mutations. Free, multilingual.",
  keywords: [
    "DaisyFlower",
    "Discord bot",
    "garden game",
    "farm simulator",
    "Discord game",
    "cozy game",
  ],
  authors: [{ name: "DaisyFlower" }],
  openGraph: {
    title: "DaisyFlower — Grow your garden inside Discord",
    description:
      "Plant seeds, tend to your garden, react to weather, and discover rare mutations — all inside Discord.",
    siteName: "DaisyFlower",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DaisyFlower — Garden game for Discord",
    description: "A calm garden simulator, free and multilingual, for Discord.",
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
        <I18nProvider>
          <LangUpdater />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
