"use client";

import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const projectMarks = ["TF", "LK", "SM", "AM"];
const projectAccents = [
  { from: "#eb5e28", to: "#403d39" },
  { from: "#ccc5b9", to: "#eb5e28" },
  { from: "#f08055", to: "#403d39" },
  { from: "#eb5e28", to: "#ccc5b9" },
];

type ProjectVisualProps = {
  project: Project;
  index: number;
  compact?: boolean;
};

function ProjectVisual({ project, index, compact = false }: ProjectVisualProps) {
  const accent = projectAccents[index];

  if (project.image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#1e1d1b]">
        <Image
          src={project.image}
          alt={`${project.title} project screenshot`}
          fill
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${project.title} clean project preview placeholder`}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#1e1d1b] shadow-[0_28px_90px_rgba(0,0,0,0.36)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 78% 16%, ${accent.from}66, transparent 34%), radial-gradient(circle at 16% 86%, ${accent.to}44, transparent 38%)`,
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="relative flex h-full flex-col p-5 sm:p-7">
        <div className="flex items-center justify-between border-b border-white/8 pb-4">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="size-2 rounded-full" style={{ backgroundColor: accent.from }} />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/8" />
          </div>
          <span className="text-[0.6rem] tracking-[0.22em] text-zinc-600 uppercase">Project preview</span>
        </div>

        <div className="grid flex-1 grid-cols-[1fr_auto] items-center gap-5">
          <div>
            <p className="text-[0.62rem] tracking-[0.2em] text-zinc-500 uppercase">{project.category}</p>
            <p className={`font-heading mt-3 font-bold tracking-[-0.06em] text-white/14 ${compact ? "text-5xl" : "text-7xl xl:text-8xl"}`}>
              {projectMarks[index]}
            </p>
          </div>
          <div className="w-24 space-y-2 sm:w-36" aria-hidden="true">
            {[72, 100, 58, 86].map((width, lineIndex) => (
              <span
                key={width}
                className="block h-2 rounded-full bg-white/8"
                style={{ width: `${width}%`, backgroundColor: lineIndex === 1 ? `${accent.from}70` : undefined }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/8 pt-4 text-[0.62rem] tracking-[0.16em] text-zinc-600 uppercase">
          <span>{project.title}</span>
          <span>Screenshot pending</span>
        </div>
      </div>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.githubUrl && !project.liveUrl) {
    return <p className="text-xs tracking-[0.16em] text-zinc-600 uppercase">Links will be added when available</p>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-5 text-sm font-medium text-zinc-200 transition-colors hover:border-highlight/40 hover:bg-highlight/10 hover:text-white"
        >
          <GitBranch size={16} aria-hidden="true" /> Repository <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-5 text-sm font-medium text-zinc-200 transition-colors hover:border-highlight/40 hover:bg-highlight/10 hover:text-white"
        >
          <ExternalLink size={16} aria-hidden="true" /> Live Demo
        </a>
      )}
    </div>
  );
}

export function Projects() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(projects.length - 1, Math.floor(latest * projects.length));
    setActiveIndex(nextIndex);
  });

  const activeProject = projects[activeIndex];

  return (
    <section id="projects" className="relative">
      <div className="site-container py-28 lg:hidden">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Selected Projects"
            description="Scroll through full-stack, mobile, and academic projects that reflect how I learn by building."
          />
        </Reveal>

        <div className="mt-14 space-y-16">
          {projects.map((project, index) => (
            <Reveal key={project.title}>
              <article>
                <div className="mb-5 flex items-center justify-between text-xs tracking-[0.18em] text-zinc-500 uppercase">
                  <span>[ {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} ]</span>
                  {project.status && <span className="text-highlight">{project.status}</span>}
                </div>
                <ProjectVisual project={project} index={index} compact />
                <p className="mt-6 text-xs tracking-[0.16em] text-highlight uppercase">{project.category}</p>
                <h3 className="font-heading mt-3 text-3xl font-bold tracking-tight text-white">{project.title}</h3>
                <p className="mt-2 text-sm font-medium text-zinc-300">{project.subtitle}</p>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{project.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                  {project.technologies.map((technology) => (
                    <li key={technology} className="rounded-full border border-white/10 px-3 py-1.5 text-[0.68rem] text-zinc-400">
                      {technology}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <ProjectLinks project={project} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div
        ref={showcaseRef}
        className="relative hidden lg:block"
        style={{ height: `${projects.length * 100}svh` }}
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[130px]" />
          <div className="site-container relative grid h-full grid-cols-[0.82fr_1.18fr] gap-14 pt-28 pb-12">
            <div className="absolute inset-x-0 top-24 flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-5">
                <h2 className="font-heading text-lg font-bold tracking-[0.28em] text-zinc-200 uppercase">Selected Projects</h2>
                <span className="text-[0.65rem] tracking-[0.2em] text-zinc-600 uppercase">/ Portfolio</span>
              </div>
              <span className="text-[0.65rem] tracking-[0.2em] text-zinc-600 uppercase">Scroll to explore</span>
            </div>

            <div className="flex min-w-0 items-center pt-16" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 34, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -26, filter: "blur(8px)" }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full pr-4"
                >
                  <div className="flex items-center justify-between text-xs tracking-[0.18em] text-zinc-500 uppercase">
                    <span>[ {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} ]</span>
                    {activeProject.status && <span className="text-highlight">{activeProject.status}</span>}
                  </div>
                  <p className="mt-9 text-[0.68rem] tracking-[0.19em] text-highlight uppercase">{activeProject.category}</p>
                  <h3 className="font-heading mt-4 max-w-lg text-4xl leading-[1.02] font-bold tracking-[-0.045em] text-white xl:text-5xl">
                    {activeProject.title}
                  </h3>
                  <p className="mt-4 text-base font-medium text-zinc-300">{activeProject.subtitle}</p>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-400">{activeProject.description}</p>

                  <ul className="mt-7 flex max-w-lg flex-wrap gap-2" aria-label={`${activeProject.title} technologies`}>
                    {activeProject.technologies.map((technology) => (
                      <li key={technology} className="rounded-full border border-white/10 px-3.5 py-1.5 text-[0.68rem] text-zinc-400">
                        {technology}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <ProjectLinks project={activeProject} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex min-w-0 items-center pt-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.title}
                  className="w-full"
                  initial={reduceMotion ? false : { opacity: 0, y: 72, scale: 0.82, rotateX: 8, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -58, scale: 1.08, filter: "blur(10px)" }}
                  transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformPerspective: 1200 }}
                >
                  <ProjectVisual project={activeProject} index={activeIndex} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute right-0 bottom-10 flex items-center gap-2" aria-label="Project progress">
              {projects.map((project, index) => (
                <span
                  key={project.title}
                  className={`h-1 rounded-full transition-all duration-500 ${index === activeIndex ? "w-10 bg-highlight" : "w-4 bg-white/12"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
