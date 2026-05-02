import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { VENUE } from "../lib/assets";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "reserve", label: "Reserve" },
  { id: "visit", label: "Visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    if (window.scrollToId) {
      window.scrollToId(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0b0f0e]/70 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("hero")}
          className="flex items-center gap-3 group"
          data-testid="nav-logo"
        >
          <div className="w-9 h-9 rounded-full border border-[#22C55E]/40 flex items-center justify-center bg-[#22C55E]/5 group-hover:border-[#22C55E] transition-colors">
            <span className="font-serif-lux text-[#FBBF24] text-base leading-none italic">
              T
            </span>
          </div>
          <div className="leading-none text-left">
            <div className="font-serif-lux text-[15px] tracking-[0.18em] text-white uppercase">
              TBC
            </div>
            <div className="text-[10px] tracking-[0.32em] text-white/50 uppercase">
              Sky Lounge
            </div>
          </div>
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-9" data-testid="nav-desktop">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleNav(s.id)}
              className="text-[12.5px] tracking-[0.22em] uppercase text-white/70 hover:text-[#FBBF24] transition-colors duration-300"
              data-testid={`nav-link-${s.id}`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${VENUE.phoneRaw}`}
            className="hidden lg:inline text-[12px] tracking-[0.2em] text-white/60 hover:text-white transition-colors"
            data-testid="nav-phone"
          >
            {VENUE.phone}
          </a>
          <button
            onClick={() => handleNav("reserve")}
            className="btn-lux hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22C55E] text-[#0b0f0e] text-[11.5px] font-medium tracking-[0.22em] uppercase hover:shadow-[0_0_28px_rgba(34,197,94,0.55)]"
            data-testid="nav-reserve"
          >
            Reserve
          </button>
          <button
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setOpen((v) => !v)}
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-strong border-t border-white/10"
            data-testid="nav-mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleNav(s.id)}
                  className="text-left text-sm tracking-[0.2em] uppercase text-white/80 hover:text-[#FBBF24]"
                  data-testid={`nav-mobile-link-${s.id}`}
                >
                  {s.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("reserve")}
                className="mt-2 w-full px-5 py-3 rounded-full bg-[#22C55E] text-[#0b0f0e] text-[12px] font-medium tracking-[0.22em] uppercase"
                data-testid="nav-mobile-reserve"
              >
                Reserve a Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
