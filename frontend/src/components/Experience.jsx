import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Utensils, Music4, Wine, Sun, Sparkles } from "lucide-react";
import { VENUE_IMAGES } from "../lib/assets";
import { Reveal, FadeIn } from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";

const EXPERIENCES = [
  {
    icon: Utensils,
    title: "Rooftop Dining",
    desc: "Live-fire kitchen, slow-cooked plates, and a wine list curated for the open sky.",
    img: VENUE_IMAGES[3].src,
    accent: "#22C55E",
    span: "lg:col-span-7 lg:row-span-2",
    tag: "Signature",
  },
  {
    icon: Music4,
    title: "DJ Nights",
    desc: "Resident & guest DJs from Friday — deep house, afro-tropical, neo-soul.",
    img: VENUE_IMAGES[1].src,
    accent: "#38BDF8",
    span: "lg:col-span-5",
    tag: "Fri & Sat",
  },
  {
    icon: Wine,
    title: "Cocktail Atelier",
    desc: "House-infused spirits, garden-foraged garnishes, theatrical pours.",
    img: VENUE_IMAGES[4].src,
    accent: "#FBBF24",
    span: "lg:col-span-5",
    tag: "Bar Programme",
  },
  {
    icon: Sun,
    title: "Sunset Lounge",
    desc: "Golden-hour seatings with skyline-facing daybeds and chilled aperitifs.",
    img: VENUE_IMAGES[5].src,
    accent: "#FBBF24",
    span: "lg:col-span-6",
    tag: "5 – 7 PM",
  },
  {
    icon: Sparkles,
    title: "Private Tables & Cabanas",
    desc: "Bali-inspired wooden gazebos for intimate dinners and small celebrations.",
    img: VENUE_IMAGES[2].src,
    accent: "#22C55E",
    span: "lg:col-span-6",
    tag: "Bookable",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.6]);
  const yShift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <motion.section
      ref={ref}
      id="experience"
      style={{ opacity }}
      className="relative py-12 md:py-20 px-6 md:px-12 lg:px-16 overflow-hidden"
      data-testid="experience-section"
    >
      <motion.div style={{ y: yShift }} className="max-w-[1400px] mx-auto">
        {/* Heading row */}
        <div className="grid grid-cols-12 gap-6 items-end mb-10 md:mb-14">
          <div className="col-span-12 lg:col-span-7">
            <FadeIn
              y={12}
              className="flex items-center gap-3 text-[11px] tracking-[0.36em] uppercase text-[#FBBF24]"
            >
              <span className="w-10 h-px bg-[#FBBF24]/60" />
              The Experience
            </FadeIn>
            <h2
              className="mt-5 font-serif-lux text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-[-0.02em] text-white text-balance"
              data-testid="experience-title"
            >
              <Reveal text="Five evenings." />
              <br />
              <Reveal
                text="One rooftop."
                className="italic text-white/70"
                delay={0.2}
              />
            </h2>
          </div>
          <FadeIn
            delay={0.4}
            y={16}
            className="col-span-12 lg:col-span-5 text-white/65 leading-relaxed max-w-md lg:ml-auto"
          >
            From slow Sunday brunches under palms to electric Friday nights —
            choose the version of TBC you came here for.
          </FadeIn>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-[260px] md:auto-rows-[300px]" style={{ perspective: 1400 }}>
          {EXPERIENCES.map((e, idx) => {
            const Icon = e.icon;
            return (
              <motion.article
                key={e.title}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.95,
                  delay: idx * 0.1,
                  ease: [0.22, 0.65, 0.18, 1],
                }}
                className={`group relative ${e.span}`}
                data-testid={`experience-card-${idx}`}
              >
                <TiltCard
                  className="relative overflow-hidden rounded-[4px] glass lift h-full"
                  glowColor={`${e.accent}55`}
                  max={5}
                >
                  <img
                    src={e.img}
                    alt={e.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0e] via-[#0b0f0e]/55 to-[#0b0f0e]/15" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, ${e.accent}26 0%, transparent 60%)`,
                    }}
                  />

                  {/* Tag */}
                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-strong text-[10px] tracking-[0.26em] uppercase text-white/80">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: e.accent, boxShadow: `0 0 10px ${e.accent}` }}
                    />
                    {e.tag}
                  </div>

                  {/* Hover ring */}
                  <style>{`
                    [data-testid='experience-card-${idx}']:hover > div { box-shadow: 0 0 0 1px ${e.accent}55, 0 30px 70px -20px ${e.accent}45; }
                  `}</style>

                  {/* Bottom block — pushes up on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 transition-transform duration-700 group-hover:-translate-y-1">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-6"
                      style={{
                        background: `${e.accent}1A`,
                        border: `1px solid ${e.accent}40`,
                        color: e.accent,
                      }}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif-lux text-2xl md:text-3xl text-white tracking-tight">
                      {e.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-white/70 leading-relaxed">
                      {e.desc}
                    </p>
                    <div
                      className="mt-3 h-px w-0 group-hover:w-16 transition-all duration-700 ease-out"
                      style={{ background: e.accent }}
                    />
                  </div>
                </TiltCard>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}
