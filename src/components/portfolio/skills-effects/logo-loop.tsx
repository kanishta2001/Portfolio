"use client";

import Image from "next/image";
import {
  memo,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

export type LogoItem =
  | {
      node: ReactNode;
      title?: string;
      href?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt: string;
      title?: string;
      href?: string;
      invert?: boolean;
    };

type LogoLoopProps = {
  logos: readonly LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  className?: string;
};

const COPY_COUNT = 6;

function LogoLoopComponent({
  logos,
  speed = 80,
  direction = "left",
  logoHeight = 65,
  gap = 40,
  hoverSpeed = 40,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = "#04080f",
  ariaLabel = "Technology logos",
  className = "",
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const sequence = sequenceRef.current;
    if (!container || !track || !sequence) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sequenceWidth = sequence.getBoundingClientRect().width;
    let animationFrame = 0;
    let lastTimestamp: number | null = null;
    let offset = 0;
    let velocity = 0;
    let isVisible = true;
    let pageVisible = !document.hidden;

    const directionMultiplier = direction === "left" ? 1 : -1;

    const measure = () => {
      sequenceWidth = sequence.getBoundingClientRect().width;
      if (sequenceWidth <= 0) return;
      offset = ((offset % sequenceWidth) + sequenceWidth) % sequenceWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const stop = () => {
      if (!animationFrame) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastTimestamp = null;
    };

    const animate = (timestamp: number) => {
      animationFrame = 0;
      if (!isVisible || !pageVisible || reducedMotion.matches) return;

      if (lastTimestamp === null) lastTimestamp = timestamp;
      const deltaTime = Math.min(0.05, Math.max(0, timestamp - lastTimestamp) / 1000);
      lastTimestamp = timestamp;

      const requestedSpeed = hoveredRef.current ? hoverSpeed : speed;
      const targetVelocity = Math.abs(requestedSpeed) * directionMultiplier;
      const smoothing = 1 - Math.exp(-deltaTime / 0.25);
      velocity += (targetVelocity - velocity) * smoothing;

      if (sequenceWidth > 0) {
        offset = ((offset + velocity * deltaTime) % sequenceWidth + sequenceWidth) % sequenceWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!animationFrame && isVisible && pageVisible && !reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const handleVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };

    const handleReducedMotion = () => {
      if (reducedMotion.matches) {
        stop();
        track.style.transform = "translate3d(0, 0, 0)";
      } else {
        start();
      }
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    resizeObserver.observe(sequence);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });
    intersectionObserver.observe(container);

    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleReducedMotion);
    measure();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleReducedMotion);
    };
  }, [direction, hoverSpeed, speed]);

  const copies = useMemo(
    () => Array.from({ length: COPY_COUNT }, (_, index) => index),
    [],
  );
  const loopStyle = {
    "--logo-loop-height": `${logoHeight}px`,
    "--logo-loop-gap": `${gap}px`,
  } as CSSProperties;

  const renderLogo = (item: LogoItem, copyIndex: number, itemIndex: number) => {
    const title = item.title ?? ("alt" in item ? item.alt : undefined);
    const content = (
      <span
        className={`logo-loop-item ${scaleOnHover ? "logo-loop-item-scale" : ""}`.trim()}
        title={title}
      >
        {"node" in item ? (
          <span className="logo-loop-node" aria-hidden="true">
            {item.node}
          </span>
        ) : (
          <Image
            src={item.src}
            alt=""
            width={logoHeight}
            height={logoHeight}
            className={`logo-loop-image ${item.invert ? "logo-loop-image-invert" : ""}`}
            draggable={false}
          />
        )}
        {title ? <span className="logo-loop-title">{title}</span> : null}
      </span>
    );

    return (
      <li
        key={`${copyIndex}-${itemIndex}-${title ?? "logo"}`}
        className="logo-loop-list-item"
        style={{ marginRight: gap }}
      >
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={("ariaLabel" in item && item.ariaLabel) || title || "Technology link"}
            className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-highlight focus-visible:outline-offset-4"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </li>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`logo-loop ${className}`.trim()}
      style={loopStyle}
      role="region"
      aria-label={ariaLabel}
    >
      {fadeOut ? (
        <>
          <span
            aria-hidden="true"
            className="logo-loop-fade logo-loop-fade-left"
            style={{ background: `linear-gradient(to right, ${fadeOutColor}, transparent)` }}
          />
          <span
            aria-hidden="true"
            className="logo-loop-fade logo-loop-fade-right"
            style={{ background: `linear-gradient(to left, ${fadeOutColor}, transparent)` }}
          />
        </>
      ) : null}

      <div
        ref={trackRef}
        className="logo-loop-track"
        onMouseEnter={() => {
          hoveredRef.current = true;
        }}
        onMouseLeave={() => {
          hoveredRef.current = false;
        }}
      >
        {copies.map((copyIndex) => (
          <ul
            key={copyIndex}
            ref={copyIndex === 0 ? sequenceRef : undefined}
            className="logo-loop-sequence"
            aria-hidden={copyIndex > 0}
          >
            {logos.map((item, itemIndex) => renderLogo(item, copyIndex, itemIndex))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export const LogoLoop = memo(LogoLoopComponent);
LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
