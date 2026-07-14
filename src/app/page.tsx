import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Manifesto } from "@/components/site/Manifesto";
import { Features } from "@/components/site/Features";
import { GameplayLoop } from "@/components/site/GameplayLoop";
import { Catalog } from "@/components/site/Catalog";
import { Commands } from "@/components/site/Commands";
import { Dashboard } from "@/components/site/Dashboard";
import { TechStack } from "@/components/site/TechStack";
import { PlayerJourney } from "@/components/site/PlayerJourney";
import { Roadmap } from "@/components/site/Roadmap";
import { Changelog } from "@/components/site/Changelog";
import { FAQ } from "@/components/site/FAQ";
import { GettingStarted } from "@/components/site/GettingStarted";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Manifesto />
        <Features />
        <GameplayLoop />
        <Catalog />
        <Commands />
        <Dashboard />
        <TechStack />
        <PlayerJourney />
        <Roadmap />
        <Changelog />
        <FAQ />
        <GettingStarted />
      </main>
      <Footer />
    </div>
  );
}
