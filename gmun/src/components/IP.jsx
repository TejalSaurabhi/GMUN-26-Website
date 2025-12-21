import React from "react";
import WorldMap from "./WorldMap";
import "./committee.css";
import { ReactComponent as UNSCLogo } from "../images/committee_img/IP-1.svg";
import BackgroundGuideBox from "./BackgroundGuideBox";
import AgendaCard from "./AgendaCard";
import TwoChairBoard from "./TwoChairBoard";

const message = `
Dear Delegates,

I, Soumalika Chakraborty, your Editor-in-Chief, will be bringing together my technical and analytical academic foundation along with a disciplined commitment to ethical journalism. My editorial philosophy is rooted in punctuality, precision, accountability, and informed judgment. And in this journey with me, as my journalists, you will surely be experiencing rigorous standards, intellectual clarity, and uncompromising fairness. This newsroom will shape your mind not merely to report but to evaluate, question, and craft narratives with ground-breaking credibility and depth. The aim will be learning substantial, and the pursuit of excellence - because meaningful journalism is learned, refined, and earned.
`;

const IP = ({mode}) => {
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
                INTERNATIONAL PRESS
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
          agenda="To cover and critically analyze all committee proceedings through unbiased journalistic reporting, interviews, and articles."
          label="UNSC"
        />
      </div>

      {/* === Executive Board Section === */}
      <TwoChairBoard
        title="Executive Board"
        subtitle="IP"
        chairs={[
          {
            name: "Soumalika Chakraborty",
            role: "Editor-in-Chief",
            image: "/team-images/Executive Board Images/Soumalika Chakraborty.jpeg",
            bio: "Soumalika Chakraborty is an aspiring computer science engineer with a nuanced grasp of algorithms and structured logics- a mind trained to identify patterns, whether in code or conduct. Guided by quiet responsibility and an unshakable sense of accountability, she leads with composure, not command. She remembers what matters and pursues that with calibrated precision. Her strength lies in clarity—not noise; in integrity—not display.",
          },
        ]}
        message={message}
      />

      {/* === Background Guide Box === */}
      <div style={{ marginBottom: "60px" }}>
        <BackgroundGuideBox link="https://drive.google.com/file/d/1i5Bby4B9yMlgKisPCRHUn7cOVVNhKRZe/" />
      </div>
    </div>
  );
};

export default IP;
