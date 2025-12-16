import React from "react";
import "./AgendaCard.css";
import useInView from "../hooks/useInView";

const AgendaCard = ({
  agenda = "Deliberation on the nexus between organised crime and terrorism.",
}) => {
  const [titleRef, titleInView] = useInView({ threshold: 0.5 });

  return (
    <div className="agenda-card-wrapper">
      <div className="agenda-card">
        {/* Title */}
        <h2 ref={titleRef} className={`agenda-card__title ${titleInView ? 'in-view' : ''}`}>Agenda</h2>

        {/* Description */}
        <p className="agenda-card__text">{agenda}</p>
      </div>
    </div>
  );
};

export default AgendaCard;
