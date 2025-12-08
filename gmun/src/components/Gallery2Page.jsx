import React from 'react';
import InfiniteMenu from './Gallery2';

// Build items array from same gallery images used in Gallery1
const galleries = {
  day0: [
    '/gallery/day0/1.jpg',
    '/gallery/day0/2.webp',
    '/gallery/day0/3.webp',
    '/gallery/day0/10.webp',
    '/gallery/day0/12.webp',
    '/gallery/day0/16.webp',
  ],
  day1: [
    '/gallery/day1/4.webp',
    '/gallery/day1/5.webp',
    '/gallery/day1/6.webp',
    '/gallery/day1/11.webp',
    '/gallery/day1/14.webp',
    '/gallery/day1/17.webp',
  ],
  day2: [
    '/gallery/day2/7.webp',
    '/gallery/day2/8.webp',
    '/gallery/day2/9.webp',
    '/gallery/day2/13.webp',
    '/gallery/day2/15.webp',
    '/gallery/day2/18.webp',
  ],
};

const titles = {
  day0: "Day 0 – Opening Ceremony",
  day1: "Day 1",
  day2: "Day 2 – Closing Ceremony"
};

const descriptions = {
  day0: "Opening ceremony highlights",
  day1: "Social Night",
  day2: "Closing ceremony moments"
};

// Flatten galleries into items compatible with InfiniteMenu
const buildItems = () => {
  const items = [];
  Object.keys(galleries).forEach((day) => {
    galleries[day].forEach((img) => {
      items.push({ image: img,
        link: '#',
        title: titles[day],          // ⭐ add title here
        description: descriptions[day] });
    });
  });
  return items;
};

export default function Gallery2Page() {
  const items = buildItems();
  return (
    <div className="gallery2-root" style={{ width: '100%', height: '100vh', backgroundImage: 'url(/GMUN_Background.jpeg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      {/* overlay that blurs the page background beneath the menu but is behind the canvas */}
      <div className="gallery2-bg-blur" />

      {/* container to ensure the InfiniteMenu (canvas) sits above the blur */}
      <div className="gallery2-menu-container">
        <InfiniteMenu items={items} />
      </div>
    </div>
  );
}
