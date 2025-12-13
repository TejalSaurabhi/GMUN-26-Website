import React, { useEffect } from "react";

const WorldMap = ({ title }) => {
  useEffect(() => {
    const hasWindow = typeof window !== "undefined";
    const map = hasWindow ? window.simplemaps_worldmap : null;
    const mapdata = hasWindow ? window.simplemaps_worldmap_mapdata : null;

    if (!map || !mapdata || !mapdata.locations) {
      console.error("World map script or map data not loaded");
      return;
    }

    // Explicitly TURN OFF pulses so there is no border-animate-out effect
    if (mapdata.main_settings) {
      mapdata.main_settings.location_pulse = "no";
      mapdata.main_settings.popup_nocss = "yes";
    }

    // Ensure no old popup is visible
    if (typeof map.popup_hide === "function") {
      map.popup_hide();
    }

    // Helper to get a location object by our string id ("0", "1", ...)
    const getLocation = (id) => {
      if (Array.isArray(mapdata.locations)) {
        const idx = parseInt(id, 10);
        return mapdata.locations[idx];
      }
      return mapdata.locations[id];
    };

    // Build list of numeric location ids
    let locationIds = [];
    if (Array.isArray(mapdata.locations)) {
      locationIds = mapdata.locations.map((_, idx) => String(idx));
    } else if (typeof mapdata.locations === "object") {
      locationIds = Object.keys(mapdata.locations).filter((k) =>
        /^\d+$/.test(k)
      );
    }

    if (!locationIds.length) return;

    // Store original colors so we can restore them
    const originalStyles = {};
    locationIds.forEach((id) => {
      const loc = getLocation(id);
      if (loc) {
        originalStyles[id] = {
          color: loc.color,
          border_color: loc.border_color,
        };
      }
    });

    const HIGHLIGHT_FILL = "#FF000D";   
    const HIGHLIGHT_BORDER = "#F3EDE3";  

    let currentIndex = 0;
    let activeId = null;
    let intervalId = null;
    let startTimerId = null;

    const highlightNextLocation = () => {
      if (!locationIds.length) return;
      const nextId = locationIds[currentIndex];

      //Restore previous location colours
      if (activeId !== null) {
        const prevLoc = getLocation(activeId);
        const prevStyle = originalStyles[activeId];
        if (prevLoc && prevStyle) {
          if (prevStyle.color === undefined) delete prevLoc.color;
          else prevLoc.color = prevStyle.color;

          if (prevStyle.border_color === undefined)
            delete prevLoc.border_color;
          else prevLoc.border_color = prevStyle.border_color;
        }
      }

      // Apply highlight colours to the current location
      const loc = getLocation(nextId);
      if (loc) {
        if (!originalStyles[nextId]) {
          originalStyles[nextId] = {
            color: loc.color,
            border_color: loc.border_color,
          };
        }
        loc.color = HIGHLIGHT_FILL;
        loc.border_color = HIGHLIGHT_BORDER;
      }

      // Apply style changes to the rendered SVG
      if (typeof map.refresh === "function") {
        map.refresh();
      }

      // Close any open popup, then show popup for current country
      if (typeof map.popup_hide === "function") {
        map.popup_hide();
      }

      window.setTimeout(() => {
        if (typeof map.popup === "function") {
          map.popup("location", nextId);
        }
      }, 120); 

      activeId = nextId;
      currentIndex = (currentIndex + 1) % locationIds.length;
    };

    // Load the map
    if (typeof map.load === "function") {
      map.load();
    }

    // Start sequence after a short delay
    startTimerId = window.setTimeout(() => {
      highlightNextLocation();
      intervalId = window.setInterval(highlightNextLocation, 2300);
    }, 350);

    // Clean-up
    return () => {
      if (startTimerId) window.clearTimeout(startTimerId);
      if (intervalId) window.clearInterval(intervalId);
      if (typeof map.popup_hide === "function") {
        map.popup_hide();
      }
      // Restore last active location on unmount
      if (activeId !== null) {
        const lastLoc = getLocation(activeId);
        const lastStyle = originalStyles[activeId];
        if (lastLoc && lastStyle) {
          if (lastStyle.color === undefined) delete lastLoc.color;
          else lastLoc.color = lastStyle.color;

          if (lastStyle.border_color === undefined)
            delete lastLoc.border_color;
          else lastLoc.border_color = lastStyle.border_color;
        }
        if (typeof map.refresh === "function") {
          map.refresh();
        }
      }
    };
  }, []);

  return (
    <div id="World-Map">
      <h2>{title}</h2>
      <div id="map" style={{ width: "auto", height: "auto" }} />
    </div>
  );
};

export default WorldMap;
