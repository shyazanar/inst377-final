const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Endpoint to search for locations
app.post('/api/search', async (req, res) => {
    try {
        const { query, lat, lon } = req.body;
        const radius = 1000; // Search within 1km radius
        
        // Using Overpass API to search OpenStreetMap
        const overpassUrl = `https://overpass-api.de/api/interpreter`;
        const overpassQuery = `
            [out:json][timeout:25];
            (
                node["name"~"${query}",i](around:${radius},${lat},${lon});
                way["name"~"${query}",i](around:${radius},${lat},${lon});
                relation["name"~"${query}",i](around:${radius},${lat},${lon});
            );
            out body;
            >;
            out skel qt;
        `;

        const response = await fetch(overpassUrl, {
            method: 'POST',
            body: overpassQuery
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 