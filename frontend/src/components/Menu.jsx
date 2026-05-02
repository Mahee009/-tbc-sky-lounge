import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Leaf } from "lucide-react";
import { VENUE_IMAGES } from "../lib/assets";
import { Reveal, FadeIn } from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";

// Placeholder menu — to be replaced with real menu provided by venue.
const COCKTAILS = [
  {
    name: "Skyline Spritz",
    desc: "Aperol, Prosecco, fresh basil, soda — the city in a glass.",
    price: "₹ 475",
    img: "/media/cocktail-1.png",
  },
  {
    name: "Garden Negroni",
    desc: "Botanical gin, Campari, sweet vermouth, rooftop rosemary.",
    price: "₹ 525",
    img: "/media/cocktail-2.png",
  },
  {
    name: "TBC Smoke",
    desc: "Mezcal, smoked pineapple, lime, agave — finished tableside.",
    price: "₹ 595",
    img: VENUE_IMAGES[4].src,
  },
];

const PLATES = [
  {
    name: "Charred Aubergine",
    desc: "Wood-grilled, miso glaze, sesame, rooftop microgreens.",
    price: "₹ 345",
  },
  {
    name: "Truffle Shroom Bao",
    desc: "Steamed bao, wild mushrooms, black truffle aioli.",
    price: "₹ 425",
  },
  {
    name: "Burrata · Garden Tomato",
    desc: "Heirloom tomato, basil oil, balsamic pearls, sourdough.",
    price: "₹ 485",
  },
  {
    name: "Mangalore Prawns",
    desc: "Coastal masala, curry leaves, butter-toasted bun.",
    price: "₹ 495",
  },
];

export default function Menu() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.4, 1, 1, 0.6]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <motion.section
      ref={ref}
      id="menu"
      style={{ opacity }}
      className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16 overflow-hidden"
      data-testid="menu-section"
    >
      {/* Soft accent halo */}
      <motion.div
        style={{ y: yBg }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] rounded-full opacity-[0.08] blur-3xl pointer-events-none bg-[#22C55E]"
      />

      <div className="max-w-[1400px] mx-auto relative">
        <div className="grid grid-cols-12 gap-6 items-end mb-10 md:mb-14">
          <div className="col-span-12 md:col-span-7">
            <FadeIn className="flex items-center gap-3 text-[11px] tracking-[0.36em] uppercase text-[#22C55E]">
              <span className="w-10 h-px bg-[#22C55E]/60" />
              The Menu
            </FadeIn>
            <h2
              className="mt-5 font-serif-lux text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-[-0.02em] text-white text-balance"
              data-testid="menu-title"
            >
              <Reveal text="Crafted slowly." />
              <br />
              <Reveal
                text="Plated under stars."
                className="italic text-[#FBBF24]/95"
                delay={0.25}
              />
            </h2>
          </div>
          <FadeIn
            delay={0.5}
            y={16}
            className="col-span-12 md:col-span-5 text-white/65 leading-relaxed max-w-md md:ml-auto"
          >
            Below — a small, evolving preview of our cocktail and small-plate
            programme. The full menu lands soon.
          </FadeIn>
        </div>

        {/* Cocktails — image cards with hover zoom + tilt */}
        <div className="mb-20">
          <FadeIn className="flex items-center justify-between mb-8">
            <h3 className="font-serif-lux text-2xl md:text-3xl text-white">
              Signature Cocktails
            </h3>
            <span className="text-[10.5px] tracking-[0.28em] uppercase text-white/45">
              Bar Programme
            </span>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7" style={{ perspective: 1400 }}>
            {COCKTAILS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 0.65, 0.18, 1] }}
                className="group"
                data-testid={`menu-cocktail-${i}`}
              >
                <TiltCard
                  className="relative overflow-hidden rounded-[4px] glass lift"
                  glowColor="rgba(251,191,36,0.35)"
                  max={6}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.name}
                      className="w-full h-full object-cover kenburns transition-transform duration-[1800ms] ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0e] via-[#0b0f0e]/40 to-transparent" />
                    <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full glass-strong text-[10px] tracking-[0.24em] uppercase text-white/80">
                      {c.price}
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h4 className="font-serif-lux text-2xl text-white">
                      {c.name}
                    </h4>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">
                      {c.desc}
                    </p>
                    <div className="mt-3 h-px w-0 group-hover:w-12 transition-all duration-700 ease-out bg-[#FBBF24]" />
                  </div>
                  <div className="absolute inset-0 ring-0 group-hover:ring-1 group-hover:ring-[#FBBF24]/40 rounded-[4px] pointer-events-none transition-all duration-700" />
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Plates — editorial list with line reveal */}
        <div>
          <FadeIn className="flex items-center justify-between mb-8">
            <h3 className="font-serif-lux text-2xl md:text-3xl text-white">
              Small Plates
            </h3>
            <span className="text-[10.5px] tracking-[0.28em] uppercase text-white/45">
              From the Kitchen
            </span>
          </FadeIn>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 glass rounded-[4px] p-6 md:p-10"
          >
            {PLATES.map((p, i) => (
              <motion.div
                key={p.name}
                variants={{
                  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.85, ease: [0.22, 0.65, 0.18, 1] },
                  },
                }}
                className="flex items-start justify-between gap-6 py-5 border-b border-white/[0.06] last:border-b-0 group"
                data-testid={`menu-plate-${i}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="font-serif-lux text-xl md:text-2xl text-white group-hover:text-[#FBBF24] transition-colors duration-500">
                      {p.name}
                    </h4>
                    <span className="hidden sm:inline-block flex-1 mx-3 border-b border-dotted border-white/15 mb-1.5" />
                    <span className="text-white/75 text-sm tracking-widest font-medium">{p.price}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-white/60 leading-relaxed max-w-md">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <FadeIn
            delay={0.2}
            y={12}
            className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-full glass text-[11px] tracking-[0.28em] uppercase text-white/65"
            data-testid="menu-disclaimer"
          >
            <Leaf size={14} className="text-[#22C55E]" />
            Full menu coming soon · Vegetarian options available
          </FadeIn>
        </div>
      </div>
    </motion.section>
  );
}
