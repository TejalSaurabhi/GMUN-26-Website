import React from 'react';
import InfiniteMenu from './Gallery2';

// Primary WebP plus PNG fallback paths (added day*_png folders for older browsers)
const galleries = {
  day0: {
    webp: [
      '/gallery/day0/1.webp',
      '/gallery/day0/2.webp',
      '/gallery/day0/3.webp',
      '/gallery/day0/4.webp',
      '/gallery/day0/5.webp',
    ],
    png: [
      '/gallery/day0_png/1.png',
      '/gallery/day0_png/2.png',
      '/gallery/day0_png/3.png',
      '/gallery/day0_png/4.png',
      '/gallery/day0_png/5.png',
    ],
  },
  day1: {
    webp: [
      '/gallery/day1/6.webp',
      '/gallery/day1/7.webp',
      '/gallery/day1/8.webp',
      '/gallery/day1/9.webp',
      '/gallery/day1/10.webp',
      '/gallery/day1/11.webp',
      '/gallery/day1/12.webp',
      '/gallery/day1/13.webp',
    ],
    png: [
      '/gallery/day1_png/6.png',
      '/gallery/day1_png/7.png',
      '/gallery/day1_png/8.png',
      '/gallery/day1_png/9.png',
      '/gallery/day1_png/10.png',
      '/gallery/day1_png/11.png',
      '/gallery/day1_png/12.png',
      '/gallery/day1_png/13.png',
    ],
  },
  day2: {
    // WebP available for some; PNG fallback for all converted assets
    webp: [
      '/gallery/day2/14.webp',
      '/gallery/day2/18.webp'
    ],
    png: [
      '/gallery/day2_png/14.png',
      '/gallery/day2_png/15.png',
      '/gallery/day2_png/16.png',
      '/gallery/day2_png/17.webp',
      '/gallery/day2_png/18.png',
      '/gallery/day2_png/19.png',
      '/gallery/day2_png/20.png',
      '/gallery/day2_png/21.png',
      '/gallery/day2_png/22.png',
    ],
  },
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

// Flatten galleries into items compatible with InfiniteMenu (prefix with PUBLIC_URL for reliable loading)
const buildItems = () => {
  const base = process.env.PUBLIC_URL || '';
  const items = [];

  Object.keys(galleries).forEach((day) => {
    const webps = galleries[day].webp || [];
    const pngs = galleries[day].png || [];
    const maxLen = Math.max(webps.length, pngs.length);

    for (let i = 0; i < maxLen; i += 1) {
      const primary = webps[i] || pngs[i];
      const fallback = webps[i] && pngs[i] ? pngs[i] : undefined;

      if (!primary) continue;

      items.push({
        image: `${base}${primary}`,
        fallback: fallback ? `${base}${fallback}` : undefined,
        link: '#',
        title: titles[day],
        description: descriptions[day]
      });
    }
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
