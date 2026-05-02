import { motion, useReducedMotion } from "framer-motion";
import { Children, cloneElement, isValidElement } from "react";

/**
 * Reveal — staggered word reveal for headings and text.
 * Splits the given string into words & letters with a curtain-rise animation.
 *
 * Props:
 *  - as: tag (e.g., "h1" | "h2" | "p" | "span"). Default "span".
 *  - text: the string to animate (preferred over children for splitting).
 *  - by: "word" | "char" — default "word".
 *  - delay: base delay in seconds.
 *  - stagger: per-token stagger.
 *  - className: applied to wrapper.
 *  - once: viewport once (default true).
 */
export function Reveal({
  as: Tag = "span",
  text = "",
  by = "word",
  delay = 0,
  stagger = 0.06,
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
      {...rest}
    >
      {tokens.map((tok, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
          style={{ paddingBottom: "0.08em" }}
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "115%", opacity: 0, rotate: 4 },
              show: {
                y: "0%",
                opacity: 1,
                rotate: 0,
                transition: {
                  duration: 0.9,
                  ease: [0.22, 0.65, 0.18, 1],
                },
              },
            }}
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
 * FadeIn — soft fade + lift for paragraphs and groups.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 24,
  duration = 0.9,
  blur = 6,
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
 * StaggerGroup — orchestrates child reveals.
 */
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
