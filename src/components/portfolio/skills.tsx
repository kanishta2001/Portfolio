"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { skillGroups } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

type Skill = (typeof skillGroups)[number]["skills"][number];

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.li
      className="group relative flex min-w-40 items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-highlight/0 via-highlight/8 to-indigo-400/0 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.045] p-2">
        <Image
          src={skill.logo}
          alt=""
          width={34}
          height={34}
          className={`size-8 object-contain ${"invert" in skill && skill.invert ? "brightness-0 invert" : ""}`}
        />
      </div>
      <span className="relative max-w-28 text-sm font-medium leading-5 text-zinc-300 group-hover:text-white">{skill.name}</span>
    </motion.li>
  );
}

function SkillMarquee({
  skills,
  reverse,
  reduceMotion,
}: {
  skills: readonly Skill[];
  reverse: boolean;
  reduceMotion: boolean | null;
}) {
  const laneSkills: Skill[] = skills.length < 4 ? [...skills, ...skills] : [...skills];

  return (
    <div className="marquee-mask min-w-0 overflow-hidden py-2">
      <motion.div
        className="flex w-max"
        animate={reduceMotion ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: Math.max(16, skills.length * 5), ease: "linear", repeat: Infinity }}
      >
        <ul className="flex shrink-0 gap-3 pr-3">
          {laneSkills.map((skill, index) => (
            <SkillCard key={`${skill.name}-${index}`} skill={skill} />
          ))}
        </ul>
        <ul className="flex shrink-0 gap-3 pr-3" aria-hidden="true">
          {laneSkills.map((skill, index) => (
            <SkillCard key={`${skill.name}-${index}-copy`} skill={skill} />
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 h-80 w-[70%] -translate-x-1/2 -translate-y-1/2 bg-primary/10 blur-[120px]" />
      <div className="site-container relative">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            eyebrow="Skills"
            title="Tools I Work With"
            description="A living toolkit for building clean interfaces, structured APIs, and dependable full-stack applications."
          />
        </motion.div>

        <div className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-surface-strong/80 shadow-[0_30px_100px_rgba(18,17,16,0.34)] backdrop-blur-xl">
          <div className="flex flex-col gap-3 border-b border-white/8 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-3">
              <span className="relative flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-30 motion-reduce:animate-none" />
                <span className="relative inline-flex size-3 rounded-full bg-emerald-400" />
              </span>
              <p className="font-heading text-sm font-semibold text-zinc-200">Development toolkit</p>
            </div>
            <p className="text-[0.65rem] tracking-[0.2em] text-zinc-600 uppercase">Learning · Building · Improving</p>
          </div>

          <div className="divide-y divide-white/8">
            {skillGroups.map((group, index) => (
              <motion.article
                key={group.title}
                className="grid items-center gap-5 px-5 py-6 sm:px-7 lg:grid-cols-[13rem_minmax(0,1fr)]"
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <div className="flex items-start gap-4 lg:block">
                  <span className="font-mono text-xs text-highlight">0{index + 1}</span>
                  <div className="lg:mt-4">
                    <h3 className="font-heading text-xl font-semibold text-white">{group.title}</h3>
                    <p className="mt-2 max-w-xs text-xs leading-5 text-zinc-500">{group.description}</p>
                  </div>
                </div>
                <SkillMarquee skills={group.skills} reverse={index % 2 === 1} reduceMotion={reduceMotion} />
              </motion.article>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs tracking-[0.16em] text-zinc-600 uppercase">
          Hover a tool to inspect · Motion respects reduced-motion settings
        </p>
      </div>
    </section>
  );
}
