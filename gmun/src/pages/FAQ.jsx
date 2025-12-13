// src/pages/FAQ.jsx
import React, { useState } from "react";
import "../styles/FAQ.css";

const FAQ_DATA = [
  { q: "How do I register for the conference?", a: "Registration is happening through unstop. Click on the Register button on the website for that." },
  { q: "What does the registration fee include?", a: "The delegate fee covers entry to all committee sessions, training materials, delegate kits, and meals during the conference. Accommodation charges for outstation participants are separate." },
  { q: "Is the conference being held online or offline?", a: "GMUN 4.0 will feature 6 offline committees hosted on the IIT Kharagpur campus and 1 online committee." },
  { q: "Are there any awards or recognitions?", a: "Yes, we have various awards including Best Delegate and Best Commendation. Special Mention awards are also given for diplomatic excellence and constructive participation." },
  { q: "How are country and committee assignments determined?", a: "Assignments are based on the details you provide during registration — including your preferences, past MUN experience, and quality of responses. The Secretariat ensures balanced representation across countries and ideologies. Final allotments are released a few weeks before the conference and cannot be changed once announced." },
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
