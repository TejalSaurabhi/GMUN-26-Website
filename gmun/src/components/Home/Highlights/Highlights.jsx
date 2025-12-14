import "./Highlights.css";
import { Award, Globe, Landmark, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const highlights = [
  {
    id: 1,
    title: "Delegates",
    number: 200,
    superscript: "+",
    icon: <Users size={30} />,
  },
  {
    id: 2,
    title: "Committees",
    number: 7,
    superscript: "",
    icon: <Landmark size={30} />,
  },
  {
    id: 3,
    title: "Edition",
    number: 4,
    superscript: "th",
    icon: <Award size={30} />,
  },
  {
    id: 4,
    title: "Countries",
    number: 30,
    superscript: "+",
    icon: <Globe size={30} />,
  },
];

const CounterBox = ({ value, superscript, icon, title, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);

      const currentValue = Math.floor(percentage * value);
      setCount(currentValue);

      if (percentage < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      startTimeRef.current = null;
    };
  }, [value, duration]);

  return (
    <>
      <div className="heading-icon">
        <h2 className="icon">{icon}</h2>
      </div>

      <h3 className="higlight">
        {count}
        {superscript}
      </h3>
      <p className="highlight-adjective">{title}</p>
    </>
  );
};

const Highlights = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  });

  return (
    <div className="about-highlights-wrapper">
      <motion.h2
        className="main-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        About <span className="heading-gradient">GMUN 2026</span>
      </motion.h2>

      <div className="content-wrapper">
        <motion.div
          className="about-paragraph bg-[rgb(13,44,49)]"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          Global Model United Nations 2026 (GMUN) is a premier international MUN
          conference that brings together students from across the world to
          engage in diplomacy, negotiation, and high-level debate on today's
          most pressing global challenges. Designed to mirror real UN
          procedures, GMUN allows participants to step into the roles of world
          leaders and diplomats as they navigate complex geopolitical issues,
          craft meaningful resolutions, and experience the dynamics of
          international policy-making. The conference emphasizes collaboration,
          cross-cultural engagement, and academic rigor—offering delegates the
          opportunity to broaden their global perspective and develop essential
          leadership skills. Beyond committee sessions, GMUN also features
          enriching cultural exchange activities and culminates in a lively
          Social Night, where delegates can unwind, celebrate, and build lasting
          friendships beyond formal debate.
        </motion.div>

        <motion.div
          className="highlights-container"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          ref={ref}
        >
          {isVisible &&
            highlights.map((highlight, index) => (
              <div key={highlight.id} className="highlights bg-[rgb(13,44,49)]">
                <CounterBox
                  icon={highlight.icon}
                  value={highlight.number}
                  superscript={highlight.superscript}
                  title={highlight.title}
                  duration={1800}
                />
              </div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Highlights;
