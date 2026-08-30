"use client";

import {
  ArrowDownToLine,
  ArrowRight,
  BriefcaseBusiness,
  GitBranch,
  Mail,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { highlights, profile } from "@/data/portfolio";
import { TiltCard } from "./tilt-card";

const roles = [
  "Full-Stack Development",
  "Clean User Interfaces",
  "Structured APIs",
  "Practical Software Projects",
] as const;

const revealItem = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const maskedRow = {
  hidden: { opacity: 0, y: "105%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.86, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative flex min-h-svh items-center pt-28 pb-16 lg:py-12">
      <div aria-hidden="true" className="ambient-orb absolute top-1/4 -left-40 size-96 rounded-full bg-primary/12 blur-[120px]" />
      <div aria-hidden="true" className="ambient-orb ambient-orb-reverse absolute right-0 bottom-12 size-80 rounded-full bg-secondary/8 blur-[120px]" />

      <div className="site-container relative">
        <motion.div
          className="grid items-center gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:gap-16"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{ visible: { transition: { delayChildren: 0.08, staggerChildren: 0.11 } } }}
        >
          <motion.div variants={revealItem}>
            <TiltCard className="glass-card overflow-hidden rounded-[2rem] p-4 sm:p-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.45rem] border border-white/10 bg-surface-strong">
                <Image
                  src="/images/nipun-avatar.png"
                  alt="Illustrated portrait of Nipun Karunarathna working on a laptop"
                  fill
                  priority
                  sizes="(min-width: 1280px) 38vw, (min-width: 768px) 70vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.025]"
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
            </TiltCard>
          </motion.div>

          <motion.div className="xl:pl-2" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div
              variants={revealItem}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-zinc-400"
            >
              <Sparkles size={15} className="text-highlight" aria-hidden="true" />
              Hi, I&apos;m {profile.name}
            </motion.div>

            <h1 className="font-heading max-w-3xl text-5xl leading-[0.98] font-bold tracking-[-0.05em] text-white sm:text-6xl xl:text-[4.7rem]">
              <span className="block overflow-hidden pb-1">
                <motion.span className="text-gradient block" variants={maskedRow}>
                  Full-Stack
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span className="block" variants={maskedRow}>
                  Web Developer
                </motion.span>
              </span>
            </h1>

            <motion.p variants={revealItem} className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              I build modern web applications using React, Next.js, C#, ASP.NET Core, and SQL Server.
            </motion.p>

            <motion.div variants={revealItem} className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="premium-button group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-[#f0794a] px-6 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(235,94,40,0.2)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(235,94,40,0.3)]"
              >
                View Projects <ArrowRight className="button-arrow" size={17} aria-hidden="true" />
              </a>
              <a
                href={profile.cv}
                download
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-6 text-sm font-medium text-zinc-200 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <ArrowDownToLine size={17} aria-hidden="true" /> Download CV
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 px-6 text-sm font-medium text-zinc-400 transition-[transform,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
              >
                <Mail size={17} aria-hidden="true" /> Contact Me
              </a>
            </motion.div>

            <motion.div variants={revealItem} className="mt-7 flex items-center gap-3" aria-label="Social profiles">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-[transform,border-color,color] duration-300 hover:-translate-y-1 hover:border-highlight/40 hover:text-white"
                aria-label="Visit Nipun's GitHub profile"
              >
                <GitBranch size={18} aria-hidden="true" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-[transform,border-color,color] duration-300 hover:-translate-y-1 hover:border-highlight/40 hover:text-white"
                aria-label="Visit Nipun's LinkedIn profile"
              >
                <BriefcaseBusiness size={18} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="marquee-mask mt-12 overflow-hidden border-y border-white/8 py-3"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <motion.div
            className="flex w-max"
            animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 26, ease: "linear", repeat: Infinity }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-6 pr-6" aria-hidden={copy === 1}>
                {[...roles, ...roles].map((role, index) => (
                  <span key={`${role}-${index}`} className="flex items-center gap-6 text-[0.66rem] tracking-[0.2em] text-zinc-500 uppercase">
                    {role}
                    <span className="size-1 rounded-full bg-highlight" />
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
