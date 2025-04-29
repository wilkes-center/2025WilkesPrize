const map = L.map('map', {
    minZoom: 2,
    maxZoom: 19,
    maxBounds: [
        [-90, -180],
        [90, 180]
    ],
    maxBoundsViscosity: 1.0,
    worldCopyJump: false,
    zoomControl: false
}).setView([20, 0], 2.5);

// Add Carto light basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    noWrap: false,
    bounds: [[-90, -180], [90, 180]]
}).addTo(map);

document.getElementById('world-view-control').querySelector('a').addEventListener('click', e => {
    e.preventDefault();
    map.setView([20, 0], 2.5, {animate: true});
});

const zoomControl = document.getElementById('zoom-control');
const zoomInBtn = zoomControl.querySelectorAll('a')[0];
const zoomOutBtn = zoomControl.querySelectorAll('a')[1];

zoomInBtn.addEventListener('click', e => {
    e.preventDefault();
    map.zoomIn();
});

zoomOutBtn.addEventListener('click', e => {
    e.preventDefault();
    map.zoomOut();
});

window.addEventListener('resize', () => map.invalidateSize());