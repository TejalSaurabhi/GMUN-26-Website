import React from "react";
import WorldMap from "./WorldMap";
import "./committee.css";
import { ReactComponent as UNHRCLogo } from "../images/committee_img/UNHRCLOGO.svg";
import BackgroundGuideBox from "./BackgroundGuideBox";
import AgendaCard from "./AgendaCard";
import TwoChairBoard from "./TwoChairBoard"; 

const message = `
Dear Delegates,

As the Executive Board (EB) of the United Nations Human Rights Council (UNHRC), we welcome you to a committee entrusted with one of the gravest responsibilities in multilateral diplomacy. The agenda before you "Addressing Grave Human Rights Violations in Armed Conflict, with special emphasis on the situation in the Republic of Sudan" demands not only awareness, but precision, empathy, and accountability. 

This council is not a forum for rhetoric alone. It is a space for principled debate, legally grounded argumentation, and solution-oriented engagement rooted in international human rights law, humanitarian norms, and institutional mandates. We expect delegates to approach deliberations with seriousness, respect for procedure, and sensitivity to the human cost underlying every statistic and report.

We encourage diplomatic representatives to move beyond diagnosis and towards mechanisms underlying protection, accountability, access, and implementation. We urge participants to uphold diplomatic decorum, listen actively, and engage constructively across differences. 

We look forward to a rigorous, disciplined, and impactful session of the council. Wishing you all the very best! 


Aditya Kiran

Chairperson, UNHRC

Arghyadip Pal

Co-Chairperson, UNHRC
`;

const UNHRC2 = ({mode}) => {
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
            <span className="title-wrapper">
              <span className="hover-underline">
                UNITED NATIONS HUMAN RIGHTS COUNCIL
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
          agenda="Addressing Grave Human Rights Violations in Armed Conflict with Special Emphasis on the Situation in the Republic of the Sudan."
          label="UNHRC"
        />
      </div>

      {/* === Executive Board Section === */}
      <TwoChairBoard
        title="Executive Board"
        subtitle="UNHRC"
        chairs={[
          {
            name: "Aditya Kiran",
            role: "Co-Chairperson",
            image: "/team-images/Executive Board Images/Aditya Kiran.jpeg",
            bio: "He devotes substantial time to researching global economic affairs and contemporary geopolitical developments, bringing a disciplined and analytical approach to committee deliberations. Similarly, having participated across various United Nations (UN) committees and with experience spanning over 100 conferences, he demonstrates a strong aptitude for structured, articulate debate grounded in foreign policy principles and evidence-based analysis. As part of his doctoral research, he examines the intersection of peace building, human rights, development paradigms, and post-conflict reconstruction, with particular attention to economic reintegration in conflict-affected regions. He values substantive engagement over surface-level rhetoric and looks forward to rigorous, policy-oriented dialogue that prioritizes depth, coherence, and long-terms institutional solutions.",
          },
          {
            name: "Arghyadip Pal",
            role: "Co-Chairperson",
            image: "/team-images/Executive Board Images/Arghyadip.JPG",
            bio: "Meet Arghyadip Pal, a third year undergrad from IIT Kharagpur. With an experience of over 50 conferences under his belt as a delegate and chair across all major circuits of the country, his MUN game is stronger than his morning coffee creations. An avid bibliophile and a global policy enthusiast, he firmly believes in the power of youth in bringing global order and creating impact. \n\nBeyond MUNs, his experience of working with the Government of India and multiple nationally recognised institutions and NGOs towards the cause of sustainable social and humanitarian development allows him to bring a realistic perspective into the committee. \n\nIf he had written a self help book, it would be “Surviving questionable side quests: What not to do”"
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

export default UNHRC2;
