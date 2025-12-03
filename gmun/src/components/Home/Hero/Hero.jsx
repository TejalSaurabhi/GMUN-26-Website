import React from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/api/auth/signup");
  }

  return (
    <div className="hero-wrapper">

      <h1 className="hero-title">GLOBAL MODEL UNITED NATIONS 2026</h1>
      <p className="hero-subtitle">Step into the shoes of world leaders and influence the future.</p>

      <button className="hero-button" onClick={handleClick}>REGISTER NOW!</button>
    </div>
  );
};

export default Hero;
