"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { FiGithub } from "react-icons/fi";
import { projects, type Project } from "@/data/portfolio";
import { StickyScroll, type StickyScrollItem } from "@/components/ui/sticky-scroll-reveal";
import TiltedCard from "@/components/ui/tilted-card";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const projectMarks = ["TF", "LK", "SM", "AM"];
const projectAccents = [
  { from: "#8aacbe", to: "#0d1622" },
  { from: "#e0e7ff", to: "#435465" },
  { from: "#64788a", to: "#08111b" },
  { from: "#a9bed0", to: "#24384a" },
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
      <div className="group/project relative aspect-[16/10] w-full overflow-hidden rounded-[1.3rem] border border-white/10 bg-[#07101a] transition-colors duration-500 hover:border-highlight/35">
        <Image
          src={project.image}
          alt={`${project.title} project screenshot`}
          fill
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover transition-[transform,filter] duration-700 ease-out group-hover/project:scale-[1.045] group-hover/project:brightness-110"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/10 opacity-0 transition-opacity duration-500 group-hover/project:opacity-100" />
      </div>
    );
  }


  return (
    <div
      role="img"
      aria-label={`${project.title} clean project preview placeholder`}
      className="group/project relative aspect-[16/10] w-full overflow-hidden rounded-[1.3rem] border border-white/10 bg-[#07101a] shadow-[0_24px_76px_rgba(0,0,0,0.36)] transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-highlight/35 hover:shadow-[0_28px_84px_rgba(0,0,0,0.46)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 transition-[opacity,transform] duration-700 ease-out group-hover/project:scale-110 group-hover/project:opacity-60"
        style={{
          background: `radial-gradient(circle at 78% 16%, ${accent.from}66, transparent 34%), radial-gradient(circle at 16% 86%, ${accent.to}44, transparent 38%)`,
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="relative flex h-full flex-col p-4 transition-transform duration-700 ease-out group-hover/project:scale-[1.015] sm:p-6">
        <div className="flex items-center justify-between border-b border-white/8 pb-4">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="size-2 rounded-full" style={{ backgroundColor: accent.from }} />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/8" />
          </div>
          <span className="text-[0.52rem] tracking-[0.22em] text-zinc-600 uppercase">
            Project preview
          </span>
        </div>

        <div className="grid flex-1 grid-cols-[1fr_auto] items-center gap-5">
          <div>
            <p className="text-[0.54rem] tracking-[0.2em] text-zinc-500 uppercase">
              {project.category}
            </p>
            <p className={`font-heading mt-2.5 font-bold tracking-[-0.06em] text-white/14 ${compact ? "text-[2.55rem]" : "text-6xl xl:text-7xl"}`}>
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

        <div className="flex items-center justify-between border-t border-white/8 pt-3.5 text-[0.54rem] tracking-[0.16em] text-zinc-600 uppercase">
          <span>{project.title}</span>
          <span>Screenshot pending</span>
        </div>
      </div>
    </div>
  );
}

function ProjectPreview({ project, index, compact = false }: ProjectVisualProps) {
  return (
    <div className="aspect-[16/10] w-full">
      <TiltedCard
        containerHeight="100%"
        containerWidth="100%"
        imageHeight="100%"
        imageWidth="100%"
        rotateAmplitude={compact ? 4 : 6}
        scaleOnHover={compact ? 1.015 : 1.025}
        showMobileWarning={false}
        showTooltip={false}
      >
        <ProjectVisual project={project} index={index} compact={compact} />
      </TiltedCard>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.githubUrl && !project.liveUrl) {
    return (
      <p className="text-[0.65rem] tracking-[0.16em] text-zinc-600 uppercase">
        Links will be added when available
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="premium-button group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-4 text-xs font-medium text-zinc-200 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-highlight/40 hover:bg-highlight/10 hover:text-white"
        >
          <FiGithub size={16} aria-hidden="true" />
          Repository
          <ArrowUpRight className="button-arrow" size={14} aria-hidden="true" />
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="premium-button group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-4 text-xs font-medium text-zinc-200 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-highlight/40 hover:bg-highlight/10 hover:text-white"
        >
          <ExternalLink className="button-arrow" size={16} aria-hidden="true" />
          Live Demo
        </a>
      )}
    </div>
  );
}

export function Projects() {
  const stickyContent: StickyScrollItem[] = projects.map((project, index) => ({
    title: project.title,
    description: project.description,
    eyebrow: (
      <div className="flex items-center justify-between text-[0.65rem] tracking-[0.18em] text-zinc-500 uppercase">
        <span>{`[ ${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")} ]`}</span>
        {project.status && (
          <span className="text-highlight">{project.status}</span>
        )}
      </div>
    ),
    details: (
      <>
        <p className="mt-2.5 text-[0.58rem] tracking-[0.19em] text-highlight uppercase">
          {project.category}
        </p>
        <p className="mt-4 text-sm font-medium text-zinc-300">
          {project.subtitle}
        </p>
        <ul className="mt-6 flex max-w-xl flex-wrap gap-2" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology} className="rounded-full border border-white/10 px-3 py-1 text-[0.58rem] text-zinc-400">
              {technology}
            </li>
          ))}
        </ul>
        <div className="mt-7">
          <ProjectLinks project={project} />
        </div>
      </>
    ),
    content: <ProjectPreview project={project} index={index} />,
  }));

  return (
    <section id="projects" className="relative scroll-mt-[-110px]">
      <div className="site-container py-10 sm:py-14 lg:hidden">
        <div className="mx-auto w-[85%]">
        <SectionHeading
          eyebrow="Projects"
          title="Selected Projects"
          size="compact"
        />

        <div className="mt-12 space-y-14">
          {projects.map((project, index) => (
            <Reveal key={project.title}>
              <article data-project-magnet-index={index}>
                <div className="mb-4 flex items-center justify-between text-[0.65rem] tracking-[0.18em] text-zinc-500 uppercase">
                  <span>{`[ ${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")} ]`}</span>
                  {project.status && <span className="text-highlight">{project.status}</span>}
                </div>
                <ProjectPreview project={project} index={index} compact />
                <p className="mt-5 text-[0.65rem] tracking-[0.16em] text-highlight uppercase">{project.category}</p>
                <h3 className="font-heading mt-2.5 text-2xl font-bold tracking-tight text-white">{project.title}</h3>
                <p className="mt-2 text-xs font-medium text-zinc-300">{project.subtitle}</p>
                <p className="mt-3.5 text-xs leading-6 text-zinc-400">{project.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                  {project.technologies.map((technology) => (
                    <li key={technology} className="rounded-full border border-white/10 px-2.5 py-1 text-[0.58rem] text-zinc-400">
                      {technology}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <ProjectLinks project={project} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        </div>
      </div>

      <div className="site-container hidden max-w-[63rem] py-20 lg:block">
        <SectionHeading
          eyebrow="Projects"
          title="Selected Projects"
          size="compact"
        />
        <StickyScroll content={stickyContent} className="mt-8" />
      </div>
    </section>
  );
}
