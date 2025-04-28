// Initialize map with custom settings
const map = L.map('map', {
    minZoom: 2,
    maxBounds: [
        [-90, -180],
        [90, 180]
    ],
    maxBoundsViscosity: 1.0,
    worldCopyJump: false,
    zoomControl: false
}).setView([20, 0], 2.5);

// Add map tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    noWrap: true,
    bounds: [[-90, -180], [90, 180]]
}).addTo(map);

// World view control handler
document.getElementById('world-view-control').querySelector('a').addEventListener('click', function(e) {
    e.preventDefault();
    map.setView([20, 0], 2.5, {animate: true});
});

// Zoom control handlers
const zoomInBtn = document.getElementById('zoom-control').querySelectorAll('a')[0];
const zoomOutBtn = document.getElementById('zoom-control').querySelectorAll('a')[1];

zoomInBtn.addEventListener('click', function(e) {
    e.preventDefault();
    map.zoomIn();
});

zoomOutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    map.zoomOut();
});

// Handle window resize
window.addEventListener('resize', function() {
    map.invalidateSize();
}); 