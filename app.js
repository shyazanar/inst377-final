let map;
let markers = [];

// Initialize the map
function initMap() {
    map = L.map('map').setView([0, 0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 13);
                L.marker([latitude, longitude])
                    .addTo(map)
                    .bindPopup('You are here')
                    .openPopup();
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    }
}

// Search for nearby locations
async function searchNearby() {
    const center = map.getCenter();
    const amenity = document.getElementById('amenity-select').value;

    try {
        const response = await fetch(
            `/api/nearby?lat=${center.lat}&lon=${center.lng}&amenity=${amenity}`
        );
        const data = await response.json();

        // Clear existing markers
        markers.forEach(marker => marker.remove());
        markers = [];

        // Add new markers
        data.elements.forEach(element => {
            const marker = L.marker([element.lat, element.lon])
                .addTo(map)
                .bindPopup(element.tags.name || amenity);
            markers.push(marker);
        });

        // Display results list
        displayResults(data.elements);
    } catch (error) {
        console.error('Error searching nearby locations:', error);
    }
}

// Display results in a list
function displayResults(locations) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    locations.forEach(location => {
        const div = document.createElement('div');
        div.className = 'location-item';
        div.innerHTML = `
            <h3>${location.tags.name || 'Unnamed location'}</h3>
            <p>Type: ${location.tags.amenity}</p>
            ${location.tags.address || ''}
        `;
        resultsDiv.appendChild(div);
    });
}

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    document.getElementById('search-btn').addEventListener('click', searchNearby);
});