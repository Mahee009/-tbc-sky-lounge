import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, FadeIn } from "./motion/Reveal";

const REVIEWS = [
  {
    author: "Aanya R.",
    handle: "@aanya.r",
    source: "Zomato",
    sourceColor: "#E23744",
    rating: 5,
    text: "Easily the prettiest rooftop I've been to in Bangalore. The lighting, the plants, the cocktails — everything felt curated. The Garden Negroni was a moment.",
    date: "April 2026",
  },
  {
    author: "Karan M.",
    handle: "Local Guide",
    source: "Google",
    sourceColor: "#4285F4",
    rating: 5,
    text: "Brought my parents for their anniversary. The cabana set-up with rose petals and candles was straight out of a film. Service was warm without being overbearing.",
    date: "March 2026",
  },
  {
    author: "Sara K.",
    handle: "@sara.eats.blr",
    source: "Zomato",
    sourceColor: "#E23744",
    rating: 5,
    text: "Friday night DJ set is the best-kept secret in Marathahalli right now. Not too loud, the crowd is well-dressed, and you can actually still talk over the music.",
    date: "April 2026",
  },
  {
    author: "Rohan S.",
    handle: "Local Guide",
    source: "Google",
    sourceColor: "#4285F4",
    rating: 5,
    text: "I've eaten everywhere in Bangalore. TBC is the only place where I forget I'm five floors up in the middle of ORR. The greenery is unreal.",
    date: "February 2026",
  },
  {
    author: "Devika P.",
    handle: "@devikatastes",
    source: "Zomato",
    sourceColor: "#E23744",
    rating: 4,
    text: "Came for sunset. Stayed for the second cocktail. Stayed for the third. The skyline view at golden hour is genuinely worth the drive across the city.",
    date: "March 2026",
  },
];

function Stars({ n }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={13}
          strokeWidth={1.2}
          className={i < n ? "text-[#FBBF24] fill-[#FBBF24]" : "text-white/15"}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.4, 1, 1, 0.6]);
  const yShift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  // Auto-advance every 6s
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const next = () => setIdx((i) => (i + 1) % REVIEWS.length);
  const prev = () => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);

  const r = REVIEWS[idx];
  const overallRating = (
    REVIEWS.reduce((sum, x) => sum + x.rating, 0) / REVIEWS.length
  ).toFixed(1);

  return (
    <motion.section
      ref={ref}
      id="reviews"
      style={{ opacity }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative py-28 md:py-44 px-6 md:px-12 lg:px-16 overflow-hidden"
      data-testid="reviews-section"
    >
      <motion.div style={{ y: yShift }} className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-6 items-end mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-7">
            <FadeIn className="flex items-center gap-3 text-[11px] tracking-[0.36em] uppercase text-[#FBBF24]">
              <span className="w-10 h-px bg-[#FBBF24]/60" />
              From Our Guests
            </FadeIn>
            <h2
              className="mt-5 font-serif-lux text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-[-0.02em] text-white text-balance"
              data-testid="reviews-title"
            >
              <Reveal text="Loved on" />
              <br />
              <Reveal
                text="Zomato & Google."
                className="italic text-[#22C55E]"
                delay={0.2}
              />
            </h2>
          </div>
          <FadeIn
            delay={0.4}
            y={16}
            className="col-span-12 md:col-span-5 md:ml-auto"
          >
            <div className="flex items-center gap-5">
              <div>
                <div className="font-serif-lux text-5xl text-[#FBBF24] leading-none">
                  {overallRating}
                  <span className="text-2xl text-white/40">/5</span>
                </div>
                <div className="mt-2 text-[10.5px] tracking-[0.28em] uppercase text-white/55">
                  {REVIEWS.length}+ recent reviews
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Stars n={5} />
                <div className="text-[11px] tracking-[0.22em] uppercase text-white/45">
                  Avg · last 90 days
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Carousel */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Big quote card */}
          <div className="col-span-12 lg:col-span-8 relative" style={{ perspective: 1200 }}>
            <div className="relative glass-strong rounded-[4px] p-8 md:p-12 min-h-[360px] md:min-h-[420px] overflow-hidden">
              {/* Big quote */}
              <Quote
                size={72}
                className="absolute top-6 left-6 text-white/[0.06]"
                strokeWidth={1}
              />
              {/* Accent halo */}
              <div
                className="absolute -bottom-20 -right-10 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-20"
                style={{ background: r.sourceColor }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 0.65, 0.18, 1] }}
                  className="relative h-full flex flex-col justify-between"
                  data-testid={`review-active-${idx}`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span
                        className="px-3 py-1 rounded-full text-[10px] tracking-[0.28em] uppercase font-medium"
                        style={{
                          background: `${r.sourceColor}1A`,
                          border: `1px solid ${r.sourceColor}55`,
                          color: r.sourceColor,
                        }}
                      >
                        {r.source}
                      </span>
                      <Stars n={r.rating} />
                      <span className="text-[10.5px] tracking-[0.24em] uppercase text-white/40">
                        {r.date}
                      </span>
                    </div>
                    <p className="font-serif-lux text-2xl md:text-3xl lg:text-[2.4rem] leading-[1.25] text-white text-pretty">
                      "{r.text}"
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-sans-lux text-white text-[15px]">
                        {r.author}
                      </div>
                      <div className="text-[11px] tracking-[0.24em] uppercase text-white/45">
                        {r.handle}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prev}
                        aria-label="Previous review"
                        className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-white/75 hover:text-[#FBBF24] hover:border-[#FBBF24]/40 hover:scale-105 active:scale-95 transition-all"
                        data-testid="reviews-prev"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Next review"
                        className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-white/75 hover:text-[#22C55E] hover:border-[#22C55E]/40 hover:scale-105 active:scale-95 transition-all"
                        data-testid="reviews-next"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Side rail — small thumbnails */}
          <div className="col-span-12 lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {REVIEWS.map((rev, i) => {
              const isActive = i === idx;
              return (
                <motion.button
                  key={rev.author + i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: [0.22, 0.65, 0.18, 1],
                  }}
                  onClick={() => setIdx(i)}
                  className={`min-w-[230px] lg:min-w-0 text-left rounded-[4px] p-4 transition-all duration-500 ${
                    isActive
                      ? "glass-strong border-l-2"
                      : "glass hover:bg-white/[0.06]"
                  }`}
                  style={{
                    borderLeftColor: isActive ? rev.sourceColor : undefined,
                  }}
                  data-testid={`review-thumb-${i}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] tracking-[0.26em] uppercase font-medium"
                      style={{ color: rev.sourceColor }}
                    >
                      {rev.source}
                    </span>
                    <Stars n={rev.rating} />
                  </div>
                  <div className="font-sans-lux text-white text-[13.5px] line-clamp-2 leading-snug">
                    {rev.text}
                  </div>
                  <div className="mt-2 text-[10.5px] tracking-[0.22em] uppercase text-white/45">
                    {rev.author} · {rev.date}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-10 flex items-center gap-3" data-testid="reviews-progress">
          {REVIEWS.map((_, i) => (
            <div
              key={i}
              className={`h-px transition-all duration-700 ${
                i === idx ? "flex-1 bg-[#FBBF24]" : "w-8 bg-white/10"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
