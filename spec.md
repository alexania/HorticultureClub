# 🌿 Durban Horticulture Club - Developer Specification

## Project Overview
A Victorian Dark Academia-themed website for a roleplaying horticultural secret society based in Durban, South Africa. The site combines practical gardening information with theatrical immersion, featuring fictional club lore, member progression systems, and locally-focused content.

## Technical Architecture

### Core Technology Stack
- **Frontend Framework:** Astro 4.x
- **Content Management:** Markdown files with YAML frontmatter
- **Styling:** Tailwind CSS with custom Victorian-themed components
- **Scripting:** Node.js for data fetching and automation
- **Deployment:** Vercel or Netlify with GitHub integration
- **Authentication:** Browser localStorage/sessionStorage (no external services)
- **Image Handling:** Astro's built-in asset optimization

### Project Structure
```
/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── AlmanacCard.astro
│   │   ├── NurseryDirectory.astro
│   │   ├── MembershipBadge.astro
│   │   └── SeasonalForecast.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ContentLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── almanac/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── lore/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── gatherings/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── nurseries.astro
│   │   ├── events.astro
│   │   └── membership.astro
│   ├── scripts/
│   │   ├── weather-fetcher.js
│   │   ├── event-scraper.js
│   │   └── member-utils.js
│   └── styles/
│       └── global.css
├── content/
│   ├── almanac/
│   ├── lore/
│   ├── gatherings/
│   └── config.ts
├── public/
│   ├── images/
│   └── icons/
└── scripts/
    └── build-data.js
```

## Content Management System

### Markdown Content Structure
All content uses Markdown with YAML frontmatter:

#### Seasonal Almanac (`/content/almanac/`)
```yaml
---
title: "Week 1 of September - Spring Awakening"
date: "2025-09-01"
season: "spring"
week: 1
tags: ["planting", "pruning", "pest-control"]
weather_dependent: true
---

This week in the Durban gardens, as the soil warms and the ancient mycorrhizal networks stir...
```

#### Club Lore (`/content/lore/`)
```yaml
---
title: "The Great Moss Expedition of 1887"
date: "1887-04-15"
era: "founding"
category: "historical"
secret_level: 2
---

It was during the unseasonably humid April of 1887 that our founding members...
```

#### Gatherings (`/content/gatherings/`)
```yaml
---
title: "Autumn Spore Collection Soirée"
date: "2025-04-20"
location: "Umbilo River Greenway"
attendees: 12
activities: ["spore collection", "terrarium building", "ritual appreciation"]
weather: "overcast, perfect humidity"
images: ["group-photo.jpg", "rare-moss-specimen.jpg"]
---

Under the watchful eyes of the river figs, our society gathered...
```

### Data Files
#### Nursery Directory (`/src/data/nurseries.json`)
```json
{
  "nurseries": [
    {
      "id": "earth-angels",
      "name": "Earth Angels Garden Nursery",
      "location": {
        "address": "123 Example Road, Durban",
        "coordinates": [-29.8587, 31.0218]
      },
      "contact": {
        "website": "https://example.com",
        "facebook": "https://facebook.com/earthangels",
        "phone": "+27 31 123 4567"
      },
      "specialties": ["indigenous plants", "medicinal herbs", "rare succulents"],
      "description": "Purveyor of mystical flora since 1995"
    }
  ]
}
```

## Feature Specifications

### 1. Seasonal Almanac System
**Requirements:**
- Weekly gardening tasks specific to Durban's subtropical climate
- Integration with South African Weather Service data
- Moon phase calculations for planting guidance
- Responsive seasonal layouts

**Implementation:**
```javascript
// /src/scripts/weather-fetcher.js
export async function fetchWeatherData() {
  try {
    const response = await fetch('https://www.weathersa.co.za/api/forecast/durban');
    const data = await response.json();
    return {
      forecast: data.forecast,
      rainfall: data.rainfall,
      humidity: data.humidity,
      whimsicalInterpretation: generateWhimsicalForecast(data)
    };
  } catch (error) {
    console.error('Weather fetch failed:', error);
    return getFallbackWeatherData();
  }
}

function generateWhimsicalForecast(weatherData) {
  // Logic to interpret weather data through Victorian mystical lens
  const interpretations = {
    high_humidity: "The spirits of the greenhouse are particularly active",
    rain: "The ancient water rituals have been answered",
    drought: "A time for deep root meditation"
  };
  // Return appropriate interpretation
}
```

### 2. Membership & Progression System
**Requirements:**
- localStorage-based member tracking
- Progressive disclosure of society secrets
- Digital badge collection system
- Ritual completion tracking

**Member Data Structure:**
```javascript
const memberData = {
  initiation_date: "2025-08-26",
  current_rank: "Moss Procurer",
  badges: ["First Spore", "Humidity Master", "Fern Whisperer"],
  rituals_completed: [
    {
      name: "Dawn Watering Ceremony",
      completed: "2025-08-20",
      location: "home_garden"
    }
  ],
  secret_level: 2, // Determines what lore content is visible
  gathering_attendance: 3
};
```

**Rank Progression:**
1. Initiate Cultivator (Level 0)
2. Moss Procurer (Level 1) 
3. Fern Archivist (Level 2)
4. Humidity Keeper (Level 3)
5. Master of the Mycorrhizal Network (Level 4)

### 3. Event Calendar Integration
**External Data Sources:**
- Durban Botanic Gardens events API
- AllEvents.in scraping (via Puppeteer)
- Manual event additions

**Event Data Schema:**
```javascript
const eventSchema = {
  title: "String",
  date: "ISO Date",
  location: "String", 
  source: "external|club|ritual",
  category: "workshop|exhibition|ritual|appreciation",
  description: "String",
  external_url: "URL|null",
  society_relevance: "high|medium|low"
};
```

### 4. Plant Shop Directory
**Features:**
- Interactive map using Leaflet.js
- Filter by specialty (indigenous, succulents, etc.)
- Integration with Google Maps for directions
- Community reviews (future enhancement)

### 5. Whimsical Weather Integration
**Implementation:**
- Fetch real data from weathersa.co.za
- Apply Victorian mystical interpretations
- Generate "Seasonal Mood" forecasts
- Moon phase integration for planting advice

## Design System

### Typography
```css
:root {
  --font-heading: 'Cormorant Garamond', serif;
  --font-secondary: 'Playfair Display', serif;
  --font-body: 'Lora', serif;
  --font-ui: 'Raleway', sans-serif;
}
```

### Color Palette
```css
:root {
  --color-parchment: #f4f1e8;
  --color-moss: #6b7c32;
  --color-plum: #5d2e5d;
  --color-rust: #a0522d;
  --color-brass: #b5651d;
  --color-charcoal: #2c2c2c;
  --color-sepia: #704214;
  --color-botanical-ink: rgba(107, 124, 50, 0.1);
}
```

### Component Styling
- Victorian botanical borders and flourishes
- Wax seal icons and decorative elements
- Hover effects with botanical ink wash
- Accordion-style collapsible sections
- Terrarium silhouettes as visual elements

## Error Handling & Resilience

### Weather API Failures
```javascript
function getFallbackWeatherData() {
  return {
    forecast: "The ancient spirits guard their meteorological secrets today",
    rainfall: "Consult the humidity crystals in your terrarium",
    whimsicalInterpretation: "A perfect day for indoor plant meditation"
  };
}
```

### Content Loading Errors
- Graceful degradation for missing images
- Fallback content for failed API calls  
- Progressive enhancement for JavaScript features
- Offline-friendly static content

### Member Data Corruption
```javascript
function validateMemberData(data) {
  const defaults = {
    initiation_date: new Date().toISOString(),
    current_rank: "Initiate Cultivator",
    badges: [],
    rituals_completed: [],
    secret_level: 0,
    gathering_attendance: 0
  };
  
  return { ...defaults, ...data };
}
```

## Performance Requirements

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Optimization Strategies
- Astro's zero-JS by default approach
- Image optimization with Astro assets
- Critical CSS inlining
- Lazy loading for non-critical content
- Service worker for offline functionality

## Security Considerations

### Data Protection
- No sensitive user data stored
- localStorage data is non-critical and recoverable
- No authentication tokens or passwords
- HTTPS enforcement via hosting platform

### Content Security
- Sanitize any user-generated content (future feature)
- Validate external API responses
- Rate limiting for API calls

## Testing Strategy

### Unit Testing
```javascript
// Example test structure
describe('Weather Integration', () => {
  test('should generate whimsical forecast from weather data', () => {
    const weatherData = { humidity: 85, rainfall: 12 };
    const forecast = generateWhimsicalForecast(weatherData);
    expect(forecast).toContain('spirits of the greenhouse');
  });
});
```

### Integration Testing
- Test weather API integration with mock responses
- Validate member progression system
- Test content collection and rendering
- Verify build process with sample content

### End-to-End Testing
Using Playwright:
- Member journey from initiation to first badge
- Content navigation and progressive disclosure
- Mobile responsiveness across devices
- Performance testing on various network conditions

### Manual Testing Checklist
- [ ] All mystical UI elements render correctly
- [ ] Member progression unlocks appropriate content
- [ ] Weather integration displays gracefully
- [ ] Event calendar updates properly
- [ ] Nursery directory map functions
- [ ] Responsive design works on mobile/tablet
- [ ] Performance meets targets
- [ ] SEO meta tags are present

## Deployment Configuration

### Build Process
```json
{
  "scripts": {
    "build": "npm run fetch-data && astro build",
    "fetch-data": "node scripts/weather-fetcher.js && node scripts/event-scraper.js",
    "dev": "astro dev",
    "test": "vitest"
  }
}
```

### Environment Variables
```bash
# .env
WEATHER_API_KEY=your_weather_service_key
MAPS_API_KEY=your_google_maps_key
NODE_ENV=production
```

### Continuous Deployment
- GitHub Actions workflow for automated builds
- Daily cron job for weather/event data updates
- Automated testing on pull requests
- Performance monitoring integration

## Future Enhancements

### Phase 2 Features
- Member photo galleries from gatherings
- Plant identification quiz system
- Seasonal ritual calendar with notifications
- Integration with local nursery inventory APIs
- Advanced weather correlations with garden success

### Phase 3 Features
- Community forums (maintaining Victorian aesthetic)
- Virtual terrarium builder tool
- Augmented reality plant identification
- Integration with botanical garden membership systems

## Development Timeline

### Week 1-2: Foundation
- Astro project setup with Tailwind
- Basic layout and navigation
- Content structure implementation
- Core styling system

### Week 3-4: Content Systems
- Markdown content integration
- Member progression logic
- Weather API integration
- Basic membership features

### Week 5-6: Polish & Testing
- Visual design refinement
- Performance optimization
- Testing implementation
- Deployment setup

## Success Metrics
- Page load times under performance targets
- Member progression engagement rates
- Content consumption patterns
- Mobile usage statistics
- Weather forecast accuracy correlations

## Implementation Updates

### Recent Changes
**Layout & Design:**
- Container width expanded to 1920px for improved screen utilization
- Removed decorative header frame element (simplified header design)
- Completed asset organization into structured folder hierarchy

**Asset Management:**
- Reorganized 39+ existing assets into proper `/images/` folder structure
- Updated all HTML and CSS file paths to match new organization
- Added missing sunshine.png weather graphic for complete weather set

**Current Status:**
- ✅ Core functionality assets complete (brand, navigation, weather, heroes)
- ⚠️ Member progression system requires 5 rank badges for full functionality  
- ⚠️ Nursery directory requires 4 map markers for interactive features
- 🎨 All decorative elements can be achieved with CSS as needed

**Next Priority:**
1. Member rank badges (critical for progression system)
2. Nursery map markers (essential for directory functionality)
3. Ritual symbols (enhances achievement tracking)

---

*"In the spirit of the Victorian botanists who documented the mysteries of the plant kingdom, this specification serves as your field guide to the digital realm of the Durban Horticulture Club. May your code grow as verdant as the ferns in the Natal forests."*

**🌿 End of Specification**