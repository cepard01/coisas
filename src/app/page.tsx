import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { HowToPlay } from "@/components/site/HowToPlay";
import { GardenGallery } from "@/components/site/GardenGallery";
import { Dashboard } from "@/components/site/Dashboard";
import { FAQ } from "@/components/site/FAQ";
import { GetStarted } from "@/components/site/GetStarted";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowToPlay />
        <GardenGallery />
        <Dashboard />
        <FAQ />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
}
