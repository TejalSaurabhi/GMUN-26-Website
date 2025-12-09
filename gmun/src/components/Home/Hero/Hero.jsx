import "./Hero.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/api/auth/signup");
  };

  return (
    <div className="hero-wrapper">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="hero-title"
      >
        GLOBAL MODEL UNITED NATIONS 2026
      </motion.h1>
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
    </div>
  );
};

export default Hero;
