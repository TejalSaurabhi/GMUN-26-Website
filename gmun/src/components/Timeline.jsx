import React, { useEffect, useRef, useState } from "react";
import "../styles/Timeline.css";
import image1 from "../images/an1.jpg";

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRef = useRef([]);
  const itemRefs = useRef([]);

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

  /* RIGHT SIDE OBSERVER */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = sectionsRef.current.indexOf(entry.target);
          if (entry.isIntersecting) setActiveIndex(index);
        });
      },
      { threshold: 0.6 }
    );

    sectionsRef.current.forEach(ref => ref && observer.observe(ref));
    return () =>
      sectionsRef.current.forEach(ref => ref && observer.unobserve(ref));
  }, []);

  /* RIGHT SIDE PARALLAX */
  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach(section => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const ratio = Math.min(Math.max(0, 1 - rect.top / window.innerHeight), 1);
        const translateX = (ratio - 0.5) * 150;

        section.style.transform = `translateX(${translateX}px) scale(${
          1 + ratio * 0.05
        })`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* LEFT SIDE ACTIVE DETECTOR */
  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = itemRefs.current.indexOf(entry.target);
          if (entry.isIntersecting) setActiveIndex(idx);
        });
      },
      { threshold: 0.5 }
    );

    itemRefs.current.forEach(ref => ref && titleObserver.observe(ref));
    return () =>
      itemRefs.current.forEach(ref => ref && titleObserver.unobserve(ref));
  }, []);

  return (
    <>
      {/* SIMPLE SAFE TITLE */}
      <div className="timeline-page-title">GMUN TIMELINE</div>

      <div className="timeline-wrapper">

        {/* LEFT SECTION */}
        <div className="timeline-left-stacked">
          <div className="timeline-left-container">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                ref={el => (itemRefs.current[index] = el)}
                className={`timeline-left-item ${index === activeIndex ? "active" : ""}`}
              >
                <h2 className="timeline-left-title">{item.year}</h2>
                <p className="timeline-left-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="timeline-scroll">
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
