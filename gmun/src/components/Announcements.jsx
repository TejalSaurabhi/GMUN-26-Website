import React from 'react';
import '../styles/Announcements.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Announcements = () => {
    return (
        <div className="announcement-wrapper">
            <h1 className="section-title">Latest Announcement</h1>
            
            <div className="container">
                {/* Single Static Item */}
                <div className="single-item">
                    <div className="card-inner">
                        <div className="date-box">
                            <span className="date-num">12</span>
                            <span className="date-month">JAN</span>
                        </div>
                        <div className="text-content">
                            <h2 className="name">Delegate Applications Live</h2>
                            <p className="des">
                                "Diplomacy is the art of letting someone else have your way." Join us at IIT Kharagpur for the 3rd edition of GMUN. Experience unparalleled debate and leadership. Registrations are now open for all committees.
                            </p>
                            <button className="read-more" onClick={() => window.open('https://bit.ly/gmuniitkgp2025', '_blank')}>
                                Read more <FontAwesomeIcon icon={faChevronRight} size="xs" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Announcements;