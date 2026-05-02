import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { VENUE_IMAGES } from "../lib/assets";
import { Reveal, FadeIn } from "./motion/Reveal";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-12%", "18%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["14%", "-18%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 5]);
  const tagY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.96, 1, 1, 0.98]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.7]);

  return (
    <motion.section
      ref={ref}
      id="about"
      style={{ scale: sectionScale, opacity: sectionOpacity }}
      className="relative py-28 md:py-44 px-6 md:px-12 lg:px-16 overflow-hidden bg-noise"
      data-testid="about-section"
    >
      {/* Floating leaf decoratives */}
      <div
        className="absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full opacity-20 blur-3xl pointer-events-none animate-float-slow"
        style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 60%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full opacity-10 blur-3xl pointer-events-none animate-float-slow"
        style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 60%)" }}
      />

      <div className="relative grid grid-cols-12 gap-6 md:gap-10 items-start max-w-[1400px] mx-auto">
        {/* Left — eyebrow + heading */}
        <div className="col-span-12 lg:col-span-5">
          <FadeIn
            delay={0}
            y={12}
            className="flex items-center gap-3 text-[11px] tracking-[0.36em] uppercase text-[#22C55E]"
            data-testid="about-eyebrow"
          >
            <span className="w-10 h-px bg-[#22C55E]/60" />
            Our Story
          </FadeIn>

          <h2
            className="mt-6 font-serif-lux text-[10vw] sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem] leading-[0.95] tracking-[-0.02em] text-white text-balance"
            data-testid="about-title"
          >
            <Reveal text="A garden," />
            <br />
            <Reveal
              text="five floors"
              className="italic text-[#FBBF24]/90"
              delay={0.2}
            />
            <br />
            <Reveal text="above the city." delay={0.4} />
          </h2>

          <FadeIn
            delay={0.6}
            y={20}
            className="mt-10 max-w-xl space-y-6 text-white/70 leading-relaxed font-sans-lux"
            data-testid="about-copy"
          >
            <p className="text-pretty">
              <span className="font-serif-lux float-left text-7xl leading-[0.85] mr-3 mt-1 text-[#22C55E] italic">
                T
              </span>
              o Be Continued is a rooftop quiet rebellion against the city
              below — terracotta cabanas, hanging vines, hand-poured cocktails
              and the slow, golden hum of a Bangalore evening that refuses to
              end.
            </p>
            <p className="text-pretty">
              We built a sky garden where dinner stretches into music, music
              stretches into silence, and silence stretches into another round.
              The story doesn't finish here. It's only — to be continued.
            </p>
          </FadeIn>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ staggerChildren: 0.15, delayChildren: 0.8 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-md"
            data-testid="about-stats"
          >
            {[
              { k: "5th", v: "Floor sky-deck" },
              { k: "120+", v: "Curated plants" },
              { k: "1AM", v: "Last call" },
            ].map((s) => (
              <motion.div
                key={s.k}
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.8, ease: [0.22, 0.65, 0.18, 1] },
                  },
                }}
                className="border-l border-white/15 pl-4"
              >
                <div className="font-serif-lux text-3xl text-[#FBBF24]">
                  {s.k}
                </div>
                <div className="mt-1 text-[10.5px] tracking-[0.22em] uppercase text-white/55">
                  {s.v}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right — parallax collage with Ken Burns images */}
        <div className="col-span-12 lg:col-span-7 relative min-h-[520px] md:min-h-[640px]" style={{ perspective: 1200 }}>
          <motion.div
            style={{ y: y1, rotate }}
            initial={{ opacity: 0, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.22, 0.65, 0.18, 1] }}
            className="absolute top-0 right-0 w-[68%] aspect-[4/5] rounded-[2px] overflow-hidden glass"
            data-testid="about-img-1"
          >
            <img
              src={VENUE_IMAGES[0].src}
              alt={VENUE_IMAGES[0].alt}
              className="w-full h-full object-cover kenburns"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0e]/60 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 1.1, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 0.65, 0.18, 1] }}
            className="absolute bottom-4 left-0 w-[58%] aspect-[5/4] rounded-[2px] overflow-hidden glass shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
            data-testid="about-img-2"
          >
            <img
              src={VENUE_IMAGES[5].src}
              alt={VENUE_IMAGES[5].alt}
              className="w-full h-full object-cover kenburns-fast"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0e]/40 via-transparent to-transparent" />
          </motion.div>

          {/* small floating tag */}
          <motion.div
            style={{ y: tagY }}
            className="absolute top-1/2 right-2 md:right-6 -translate-y-1/2 px-4 py-3 glass-strong rounded-full text-[10px] tracking-[0.26em] uppercase text-white/80 hidden sm:flex items-center gap-2 animate-float-slow"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_10px_#22c55e]" />
            Open Air · Greenery · Skyline
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
