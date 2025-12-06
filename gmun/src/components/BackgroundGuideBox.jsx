import React from "react";
import "./BackgroundGuideBox.css";

export default function BackgroundGuideBox({ link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-guide-link"
    >
      <div className="bg-guide-card">
        <p className="bg-guide-text">BACKGROUND GUIDE COMING SOON...</p>
      </div>
    </a>
  );
}
