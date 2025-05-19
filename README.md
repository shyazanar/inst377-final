# Nearby Location Finder

A web application that helps users find nearby locations based on their descriptions using OpenStreetMap data.

## Features

- Real-time location search using OpenStreetMap data
- Interactive map display using Leaflet.js
- Automatic user location detection
- Clean and modern user interface
- Responsive design
- Click-to-view location details

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone this repository or download the files
2. Navigate to the project directory
3. Install dependencies:
```bash
npm install
```

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

## License

MIT 