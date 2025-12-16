import React from "react";
import "./committee.css";
import useInView from "../hooks/useInView";

const TwoChairBoard = ({ title, subtitle, chairs, message }) => {
  const [titleRef, titleInView] = useInView({ threshold: 0.5 });

  return (
    <div className="cards two-chair-board fade-in">
      <h3>{subtitle}</h3>
      <h1 ref={titleRef} className={`clean-heading ${titleInView ? 'in-view' : ''}`}>{title}</h1>

      <div className="two-chair-photos">
        {chairs.map((chair, index) => (
          <div className="chair-card hover-lift" key={index}>
            <div className="chair-image-wrapper">
              <img src={chair.image} alt={chair.name} className="chair-img" />
            </div>
            <div className="chair-info">
              <p className="chair-name">{chair.name}</p>
              <p className="chair-role">{chair.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="two-chair-message fade-up">
        {message.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
};

export default TwoChairBoard;
