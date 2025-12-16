import React from 'react';
import './CommitteeMarquee.css';

const committees = [
  'DISEC',
  'UNHRC', 
  'UNSC',
  'IP',
  'AIPPM',
  'World Bank',
  'UNCSW'
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
    <div className="committee-marquee-section">
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
    </div>
  );
};

export default CommitteeMarquee;

