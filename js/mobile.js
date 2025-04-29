function setupMobileView() {
    const infoPanel = document.getElementById('info-panel');
    const toggleInfo = document.getElementById('toggle-info');
    
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    function handleInfoPanel() {
        if (isMobile()) {
            toggleInfo.style.display = 'block';
            
            if (!sessionStorage.getItem('infoPanelState')) {
                infoPanel.classList.add('hidden');
            }
        } else {
            toggleInfo.style.display = 'none';
            infoPanel.classList.remove('hidden');
        }
    }
    
    toggleInfo.addEventListener('click', () => {
        infoPanel.classList.toggle('hidden');
        
        sessionStorage.setItem(
            'infoPanelState', 
            infoPanel.classList.contains('hidden') ? 'hidden' : 'visible'
        );
    });
    
    handleInfoPanel();
    window.addEventListener('resize', handleInfoPanel);
}