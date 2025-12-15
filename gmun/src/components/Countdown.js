import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Countdown.css";

// small util
const pad = (n) => String(n).padStart(2, "0");

// SplitText - kept from original
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

// Circular Progress Dial Component - kept from original, restyled
const TimeDial = ({ value, displayValue, max, label, isAnimated = false }) => {
  const radius = 56;
  const stroke = 2.5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <div className="countdown-dial-wrapper">
      <div className="countdown-dial">
        <div className="countdown-dial-scale">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="countdown-dial-svg"
          >
            {/* Background circle */}
            <circle
              className="countdown-dial-bg"
              strokeWidth={stroke}
              fill="transparent"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Progress circle */}
            <motion.circle
              className="countdown-dial-progress"
              strokeWidth={stroke + 0.5}
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

        <div className="countdown-dial-value-container">
          {isAnimated ? (
            <div className="countdown-dial-animated">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayValue}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="countdown-dial-number"
                >
                  {pad(displayValue)}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="countdown-dial-number">{pad(displayValue)}</div>
          )}
        </div>
      </div>
      <div className="countdown-dial-label">{label}</div>
    </div>
  );
};

// Countdown component
function CountdownTimer({ targetDate = null }) {
  const [now, setNow] = useState(Date.now());

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

  return (
    <motion.div
      className="countdown-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative corner accent */}
      <div className="countdown-corner-accent" />

      <div className="countdown-header">
        <h2 className="countdown-title">
          <SplitText text={"OPENING CEREMONY IN"} stagger={0.02} />
        </h2>
      </div>

      <div className="countdown-dials">
        <TimeDial value={days} displayValue={days} max={60} label="Days" />
        <TimeDial value={hours} displayValue={hours} max={24} label="Hours" />
        <TimeDial value={minutes} displayValue={minutes} max={60} label="Minutes" />
        <TimeDial
          value={secondsFloat}
          displayValue={secondsInt}
          max={60}
          label="Seconds"
          isAnimated={true}
        />
      </div>
    </motion.div>
  );
}

// Compact sticker-style countdown (for floating usage) – reuses full timer UI, just scaled
export function CountdownSticker() {
  // Opening Ceremony: 9 Jan 2026, 6:00 PM local time
  const target = "2026-01-09T18:00:00";
  return (
    <div className="countdown-sticker-shell">
      <CountdownTimer targetDate={target} />
    </div>
  );
}

export default function Countdown() {
  // Opening Ceremony: 9 Jan 2026, 6:00 PM local time
  const target = "2026-01-09T18:00:00";
  return (
    <div className="countdown-outer">
      <CountdownTimer targetDate={target} />
    </div>
  );
}
