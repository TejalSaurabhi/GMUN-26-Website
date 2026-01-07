import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundGuideBox from "../components/DelegateHandbookBox";
import "./HowToMUN.css";
import VideoCard from "../components/VideoCard";

const data = [
  {
    q: "What is MUN?",
    a:
      <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
        <li>
          <b>Model United Nations (MUN)</b> is a <i>simulation of the United Nations</i> where students act as representatives of countries.
        </li>
        <li>
          Delegates debate <i>global issues,</i> negotiate with other countries, and <i>draft policy-based solutions.</i>
        </li>
        <li>
          Committees follow <b>formal UN procedures</b>, including speeches, caucuses, and voting.
        </li>
        <li>
          Participants engage in :<ul><i>
            <li>Public Speaking and Formal Debate</li>
            <li>Negotiation and Diplomacy</li>
            <li>Resolution and Policy Writing</li></i>
          </ul>
        </li>
        <li>
          MUN helps improve <b>confidence and leadership, research and critical thinking, communication and teamwork skills.</b>
        </li>
        <li>
          Overall, MUN allows students to step intto the role of <b>global decision-makers</b> and practice <i>international problem-solving.</i>
        </li>
      </ul>
  },

  {
    q: "What are key MUN terminologies?",
    a: <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
      <li>
        <strong>Agenda:</strong> The topic(s) being discussed in a committee.
      </li>
      <li>
        <strong>Resolution:</strong> The final written document proposing solutions to the agenda.
      </li>
      <li>
        <strong>Preambulatory Clauses:</strong> Explain background, context, and prior international efforts.
      </li>
      <li>
        <strong>Operative Clauses:</strong> Outline specific actions and solutions.
      </li>
      <li>
        <strong>Position Paper:</strong> A short document explaining a country’s stance, background research, and proposed solutions.
      </li>
      <li>
        <strong>Caucus:</strong> A discussion period (moderated or unmoderated).
      </li>
      <li>
        <strong>Amendments:</strong> A change or improvement made to a draft resolution.
      </li>
    </ul>

  },
  {
    q: "What is the typical flow of an MUN?",
    a: <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
      <li>
        <b>Roll Call</b> marks the <i>beginning</i> of a committee session.
      </li>
      <li>
        Agenda is set if <i>multiple topics</i> exist.
      </li>
      <li>
        Delegates are added to the <b>Speakers' List</b> for formal speeches.
      </li>
      <li>
        <b>Moderated Caucuses</b> for structured discussion on subtopics.
      </li>
      <li>
        <b>Unmoderated Caucuses</b> for informal negotiation and drafting.
      </li>
      <li>
        <i>Draft resolutions</i> are written, merged, and presented.
      </li>
      <li>
        <i>Amendments and Questions</i> refine the draft.
      </li>
      <li>
        <b>Voting</b> takes place on the proposed resolutions.
      </li>
    </ul>
  },

  {
    q: "How do I research for my committee?",
    a:
      <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
        <li>
          <b>Understand the Committee and Agenda :</b>
          <ul><i>
            <li>Know the mandate and powers of your committee.</li>
            <li>Understand the agenda context and why the issue matters globally.</li></i>
          </ul>
        </li>
        <li>
          <b>Research your Country :</b> Study your country's <i>foreign policy and ideology, national interests related to the agendas, economic, political, and humanitarian priorities.</i>
        </li>
        <li>
          <b>Past UN and International Action :</b> Review <i>previous UN resolutions, international treaties and agreements, statements made by your country in the UN.</i>
        </li>
        <li>
          <b>Blocs, Allies, and Opponents :</b> Identify<i> natural allies and regional blocs, countries with opposing views, possible negotiation partners.</i>
        </li>
        <li>
          <b>Solutions and Policy Proposals :</b>
          <ul><i>
            <li>Develop realistic and actionable solutions aligned with your country’s stance.</li>
            <li>Ensure proposals respect international law and committee mandate.</li></i>
          </ul>
        </li>
        <li>
          <b>Sources to Use :</b>
          <ul><i>
            <li>UN official websites and documents</li>
            <li>Government and foreign ministry statements</li>
            <li>Reports from NGOs and international organizations</li>
            <li>Reputed news outlets and policy analyses</li></i>
          </ul>
        </li>
      </ul>
  },
  {
    q: "What are my responsibilities as a delegate?",
    a: <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
      <li>Represent your assigned country accurately and diplomatically.</li>
      <li>Deliver speeches and actively participate in debate.</li>
      <li>Negotiate, lobby, and collaborate during caucuses.</li>
      <li>Draft, support, or amend resolutions.</li>
      <li>Follow rules of procedure and maintain decorum.</li>
      <li>Balance firmness with compromise to build consensus.</li>
      <li>Contribute meaningfully toward practical solutions.</li>
    </ul>
  },
  {
    q: "What are the important Motions and Points?",
    a: <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
      <li>
        <ul><b>Motions :</b>
          <li><b>Motion for Moderated Caucus :</b> Structured discussion with a speaker’s time.</li>
          <li><b>Motion for Unmoderated Caucus :</b> Informal discussion and resolution drafting.</li>
          <li><b>Motion to suspend the meeting :</b> For breaks (lunch, tea, overnight).</li>
          <li><b>Motion to adjourn the meeting :</b> Ends the committee session.</li>
        </ul>
      </li>
      <li>
        <ul><b>Points :</b>
          <li><b>Point of Order :</b>  To correct a procedural mistake.</li>
          <li><b>Point of Information :</b> To ask a question regarding a speech or resolution.</li>
          <li><b>Point of Personal Privilege :</b> For personal discomfort affecting participation.</li>
          <li><b>Point of Reply :</b> Used when a country is personally or directly insulted.</li>
        </ul>
      </li>
    </ul>
  }

];

export default function HowToMUN() {
  const [activeIndex, setActiveIndex] = useState(-1);
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
                <BackgroundGuideBox link="https://drive.google.com/file/d/1P9IxgzJchOqVRAeyKkAH2qduoXtuab3F/view?usp=sharing" />
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

          <p className="howto-videos-subtitle">
            These videos provide a concise overview of MUN procedure and delegate
            expectations and are highly recommended for beginners.
          </p>

          <div className="howto-videos-grid">
            <VideoCard
              link="https://youtu.be/xZGhU6P3Dcc?si=BTYBWc92TEr0DMZe"
              title="What is Model United Nations?"
            />
            <VideoCard
              link="https://youtu.be/RPOFlQfwWVE?si=cdlXPXQUGbN8_w9x"
              title="Participating in a MUN Conference"
            />
            <VideoCard
              link="https://youtu.be/DQqOWmVSasE?si=4s_nsWQUCWWyUCWP"
              title="Flow of Debate"
            />
            <VideoCard
              link="https://youtu.be/7sQQAKghwhs?si=Mh0EZ60bCXSmre6X"
              title="Points & Motions in MUN"
            />
            <VideoCard
              link="https://youtu.be/ukocFZ2MyDI?si=3q6ZrudGQo5mbW5g"
              title="How To Research"
            />
            <VideoCard
              link="https://youtu.be/8NwN1NiIDdI?si=pabTHhdeBuDpV78e"
              title="Moderated Caucus"
            />
            <VideoCard
              link="https://youtu.be/NGLGImhxEWc"
              title="How To Mun Workshop"
            />
          </div>
        </motion.section>
      </div>
    </div>
  );
}