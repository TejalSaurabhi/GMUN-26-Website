import React, { useState } from 'react';
import '../styles/Announcements.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes, faBullhorn } from '@fortawesome/free-solid-svg-icons';

const Announcements = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnnouncement = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="sticky-announcement-wrapper">
            {/* TOGGLE BUTTON (Visible when closed) */}
            <div 
                className={`announcement-toggle ${isOpen ? 'hidden' : ''}`} 
                onClick={toggleAnnouncement}
            >
                <div className="toggle-icon-box">
                    <FontAwesomeIcon icon={faBell} className="bell-icon" />
                </div>
                <span className="toggle-text">Show Announcement</span>
            </div>

            {/* ANNOUNCEMENT CARD (Visible when open) */}
            <div className={`announcement-card ${isOpen ? 'visible' : ''}`}>
                <button className="close-btn" onClick={toggleAnnouncement}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                
                <div className="card-content">
                    <div className="icon-badge">
                        <FontAwesomeIcon icon={faBullhorn} />
                    </div>
                    <div className="text-area">
                        <h3 className="announcement-title">Update</h3>
                        <p className="announcement-msg">
                            Delegate applications are now live!
                        </p>
                    </div>
                </div>
                
                {/* Optional "Click to Register" Action */}
                <button 
                    className="action-link"
                    onClick={() => window.open('https://bit.ly/gmuniitkgp2025', '_blank')}
                >
                    Register Now
                </button>
            </div>
        </div>
    );
};

export default Announcements;