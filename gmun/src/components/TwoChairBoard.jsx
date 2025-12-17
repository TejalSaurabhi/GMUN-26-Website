import React, { useState } from "react";
import "./committee.css";
import useInView from "../hooks/useInView";

const TwoChairBoard = ({ title, subtitle, chairs, message }) => {
  const [selectedChair, setSelectedChair] = useState(null);

  const openModal = (chair) => {
    setSelectedChair(chair);
    document.body.style.overflow = "hidden"; 
  };

  const closeModal = () => {
    setSelectedChair(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="cards two-chair-board fade-in">
        <h3>{subtitle}</h3>
        <h1 className="clean-heading">{title}</h1>

        <div className="two-chair-photos">
          {chairs.map((chair, index) => (
            <div 
              className="chair-card hover-lift" 
              key={index}
              onClick={() => openModal(chair)}
            >
              <div className="chair-image-wrapper clickable-chair">
                <img src={chair.image} alt={chair.name} className="chair-img" />
                <div className="click-indicator">
                  <span>View Profile</span>
                </div>
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

      {selectedChair && (
        <div className="chair-modal-overlay fade-in" onClick={closeModal}>
          <div 
            className="chair-modal-content fade-up" 
            onClick={(e) => e.stopPropagation()} 
          >
            <button className="chair-modal-close" onClick={closeModal}>&times;</button>
            
            <div className="modal-header">
              <div className="modal-img-wrapper">
                 <img src={selectedChair.image} alt={selectedChair.name} />
              </div>
              <div className="modal-title-box">
                <h2>{selectedChair.name}</h2>
                <h3>{selectedChair.role}</h3>
              </div>
            </div>

            <div className="modal-body">
              {selectedChair.bio ? (
                 selectedChair.bio.split("\n").map((line, i) => (
                   <p key={i}>{line}</p>
                 ))
              ) : (
                <p>No additional information available for this board member.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TwoChairBoard;