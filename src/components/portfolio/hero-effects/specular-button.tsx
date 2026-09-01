"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

type SpecularVariables = CSSProperties & {
  "--specular-x": string;
  "--specular-y": string;
  "--specular-radius": string;
  "--specular-base": string;
  "--specular-line": string;
  "--specular-text": string;
  "--specular-speed": string;
};

type SpecularButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  baseColor?: string;
  lineColor?: string;
  textColor?: string;
  radius?: number;
  speed?: number;
  download?: boolean;
};

/** A semantic link with a cursor-following reflective highlight. */
export function SpecularButton({
  href,
  children,
  className = "",
  baseColor = "transparent",
  lineColor = "#E0E7FF",
  textColor = "#E0E7FF",
  radius = 18,
  speed = 0.35,
  download = false,
}: SpecularButtonProps) {
  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--specular-x",
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      "--specular-y",
      `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    );
  };

  const style: SpecularVariables = {
    "--specular-x": "50%",
    "--specular-y": "50%",
    "--specular-radius": `${radius}px`,
    "--specular-base": baseColor,
    "--specular-line": lineColor,
    "--specular-text": textColor,
    "--specular-speed": `${speed}s`,
  };

  return (
    <a
      href={href}
      download={download || undefined}
      onPointerMove={handlePointerMove}
      className={`specular-button premium-button group ${className}`}
      style={style}
    >
      <span aria-hidden="true" className="specular-button-shine" />
      <span className="specular-button-content">{children}</span>
    </a>
  );
}
