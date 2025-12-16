import React from "react";
import "./CommitteeMarquee.css";
import { motion } from "framer-motion";

const committees = [
  "DISEC",
  "UNHRC",
  "UNSC",
  "IP",
  "AIPPM",
  "World Bank",
  "UNCSW",
];

const CommitteeMarquee = () => {
  // Create the text content with separators
  const marqueeContent = committees.map((committee, index) => (
    <span key={index} className="committee-item">
      <span className="committee-name">{committee}</span>
      <span className="committee-separator">•</span>
    </span>
  ));

  return (
    <motion.div
      className="committee-marquee-section"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
    >
      <div className="committee-marquee-track">
        <div className="committee-marquee-content">
          {marqueeContent}
          {marqueeContent}
          {marqueeContent}
          {marqueeContent}
        </div>
        <div className="committee-marquee-content" aria-hidden="true">
          {marqueeContent}
          {marqueeContent}
          {marqueeContent}
          {marqueeContent}
        </div>
      </div>
    </motion.div>
  );
};

export default CommitteeMarquee;
