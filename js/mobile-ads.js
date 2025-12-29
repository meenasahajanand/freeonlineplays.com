// Mobile View: Move 3rd ads after header navigation
(function() {
    let originalAdBox = null;
    let originalAdPosition = null;
    
    function moveThirdAdToHeader() {
        // Only run on mobile view
        if (window.innerWidth > 768) {
            return;
        }
        
        // Check if already moved
        if (document.querySelector('.mobile-ad-wrapper')) {
            return;
        }
        
        // Find the 3rd ads element
        const thirdAdElement = document.getElementById('div-gpt-ad-1766468285021-0');
        if (!thirdAdElement) {
            console.log('Third ad element not found');
            return;
        }
        
        // Find navigation element (breadcrumb)
        const navigation = document.querySelector('.section .navigation');
        if (!navigation) {
            console.log('Navigation element not found');
            return;
        }
        
        // Find parent s_box containing the 3rd ads
        const thirdAdBox = thirdAdElement.closest('.s_box');
        if (!thirdAdBox) {
            console.log('Third ad box not found');
            return;
        }
        
        // Store original position
        originalAdBox = thirdAdBox;
        originalAdPosition = thirdAdBox.nextSibling;
        
        // Add mobile class
        thirdAdBox.classList.add('mobile-third-ad');
        
        // Create label for mobile view
        const adLabel = document.createElement('div');
        adLabel.className = 'mobile-ad-label';
        adLabel.textContent = 'Advertisement';
        
        // Create wrapper div
        const adWrapper = document.createElement('div');
        adWrapper.className = 'mobile-ad-wrapper';
        adWrapper.appendChild(adLabel);
        adWrapper.appendChild(thirdAdBox);
        
        // Insert after navigation (right after the <p class="navigation"> element)
        // Use insertAdjacentElement for better control
        navigation.insertAdjacentElement('afterend', adWrapper);
        
        // Force show the ad element
        thirdAdElement.style.display = 'block';
    }
    
    function restoreOriginalAd() {
        if (!originalAdBox) {
            return;
        }
        
        // Remove mobile wrapper if exists
        const mobileWrapper = document.querySelector('.mobile-ad-wrapper');
        if (mobileWrapper) {
            mobileWrapper.remove();
        }
        
        // Remove mobile class
        originalAdBox.classList.remove('mobile-third-ad');
        
        // Find the section to restore to original position
        const section = document.querySelector('.section');
        if (section && originalAdPosition) {
            // Try to restore to original position
            const lastPublicBox = section.querySelector('.public_box:last-of-type');
            if (lastPublicBox && lastPublicBox.nextSibling) {
                section.insertBefore(originalAdBox, lastPublicBox.nextSibling);
            } else {
                section.appendChild(originalAdBox);
            }
        } else if (section) {
            // Fallback: append to end of section
            section.appendChild(originalAdBox);
        }
        
        originalAdBox = null;
        originalAdPosition = null;
    }
    
    // Run on DOM ready with multiple attempts
    function initMobileAds() {
        // Wait a bit for all elements to be ready
        setTimeout(function() {
            if (window.innerWidth <= 768) {
                moveThirdAdToHeader();
            }
        }, 300);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileAds);
    } else {
        initMobileAds();
    }
    
    // Also try after a longer delay to catch late-loading ads
    setTimeout(function() {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-ad-wrapper')) {
            moveThirdAdToHeader();
        }
    }, 1000);
    
    // Run on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth <= 768) {
                if (!document.querySelector('.mobile-ad-wrapper')) {
                    moveThirdAdToHeader();
                }
            } else {
                restoreOriginalAd();
            }
        }, 250);
    });
})();

