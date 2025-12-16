import "./Hero.css";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === false) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      },
      { threshold: 0.98 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  });

  const handleOfflineRegister = () => {
    window.open(
      "https://unstop.com/p/global-model-united-nations-2026-gmun-iit-kharagpur-1606090",
      "_blank"
    );
  };

  const handleOnlineRegister = () => {
    window.open(
      "https://unstop.com/p/global-model-united-nations-2026-online-committee-iit-kharagpur-1606101",
      "_blank"
    );
  };

  return (
    <motion.div
      className="hero-wrapper"
      ref={heroRef}
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.p
        className="hero-badge"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Communiqué, IIT Kharagpur Presents
      </motion.p>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
        className="hero-title"
      >
        <span className="hero-title-line">GLOBAL MODEL</span>
        <span className="hero-title-line">UNITED NATIONS</span>
        <span className="hero-title-year">2026</span>
      </motion.h1>

      <motion.p
        className="hero-tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Where diplomacy meets innovation
      </motion.p>

      <motion.div
        className="hero-buttons-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <span className="hero-register-label">Register as Delegate</span>
        <div className="hero-buttons-container">
          <button
            className="hero-register-btn hero-btn-offline"
            onClick={handleOfflineRegister}
          >
            <MapPin className="btn-icon" />
            <span>Offline</span>
            <ChevronRight className="btn-arrow" />
          </button>
          <button
            className="hero-register-btn hero-btn-online"
            onClick={handleOnlineRegister}
          >
            <Globe className="btn-icon" />
            <span>Online</span>
            <ChevronRight className="btn-arrow" />
          </button>
        </div>
      </motion.div>

      <motion.div
        className={`hero-scroll-indicator`}
        initial={!isScrolled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        animate={!isScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={
          !isScrolled ? { duration: 1, delay: 0.8 } : { duration: 0.5 }
        }
      >
        <span>Scroll to explore</span>
        <div className="scroll-line"></div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
