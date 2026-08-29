type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div
        className={`mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-[0.68rem] font-medium tracking-[0.24em] text-zinc-400 uppercase ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="size-1.5 rounded-full bg-highlight shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
        {eyebrow}
      </div>
      <h2 className="font-heading text-4xl leading-tight font-bold tracking-[-0.035em] text-white sm:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-7 text-zinc-400">{description}</p>}
    </div>
  );
}
