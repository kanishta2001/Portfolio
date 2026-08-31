"use client";

import type { SpringOptions } from "motion/react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";

type TiltedCardProps = {
  children?: ReactNode;
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: CSSProperties["height"];
  containerWidth?: CSSProperties["width"];
  imageHeight?: CSSProperties["height"];
  imageWidth?: CSSProperties["width"];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
  className?: string;
};

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 1.4,
};

/** React Bits Tilted Card adapted to support the portfolio's honest placeholders. */
export default function TiltedCard({
  children,
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  className = "",
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateXSource = useMotionValue(0);
  const rotateYSource = useMotionValue(0);
  const rotateX = useSpring(rotateXSource, springValues);
  const rotateY = useSpring(rotateYSource, springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });
  const lastY = useRef(0);

  const handleMouse = (event: MouseEvent<HTMLElement>) => {
    if (!ref.current || reduceMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    rotateXSource.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateYSource.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
    rotateFigcaption.set(-(offsetY - lastY.current) * 0.6);
    lastY.current = offsetY;
  };

  const handleMouseEnter = () => {
    if (reduceMotion) return;
    scale.set(scaleOnHover);
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    opacity.set(0);
    scale.set(1);
    rotateXSource.set(0);
    rotateYSource.set(0);
    rotateFigcaption.set(0);
    lastY.current = 0;
  };

  return (
    <figure
      ref={ref}
      data-tilted-card="true"
      className={`relative flex h-full w-full flex-col items-center justify-center [perspective:900px] ${className}`.trim()}
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning ? (
        <div className="absolute top-4 hidden text-center text-sm sm:hidden">
          This effect is designed for pointer devices.
        </div>
      ) : null}

      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          scale: reduceMotion ? 1 : scale,
        }}
      >
        {imageSrc ? (
          <motion.img
            src={imageSrc}
            alt={altText}
            className="absolute inset-0 rounded-[15px] object-cover will-change-transform [transform:translateZ(0)]"
            style={{ width: imageWidth, height: imageHeight }}
          />
        ) : (
          <div className="absolute inset-0 [transform:translateZ(0)]">{children}</div>
        )}

        {displayOverlayContent && overlayContent ? (
          <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        ) : null}
      </motion.div>

      {showTooltip && captionText ? (
        <motion.figcaption
          className="pointer-events-none absolute top-0 left-0 z-[3] hidden rounded bg-white px-2.5 py-1 text-[10px] text-[#2d2d2d] sm:block"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.figcaption>
      ) : null}
    </figure>
  );
}
