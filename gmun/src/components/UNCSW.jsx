import React from "react";
import WorldMap from "./WorldMap";
import "./committee.css";
import { ReactComponent as UNSCLogo } from "../images/committee_img/UNCSW Logo.svg";
import BackgroundGuideBox from "./BackgroundGuideBox";
import AgendaCard from "./AgendaCard";
import TwoChairBoard from "./TwoChairBoard";

const message = `
Greetings, Delegates.

Congratulations on taking the first step in your leadership and public speaking journey with GMUN. Diplomacy lies at the heart of Model United Nations, the ability to negotiate, collaborate, and advocate without compromising your core interests is an art, and MUNs provide the ideal platform to practice it alongside effective public speaking.

In the UNCSW committee, we will deliberate on the pressing challenges faced by women in conflict-affected regions, including human rights violations, barriers to reproductive health, systemic discrimination, and violence. These are complex issues that demand empathy, critical thinking, and pragmatic solutions.

I encourage each of you to engage actively, debate responsibly, and work collectively towards a meaningful and impactful resolution. I look forward to guiding you through a productive and enriching committee session.

Warm regards,

Anuprabha Bansod

Chairperson, UNCSW
`;

const UNCSW = ({mode}) => {
  return (
    <div className="committee-container">
      {/* === Logo Section === */}
      <div className="emblem">
        <UNSCLogo className="UNSCLogo" />
      </div>
    
      {/* === Committee Title + Map === */}
      <div className="committee-map">
        <WorldMap
          title={
            <span className="title-wrapper">
              <span className="hover-underline">
                UNITED NATIONS COMISSION ON THE STATUS OF WOMEN
              </span>
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
          agenda="Protection and empowerment of women in conflict-affected and armed-conflict-prone regions."
          label="UNCSW"
        />
      </div>

      {/* === Executive Board Section === */}
      <TwoChairBoard
        title="Executive Board"
        subtitle="UNCSW"
        chairs={[
          {
            name: "Anuprabha Bansod",
            role: "Chairperson",
            image: "/team-images/Executive Board Images/Anuprabha.jpg",
            bio: "Anuprabha Bansod is a National-Level Public Speaker, Debater, and MUN Mentor who has trained over 200 students in public speaking, debating, diplomacy, and leadership. She has also published research papers in constitutional and human rights law in reputed national journals. Her MUN journey extends beyond competitive debating, she views it as a platform for cultivating informed leadership, gender-sensitive policymaking, and principled diplomacy. As part of UNCSW at GMUN, IIT Kharagpur, she deeply admires the culture of intellectual rigour and meaningful dialogue that Communiqué has fostered over the years, shaping GMUN into a space that empowers young minds.",
          },
        ]}
        message={message}
      />

      {/* === Background Guide Box === */}
      <div style={{ marginBottom: "60px" }}>
        <BackgroundGuideBox link="https://docs.google.com/document/d/1MtX32fLHlYWdFYp1klRNcX-UVTq1LGvL/" />
      </div>
    </div>
  );
};

export default UNCSW;
