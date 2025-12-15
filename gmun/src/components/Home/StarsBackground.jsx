import { motion } from "framer-motion";
import "./stars.css";

const StarsBackground = () => {
  const stars = Array.from({ length: 300 });

  return (
    <div className="stars-container">
      {stars.map((_, i) => (
        <motion.span
          key={i}
          className="star"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;
