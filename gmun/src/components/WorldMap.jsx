import React, { useEffect, useRef, useState } from 'react';

const WorldMap = ({ title }) => {
  // Debug state for displaying initialization status
  const [debugInfo, setDebugInfo] = useState('Initializing...');
  
  // State for tracking the current region index in the auto-cycle (0, 1, 2, ...)
  // This is used to determine which region should be labeled during auto-cycling
  const [currentAutoIndex, setCurrentAutoIndex] = useState(0);
  
  // State for tracking if user is manually hovering over a region
  // When true, auto-cycling pauses so the hover label can be shown
  const [isUserHovering, setIsUserHovering] = useState(false);
  
  // State for tracking if auto-cycling is active (currently not used but available for future use)
  const [isCyclingActive, setIsCyclingActive] = useState(false);
  
  // Refs for DOM manipulation and cleanup
  const intervalRef = useRef(null); // Stores the setInterval ID for auto-cycling
  const tooltipRef = useRef(null); // Reference to the tooltip DOM element
  const debugMarkersRef = useRef([]); // temporary visual debug markers
  const locationsRef = useRef([]); // Array of all location indices [0, 1, 2, ...]
  const hoveredLocationRef = useRef(null); // Track which location index is currently being hovered
  
  // Ref to track latest hover state (for use in interval callbacks that may capture stale closures)
  // This ensures we always have the current hover state, even inside setInterval callbacks
  const isUserHoveringRef = useRef(false);
  
  // Ref to track current auto-cycle index (for use in callbacks)
  // This ensures we always have the current index, even inside event handlers
  const currentAutoIndexRef = useRef(0);

  // Main effect: Sets up auto-cycling labels and hover behavior
  // 
  // Behavior Overview:
  // 1. On page load: Shows label for first region (index 0) immediately
  // 2. Auto-cycles: Moves to next region every 2 seconds, cycling through all regions
  // 3. Hover behavior: When user hovers, pauses auto-cycle and shows hover label
  // 4. Resume: After hover ends, resumes auto-cycling from where it left off
  // 
  // The animation continues indefinitely until the user interacts, and the original
  // hover behavior remains fully functional alongside the auto-cycling feature.
  useEffect(() => {
    setDebugInfo('Starting initialization');

    // Helper to load a script and return a promise when it's loaded
    const loadScript = (src, attrName) => {
      return new Promise((resolve, reject) => {
        try {
          // Derive filename to detect existing <script src="..."></script> tags
          const filename = src.split('/').pop().split('?')[0];

          // Avoid adding the same script multiple times. Check both our data-src marker
          // and any existing script whose src contains the filename (covers index.html tags).
          let existing = document.querySelector(`script[data-src="${src}"]`) || document.querySelector(`script[src*="${filename}"]`);
          if (existing) {
            // If the existing script was injected by us and already loaded, resolve.
            if (existing.getAttribute && existing.getAttribute('data-loaded') === 'true') return resolve(existing);
            // Otherwise attach listeners so we resolve/reject when it finishes loading
            existing.addEventListener && existing.addEventListener('load', () => resolve(existing));
            existing.addEventListener && existing.addEventListener('error', () => reject(new Error('Failed to load ' + src)));
            return;
          }

          const s = document.createElement('script');
          s.src = src;
          s.async = false; // preserve execution order
          s.setAttribute('data-src', src);
          if (attrName) s.setAttribute(attrName, 'true');
          s.onload = () => { s.setAttribute('data-loaded', 'true'); resolve(s); };
          s.onerror = (e) => reject(e || new Error('Failed to load ' + src));
          document.body.appendChild(s);
        } catch (e) {
          reject(e);
        }
      });
    };

    // Create tooltip. Append it to the map container if available to avoid
    // stacking/overflow/transform clipping issues that can hide fixed-position
    // elements appended to document.body.
    const createTooltip = () => {
      let t = document.getElementById('auto-label-tooltip');
      if (t) {
        tooltipRef.current = t;
        return t;
      }

      t = document.createElement('div');
      t.id = 'auto-label-tooltip';
      Object.assign(t.style, {
        position: 'fixed',
        background: 'rgba(0,0,0,0.85)',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: '8px',
        pointerEvents: 'none',
        fontSize: '14px',
        fontWeight: '500',
        display: 'none',
        zIndex: '100000',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'opacity 0.2s',
        whiteSpace: 'nowrap',
        transform: 'translateZ(0)'
      });

      const content = document.createElement('span');
      t.appendChild(content);

      const arrow = document.createElement('div');
      Object.assign(arrow.style, {
        position: 'absolute',
        bottom: '-6px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '0',
        height: '0',
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: '6px solid rgba(0,0,0,0.85)'
      });
      t.appendChild(arrow);

      // Append tooltip to body and use fixed positioning so it aligns with
      // viewport (client) coordinates derived from SVG screenCTM or element.getBoundingClientRect().
      document.body.appendChild(t);

      tooltipRef.current = t;
      return t;
    };

    createTooltip();

    // Ensure map scripts are loaded and executed when this component mounts.
    // In an SPA, worldmap.js may have run earlier (when no #map element existed)
    // so we inject/reload the scripts here if the runtime map is missing or not loaded.
    (async () => {
      try {
        const mapReady = () => !!(window.simplemaps_worldmap && window.simplemaps_worldmap.loaded);
        if (!mapReady()) {
          // Load mapdata first then worldmap
          // Use root-relative paths which resolve to files in public/
          await loadScript('/mapdata.js', 'data-mapdata');

          // If a worldmap script is already present but map object not created,
          // remove it and reload to force initialization against the current DOM.
          // Detect any existing worldmap.js or mapdata.js script tags by filename and reload them
          const existingWorld = document.querySelector('script[data-worldmap]') || document.querySelector('script[src*="worldmap.js"]');
          const existingMapdata = document.querySelector('script[data-mapdata]') || document.querySelector('script[src*="mapdata.js"]');

          // If mapdata script exists but map runtime not ready, remove and re-add both scripts
          if ((!mapReady() && existingMapdata) || (!mapReady() && existingWorld)) {
            try { existingMapdata && existingMapdata.remove(); } catch (e) {}
            try { existingWorld && existingWorld.remove(); } catch (e) {}
            await loadScript('/mapdata.js', 'data-mapdata');
            await loadScript('/worldmap.js?reload=' + Date.now(), 'data-worldmap');
          } else {
            await loadScript('/worldmap.js', 'data-worldmap');
          }
        }
      } catch (e) {
        // Non-fatal: continue and let polling handle readiness
        // console.warn('Map script injection failed', e);
      }
    })();

    // Function to display a label for a specific region by index
    // This function:
    // 1. Retrieves the location data from the map
    // 2. Calculates the center position of the region's SVG element
    // 3. Converts SVG coordinates to screen coordinates
    // 4. Positions and displays the tooltip at the center of the region
    const showLocationLabel = (locationIndex) => {
      const map = window.simplemaps_worldmap;
      if (!map) return;

      // Prefer runtime location object but fall back to map.mapdata.locations
      const runtimeLoc = map.locations && map.locations[locationIndex];
      const mapdataLoc = map.mapdata && map.mapdata.locations && map.mapdata.locations[locationIndex];
      if (!runtimeLoc && !mapdataLoc) return;

      const location = runtimeLoc || mapdataLoc;
      
      
      // Try multiple ways to find the SVG element for this location
      // Locations might have shape.node, marker, element, or other properties
      let svgNode = location.shape?.node;
      if (!svgNode) {
        svgNode = location.marker;
      }
      if (!svgNode) {
        svgNode = location.element;
      }
      if (!svgNode && location.shape) {
        // Sometimes shape itself is the node
        svgNode = location.shape.node || location.shape;
      }
      
      // Prefer an explicit readable name. Try runtime location.name first,
      // then map.mapdata.locations (which often contains canonical names),
      // finally fall back to a sanitized mapdata entry if present.
      let name = location.name;
      if (!name) {
        try {
          const md = map && map.mapdata && map.mapdata.locations && map.mapdata.locations[locationIndex];
          if (md && md.name) name = md.name;
        } catch (e) {
          // ignore
        }
      }
      if (!name) {
        // As a last resort try to use the locationIndex converted to a human label
        // but prefer not to show 'Location N' if a name exists anywhere.
        name = `#${locationIndex}`;
      }

      // Position the tooltip - try multiple methods
      let screenX = 0;
      let screenY = 0;
      let positionFound = false;

      // Method 1: If we have an SVG node, use its bounding box
      if (svgNode && typeof svgNode.getBBox === 'function') {
        try {
          const bbox = svgNode.getBBox();
          const svg = svgNode.ownerSVGElement || svgNode.closest('svg');
          if (svg) {
            const pt = svg.createSVGPoint();
            pt.x = bbox.x + bbox.width / 2;
            pt.y = bbox.y + bbox.height / 2;
            // Prefer the node's CTM (more accurate when elements are transformed)
            const screenCTM = (svgNode.getScreenCTM && svgNode.getScreenCTM()) || (svg.getScreenCTM && svg.getScreenCTM());
            if (screenCTM) {
              const screenPoint = pt.matrixTransform(screenCTM);
              screenX = screenPoint.x;
              screenY = screenPoint.y;
              positionFound = true;
            }
          }
        } catch (err) {
          // Ignore SVG position errors and continue with fallbacks
        }
      }

  // Method 2: Check if location already has screen coordinates stored
      if (!positionFound && location.x !== undefined && location.y !== undefined) {
        try {
          const mapContainer = document.getElementById('map');
          if (mapContainer) {
            screenX = location.x;
            screenY = location.y;
            positionFound = true;
          }
        } catch (err) {
          // Ignore stored coordinate errors and continue with fallbacks
        }
      }

      // Method 3: If no SVG node but we have lat/lng, use map projection
      // If runtime location doesn't have lat/lng, try map.mapdata locations
      let lat = location.lat;
      let lng = location.lng;
      if ((lat === undefined || lng === undefined) && map && map.mapdata && map.mapdata.locations && map.mapdata.locations[locationIndex]) {
        const md = map.mapdata.locations[locationIndex];
        lat = md.lat;
        lng = md.lng;
      }

      if (!positionFound && lat !== undefined && lng !== undefined) {
        try {
          // First, check if the map object has projection methods
          // Log available methods for debugging (only once)
          if (map && !map._projectionMethodsLogged) {
            map._projectionMethodsLogged = true; // Flag to only log once
          }
          
          // Try various projection methods that the simplemaps library might provide
          let coords = null;
          
          if (map && map.latLngToXY) {
            coords = map.latLngToXY(location.lat, location.lng);
          } else if (map && map.projection) {
            coords = map.projection([location.lng, location.lat]);
          } else if (map && map.project) {
            coords = map.project([location.lng, location.lat]);
          } else if (map && map.toScreen) {
            coords = map.toScreen(location.lat, location.lng);
          } else if (map && map.path) {
            // Try using D3-style projection if available
              const path = map.path;
            if (path && path.projection) {
              const proj = path.projection();
              if (proj) {
                coords = proj([location.lng, location.lat]);
              }
            }
          }
          
          if (coords) {
            // Handle different return formats
            if (Array.isArray(coords)) {
              screenX = coords[0];
              screenY = coords[1];
            } else if (typeof coords === 'object') {
              screenX = coords.x || coords[0] || 0;
              screenY = coords.y || coords[1] || 0;
            }

            // Get the map container to adjust coordinates relative to it
            const mapContainer = document.getElementById('map');
            if (mapContainer) {
              const containerRect = mapContainer.getBoundingClientRect();
              // If coordinates are screen-absolute, make them relative to container
              // Otherwise assume they're already relative
              if (screenX < containerRect.width && screenY < containerRect.height) {
                positionFound = true;
              } else {
                // Coordinates might be absolute, adjust them
                screenX = screenX - containerRect.left;
                screenY = screenY - containerRect.top;
                positionFound = true;
              }
            } else {
              positionFound = true; // Use coordinates as-is
            }
          } else {
            // If no projection method, try to find the rendered marker in the DOM
            const mapContainer = document.getElementById('map');
            if (mapContainer) {
              // Look for marker elements - they might be in SVG or as regular DOM elements
              const allMarkers = mapContainer.querySelectorAll('circle, [class*="marker"], [class*="location"]');
              // Last-resort DOM search (no logging)
            }
          }
        } catch (err) {
          // Ignore lat/lng projection errors and continue with other methods
        }
      }

      // Method 4: Try to find the location marker element directly in the DOM
      if (!positionFound) {
        try {
          const mapContainer = document.getElementById('map');
          if (mapContainer) {
            // Robust DOM search: look for elements whose title/aria-label/data-name/id/class/textContent
            // contain the location name (case-insensitive substring). This handles many runtime variations.
            const name = (location.name || "").toString().trim().toLowerCase();
            let markerElement = null;

            // Quick attribute/id-based checks first
            const attrSelectors = [
              `[data-location-index="${locationIndex}"]`,
              `[data-location="${location.name}"]`,
              `#location-${locationIndex}`,
              `#sm_location_${locationIndex}`
            ];
            for (const sel of attrSelectors) {
              try {
                const el = mapContainer.querySelector(sel);
                if (el) { markerElement = el; break; }
              } catch (e) {}
            }

            // If still not found, scan likely SVG elements under the map container and match attributes/text
            if (!markerElement) {
              // Limit search to SVG subtree if present for performance
              const svg = mapContainer.querySelector('svg');
              const scope = svg || mapContainer;
              const candidates = scope.querySelectorAll('*');

              const normalize = (v) => (v || '').toString().trim().toLowerCase();
              const nameTokens = name.split(/\s+/).filter(Boolean);

              for (let i = 0; i < candidates.length; i++) {
                const el = candidates[i];
                try {
                  // Check common attributes
                  const attrsToCheck = ['title', 'aria-label', 'data-name', 'data-location', 'id', 'class'];
                  let found = false;
                  for (const a of attrsToCheck) {
                    const v = normalize(el.getAttribute && el.getAttribute(a));
                    if (v && name && v.indexOf(name) !== -1) { found = true; break; }
                    // also match tokens separately (helps when attributes have prefixes/suffixes)
                    for (const t of nameTokens) if (v.indexOf(t) !== -1) { found = true; break; }
                    if (found) break;
                  }

                  // Check <title> child for SVG elements
                  if (!found && el.querySelector) {
                    const titleEl = el.querySelector('title');
                    const t = normalize(titleEl && titleEl.textContent);
                    if (t && name && (t.indexOf(name) !== -1 || nameTokens.some(tok => t.indexOf(tok) !== -1))) found = true;
                  }

                  // Check text content (some labels are plain text nodes)
                  if (!found) {
                    const text = normalize(el.textContent);
                    if (text && name && (text.indexOf(name) !== -1 || nameTokens.some(tok => text.indexOf(tok) !== -1))) found = true;
                  }

                  if (found) { markerElement = el; break; }
                } catch (e) {
                  // ignore
                }
              }
            }

            // If we found an element, use its bounding rect
            if (markerElement) {
              const rect = markerElement.getBoundingClientRect();
              // Use viewport (client) coordinates directly
              screenX = rect.left + rect.width / 2;
              screenY = rect.top + rect.height / 2;
              positionFound = true;
            }
          }
        } catch (err) {
          // Ignore DOM marker search errors
        }
      }

      // If we still couldn't find a position, place the tooltip at the center
      // of the map container as a graceful fallback so the user can see the label
      if (!positionFound) {
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
          const containerRect = mapContainer.getBoundingClientRect();
          screenX = containerRect.width / 2;
          screenY = containerRect.height / 2;
          positionFound = true;
        } else {
          // Last resort: place roughly at viewport center
          screenX = window.innerWidth / 2;
          screenY = window.innerHeight / 2;
          positionFound = true;
        }
      }

      // Position and show the tooltip. Normalize to client (viewport) coords
      // and position the tooltip with fixed coordinates so it matches debug markers.
      const tooltip = tooltipRef.current;
      if (tooltip && tooltip.firstChild) {
        tooltip.firstChild.textContent = name;
        tooltip.style.display = 'block';
        tooltip.style.opacity = '0'; // make invisible while measuring

        // Compute client coordinates. screenX/screenY may already be client coords
        let clientX = screenX;
        let clientY = screenY;
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
          const containerRect = mapContainer.getBoundingClientRect();
          // If values look like container-relative coords (within container bounds), convert
          if (screenX >= 0 && screenX <= containerRect.width && screenY >= 0 && screenY <= containerRect.height) {
            clientX = containerRect.left + screenX;
            clientY = containerRect.top + screenY;
          }
        }

        // Position tooltip as fixed in viewport so it lines up with clientX/clientY
        tooltip.style.position = 'fixed';
        const w = tooltip.offsetWidth || 100;
        tooltip.style.left = `${Math.round(clientX - w / 2)}px`;
        tooltip.style.top = `${Math.round(clientY - 40)}px`;

        // --- DEBUG: show a temporary red marker at the computed client position
        try {
          const debugRoot = document.getElementById('World-Map') || document.getElementById('map') || document.body;
          if (debugRoot) {
            const marker = document.createElement('div');
            marker.className = 'auto-label-debug-marker';
            Object.assign(marker.style, {
              position: 'absolute',
              left: `${Math.round(clientX - (debugRoot.getBoundingClientRect().left||0))}px`,
              top: `${Math.round(clientY - (debugRoot.getBoundingClientRect().top||0))}px`,
              transform: 'translate(-50%,-50%)',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'rgba(255,0,0,0.9)',
              zIndex: '100001',
              pointerEvents: 'none'
            });
            const lbl = document.createElement('div');
            lbl.textContent = `${name} (${Math.round(clientX)},${Math.round(clientY)})`;
            Object.assign(lbl.style, {
              position: 'absolute',
              top: '14px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#900',
              fontSize: '10px',
              background: 'rgba(255,255,255,0.9)',
              padding: '2px 4px',
              borderRadius: '3px',
              whiteSpace: 'nowrap'
            });
            marker.appendChild(lbl);
            // ensure debugRoot is positioned relative for absolute children
            const cs = window.getComputedStyle(debugRoot);
            if (cs.position === 'static' || !cs.position) debugRoot.style.position = 'relative';
            debugRoot.appendChild(marker);
            debugMarkersRef.current.push(marker);
            // remove after 1.5s
            setTimeout(() => {
              try { marker.remove(); } catch (e) {}
            }, 1500);
          }
        } catch (e) {
          // ignore debug failures
        }

        // Fade in
        requestAnimationFrame(() => {
          tooltip.style.opacity = '1';
        });
      }
    };

    // Function to hide the label tooltip with a fade-out animation
    // This function:
    // 1. Starts the fade-out animation by setting opacity to 0
    // 2. After the animation completes, hides the tooltip completely
    // 3. Only hides if user is not currently hovering (prevents hiding hover labels)
    const hideLocationLabel = () => {
      const tooltip = tooltipRef.current;
      if (tooltip) {
        // Start fade-out animation
        tooltip.style.opacity = '0';
        setTimeout(() => {
          // Only hide if not being hovered by user (preserves hover labels)
          if (!isUserHoveringRef.current) {
            tooltip.style.display = 'none';
          }
        }, 200); // Wait for fade-out animation to complete (matches CSS transition)
      }
    };

    // Function to start auto-cycling through regions
    // This cycles through all regions every 2 seconds, showing labels automatically
    const startCycling = () => {
      // Clear any existing interval to prevent multiple intervals running
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      // Set up interval to cycle every 2 seconds
      intervalRef.current = setInterval(() => {
        // Skip cycling if user is manually hovering over a region
        // Use ref to get latest value (avoids stale closure issue in setInterval)
        if (isUserHoveringRef.current || locationsRef.current.length === 0) return;
        
        // Hide current label with fade-out animation
        hideLocationLabel();
        
        // After fade-out completes, move to next region
        setTimeout(() => {
          // Double-check user isn't hovering (race condition protection)
          if (!isUserHoveringRef.current && locationsRef.current.length > 0) {
            // Update state to move to next region (cycles back to 0 after last)
            setCurrentAutoIndex((prevIndex) => {
              // Calculate next index with modulo to cycle back to start
              const nextIndex = (prevIndex + 1) % locationsRef.current.length;
              // Update ref to track current index (for use in other callbacks)
              currentAutoIndexRef.current = nextIndex;
              
              // Show label for the next region after a brief delay
              // Note: locationsRef.current is an array of indices, so we pass nextIndex directly
              setTimeout(() => {
                showLocationLabel(locationsRef.current[nextIndex]);
              }, 50);
              return nextIndex;
            });
          }
        }, 250); // Wait for fade-out animation to complete
      }, 2000); // Cycle every 2 seconds
      
      // Mark cycling as active
      setIsCyclingActive(true);
    };
    
    // Function to stop auto-cycling
    const stopCycling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsCyclingActive(false);
    };

    // Main initialization
    let pollTimer = null;
    let attempts = 0;
    
    const initializeLabeling = () => {
      const map = window.simplemaps_worldmap;
      
      if (!map) {
        setDebugInfo(`Waiting for map (attempt ${attempts})`);
        return false;
      }

      if (!map.loaded) {
        setDebugInfo('Map found, waiting for load...');
        return false;
      }

      // Check for locations (array of location objects)
      if (!map.locations) {
        setDebugInfo('No locations array yet...');
        return false;
      }

      // Count actual location objects (locations is an array-like object)
      // Prefer runtime map.locations if available, otherwise fall back to map.mapdata.locations
      let locationKeys = [];
      if (map.locations && Object.keys(map.locations).length > 0) {
        locationKeys = Object.keys(map.locations);
      } else if (map.mapdata && map.mapdata.locations) {
        locationKeys = Object.keys(map.mapdata.locations);
      }

      const locationCount = locationKeys.length;

      if (locationCount === 0) {
        setDebugInfo('Locations array empty...');
        return false;
      }

      // Build array of location keys (strings). We'll treat indices into this array as currentAutoIndex
      locationsRef.current = locationKeys;
      
      // Log first location to see its structure - expanded details for debugging
      // optional: inspect first location structure (removed verbose logs)
      
      setDebugInfo(`Found ${locationCount} locations!`);
      return true;
    };

    pollTimer = setInterval(() => {
      attempts++;
      
      if (initializeLabeling()) {
        clearInterval(pollTimer);
        
        // Poll for SVG to be rendered AND location shapes to be ready
        // We need both: the SVG element AND the location.shape.node elements
        let svgAttempts = 0;
        const svgPollTimer = setInterval(() => {
          svgAttempts++;
          
          // Try multiple selectors for the SVG element (but don't require it if we have lat/lng)
          const mapContainer = document.getElementById('map');
          const svgEl = mapContainer?.querySelector('svg') || document.querySelector('#map svg');
          
          // Check if location data is ready
          // We check that at least 50% of locations have their data ready (either SVG nodes or lat/lng)
          // If locations have lat/lng, we don't necessarily need the SVG element
          const map = window.simplemaps_worldmap;
          let shapesReady = false;
          let usingLatLng = false;
          
          if (map && map.locations && locationsRef.current.length > 0) {
            let readyCount = 0;
            let latLngCount = 0;
            
            // Check how many locations have their data ready
            locationsRef.current.forEach((locationIndex) => {
              const location = map.locations[locationIndex];
              if (location) {
                // Check for various ways a location might be ready:
                // 1. SVG element (shape.node, marker, element)
                const hasShapeNode = location.shape && location.shape.node;
                const hasMarker = !!location.marker;
                const hasElement = !!location.element;
                // 2. Or at least have lat/lng coordinates (we can calculate position from these)
                // Some runtimes store lat/lng in map.mapdata.locations rather than the runtime location object
                const mapdataLoc = map.mapdata && map.mapdata.locations && map.mapdata.locations[locationIndex];
                const hasLatLng = (location.lat !== undefined && location.lng !== undefined) || (mapdataLoc && mapdataLoc.lat !== undefined && mapdataLoc.lng !== undefined);
                
                if (hasShapeNode || hasMarker || hasElement || hasLatLng) {
                  readyCount++;
                }
                if (hasLatLng) {
                  latLngCount++;
                }
              }
            });
            
            // Consider shapes ready if at least 50% are ready (or at least 1 if there's only 1-2 locations)
            const requiredCount = locationsRef.current.length <= 2 
              ? 1 
              : Math.max(1, Math.ceil(locationsRef.current.length * 0.5));
            shapesReady = readyCount >= requiredCount;
            
            // If most locations have lat/lng (either on runtime object or mapdata), we can proceed even without SVG
            usingLatLng = latLngCount >= requiredCount;
          }
          
          // Proceed if:
          // 1. SVG exists AND shapes are ready (for SVG-based locations), OR
          // 2. Locations have lat/lng coordinates available in mapdata (no SVG required)
          const canProceed = (svgEl && shapesReady) || usingLatLng;
          
          if (canProceed) {
            clearInterval(svgPollTimer);
            setDebugInfo(`Auto-labeling ${locationsRef.current.length} locations`);
            
            // STEP 1: Show first label immediately on page load (index 0)
            // This makes the first region labeled as soon as the map is ready
            if (locationsRef.current.length > 0) {
              // Wait a tiny bit to ensure all shapes are fully rendered
              setTimeout(() => {
                // Show label for first region using the key stored in locationsRef
                showLocationLabel(locationsRef.current[0]);
                setCurrentAutoIndex(0); // Update state to track index into locationsRef
                currentAutoIndexRef.current = 0; // Update ref for use in callbacks
                
                // STEP 2: Start auto-cycling after initial display
                // This will move to the next region every 2 seconds
                startCycling();
              }, 10);
            }

            // STEP 3: Set up hover handlers for individual regions
            // This preserves the original hover behavior while allowing auto-cycling
            // When user hovers: auto-cycling pauses, hover label shows
            // When user stops hovering: auto-cycling resumes from where it left off
            if (map && map.locations) {
              // Wait a bit more to ensure all location shapes are initialized
              setTimeout(() => {
                // Iterate through all locations to attach hover event handlers
                locationsRef.current.forEach((locationIndex) => {
                  const location = map.locations[locationIndex];
                  
                  // Try multiple ways to find the SVG element for this location
                  let svgNode = location?.shape?.node;
                  if (!svgNode && location) {
                    svgNode = location.marker;
                  }
                  if (!svgNode && location) {
                    svgNode = location.element;
                  }
                  if (!svgNode && location?.shape) {
                    svgNode = location.shape.node || location.shape;
                  }
                  
                  // Check if location and SVG node exist before attaching handlers
                  if (location && svgNode) {
                    
                    // Handler for when user hovers over a region (mouseenter)
                    // This temporarily pauses auto-cycling and shows the hover label
                    const handleMouseEnter = (e) => {
                      // Mark that user is manually hovering (this pauses auto-cycling)
                      isUserHoveringRef.current = true;
                      setIsUserHovering(true);
                      hoveredLocationRef.current = locationIndex;
                      
                      // Show label for the hovered region (replacing auto-cycle label)
                      // Resolve hover name the same way as the auto-cycler
                      let locationName = location.name;
                      if (!locationName) {
                        try {
                          const md = map && map.mapdata && map.mapdata.locations && map.mapdata.locations[locationIndex];
                          if (md && md.name) locationName = md.name;
                        } catch (e) {
                          // ignore
                        }
                      }
                      if (!locationName) locationName = `#${locationIndex}`;
                      const tooltip = tooltipRef.current;
                      
                      if (tooltip && tooltip.firstChild) {
                        try {
                          // Calculate center position of the hovered region
                          const bbox = svgNode.getBBox();
                          const svg = svgNode.ownerSVGElement || svgNode.closest('svg');
                          if (svg) {
                            const pt = svg.createSVGPoint();
                            pt.x = bbox.x + bbox.width / 2;
                            pt.y = bbox.y + bbox.height / 2;
                            const screenCTM = (svgNode.getScreenCTM && svgNode.getScreenCTM()) || (svg.getScreenCTM && svg.getScreenCTM());
                            if (screenCTM) {
                              const screenPoint = pt.matrixTransform(screenCTM);

                              // Always position tooltip in viewport client coordinates (fixed)
                              tooltip.firstChild.textContent = locationName;
                              const w = tooltip.offsetWidth || 100;
                              tooltip.style.position = 'fixed';
                              tooltip.style.left = `${Math.round(screenPoint.x - w / 2)}px`;
                              tooltip.style.top = `${Math.round(screenPoint.y - 40)}px`;
                              tooltip.style.display = 'block';
                              tooltip.style.opacity = '1';
                            }
                          }
                        } catch (err) {
                          // ignore hover label errors
                        }
                      }
                    };
                    
                    // Handler for when user stops hovering over a region (mouseleave)
                    // This resumes auto-cycling from where it left off
                    const handleMouseLeave = () => {
                      // After a brief delay, resume auto-cycling
                      setTimeout(() => {
                        // Clear hover state (this allows auto-cycling to resume)
                        isUserHoveringRef.current = false;
                        setIsUserHovering(false);
                        hoveredLocationRef.current = null;
                        
                        // Hide the hover label with fade-out
                        hideLocationLabel();
                        
                        // After fade-out completes, resume showing the auto-cycle label
                        // This shows the label for the region where auto-cycling left off
                        setTimeout(() => {
                          if (!isUserHoveringRef.current && locationsRef.current.length > 0) {
                            // Show the label for the current auto-cycle index
                            showLocationLabel(locationsRef.current[currentAutoIndexRef.current]);
                          }
                        }, 250); // Wait for fade-out animation
                      }, 100); // Small delay to prevent flickering
                    };
                    
                    // Attach event listeners to the SVG node
                    svgNode.addEventListener('mouseenter', handleMouseEnter);
                    svgNode.addEventListener('mouseleave', handleMouseLeave);
                  }
                });
              }, 200);
            }
          } else {
            // Update debug info to show progress
            if (svgAttempts % 10 === 0) {
              const map = window.simplemaps_worldmap;
              let readyCount = 0;
              let latLngCount = 0;
              
              if (map && map.locations && locationsRef.current.length > 0) {
                locationsRef.current.forEach((locationIndex) => {
                  const location = map.locations[locationIndex];
                  if (location) {
                    const hasShapeNode = location.shape && location.shape.node;
                    const hasMarker = !!location.marker;
                    const hasElement = !!location.element;
                    const hasLatLng = location.lat !== undefined && location.lng !== undefined;
                    if (hasShapeNode || hasMarker || hasElement || hasLatLng) {
                      readyCount++;
                    }
                    if (hasLatLng) {
                      latLngCount++;
                    }
                  }
                });
              }
              
              // Recalculate for debug message
              const currentSvgEl = document.getElementById('map')?.querySelector('svg') || document.querySelector('#map svg');
              const requiredCount = locationsRef.current.length <= 2 
                ? 1 
                : Math.max(1, Math.ceil(locationsRef.current.length * 0.5));
              const currentShapesReady = readyCount >= requiredCount;
              const currentUsingLatLng = latLngCount >= requiredCount;
              const currentCanProceed = (currentSvgEl && currentShapesReady) || (currentShapesReady && currentUsingLatLng);
              
              if (!currentCanProceed) {
                if (!currentSvgEl && !currentUsingLatLng) {
                  setDebugInfo(`Waiting for SVG or locations... (${svgAttempts}/200)`);
                } else if (!currentShapesReady) {
                  setDebugInfo(`Waiting for location data... (${readyCount}/${locationsRef.current.length} ready, ${latLngCount} with lat/lng, ${svgAttempts}/200)`);
                }
              }
            }
          }
          
          // Increase timeout to 40 seconds (200 attempts * 200ms)
          if (svgAttempts > 200) {
            clearInterval(svgPollTimer);
            setDebugInfo(`ERROR: Map not ready after 40s (SVG: ${svgEl ? '✓' : '✗'}, Shapes: ${shapesReady ? '✓' : '✗'}, Lat/Lng: ${usingLatLng ? '✓' : '✗'})`);
          }
        }, 200);
      }
      
      if (attempts > 150) {
        clearInterval(pollTimer);
        setDebugInfo('TIMEOUT: Map did not initialize');
      }
    }, 200);

    // Update tooltip position on scroll (if label is currently visible)
    const handleScroll = () => {
      if (tooltipRef.current?.style.display === 'block' && !isUserHoveringRef.current && locationsRef.current.length > 0) {
        // Reposition the label for the current auto-cycle region
        showLocationLabel(locationsRef.current[currentAutoIndexRef.current]);
      } else if (tooltipRef.current?.style.display === 'block' && isUserHoveringRef.current && hoveredLocationRef.current !== null) {
        // Reposition the hover label if user is hovering
        showLocationLabel(hoveredLocationRef.current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    // Cleanup function: runs when component unmounts or when dependencies change
    // This ensures no memory leaks or lingering intervals/listeners
    return () => {
      // Stop auto-cycling interval to prevent it from running after component unmounts
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Stop initialization polling timer
      if (pollTimer) clearInterval(pollTimer);
      // Remove scroll event listener
      window.removeEventListener('scroll', handleScroll);
      // Remove tooltip element from DOM
      tooltipRef.current?.remove();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Keep ref in sync with state (for use in event handlers and callbacks)
  // This ensures event handlers always have access to the latest auto-cycle index
  useEffect(() => {
    currentAutoIndexRef.current = currentAutoIndex;
  }, [currentAutoIndex]);

  return (
    <div id="World-Map">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{title}</h2>
        <div style={{ 
          fontSize: '12px', 
          color: '#666', 
          padding: '4px 8px', 
          background: '#f0f0f0', 
          borderRadius: '4px' 
        }}>
          {debugInfo}
        </div>
      </div>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default WorldMap;