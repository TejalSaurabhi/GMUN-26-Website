import React, { useEffect } from 'react';

const WorldMap = ({ title }) => {
  useEffect(() => {
    if (window.simplemaps_worldmap) {
      window.simplemaps_worldmap.load();
    } else {
      console.error("World map script not loaded");
    }
  }, []);

  return (
    <div id="World-Map">
      <h2>{title}</h2>
      <div id="map" style={{ width: 'auto', height: 'auto' }}></div> 
    </div>
  );
};

export default WorldMap;
