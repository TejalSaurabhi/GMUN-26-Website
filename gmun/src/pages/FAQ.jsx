// src/pages/FAQ.jsx
import React, { useState } from "react";
import "../styles/FAQ.css";

const FAQ_DATA = [
  { 
    q: "How do I register for the conference?", 
    a: "Registration is conducted through Unstop. Please click the Register button on the HOME page, which will redirect you to the official Unstop listing." 
  },
  { 
    q: "Is GMUN 4.0 being held online or offline?", 
    a: "GMUN 4.0 will feature six offline committees hosted on the IIT Kharagpur campus and one online committee. Delegates may choose their preferred mode during registration." 
  },
  { 
    q: "What does the registration fee include?", 
    a: "The registration fee covers access to all committee sessions, conference materials and delegate kits, and meals and accommodation for the duration of the event." 
  },
  { 
    q: "Can first-time delegates participate in GMUN?", 
    a: "Absolutely. GMUN welcomes delegates of all experience levels. Our experienced Executive Board will guide participants through procedures and ensure a constructive learning environment." 
  },
  { 
    q: "How are committee and country allotments decided?", 
    a: "Allotments are based on the information provided during registration, including committee and country preferences, prior MUN experience (if any), and quality of responses submitted. The Secretariat ensures balanced representation across committees. Allotments are released a few weeks prior to the conference and are final." 
  },
  { 
    q: "What documents should delegates carry to the conference?", 
    a: "Delegates must carry a valid government-issued photo ID and their registration confirmation." 
  },
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
