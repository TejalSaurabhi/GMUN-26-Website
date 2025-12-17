import React from "react";
import WorldMap from "./WorldMap";
import "./committee.css";
import { ReactComponent as AIPPMLogo } from "../images/committee_img/AIPPM Logo.svg";
import BackgroundGuideBox from "./BackgroundGuideBox";
import AgendaCard from "./AgendaCard";
import TwoChairBoard from "./TwoChairBoard";

const message = `
Dear Delegates,

We warmly welcome all the distinguished members to this session of the All India Political Party Meet at GMUN, IIT Kharagpur on the theme “Constitutional Status of Ladakh with special emphasis on the current events, demands of Sixth Schedule and Statehood.”

This discussion seeks to engage with a contemporary and complex constitutional issue that raises important questions about democratic representation, regional autonomy, cultural protection, and national interest. Participants are encouraged to critically examine Ladakh’s present status as a Union Territory, the reasons behind recent public unrest, and the constitutional options being debated, including statehood, Sixth Schedule inclusion, and alternative safeguards.

This platform aims to foster informed, respectful, and solution-oriented debate. We urge all participants to ground their arguments in constitutional principles, factual understanding, and sensitivity towards diverse perspectives.

We look forward to a stimulating and meaningful deliberation that reflects the true spirit of parliamentary democracy.

Warm regards

Sapnil and Raj Vardhan
`;

const AIPPM = ({mode}) => {
  return (
    <div className="committee-container">
      {/* === Logo Section === */}
      <div className="emblem">
        <AIPPMLogo className="UNSCLogo" />
      </div>
    
      {/* === Committee Title + Map === */}
      <div className="committee-map">
        <WorldMap
          title={
            <span className="title-wrapper">
              <span className="hover-underline">
                ALL INDIA POLITICAL PARTY MEET
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
          agenda="Discussion on the Constitutional Status of Ladakh with special emphasis on the current events, demands of Sixth Schedule and Statehood."
          label="AIPPM"
        />
      </div>

      {/* === Executive Board Section === */}
      <TwoChairBoard
        title="Executive Board"
        subtitle="AIPPM"
        chairs={[
          {
            name: "Sapnil Biswas",
            role: "Moderator",
            image: "/team-images/Executive Board Images/Sapnil Biswas.jpg",
            bio: "Sapnil Biswas is a dynamic force in Indian Committees, with years of experience as a delegate and EB member in MUNs, Debates, and Youth Parliaments across India. A Political Science graduate from Scottish Church College, Kolkata, he is currently pursuing Master's in Political Science at the University of Delhi while working as a Research and Legislative Assistant to a Member of Parliament of Rajya Sabha. He is actively involved in grassroot politics and has worked in the office of an MLA. He has attended several conferences under Government of India as an Invitee, like the 2nd DWG meeting of G20 India. \n\nHis likes to read and study about Indian politics and governance, International Relations, Indic history, Security Studies, and Political Philosophy. Off the field of politics and academics, he is a die-hard Mohun Bagan and Messi fan, with an undying love for good food. A Suits reference can instantly ‘litt up’ his mood!",
          },
          {
            name: "Raj Vardhan Roushan",
            role: "Deputy Moderator",
            image: "/team-images/Executive Board Images/Rajvardhan.jpeg",
            bio: "Raj, a second-year undergraduate at BIT Mesra, is someone who exudes debating, diplomacy, and policy acumen through his extensive Model United Nations experience. An engineer by academia, he possesses a strong zeal for societal developments in the country and harbors a keen interest in politics.",
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

export default AIPPM;
