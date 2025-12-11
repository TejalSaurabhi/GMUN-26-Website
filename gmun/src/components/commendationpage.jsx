import React, { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import './gmun-styles.css';


// SplitText
function SplitText({ text = "", className = "", stagger = 0.02 }) {
  const chars = useMemo(() => text.split("").map((c, i) => ({ c, i })), [text]);
  const container = { hidden: {}, show: { transition: { staggerChildren: stagger } } };
  const char = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.36 } } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className={className} aria-hidden>
      {chars.map((ch) => (
        <motion.span key={ch.i} variants={char} className="inline-block leading-none mr-0.5">
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
    function onMove(e) {
      const r = el.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const py = ((e.clientY - r.top) / r.height - 0.5) * -2;
      el.style.transform = `perspective(900px) rotateX(${py * intensity}deg) rotateY(${px * (intensity + 2)}deg)`;
      el.style.boxShadow = `${-px * 10}px ${py * 10}px 22px rgba(212, 175, 55, 0.2)`;
    }
    function onLeave() { el.style.transform = ""; el.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)"; }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [intensity]);
  return <div ref={ref} className={`will-change-transform ${className}`} style={{ transformStyle: "preserve-3d" }}>{children}</div>;
}

// CommendationCard
function CommendationCard({ e }) {
  return (
    <TiltCard className="rounded-2xl " intensity={3}>
      <motion.article 
        whileHover={{ translateY: -6 }} 
        // clicking does not open a modal anymore
        onClick={() => { /* no-op to keep hover style */ }}
        className="rounded-3xl p-6 cursor-pointer shadow-lg will-change-transform flex flex-col gm-card" 
        // Note: initial/animate props REMOVED here so the parent controls the stagger
        transition={{ duration: 0.42 }}
      > 
        <div className="flex-1 flex flex-col"> 
          <div className="flex gap-4 items-start flex-shrink-0"> 
            <div className="flex-shrink-0">
              {/* Profile picture if present, else chip with country code */}
              {(e.avatarUrl || e.avatar) ? (
                <img src={e.avatarUrl || e.avatar} alt={`${e.countryName} profile`} className="w-14 h-14 rounded-full object-cover shadow-sm" onError={(ev) => (ev.currentTarget.style.display = 'none')} />
              ) : (
                <div className="gm-chip" style={{ background: "var(--gm-gold)", color: "var(--gm-maroon)" }}>{e.countryCode}</div>
              )}
            </div>
            <div className="flex-1">
              <div className="gm-card-title text-xl" style={{ color: "var(--gm-maroon)", fontWeight: 700, lineHeight: 1.15 }}> 
                <div style={{ whiteSpace: "normal", overflow: "visible", wordBreak: "break-word" }}>
                  {e.countryName} — <span style={{ color: "var(--gm-teal)", fontWeight: 500 }}>{e.title}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="gm-card-short text-base mt-4" style={{ color: "var(--gm-teal)", lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{e.short}</p>

          {/* Full letter text intentionally removed; show short snippet and (optionally) image */}

          {/* Image of the letter (if available) shown below the written text */}
          {e.imageUrl && (
            <div className="mt-4">
              <img
                src={e.imageUrl}
                alt={`Letter of recommendation — ${e.countryName}`}
                className="gm-card-letter-image"
                loading="lazy"
                onError={(ev) => (ev.currentTarget.style.display = 'none')}
                onClick={() => { const w = window.open(e.imageUrl, '_blank'); if (w) w.focus(); }}
                role="button"
          // Countdown component
                style={{ cursor: 'pointer' }}
              />
            </div>
          )}
        </div>
      </motion.article>
    </TiltCard>
  );
}

// Commendations Container
export default function Commendations({ entries = [], className = "w-full max-w-6xl mx-auto mt-32 px-4" }) {
  // No modal: all content will be displayed inside the card itself.
  const sample = [
    { id: "c1", countryCode: "IN", countryName: "India", title: "Ambassador's Commendation", short: "A heartfelt letter praising GMUN's initiative and delegation quality.", full: "The Embassy of India extends its warmest congratulations to the GMUN secretariat for organizing a successful and impactful conference. We were particularly impressed by the initiative shown and the exceptional quality of the participating delegations. We recommend this event highly to all future participants.", imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=60" },
    { id: "c2", countryCode: "US", countryName: "United States", title: "Letter of Recommendation", short: "Recognizes the conference's role in fostering dialogue and leadership.", full: "The United States Embassy is delighted to recognize the GMUN conference's critical role in fostering constructive international dialogue and developing future global leaders. The level of debate and resolution drafting was exemplary, demonstrating true academic rigor.", imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=60" },
    { id: "c3", countryCode: "GB", countryName: "United Kingdom", title: "Official Commendation", short: "Highlights academic rigor and diplomatic spirit.", full: "We commend GMUN for their meticulous planning and the outstanding platform they provide for students to engage with complex global issues. The event truly highlights a strong sense of academic rigor and an excellent diplomatic spirit among all delegates.", imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=60" },
  ];
  const list = entries.length ? entries : sample;
  // Using CSS sticky — no JS refs required for sticky behavior
  // Using CSS sticky for center-sticking behavior instead of JS detection

  const containerRef = useRef(null);
  // Track scroll distance to disable c2 sticky after 20svh

  // Measure each sticky wrapper's height and set a CSS variable that centers
  // the element vertically without using transform (which can break position: sticky).

  return (
    <div className={className} style={{ position: "relative", zIndex: 10 }}>
      <div className="mb-10 text-center"> 
        <div className="gm-subtitle uppercase" style={{ color: "var(--gm-teal)" }}><SplitText text={"COMMENDATIONS"} stagger={0.01} /></div>
        <div className="text-4xl font-bold gm-title" style={{ color: "var(--gm-gold)", marginTop: 8 }}><SplitText text={"Letters from Ambassadors"} stagger={0.01} /></div> 
        <div className="gm-small mt-3" style={{ color: "var(--gm-teal)" }}>Trusted endorsements from partner embassies</div> 
      </div>
      
      <div 
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
         // <-- Adjust this value to change sticky duration for c1
      > 
        {list.map((e, idx) => {
          // Offsets stagger when each card appears during scroll
          // c1: no offset (appears first), c2: 20svh offset, c3: 40svh offset (no sticky)
          const offsets = { c2: '20svh', c3: '40svh' };
          const offset = offsets[e.id] || null;
          const wrapperStyle = offset ? { marginTop: offset } : undefined;
          // assign distinct classes: c1 uses full sticky, c2 uses short-sticky, c3 not sticky
          
          return (
            <div key={e.id} className="h-full" style={wrapperStyle}>
                <CommendationCard e={e} />
            </div>
          );
        })}
      </div>
      {/* No modal: full letters are displayed inline within each card */}
    </div>
  );
}

