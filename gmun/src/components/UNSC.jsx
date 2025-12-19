import React from "react";
import WorldMap from "./WorldMap";
import "./committee.css";
import { ReactComponent as UNSCLogo } from "../images/committee_img/UNSC Logo.svg";
import BackgroundGuideBox from "./BackgroundGuideBox";
import AgendaCard from "./AgendaCard";
import TwoChairBoard from "./TwoChairBoard";

const message = `
Dear Delegates,

It is our pleasure to welcome you to the United Nations Security Council (UNSC) at GMUN IIT Kharagpur. Entrusted by the United Nations Charter with the primary responsibility for the maintenance of international peace and security, the Security Council serves as a platform for dialogue, negotiation, and collective decision-making on matters of global importance. This is a committee where the stakes are permanent, but the veto is very real; it is not just another committee, it is where diplomacy meets power, and where every clause can shift the balance of global peace and security.

You will be debating crises that demand precision, restraint, and strategy. As the Executive Board, our role is to facilitate structured debate, ensure procedural clarity, and support a respectful and engaging committee environment. We expect policy-driven debate, sharp yet respectful discourse, and resolutions that go beyond recycled operative clauses. If your solution sounds like it was copy-pasted, the Council will sense the threat to international peace immediately.

Delegates are encouraged to participate confidently, listen attentively, and approach discussions with an open and diplomatic mindset. While robust diplomacy is encouraged, remember: not every problem can be solved by vetoing common sense. Use this platform to negotiate boldly, caucus wisely, and draft resolutions that might just survive scrutiny and maybe even a veto or two.

We extend our best wishes to all delegates for a productive and enriching committee experience and look forward to working with you throughout the sessions. May your diplomacy be strong, your alliances strategic, and your resolutions veto-proof.

Warm regards,

Kingshuk and Niharika 
`;

// Added 'mode' prop, default to Offline
const UNSC = ({ mode = "Offline" }) => {
  return (
    <div className="committee-container">
      {/* === Logo Section === */}
      <div className="emblem">
        <UNSCLogo className="UNSCLogo" />
      </div>
    
      {/* === Committee Title + Map + Status Badge === */}
      <div className="committee-map">
        <WorldMap
          title={
            <span className="title-wrapper">
              <span className="hover-underline">
                UNITED NATIONS SECURITY COUNCIL
              </span>
              
              {/* The Badge is now part of the title block, appearing below text */}
              <span className={`status-pill ${mode.toLowerCase()}`}>
                <span className="status-dot"></span>
                {mode}
              </span>
            </span>
          }
          mapDataFile="mapdata.js"
        />
      </div>

      {/* === Agenda Card === */}
      <div className="agenda-card-container">
        <AgendaCard
          agenda="Assessing the Conflicts in the African Subcontinent and Their Threat to Regional Stability."
          label="UNSC"
        />
      </div>

      {/* === Executive Board Section === */}
      <TwoChairBoard
        title="Executive Board"
        subtitle="UNSC"
        chairs={[
          {
            name: "Kingshuk Maulik",
            role: "Co-Chair",
            image: "/team-images/Executive Board Images/Kingshuk.jpeg",
            bio: "Kingshuk is currently pursuing his Honours degree in Food Science and Technology at GITAM (Deemed to be University), Hyderabad. With a rich and diverse MUN journey, he brings extensive experience of chairing across 15+ types of committees, ranging from traditional forums such as UNHRC, UNFCCC, and UNSC to highly specialized and creative committees including Marvel and Star Wars. \n\nAs the Founder and Former President of GMUN Hyderabad, he has played a pivotal role in building the organization into a recognized hub of diplomacy, debate, and discourse on campus. Under his leadership, GMUN has not only fostered meaningful dialogue but has also successfully organized one of the largest student-led events at the university, reflecting his strong organizational and leadership capabilities. \n\nFor him, Model United Nations is the ideal intersection of diplomacy, debate, and storytelling. He is known for his patient, fair, and inclusive approach, ensuring that every delegate feels heard and encouraged to participate. Outside the MUN circuit, he is also an active film critic across multiple platforms, bringing a creative lens to his perspectives. Guided by the belief that “with great power, there must also come great responsibility” 🕷️, he strives to make every committee a space for collaboration, creativity, and critical thinking."
          },
          {
            name: "Niharika Jaiswal",
            role: "Co-Chair",
            image: "/team-images/Executive Board Images/Niharika Jaiswal.jpg",
            bio: "Niharika Jaiswal is a Sociology graduate from Banaras Hindu University (BHU) and currently pursuing her Master’s in Sociology at the same institution. A seasoned debater and critical thinker, she brings sharp insights and nuanced perspectives to discourse and diplomacy. \n\nWith 90+ MUNs and 100+ conventional debates, she has chaired and participated in international as well as national platforms, including IITs and NITs. A CBSE Class 12 District Topper, district-level debate and essay champion, and Best Speaker (Faculty of Arts, BHU), she has also won multiple gold medals at BHU. An active volunteer and organizer of academic seminars, Niharika balances her scholarly pursuits with interests in art, music, Hindu mythology, and public debates.",
          },
        ]}
        message={message}
      />

      {/* === Background Guide Box === */}
      <div style={{ marginBottom: "60px" }}>
        <BackgroundGuideBox link="" />
      </div>
    </div>
  );
};

export default UNSC;