import React from 'react';
import '../styles/Announcements.css';
import { CountdownSticker } from './Countdown';

const Announcements = () => {
  return (
    <div className="sticky-announcement-wrapper">
      <div className="announcement-toggle">
        <CountdownSticker />
      </div>
    </div>
  );
};

export default Announcements;