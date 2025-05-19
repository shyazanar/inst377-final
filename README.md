# Nearby Location Finder

A web application that helps users find nearby locations based on descriptions like “park,” “restaurant,” or “pharmacy” using real-time data from OpenStreetMap.

## Project Description

**Nearby Location Finder** allows users to search for places of interest near them by simply entering descriptive keywords. It utilizes OpenStreetMap and Overpass API to retrieve relevant geographic data and displays it interactively with Leaflet.js. Designed with simplicity in mind, the app features auto-location detection and a clean, responsive interface for use across devices.

## Features

- Real-time location search using OpenStreetMap data
- Interactive map display using Leaflet.js
- Automatic user location detection
- Clean and modern user interface
- Responsive design
- Click-to-view location details

## Target Browsers and Platforms

This web app is designed to function smoothly on both desktop and mobile browsers:

- **Mobile**: iOS (Safari, Chrome), Android (Chrome, Firefox)
- **Desktop**: Chrome, Firefox, Safari, Edge

## Link to Developer Manual

You are currently reading the Developer Manual. This document contains all technical details necessary for future development and maintenance.

---
# Developer Manual

Welcome to the Nearby Location Finder project! This manual is intended for developers who are taking over the project. You are expected to have general knowledge of web development, but no prior knowledge of this system is required.

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- npm (comes with Node.js)

## Installation Guide

To set up this application on your local machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nearby-location-finder.git
   cd nearby-location-finder

## Usage

1. Start the server:
```bash
npm start
```

2. Open your web browser and navigate to `http://localhost:3000`

3. Allow location access when prompted

4. Enter a description of the type of location you're looking for (e.g., "restaurant", "park", "cafe")

5. Click "Search" or press Enter to find nearby locations matching your description

## Development

To run the application in development mode with auto-reload:

```bash
npm run dev
```

## Technologies Used

- Node.js
- Express.js
- OpenStreetMap & Overpass API
- Leaflet.js
- HTML5 Geolocation API

