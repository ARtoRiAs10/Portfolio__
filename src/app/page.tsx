import { Nav } from "@/components/site/nav";
import { HeroTerminal } from "@/components/terminal/hero-terminal";
import { StatsStrip } from "@/components/site/stats-strip";
import { ProjectExplorer } from "@/components/site/project-explorer";
import { Skills } from "@/components/site/skills";
import { Process } from "@/components/site/process";
import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <a
        href="#main"
        className="fixed top-4 left-4 z-[90] -translate-y-24 border border-term-green bg-background px-3 py-2 text-[10px] text-term-green transition-transform focus:translate-y-0"
      >
        skip to content
      </a>

      <Nav />

      <main id="main">
        <HeroTerminal />
        <StatsStrip />
        <ProjectExplorer />
        <Skills />
        <Process />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}