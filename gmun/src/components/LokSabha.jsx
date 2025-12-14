import React, { useEffect } from "react";
import WorldMap from "./WorldMap";
import "./committee.css"; // General styles
import { ReactComponent as LokSabhalogo } from "../images/committee_img/loksabha.svg";


const LokSabha = () => {
  useEffect(() => {
    const cards = document.querySelector(".cards");
    const images = document.querySelectorAll(".card__img");
    const backgrounds = document.querySelectorAll(".card__bg");
    const range = 40;

    const calcValue = (a, b) => ((a / b) * range - range / 2).toFixed(1);

    const handleMouseMove = (event) => {
      const { clientX: x, clientY: y } = event;
      const yValue = calcValue(y, window.innerHeight);
      const xValue = calcValue(x, window.innerWidth);

      if (cards) {
        cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;
      }

      images.forEach((image) => {
        image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
      });

      backgrounds.forEach((background) => {
        background.style.backgroundPosition = `${xValue * 0.45}px ${
          -yValue * 0.45
        }px`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="committee-container">
      
      {/* Spinning UN Emblem */}
      <div className="emblem">
      <LokSabhalogo className="loksabhaLogo" />
      </div>

      {/* World Map Section */}
      <div className="committee-map">
        <WorldMap title={<span className="hover-underline">LOK SABHA</span>} mapDataFile="mapdata.js" />
      </div>

      {/* Committee Content Section */}
      <div className="committee-content">
        <h2>LokSabha</h2>
        
        <p>Deliberation on one nation one election in India with special emphasis on the constitution.</p>
      </div>

      {/* 3D Cards Section */}
      <div className="cards">
        <h3>LokSabha</h3>
        <h1>Executive Board</h1>

        {/* Card 1 */}
        <div className="card card__one">
          <div className="card__bg"></div>
          <img
            className="card__img"
            src="/team-images/Executive Board Images/sohan paul.jpg"
            alt="Sohan Paul"
          />
          <div className="card__hover-text">
          <p>Speaker</p>
          </div>
          <div className="card__text">
            <p className="card__title">Sohan Paul</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card card__two">
          <div className="card__bg"></div>
          <img
            className="card__img"
            src="/team-images/Executive Board Images/Ayush.png"
            alt="Ayush Mazumdar"
          />
          <div className="card__hover-text">
          <p>Deputy Speaker</p>
          </div>
          <div className="card__text">
            <p className="card__title">Ayush Mazumdar</p>
          </div>
        </div>

      
      </div>
     
    </div>
  );
};

export default LokSabha;
