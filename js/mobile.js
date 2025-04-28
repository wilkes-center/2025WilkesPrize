// Mobile-specific enhancements
function setupMobileView() {
    const infoPanel = document.getElementById('info-panel');
    const toggleInfo = document.getElementById('toggle-info');
    
    // Check if the device is mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Function to handle the info panel display
    function handleInfoPanel() {
        if (isMobile()) {
            toggleInfo.style.display = 'block';
            
            // Initially hide the info panel on mobile
            if (!sessionStorage.getItem('infoPanelState')) {
                infoPanel.classList.add('hidden');
            }
        } else {
            toggleInfo.style.display = 'none';
            infoPanel.classList.remove('hidden');
        }
    }
    
    // Toggle info panel when button is clicked
    toggleInfo.addEventListener('click', function() {
        infoPanel.classList.toggle('hidden');
        
        // Store panel state in session storage
        if (infoPanel.classList.contains('hidden')) {
            sessionStorage.setItem('infoPanelState', 'hidden');
        } else {
            sessionStorage.setItem('infoPanelState', 'visible');
        }
    });
    
    // Set up on page load
    handleInfoPanel();
    
    // Update on window resize
    window.addEventListener('resize', handleInfoPanel);
} 