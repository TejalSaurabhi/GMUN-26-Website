import { motion } from "framer-motion";
import "./FloatingCircles.css";

const DiagonalFloatingCircles = ({
  radius,
  top,
  left,
  duration,
  color,
  opacity,
}) => {
  return (
    <motion.div
      animate={{
        x: ["0", "100%", "0"],
        y: ["0", "100%", "0"],
      }}
      transition={{ duration: duration, repeat: Infinity }}
      style={{
        height: radius * 2,
        width: radius * 2,
        backgroundColor: color,
        top: top,
        left: left,
        opacity: opacity,
      }}
      className="floating-circle"
    />
  );
};

const HorizontalFloatingCircles = ({
  radius,
  top,
  left,
  duration,
  color,
  opacity,
}) => {
  return (
    <motion.div
      animate={{
        x: ["0", "100%", "0"],
      }}
      transition={{ duration: duration, repeat: Infinity }}
      style={{
        height: radius * 2,
        width: radius * 2,
        backgroundColor: color,
        top: top,
        left: left,
        opacity: opacity,
      }}
      className="floating-circle"
    />
  );
};

const VerticalFloatingCircles = ({
  radius,
  top,
  left,
  duration,
  color,
  opacity,
}) => {
  return (
    <motion.div
      animate={{
        y: ["0", "100%", "0"],
      }}
      transition={{ duration: duration, repeat: Infinity }}
      style={{
        height: radius * 2,
        width: radius * 2,
        backgroundColor: color,
        top: top,
        left: left,
        opacity: opacity,
      }}
      className="floating-circle"
    />
  );
};

export {
  DiagonalFloatingCircles,
  HorizontalFloatingCircles,
  VerticalFloatingCircles,
};
