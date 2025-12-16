import { motion } from "framer-motion";
import "./FloatingShapes.css"

const FloatingShapes = ({ color, width, height, top, left, delay }) => {
  return (
    <motion.div
      className="fs-parent"
      style={{ top: top, left: left, backgroundColor: color, width: width, height: height }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 10,
        ease: "linear",
        repeat: Infinity,
        delay: delay,
      }}
    ></motion.div>
  );
};

export default FloatingShapes;
