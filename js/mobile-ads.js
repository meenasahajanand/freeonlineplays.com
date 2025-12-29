// Mobile View: Move 1st ads after header navigation
(function() {
    let originalAdBox = null;
    let originalAdPosition = null;
    
    function moveFirstAdToHeader() {
        // Only run on mobile view
        if (window.innerWidth > 768) {
            return;
        }
        
        // Check if already moved
        if (document.querySelector('.mobile-ad-wrapper')) {
            return;
        }
        
        // Find the 1st ads element (d1)
        const firstAdElement = document.getElementById('div-gpt-ad-1766468198292-0');
        if (!firstAdElement) {
            console.log('First ad element not found');
            return;
        }
        
        // Find navigation element (breadcrumb)
        const navigation = document.querySelector('.section .navigation');
        if (!navigation) {
            console.log('Navigation element not found');
            return;
        }
        
        // Find parent ad_box or ad container containing the 1st ads
        let firstAdBox = firstAdElement.closest('.ad_box');
        if (!firstAdBox) {
            firstAdBox = firstAdElement.closest('.ad');
            if (!firstAdBox) {
                firstAdBox = firstAdElement.closest('.s_box');
            }
        }
        
        if (!firstAdBox) {
            console.log('First ad box not found');
            return;
        }
        
        // Store original position
        originalAdBox = firstAdBox;
        originalAdPosition = firstAdBox.nextSibling;
        
        // Add mobile class
        firstAdBox.classList.add('mobile-first-ad');
        
        // Create label for mobile view
        const adLabel = document.createElement('div');
        adLabel.className = 'mobile-ad-label';
        adLabel.textContent = 'Advertisement';
        
        // Create wrapper div
        const adWrapper = document.createElement('div');
        adWrapper.className = 'mobile-ad-wrapper';
        adWrapper.appendChild(adLabel);
        adWrapper.appendChild(firstAdBox);
        
        // Insert after navigation (right after the <p class="navigation"> element)
        // Use insertAdjacentElement for better control
        navigation.insertAdjacentElement('afterend', adWrapper);
        
        // Force show the ad element
        firstAdElement.style.display = 'block';
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
        originalAdBox.classList.remove('mobile-first-ad');
        
        // Find the game_box to restore to original position
        const gameBox = document.querySelector('.game_box');
        if (gameBox && originalAdPosition) {
            // Try to restore to original position (inside game_box .ad_box)
            const adBox = gameBox.querySelector('.ad_box');
            if (adBox) {
                adBox.appendChild(originalAdBox);
            } else {
                gameBox.appendChild(originalAdBox);
            }
        } else {
            // Fallback: find original parent and restore
            const section = document.querySelector('.section');
            if (section) {
                const gameBox = section.querySelector('.game_box');
                if (gameBox) {
                    const adBox = gameBox.querySelector('.ad_box');
                    if (adBox) {
                        adBox.appendChild(originalAdBox);
                    } else {
                        gameBox.appendChild(originalAdBox);
                    }
                } else {
                    section.appendChild(originalAdBox);
                }
            }
        }
        
        originalAdBox = null;
        originalAdPosition = null;
    }
    
    // Run on DOM ready with multiple attempts
    function initMobileAds() {
        // Wait a bit for all elements to be ready
        setTimeout(function() {
            if (window.innerWidth <= 768) {
                moveFirstAdToHeader();
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
            moveFirstAdToHeader();
        }
    }, 1000);
    
    // Run on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth <= 768) {
                if (!document.querySelector('.mobile-ad-wrapper')) {
                    moveFirstAdToHeader();
                }
            } else {
                restoreOriginalAd();
            }
        }, 250);
    });
})();

