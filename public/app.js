let map;
let userMarker;
let locationMarkers = [];

// Initialize the map
function initMap() {
    map = L.map('map').setView([0, 0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// Get user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                if (userMarker) {
                    map.removeLayer(userMarker);
                }
                map.setView([latitude, longitude], 13);
                userMarker = L.marker([latitude, longitude])
                    .addTo(map)
                    .bindPopup('Your Location')
                    .openPopup();
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to get your location. Please enable location services.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Search for locations
async function searchLocations() {
    const searchInput = document.getElementById('searchInput').value;
    if (!searchInput) {
        alert('Please enter a search term');
        return;
    }

    if (!userMarker) {
        alert('Please wait for your location to be determined');
        return;
    }

    const latLng = userMarker.getLatLng();
    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: searchInput,
                lat: latLng.lat,
                lon: latLng.lng
            })
        });

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error searching locations:', error);
        alert('Failed to search for locations. Please try again.');
    }
}

// Display search results
function displayResults(data) {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    // Clear existing markers
    locationMarkers.forEach(marker => map.removeLayer(marker));
    locationMarkers = [];

    if (!data.elements || data.elements.length === 0) {
        resultsList.innerHTML = '<p>No results found</p>';
        return;
    }

    data.elements.forEach(element => {
        if (element.type === 'node' && element.tags) {
            const { lat, lon } = element;
            const name = element.tags.name || 'Unnamed location';
            const type = element.tags.amenity || element.tags.shop || element.tags.leisure || 'Unknown type';

            // Create list item
            const listItem = document.createElement('div');
            listItem.className = 'location-item';
            listItem.innerHTML = `
                <div class="location-name">${name}</div>
                <div class="location-details">Type: ${type}</div>
            `;

            // Add marker to map
            const marker = L.marker([lat, lon])
                .addTo(map)
                .bindPopup(`<b>${name}</b><br>Type: ${type}`);
            locationMarkers.push(marker);

            // Add click event to list item
            listItem.addEventListener('click', () => {
                map.setView([lat, lon], 16);
                marker.openPopup();
            });

            resultsList.appendChild(listItem);
        }
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    getUserLocation();

    document.getElementById('searchButton').addEventListener('click', searchLocations);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchLocations();
        }
    });
}); 