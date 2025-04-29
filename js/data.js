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
    
    Papa.parse('geocoded_locations_all.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: results => {
            checkAllFilesLoaded();
            
            if (results.errors && results.errors.length > 0) {
                showError('Error parsing CSV: ' + results.errors[0].message);
                return;
            }
            
            const validLocations = results.data.filter(loc => 
                loc && loc.latitude !== null && loc.longitude !== null && 
                !isNaN(loc.latitude) && !isNaN(loc.longitude)
            );
            
            document.querySelector('.info-content').innerHTML = 
                `Displaying ${validLocations.length} applicant locations from around the world for the 2025 Wilkes Center Climate Launch Prize.`;
            
            validLocations.forEach(loc => {
                const marker = L.marker([loc.latitude, loc.longitude], {
                    icon: orangeIcon
                });
                
                let popupContent = `<strong>${loc.location || 'Unknown Location'}</strong>`;
                
                if (loc.address) {
                    popupContent += `<br><em>${loc.address}</em>`;
                }
                
                marker.bindPopup(popupContent);
                markers.addLayer(marker);
            });
        },
        error: error => {
            checkAllFilesLoaded();
            showError('Failed to load main CSV file: ' + error.message);
        }
    });

    Papa.parse('finalists.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: results => {
            checkAllFilesLoaded();
            
            if (results.errors && results.errors.length > 0) {
                showError('Error parsing finalists CSV: ' + results.errors[0].message);
                return;
            }
            
            const validFinalists = results.data.filter(loc => 
                loc && loc.lat !== null && loc.lon !== null && 
                !isNaN(loc.lat) && !isNaN(loc.lon)
            );
            
            validFinalists.forEach(loc => {
                const offsetLat = loc.lat + 0.0005;
                const offsetLon = loc.lon + 0.0005;
                
                const marker = L.marker([offsetLat, offsetLon], {
                    icon: finalistIcon,
                    zIndexOffset: 1000
                });
                
                const companyName = loc["Company Name"] || 'Unknown Company';
                const companyDisplay = loc.link ? 
                    `<a href='${loc.link}' target='_blank' style='color: #2d5954; text-decoration: underline;'>${companyName}</a>` : 
                    companyName;
                    
                let popupContent = '<div style="font-family: \'Sora\', sans-serif;">' +
                    '<strong>Finalist: ' + companyDisplay + '</strong>';
                    
                if (loc.formatted) {
                    popupContent += '<br><em>' + loc.formatted + '</em>';
                }
                
                popupContent += '</div>';
                
                marker.bindPopup(popupContent);
                finalistsLayer.addLayer(marker);
            });
        },
        error: error => {
            checkAllFilesLoaded();
            showError('Failed to load finalists CSV file: ' + error.message);
        }
    });
}

function showError(message) {
    const infoPanel = document.querySelector('.info-panel');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    infoPanel.appendChild(errorElement);
}