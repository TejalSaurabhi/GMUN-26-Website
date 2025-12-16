import React from "react";
import "./DelegateHandbookBox.css";
import { collapseToast } from "react-toastify";
import { color } from "framer-motion";

export default function BackgroundGuideBox({ link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-guide-link"
    >
      <div className="bg-guide-card">
        <p className="bg-guide-text">The Complete Delegate Handbook</p>
        <p style = {{color : 'white'}}>Your all-in-one guide to succeeding in any committee.
                <br></br>Get detailed insights, tips, and templates.</p>       
      </div>
    </a>
  );
}