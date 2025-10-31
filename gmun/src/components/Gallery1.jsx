import React, { useState } from "react";
import Folder from "./Folder";
import DayGallery from "./Daygallery";

const Gallery1 = () => {
  const [openGallery, setOpenGallery] = useState(null);

  const galleries = {
    day0: ["/gallery/day0/1.jpg", "/gallery/day0/2.webp", "/gallery/day0/3.webp", "/gallery/day0/10.webp", "/gallery/day0/12.webp", "/gallery/day0/16.webp",],
    day1: ["/gallery/day1/4.webp", "/gallery/day1/5.webp", "/gallery/day1/6.webp","/gallery/day1/11.webp","/gallery/day1/14.webp","/gallery/day1/17.webp"],
    day2: ["/gallery/day2/7.webp", "/gallery/day2/8.webp", "/gallery/day2/9.webp","/gallery/day2/13.webp","/gallery/day2/15.webp","/gallery/day2/18.webp"],
  };

  return (
    <div
      style={{
        height: "600px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Folder
        size={2}
        color="#ab64a6"
        className="custom-folder"
        items={[
          <div
            key="1"
            className="paper-content clickable-paper"
            onClick={() => setOpenGallery("day0")}
          >
            <span>Day 0</span>
          </div>,
          <div
            key="2"
            className="paper-content clickable-paper"
            onClick={() => setOpenGallery("day1")}
          >
            <span>Day 1</span>
          </div>,
          <div
            key="3"
            className="paper-content clickable-paper"
            onClick={() => setOpenGallery("day2")}
          >
            <span>Day 2</span>
          </div>,
        ]}
      />

      {openGallery && (
        <DayGallery
          images={galleries[openGallery]}
          onClose={() => setOpenGallery(null)}
        />
      )}
    </div>
  );
};

export default Gallery1;
