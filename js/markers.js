// Custom marker icon definition
const orangeIcon = L.divIcon({
    className: 'custom-marker-icon',
    iconSize: [30, 30],
    html: '<div style="width:100%;height:100%;background-color:#dd3b00;border-radius:50%;"></div>'
});

const finalistIcon = L.divIcon({
    className: 'custom-marker-icon',
    iconSize: [42, 42],
    html: '<div style="width:100%;height:100%;background-color:black;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#f9f6ef;font-family:\'Sora\',sans-serif;font-weight:600;font-size:22px;box-shadow:0 0 0 3px tan, 0 4px 12px rgba(0,0,0,0.3);">F</div>'
});

// Initialize marker cluster group with custom settings
const markers = L.markerClusterGroup({
    chunkedLoading: true,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 10,
    maxClusterRadius: function(zoom) {
        if (zoom <= 2) return 100;
        else if (zoom <= 4) return 80;
        else if (zoom <= 6) return 60;
        else if (zoom <= 8) return 40;
        else return 20;
    },
    iconCreateFunction: function(cluster) {
        const count = cluster.getChildCount();
        let className = 'marker-cluster-';
        
        if (count < 10) {
            className += 'small';
        } else if (count < 50) {
            className += 'medium';
        } else {
            className += 'large';
        }
        
        return L.divIcon({ 
            html: '<div><span>' + count + '</span></div>', 
            className: className,
            iconSize: L.point(60, 60)
        });
    }
});

map.addLayer(markers);

// Create a separate layer group for finalists that won't be clustered
const finalistsLayer = L.layerGroup().addTo(map); 