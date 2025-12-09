import React from "react";
import { motion } from "framer-motion";
import BackgroundGuideBox from "../components/DelegateHandbookBox"; //using this for brochure

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
  return (
    <div
      className="min-h-screen w-full px-4 flex flex-col items-center"
      style={{
        backgroundImage: "url('/assets/gmun-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "48px"
      }}
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-bold text-center drop-shadow-lg"
        style={{
          color: "#FFD700",
          fontSize: "4rem",
          marginBottom: "40px"
        }}
      >
        How to MUN
      </motion.h1>

      <div className="w-full flex flex-col items-center">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="w-full max-w-4xl rounded-lg border"
            style={{
              background: "rgba(15, 7, 35, 0.55)",
              border: "2px solid #B89B5E",
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.15)",
              borderRadius: "15px",
              padding: "24px 24px 24px 24px",
              marginBottom: idx !== data.length - 1 ? "40px" : "0px"
            }}
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#D8B877", marginBottom: "15px" }}>
              {item.q}
            </h2>
            <p 
              className="text-lg leading-7 whitespace-pre-line text-white"
              style={{ color: "#ffffff", marginBottom: "15px" }} 
            >
              {item.a}
            </p>
          </motion.div>
        ))}
        {/* === Background Guide Box === */}
        <div style={{ marginBottom: "60px" }}>
          <BackgroundGuideBox link="https://www.canva.com/design/DAGbOepToVo/54kVE01-QsrXxBhgB0pppg/edit" />
        </div>
      </div>
    </div>
  );
}