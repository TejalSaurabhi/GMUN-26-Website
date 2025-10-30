import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import "../styles/Countdown.css";

// Utility function for combining classes
const cn = (...classes) => classes.filter(Boolean).join(' ');

function AnimatedCounter({
  value,
  duration = 1,
  delay = 0,
  label,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 20,
    stiffness: 50,
    mass: 1,
  });

  const rounded = useTransform(springValue, (latest) =>
    Math.floor(latest)
  );

  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      motionValue.set(0);
      const timeout = setTimeout(() => {
        motionValue.set(value);
        setHasAnimated(true);
      }, delay * 300);
      return () => clearTimeout(timeout);
    } else if (hasAnimated) {
      motionValue.set(value);
    } else if (!isInView) {
      motionValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, hasAnimated, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay: delay * 0.2,
        type: "spring",
        stiffness: 80,
      }}
      className={cn(
        "text-center flex-1 min-w-0 flex flex-col justify-center h-full"
      )}
    >
      <motion.div
        className={cn(
          "text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 whitespace-nowrap"
        )}
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: 1 } : { scale: 0.8 }}
        transition={{
          duration: 0.6,
          delay: delay * 0.2 + 0.3,
          type: "spring",
          stiffness: 100,
        }}
      >
        {displayValue.toString().padStart(2, '0')}
      </motion.div>
      <motion.p
        className={cn(
          "text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed px-1 sm:px-2 hyphens-auto break-words"
        )}
        style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay * 0.2 + 0.6, duration: 0.6 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [fact, setFact] = useState("");
    const [usedFacts, setUsedFacts] = useState([]);

    const targetDate = new Date("January 11, 2026 10:00:00").getTime();

    const funFacts = [
        "Debating fosters critical thinking and diplomacy skills.",
        "The UN’s first official language was French.",
        "Model UN started in the 1920s as League of Nations simulations.",
        "Over 400,000 students participate in MUN conferences worldwide every year!",
        "The first-ever MUN conference was organized at Harvard University in 1947.",
        "Many professional diplomats credit MUN for sparking their interest in international relations.",
        "The term 'Model United Nations' refers to the simulation of actual United Nations committees and procedures.",
        "Delegates from more than 150 countries participate in MUN annually.",
        "Some MUN conferences run crisis simulations, including zombie apocalypses or alien invasions!",
        "A delegate’s outfit is as important as their arguments. Business formal is non-negotiable!",
        "The most dreaded but rewarding part of any MUN preparation is writing position papers.",
        "The unmoderated caucus is the only time you can stand up and run around—technically!",
        "Terms like 'working paper,' 'bloc formation,' and 'GA Dance' are part of every MUNer's vocabulary.",
        "MUN is often cited as the best way to overcome stage fright.",
        "Delegates learn to dive deep into global issues, from climate change to cybersecurity.",
        "MUN conferences teach you how to argue your point while respecting others’ perspectives.",
        "Learning to word resolutions precisely is a skill that MUNers use even outside conferences.",
        "Some lifelong friendships and professional connections start at MUN conferences.",
        "MUN was inspired by the League of Nations, the UN's predecessor.",
        "MUN began as a collegiate activity but has expanded to high schools and even middle schools.",
        "Some MUNs recreate historical committees like the Cuban Missile Crisis or the founding of the UN.",
        "Every great MUNer has forgotten their country’s name during roll call at least once.",
        "Snack trades during unmoderated caucuses are the real secret to building alliances!",
        "The real reward is the confidence and skills you gain, not just awards.",
        "Everyone was a nervous first-timer once. It only gets better!"
    ];

    // Timer logic
    useEffect(() => {
        const updateTimer = () => {
            const now = new Date().getTime();
            const timeRemaining = targetDate - now;

            const days = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
            const hours = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            const minutes = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));
            const seconds = Math.max(0, Math.floor((timeRemaining % (1000 * 60)) / 1000));

            setTimeLeft({ days, hours, minutes, seconds });
        };

        const timer = setInterval(updateTimer, 1000);
        updateTimer();

        return () => clearInterval(timer);
    }, [targetDate]);

    // Handle fact change on button click
    const changeFact = () => {
        if (usedFacts.length === funFacts.length) {
            setUsedFacts([]);
        }

        const remainingFacts = funFacts.filter((fact) => !usedFacts.includes(fact));
        const randomFact = remainingFacts[Math.floor(Math.random() * remainingFacts.length)];
        setUsedFacts((prev) => [...prev, randomFact]);
        setFact(randomFact);
    };

    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "-100px" });

    const timeStats = [
        { value: timeLeft.days, label: "Days", duration: 5 },
        { value: timeLeft.hours, label: "Hours", duration: 5 },
        { value: timeLeft.minutes, label: "Minutes", duration: 5 },
        { value: timeLeft.seconds, label: "Seconds", duration: 5 },
    ];

    return (
        <motion.section
            ref={containerRef}
            className={cn(
                "countdown-container py-8 sm:py-12 lg:py-20 px-2 sm:px-4 md:px-8 w-full overflow-hidden"
            )}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className={cn("text-center mb-8 sm:mb-12 lg:mb-16")}
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h1 className="countdown-heading">
                    Countdown to <span>GMUN 2025</span>
                </h1>
            </motion.div>

            <div className={cn("w-full max-w-6xl mx-auto")}>
                <div
                    className={cn(
                        "flex flex-row items-stretch justify-between gap-2 sm:gap-4 lg:gap-8 w-full min-h-[120px] sm:min-h-[140px]"
                    )}
                >
                    {timeStats.map((stat, index) => (
                        <div
                            key={index}
                            className={cn(
                                "relative flex-1 min-w-0 flex flex-col justify-center h-full"
                            )}
                        >
                            <AnimatedCounter
                                value={stat.value}
                                duration={stat.duration}
                                delay={index}
                                label={stat.label}
                            />
                            {index < timeStats.length - 1 && (
                                <motion.div
                                    className={cn(
                                        "absolute -right-1 sm:-right-2 lg:-right-4 top-1/2 transform -translate-y-1/2 h-12 sm:h-16 lg:h-20 w-px bg-gray-200 dark:bg-gray-700"
                                    )}
                                    initial={{ opacity: 0, scaleY: 0 }}
                                    animate={
                                        isInView
                                            ? { opacity: 1, scaleY: 1 }
                                            : { opacity: 0, scaleY: 0 }
                                    }
                                    transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <motion.p
                className="fun-fact"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
            >
                {fact || "Click below to reveal a fun fact about GMUN!"}
            </motion.p>
            <motion.button
                className="fact-button"
                onClick={changeFact}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 2.2, duration: 0.6 }}
            >
                Show Fun Fact
            </motion.button>
        </motion.section>
    );
};

export default Countdown;