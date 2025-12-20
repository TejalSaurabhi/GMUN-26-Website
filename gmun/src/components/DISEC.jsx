import React from "react";
import WorldMap from "./WorldMap";
import "./committee.css";
import { ReactComponent as UNSCLogo } from "../images/committee_img/DISEC.svg";
import BackgroundGuideBox from "./BackgroundGuideBox";
import AgendaCard from "./AgendaCard";
import TwoChairBoard from "./TwoChairBoard";

const message = `
Dear Delegates

It is our distinct pleasure to invite all of you to this simulation of the United Nations 
General Assembly: Disarmament and International Security Committee (DISEC), at this 
edition of GMUN- IITKGP, 2026. Please note that this background guide is for your own 
perusal, to provide direction to your research. The real efficacy of this, however, lies in 
the use of this guide as a reference; evaluate the potential problem statements; and 
propose practical solutions that can be covered under the spectrum of this agenda, while 
incorporating them within your deliberations. 
Understanding the complexity, as well as the significance of this agenda, the Executive 
Board strongly recommends all of you to come prepared and well researched in 
committee, and at the same time, we expect you to participate throughout the course of 
the committee sessions. We look forward to putting you all in various diplomatic 
practices that might be deemed necessary to provide more substantiation to the 
deliberations at hand. We sincerely believe that all of you will come prepared, well 
researched, and motivated enough to discuss the agenda, and it’s nuances, brainstorm 
together to explore solutions, and gain back a lot from this committee. 
Our goal for you in this committee is to provide you with an enriching experience by 
helping you to navigate through the art of diplomacy, and at the same time, see you 
deliberate on real life problems, and global challenges that currently exist in the real 
world. We also expect all delegates to maintain courteous behaviour throughout the 
course of the entire conference, while looking at real life situations from a diplomatic 
standpoint. Looking forward to meeting all of you at GMUN 2026. 

With Warm Regards

Swapnaneel Datta (Chairperson)  

Soumodip Adhikary (Co Chairperson)
`;

const DISEC = ({mode}) => {
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
              DISARMAMENT AND INTERNATIONAL SECURITY COMMITTEE
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
          agenda="Strengthening the role of mediation with respect to the peaceful settlement of disputes, conflict prevention, and arms trafficking."
          label="UNGA-DISEC"
        />
      </div>

      {/* === Executive Board Section === */}
      <TwoChairBoard
        title="Executive Board"
        subtitle="UNSC"
        chairs={[
          {
            name: "Swapnaneel Dutta",
            role: "Co-Chair",
            image: "/team-images/Executive Board Images/Swapnaneel pic.jpeg",
            bio: "Swapnaneel is currently a third year student, pursuing his undergrad at the department of international relations, Jadavpur University. Having started his MUN journey back in 2021, Swapnaneel has actively participated in 55+ conferences, earning multiple accreditations from various UN agencies, notably the UNDP and ILO, through collaborations on diverse projects and training initiatives. He is also one of the very few individuals to have chaired across 5 distinct IITs, and multiple other national and internationally reputed conferences.\n\nHis finesse lies in his understanding of International Law, Conflict Resolution Oriented studies and Transcontinental Political Entrenchment. With his strong academic foundation and extensive experience, he looks forward to engaging with young minds through the means of quality research and a healthy discourse at GMUN 2026."

          },
          {
            name: "Soumodip Adhikary",
            role: "Co-Chair",
            image: "/team-images/Executive Board Images/Soumodip.jpeg",
            bio: "A Masters Student from the prestigious Jadavpur University who is extremely motivated for tomorrow, Soumodip has a strong love for communication and discussion. Having worked in the UNDP Kenya, he is particularly interested in the intricacies of geopolitics and international events, demonstrating his intellectual curiosity outside of the classroom. Because of this interest, he has been actively involved in the Model United Nations (MUN) circuit for about almost 5 years now, developing his research, diplomatic, and public speaking abilities.\n\nOften called Mr Dependable, The MUN community has recognized his thorough study, perspective analysis, and compelling arguments qualities that demonstrates his organizational skills and leadership abilities. An ardent FC Barcelona Fan he always balances out his out his hobbies but football and Catalunya comes above all."
          },
        ]}
        message={message}
      />

      {/* === Background Guide Box === */}
      <div style={{ marginBottom: "60px" }}>
        <BackgroundGuideBox link="https://drive.google.com/file/d/13P0G5hp425irVflF4p5PHNqUFJoy2CZt/" />
      </div>
    </div>
  );
};

export default DISEC;
