import React, { useEffect } from "react";
import WorldMap from "./WorldMap";
import "./committee.css"; // General styles
import { ReactComponent as DISECLogo } from "../images/committee_img/DISEC_LOGO.svg";


const DISEC = () => {
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
     
      <div className="emblem">
      <DISECLogo className="Disec" />
      </div>
      
      {/* World Map Section */}
      <div className="committee-map">
        <WorldMap title={<span className="hover-underline">DISARMAMENT AND INTERNATIONAL SECURITY COMMITTEE</span>} mapDataFile="mapdata.js" />
      </div>

      {/* Committee Content Section */}
      <div className="committee-content">
        <h2>DISEC</h2>
        <p>1. Enhancing the effectiveness of disarmament,demobilization and reintegration and security sector reform in conflict-affected regions.</p>
        <p>2. Prevention of involvement of artificial intelligence in weapon systems and its implications for global security.</p>
      </div>

      {/* 3D Cards Section */}
      <div className="cards">
        <h3>DISEC</h3>
        <h1>Executive Board</h1>

        {/* Card 1 */}
        <div className="card card__one">
          <div className="card__bg"></div>
          <img
            className="card__img"
            src="/team-images/Executive Board Images/AbhinavDas.jpeg"
            alt="1"
          />
          <div className="card__hover-text">
          <p>Chairperson</p>
          </div>
          <div className="card__text">
            <p className="card__title">Abhinav Das</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card card__two">
          <div className="card__bg"></div>
          <img
            className="card__img"
            src="/team-images/Executive Board Images/SaanviGupta.jpeg"
            alt="Spirited Away"
          />
          <div className="card__hover-text">
          <p>Vice Chairperson</p>
          </div>
          <div className="card__text">
            <p className="card__title">Saanvi Gupta</p>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default DISEC;
