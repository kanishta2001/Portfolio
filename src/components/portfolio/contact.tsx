import { ArrowDownToLine, ArrowUpRight, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import BorderGlow from "@/components/ui/border-glow";
import { profile } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-24">
      <div className="site-container">
        <Reveal>
          <BorderGlow
            className="interactive-surface"
            edgeSensitivity={28}
            glowColor="203 36 64"
            backgroundColor="#08111b"
            borderRadius={32}
            glowRadius={34}
            glowIntensity={0.72}
            coneSpread={24}
            colors={["#8aacbe", "#e0e7ff", "#64788a"]}
            fillOpacity={0.28}
          >
            <div className="relative overflow-hidden px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
              <div aria-hidden="true" className="ambient-orb absolute -top-32 -right-20 size-96 rounded-full bg-primary/30 blur-[100px]" />
              <div aria-hidden="true" className="ambient-orb ambient-orb-reverse absolute -bottom-40 -left-24 size-80 rounded-full bg-secondary/25 blur-[100px]" />
              <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <SectionHeading eyebrow="Contact" title="Let’s Work Together" />
                <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
                  I am open to internship opportunities, collaboration, and learning-focused development projects.
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="premium-button group mt-7 inline-flex items-center gap-2 text-sm font-medium text-violet-200 transition-colors hover:text-white sm:text-base"
                >
                  {profile.email} <ArrowUpRight className="button-arrow" size={17} aria-hidden="true" />
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:w-80 lg:grid-cols-1">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-indigo-400 px-5 text-sm font-semibold text-background transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(138,172,190,0.25)]"
                >
                  <Mail size={17} aria-hidden="true" /> Email Me
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <FiGithub size={17} aria-hidden="true" /> GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <FiLinkedin size={17} aria-hidden="true" /> LinkedIn
                </a>
                <a
                  href={profile.cv}
                  download
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 px-5 text-sm font-medium text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  <ArrowDownToLine size={17} aria-hidden="true" /> Download CV
                </a>
              </div>
              </div>
            </div>
          </BorderGlow>
        </Reveal>
      </div>
    </section>
  );
}
