import React, { useState, useEffect } from "react";
import "../styles/Countdown.css";

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({});
    const [fact, setFact] = useState("");
    const [usedFacts, setUsedFacts] = useState([]);

    const targetDate = new Date("January 11, 2025 10:00:00").getTime();

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

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

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

    return (
        <div className="countdown-container">
            <h1 className="countdown-heading">
                Countdown to <span>GMUN 2026</span>
            </h1>
            <div className="countdown-wrapper">
                <div className="countdown-card">
                    <div className="countdown-number">{"00"}</div>
                    <div className="countdown-label">Days</div>
                </div>
                <div className="countdown-card">
                    <div className="countdown-number">{"00"}</div>
                    <div className="countdown-label">Hours</div>
                </div>
                <div className="countdown-card">
                    <div className="countdown-number">{"00"}</div>
                    <div className="countdown-label">Minutes</div>
                </div>
                <div className="countdown-card">
                    <div className="countdown-number">{"00"}</div>
                    <div className="countdown-label">Seconds</div>
                </div>
            </div>
            <p className="fun-fact">{fact || "Click below to reveal a fun fact about GMUN!"}</p>
            <button className="fact-button" onClick={changeFact}>
                Show Fun Fact
            </button>
        </div>
    );
};

export default Countdown;