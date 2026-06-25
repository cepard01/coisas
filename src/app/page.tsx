import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { GameplayLoop } from "@/components/site/GameplayLoop";
import { Catalog } from "@/components/site/Catalog";
import { Commands } from "@/components/site/Commands";
import { TechStack } from "@/components/site/TechStack";
import { PlayerJourney } from "@/components/site/PlayerJourney";
import { GettingStarted } from "@/components/site/GettingStarted";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <GameplayLoop />
        <Catalog />
        <Commands />
        <TechStack />
        <PlayerJourney />
        <GettingStarted />
      </main>
      <Footer />
    </div>
  );
}
