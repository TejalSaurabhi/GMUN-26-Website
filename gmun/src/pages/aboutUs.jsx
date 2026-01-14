import "./AboutUs.css";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------ DATA ------------------ */
const governors = [
  "Arya Dubey",
  "Atharva Deshmukh",
  "Divyansh Jain",
  "Pritvik Premkumar Shanmuga",
  "Sourav Upadhayay",
  "Sritoma Nandan",
  "Tejal Saurabhi",
];

const secretaries = [
  "Anshuman Singh",
  "Anusha Baheti",
  "Anushka Jain",
  "Avani Dandawate",
  "Bethina Sri Sathwika",
  "Chaitanya Ghuge",
  "Chirag Patil",
  "Dhruv Narware",
  "Divyansh Joshi",
  "Gaurav Gupta",
  "Harshal Patil",
  "Hridyansh Singh",
  "Ishan Sekhar",
  "Kartik Patil",
  "Khushank Chandela",
  "Krishna Pasi",
  "Maadhav Goel",
  "Mugdha Jha",
  "Niraj Borole",
  "Pradyumna",
  "Pratham Sharma",
  "Priyansu Dash",
  "Rishika Ghodki",
  "Samiya Singhal",
  "Sarthak Yadav",
  "Shashwat Warune",
  "Siddhant Chavda",
  "Sneha Makharia",
  "Tanush Badonia",
  "Tarun Achari",
];

export default function AboutUs() {
  return (
    <div className="howto-wrapper about-wrapper">
      <div className="howto-container about-container">

        {/* ================= HEADER ================= */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="about-badge">SINCE 2006</span>
          <h1 className="about-title">Our Legacy</h1>
          <p className="about-subtitle">SHAPING CONFIDENT LEADERS</p>
        </motion.div>

        {/* ================= IMAGE ================= */}
        <motion.div
          className="about-image-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <img src="/images/group.webp" alt="Communiqué Group" />
        </motion.div>

        {/* ================= LEGACY ================= */}
        <LegacySplit />

        {/* ================= OUR EVENTS (RESTORED) ================= */}
        <OurEvents />

        {/* ================= TEAM ================= */}
        <OurTeam />

      </div>
    </div>
  );
}

/* ================= LEGACY ================= */
function LegacySplit() {
  return (
    <section className="legacy-layout">
      <div className="legacy-left">
        <h3>Introduction</h3>
        <p>
        Communiqué is the official soft skills and personality development society of IIT Kharagpur. For over a decade, the society has worked to support students in developing core competencies such as communication, leadership, confidence, and professional conduct.
        </p>
        <p>
        Its initiatives include structured training programmes, speaker sessions, mentorship, and competitive platforms designed to help students improve critical thinking, articulation, and collaboration. The focus extends beyond public speaking to areas such as clarity of thought, persuasive writing, interpersonal skills, and leadership in professional and high-pressure settings.
        </p>
        <p>
        Global Model United Nations (GMUN) is one such initiative. It is a diplomatic simulation conference that provides participants with practical exposure to debate, negotiation, and policy-making. As GMUN enters its fourth edition, the conference continues to offer a structured environment for students to apply and strengthen these skills.
        </p>
      </div>

      <div className="legacy-right">
        <div className="legacy-card">
          <h4>Communiqué’s Role</h4>
          <p>
          Established in 2006, we have led personality development initiatives at IIT Kharagpur for over a decade.
          </p>
        </div>

        <div className="legacy-card">
          <h4>Our Shared Mission</h4>
          <p>
        Empower students with confidence, communication, leadership, and professional skills through structured growth.
          </p>
        </div>

        <div className="legacy-card">
          <h4>Impact</h4>
          <p>
            GMUN continues to evolve by addressing global issues and nurturing
            the next generation of leaders.
          </p>
        </div>
      </div>
    </section>
  );
}

function Carousel({ id, title, description, slides }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (document.activeElement && document.activeElement.tagName === "INPUT") return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const go = (i) => setIndex(i);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? null;
    const diff = (touchStartX.current || 0) - (endX || 0);
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <motion.section
      aria-labelledby={id + "-title"}
      className="oe-carousel-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Title Animation */}
      <motion.h3
        id={id + "-title"}
        className="oe-carousel-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {title}
      </motion.h3>

      {/* Description Animation */}
      <motion.p
        className="oe-carousel-description"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {description}
      </motion.p>

      {/* Carousel Animation */}
      <motion.div
        className="oe-carousel"
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {/* Left Arrow */}
        <motion.button
          className="oe-arrow oe-arrow-left"
          onClick={prev}
          aria-label={`Previous ${title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          ‹
        </motion.button>

        {/* Slides */}
        <div className="oe-viewport" role="list">
          <AnimatePresence mode="wait">
            <motion.article
              key={slides[index].id}
              role="listitem"
              className="oe-slide active"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="oe-slide-card"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.img
                  src={slides[index].image}
                  alt={slides[index].title}
                  className="oe-slide-img"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <div className="oe-slide-copy">
                  <motion.h4
                    className="oe-slide-heading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {slides[index].title}
                  </motion.h4>

                  <motion.p
                    className="oe-slide-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {slides[index].text}
                  </motion.p>
                   {/* 🎥 YouTube Button */}
  {slides[index].youtube && (
    <a
      href={slides[index].youtube}
      target="_blank"
      rel="noopener noreferrer"
      className="oe-youtube-btn"
    >
      ▶ Watch on YouTube
    </a>
  )}
                </div>
              </motion.div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <motion.button
          className="oe-arrow oe-arrow-right"
          onClick={next}
          aria-label={`Next ${title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          ›
        </motion.button>
      </motion.div>

      {/* Dots */}
      <motion.div
        className="oe-dots"
        role="tablist"
        aria-label={`${title} slides`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {slides.map((_, i) => (
          <motion.button
            key={i}
            className={`oe-dot ${i === index ? "active" : ""}`}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            role="tab"
            aria-selected={i === index}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}

function EvalueBook() {
  return (
    <motion.section
      className="evalue-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="evalue-card">
        
        {/* Book Cover */}
        <motion.img
          src="/evalue.jpg"   // place cover image in public folder
          alt="Evalue Book Cover"
          className="evalue-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="evalue-content">
          <h3>Evalué</h3>
          <p className="evalue-tagline">The Art of a Perfect Guess</p>

          <p className="evalue-description">
            <strong>Evalué</strong> is a focused guide to mastering guesstimates for consulting interviews. It features 75 handpicked problems across industries, each solved with clear structure and logical reasoning. Designed for aspirants across IITs, IIMs, and top B-schools, it helps sharpen thinking, handle ambiguity, and build confidence for the toughest interview rounds.
          </p>

          {/* CTA */}
          <a
            href="https://drive.google.com/file/d/1fClejiFgnOdN7UBCcpKLzDinHHUA5tto/view?usp=sharing"   // put PDF in public folder
            target="_blank"
            rel="noopener noreferrer"
            className="evalue-btn"
          >
            Read the Book →
          </a>
        </div>

      </div>
    </motion.section>
  );
}

/* ================= OUR EVENTS (ORIGINAL STRUCTURE KEPT) ================= */
function OurEvents() {
  const itwSlides = [
  {
    id: "itw-1",
    image: "/consult_itw.jpg",
    title: "Consult Profile",
    text: "The Consulting session of Internship Training Week focused on structured problem-solving, guesstimates, and case interview fundamentals. The session provided a clear understanding of consulting recruitments, interview expectations, and frameworks used by top firms.",
    youtube: "https://youtu.be/8xhy-I04GXA?si=-_4lBDvFnUQZF9lu"
  },
  {
    id: "itw-2",
    image: "/core_itw.jpg",
    title: "Core Profile",
    text: "The Core Profile session offered insights into core engineering roles and recruitment processes. Participants gained clarity on preparation strategies, technical expectations, and how to approach interviews for core sector companies.",
    youtube: "https://youtu.be/Mp6BNRwpVl0?si=XFmqCwmddaQThxWr"
  },
  {
    id: "itw-3",
    image: "/data_itw.jpg",
    title: "Data Profile",
    text: "The Data Profile session introduced students to analytics and data-driven roles. It covered resume shortlisting, analytical problem-solving, and interview preparation strategies required for data and analytics internships.",
    youtube: "https://youtu.be/NeFpnUhDSUU?si=BfD0yrrV2sbbGlHF"
  },
  {
    id: "itw-4",
    image: "/software_itw.jpg",
    title: "Software & Quant Profile",
    text: "The Software and Quant session focused on coding interviews, problem-solving approaches, and preparation strategies for technical and quantitative roles. The session helped students understand the expectations of software and quant recruiters.",
    youtube: "https://youtu.be/K_rtXcd9Wpc?si=s_jpERGs48I3OG9Z"
  },
  {
    id: "itw-5",
    image: "/finance_itw.png",
    title: "Finance Profile",
    text: "The Finance Profile session provided an overview of finance internships, recruitment processes, and interview structures. It addressed common doubts regarding finance roles and shared preparation strategies for finance-driven organizations.",
    youtube: "https://youtu.be/4x8IvY4LzRQ?si=rPXA3EM9PgzHbnHQ"
  },
  {
    id: "itw-6",
    image: "/product_itw.jpg",
    title: "Product/FMCG Profile",
    text: "The Product Profile session introduced students to product thinking, problem-solving approaches, and case-based interviews relevant to product internships.",
    youtube: "https://www.youtube.com/watch?v=-EuKCWukA4Q"
  }
];


  const bootcampSlides = [
    { id: "boot-1", image: "/product.jpg", title: "Product Profile", text: "The Placement Bootcamp begins with a deep dive into the Product profile. Panelists shared insights on product preparation, case frameworks, and strategies to excel in product interviews.", 
      youtube: "https://www.youtube.com/watch?v=GbJ4EXgUGIs"
     },
    {
      id: "boot-2", image: "finance.jpg", title: "Finance Profile",
      youtube:"https://www.youtube.com/watch?v=vP6cdtPvKDQ",      text: "The Finance session of our Placement Bootcamp featured the panelists' journeys into high-impact finance roles, and interview mindsets required for the industry.They addressed common questions about finance recruitments."
    },
    {
      id: "boot-3", image: "core.jpg", title: "Core Profile",youtube:"https://www.youtube.com/watch?v=tJWIYhKkaYo",
      text: "The Core session of our Placement Bootcamp brought together valuable insights. This session helped participants gain a real understanding of the core placement landscape."
    },
    {
      id: "boot-4", image: "data.jpg", title: "Data Profile",youtube:"https://www.youtube.com/watch?v=Gqttf-9klgQ",
      text: "The Data session of our Placement Bootcamp featured valuable insights. This session provided a clear roadmap for students aspiring to break into data-driven roles."
    },
    {
      id: "boot-5", image: "sde.jpg", title: "SDE & Quant Profile",youtube:"https://www.youtube.com/watch?v=Q0_nEkvXhKQ",
      text: "The SDE & Quant session of our Placement Bootcamp featured an accomplished panel offering key insights."
    },
  ]
  return (
    <section className="about-events">
      <h2 className="about-section-title">OUR EVENTS</h2>
      <p className="about-section-subtitle">
        Explore our major events that help students in their career readiness.
      </p>

      <div className="oe-grid">
          {/* Internship Training Week first */}
          <Carousel id="itw" title="Internship Training Week" description="To equip our fellow KGPians with the proper knowledge from the people who have aced in their respective domain, we organized the CDC Internship Week covering Analytics, Software, Core, Finance and FMCG profiles." slides={itwSlides} />

          {/* Placement Bootcamp below it */}
          <Carousel id="boot" title="Placement Bootcamp" description="To help final year students, Communiqué organized the all-in-one Placement Bootcamp covering Analytics, Software, Core, Finance, FMCG, and Product profiles." slides={bootcampSlides} />
      </div>
      <EvalueBook/>
    </section>
  );
}

/* ================= TEAM ================= */
function OurTeam() {
  return (
    <section className="team-section">
      <h2 className="team-heading">OUR TEAM</h2>
     <div className="team-panel">
    <div className="team-block">
        <div className="team-label">Governors</div>
        <div className="governor-row">
          {governors.map((name) => (
            <span key={name} className="governor-name">
              <span className="dot" />
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="team-block">
        <div className="team-label">Secretaries</div>
        <ul className="secretary-list">
          {secretaries.map((name) => (
            <li key={name} className="secretary-name">
              {name}
            </li>
          ))}
        </ul>
      </div>
  </div>
      
    </section>
  );
}
