import React, { useEffect, useRef, useState } from "react";

/* ------------------ OurJourney (full-screen section) ------------------ */
// function OurJourney() {
//   return (
//     <section
//       style={{
//         width: "100vw",
//         minHeight: "100vh",
//         background: "#6f6968",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "40px 20px",
//         textAlign: "center",
//         color: "#f5ebe7",
//         marginLeft: "calc(50% - 50vw)",
//         boxSizing: "border-box",
//         zIndex: 0
//       }}
//     >
//       <h2
//         style={{
//           fontFamily: "'Playfair Display', serif",
//           fontSize: "64px",
//           fontWeight: "600",
//           letterSpacing: "2px",
//           marginBottom: "20px",
//         }}
//       >
//         OUR JOURNEY
//       </h2>

//       <p
//         style={{
//           maxWidth: "900px",
//           fontSize: "18px",
//           lineHeight: "1.7",
//           color: "#e9e0dc",
//         }}
//       >
//         The journey of GMUN has been one of continuous growth and evolution.
//         What started as a small initiative has blossomed into a premier event,
//         drawing participants from across the nation. Each year, we've introduced
//         new committees, tackled more complex global issues, and enhanced the
//         delegate experience. Our expansion reflects the dedication of our team
//         and the enthusiasm of our participants. We are proud of our history and
//         excited for the future we are building together.
//       </p>
//     </section>
//   );
// }

/* ------------------ OurStory component with animate -> release flow ------------------ */
export default function OurStory() {
  const imgSrc = "/group.jpg"; // update to your image path or import
  const secretaries = [
    "Arya Dubey",
    "Atharva Deshmukh",
    "Divyansh Jain",
    "Pritvik Premkumar Shanmuga",
    "Sourav Upadhayay",
    "Sritoma Nandan",
    "Tejal Saurabhi",
 "Anshuman Singh",
"Anusha Baheti",
"Anushka Jain",
"Avani Dandawate",
"Bethina Sri Sathwika" ,
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
  // add as many as you want
];


  return (
    <div style={{ background: "#6f6968", color: "#6b6666",height: "80%" }}>
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400&display=swap');

.container { max-width: 980px; margin: 0 auto; padding: 48px 24px 0; text-align: center; }
.since { letter-spacing: 6px; font-size: 25px; margin-top: 6px; }
.title { font-family: 'Playfair Display', serif; font-weight: 700; color: #13433f; font-size: 130px; line-height: 0.82; margin: 18px 0 6px; }
.subtitle { font-size: px; letter-spacing: 4px; margin-top: 30px; margin-bottom: 40px; }

/* static image wrapper — no animation, no transform */
.image-wrap {
  width: 700px;
  height: 260px;
  margin: 28px auto 14px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 14px 35px rgba(0,0,0,0.12);
  position: relative;
}

/* image itself — keep object-fit so it crops nicely */
.image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* keep lead paragraph styling */
.lead { max-width: 720px; margin: 28px auto 46px; font-size: 15px; line-height: 1.6; color: #4b4545; text-align: center; }

/* responsive adjustments */
@media (max-width: 760px){
  .title { font-size: 64px; }
  .image-wrap { width: 200px; height: 200px; }
}


        .quote-section {
  background: #f6e7e5; /* page background */
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
}

.quote-card {
  background: #78716c; /* soft muted grey */
  padding: 70px 60px;
  border-radius: 14px;
  max-width: 1200px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

.quote-text {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 500;
  color: #f6e7e5;
  margin-bottom: 32px;
  line-height: 1.3;
}

.quote-author {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #f6e7e5;
  opacity: 0.9;
}

      `}</style>

      <div className="container">
        <div className="since">SINCE 2006</div>
        <h1 className="title">Our Legacy</h1>
        <div className="subtitle">SHAPING CONFIDENT LEADERS</div>

        
        {/* STATIC IMAGE */}
  <div className="image-wrap">
    <img src={imgSrc} alt="communique group" />
  </div>
       
        <p className="lead">
          The journey of GMUN and the soft-skills society Communiqué at IIT Kharagpur share a common thread of continuous growth. GMUN has evolved from a small initiative into a premier national event, expanding yearly by tackling complex global issues and enhancing the delegate experience. Over the past decade, Communiqué has become the official personality development body, running intensive programs like the Placement Bootcamp and Internship Training Week, which utilize industry panels and mock interviews to build student confidence, communication, and practical career skills.
        </p>

        {/* the OurJourney section follows and will be reachable after release */}
        {/* <OurJourney /> */}
        <OurEvents />
        <OurTeam team={secretaries} />
        <QuoteBlock />
      </div>
    </div>
  );
}
/* -------- Carousel (unchanged logic) -------- */
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
    <section aria-labelledby={id + "-title"} className="oe-carousel-section">
      <h3 id={id + "-title"} className="oe-carousel-title">{title}</h3>
      <p className="oe-carousel-description">{description}</p>

      <div className="oe-carousel" ref={containerRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <button className="oe-arrow oe-arrow-left" onClick={prev} aria-label={`Previous ${title}`}>‹</button>

        <div className="oe-viewport" role="list">
          {slides.map((s, i) => (
            <article key={s.id} role="listitem" aria-hidden={i !== index} className={`oe-slide ${i === index ? "active" : ""}`}>
              <div className="oe-slide-card">
                <img src={s.image} alt={s.title} className="oe-slide-img" />
                <div className="oe-slide-copy">
                  <h4 className="oe-slide-heading">{s.title}</h4>
                  <p className="oe-slide-text">{s.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button className="oe-arrow oe-arrow-right" onClick={next} aria-label={`Next ${title}`}>›</button>
      </div>

      <div className="oe-dots" role="tablist" aria-label={`${title} slides`}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`oe-dot ${i === index ? "active" : ""}`}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            role="tab"
            aria-selected={i === index}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------- OurEvents (vertical stack + palette) ---------------- */
 function OurEvents() {
  const itwSlides = [
    { id: "itw-1", image: "/events/itw-1.jpg", title: "Panel: Analytics & Data", text: "Industry experts shared data-case strategies and how to prepare for analytics interviews." },
    { id: "itw-2", image: "/events/itw-2.jpg", title: "Workshop: Software Hiring", text: "Hands-on sessions on system design, interviewing and resume building for software roles." },
    { id: "itw-3", image: "/events/itw-3.jpg", title: "Session: Finance Profiles", text: "Overview of finance recruitments and mock rounds to help students sharpen their profiles." },
  ];

  const bootcampSlides = [
    { id: "boot-1", image: "/product.jpg", title: "Product Profile", text: "The Placement Bootcamp begins with a deep dive into the Product profile. Panelists Anushka Singh, Subhayan Dey, and Gautam Jaju shared insights on product preparation, case frameworks, and strategies to excel in product interviews." },
    { id: "boot-2", image: "finance.jpg", title: "Finance Profile",
   text: "The Finance session of our Placement Bootcamp featured insights from Vaibhav Maheshwari (BlackRock) and Lakshya Jindal (DSP Mutual Funds). Both panelists shared their journeys into high-impact finance roles, and interview mindsets required for the industry.They addressed common questions about finance recruitments, and offered practical guidance, and presenting reasoning during interviews." },
    { id: "boot-3", image: "core.jpg", title: "Core Profile", 
      text: "The Core session of our Placement Bootcamp brought together insights from Yash Agarwal (Texas Instruments), Nikhil Kandregula (Optym) and Srijan Agrawal (Sedemac). This session helped participants gain a real understanding of the core placement landscape and how to prepare effectively." },
      { id: "boot-4", image: "data.jpg", title: "Data Profile", 
      text: "The Data session of our Placement Bootcamp featured insights from Suraj Gupta (American Express), Aaditya Shah (HSBC) and Mritunjay Agrahari (Americana Restaurants). This session provided a clear roadmap for students aspiring to break into data-driven roles and excel in analytical interviews."},
      { id: "boot-5", image: "sde.jpg", title: "SDE & Quant Profile", 
      text: "The SDE & Quant session of our Placement Bootcamp featured an accomplished panel: Harshith Chowdary (D.E. Shaw & Co.), Mayukha Marla (Databricks), Pranav Nyati (Graviton) and Abhinav Cillanki (Stripe)."},
  ]
  return (
    <section className="oe-section">
      <style>{`
        /* palette */
        :root{
          --bg: #f6e7e5;
          --brand: #13433fff;
          --muted: #6b6666;
          --accent: #13433fff;
          --card-dark: #13433fff;
        }

        .oe-section {
          background: var(--bg);
          padding: 88px 20px;
          box-sizing: border-box;
          color: var(--muted);
        }

        .oe-wrap { max-width: 1200px; margin: 0 auto; }

        .oe-header { text-align: center; margin-bottom: 36px; }
        .oe-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 56px;
          margin: 0 0 8px;
          color: var(--brand);
        }
        .oe-header p { color: var(--muted); max-width: 900px; margin: 0 auto; }

        /* vertical stack: ITW first, Bootcamp below */
        .oe-grid {
          display: grid;
          grid-template-columns: 1fr; /* single column always */
          gap: 64px;
          margin-top: 48px;
          align-items: start;
        }

        .oe-carousel-section { padding: 12px 20px; box-sizing: border-box; text-align: center;}

        .oe-carousel-title {
          font-family: 'Poppins', system-ui, sans-serif;
          font-size: 60px;
          font-weight: 600;
          margin: 0 0 18px;
          color: var(--brand);
        }

        .oe-carousel { display: flex; align-items: center; gap: 12px; position: relative; }

        .oe-arrow {
          width: 52px; height: 52px; border-radius: 4px; background: transparent;
          border: 2px solid rgba(19,67,63,0.06); color: var(--accent); font-size: 28px;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
        }

        .oe-viewport { flex: 1 1 auto; overflow: hidden; }

        .oe-slide { display: none; padding: 8px; box-sizing: border-box; }
        .oe-slide.active { display: block; }

        .oe-slide-card { display: flex; gap: 20px; align-items: stretch; justify-content: center; }

        .oe-slide-img {
          width: 340px; height: 340px; object-fit: cover; border-radius: 12px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .oe-slide-copy {
          background: var(--card-dark);
          color: #fff;
          padding: 28px;
          border-radius: 12px;
          width: 420px;
          box-shadow: 0 14px 40px rgba(0,0,0,0.12);
        }
        .oe-slide-heading { margin: 0 0 10px; font-size: 20px; color: #e79d1fff; }
        .oe-slide-text { margin: 0; color: #e7e7e7; line-height: 1.6; }

        .oe-dots { margin-top: 18px; display: flex; gap: 10px; justify-content: center; }
        .oe-dot { width: 10px; height: 10px; background: rgba(43,124,255,0.15); border-radius: 50%; border: none; cursor: pointer; }
        .oe-dot.active { background: var(--accent); box-shadow: 0 4px 10px rgba(43,124,255,0.14); }

        @media (max-width: 720px) {
          .oe-slide-card { flex-direction: column; align-items: center; }
          .oe-slide-img { width: 260px; height: 260px; }
          .oe-slide-copy { width: 100%; }
          .oe-arrow { display: none; }
        }
          .oe-carousel-description {
  font-size: 16px;
  color: var(--muted);
  margin: -6px 0 28px;
  line-height: 1.7;
  max-width: 760px;
  text-align: center;
  font-weight: 400;
  opacity: 0.85;
}


      `}</style>

      <div className="oe-wrap">
        <header className="oe-header">
          <h2>OUR EVENTS</h2>
          <p>Explore our flagship events that help students build confidence, practical skills and career readiness.</p>
        </header>

        <div className="oe-grid">
          {/* Internship Training Week first */}
          <Carousel id="itw" title="CDC Internship Week" description="Internships are the first step of an engineer in the corporate world. This step comes with many doubts. To equip our fellow KGPians with the proper knowledge from the people who have aced in their respective domain, we organized the CDC Internship Week covering Analytics, Software, Core, Finance and FMCG profiles." slides={itwSlides} />

          {/* Placement Bootcamp below it */}
          <Carousel id="boot" title="Placement Bootcamp" description="To help final year students, Communiqué organized the all-in-one Placement Bootcamp covering Analytics, Software, Core, Finance, FMCG, and Product profiles. The main motive of this session was to clear doubts about the selection procedures of top companies and get some valuable tips and tricks to ace the selection rounds" slides={bootcampSlides} />
        </div>
      </div>
    </section>
  );
}

function QuoteBlock() {
  return (
    <section className="quote-section">
      <div className="quote-card">
        <p className="quote-text">
          “Communication is not the art of speaking — it is the courage to express.”
        </p>
        <p className="quote-author">
          Communiqué Team <br />
          IIT Kharagpur
        </p>
      </div>
    </section>
  );
}
  /* ------------------ OUR TEAM SECTION ------------------ */
function OurTeam({ team = [] }) {
  // Sample fallback if nothing is passed
  const sampleNames = [
    "Aarav Sharma",
    "Meera Singh",
    "Rohit Das",
    "Nisha Rao",
    "Sahil Gupta",
    "Priya Nair",
  ];

  const list = team.length ? team : sampleNames;

  return (
    <section
      style={{
        width: "80vw",
        marginLeft: "calc(65% - 50vw)",
        minHeight: "100vh",
        background: "#6f6968", // matches your OUR JOURNEY bg
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px",
        boxSizing: "border-box",
        color: "#f5ebe7",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Poppins:wght@300;400&display=swap');

        .team-title {
          font-family: 'Playfair Display', serif;
          font-size: 64px;
          font-weight: 600;
          letter-spacing: 2px;
          margin-bottom: 40px;
          text-align: center;
          color: #f5ebe7;
        }

        .team-grid {
          width: 100%;
          max-width: 1100px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .team-card {
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 22px;
          text-align: center;
          font-family: 'Poppins', sans-serif;
          color: #f5ebe7;
          font-size: 18px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.08);
        }

        @media (max-width: 900px) {
          .team-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .team-grid { grid-template-columns: 1fr; }
          .team-title { font-size: 40px; }
        }
      `}</style>

      <h2 className="team-title">OUR TEAM</h2>

      <div className="team-grid">
        {list.map((name, i) => (
          <div key={i} className="team-card">
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
