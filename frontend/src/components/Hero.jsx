import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import { HERO_VIDEO, VENUE } from "../lib/assets";
import { Reveal, FadeIn } from "./motion/Reveal";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.55, 0.78, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "8px"]);

  const scrollTo = (id) => {
    if (window.scrollToId) window.scrollToId(id);
    else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
      data-testid="hero-section"
    >
      {/* Video background — scroll-driven scale + drift */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: videoScale, y: videoY }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover kenburns-fast"
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          data-testid="hero-video"
        />
        {/* Fallback poster — first venue image while video buffers */}
        <img
          src="https://customer-assets.emergentagent.com/job_elevated-bangalore/artifacts/g5ccxl5g_Screenshot%202026-05-02%20at%206.55.01%E2%80%AFPM.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover -z-10 opacity-60"
        />
      </motion.div>

      {/* Multi-layer overlay for cinematic readability */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%,rgba(11,15,14,1)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#0b0f0e]" />
      </motion.div>

      {/* Faint accent grid lines */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* Content (also scroll-parallax + blur for depth) */}
      <motion.div
        className="relative z-10 h-full flex flex-col"
        style={{ y: contentY, filter: blur.get() ? `blur(${blur.get()})` : "none" }}
      >
        {/* Top corner — eyebrow */}
        <div className="pt-28 px-6 md:px-12 lg:px-16 flex items-center justify-between">
          <FadeIn
            delay={0.4}
            blur={4}
            y={-6}
            className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-white/60"
            data-testid="hero-eyebrow"
          >
            <span className="w-8 h-px bg-[#FBBF24]/60" />
            EST · ROOFTOP · BENGALURU
          </FadeIn>
          <FadeIn
            delay={0.6}
            blur={4}
            y={-4}
            className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-white/55"
          >
            <MapPin size={12} className="text-[#22C55E]" />
            {VENUE.shortAddress}
          </FadeIn>
        </div>

        {/* Center title */}
        <div className="flex-1 flex items-center px-6 md:px-12 lg:px-16">
          <div className="max-w-5xl">
            <h1
              className="font-serif-lux text-white text-[18vw] sm:text-[12vw] md:text-[8.5vw] lg:text-[7.5vw] leading-[0.9] tracking-[-0.02em] text-balance"
              data-testid="hero-title"
            >
              <Reveal as="span" text="To Be" stagger={0.08} delay={0.4} />
              <br />
              <Reveal
                as="span"
                text="Continued."
                by="char"
                stagger={0.04}
                delay={0.9}
                className="italic font-light text-[#FBBF24]/95"
              />
            </h1>

            <FadeIn
              delay={1.55}
              y={20}
              blur={6}
              className="mt-6 sm:mt-8 max-w-xl font-serif-lux text-2xl sm:text-3xl md:text-4xl text-white/85 leading-[1.25] text-pretty"
              data-testid="hero-subtitle"
            >
              Come, Drink, Eat.
              <br />
              <span className="text-white/55">The rest is </span>
              <span className="italic text-[#FBBF24]/95">to be continued…</span>
            </FadeIn>

            <FadeIn
              delay={1.8}
              y={16}
              blur={4}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => scrollTo("reserve")}
                className="btn-lux pulse-green group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#22C55E] text-[#0b0f0e] text-[12px] font-medium tracking-[0.26em] uppercase hover:shadow-[0_0_44px_rgba(34,197,94,0.55)]"
                data-testid="hero-cta-reserve"
              >
                Reserve a Table
                <span className="w-6 h-px bg-[#0b0f0e]/40 group-hover:w-10 transition-all duration-500" />
              </button>
              <button
                onClick={() => scrollTo("experience")}
                className="btn-lux btn-lux-gold inline-flex items-center gap-3 px-7 py-4 rounded-full border border-white/20 bg-white/[0.04] text-white text-[12px] font-medium tracking-[0.26em] uppercase backdrop-blur-md hover:bg-white/[0.08] hover:border-[#FBBF24]/50"
                data-testid="hero-cta-explore"
              >
                Explore Experience
              </button>
            </FadeIn>
          </div>
        </div>

        {/* Bottom strip */}
        <FadeIn
          delay={2.2}
          y={12}
          className="px-6 md:px-12 lg:px-16 pb-10 flex items-end justify-between"
          data-testid="hero-bottom"
        >
          <button
            onClick={() => scrollTo("about")}
            className="hidden md:flex flex-col items-start gap-3 text-[10px] tracking-[0.32em] uppercase text-white/55 hover:text-white transition-colors group"
            data-testid="hero-scroll"
          >
            Scroll
            <ArrowDown size={14} className="animate-bounce group-hover:text-[#22C55E]" />
          </button>

          <div className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.24em] uppercase text-white/55">
            <div>
              <div className="text-[#22C55E]">28°</div>
              <div className="mt-1">Tonight in BLR</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-white/80">Open · 5 PM – 1 AM</div>
              <div className="mt-1">Live music · Friday</div>
            </div>
          </div>
        </FadeIn>
      </motion.div>

      {/* Soft bottom mask — invites scroll into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0b0f0e] pointer-events-none z-10" />
    </section>
  );
}
