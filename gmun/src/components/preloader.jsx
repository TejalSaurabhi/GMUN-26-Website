import React from "react";
import "./Preloader.css";
import TrueFocus from './TrueFocus.jsx';

const Preloader = () => {
    return (

        <TrueFocus 
        sentence="GMUN 2026"
        manualMode={false}
        blurAmount={5}
        borderColor="#7c03dfff"
        animationDuration={2}
        pauseBetweenAnimations={1}
        />
    );
};

export default Preloader;
