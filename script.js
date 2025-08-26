/**
 * Durban Horticulture Club - Interactive JavaScript
 * Victorian Dark Academia Botanical Society
 */

// Mystical plant facts for the "Press to Appreciate" button
const mysticalPlantFacts = [
    "The humble moss (*Bryum argenteum*) can survive in space and has been a silent witness to human civilization for millennia.",
    "Indigenous Natal fig trees (*Ficus sycomorus*) communicate through their root networks, sharing nutrients and warnings across vast distances.",
    "The Victorian practice of 'fern fever' led to the near extinction of several species. Our Society works to preserve what remains.",
    "Durban's humidity creates perfect conditions for epiphytes - plants that live on other plants without parasitism, truly mystical beings.",
    "The ancient Zulu peoples knew that certain indigenous plants bloom only under specific moon phases - wisdom our Society still honors.",
    "Terrarium ecosystems can maintain themselves for decades, creating miniature worlds that mirror the greater botanical mysteries.",
    "The *Strelitzia reginae* (Bird of Paradise) was named for Queen Charlotte of Mecklenburg-Strelitz, connecting our gardens to royal mystery.",
    "Mycorrhizal fungi networks extend for kilometers underground, forming the 'wood wide web' of forest communication.",
    "The Victorian language of flowers included over 400 botanical symbols - a secret code our ancestors used for forbidden correspondence.",
    "Some indigenous aloes can live for over 100 years, making them witnesses to generations of Durban's botanical evolution.",
    "The practice of pressing flowers between book pages preserves not just specimens, but memories and moments in time.",
    "Durban's coastal microclimate allows tropical and temperate species to coexist in ways found nowhere else on Earth."
];

// Member progression data
const membershipData = {
    isInitiated: false,
    currentRank: 'Initiate Cultivator',
    badges: ['First Sprout'],
    ritualsCompleted: ['Dawn Watering Ceremony'],
    secretLevel: 1,
    gatheringAttendance: 1,
    initiationDate: new Date().toISOString().split('T')[0]
};

// Seasonal data for dynamic content
const seasonalData = {
    current: 'winter',
    transitions: {
        spring: { color: '#9db665', theme: 'awakening' },
        summer: { color: '#4a5d23', theme: 'abundance' },
        autumn: { color: '#d4a574', theme: 'harvest' },
        winter: { color: '#6b7b8c', theme: 'reflection' }
    }
};

/**
 * Initialize the mystical interface
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeMembership();
    initializeInteractiveElements();
    initializeSeasonalEffects();
    initializeWeatherWidget();
    initializeTooltips();
    
    console.log('🌿 The botanical mysteries have been awakened...');
});

/**
 * Initialize membership system
 */
function initializeMembership() {
    const storedData = localStorage.getItem('dhc_member_data');
    let currentMemberData = membershipData;
    
    if (storedData) {
        currentMemberData = { ...membershipData, ...JSON.parse(storedData) };
        currentMemberData.isInitiated = true;
    }
    
    updateMemberDisplay(currentMemberData);
    
    // Handle join society button
    const joinButton = document.getElementById('joinSociety');
    if (joinButton) {
        joinButton.addEventListener('click', function() {
            if (!currentMemberData.isInitiated) {
                initiateNewMember();
            } else {
                showMemberPortal();
            }
        });
    }
}

/**
 * Initiate a new member into the society
 */
function initiateNewMember() {
    const initiation = confirm(
        "Do you, seeker of botanical wisdom, solemnly swear to protect the green mysteries of Durban, " +
        "to nurture all plant life with reverence, and to uphold the sacred traditions of our Society " +
        "established in the mystical year of 1883?"
    );
    
    if (initiation) {
        membershipData.isInitiated = true;
        membershipData.initiationDate = new Date().toISOString().split('T')[0];
        
        // Save to localStorage
        localStorage.setItem('dhc_member_data', JSON.stringify(membershipData));
        
        // Update display
        updateMemberDisplay(membershipData);
        
        // Show initiation message
        showInitiationMessage();
        
        // Add mystical effects
        addMysticalEffects();
        
        console.log('🗝️ New member initiated into the Society');
    }
}

/**
 * Update member display based on current status
 */
function updateMemberDisplay(memberData) {
    const memberProfile = document.getElementById('memberProfile');
    const guestWelcome = document.getElementById('guestWelcome');
    const joinButton = document.getElementById('joinSociety');
    
    if (memberData.isInitiated) {
        if (memberProfile) {
            memberProfile.classList.add('active');
            memberProfile.style.display = 'block';
        }
        if (guestWelcome) {
            guestWelcome.classList.add('hidden');
            guestWelcome.style.display = 'none';
        }
        if (joinButton) {
            joinButton.innerHTML = '<span class="btn-icon">🏛️</span><span class="btn-text">Enter the Conservatory</span>';
        }
        
        updateProgressDisplay(memberData);
    } else {
        if (memberProfile) {
            memberProfile.classList.remove('active');
            memberProfile.style.display = 'none';
        }
        if (guestWelcome) {
            guestWelcome.classList.remove('hidden');
            guestWelcome.style.display = 'block';
        }
    }
}

/**
 * Update member progress displays
 */
function updateProgressDisplay(memberData) {
    // Update greeting
    const memberGreeting = document.querySelector('.member-greeting');
    if (memberGreeting) {
        memberGreeting.textContent = `Welcome back, ${memberData.currentRank}`;
    }
    
    // Update initiation date
    const initiationDate = document.querySelector('.initiation-date');
    if (initiationDate) {
        const date = new Date(memberData.initiationDate);
        initiationDate.textContent = `Initiated: ${date.toLocaleDateString('en-ZA')}`;
    }
    
    // Update progress bar (example: 20% for Initiate level)
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const progress = calculateMemberProgress(memberData);
        progressFill.style.width = `${progress}%`;
    }
}

/**
 * Calculate member progress percentage
 */
function calculateMemberProgress(memberData) {
    const ranks = [
        'Initiate Cultivator',
        'Moss Procurer', 
        'Fern Archivist',
        'Humidity Keeper',
        'Master of Mycorrhizal Network'
    ];
    
    const currentIndex = ranks.indexOf(memberData.currentRank);
    return ((currentIndex + 1) / ranks.length) * 100;
}

/**
 * Show initiation success message
 */
function showInitiationMessage() {
    const message = document.createElement('div');
    message.className = 'initiation-message mystical-glow';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-cream);
        border: var(--border-mystical);
        border-radius: 8px;
        padding: 2rem;
        text-align: center;
        z-index: 1000;
        box-shadow: var(--shadow-strong);
        max-width: 500px;
    `;
    
    message.innerHTML = `
        <h3 style="color: var(--color-moss); margin-bottom: 1rem;">🌿 Initiation Complete 🌿</h3>
        <p style="margin-bottom: 1rem;">Welcome to the Durban Horticulture Club, fellow keeper of botanical mysteries!</p>
        <p style="font-style: italic; color: var(--color-sepia);">Your journey into the verdant arcane begins now...</p>
        <button id="closeInitiation" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--color-moss); color: white; border: none; border-radius: 4px; cursor: pointer;">Enter the Society</button>
    `;
    
    document.body.appendChild(message);
    
    // Auto-remove after user clicks or timeout
    const closeButton = message.querySelector('#closeInitiation');
    const closeMessage = () => {
        message.remove();
        showMemberPortal();
    };
    
    closeButton.addEventListener('click', closeMessage);
    setTimeout(closeMessage, 5000);
}

/**
 * Show member portal (scroll to it)
 */
function showMemberPortal() {
    const memberPortal = document.getElementById('portal');
    if (memberPortal) {
        memberPortal.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add attention effect
        memberPortal.style.transform = 'scale(1.02)';
        memberPortal.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            memberPortal.style.transform = 'scale(1)';
        }, 1000);
    }
}

/**
 * Initialize interactive elements
 */
function initializeInteractiveElements() {
    // Press to Appreciate button
    const appreciateBtn = document.getElementById('appreciateBtn');
    const appreciationDisplay = document.getElementById('appreciationDisplay');
    const factText = document.getElementById('factText');
    
    if (appreciateBtn && appreciationDisplay && factText) {
        appreciateBtn.addEventListener('click', function() {
            // Random mystical plant fact
            const randomFact = mysticalPlantFacts[Math.floor(Math.random() * mysticalPlantFacts.length)];
            
            // Display with animation
            factText.textContent = randomFact;
            appreciationDisplay.style.display = 'block';
            appreciationDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add mystical effects
            appreciateBtn.classList.add('mystical-glow');
            setTimeout(() => {
                appreciateBtn.classList.remove('mystical-glow');
            }, 3000);
            
            console.log('🔮 Mystical plant wisdom revealed');
        });
    }
    
    // Navigation scroll effects
    initializeNavigationScrolling();
    
    // Hover effects for cards
    initializeCardHoverEffects();
}

/**
 * Initialize smooth scrolling for navigation
 */
function initializeNavigationScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                });
                
                // Add mystical glow to target section
                targetElement.classList.add('mystical-glow');
                setTimeout(() => {
                    targetElement.classList.remove('mystical-glow');
                }, 2000);
            }
        });
    });
}

/**
 * Initialize card hover effects
 */
function initializeCardHoverEffects() {
    const cards = document.querySelectorAll('.content-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            
            // Add subtle floating animation to icons
            const icon = this.querySelector('.section-icon');
            if (icon) {
                icon.classList.add('floating');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.section-icon');
            if (icon) {
                icon.classList.remove('floating');
            }
        });
    });
}

/**
 * Initialize seasonal effects
 */
function initializeSeasonalEffects() {
    // Determine current season (Southern Hemisphere)
    const currentMonth = new Date().getMonth() + 1; // 1-12
    let currentSeason;
    
    if (currentMonth >= 3 && currentMonth <= 5) {
        currentSeason = 'autumn';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
        currentSeason = 'winter';
    } else if (currentMonth >= 9 && currentMonth <= 11) {
        currentSeason = 'spring';
    } else {
        currentSeason = 'summer';
    }
    
    // Apply seasonal theme
    applySeasonalTheme(currentSeason);
    
    console.log(`🍂 Current season: ${currentSeason}`);
}

/**
 * Apply seasonal theme adjustments
 */
function applySeasonalTheme(season) {
    const root = document.documentElement;
    const seasonData = seasonalData.transitions[season];
    
    if (seasonData) {
        // Subtle seasonal color adjustments
        root.style.setProperty('--seasonal-accent', seasonData.color);
        
        // Update body class for seasonal styling
        document.body.className = `season-${season}`;
        
        
        // Add seasonal particle effects (optional)
        if (season === 'autumn') {
            addFallingLeaves();
        } else if (season === 'winter') {
            addMistEffect();
        }
    }
}


/**
 * Initialize weather widget with dynamic updates
 */
function initializeWeatherWidget() {
    const weatherDesc = document.querySelector('.weather-desc');
    const humidity = document.querySelector('.humidity');
    
    if (weatherDesc && humidity) {
        // Simulate dynamic weather updates
        updateWeatherDisplay();
        
        // Update every 30 minutes
        setInterval(updateWeatherDisplay, 1800000);
    }
}

/**
 * Update weather display with mystical interpretations
 */
function updateWeatherDisplay() {
    const weatherInterpretations = [
        "The spirits whisper of rain",
        "Humidity crystals show ancient activity", 
        "The greenhouse guardians are restless",
        "Perfect conditions for spore collection",
        "The mycorrhizal network pulses with life",
        "Atmospheric pressure suggests root meditation time"
    ];
    
    const humidityLevels = [
        "Humidity: 78% - Mystically perfect",
        "Humidity: 82% - The plants are dancing", 
        "Humidity: 71% - Spirits are gathering",
        "Humidity: 85% - Terrarium weather activated"
    ];
    
    const weatherDesc = document.querySelector('.weather-desc');
    const humidity = document.querySelector('.humidity');
    
    if (weatherDesc && humidity) {
        weatherDesc.textContent = weatherInterpretations[Math.floor(Math.random() * weatherInterpretations.length)];
        humidity.textContent = humidityLevels[Math.floor(Math.random() * humidityLevels.length)];
    }
    
    // Update weather forecast images dynamically
    updateWeatherForecastImages();
}

/**
 * Update weather forecast section with appropriate graphics
 */
function updateWeatherForecastImages() {
    const weatherImages = document.querySelectorAll('.weather-image');
    const availableWeatherGraphics = [
        { 
            src: 'images/weather-graphics/high-humidity.png', 
            alt: 'High Humidity Spirits',
            conditions: 'high-humidity'
        },
        { 
            src: 'images/weather-graphics/rain.png', 
            alt: 'Rain Spirit Blessing',
            conditions: 'rain'
        },
        { 
            src: 'images/weather-graphics/drought.png', 
            alt: 'Plant Meditation',
            conditions: 'drought'
        },
        { 
            src: 'images/weather-graphics/wind.png', 
            alt: 'Wind Spirits Dancing',
            conditions: 'wind'
        },
        { 
            src: 'images/weather-graphics/storms.png', 
            alt: 'Electric Storm Spirits',
            conditions: 'storms'
        }
    ];
    
    // Randomly assign weather graphics to create variety
    if (weatherImages.length > 0) {
        weatherImages.forEach((img, index) => {
            const randomWeather = availableWeatherGraphics[Math.floor(Math.random() * availableWeatherGraphics.length)];
            img.src = randomWeather.src;
            img.alt = randomWeather.alt;
        });
    }
}

/**
 * Initialize tooltips for Latin plant names
 */
function initializeTooltips() {
    const latinNames = document.querySelectorAll('em');
    
    latinNames.forEach(name => {
        // Add tooltip for Latin names with common names
        const tooltips = {
            'Bryum argenteum': 'Silver Moss - Hardy cosmopolitan species',
            'Ficus sycomorus': 'Sycamore Fig - Sacred tree of ancient peoples',
            'Strelitzia reginae': 'Bird of Paradise - Royal flower of the garden',
            'Cyathea dregei': 'Grassland Tree Fern - Ancient prehistoric survivor',
            'Custodes Arcana Viridis': 'Guardians of the Green Mysteries',
            'Custodiamus Mysterium Botanicum Durbanensis': 'We Guard the Botanical Mysteries of Durban'
        };
        
        const latinText = name.textContent.trim();
        if (tooltips[latinText]) {
            name.setAttribute('title', tooltips[latinText]);
        }
    });
}

/**
 * Add mystical visual effects
 */
function addMysticalEffects() {
    // Add floating particles effect to header
    const header = document.querySelector('.site-header');
    if (header) {
        createFloatingSpores(header);
    }
    
    // Add glow effects to important elements
    const crestLogo = document.querySelector('.crest-logo');
    if (crestLogo) {
        crestLogo.classList.add('mystical-glow');
    }
}

/**
 * Create floating spore particle effect
 */
function createFloatingSpores(container) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const spore = document.createElement('div');
            spore.className = 'floating-spore';
            spore.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--color-moss);
                border-radius: 50%;
                opacity: 0.6;
                pointer-events: none;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatingSpore ${5 + Math.random() * 5}s infinite ease-in-out;
            `;
            
            container.style.position = 'relative';
            container.appendChild(spore);
            
            // Remove after animation
            setTimeout(() => {
                if (spore.parentNode) {
                    spore.parentNode.removeChild(spore);
                }
            }, 10000);
        }, i * 1000);
    }
}

/**
 * Add CSS animations dynamically
 */
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatingSpore {
            0%, 100% { 
                transform: translateY(0px) translateX(0px) scale(1);
                opacity: 0.6;
            }
            25% { 
                transform: translateY(-20px) translateX(10px) scale(1.2);
                opacity: 0.8;
            }
            50% { 
                transform: translateY(-10px) translateX(-15px) scale(0.8);
                opacity: 0.4;
            }
            75% { 
                transform: translateY(-30px) translateX(5px) scale(1.1);
                opacity: 0.7;
            }
        }
        
        .floating-spore {
            z-index: 1;
        }
        
        .season-autumn {
            filter: sepia(0.1) saturate(1.2) hue-rotate(10deg);
        }
        
        .season-winter {
            filter: brightness(0.95) contrast(1.1) saturate(0.9);
        }
        
        .season-spring {
            filter: saturate(1.1) brightness(1.05) hue-rotate(-5deg);
        }
        
        .season-summer {
            filter: saturate(1.2) contrast(1.05);
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Add falling leaves effect for autumn
 */
function addFallingLeaves() {
    // Simple autumn particle effect
    const leaves = ['🍂', '🍃', '🌿'];
    
    setInterval(() => {
        const leaf = document.createElement('div');
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        leaf.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 20 + 15}px;
            opacity: ${Math.random() * 0.7 + 0.3};
            pointer-events: none;
            z-index: 1;
            animation: falling ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(leaf);
        
        // Remove after animation
        setTimeout(() => {
            if (leaf.parentNode) {
                leaf.parentNode.removeChild(leaf);
            }
        }, 5000);
        
    }, 5000); // New leaf every 5 seconds
}

/**
 * Add mist effect for winter
 */
function addMistEffect() {
    const mist = document.createElement('div');
    mist.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, transparent 0%, rgba(107, 123, 140, 0.05) 100%);
        pointer-events: none;
        z-index: 1;
        animation: mistMovement 20s ease-in-out infinite;
    `;
    
    document.body.appendChild(mist);
}

// Add dynamic styles on load
addDynamicStyles();

// Utility function for debugging
window.DHC_Debug = {
    getMemberData: () => JSON.parse(localStorage.getItem('dhc_member_data') || '{}'),
    clearMemberData: () => {
        localStorage.removeItem('dhc_member_data');
        location.reload();
    },
    addRandomBadge: () => {
        const badges = ['Moss Whisperer', 'Humidity Master', 'Fern Collector', 'Spore Sage'];
        const currentData = JSON.parse(localStorage.getItem('dhc_member_data') || '{}');
        currentData.badges = currentData.badges || [];
        const newBadge = badges[Math.floor(Math.random() * badges.length)];
        if (!currentData.badges.includes(newBadge)) {
            currentData.badges.push(newBadge);
            localStorage.setItem('dhc_member_data', JSON.stringify(currentData));
            console.log(`🏆 Badge earned: ${newBadge}`);
            location.reload();
        }
    }
};

console.log('🔮 Mystical debugging tools available at window.DHC_Debug');