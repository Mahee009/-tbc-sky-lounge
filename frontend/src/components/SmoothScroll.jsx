import { useEffect } from "react";
import Lenis from "lenis";

// Single global Lenis instance to drive smooth scroll across the site.
// Also intercepts in-page anchor scrolling so navigation feels continuous.
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Hijack in-page hash links / programmatic scrolls
    const onClick = (e) => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = id ? document.getElementById(id) : null;
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: 0, duration: 0.95 });
      }
    };
    document.addEventListener("click", onClick);

    // Expose for buttons that don't use anchor tags
    window.__lenis = lenis;
    window.scrollToId = (id) => {
      const el = document.getElementById(id);
      if (el) lenis.scrollTo(el, { offset: 0, duration: 0.95 });
    };

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
      delete window.scrollToId;
    };
  }, []);

  return null;
}
