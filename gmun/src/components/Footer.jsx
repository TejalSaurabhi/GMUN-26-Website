import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import cqLogo from "../images/CQ_Logo_White.webp";

const QUICK_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/AboutUs" },
  { name: "FAQs", path: "/faqs" },
  { name: "Gallery", path: "/gallery" },
];

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/communique.iitkgp/", icon: "fab fa-facebook-f", label: "Facebook" },
  { href: "https://www.linkedin.com/company/communiqu%C3%A9-iit-kharagpur/?viewAsMember=true", icon: "fab fa-linkedin-in", label: "LinkedIn" },
  { href: "https://www.instagram.com/gmun.iitkgp?igsh=ZTZlZnp4cHpqbjl3", icon: "fab fa-instagram", label: "Instagram" },
  { href: "https://www.youtube.com/channel/UCHDd6pfVicWGwIIbqIRP64g", icon: "fab fa-youtube", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">

        {/* BRAND COLUMN */}
        <div className="footer-column brand-column">
          
          <div className="footer-logo">
            {/* Logo Image */}
            <Link to="/">
              <img src={cqLogo} alt="Communiqué Logo" />
            </Link>
            
            {/* Brand Text Stack */}
            <div className="footer-brand-text">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <span className="footer-brand-title">Communiqué</span>
                <div style={{ display: 'block' }}>
                   <span className="footer-brand-sub">IIT Kharagpur</span>
                </div>
              </Link>
              
              <p className="footer-desc">
                The Official Soft Skills and Personality Development Society of IIT Kharagpur.
              </p>
            </div>
          </div>

          <a href="mailto:cq.iitkharagpur@gmail.com" className="footer-mail">
            cq.iitkharagpur@gmail.com
          </a>

          <div className="social-wrapper">
            {SOCIAL_LINKS.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
              >
                <i className={item.icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h3>QUICK LINKS</h3>
          <div className="underline"></div>
          <ul>
            {QUICK_LINKS.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* EVENT INFO */}
        <div className="footer-column event-column">
          <h3>EVENT INFO</h3>
          <div className="underline"></div>
          <p>
            <strong>Venue:</strong> Nalanda Classroom Complex, IIT Kharagpur<br />
            Kharagpur, West Bengal – 721302<br />
            <strong>Dates:</strong> 9th – 11th January 2026
          </p>
        </div>
      </div>

      {/* COPYRIGHT AREA */}
      <div className="copyright-area">
        <div className="copyright-content">
          <span className="divider">|</span>
          <span>Developed by the Communiqué Tech Team</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
