import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  ChevronDown,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { VENUE } from "../lib/assets";
import { Reveal, FadeIn } from "./motion/Reveal";

const TIMES = [
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
];

export default function Reservation() {
  const ref = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: today,
    time: "8:00 PM",
    guests: 2,
    occasion: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.4, 1, 1, 0.6]);
  const yShift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please share your name and phone so we can confirm.");
      return;
    }
    if (form.phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setSubmitted(true);
    toast.success(
      `Thank you, ${form.name.split(" ")[0]} — request received. Our hostess will confirm shortly.`
    );
  };

  return (
    <motion.section
      ref={ref}
      id="reserve"
      style={{ opacity }}
      className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16 overflow-hidden"
      data-testid="reservation-section"
    >
      {/* Glow */}
      <motion.div
        style={{ y: yShift }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60rem] h-[36rem] rounded-full opacity-[0.07] blur-3xl pointer-events-none bg-[#FBBF24]"
      />

      <div className="relative max-w-[1400px] mx-auto grid grid-cols-12 gap-10 items-center">
        {/* Left — copy */}
        <div className="col-span-12 lg:col-span-5">
          <FadeIn className="flex items-center gap-3 text-[11px] tracking-[0.36em] uppercase text-[#FBBF24]">
            <span className="w-10 h-px bg-[#FBBF24]/60" />
            Reserve
          </FadeIn>
          <h2
            className="mt-5 font-serif-lux text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.95] tracking-[-0.02em] text-white text-balance"
            data-testid="reservation-title"
          >
            <Reveal text="Hold a table" />
            <br />
            <Reveal
              text="under the canopy."
              className="italic text-[#22C55E]"
              delay={0.2}
            />
          </h2>
          <FadeIn
            delay={0.4}
            y={16}
            className="mt-7 text-white/65 leading-relaxed max-w-md"
          >
            Tell us when you'd like to arrive — our hostess will confirm
            availability over a quick call. For groups of 8+, please reach us
            directly.
          </FadeIn>
          <FadeIn delay={0.6} className="mt-8 flex flex-col gap-3 text-sm text-white/70">
            <a
              href={`tel:${VENUE.phoneRaw}`}
              className="inline-flex items-center gap-3 hover:text-[#FBBF24] transition-colors"
              data-testid="reserve-phone-link"
            >
              <Phone size={14} className="text-[#22C55E]" />
              {VENUE.phone}
            </a>
            <div className="text-[11px] tracking-[0.26em] uppercase text-white/45">
              Open · 5 PM – late · 7 days
            </div>
          </FadeIn>
        </div>

        {/* Right — form card */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.05, ease: [0.22, 0.65, 0.18, 1] }}
          className="col-span-12 lg:col-span-7 glass-strong rounded-[4px] p-6 md:p-10"
          data-testid="reservation-form"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            transition={{ staggerChildren: 0.07, delayChildren: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          >
            <FieldVar testid="reserve-input-name">
              <Field label="Full Name" icon={<User size={14} />}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Aarav Mehta"
                  className="w-full bg-transparent text-white placeholder:text-white/30 outline-none text-[15px] py-1"
                  data-testid="reserve-name"
                />
              </Field>
            </FieldVar>
            <FieldVar testid="reserve-input-phone">
              <Field label="Phone" icon={<Phone size={14} />}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 ••••• •••••"
                  className="w-full bg-transparent text-white placeholder:text-white/30 outline-none text-[15px] py-1"
                  data-testid="reserve-phone"
                />
              </Field>
            </FieldVar>
            <FieldVar testid="reserve-input-date">
              <Field label="Date" icon={<Calendar size={14} />}>
                <input
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  className="w-full bg-transparent text-white placeholder:text-white/30 outline-none text-[15px] py-1 [color-scheme:dark]"
                  data-testid="reserve-date"
                />
              </Field>
            </FieldVar>
            <FieldVar testid="reserve-input-time">
              <Field label="Time" icon={<Clock size={14} />}>
                <div className="relative w-full">
                  <select
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    className="w-full appearance-none bg-transparent text-white outline-none text-[15px] py-1 pr-6"
                    data-testid="reserve-time"
                  >
                    {TIMES.map((t) => (
                      <option key={t} value={t} className="bg-[#0b0f0e] text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                  />
                </div>
              </Field>
            </FieldVar>
            <FieldVar testid="reserve-input-guests">
              <Field label="Guests" icon={<Users size={14} />}>
                <div className="flex items-center gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => update("guests", Math.max(1, form.guests - 1))}
                    className="w-7 h-7 rounded-full border border-white/15 text-white/70 hover:text-[#FBBF24] hover:border-[#FBBF24] hover:scale-110 active:scale-95 transition-all"
                    data-testid="reserve-guests-minus"
                  >
                    –
                  </button>
                  <span className="text-white text-[15px] min-w-[2ch] text-center">
                    {form.guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => update("guests", Math.min(20, form.guests + 1))}
                    className="w-7 h-7 rounded-full border border-white/15 text-white/70 hover:text-[#FBBF24] hover:border-[#FBBF24] hover:scale-110 active:scale-95 transition-all"
                    data-testid="reserve-guests-plus"
                  >
                    +
                  </button>
                </div>
              </Field>
            </FieldVar>
            <FieldVar testid="reserve-input-occasion">
              <Field label="Occasion (optional)" icon={<Check size={14} />}>
                <input
                  type="text"
                  value={form.occasion}
                  onChange={(e) => update("occasion", e.target.value)}
                  placeholder="Birthday · Anniversary · Date night"
                  className="w-full bg-transparent text-white placeholder:text-white/30 outline-none text-[15px] py-1"
                  data-testid="reserve-occasion"
                />
              </Field>
            </FieldVar>
          </motion.div>

          <FadeIn
            delay={0.6}
            y={12}
            className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-white/45">
              {submitted
                ? "Request received — confirmation in 15 mins"
                : "No payment required · We'll call to confirm"}
            </p>
            <button
              type="submit"
              disabled={submitted}
              className="btn-lux group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#22C55E] text-[#0b0f0e] text-[12px] font-medium tracking-[0.26em] uppercase hover:shadow-[0_0_36px_rgba(34,197,94,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
              data-testid="reserve-submit"
            >
              {submitted ? (
                <>
                  <Check size={16} /> Request Sent
                </>
              ) : (
                <>
                  Send Request
                  <span className="w-6 h-px bg-[#0b0f0e]/40 group-hover:w-10 transition-all" />
                </>
              )}
            </button>
          </FadeIn>
        </motion.form>
      </div>
    </motion.section>
  );
}

function FieldVar({ children, testid }) {
  return (
    <motion.div
      data-testid={testid}
      variants={{
        hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.22, 0.65, 0.18, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function Field({ label, icon, children }) {
  return (
    <label className="block group">
      <span className="flex items-center gap-2 text-[10.5px] tracking-[0.28em] uppercase text-white/55 mb-2 group-focus-within:text-[#22C55E] transition-colors">
        <span className="text-[#FBBF24]">{icon}</span>
        {label}
      </span>
      <div className="flex items-center gap-3 px-4 py-3 rounded-[2px] bg-white/[0.04] border border-white/10 hover:border-white/25 focus-within:border-[#22C55E] focus-within:shadow-[0_0_0_1px_rgba(34,197,94,0.4),0_0_24px_rgba(34,197,94,0.15)] transition-all duration-300">
        {children}
      </div>
    </label>
  );
}
