// UNSC.jsx – Refined version with TwoChairBoard layout
import React from "react";
import WorldMap from "./WorldMap";
import "./committee.css";
import { ReactComponent as UNHRCLogo } from "../images/committee_img/UNHRCLOGO.svg";
import BackgroundGuideBox from "./BackgroundGuideBox";
import AgendaCard from "./AgendaCard";
import TwoChairBoard from "./TwoChairBoard"; // ⬅️ new component import

const message = `
Dear Delegates,

My name is Urvansh Saraf, and I am delighted to serve as your Co-Chair for the United Nations Security Council at HMUN 2026. It is an honor to guide this simulation of one of the most powerful and dynamic bodies in international diplomacy.

The Security Council stands as a pillar of global governance — where peace, conflict, and cooperation meet. This year’s agenda challenges you to think deeply about the intersection of organized crime and terrorism — how financial networks, arms trade, and transnational groups threaten global security, and how international cooperation can create solutions.

As your chairs, we look forward to seeing you bring creativity, intellect, and diplomacy to the table. Debate passionately, but also listen carefully — that’s where the best resolutions are built.

See you in committee!

Warm regards,
Urvansh Saraf & Swapnaneel Datta
Co-Chairs, United Nations Security Council
hmun-unsc@harvardmun.org
`;

const UNHRC2 = () => {
  return (
    <div className="committee-container">
      {/* === Logo Section === */}
      <div className="emblem">
        <UNHRCLogo className="UNSCLogo" />
      </div>
    
      {/* === Committee Title + Map === */}
      <div className="committee-map">
        <WorldMap
          title={
            <span className="hover-underline">
              UNITED NATIONS HUMAN RIGHTS COUNCIL
            </span>
          }
          mapDataFile="mapdata.js"
        />
      </div>

      {/* === Agenda Card === */}
      <div className="agenda-card-container">
        <AgendaCard
          agenda="Consideration of digital privacy rights of assessment of mechanisms for protecting personal data across national and global context."
          label="UNHRC"
        />
      </div>

      {/* === Executive Board Section === */}
      <TwoChairBoard
        title="Executive Board"
        subtitle="UNHRC"
        chairs={[
          {
            name: "Divyanshu Sharma",
            role: "Chairperson",
            image: "/team-images/Executive Board Images/Divyansu_Sharma.JPG",
          },
        ]}
        message={message}
      />

      {/* === Background Guide Box === */}
      <div style={{ marginBottom: "60px" }}>
        <BackgroundGuideBox link="https://example.com/background-guide.pdf" />
      </div>
    </div>
  );
};

export default UNHRC2;
