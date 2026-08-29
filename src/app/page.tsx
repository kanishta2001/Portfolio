import { About } from "@/components/portfolio/about";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { Hero } from "@/components/portfolio/hero";
import { Navbar } from "@/components/portfolio/navbar";
import { Projects } from "@/components/portfolio/projects";
import { SectionTransition } from "@/components/portfolio/section-transition";
import { Skills } from "@/components/portfolio/skills";
import { Timeline } from "@/components/portfolio/timeline";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-background transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <SectionTransition>
          <About />
        </SectionTransition>
        <Projects />
        <SectionTransition>
          <Timeline />
        </SectionTransition>
        <SectionTransition variant="scale">
          <Skills />
        </SectionTransition>
        <SectionTransition variant="scale">
          <Contact />
        </SectionTransition>
      </main>
      <Footer />
    </>
  );
}
