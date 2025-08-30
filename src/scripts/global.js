/**
 * Durban Horticulture Club - Global JavaScript
 * Victorian Dark Academia Botanical Society
 */

// Import global CSS
import '../styles/global.css';

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

// Rank system mapping
const rankSystem = {
  1: { title: "Acolyte", description: "Newly initiated, still germinating" },
  2: { title: "Cultivator", description: "Has completed basic rituals" },
  3: { title: "Keeper", description: "Guardian of specific garden duties" },
  4: { title: "Warden", description: "Oversees sacred spaces or expeditions" },
  5: { title: "Master", description: "Senior member, deeply rooted" }
};

// Name generation system
const nameGenerator = {
  prefixes: {
    A: "Fern", B: "Bramble", C: "Cragroot", D: "Dewthorn", E: "Elderbloom", F: "Fennel",
    G: "Grove", H: "Hemlock", I: "Ivy", J: "Juniper", K: "Kelp", L: "Lycaste",
    M: "Moss", N: "Nettle", O: "Oak", P: "Petal", Q: "Quince", R: "Root",
    S: "Spore", T: "Thorn", U: "Umbra", V: "Vine", W: "Willow", X: "Xeric",
    Y: "Yarrow", Z: "Zephyr"
  },
  suffixes: {
    1: "frost", 2: "whisper", 3: "bloom", 4: "glade", 5: "wick", 6: "vale",
    7: "hollow", 8: "weather", 9: "grove", 10: "mire", 11: "shade", 12: "drift"
  }
};

// Member progression data structure
const membershipDataDefaults = {
  isInitiated: false,
  rank: 1, // Tier number
  mysticalName: '',
  firstInitial: '',
  birthMonth: 1,
  badges: ['First Sprout'],
  ritualsCompleted: ['Dawn Watering Ceremony'],
  secretLevel: 1,
  gatheringAttendance: 1,
  initiationDate: new Date().toISOString().split('T')[0]
};

// Seasonal data for dynamic effects
const seasonalData = {
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
  console.log('🌿 The botanical mysteries are awakening...');
  
  initializeMembership();
  initializeInteractiveElements();
  initializeSeasonalEffects();
  initializeTooltips();
  addMysticalEffects();
  
  console.log('✨ Mystical initialization complete');
});

/**
 * Initialize membership system
 */
function initializeMembership() {
  const storedData = localStorage.getItem('dhc_member_data');
  let currentMemberData = membershipDataDefaults;
  
  if (storedData) {
    try {
      currentMemberData = { ...membershipDataDefaults, ...JSON.parse(storedData) };
      currentMemberData.isInitiated = true;
    } catch (e) {
      console.warn('Invalid member data found, resetting...');
      localStorage.removeItem('dhc_member_data');
    }
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
 * Generate mystical name based on first initial and birth month
 */
function generateMysticalName(initial, birthMonth) {
  const prefix = nameGenerator.prefixes[initial] || 'Moss';
  const suffix = nameGenerator.suffixes[birthMonth] || 'grove';
  return `${prefix}${suffix}`;
}

/**
 * Get full title including rank and mystical name
 */
function getFullTitle(memberData) {
  const isFounder = (memberData.mysticalName === 'Kelpgrove' || memberData.mysticalName === 'Zephyrmire');
  
  if (isFounder) {
    return `Custodian ${memberData.mysticalName}`;
  }
  
  const rank = rankSystem[memberData.rank] || rankSystem[1];
  if (memberData.rank === 5) {
    // Masters get "Master [MysticalName]"
    return `Master ${memberData.mysticalName}`;
  } else {
    // Others get "[MysticalName] the [RankTitle]"
    return `${memberData.mysticalName} the ${rank.title}`;
  }
}

/**
 * Show join society dialog
 */
function showJoinDialog() {
  console.log('🔮 Opening join dialog...');
  
  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  
  // Create modal content as separate element
  const modal = document.createElement('div');
  modal.className = 'modal-content';
  
  // Calculate position based on current scroll position
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;
  const modalTop = scrollTop + 100; // 100px from top of current viewport
  
  modal.style.top = modalTop + 'px';
  
  modal.innerHTML = `
      
      <!-- Header -->
      <div class="text-center mb-6">
        <div class="flex items-center justify-center gap-4 mb-4">
          <div class="w-16 h-16 bg-moss rounded-full flex items-center justify-center text-3xl border-2 border-brass">🌿</div>
          <h2 class="text-3xl font-heading text-charcoal">Join the Durban Horticulture Club</h2>
          <div class="w-16 h-16 bg-moss rounded-full flex items-center justify-center text-3xl border-2 border-brass">🌿</div>
        </div>
        <div class="bg-moss/20 border border-moss/40 rounded-lg p-4 mb-6">
          <p class="text-sm text-sepia italic">"Est. 1883 by Custodian Zephyrmire and Custodian Kelpgrove"</p>
        </div>
      </div>
      
      <!-- Form -->
      <form id="joinForm" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sepia font-secondary mb-2">First Initial</label>
            <select id="firstInitial" required class="w-full p-3 border-2 border-sepia rounded bg-cream text-charcoal font-ui">
              <option value="">Select your first initial...</option>
              <option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option>
              <option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option>
              <option value="I">I</option><option value="J">J</option><option value="K">K</option><option value="L">L</option>
              <option value="M">M</option><option value="N">N</option><option value="O">O</option><option value="P">P</option>
              <option value="Q">Q</option><option value="R">R</option><option value="S">S</option><option value="T">T</option>
              <option value="U">U</option><option value="V">V</option><option value="W">W</option><option value="X">X</option>
              <option value="Y">Y</option><option value="Z">Z</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sepia font-secondary mb-2">Birth Month</label>
            <select id="birthMonth" required class="w-full p-3 border-2 border-sepia rounded bg-cream text-charcoal font-ui">
              <option value="">Select your birth month...</option>
              <option value="1">January</option><option value="2">February</option><option value="3">March</option>
              <option value="4">April</option><option value="5">May</option><option value="6">June</option>
              <option value="7">July</option><option value="8">August</option><option value="9">September</option>
              <option value="10">October</option><option value="11">November</option><option value="12">December</option>
            </select>
          </div>
        </div>
        
        <!-- Generated Name Preview -->
        <div class="bg-plum/10 border border-plum/30 rounded-lg p-4 text-center">
          <p class="text-sepia mb-2">Your mystical name shall be:</p>
          <p id="namePreview" class="text-2xl font-heading text-plum">Select initial and month above</p>
        </div>
        
        <!-- Sacred Pledge -->
        <div class="bg-moss/10 border border-moss/30 rounded-lg p-6">
          <h3 class="text-moss font-secondary mb-4 text-center">🌿 Sacred Pledge of Plant Stewardship 🌿</h3>
          <div class="prose text-charcoal leading-relaxed space-y-3 text-sm">
            <p><em>"I, seeker of botanical wisdom, do solemnly pledge to honor the green mysteries of Durban and beyond."</em></p>
            
            <p><strong>I promise to:</strong></p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Protect and nurture all plant life with reverence and understanding</li>
              <li>Study the ancient ways of cultivation passed down through generations</li>
              <li>Share botanical knowledge with fellow seekers of verdant wisdom</li>
              <li>Maintain the sacred traditions established in 1883 by our founders</li>
              <li>Attend monthly gatherings when the moon and seasons allow</li>
              <li>Guard the mystical secrets of the Society with discretion</li>
            </ul>
            
            <p class="italic text-center text-sepia">"May my hands be blessed in their tending, may my garden flourish in harmony with nature's rhythms, and may I prove worthy of the title bestowed upon me by this ancient Brotherhood."</p>
          </div>
          
          <div class="mt-4">
            <label class="flex items-center gap-3">
              <input type="checkbox" id="pledgeAccepted" required class="w-5 h-5 text-moss border-2 border-sepia rounded">
              <span class="text-sepia font-ui">I solemnly accept this sacred pledge and vow to uphold the mysteries of horticulture</span>
            </label>
          </div>
        </div>
        
        <!-- Buttons -->
        <div class="flex gap-4 justify-center pt-4">
          <button type="button" id="cancelJoin" class="px-6 py-3 bg-sepia/20 text-sepia border-2 border-sepia rounded-lg hover:bg-sepia/30 transition-colors font-ui">
            🚪 Depart in Peace
          </button>
          <button type="submit" class="px-8 py-3 bg-gradient-to-br from-moss to-forest-shadow text-cream border-2 border-moss rounded-lg hover:from-forest-shadow hover:to-moss transition-colors font-ui font-medium">
            🌿 Join the Society
          </button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(backdrop);
  document.body.appendChild(modal);
  console.log('✅ Modal added to DOM', modal);
  
  // Handle form interactions
  const initialSelect = modal.querySelector('#firstInitial');
  const monthSelect = modal.querySelector('#birthMonth');
  const namePreview = modal.querySelector('#namePreview');
  const form = modal.querySelector('#joinForm');
  const cancelBtn = modal.querySelector('#cancelJoin');
  
  // Update name preview
  const updateNamePreview = () => {
    const initial = initialSelect.value;
    const month = parseInt(monthSelect.value);
    
    if (initial && month) {
      const mysticalName = generateMysticalName(initial, month);
      namePreview.textContent = mysticalName;
      
      // Special styling for founders
      if (mysticalName === 'Kelpgrove' || mysticalName === 'Zephyrmire') {
        namePreview.innerHTML = `<span class="text-brass">${mysticalName}</span> <small class="text-rust">(Founder!)</small>`;
      }
    } else {
      namePreview.textContent = 'Select initial and month above';
    }
  };
  
  initialSelect.addEventListener('change', updateNamePreview);
  monthSelect.addEventListener('change', updateNamePreview);
  
  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    processJoinRequest(modal, initialSelect.value, parseInt(monthSelect.value));
  });
  
  // Handle cancel
  cancelBtn.addEventListener('click', () => {
    backdrop.remove();
    modal.remove();
  });
  
  // Close on backdrop click
  backdrop.addEventListener('click', () => {
    backdrop.remove();
    modal.remove();
  });
}

/**
 * Process join request and initiate member
 */
function processJoinRequest(modal, initial, birthMonth) {
  const mysticalName = generateMysticalName(initial, birthMonth);
  const isFounder = (mysticalName === 'Kelpgrove' || mysticalName === 'Zephyrmire');
  
  const newMemberData = {
    ...membershipDataDefaults,
    isInitiated: true,
    firstInitial: initial,
    mysticalName: mysticalName,
    birthMonth: birthMonth,
    rank: isFounder ? 5 : 1, // Founders get Master rank, others start as Acolyte
    initiationDate: new Date().toISOString().split('T')[0]
  };
  
  // Save to localStorage
  localStorage.setItem('dhc_member_data', JSON.stringify(newMemberData));
  
  // Update display
  updateMemberDisplay(newMemberData);
  
  // Replace modal content with welcome message
  showWelcomeInModal(modal, newMemberData);
  
  // Add celebratory mystical effects
  createFloatingSpores(document.querySelector('.site-header'), 15);
  
  const rankTitle = isFounder ? 'Founder' : 'Acolyte';
  console.log(`🗝️ New member initiated: ${mysticalName} the ${rankTitle}`);
}

/**
 * Show welcome message in the same modal after successful joining
 */
function showWelcomeInModal(modal, memberData) {
  const fullTitle = getFullTitle(memberData);
  
  modal.innerHTML = `
    <!-- Welcome Header -->
    <div class="text-center mb-6">
      <div class="flex items-center justify-center gap-4 mb-4">
        <div class="w-16 h-16 bg-moss rounded-full flex items-center justify-center text-3xl border-2 border-brass mystical-glow">🌿</div>
        <h2 class="text-3xl font-heading text-charcoal">Initiation Complete!</h2>
        <div class="w-16 h-16 bg-moss rounded-full flex items-center justify-center text-3xl border-2 border-brass mystical-glow">🌿</div>
      </div>
      <div class="bg-moss/20 border border-moss/40 rounded-lg p-4 mb-6">
        <p class="text-lg text-plum font-heading">Welcome to the Durban Horticulture Club</p>
        <p class="text-sm text-sepia italic mt-2">"Est. 1883 by Custodian Zephyrmire and Custodian Kelpgrove"</p>
      </div>
    </div>
    
    <!-- Welcome Message -->
    <div class="bg-cream border border-decorative rounded-lg p-6 mb-6">
      <div class="text-center mb-4">
        <h3 class="text-moss text-2xl mb-4">🌿 Welcome, ${fullTitle}! 🌿</h3>
        <p class="text-charcoal leading-relaxed mb-4">
          Your initiation into the mystical botanical arts is now complete. You have been blessed with the sacred name <strong class="text-plum">${memberData.mysticalName}</strong>.
        </p>
        <p class="text-sepia italic mb-4">
          Your journey into the verdant arcane begins now. May your hands be blessed in their tending, and may your garden flourish in harmony with nature's ancient rhythms.
        </p>
      </div>
      
      <!-- Member Benefits Reminder -->
      <div class="bg-moss/10 border border-moss/30 rounded-lg p-4 mb-4">
        <h4 class="text-moss font-secondary mb-2">Your Society Benefits Await:</h4>
        <ul class="text-sm text-forest-shadow space-y-1">
          <li>✨ Access to rare plant cultivation secrets</li>
          <li>🌙 Monthly mystical plant appreciation gatherings</li>
          <li>🏺 Exclusive terrarium construction workshops</li>
          <li>🌿 Connection to the ancient botanical network</li>
          <li>📜 Guidance from experienced plant whisperers</li>
        </ul>
      </div>
      
      <!-- Rank Information -->
      <div class="bg-plum/10 border border-plum/30 rounded-lg p-4 text-center">
        <p class="text-sepia text-sm">
          You begin your journey as an <strong class="text-plum">${rankSystem[memberData.rank].title}</strong>
        </p>
        <p class="text-sepia text-xs italic mt-1">
          ${rankSystem[memberData.rank].description}
        </p>
      </div>
    </div>
    
    <!-- Enter Society Button -->
    <div class="text-center">
      <button id="enterSociety" class="px-8 py-3 bg-gradient-to-br from-moss to-forest-shadow text-cream border-2 border-moss rounded-lg hover:from-forest-shadow hover:to-moss transition-colors font-ui font-medium">
        🏛️ Enter the Society
      </button>
    </div>
  `;
  
  // Handle enter society button
  const enterButton = modal.querySelector('#enterSociety');
  enterButton.addEventListener('click', () => {
    // Close modal
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
    modal.remove();
    
    // Show member portal
    showMemberPortal();
  });
}

/**
 * Initiate a new member into the society
 */
function initiateNewMember() {
  showJoinDialog();
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
  // Update greeting with proper title
  const memberGreeting = document.querySelector('.member-greeting');
  if (memberGreeting) {
    const fullTitle = getFullTitle(memberData);
    memberGreeting.textContent = `Welcome back, ${fullTitle}`;
  }
  
  // Update initiation date
  const initiationDate = document.querySelector('.initiation-date');
  if (initiationDate) {
    const date = new Date(memberData.initiationDate);
    initiationDate.textContent = `Initiated: ${date.toLocaleDateString('en-ZA')}`;
  }
  
  // Update progress bar
  const progressFill = document.querySelector('.progress-fill');
  if (progressFill) {
    const progress = calculateMemberProgress(memberData);
    progressFill.style.width = `${progress}%`;
  }
  
  // Update progress markers with new rank titles
  updateProgressMarkers(memberData);
}

/**
 * Calculate member progress percentage
 */
function calculateMemberProgress(memberData) {
  const maxRank = 5;
  return (memberData.rank / maxRank) * 100;
}

/**
 * Update progress markers with current rank system
 */
function updateProgressMarkers(memberData) {
  const markers = document.querySelectorAll('.progress-markers .marker');
  markers.forEach((marker, index) => {
    const rankLevel = index + 1;
    const rank = rankSystem[rankLevel];
    
    if (rank) {
      marker.title = `${rank.title} - ${rank.description}`;
      
      // Update marker appearance based on current rank
      if (rankLevel <= memberData.rank) {
        marker.classList.add('active');
        marker.classList.remove('locked');
      } else {
        marker.classList.remove('active');
        marker.classList.add('locked');
      }
    }
  });
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
      appreciationDisplay.classList.add('animate-fade-in');
      appreciationDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Add mystical effects
      appreciateBtn.classList.add('mystical-glow');
      setTimeout(() => {
        appreciateBtn.classList.remove('mystical-glow');
      }, 3000);
      
      console.log('🔮 Mystical plant wisdom revealed');
    });
  }
  
  // Initialize card hover effects
  initializeCardHoverEffects();
}

/**
 * Initialize card hover effects - only for clickable cards
 */
function initializeCardHoverEffects() {
  // Only target cards that are clickable (have links, buttons, or click handlers)
  const clickableCards = document.querySelectorAll('.card.clickable, .card-clickable, .card:has(a), .card:has(button), .content-card:has(a), .content-card:has(button)');
  
  clickableCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Add floating animation to icons only for clickable cards
      const icon = this.querySelector('.section-icon, img[class*="icon"]');
      if (icon) {
        icon.classList.add('animate-floating');
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.section-icon, img[class*="icon"]');
      if (icon) {
        icon.classList.remove('animate-floating');
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
    document.body.className = `season-${season} ${document.body.className}`;
    
    // Add seasonal particle effects (optional)
    if (season === 'autumn') {
      addFallingLeaves();
    } else if (season === 'winter') {
      addMistEffect();
    }
  }
}

/**
 * Initialize tooltips for Latin plant names
 */
function initializeTooltips() {
  const latinNames = document.querySelectorAll('em');
  
  const tooltips = {
    'Bryum argenteum': 'Silver Moss - Hardy cosmopolitan species',
    'Ficus sycomorus': 'Sycamore Fig - Sacred tree of ancient peoples',
    'Strelitzia reginae': 'Bird of Paradise - Royal flower of the garden',
    'Cyathea dregei': 'Grassland Tree Fern - Ancient prehistoric survivor',
    'Custodes Arcana Viridis': 'Guardians of the Green Mysteries',
    'Custodiamus Mysterium Botanicum Durbanensis': 'We Guard the Botanical Mysteries of Durban'
  };
  
  latinNames.forEach(name => {
    const latinText = name.textContent.trim();
    if (tooltips[latinText] && !name.getAttribute('title')) {
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
    createFloatingSpores(header, 5);
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
function createFloatingSpores(container, count = 5) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const spore = document.createElement('div');
      spore.className = 'floating-spore absolute w-1 h-1 bg-moss rounded-full opacity-60 pointer-events-none animate-floating-spore';
      spore.style.cssText += `
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation-duration: ${5 + Math.random() * 5}s;
        animation-delay: ${Math.random() * 2}s;
      `;
      
      container.style.position = 'relative';
      container.appendChild(spore);
      
      // Remove after animation
      setTimeout(() => {
        if (spore.parentNode) {
          spore.parentNode.removeChild(spore);
        }
      }, 12000);
    }, i * 1000);
  }
}

/**
 * Add falling leaves effect for autumn
 */
function addFallingLeaves() {
  const leaves = ['🍂', '🍃', '🌿'];
  
  const createLeaf = () => {
    const leaf = document.createElement('div');
    leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
    leaf.className = 'fixed pointer-events-none z-10';
    leaf.style.cssText = `
      top: -50px;
      left: ${Math.random() * 100}%;
      font-size: ${Math.random() * 20 + 15}px;
      opacity: ${Math.random() * 0.7 + 0.3};
      animation: fall ${Math.random() * 3 + 2}s linear forwards;
    `;
    
    document.body.appendChild(leaf);
    
    setTimeout(() => {
      if (leaf.parentNode) {
        leaf.parentNode.removeChild(leaf);
      }
    }, 5000);
  };
  
  // Create a new leaf every 5 seconds
  setInterval(createLeaf, 5000);
}

/**
 * Add mist effect for winter
 */
function addMistEffect() {
  const mist = document.createElement('div');
  mist.className = 'fixed inset-0 pointer-events-none z-10';
  mist.style.cssText = `
    background: radial-gradient(circle, transparent 0%, rgba(107, 123, 140, 0.05) 100%);
    animation: mistMovement 20s ease-in-out infinite;
  `;
  
  document.body.appendChild(mist);
}

// Utility functions for debugging
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
  },
  triggerMysticalEffects: () => {
    addMysticalEffects();
    console.log('✨ Mystical effects triggered');
  },
  getCurrentSeason: () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'autumn';
    if (month >= 6 && month <= 8) return 'winter';
    if (month >= 9 && month <= 11) return 'spring';
    return 'summer';
  }
};

console.log('🔮 Mystical debugging tools available at window.DHC_Debug');

// Make functions available globally for other components
window.generateMysticalName = generateMysticalName;
window.nameGenerator = nameGenerator;

// Add CSS for dynamic animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
    }
  }
  
  @keyframes mistMovement {
    0%, 100% { opacity: 0.05; }
    50% { opacity: 0.1; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
  
  .join-dialog {
    backdrop-filter: blur(2px);
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  
  .join-form {
    animation: fadeIn 0.4s ease-out;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    margin: auto;
    position: relative;
  }
  
  .join-form select, .join-form input[type="checkbox"] {
    transition: all 0.3s ease;
  }
  
  .join-form select:focus {
    border-color: #4a5d23;
    box-shadow: 0 0 0 3px rgba(74, 93, 35, 0.2);
    outline: none;
  }
  
  .modal-backdrop {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    height: 100% !important;
    width: 100% !important;
    background: rgba(49, 46, 42, 0.9) !important;
    z-index: 999999 !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    box-sizing: border-box !important;
  }
  
  .modal-content {
    position: absolute !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    background: white !important;
    border: 4px solid #8B7355 !important;
    border-radius: 8px !important;
    padding: 32px !important;
    max-width: 600px !important;
    width: 90% !important;
    max-height: 80vh !important;
    overflow-y: auto !important;
    box-shadow: 0 25px 50px rgba(0,0,0,0.5) !important;
    margin: 0 !important;
    box-sizing: border-box !important;
    z-index: 1000000 !important;
  }
`;
document.head.appendChild(dynamicStyles);