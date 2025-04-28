// Load and process location data from CSV
function loadLocationData() {
    const loadingElement = document.getElementById('loading');
    let loadedFiles = 0;
    const totalFiles = 2;

    function checkAllFilesLoaded() {
        loadedFiles++;
        if (loadedFiles === totalFiles) {
            loadingElement.style.display = 'none';
        }
    }
    
    // Load main applicant data
    Papa.parse('geocoded_locations_all.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            checkAllFilesLoaded();
            
            if (results.errors && results.errors.length > 0) {
                showError('Error parsing CSV: ' + results.errors[0].message);
                return;
            }
            
            // Filter valid locations
            const validLocations = results.data.filter(loc => 
                loc && loc.latitude !== null && loc.longitude !== null && 
                !isNaN(loc.latitude) && !isNaN(loc.longitude)
            );
            
            // Update info panel with location count
            document.querySelector('.info-content').innerHTML = 
            `Displaying applicant locations from around the world for the 2025 Wilkes Center Climate Launch Prize.`;
            
            // Add markers for each valid location
            validLocations.forEach(loc => {
                const marker = L.marker([loc.latitude, loc.longitude], {
                    icon: orangeIcon
                });
                
                let popupContent = `<strong>${loc.location || 'Unknown Location'}</strong>`;
                
                if (loc.address) {
                    popupContent += `<br><em>${loc.address}</em>`;
                }
                
                popupContent += `<br><small>Coordinates: ${loc.latitude.toFixed(5)}, ${loc.longitude.toFixed(5)}</small>`;
                
                marker.bindPopup(popupContent);
                
                markers.addLayer(marker);
            });
        },
        error: function(error) {
            checkAllFilesLoaded();
            showError('Failed to load main CSV file: ' + error.message);
        }
    });

    // Load finalist data
    Papa.parse('finalists.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            checkAllFilesLoaded();
            
            if (results.errors && results.errors.length > 0) {
                showError('Error parsing finalists CSV: ' + results.errors[0].message);
                return;
            }
            
            // Filter valid locations
            const validFinalists = results.data.filter(loc => 
                loc && loc.lat !== null && loc.lon !== null && 
                !isNaN(loc.lat) && !isNaN(loc.lon)
            );
            
            // Add markers for each valid finalist location
            validFinalists.forEach(loc => {
                // Add a small offset to finalist coordinates
                const offsetLat = loc.lat + 0.0005; // Slight north offset
                const offsetLon = loc.lon + 0.0005; // Slight east offset
                
                const marker = L.marker([offsetLat, offsetLon], {
                    icon: finalistIcon,
                    zIndexOffset: 1000  // Keep finalists visually on top
                });
                
                let companyName = loc["Company Name"] || 'Unknown Company';
                let companyDisplay = loc.link ? 
                    `<a href='${loc.link}' target='_blank' style='color: #2d5954; text-decoration: underline;'>${companyName}</a>` : 
                    companyName;
                    
                let popupContent = '<div style="font-family: \'Sora\', sans-serif;">' +
                    '<strong>Finalist: ' + companyDisplay + '</strong>';
                    
                if (loc.formatted) {
                    popupContent += '<br><em>' + loc.formatted + '</em>';
                }
                
                popupContent += '<br><small>Location: ' + loc.lat.toFixed(5) + ', ' + loc.lon.toFixed(5) + '</small>' +
                    '</div>';
                
                marker.bindPopup(popupContent);
                
                finalistsLayer.addLayer(marker);
            });
        },
        error: function(error) {
            checkAllFilesLoaded();
            showError('Failed to load finalists CSV file: ' + error.message);
        }
    });
}

// Display error message in info panel
function showError(message) {
    const infoPanel = document.querySelector('.info-panel');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    infoPanel.appendChild(errorElement);
} 