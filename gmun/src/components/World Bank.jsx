import React from "react";
import WorldMap from "./WorldMap";
import "./committee.css";
import { ReactComponent as UNSCLogo } from "../images/committee_img/WB.svg";
import BackgroundGuideBox from "./BackgroundGuideBox";
import AgendaCard from "./AgendaCard";
import TwoChairBoard from "./TwoChairBoard";

const message = `
Greetings delegates!

It gives us immense pleasure to serve as your Executive Board for the simulation of the
World Bank at GMUN'26.

We have made a background guide to help you kick start your research. The background
guide has been written with the thought that it will serve as a map for you to navigate
through the mass of information which you may cross in your preparation for the
conference. It will guide you to understand the different angles to the forthcoming
discussion, a sort of a reflection of what is in store for you. Thus, as the name “map”
may be hinting, it will not provide you with all the information or analysis on the agenda
at hand but a path for you to carry out your research. For doing that, your research has to
be comprehensive and non-exhaustive. More importantly, you have to understand your
research and be able to use it. In other words, your research documents are not your
arguments. You use your research to form your argument; your research cannot be your
only argument. That is where analysis steps in.

It is extremely important for you to listen to everything other delegates talk about in the
committee, so don't keep yourself too occupied writing your own speeches, but truly
listen to what other delegates speak in the committee. It will help you give direction to
the debate happening in the committee and also some point to elaborate on or rebuttal.
The trick here is to make sure you make notes of the documents that you have read and
formulate arguments from the same.

Diplomacy is the first lesson that MUNs offer and thus, you as delegates are expected to
be extremely courteous towards all participants.
To start, you can briefly read about the agenda and break down the agenda in various
subtopics that exist within that agenda, now these topics that you have written are also
the topics that will be discussed in the committee as the moderated caucus topics. All
that you have to do now is to research the subtopics of the agenda that we have written.
Now when you research on particular subtopics, you don't just jot down information that
you have collected through various articles, but rather try to make an argument for that
subtopic while researching or simply provide your countries viewpoint on the given sub
topic. This means you would have content to speak on every possible topic raised in the
committee. Logic and foreign policy combined with in-depth research and knowledge
are necessary to be a successful delegate. As delegates, you are expected to promote the
interests of your nation and as delegates of representing different nations, you are
required to know your foreign policy on the agenda and the issues related to the same.
Try to highlight the same during the two days of the conference. 

Having said that, if you have any questions or doubts pertaining to any matters concerning this committee, please
feel free to contact us.

Happy researching!
`;

const WB = ({mode}) => {
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
                WORLD BANK
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
          agenda="Deliberation upon the impact caused by digital currency ecosystem(s) with a focus on moving towards a sustainable future for the green economy."
          label="WB"
        />
      </div>

      {/* === Executive Board Section === */}
      <TwoChairBoard
        title="Executive Board"
        subtitle="World Bank"
        chairs={[
          {
            name: "Mayank Kedia",
            role: "Co-Chair",
            image: "/team-images/Executive Board Images/Mayank Kedia.jpeg",
            bio: "Mayank Kedia has participated in 30+ debates and Model United Nations conferences, known for his clarity of thought, structured argumentation, and diplomatic approach. His journey spans from hosting fireside chats with ambassadors and sharing lunch-table conversations with ministers to actively leading discussions in ECOFIN and other economic committees, where his interest in global policy and macro-economic issues stands out. Beyond the speaking circuit, Mayank's versatility is reflected in his unconventional trajectory—from running high-reach meme pages to working in consulting—showcasing both creativity and analytical rigor. Across every platform, he brings intellectual depth, persuasive communication, and a commitment to meaningful dialogue.",
          },
          {
            name: "Vyom Gupta",
            role: "Co-Chair",
            image: "/team-images/Executive Board Images/Vyom Gupta.jpeg",
            bio: "Vyom Gupta has worn many hats in the MUN circuit; from a delegate to a trusted Executive Board member. He has served as EB at conferences hosted by esteemed institutions such as Symbiosis International (SSIMUN), Himachal Pradesh University Institute of Legal Studies, Ram Narain Ruia Autonomous College (RUIAMUN), Birla Institute of Technology (BITMUN), IIITLMUN, and VIT Pune MUN... for reasons that remain a mystery, engineering institutes seem to adore him. He now brings this experience to GMUN as the President of the World Bank simulation.",
          },
        ]}
        message={message}
      />

      {/* === Background Guide Box === */}
      <div style={{ marginBottom: "60px" }}>
        <BackgroundGuideBox link="https://drive.google.com/file/d/12TAuqznD1rTeJ1TPWoZayF-uplcNEUwP/" />
      </div>
    </div>
  );
};

export default WB;
