import { motion, useReducedMotion } from "framer-motion";
import { Children, cloneElement, isValidElement } from "react";

/**
 * Reveal — staggered word/character reveal with cinematic 3D rotateX cascade.
 * Each token rises from below with a slight 3D rotation and blur — designed to
 * feel like text being "written into space" rather than a simple fade-in.
 *
 * Props:
 *  - as: tag name. Default "span".
 *  - text: the string to animate.
 *  - by: "word" | "char" — default "word".
 *  - delay, stagger, duration, className, once
 */
export function Reveal({
  as: Tag = "span",
  text = "",
  by = "word",
  delay = 0,
  stagger = 0.03,
  duration = 0.55,
  className = "",
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion();
  const tokens = by === "char" ? Array.from(text) : text.split(" ");
  const MotionTag = motion[Tag] || motion.span;

  if (reduce) {
    return (
      <Tag className={className} {...rest}>
        {text}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-15% 0px -15% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      style={{ perspective: 800 }}
      {...rest}
    >
      {tokens.map((tok, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
          style={{ paddingBottom: "0.12em" }}
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: {
                y: "118%",
                opacity: 0,
                rotateX: -45,
                filter: "blur(6px)",
              },
              show: {
                y: "0%",
                opacity: 1,
                rotateX: 0,
                filter: "blur(0px)",
                transition: {
                  duration,
                  ease: [0.22, 0.65, 0.18, 1],
                },
              },
            }}
            style={{ transformOrigin: "50% 100%" }}
          >
            {tok === " " ? "\u00A0" : tok}
            {by === "word" && i < tokens.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * FadeIn — soft fade + lift + blur for paragraphs and groups.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 18,
  duration = 0.55,
  blur = 5,
  className = "",
  once = true,
  as: Tag = "div",
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag] || motion.div;
  if (reduce) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration, delay, ease: [0.22, 0.65, 0.18, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Typewriter — cursor-led character cascade (for hero subtitles or eyebrows).
 */
export function Typewriter({
  text = "",
  delay = 0,
  speed = 0.025,
  className = "",
  cursor = true,
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  const chars = Array.from(text);
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ staggerChildren: speed, delayChildren: delay }}
      aria-label={text}
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.05 } },
          }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
      {cursor && (
        <motion.span
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[1px] h-[0.9em] bg-current align-middle ml-1"
        />
      )}
    </motion.span>
  );
}

export function StaggerGroup({
  children,
  stagger = 0.12,
  delay = 0,
  className = "",
  once = true,
}) {
  const arr = Children.toArray(children);
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {arr.map((child, i) =>
        isValidElement(child)
          ? cloneElement(child, { key: child.key ?? i })
          : child
      )}
    </motion.div>
  );
}

export const stagItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 0.65, 0.18, 1] },
  },
};
