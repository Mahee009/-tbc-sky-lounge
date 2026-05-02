import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * SectionScene — wraps a section in a cinematic scroll envelope.
 * Adds:
 *   - subtle scale + opacity at entry/exit
 *   - blur-to-focus pass
 *   - vignette mask that darkens edges as the section leaves the viewport
 *
 * Use this for any section that should feel like a "scene" in a film.
 */
export default function SectionScene({
  children,
  id,
  className = "",
  enterScale = 0.96,
  exitScale = 0.985,
  blurMax = 6,
  ...rest
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.85, 1],
    [enterScale, 1, 1, exitScale]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.35, 1, 1, 0.55]
  );
  const blur = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [`blur(${blurMax}px)`, "blur(0px)", "blur(0px)", `blur(${blurMax / 1.5}px)`]
  );
  const vignette = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.55, 0, 0, 0.45]
  );

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ scale, opacity, filter: blur }}
      className={`relative ${className}`}
      {...rest}
    >
      {children}
      {/* Cinematic vignette that darkens during entry/exit — fade-to-black between scenes */}
      <motion.div
        aria-hidden
        style={{ opacity: vignette }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_40%,#0b0f0e_100%)]"
      />
    </motion.section>
  );
}
