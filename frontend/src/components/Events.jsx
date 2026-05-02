import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Music4, Clock, ArrowUpRight, Disc3 } from "lucide-react";
import { Reveal, FadeIn } from "./motion/Reveal";
import { VENUE_IMAGES } from "../lib/assets";

const EVENTS = [
  {
    date: { day: "12", month: "May", weekday: "Fri" },
    title: "Sundown Sessions",
    artist: "DJ Aarav",
    genre: "Afro House · Deep Tech",
    time: "7:00 PM – 1:00 AM",
    cover: VENUE_IMAGES[1].src,
    accent: "#22C55E",
    tag: "This Weekend",
  },
  {
    date: { day: "18", month: "May", weekday: "Thu" },
    title: "Cocktails & Vinyl",
    artist: "Kavya Sen (Live)",
    genre: "Neo-Soul · Acoustic",
    time: "8:00 PM – 11:30 PM",
    cover: VENUE_IMAGES[6].src,
    accent: "#FBBF24",
    tag: "Live Music",
  },
  {
    date: { day: "20", month: "May", weekday: "Sat" },
    title: "Rooftop Disco",
    artist: "Resident · DJ Mira",
    genre: "Disco · French House",
    time: "9:00 PM – 1:30 AM",
    cover: VENUE_IMAGES[3].src,
    accent: "#38BDF8",
    tag: "Late Night",
  },
  {
    date: { day: "26", month: "May", weekday: "Fri" },
    title: "Garden Jazz Night",
    artist: "The Outside Trio",
    genre: "Jazz · Bossa",
    time: "8:30 PM – 12:30 AM",
    cover: VENUE_IMAGES[5].src,
    accent: "#FBBF24",
    tag: "Live Trio",
  },
];

export default function Events() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.4, 1, 1, 0.6]);
  const yShift = useTransform(scrollYProgress, [0, 1], ["8%", "-6%"]);

  const evt = EVENTS[active];

  return (
    <motion.section
      ref={ref}
      id="events"
      style={{ opacity }}
      className="relative py-28 md:py-44 px-6 md:px-12 lg:px-16 overflow-hidden"
      data-testid="events-section"
    >
      <motion.div style={{ y: yShift }} className="max-w-[1400px] mx-auto">
        {/* Heading */}
        <div className="grid grid-cols-12 gap-6 items-end mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-7">
            <FadeIn className="flex items-center gap-3 text-[11px] tracking-[0.36em] uppercase text-[#38BDF8]">
              <span className="w-10 h-px bg-[#38BDF8]/60" />
              Live & Calendar
            </FadeIn>
            <h2
              className="mt-5 font-serif-lux text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-[-0.02em] text-white text-balance"
              data-testid="events-title"
            >
              <Reveal text="Tonight," />
              <br />
              <Reveal
                text="under stars."
                className="italic text-[#FBBF24]/95"
                delay={0.2}
              />
            </h2>
          </div>
          <FadeIn
            delay={0.4}
            y={16}
            className="col-span-12 md:col-span-5 text-white/65 leading-relaxed max-w-md md:ml-auto"
          >
            Resident sets, live trios, and one-off rooftop guests. The next
            four nights worth showing up for.
          </FadeIn>
        </div>

        <div className="grid grid-cols-12 gap-5 md:gap-8">
          {/* Featured event — large, image right */}
          <div className="col-span-12 lg:col-span-7 relative" style={{ perspective: 1200 }}>
            <motion.div
              key={evt.title}
              initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 0.65, 0.18, 1] }}
              className="relative aspect-[16/11] rounded-[4px] overflow-hidden glass lift"
              data-testid="events-featured"
            >
              <img
                src={evt.cover}
                alt={evt.title}
                className="absolute inset-0 w-full h-full object-cover kenburns"
                key={evt.cover}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0e] via-[#0b0f0e]/55 to-[#0b0f0e]/15" />
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(60% 80% at 30% 80%, ${evt.accent}30, transparent 70%)`,
                }}
              />
              {/* Tag */}
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-strong text-[10px] tracking-[0.26em] uppercase text-white/85">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: evt.accent, boxShadow: `0 0 10px ${evt.accent}` }}
                />
                {evt.tag}
              </div>
              {/* Bottom block */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-white/55 mb-3">
                      <Music4 size={12} className="text-[#22C55E]" />
                      {evt.genre}
                    </div>
                    <h3 className="font-serif-lux text-3xl md:text-5xl text-white tracking-tight">
                      {evt.title}
                    </h3>
                    <div className="mt-2 text-white/75">{evt.artist}</div>
                    <div className="mt-3 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-white/55">
                      <Clock size={12} />
                      {evt.time}
                    </div>
                  </div>
                  <div
                    className="hidden sm:flex flex-col items-end leading-none text-right"
                    style={{ color: evt.accent }}
                  >
                    <div className="font-serif-lux text-7xl md:text-8xl">
                      {evt.date.day}
                    </div>
                    <div className="text-[10px] tracking-[0.36em] uppercase text-white/55 mt-1">
                      {evt.date.weekday} · {evt.date.month}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Calendar list — clickable */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-3">
            {EVENTS.map((e, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={e.title}
                  initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.22, 0.65, 0.18, 1],
                  }}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative text-left overflow-hidden rounded-[4px] transition-all duration-500 ${
                    isActive
                      ? "glass-strong border-l-2"
                      : "glass border-l-2 border-l-transparent hover:border-l-white/30"
                  }`}
                  style={{
                    borderLeftColor: isActive ? e.accent : undefined,
                  }}
                  data-testid={`events-row-${i}`}
                >
                  <div className="flex items-stretch">
                    <div
                      className="w-20 md:w-24 shrink-0 flex flex-col items-center justify-center py-4 border-r border-white/[0.06]"
                      style={{ color: isActive ? e.accent : "#E5E7EB" }}
                    >
                      <div className="font-serif-lux text-3xl md:text-4xl leading-none">
                        {e.date.day}
                      </div>
                      <div className="mt-1 text-[9.5px] tracking-[0.32em] uppercase text-white/55">
                        {e.date.month}
                      </div>
                    </div>
                    <div className="flex-1 px-5 py-4 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] tracking-[0.28em] uppercase text-white/45 mb-1">
                          {e.date.weekday} · {e.tag}
                        </div>
                        <div className="font-serif-lux text-xl md:text-2xl text-white">
                          {e.title}
                        </div>
                        <div className="mt-1 text-[12.5px] text-white/60 truncate">
                          {e.artist} · {e.genre}
                        </div>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className={`shrink-0 transition-all duration-500 ${
                          isActive
                            ? "rotate-0 opacity-100"
                            : "-rotate-45 opacity-40 group-hover:rotate-0 group-hover:opacity-90"
                        }`}
                        style={{ color: isActive ? e.accent : "#FBBF24" }}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 h-px transition-all duration-700"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${e.accent}, transparent)`,
                      opacity: isActive ? 0.6 : 0,
                    }}
                  />
                </motion.button>
              );
            })}

            <FadeIn
              delay={0.5}
              className="mt-3 inline-flex items-center justify-between gap-3 px-5 py-4 rounded-[4px] glass"
              data-testid="events-cta"
            >
              <div className="flex items-center gap-3 text-[11px] tracking-[0.26em] uppercase text-white/65">
                <Disc3 size={14} className="text-[#22C55E] animate-spin [animation-duration:6s]" />
                Updated weekly
              </div>
              <a
                href="https://www.instagram.com/tbc.skylounge/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.26em] uppercase text-[#FBBF24] hover:text-white transition-colors"
              >
                Full Calendar <Calendar size={13} />
              </a>
            </FadeIn>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
