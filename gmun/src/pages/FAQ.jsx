// src/pages/FAQ.jsx
import React, { useState } from "react";
import "../styles/FAQ.css";

const FAQ_DATA = [
  { q: "What is your name?", a: "My name is Global Model United Nations (GMUN)." },
  { q: "Where do you live?", a: "I live in IIT Kharagpur." },
  { q: "Who organises you?", a: "I am organised by Communiqué, IIT Kharagpur." },
  { q: "Who made this page?", a: "We made this page with love ❤️ and creativity." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find quick answers to the most common queries about GMUN 2025.</p>
      </div>

      <div className="faq-list">
        {FAQ_DATA.map((item, i) => {
          const isOpen = i === openIndex;
          return (
            <div key={i} className={`faq-item ${isOpen ? "open" : ""}`}>
              <button
                className="faq-toggle"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
              >
                <span className="faq-question">{item.q}</span>
                <span className={`faq-icon ${isOpen ? "rotate" : ""}`} aria-hidden>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="12 5 12 19"></polyline>
                    <polyline points="5 12 19 12"></polyline>
                  </svg>
                </span>
              </button>

              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-button-${i}`}
                className="faq-panel"
                style={{ maxHeight: isOpen ? "500px" : "0px" }}
              >
                <div className="faq-panel-inner">{item.a}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✨ Still Have Questions Section */}
      <div className="faq-contact-section">
        <h2>Still Have Questions?</h2>
        <p>
          Our support team is here to help! Reach out to us for personalized
          assistance with your queries.
        </p>
        <a href="mailto:secretariat@iitbhumun.com" className="faq-contact-btn">
          secretariat@iitkgpmun.com
        </a>
      </div>
    </div>
  );
}
