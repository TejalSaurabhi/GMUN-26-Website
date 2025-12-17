import React from "react";
import "./VideoCard.css";

export default function VideoCard({ link, title }) {
  const getEmbedUrl = (url) => {
    if (!url) return "";
    return url
      .replace("watch?v=", "embed/")
      .replace("youtu.be/", "www.youtube.com/embed/");
  };

  return (
    <div className="howto-video-card">
      <div className="howto-video-frame">
        <iframe
          src={getEmbedUrl(link)}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {title && <p className="howto-video-title">{title}</p>}
    </div>
  );
}