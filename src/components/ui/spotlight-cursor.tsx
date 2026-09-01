"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

interface SpotlightConfig {
  radius?: number;
  brightness?: number;
  color?: string;
  smoothing?: number;
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);

  if (normalized.length !== 6 || Number.isNaN(value)) return "255,255,255";

  return `${(value >> 16) & 255},${(value >> 8) & 255},${value & 255}`;
}

function useSpotlightEffect(config: Required<SpotlightConfig>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let animationFrame = 0;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isVisible = false;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    const smoothing = Math.min(Math.max(config.smoothing, 0.02), 1);
    const rgb = hexToRgb(config.color);

    const resizeCanvas = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(viewportWidth * pixelRatio);
      canvas.height = Math.round(viewportHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      scheduleDraw();
    };

    const scheduleDraw = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!isVisible) {
        currentX = targetX;
        currentY = targetY;
        isVisible = true;
      }

      scheduleDraw();
    };

    const handlePointerLeave = () => {
      isVisible = false;
      targetX = -1000;
      targetY = -1000;
      scheduleDraw();
    };

    const draw = () => {
      animationFrame = 0;
      context.clearRect(0, 0, viewportWidth, viewportHeight);

      if (isVisible) {
        currentX += (targetX - currentX) * smoothing;
        currentY += (targetY - currentY) * smoothing;

        const gradient = context.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          config.radius,
        );
        gradient.addColorStop(0, `rgba(${rgb}, ${config.brightness})`);
        gradient.addColorStop(0.42, `rgba(${rgb}, ${config.brightness * 0.42})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, viewportWidth, viewportHeight);

        // Keep smoothing only while the spotlight is catching the pointer.
        // Once settled, preserve the canvas instead of redrawing every frame.
        if (Math.abs(targetX - currentX) > 0.25 || Math.abs(targetY - currentY) > 0.25) {
          scheduleDraw();
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
    };
  }, [config.brightness, config.color, config.radius, config.smoothing]);

  return canvasRef;
}

interface ComponentProps extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightConfig;
}

export function Component({ config = {}, className = "", ...rest }: ComponentProps) {
  const spotlightConfig: Required<SpotlightConfig> = {
    radius: 240,
    brightness: 0.1,
    color: "#69627b",
    smoothing: 0.12,
    ...config,
  };
  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] h-full w-full ${className}`.trim()}
      {...rest}
    />
  );
}
