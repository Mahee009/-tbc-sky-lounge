import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * SwipeCarousel — embla-driven horizontal drag/swipe rail with previous/next
 * controls. Children are rendered as slides; basis prop controls slide width.
 *
 *   <SwipeCarousel basis="basis-[78%] md:basis-[34%]" gap="gap-5 md:gap-7">
 *     {items.map(item => <Card key={item.id} ... />)}
 *   </SwipeCarousel>
 */
export default function SwipeCarousel({
  children,
  basis = "basis-[80%] sm:basis-[55%] md:basis-[34%]",
  gap = "gap-4 md:gap-6",
  options = {},
  showControls = true,
  className = "",
  testid,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
    ...options,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const p = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setProgress(p);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    onScroll();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("scroll", onScroll);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, onSelect, onScroll]);

  return (
    <div className={`relative ${className}`} data-testid={testid}>
      <div
        className="overflow-hidden -mx-6 md:-mx-12 lg:-mx-16 px-6 md:px-12 lg:px-16 cursor-grab active:cursor-grabbing"
        ref={emblaRef}
      >
        <div className={`flex ${gap}`}>
          {Array.isArray(children)
            ? children.map((child, i) => (
                <div key={i} className={`min-w-0 shrink-0 grow-0 ${basis}`}>
                  {child}
                </div>
              ))
            : (
              <div className={`min-w-0 shrink-0 grow-0 ${basis}`}>{children}</div>
            )}
        </div>
      </div>

      {showControls && (
        <div className="mt-5 flex items-center justify-between gap-4">
          {/* Progress rail */}
          <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-[#FBBF24] transition-[width] duration-500"
              style={{ width: `${30 + progress * 70}%` }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous"
              className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-white/75 hover:text-[#FBBF24] hover:border-[#FBBF24]/40 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              data-testid={testid ? `${testid}-prev` : undefined}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi && emblaApi.scrollNext()}
              disabled={!canNext}
              aria-label="Next"
              className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-white/75 hover:text-[#22C55E] hover:border-[#22C55E]/40 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              data-testid={testid ? `${testid}-next` : undefined}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
