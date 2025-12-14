import React from 'react';
import InfiniteMenu from './Gallery2';

// Gallery images (WebP only)
const galleries = {
  conference: [
    '/gallery/conference/1.webp',
    '/gallery/conference/2.webp',
    '/gallery/conference/3.webp',
    '/gallery/conference/4.webp',
    '/gallery/conference/5.webp',
  ],
  day0: [
    '/gallery/day0/3.webp',
    '/gallery/day0/4.webp',
    '/gallery/day0/5.webp',
  ],
  day1: [
    '/gallery/day1/6.webp',
    '/gallery/day1/8.webp',
    '/gallery/day1/9.webp',
    '/gallery/day1/10.webp',
    '/gallery/day1/11.webp',
    '/gallery/day1/13.webp',
  ],
  day2: [
    '/gallery/day2/6.webp',
    '/gallery/day2/14.webp',
    '/gallery/day2/16.webp',
    '/gallery/day2/19.webp',
    '/gallery/day2/20.webp',
    '/gallery/day2/21.webp',
    '/gallery/day2/22.webp',
  ],
};

const titles = {
  conference: "Committee in session",
  day0: "Day 0 – Opening Ceremony",
  day1: "Day 1",
  day2: "Day 2 – Closing Ceremony"
};

const descriptions = {
  conference: "Conference highlights",
  day0: "Opening ceremony highlights",
  day1: "Social Night",
  day2: "Closing ceremony moments"
};

// Flatten galleries into items compatible with InfiniteMenu
const buildItems = () => {
  const base = process.env.PUBLIC_URL || '';
  const items = [];

  Object.keys(galleries).forEach((section) => {
    galleries[section].forEach((imagePath) => {
      items.push({
        image: `${base}${imagePath}`,
        link: '#',
        title: titles[section],
        description: descriptions[section]
      });
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
