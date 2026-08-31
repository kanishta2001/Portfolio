"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { FiGithub } from "react-icons/fi";
import { SiNextdotjs } from "react-icons/si";
import ScrollVelocity from "@/components/ui/scroll-velocity";
import { skillGroups } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

type SkillGroup = (typeof skillGroups)[number];

function SkillLogoStrip({ group }: { group: SkillGroup }) {
  return (
    <span className="skill-velocity-strip">
      {group.skills.map((skill) => (
        <span key={skill.name} className="skill-velocity-item">
          {skill.name === "Next.js" ? (
            <SiNextdotjs aria-hidden="true" />
          ) : skill.name === "GitHub" ? (
            <FiGithub aria-hidden="true" />
          ) : (
            <Image
              src={skill.logo}
              alt=""
              width={48}
              height={48}
              className={`skill-velocity-image ${"invert" in skill && skill.invert ? "invert" : ""}`}
              draggable={false}
            />
          )}
          <span>{skill.name}</span>
        </span>
      ))}
    </span>
  );
}

function SkillVelocityRow({ group, index }: { group: SkillGroup; index: number }) {
  return (
    <div role="region" aria-label={`${group.title} technologies`}>
      <ScrollVelocity
        texts={[<SkillLogoStrip key={group.title} group={group} />]}
        velocity={index % 2 === 0 ? 10 : -10}
        damping={30}
        stiffness={300}
        numCopies={5}
        velocityMapping={{ input: [0, 1000], output: [0, 5] }}
        parallaxClassName="skill-velocity-mask py-4"
      />
    </div>
  );
}

export function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative overflow-hidden py-11 sm:py-15 lg:py-[5.7rem]">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 h-80 w-[70%] -translate-x-1/2 -translate-y-1/2 bg-primary/8 blur-[120px]"
      />

      <div className="site-container relative max-w-[70.3rem]">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I Work With"
          description="Languages, technologies, and tools I use to build clean interfaces, structured APIs, and dependable full-stack applications."
          size="slightlyCompact"
        />

        <div className="mt-[3.325rem] space-y-[2.85rem] sm:mt-[3.8rem] sm:space-y-[3.8rem]">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              className="grid min-w-0 items-center gap-6 lg:grid-cols-[13.3rem_minmax(0,1fr)] lg:gap-9"
              initial={reduceMotion ? false : { opacity: 0, y: 26, filter: "blur(6px)" }}
              whileInView={
                reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.58,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-start gap-4 lg:block">
                <span className="font-mono text-[0.71rem] text-highlight/75">0{index + 1}</span>
                <div className="lg:mt-4">
                  <h3 className="font-heading text-[1.2rem] font-semibold text-white sm:text-[1.425rem]">
                    {group.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-[0.83rem] leading-[1.425rem] text-zinc-500">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="relative min-w-0 overflow-hidden py-4">
                <SkillVelocityRow group={group} index={index} />
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-[3.325rem] text-center text-[0.71rem] tracking-[0.16em] text-zinc-600 uppercase">
          Scroll to move the tools · Motion pauses while the page is idle
        </p>
      </div>
    </section>
  );
}
