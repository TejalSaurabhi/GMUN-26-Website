import React, { useRef, useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./gmun-styles.css";

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

// TiltCard with Gold Shadow
function TiltCard({ children, className = "", intensity = 3 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Disable tilt interactions on touch devices to avoid unwanted mobile effects
    try {
      const isTouch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window ||
          (navigator && navigator.maxTouchPoints > 0));
      if (isTouch) return;
    } catch (e) {
      /* ignore in non-browser environments */
    }
    function onMove(e) {
      const r = el.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const py = ((e.clientY - r.top) / r.height - 0.5) * -2;
      el.style.transform = `perspective(900px) rotateX(${
        py * intensity
      }deg) rotateY(${px * (intensity + 2)}deg)`;
      el.style.boxShadow = `${-px * 10}px ${
        py * 10
      }px 22px rgba(212, 175, 55, 0.2)`;
    }
    function onLeave() {
      el.style.transform = "";
      el.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)";
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [intensity]);
  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

// CommendationCard
function CommendationCard({ e }) {
  return (
    <TiltCard className="rounded-2xl " intensity={3}>
      <motion.article
        whileHover={{ translateY: -6 }}
        // clicking does not open a modal anymore
        onClick={() => {
          /* no-op to keep hover style */
        }}
        className="rounded-3xl p-6 cursor-pointer shadow-lg will-change-transform flex flex-col gm-card"
        // Note: initial/animate props REMOVED here so the parent controls the stagger
        transition={{ duration: 0.42 }}
      >
        <div className="flex-1 flex flex-col">
          <div className="flex gap-4 items-start flex-shrink-0">
            <div className="flex-shrink-0">
              {/* Profile picture if present, else chip with country code */}
              {e.avatarUrl || e.avatar ? (
                <img
                  src={e.avatarUrl || e.avatar}
                  alt={`${e.title} profile`}
                  className="w-14 h-14 rounded-full object-cover shadow-sm"
                  onError={(ev) => (ev.currentTarget.style.display = "none")}
                />
              ) : (
                <div
                  className="gm-chip"
                  style={{
                    background: "var(--gm-gold)",
                    color: "var(--gm-maroon)",
                  }}
                >
                  {e.countryCode}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div
                className="gm-card-title text-xl"
                style={{
                  color: "var(--gm-maroon)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                <div
                  style={{
                    whiteSpace: "normal",
                    overflow: "visible",
                    wordBreak: "break-word",
                  }}
                >
                  <span style={{ color: "var(--gm-teal)", fontWeight: 700 }}>
                    {e.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p
            className="gm-card-short text-base mt-4"
            style={{
              color: "var(--gm-teal)",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {e.short}
          </p>

          {/* Full letter text intentionally removed; show short snippet and (optionally) image */}

          {/* Image of the letter (if available) shown below the written text */}
          {e.imageUrl && (
            <div className="mt-4">
              <img
                src={e.imageUrl}
                alt={`Letter of recommendation — ${e.countryName}`}
                className="gm-card-letter-image"
                loading="lazy"
                onError={(ev) => (ev.currentTarget.style.display = "none")}
                onClick={() => {
                  const w = window.open(e.imageUrl, "_blank");
                  if (w) w.focus();
                }}
                role="button"
                // Countdown component
                style={{ cursor: "pointer" }}
              />
            </div>
          )}
        </div>
      </motion.article>
    </TiltCard>
  );
}

// Commendations Container
export default function Commendations({
  entries = [],
  className = "w-full max-w-6xl mx-auto mt-32 px-4",
}) {
  // No modal: all content will be displayed inside the card itself.
  const sample = [
    {
      id: "c1",
      countryCode: "IN",
      countryName: "India",
      title: "Ambassador of India to Chile (Santiago)",
      short:
        "Extends best wishes to the organizers of the 3rd edition of Global Model United Nations (GMUN) 2025 at IIT Kharagpur. Highlights GMUN as a platform for young leaders to engage in diplomacy, dialogue, and international cooperation.",
      imageUrl: "/commendations/commendation1.svg",
      avatar: "/commendations/commi1.jpg",
    },
    {
      id: "c2",
      countryCode: "IN",
      countryName: "India",
      title: (
        <>
          Ambassador of India to Armenia{" "}
          <span
            style={{
              fontSize: "0.65em",
              fontWeight: 400,
              display: "inline-block",
            }}
          >
            (Concurrently accredited to Georgia)
          </span>
        </>
      ),
      short:
        "Emphasizes MUN as a valuable diplomatic simulation that builds negotiation, communication, and consensus-building skills. Encourages students to view GMUN as both a learning experience and a foundation for future leadership and diplomacy.",
      imageUrl: "/commendations/commendation2.svg",
      avatar: "/commendations/commi2.jpg",
    },
    {
      id: "c3",
      countryCode: "IN",
      countryName: "India",
      title: "High Commissioner of India to Canada (Ottawa)",
      short:
        "Highlights India’s global leadership in multilateral platforms such as the UN, G20, BRICS, and climate initiatives. Appreciates IIT Kharagpur’s GMUN for preparing students to engage confidently with global challenges and leadership roles.",
      imageUrl: "/commendations/commendation3.svg",
      avatar: "/commendations/commi3.jpg",
    },
  ];
  const list = entries.length >= 3 ? entries.slice(0, 3) : sample;
  // Using CSS sticky — no JS refs required for sticky behavior
  // Using CSS sticky for center-sticking behavior instead of JS detection

  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  // No sticky logic; cards are independent

  const containerClass = isMobile ? "w-full max-w-6xl mx-auto px-4" : className;

  return (
    <div style={{ marginBottom: isMobile ? 0 : "-50vh" }}>
      <div
        className={containerClass}
        style={{
          minHeight: isMobile ? "auto" : "60.5vh",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          ref={headingRef}
          className="mb-10 text-center"
          style={{
            position: isMobile ? "static" : "sticky",
            top: isMobile ? undefined : 124,
            paddingTop: isMobile ? 96 : undefined,
          }}
        >
          <div
            className="gm-subtitle uppercase"
            style={{
              color: "var(--gm-teal)",
              fontSize: isMobile ? "3rem" : undefined,
            }}
          >
            <SplitText text={"COMMENDATIONS"} stagger={0.01} />
          </div>
          <div
            className="text-4xl font-bold gm-title"
            style={{
              color: "var(--gm-gold)",
              marginTop: 8,
              fontSize: isMobile ? "1.4rem" : undefined,
            }}
          >
            <SplitText text={"Letters from Ambassadors"} stagger={0.01} />
          </div>
          <div className="gm-small mt-3" style={{ color: "var(--gm-teal)" }}>
            Messages of support from global diplomatic leaders
          </div>
        </div>
      </div>
      <div className={containerClass}>
        <div
          ref={containerRef}
          className={
            isMobile
              ? "grid grid-cols-1 gap-6"
              : "grid grid-cols-1 lg:grid-cols-3 gap-8 items-end"
          }
          style={
            isMobile
              ? { zIndex: 10 }
              : {
                  minHeight: "100vh",
                  zIndex: 10,
                  top: "-53.5vh",
                  position: "relative",
                }
          }
        >
          {!isMobile ? (
            <>
              <div style={{ minHeight: "100vh", position: "relative" }}>
                <div className="gm-card-sticky">
                  <CommendationCard e={entries[0] || list[0]} />
                </div>
              </div>
              <div style={{ minHeight: "84.5vh", position: "relative" }}>
                <div className="gm-card-sticky">
                  <CommendationCard e={entries[1] || list[1]} />
                </div>
              </div>
              <div style={{ minHeight: "67.5vh", position: "relative" }}>
                <div className="gm-card-sticky">
                  <CommendationCard e={entries[2] || list[2]} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                <CommendationCard e={entries[0] || list[0]} />
              </div>
              <div className="w-full">
                <CommendationCard e={entries[1] || list[1]} />
              </div>
              <div className="w-full">
                <CommendationCard e={entries[2] || list[2]} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
