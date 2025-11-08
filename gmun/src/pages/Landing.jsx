import { useEffect, useState } from "react";
import Announcements from "../components/Announcements";
import Committee from "../components/Committee";
import "./landing.css";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./Home";
import Secretariat from "./Secretariat";
import AuthLayout from "../components/AuthLayout";
import Sponsors from "../components/Sponsors";

const sections = [
  {
    id: 0,
    page: <Announcements />,
    title: "Announcements",
    color: "#7d7d7d",
  },
  {
    id: 1,
    page: <Committee />,
    title: "Committees",
    color: "#4b4b4b",
  },
  {
    id: 2,
    page: <AuthLayout />,
    title: "Login",
    color: "#7d7d7d",
  },
  {
    id: 3,
    page: <Home />,
    title: "Home",
    color: "#4b4b4b",
  },
  {
    id: 4,
    page: <Secretariat />,
    title: "Secretariat",
    color: "#7d7d7d",
  },
  {
    id: 5,
    page: "about",
    title: "About Us",
    color: "#4b4b4b",
  },
  {
    id: 6,
    page: <Sponsors />,
    title: "Sponsors",
    color: "#7d7d7d",
  },
];

const Landing = () => {
  const [isClicked, setIsClicked] = useState(-1);
  const [isSafe, setIsSafe] = useState(false);

  useEffect(() => {
    setIsSafe(false);
    setTimeout(() => {
      setIsSafe(true);
    }, 750);
  }, [isClicked]);

  return (
    <div className="home-container">
      <div className={`main-cards ${isClicked !== -1 && isSafe && "full-height"}`}>
        {sections.map((section) => (
          <motion.div
            key={section.id}
            className={isClicked === -1 && `section`}
            style={{ backgroundColor: section.color }}
            initial={{
              width: 100 / sections.length,
              display: "block",
              opacity: 1,
            }}
            animate={
              isClicked === section.id
                ? { width: "100vw" }
                : isClicked === -1
                ? { width: `${100 / sections.length}%` }
                : isClicked !== section.id && { display: "none", opacity: 0 }
            }
            transition={{ duration: 0.75 }}
          >
            <AnimatePresence>
              <motion.h2
                key={isClicked}
                onClick={() => {
                  isClicked !== section.id
                    ? setIsClicked(section.id)
                    : setIsClicked(-1);
                }}
                className="section-heading"
                id={section.id}
                initial={{ rotate: -90 }}
                animate={isClicked === section.id && { rotate: 0, y: -150 }}
                exit={{ rotate: -90, y: 0 }}
                transition={{ duration: 0.75 }}
              >
                {isClicked === -1
                  ? isSafe
                    ? section.title
                    : ""
                  : section.title }
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence>
              {isClicked === section.id && isSafe && <motion.div
                initial={{ opacity: 0 }}
                animate={isSafe && { opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75 }}
                key={isClicked}
              >
                {section.page}
              </motion.div>}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
