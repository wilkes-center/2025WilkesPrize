const orangeIcon = L.divIcon({
    className: 'custom-marker-icon',
    iconSize: [30, 30],
    html: '<div style="width:100%;height:100%;background-color:#dd3b00;border-radius:50%;"></div>'
});

const finalistIcon = L.divIcon({
    className: 'custom-marker-icon',
    iconSize: [42, 42],
    html: '<div style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;background-color:#751d0c;border-radius:50%;">' +
          '<svg viewBox="0 0 24 24" width="35" height="35">' +
          '<polygon fill="#f9f6ef" stroke="#f9f6ef" stroke-width="1.5" points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />' +
          '</svg></div>'
});

const markers = L.markerClusterGroup({
    chunkedLoading: true,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 10,
    maxClusterRadius: zoom => {
        if (zoom <= 2) return 100;
        if (zoom <= 4) return 80;
        if (zoom <= 6) return 60;
        if (zoom <= 8) return 40;
        return 20;
    },
    iconCreateFunction: cluster => {
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

const finalistsLayer = L.layerGroup();

map.addLayer(markers);
map.addLayer(finalistsLayer);