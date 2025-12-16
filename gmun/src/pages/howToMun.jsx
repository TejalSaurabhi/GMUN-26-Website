import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundGuideBox from "../components/DelegateHandbookBox";
import "./HowToMUN.css";
import VideoCard from "../components/VideoCard";


const data = [
  {
    q: "What is MUN?",
    a: `Model United Nations (MUN) is a diplomatic simulation where students 
represent countries and attempt to solve global issues through discussion, 
negotiation, and collaborative policy writing. Delegates engage in structured 
debates, moderated caucuses, lobbying sessions, and resolution drafting, 
mirroring the procedures of the actual United Nations. Beyond academics, 
MUN is an experiential platform that builds confidence, critical thinking, 
research ability, and interpersonal diplomacy. It encourages participants 
to step into the shoes of diplomats, defend national interests, form alliances, 
and learn how international cooperation works in practice. GMUN provides 
students with a structured environment to experience global problem-solving 
first-hand while developing leadership and communication skills indispensable 
for real-world negotiations.`
  },
  {
    q: "What are key MUN terminologies?",
    a: `Understanding MUN terminology is essential for effective participation. 
A Resolution is the final actionable document drafted by delegates as a solution 
to the committee’s agenda. Preambulatory clauses introduce context, intentions, 
and prior international efforts, while operative clauses propose specific actions. 
A Position Paper is a concise document summarizing your country's stance, 
background research, and proposed solutions. Lobbying is the informal negotiation 
period where delegates merge drafts, form alliances, and gather signatories 
before the resolution is formally presented. Motions help control the flow of debate, 
Points allow delegates to clarify procedure or ask questions, and Amendments enable 
edits to resolutions. Mastering these terms enables smoother debate, stronger 
resolution writing, and more confident committee participation.`
  },
  {
    q: "What is the typical flow of an MUN?",
    a: `An MUN committee follows a structured progression designed to replicate 
diplomatic decision-making. It begins with Roll Call followed by Setting the Agenda. 
Delegates then enter the Speakers' List, delivering formal speeches outlining national 
positions. Moderated Caucuses allow focused discussion on subtopics, whereas 
Unmoderated Caucuses enable free movement, collaboration, and resolution drafting. 
Delegates negotiate wording, merge documents, and build alliances before presenting 
their resolutions. After presentation, Points of Information and amendments shape the 
document further. Finally, the committee votes clause-by-clause or as a whole depending 
on committee type. Understanding this flow allows you to anticipate procedural steps, 
strategize effectively, and participate confidently in GMUN.`
  },
  {
    q: "How do I research for my committee?",
    a: `Strong research is the foundation of successful MUN participation. Begin by studying 
your country’s foreign policy, alliances, treaties signed, and previous actions on the 
topic. Explore historical context, geopolitical interests, economic constraints, and 
humanitarian considerations that shape national decision-making. Next, examine relevant 
UN resolutions, international conventions, NGO reports, and expert analyses. Organize 
findings into categories such as background info, national stance, other countries’ 
positions, and sample clauses. Delegates who understand the positions of allies and 
opponents can negotiate more effectively and craft resolutions that appeal to multiple 
blocs. Good research not only strengthens speeches and lobbying but also ensures your 
proposals remain realistic and diplomatically aligned.`
  },
  {
    q: "What are my responsibilities as a delegate?",
    a: `A delegate’s primary responsibility is to accurately represent the assigned country’s 
stance while maintaining professionalism and diplomacy. This includes preparing speeches, 
drafting resolutions, engaging in lobbying, collaborating during caucuses, and responding 
to questions with confidence. Delegates must stay updated on global developments, understand 
geopolitical dynamics, and approach discussions respectfully. Diplomacy also requires 
adaptability—knowing when to compromise, when to defend your stance firmly, and how to build 
consensus. Delegates must contribute meaningfully to discussions, uphold MUN procedure, and 
work towards actionable, realistic solutions. In GMUN, the most successful delegates demonstrate 
knowledge, teamwork, leadership, and strategic thinking throughout all sessions.`
  }
];

export default function HowToMUN() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  const handleCardClick = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  const handlePillClick = (index) => {
    setActiveIndex(index);
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="howto-wrapper">
      {/* no extra dark overlay, background comes from the page itself */}
      <div className="howto-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="howto-header"
        >
          <p className="howto-badge">GMUN DELEGATE ESSENTIALS</p>
          <h1 className="howto-title">How to MUN</h1>
          <p className="howto-subtitle">
            A quick, interactive guide to help you understand the flow, research, and
            responsibilities of a delegate.
          </p>
        </motion.div>

        {/* Top pill navigation
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="howto-pills"
        >
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => handlePillClick(index)}
              className={
                "howto-pill" + (activeIndex === index ? " howto-pill-active" : "")
              }
            >
              {item.q}
            </button>
          ))}
        </motion.div> */}

        {/* Main layout */}
        <div className="howto-main">
          {/* Left: accordion cards */}
          <div className="howto-cards">
            {data.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <motion.div
                  key={idx}
                  ref={(el) => (sectionRefs.current[idx] = el)}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  className={
                    "howto-card" + (isActive ? " howto-card-active" : "")
                  }
                  onClick={() => handleCardClick(idx)}
                >
                  <div className="howto-card-inner">
                    <div
                      className={
                        "howto-card-number" +
                        (isActive ? " howto-card-number-active" : "")
                      }
                    >
                      {idx + 1}
                    </div>

                    <div className="howto-card-content">
                      <div className="howto-card-header">
                        <h2 className="howto-card-title">{item.q}</h2>
                        <motion.span
                          initial={false}
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="howto-card-toggle"
                        >
                          ▾
                        </motion.span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="howto-card-body"
                          >
                            <p className="howto-card-text">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: ONLY Background Guide & Handbook box */}
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="howto-sidebar"
          >
            <div className="howto-box howto-brochure-box">
              <h4 className="howto-box-title">Background Guide &amp; Handbook</h4>
              <p className="howto-box-text">
                For deeper procedures, format rules, and advanced tips, refer to the
                official GMUN background guide.
              </p>
              <div className="howto-brochure">
                <BackgroundGuideBox link="https://www.canva.com/design/DAGbOepToVo/54kVE01-QsrXxBhgB0pppg/edit" />
              </div>
            </div>
          </motion.aside>
        </div>
          
        {/* === VIDEO TRAINING SECTION === */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="howto-videos-section"
        >
          <h2 className="howto-videos-title">Training Videos</h2>

          <div className="howto-videos-grid">
            <VideoCard 
              link="https://youtu.be/ZJU7DG3S-Fo?si=QucecLB1p1IMymg2"
              title="What is Model United Nations?"
            />
            <VideoCard 
              link="https://www.youtube.com/watch?v=VIDEO_ID_2"
              title="Participating in a MUN Conference"
            />
            <VideoCard 
              link="https://www.youtube.com/watch?v=VIDEO_ID_3"
              title="Flow of Debate"
            />
            <VideoCard 
              link="https://www.youtube.com/watch?v=VIDEO_ID_4"
              title="Points & Motions in MUN"
            />
          </div>
        </motion.section>
      </div>
    </div>
  );
}