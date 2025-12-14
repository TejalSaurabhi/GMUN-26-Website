import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./gmun-styles.css";

// small util
const pad = (n) => String(n).padStart(2, "0");

// SplitText
function SplitText({ text = "", className = "", stagger = 0.02 }) {
  const chars = useMemo(() => text.split("").map((c, i) => ({ c, i })), [text]);
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };
  const char = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.36 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
      aria-hidden
    >
      {chars.map((ch) => (
        <motion.span
          key={ch.i}
          variants={char}
          className="inline-block leading-none mr-0.5"
        >
          {ch.c === " " ? "\u00A0" : ch.c}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Circular Progress Dial Component
const TimeDial = ({ value, displayValue, max, label, isAnimated = false }) => {
  const radius = 56;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <div className="flex flex-col items-center justify-center flex-1 min-w-[60px] sm:min-w-[120px]">
      <div className="relative flex items-center justify-center">
        <div className="scale-[0.6] sm:scale-100">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="rotate-[-90deg] drop-shadow-sm"
          >
            <circle
              stroke="var(--gm-bg-secondary)"
              strokeWidth={stroke}
              fill="transparent"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <motion.circle
              stroke="var(--gm-gold)"
              strokeWidth={stroke + 1}
              strokeDasharray={circumference + " " + circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: isAnimated ? 0.05 : 0.5, ease: "linear" }}
              fill="transparent"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          {isAnimated ? (
            <div className="overflow-hidden h-[50px] flex items-center justify-center w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayValue}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="gm-dial-number"
                >
                  {pad(displayValue)}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="gm-dial-number">{pad(displayValue)}</div>
          )}
        </div>
      </div>
      <div className=" sm:mt-3 gm-dial-label uppercase tracking-widest text-xs sm:text-base">
        {label}
      </div>
    </div>
  );
};

// Countdown component
function CountdownTimer({
  targetDate = null,
  className = "w-full max-w-4xl mx-auto pt-8 sm:pt-14 scale-90 sm:scale-110 ",
}) {
  const [now, setNow] = useState(Date.now());
  const timeRef = useRef({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 50);
    return () => clearInterval(id);
  }, []);

  const end = new Date(targetDate).getTime();
  const diff = Math.max(0, end - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const secondsInt = Math.floor((diff / 1000) % 60);
  const secondsFloat = (diff / 1000) % 60;

  if (secondsInt === 59 || diff === 0) {
    timeRef.current = { days, hours, minutes, seconds: secondsInt };
  }

  return (
    <div className={`${className} pt-3 pb-6 mb-8 sm:mb-[10rem]`}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45 }}
        style={{ zIndex: 20, border: "2px solid var(--gm-gold)" }}
        className="rounded-3xl p-4 sm:p-8 shadow-xl gm-card countdown-card-effect relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gm-gold)] opacity-5 rounded-bl-full pointer-events-none" />

        <div className="flex items-center justify-between mb-8 flex-wrap gap-3 relative z-10">
          <div>
            <div
              className="gm-subtitle uppercase text-start"
              style={{ color: "var(--gm-teal)" }}
            >
              <SplitText text={"GMUN — Opening"} stagger={0.02} />
            </div>
            <div
              className="text-3xl font-bold"
              style={{ color: "var(--gm-gold)" }}
            >
              <SplitText text={"Event starts in"} stagger={0.02} />
            </div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-8">
          <TimeDial value={days} displayValue={days} max={60} label="Days" />
          <TimeDial value={hours} displayValue={hours} max={24} label="Hours" />
          <TimeDial
            value={minutes}
            displayValue={minutes}
            max={60}
            label="Minutes"
          />
          <TimeDial
            value={secondsFloat}
            displayValue={secondsInt}
            max={60}
            label="Seconds"
            isAnimated={true}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function Countdown() {
  const target = "2026-01-15T09:00:00";
  return (
    <div className="mx-auto max-w-7xl px-6 container-content">
      {" "}
      {/* Width Increased */}
      <CountdownTimer targetDate={target} />
    </div>
  );
}
