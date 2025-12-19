import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import secretariat from "../components/secretariat.js";
import StarsBackground from "../components/Home/StarsBackground.jsx";
import "./Secretariat.css";

const Secretariat = () => {
  return (
    <div className="secretariat-wrapper">
      <StarsBackground />
      <div className="secretariat-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="secretariat-header"
        >
          <p className="secretariat-badge">GMUN 2026</p>
          <h1 className="secretariat-title">The Secretariat</h1>
          <p className="secretariat-subtitle">
            Meet the team behind GMUN 2026 — dedicated individuals working to create
            an unforgettable Model United Nations experience.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="secretariat-grid">
          {secretariat.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="secretariat-card"
            >
              <div className="secretariat-image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="secretariat-image"
                />
                <div className="secretariat-image-overlay" />
              </div>

              <div className="secretariat-info">
                <div>
                  <h3 className="secretariat-name">{member.name}</h3>
                  <p className="secretariat-role">{member.role}</p>
                </div>

                <div className="secretariat-socials">
                  {member.facebook && (
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="secretariat-social-link"
                      aria-label={`${member.name}'s Facebook`}
                    >
                      <FaFacebook />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="secretariat-social-link"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <FaLinkedin />
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="secretariat-social-link"
                      aria-label={`${member.name}'s Instagram`}
                    >
                      <FaInstagram />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Secretariat;