import { defineCollection, z } from 'astro:content';

// Seasonal Almanac Collection
const almanacCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    season: z.enum(['spring', 'summer', 'autumn', 'winter']),
    week: z.number().min(1).max(53),
    tags: z.array(z.string()),
    weather_dependent: z.boolean().default(true),
    moon_phase: z.string().optional(),
    featured_plants: z.array(z.string()).optional(),
    difficulty: z.enum(['initiate', 'procurer', 'archivist', 'keeper', 'master']).default('initiate'),
    image: z.string().optional(),
    featured_plant_image: z.string().optional(),
    featured_plant_name: z.string().optional(),
    featured_plant_scientific: z.string().optional(),
    featured_plant_description: z.string().optional(),
    featured_plant_properties: z.array(z.string()).optional(),
  })
});

// Club Lore Collection  
const loreCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    era: z.enum(['founding', 'victorian', 'modern', 'contemporary']),
    category: z.enum(['historical', 'mystical', 'botanical', 'ceremonial']),
    secret_level: z.number().min(0).max(5).default(0),
    characters: z.array(z.string()).optional(),
    locations: z.array(z.string()).optional(),
    plants_mentioned: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  })
});

// Gatherings Collection
const gatheringsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    location: z.string(),
    attendees: z.number().min(1),
    activities: z.array(z.string()),
    weather: z.string().optional(),
    specimens_collected: z.array(z.string()).optional(),
    rituals_performed: z.array(z.string()).optional(),
    images: z.array(
      z.object({   // New format: object with metadata
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional()
        })
      ).optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }).optional(),
    featured: z.boolean().default(false),
    member_reflections: z.array(z.object({
      author: z.string(),
      rank: z.string(),
      reflection: z.string()
    })).optional(),
  })
});

// Events Collection (for calendar integration)
const eventsCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    date: z.date(),
    end_date: z.date().optional(),
    location: z.string(),
    source: z.enum(['club', 'external', 'ritual']),
    category: z.enum(['workshop', 'exhibition', 'ritual', 'gathering', 'appreciation']),
    description: z.string(),
    external_url: z.string().url().optional(),
    society_relevance: z.enum(['high', 'medium', 'low']).default('medium'),
    cost: z.string().optional(),
    registration_required: z.boolean().default(false),
    member_only: z.boolean().default(false),
    featured: z.boolean().default(false),
    image: z.string().optional(),
  })
});

// Member Observations Collection
const observationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.object({
      name: z.string(),
      rank: z.enum(['initiate', 'procurer', 'archivist', 'keeper', 'master']),
      specialty: z.string().optional()
    }),
    category: z.enum(['propagation', 'terrarium', 'field-study', 'ritual', 'specimen-care', 'mycology', 'foraging']),
    plants_mentioned: z.array(z.string()),
    difficulty: z.enum(['initiate', 'procurer', 'archivist', 'keeper', 'master']).default('initiate'),
    success_rate: z.enum(['mystical', 'exceptional', 'promising', 'learning', 'experimental']).optional(),
    location: z.string().optional(),
    materials: z.array(z.string()).optional(),
    conditions: z.object({
      temperature: z.string().optional(),
      humidity: z.string().optional(),
      lighting: z.string().optional(),
      moon_phase: z.string().optional()
    }).optional(),
    images: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    experimental: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  })
});

// Nursery Directory Collection
const nurseriesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    location: z.object({
      address: z.string(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number()
      }),
      area: z.string()
    }),
    contact: z.object({
      website: z.string().url().optional(),
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional(), 
      phone: z.string().optional(),
      email: z.string().email().optional()
    }),
    specialties: z.array(z.string()),
    description: z.string(),
    opening_hours: z.object({
      monday: z.string().optional(),
      tuesday: z.string().optional(),
      wednesday: z.string().optional(),
      thursday: z.string().optional(),
      friday: z.string().optional(),
      saturday: z.string().optional(),
      sunday: z.string().optional(),
    }).optional(),
    society_recommended: z.boolean().default(false),
    mystical_rating: z.number().min(1).max(5).default(3),
    last_visited: z.date().optional(),
    images: z.array(z.string()).optional(),
  })
});

export const collections = {
  almanac: almanacCollection,
  lore: loreCollection,
  gatherings: gatheringsCollection,
  events: eventsCollection,
  observations: observationsCollection,
  nurseries: nurseriesCollection,
};