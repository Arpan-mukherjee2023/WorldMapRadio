# World Map Radio

**World Map Radio** is a React application that displays an interactive world map with markers representing live internet radio stations from around the globe. Users can click on any station marker to listen to live radio streams directly within the app.

---

## Features

- Interactive Leaflet.js world map centered at latitude 20, longitude 0 with zoom level 2.
- Markers show live radio stations filtered to only play MP3 streams over HTTPS that are currently online.
- Custom popup for each station with station name, country, logo, and an embedded audio player.
- Responsive full viewport map with header and footer for a polished UI.
- Smooth user experience with clickable markers that auto-play the radio stream.

---

## Technologies Used

- React

- Leaflet.js (for interactive maps)

- OpenStreetMap tile server

- Radio Browser API (https://de1.api.radio-browser.info) for fetching radio stations

- Tailwind CSS (for styling)



---

## Project Structure

- src/WorldMap.js — Main interactive map component fetching and rendering radio stations.

- src/Header.js — App header with title and subtitle.

- src/Footer.js — Footer with copyright information.

- src/App.js — Main app layout integrating header, map, and footer.



---

## API Details

The app fetches radio station data from the Radio Browser API:

https://de1.api.radio-browser.info/json/stations?limit=10000

### Stations are filtered by:

- lastcheckok === 1 (stations currently online)

- codec === "MP3" (MP3 audio streams)

- url_resolved starts with https (secure URLs)



---

## Notes

- The map restricts zoom levels to prevent zooming out beyond the world view.

- Stations without valid geo coordinates are ignored.

- Some radio streams might not work due to stream availability or CORS restrictions.



---

## Future Improvements

- Add search and filter functionality for stations by country or genre.

- Display additional metadata such as bitrate or tags.

- Add user preferences for favorite stations.

- Improve audio player controls (pause, volume, etc.) inside popups.

---

## Author

Arpan Mukherjee



---

