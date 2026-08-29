import {
  ArrowDownToLine,
  ArrowRight,
  BriefcaseBusiness,
  GitBranch,
  Mail,
  Sparkles,
} from "lucide-react";
import { highlights, profile } from "@/data/portfolio";

const coreStack = ["Next.js", "React", "TypeScript", "C#", "ASP.NET Core", "SQL Server"];

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20">
      <div aria-hidden="true" className="absolute top-1/3 -left-40 size-96 rounded-full bg-primary/20 blur-[120px]" />
      <div aria-hidden="true" className="absolute right-0 bottom-16 size-80 rounded-full bg-secondary/15 blur-[110px]" />

      <div className="site-container relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-zinc-400">
            <Sparkles size={15} className="text-highlight" aria-hidden="true" />
            Hi, I&apos;m {profile.name}
          </div>

          <h1 className="font-heading max-w-3xl text-5xl leading-[0.98] font-bold tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.75rem]">
            <span className="text-gradient">Full-Stack</span>
            <br />
            Web Developer
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            I build modern web applications using React, Next.js, C#, ASP.NET Core, and SQL Server.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-indigo-400 px-6 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(167,139,250,0.2)] transition-transform hover:-translate-y-0.5"
            >
              View Projects <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-6 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <ArrowDownToLine size={17} aria-hidden="true" /> Download CV
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 px-6 text-sm font-medium text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
            >
              <Mail size={17} aria-hidden="true" /> Contact Me
            </a>
          </div>

          <div className="mt-7 flex items-center gap-3" aria-label="Social profiles">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-highlight/40 hover:text-white"
              aria-label="Visit Nipun's GitHub profile"
            >
              <GitBranch size={18} aria-hidden="true" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-highlight/40 hover:text-white"
              aria-label="Visit Nipun's LinkedIn profile"
            >
              <BriefcaseBusiness size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="glass-card relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#0c0d1c] p-5 sm:p-7">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex gap-2" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-highlight/80" />
                <span className="size-2.5 rounded-full bg-indigo-400/70" />
                <span className="size-2.5 rounded-full bg-white/20" />
              </div>
              <span className="font-mono text-[0.68rem] tracking-[0.2em] text-zinc-500 uppercase">developer.profile</span>
            </div>
            <p className="font-mono text-sm text-zinc-500">&lt;developer&gt;</p>
            <div className="py-7 pl-5 sm:pl-8">
              <p className="font-heading text-2xl font-semibold text-white">Nipun Karunarathna</p>
              <p className="mt-2 text-sm text-highlight">{profile.status}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {coreStack.map((item) => (
                  <span key={item} className="rounded-lg border border-white/8 bg-white/[0.035] px-3 py-2 text-xs text-zinc-400">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <p className="font-mono text-sm text-zinc-500">&lt;/developer&gt;</p>
          </div>

          <div className="mt-4 space-y-3">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
                <p className="text-sm font-semibold text-zinc-100">{item.title}</p>
                <p className="mt-1.5 text-xs leading-5 text-zinc-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
