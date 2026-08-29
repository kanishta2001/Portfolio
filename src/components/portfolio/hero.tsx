import {
  ArrowDownToLine,
  ArrowRight,
  BriefcaseBusiness,
  GitBranch,
  Mail,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { highlights, profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-20 lg:py-12">
      <div aria-hidden="true" className="absolute top-1/4 -left-40 size-96 rounded-full bg-primary/12 blur-[120px]" />
      <div aria-hidden="true" className="absolute right-0 bottom-12 size-80 rounded-full bg-secondary/8 blur-[120px]" />

      <div className="site-container relative grid items-center gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:gap-16">
        <article className="glass-card overflow-hidden rounded-[2rem] p-4 sm:p-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.45rem] border border-white/10 bg-surface-strong">
            <Image
              src="/images/nipun-avatar.png"
              alt="Illustrated portrait of Nipun Karunarathna working on a laptop"
              fill
              priority
              sizes="(min-width: 1280px) 38vw, (min-width: 768px) 70vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/55 to-transparent" />
          </div>

          <div className="px-1 pt-5 sm:px-2">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-white">{profile.name}</h2>
            <p className="mt-1 text-xs font-medium tracking-[0.08em] text-highlight uppercase">{profile.status}</p>

            <div className="mt-6 space-y-3">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-background/28 px-5 py-4">
                  <p className="text-sm font-semibold text-zinc-100">{item.title}</p>
                  <p className="mt-1.5 text-xs leading-5 text-zinc-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <div className="xl:pl-2">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-zinc-400">
            <Sparkles size={15} className="text-highlight" aria-hidden="true" />
            Hi, I&apos;m {profile.name}
          </div>

          <h1 className="font-heading max-w-3xl text-5xl leading-[0.98] font-bold tracking-[-0.05em] text-white sm:text-6xl xl:text-[4.7rem]">
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
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(235,94,40,0.2)] transition-transform hover:-translate-y-0.5 hover:bg-[#f06b37]"
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
      </div>
    </section>
  );
}
