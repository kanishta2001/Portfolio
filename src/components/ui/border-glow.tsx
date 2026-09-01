"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type BorderGlowProps = {
  children?: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
};

function parseHsl(value: string) {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) };
}

function buildBoxShadow(glowColor: string, intensity: number) {
  const { h, s, l } = parseHsl(glowColor);
  const color = `${h}deg ${s}% ${l}%`;
  const layers: Array<[number, number, boolean]> = [
    [1, 60, true],
    [3, 50, true],
    [6, 40, true],
    [15, 30, true],
    [25, 20, true],
    [50, 10, true],
    [1, 60, false],
    [3, 50, false],
    [6, 40, false],
    [15, 30, false],
    [25, 20, false],
    [50, 10, false],
  ];

  return layers
    .map(([blur, alpha, inset]) => {
      const opacity = Math.min(alpha * intensity, 100);
      return `${inset ? "inset " : ""}0 0 ${blur}px ${blur > 20 ? 2 : 0}px hsl(${color} / ${opacity}%)`;
    })
    .join(", ");
}

const gradientPositions = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];
const colorMap = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors: string[]) {
  return [
    ...gradientPositions.map(
      (position, index) =>
        `radial-gradient(at ${position}, ${colors[Math.min(colorMap[index], colors.length - 1)]} 0px, transparent 50%)`,
    ),
    `linear-gradient(${colors[0]} 0 100%)`,
  ];
}

/** React Bits BorderGlow, tuned for one responsive contact surface. */
export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "203 36 64",
  backgroundColor = "#08111b",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ["#8aacbe", "#e0e7ff", "#64788a"],
  fillOpacity = 0.5,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorAngle, setCursorAngle] = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(0);
  const [sweepActive, setSweepActive] = useState(false);

  const updatePointer = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    const dx = x - width / 2;
    const dy = y - height / 2;
    const horizontalRatio = dx === 0 ? 0 : Math.abs(dx) / (width / 2);
    const verticalRatio = dy === 0 ? 0 : Math.abs(dy) / (height / 2);
    const proximity = Math.min(Math.max(horizontalRatio, verticalRatio), 1);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      setEdgeProximity(proximity);
      setCursorAngle(angle);
    });
  }, []);

  useEffect(() => {
    if (!animated || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const startedAt = performance.now();
    const duration = 1800;
    let started = false;

    const sweep = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      if (!started) {
        started = true;
        setSweepActive(true);
      }
      setCursorAngle(110 + 355 * progress);
      setEdgeProximity(Math.sin(progress * Math.PI));
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(sweep);
      } else {
        setSweepActive(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(sweep);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [animated]);

  useEffect(() => () => cancelAnimationFrame(animationFrameRef.current), []);

  const colorSensitivity = edgeSensitivity + 20;
  const isVisible = isHovered || sweepActive;
  const borderOpacity = isVisible
    ? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity))
    : 0;
  const glowOpacity = isVisible
    ? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity))
    : 0;
  const meshGradients = buildMeshGradients(colors);
  const borderBackground = meshGradients.map((gradient) => `${gradient} border-box`);
  const fillBackground = meshGradients.map((gradient) => `${gradient} padding-box`);
  const angle = `${cursorAngle.toFixed(3)}deg`;

  return (
    <div
      ref={cardRef}
      data-border-glow="true"
      onPointerMove={updatePointer}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setEdgeProximity(0);
      }}
      className={`relative isolate grid border ${className}`.trim()}
      style={{
        background: backgroundColor,
        borderColor: "rgb(255 255 255 / 12%)",
        borderRadius,
        transform: "translate3d(0, 0, 0.01px)",
        boxShadow: "0 24px 80px rgba(0, 3, 8, 0.38)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[1] rounded-[inherit]"
        style={{
          border: "1px solid transparent",
          background: [
            `linear-gradient(${backgroundColor} 0 100%) padding-box`,
            "linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box",
            ...borderBackground,
          ].join(", "),
          opacity: borderOpacity,
          maskImage: `conic-gradient(from ${angle} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          WebkitMaskImage: `conic-gradient(from ${angle} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          transition: isVisible ? "opacity 180ms ease-out" : "opacity 500ms ease-in-out",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[1] rounded-[inherit]"
        style={{
          border: "1px solid transparent",
          background: fillBackground.join(", "),
          maskImage: `conic-gradient(from ${angle} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
          WebkitMaskImage: `conic-gradient(from ${angle} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
          opacity: borderOpacity * fillOpacity,
          mixBlendMode: "soft-light",
          transition: isVisible ? "opacity 180ms ease-out" : "opacity 500ms ease-in-out",
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] rounded-[inherit]"
        style={
          {
            inset: -glowRadius,
            maskImage: `conic-gradient(from ${angle} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
            WebkitMaskImage: `conic-gradient(from ${angle} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
            opacity: glowOpacity,
            mixBlendMode: "plus-lighter",
            transition: isVisible ? "opacity 180ms ease-out" : "opacity 500ms ease-in-out",
          } as CSSProperties
        }
      >
        <span
          className="absolute rounded-[inherit]"
          style={{
            inset: glowRadius,
            boxShadow: buildBoxShadow(glowColor, glowIntensity),
          }}
        />
      </span>

      <div className="relative z-[1] overflow-hidden rounded-[inherit]">{children}</div>
    </div>
  );
}
