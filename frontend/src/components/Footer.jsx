import { motion } from "framer-motion";
import { Instagram, MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { VENUE } from "../lib/assets";
import { Reveal, FadeIn } from "./motion/Reveal";

export default function Footer() {
  return (
    <footer
      id="visit"
      className="relative pt-12 md:pt-20 pb-8 px-6 md:px-12 lg:px-16 overflow-hidden border-t border-white/[0.06] bg-[#0a0d0c]"
      data-testid="footer-section"
    >
      {/* Decorative big serif word */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 0.65, 0.18, 1] }}
        className="pointer-events-none select-none absolute -top-10 md:-top-20 left-0 right-0 text-center font-serif-lux text-[28vw] md:text-[20vw] leading-none tracking-tighter text-white/[0.025] whitespace-nowrap"
      >
        Continued.
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* Top — invitation line */}
        <div className="grid grid-cols-12 gap-6 mb-10 md:mb-16">
          <div className="col-span-12 md:col-span-8">
            <h3 className="font-serif-lux text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95] tracking-[-0.02em] text-balance">
              <Reveal text="See you" />
              <br />
              <Reveal
                text="on the rooftop."
                className="italic text-[#FBBF24]/95"
                delay={0.2}
              />
            </h3>
          </div>
          <FadeIn
            delay={0.4}
            className="col-span-12 md:col-span-4 flex md:justify-end items-end"
          >
            <a
              href={VENUE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-lux btn-lux-gold group inline-flex items-center gap-3 px-6 py-3.5 rounded-full glass hover:bg-white/[0.08] hover:border-[#22C55E]/40 transition-all duration-500 text-[12px] tracking-[0.26em] uppercase text-white/85"
              data-testid="footer-directions"
            >
              Get Directions
              <ArrowUpRight
                size={16}
                className="text-[#22C55E] group-hover:rotate-45 transition-transform duration-500"
              />
            </a>
          </FadeIn>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-12 gap-8 md:gap-10 pb-16 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full border border-[#22C55E]/40 flex items-center justify-center bg-[#22C55E]/5">
                <span className="font-serif-lux text-[#FBBF24] italic">T</span>
              </div>
              <div>
                <div className="font-serif-lux text-base tracking-[0.18em] text-white uppercase">
                  TBC
                </div>
                <div className="text-[10px] tracking-[0.32em] text-white/50 uppercase">
                  Sky Lounge
                </div>
              </div>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs">
              A rooftop garden bar above Bangalore. Open evenings, all week —
              for slow dinners, longer drinks, and skylines worth lingering for.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={VENUE.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/75 hover:text-[#FBBF24] hover:border-[#FBBF24]/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.25)] transition-all duration-500"
                data-testid="footer-instagram"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={`tel:${VENUE.phoneRaw}`}
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/75 hover:text-[#22C55E] hover:border-[#22C55E]/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.25)] transition-all duration-500"
                aria-label="Call"
                data-testid="footer-call"
              >
                <Phone size={15} />
              </a>
              <a
                href={`mailto:reserve@tbcskylounge.com`}
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/75 hover:text-[#38BDF8] hover:border-[#38BDF8]/50 transition-all duration-500"
                aria-label="Email"
                data-testid="footer-email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[#22C55E] mb-4">
              <MapPin size={12} /> Visit
            </div>
            <p
              className="text-white/80 leading-relaxed text-[15px] max-w-sm"
              data-testid="footer-address"
            >
              {VENUE.address}
            </p>
            <a
              href={VENUE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-[11px] tracking-[0.26em] uppercase text-[#FBBF24] hover:text-white transition-colors"
              data-testid="footer-maps"
            >
              View on Google Maps <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Hours / Contact */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[#FBBF24] mb-4">
              <Clock size={12} /> Hours
            </div>
            <ul className="space-y-2.5 text-[14.5px]" data-testid="footer-hours">
              {VENUE.hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between gap-6 border-b border-white/[0.06] pb-2.5 last:border-b-0"
                >
                  <span className="text-white/55 text-[12px] tracking-[0.22em] uppercase">
                    {h.day}
                  </span>
                  <span className="text-white/85">{h.time}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-1.5 text-[14px]">
              <a
                href={`tel:${VENUE.phoneRaw}`}
                className="block text-white/80 hover:text-[#22C55E] transition-colors"
              >
                {VENUE.phone}
              </a>
              <a
                href={VENUE.instagram}
                target="_blank"
                rel="noreferrer"
                className="block text-white/55 hover:text-[#FBBF24] transition-colors text-[12.5px] tracking-[0.18em] uppercase"
              >
                {VENUE.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] tracking-[0.22em] uppercase text-white/40">
          <span data-testid="footer-copyright">
            © {new Date().getFullYear()} TBC Sky Lounge · Bengaluru
          </span>
          <span>Crafted under the Bangalore sky · v1.0</span>
        </div>
      </div>
    </footer>
  );
}
