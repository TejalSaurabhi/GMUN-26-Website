import React, { useEffect, useRef, useState } from "react";
import "../styles/Timeline.css";
import image1 from "../images/an1.jpg";

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRef = useRef([]);
  // Ref for the scrollable container to fix the parallax/scroll listener
  const scrollContainerRef = useRef(null); 

  const timelineItems = [
    {
      year: "Opening Ceremony",
      img: image1,
      desc: "A fun and interactive Opening Ceremony, to mark the beginning of the Global Model United Nations Event."
    },
    {
      year: "GMUN Day-1",
      img: image1,
      desc: "First Committee Meeting and Discussion."
    },
    {
      year: "Social Night after Day-1",
      img: image1,
      desc: "Come and have fun at our first Social Night of the Event."
    },
    {
      year: "GMUN Day-2",
      img: image1,
      desc: "Final day of Committee discussions."
    },
    {
      year: "Closing Ceremony",
      img: image1,
      desc: "Join us for the Closing Ceremony of GMUN-2025."
    }
  ];

  /* RIGHT SIDE OBSERVER - DRIVER OF STATE */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // Only update if the element is actually intersecting/visible
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      // Lower threshold slightly to catch smaller sections or fast scrolls
      { threshold: 0.5, root: scrollContainerRef.current } 
    );

    sectionsRef.current.forEach(ref => ref && observer.observe(ref));
    return () =>
      sectionsRef.current.forEach(ref => ref && observer.unobserve(ref));
  }, []);

  /* PARALLAX EFFECT - FIXED TO LISTEN TO CONTAINER, NOT WINDOW */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      sectionsRef.current.forEach(section => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        // Calculate ratio based on container height (window.innerHeight acts as proxy for viewport height)
        const viewHeight = window.innerHeight;
        const ratio = Math.min(Math.max(0, 1 - rect.top / viewHeight), 1);
        
        // Subtle Parallax effect
        const translateX = (ratio - 0.5) * 50; 
        
        section.style.transform = `translateX(${translateX}px) scale(${
          1 + ratio * 0.02
        })`;
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="timeline-page-title">GMUN TIMELINE</div>

      <div className="timeline-wrapper">

        {/* LEFT SECTION - STATIC/STICKY DISPLAY ONLY */}
        <div className="timeline-left-stacked">
          <div className="timeline-left-container">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                // No ref needed here for observation anymore
                className={`timeline-left-item ${index === activeIndex ? "active" : ""}`}
              >
                <h2 className="timeline-left-title">{item.year}</h2>
                <p className="timeline-left-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - SCROLLABLE CONTENT */}
        <div className="timeline-scroll" ref={scrollContainerRef}>
          {timelineItems.map((item, index) => (
            <section
              key={index}
              ref={el => (sectionsRef.current[index] = el)}
              className={`timeline-section ${index === activeIndex ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${item.img})` }}
            ></section>
          ))}
        </div>

      </div>
    </>
  );
};

export default Timeline;