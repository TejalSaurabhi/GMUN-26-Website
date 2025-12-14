import React, { useEffect } from "react";
import WorldMap from "./WorldMap";
import "./committee.css"; // General styles
import { ReactComponent as G20Logo } from "../images/committee_img/G20.svg";

const G20 = () => {
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
      <G20Logo className="G20" />
      </div>
    

      {/* World Map Section */}
      <div className="committee-map">
        <WorldMap title={<span className="hover-underline">G20</span>} mapDataFile="mapdata.js" />
      </div>

      {/* Committee Content Section */}
      <div className="committee-content">
        <h2>G20</h2>
       
        <p>Integrating financial and sustainable energy solutions into global policy frameworks to promote socioeconomic and environmental sustainibility.</p>
      </div>

      {/* 3D Cards Section */}
      <div className="cards">
        <h3>G20</h3>
        <h1>Executive Board</h1>

        {/* Card 1 */}
        <div className="card card__one">
          <div className="card__bg"></div>
          <img
            className="card__img"
            src="/team-images/Executive Board Images/Sayanabha.JPG"
            alt="Sayanabha Chandra"
          />
          <div className="card__hover-text">
          <p>Chairperson</p>
          </div>
          <div className="card__text">
            <p className="card__title">Sayanabha Chandra</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card card__two">
          <div className="card__bg"></div>
          <img
            className="card__img"
            src="/team-images/Executive Board Images/Kashish Rathi.JPG"
            alt="Kashish Rathi"
          />
          <div className="card__hover-text">
          <p>Vice Chairperson</p>
          </div>
          <div className="card__text">
            <p className="card__title">Kashish Rathi</p>
          </div>
        </div>

        
      </div>
      
    </div>
  );
};

export default G20;
