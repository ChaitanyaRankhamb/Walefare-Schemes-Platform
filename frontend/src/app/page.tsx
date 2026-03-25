import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { TechStack } from "@/components/sections/TechStack";
import { OAuthGuide } from "@/components/sections/OAuthGuide";
import { PasswordlessSection } from "@/components/sections/PasswordlessSection";
import { Architecture } from "@/components/sections/Architecture";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Features />
        <TechStack />
        <OAuthGuide />
        <PasswordlessSection />
        <Architecture />
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              AuthFlow
            </div>
            <p className="text-muted-foreground text-sm">
              &copy; 2026 AuthFlow Authentication System. Built with security in
              mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
