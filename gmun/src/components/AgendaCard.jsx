import React from "react";
import "./AgendaCard.css";

const AgendaCard = ({
  agenda = "Deliberation on the nexus between organised crime and terrorism.",
  label = "UNSC",
}) => {
  const repeatingText = `• ${label} `.repeat(20);

  return (
    <div className="agenda-card-wrapper">
      <div className="agenda-card">
        {/* Rotating UNSC Text in Corner (visible only inside card) */}
        <div className="agenda-rotation-mask">
          <svg
            viewBox="0 0 200 200"
            className="agenda-rotating-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path
                id="textCircle"
                d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
              />
            </defs>
            <text className="agenda-rotating-text">
              <textPath
                href="#textCircle"
                startOffset="0%"
                method="stretch"
                spacing="auto"
              >
                {repeatingText}
              </textPath>
            </text>
          </svg>
        </div>

        {/* Title */}
        <h2 className="agenda-card__title">AGENDA</h2>

        {/* Description */}
        <p className="agenda-card__text">{agenda}</p>
      </div>
    </div>
  );
};

export default AgendaCard;
