import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { VENUE_IMAGES } from "../lib/assets";
import { Reveal, FadeIn } from "./motion/Reveal";

function distributeColumns(items, cols) {
  const out = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => out[i % cols].push(item));
  return out;
}

export default function Gallery() {
  const ref = useRef(null);
  const [active, setActive] = useState(null);
  const total = VENUE_IMAGES.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.4, 1, 1, 0.6]);
  const yShift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % total)),
    [total]
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? null : (i - 1 + total) % total)),
    [total]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, next, prev]);

  const cols = distributeColumns(VENUE_IMAGES, 3);
  const colsMobile = distributeColumns(VENUE_IMAGES, 2);

  return (
    <motion.section
      ref={ref}
      id="gallery"
      style={{ opacity }}
      className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16 overflow-hidden"
      data-testid="gallery-section"
    >
      <motion.div style={{ y: yShift }} className="max-w-[1500px] mx-auto">
        {/* Heading */}
        <div className="grid grid-cols-12 gap-6 items-end mb-10 md:mb-14">
          <div className="col-span-12 md:col-span-7">
            <FadeIn className="flex items-center gap-3 text-[11px] tracking-[0.36em] uppercase text-[#38BDF8]">
              <span className="w-10 h-px bg-[#38BDF8]/60" />
              The Gallery
            </FadeIn>
            <h2
              className="mt-5 font-serif-lux text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-[-0.02em] text-white text-balance"
              data-testid="gallery-title"
            >
              <Reveal text="Frames" />
              <br />
              <Reveal
                text="from the rooftop."
                className="italic text-white/70"
                delay={0.2}
              />
            </h2>
          </div>
          <FadeIn
            delay={0.4}
            y={16}
            className="col-span-12 md:col-span-5 text-white/65 leading-relaxed max-w-md md:ml-auto"
            data-testid="gallery-sub"
          >
            Real moments — captured between cocktails, conversations, and
            slow-burning evenings. Tap any frame to expand.
          </FadeIn>
        </div>

        {/* Masonry — desktop 3 cols, tablet 2 cols, mobile 2 cols compact */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-5">
              {col.map((img, idx) => {
                const realIndex = VENUE_IMAGES.findIndex((v) => v.id === img.id);
                return (
                  <GalleryTile
                    key={img.id}
                    img={img}
                    columnDelay={ci * 0.06 + idx * 0.05}
                    onClick={() => setActive(realIndex)}
                    testid={`gallery-tile-${realIndex}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="md:hidden grid grid-cols-2 gap-3">
          {colsMobile.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-3">
              {col.map((img, idx) => {
                const realIndex = VENUE_IMAGES.findIndex((v) => v.id === img.id);
                return (
                  <GalleryTile
                    key={img.id}
                    img={img}
                    columnDelay={ci * 0.05 + idx * 0.04}
                    onClick={() => setActive(realIndex)}
                    testid={`gallery-tile-${realIndex}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <FadeIn
          delay={0.2}
          className="mt-12 flex items-center justify-between text-[11px] tracking-[0.28em] uppercase text-white/45"
        >
          <span data-testid="gallery-count">
            {VENUE_IMAGES.length} captured · more coming soon
          </span>
          <span className="hidden sm:inline">@tbc.skylounge</span>
        </FadeIn>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#0b0f0e]/95 flex items-center justify-center p-4 md:p-10"
            onClick={close}
            data-testid="gallery-lightbox"
          >
            <button
              className="absolute top-6 right-6 w-11 h-11 rounded-full glass-strong flex items-center justify-center text-white hover:text-[#FBBF24] transition-colors"
              onClick={close}
              aria-label="Close"
              data-testid="lightbox-close"
            >
              <X size={20} />
            </button>
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white hover:text-[#FBBF24] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              data-testid="lightbox-prev"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white hover:text-[#FBBF24] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              data-testid="lightbox-next"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={VENUE_IMAGES[active].id}
              initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: [0.22, 0.65, 0.18, 1] }}
              className="relative max-w-6xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={VENUE_IMAGES[active].src}
                alt={VENUE_IMAGES[active].alt}
                className="w-full h-full max-h-[85vh] object-contain rounded-[4px]"
                data-testid="lightbox-image"
              />
              <div className="mt-4 flex items-center justify-between text-[11px] tracking-[0.24em] uppercase text-white/55">
                <span>{VENUE_IMAGES[active].alt}</span>
                <span>
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function GalleryTile({ img, onClick, testid, columnDelay = 0 }) {
  const ratios = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[1/1]", "aspect-[5/6]"];
  const ratio = ratios[(img.id.charCodeAt(1) || 0) % ratios.length];

  return (
    <motion.button
      initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 1.04 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 1.0,
        delay: columnDelay,
        ease: [0.22, 0.65, 0.18, 1],
      }}
      onClick={onClick}
      className={`relative group overflow-hidden rounded-[4px] glass cursor-zoom-in w-full lift ${ratio}`}
      data-testid={testid}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="absolute inset-0 w-full h-full object-cover kenburns transition-transform duration-[1800ms] ease-out group-hover:scale-[1.18]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0e]/65 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
      <div className="absolute inset-0 ring-0 group-hover:ring-1 group-hover:ring-[#22C55E]/45 transition-all duration-700 pointer-events-none rounded-[4px]" />
      <div className="absolute top-3 right-3 w-9 h-9 rounded-full glass-strong opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90 transition-all duration-500 flex items-center justify-center text-white">
        <Expand size={14} />
      </div>
    </motion.button>
  );
}
