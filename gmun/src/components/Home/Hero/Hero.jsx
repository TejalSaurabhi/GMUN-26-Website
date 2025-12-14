import "./Hero.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/api/auth/signup");
  };

  return (
    <motion.div
      className="hero-wrapper"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
        className="hero-title"
      >
        GLOBAL MODEL UNITED NATIONS 2026
      </motion.h1>

      <motion.div
        className="hero-divider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.25 }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="hero-subtitle"
      >
        Step into the shoes of world leaders and influence the future.
      </motion.p>

      {/* This section contains the fully functional register button with all routes - signup, login, verification, authentication configured, ask Ishan to link your email id from which the emails will be sent */}
      {/* <button className="hero-button" onClick={handleClick}>REGISTER NOW!</button> */}
    </motion.div>
  );
};

export default Hero;
