import { motion } from "framer-motion";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
