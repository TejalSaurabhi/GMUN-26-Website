import { motion } from "framer-motion";
import { useRef } from "react";
import "./stars.css";

const StarsBackground = () => {
  // Generate star positions once so they don’t jump on re-renders
  const stars = useRef(
    Array.from({ length: 300 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
  ).current;

  return (
    <div className="stars-container">
      {stars.map((star, i) => (
        <motion.span
          key={i}
          className="star"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;
