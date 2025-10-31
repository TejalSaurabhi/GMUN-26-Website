import React, { useState, useEffect } from "react";
import "./Daygallery.css";

const DayGallery = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState("right"); // Track slide direction
  const [isSliding, setIsSliding] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // ✅ Toggle play/pause
  const togglePlayPause = () => setIsPlaying((prev) => !prev);

  // ✅ Handle manual click on thumbnail
  const handleThumbnailClick = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? "right" : "left");
    triggerSlide(index);
  };

  // ✅ Auto-play logic
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % images.length);
          setTransitioning(false);
        }, 400);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  // ✅ Core slide logic for manual navigation
  const triggerSlide = (newIndex) => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsSliding(false);
    }, 500); // matches CSS duration
  };

  return (
    <div className="gallery-overlay">
      {/* Close button */}
      <button className="close-button" onClick={onClose}>
        <svg viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Main image */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className={`gallery-image ${
          isSliding ? (direction === "right" ? "slide-right" : "slide-left") : ""
        }`}
        onClick={togglePlayPause}
      />

      {/* Thumbnails */}
      <div className="thumbnail-strip">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DayGallery;
