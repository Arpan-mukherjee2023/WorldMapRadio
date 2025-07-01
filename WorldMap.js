import React, { useEffect, useState } from 'react';

const WorldMap = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const southWest = L.latLng(-85, -180);
    const northEast = L.latLng(85, 180);
    const bounds = L.latLngBounds(southWest, northEast);

    const initializedMap = L.map('map', {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(initializedMap);

    setMap(initializedMap);

    // Cleanup on unmount
    return () => {
      initializedMap.remove();
    };
  }, []);

  useEffect(() => {
    if (!map) return;
  
    fetch('https://de1.api.radio-browser.info/json/stations?limit=10000')
      .then(res => res.json())
      .then(stations => {
        const filtered = stations.filter(s =>
          s.lastcheckok === 1 &&
          s.codec === "MP3" &&
          s.url_resolved.startsWith("https")
        );

        filtered.forEach(station => {
          // Check that geo_lat and geo_long exist and are valid numbers
          const lat = station.geo_lat;
          const lng = station.geo_long;
          if (
            lat !== null &&
            lng !== null &&
            !isNaN(lat) &&
            !isNaN(lng)
          ) {
            L.circleMarker([lat, lng], {
              radius: 6,
              fillColor: 'green',
              color: 'darkgreen',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8, 
            })
            .addTo(map)
            .bindPopup(`
              <div style="
                width: 260px;
                padding: 12px;
                font-family: 'Segoe UI', sans-serif;
                color: #333;
                background: #f9f9f9;
                border-radius: 12px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.15);
              ">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                  <img src="${station.favicon || 'https://via.placeholder.com/48'}" alt="Logo"
                    style="width: 48px; height: 48px; border-radius: 10px; object-fit: cover; border: 1px solid #ddd;" />
                  <div>
                    <div style="font-size: 14px; font-weight: 600;">${station.name}</div>
                    <div style="font-size: 12px; color: #777;">${station.country}</div>
                  </div>
                </div>
            
                <div style="
                  background: #e0e0e0;
                  padding: 8px;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
                  <audio controls autoplay style="width: 100%; border-radius: 6px; outline: none;">
                    <source src="${station.url_resolved}" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            `)
          }
        });
      })
      .catch(err => {
        console.error('Failed to fetch stations:', err);
      });
  }, [map]);

  return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
};

export default WorldMap
