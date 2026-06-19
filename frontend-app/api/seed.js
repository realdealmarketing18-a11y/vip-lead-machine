// api/seed.js — Initial city data for MongoDB seeding
export const SEED_PAGES = [
  {
    slug: 'newport-beach',
    city: 'Newport Beach',
    state: 'CA',
    region: 'Orange County Coast',
    published: true,
    communities: ['Pelican Hill', 'Big Canyon', 'Harbor Ridge', 'Balboa Island'],
    priceExt: '$5.50/sqft',
    priceInt: '$4.50/sqft',
    seo: {
      title: 'House Painting Newport Beach, CA | VIP Premier Painting | VIP Home Painting',
      description: 'VIP Premier Painting serves Newport Beach homeowners with premium exterior & interior painting. Free custom color visualization. Licensed & insured. Call (909) 312-5400.',
      keywords: 'painting contractor Newport Beach, house painting Newport Beach CA, exterior painting Newport Beach, interior painters Newport Beach, Pelican Hill painting',
      h1: 'Newport Beach Home Painting — Free Custom Color Consultation',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'VIP Premier Painting — Newport Beach',
        'description': 'Premium residential painting services in Newport Beach, CA.',
        'telephone': '(909) 312-5400',
        'url': 'https://viphomepainting.com',
        'areaServed': 'Newport Beach, CA',
        'priceRange': '$$$',
        'image': 'https://viphomepainting.com/assets/logos/vip-logo-primary.png'
      }
    },
    maps: {
      lat: 33.6189,
      lng: -117.9289,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26510.97!2d-117.9289!3d33.6189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dce7284d872b55%3A0x4a18d7e94d3ba5a6!2sNewport%20Beach%2C%20CA!5e0!3m2!1sen!2sus!4v1699000000000',
      serviceRadius: '10 miles',
      landmarks: ['Fashion Island', 'Balboa Peninsula', 'Corona del Mar', 'Crystal Cove State Park'],
      napAddress: 'Serving Newport Beach, CA 92657',
      napPhone: '(909) 312-5400'
    },
    hero: {
      overline: 'Newport Beach Customized Home Painting Services',
      clientName: 'The Gallagher Family',
      clientNeighborhood: 'Pelican Hill',
      heroCaption: 'From Drab to Fab in 5 Days · Pelican Hill'
    },
    faqs: [
      { q: 'How much does exterior painting cost in Newport Beach?', a: 'VIP Premier Painting charges $5.50/sqft for exterior painting in Newport Beach. A typical 2,500 sqft Newport Beach home exterior runs $10,000–$18,000 depending on prep, trim, and number of colors.' },
      { q: 'Do you serve Pelican Hill and Big Canyon in Newport Beach?', a: 'Yes — we serve all of Newport Beach including Pelican Hill, Big Canyon, Harbor Ridge, Balboa Island, Newport Coast, and Corona del Mar.' },
      { q: 'What paints do you use for Newport Beach coastal homes?', a: 'We exclusively use Sherwin-Williams Emerald Exterior with a 10-year fade and mildew resistance guarantee — ideal for Newport Beach\'s marine-layer coastal climate.' },
      { q: 'How long does a full exterior repaint take in Newport Beach?', a: 'Most Newport Beach homes are completed in 3–5 days. We work by appointment, protect all landscaping and hardscape, and deliver a spotless site before we leave.' }
    ],
    videos: { tofu: '', mofu: '', bofu: '' },
    seoBlock: 'VIP Premier Painting provides concierge-level residential painting services to Newport Beach\'s most prestigious communities — Pelican Hill, Big Canyon, Harbor Ridge, and Balboa Island. Newport Beach homeowners trust VIP Premier Painting for painting results worthy of their investment. Our Newport Beach painting crews work by appointment, with full property protection protocols, and deliver a spotless site before we leave.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    slug: 'newport-coast',
    city: 'Newport Coast',
    state: 'CA',
    region: 'Orange County Coast',
    published: true,
    communities: ['Crystal Cove', 'Pelican Crest', 'Pelican Ridge', 'Newport Ridge'],
    priceExt: '$5.50/sqft',
    priceInt: '$4.50/sqft',
    seo: {
      title: 'House Painting Newport Coast, CA | VIP Premier Painting | VIP Home Painting',
      description: 'VIP Premier Painting serves Newport Coast homeowners with premium exterior & interior painting. Free custom color visualization. Licensed & insured. Call (909) 312-5400.',
      keywords: 'painting contractor Newport Coast, house painting Newport Coast CA, exterior painting Newport Coast, interior painters Newport Coast, Crystal Cove painting',
      h1: 'Newport Coast Home Painting — Free Custom Color Consultation',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'VIP Premier Painting — Newport Coast',
        'telephone': '(909) 312-5400',
        'url': 'https://viphomepainting.com',
        'areaServed': 'Newport Coast, CA'
      }
    },
    maps: {
      lat: 33.5977,
      lng: -117.8664,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13254.87!2d-117.8664!3d33.5977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dce7e4c3f01c3b%3A0x1234567890abcdef!2sNewport%20Coast%2C%20CA!5e0!3m2!1sen!2sus!4v1699000000001',
      serviceRadius: '10 miles',
      landmarks: ['Crystal Cove State Park', 'Pelican Hill Golf Club', 'Fashion Island', 'Corona del Mar'],
      napAddress: 'Serving Newport Coast, CA 92657',
      napPhone: '(909) 312-5400'
    },
    hero: {
      overline: 'Newport Coast Customized Home Painting Services',
      clientName: 'The Ashworth Family',
      clientNeighborhood: 'Crystal Cove',
      heroCaption: 'A Crystal Cove Estate Reimagined'
    },
    faqs: [
      { q: 'Do you paint homes in Crystal Cove Newport Coast?', a: 'Yes — Crystal Cove and all of Newport Coast\'s gated communities including Pelican Crest, Pelican Ridge, and Newport Ridge.' },
      { q: 'What paint do you use for Mediterranean-style homes in Newport Coast?', a: 'We use Sherwin-Williams Emerald Exterior — ideal for Newport Coast\'s Mediterranean-style architecture with stucco, wood accents, and tile rooflines.' }
    ],
    videos: { tofu: '', mofu: '', bofu: '' },
    seoBlock: 'VIP Premier Painting provides concierge-level residential painting services to Newport Coast\'s most prestigious gated communities — Crystal Cove, Pelican Crest, Pelican Ridge, and Newport Ridge.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    slug: 'irvine',
    city: 'Irvine',
    state: 'CA',
    region: 'Orange County',
    published: true,
    communities: ['Shady Canyon', 'Turtle Ridge', 'Orchard Hills', 'Northwood Pointe'],
    priceExt: '$4.75/sqft',
    priceInt: '$3.95/sqft',
    seo: {
      title: 'House Painting Irvine, CA | VIP Premier Painting | VIP Home Painting',
      description: 'VIP Premier Painting serves Irvine homeowners with premium exterior & interior painting. Free custom color visualization. Licensed & insured. Call (909) 312-5400.',
      keywords: 'painting contractor Irvine, house painting Irvine CA, exterior painting Irvine, interior painters Irvine, Shady Canyon painting',
      h1: 'Irvine Home Painting — Free Custom Color Consultation',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'VIP Premier Painting — Irvine',
        'telephone': '(909) 312-5400',
        'url': 'https://viphomepainting.com',
        'areaServed': 'Irvine, CA'
      }
    },
    maps: {
      lat: 33.6846,
      lng: -117.8265,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26508.18!2d-117.8265!3d33.6846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dce94bef975a65%3A0xc4a9e0948d9de8a6!2sIrvine%2C%20CA!5e0!3m2!1sen!2sus!4v1699000000002',
      serviceRadius: '12 miles',
      landmarks: ['Irvine Spectrum Center', 'UCI Campus', 'Great Park Irvine', 'Shady Canyon Golf'],
      napAddress: 'Serving Irvine, CA 92602',
      napPhone: '(909) 312-5400'
    },
    hero: {
      overline: 'Irvine Customized Home Painting Services',
      clientName: 'The Nakamura Family',
      clientNeighborhood: 'Shady Canyon',
      heroCaption: 'A Shady Canyon Estate Transformed in 5 Days'
    },
    faqs: [
      { q: 'Do you paint Shady Canyon homes in Irvine?', a: 'Yes — Shady Canyon, Turtle Ridge, Orchard Hills, and all of Irvine\'s master-planned communities. We are familiar with HOA color approval processes.' },
      { q: 'What are your exterior painting prices in Irvine?', a: 'VIP Premier Painting charges $4.75/sqft for exterior painting in Irvine. Most Irvine home exteriors run $8,000–$16,000 depending on size and prep.' }
    ],
    videos: { tofu: '', mofu: '', bofu: '' },
    seoBlock: 'VIP Premier Painting provides concierge-level residential painting services to Irvine\'s most prestigious communities — Shady Canyon, Turtle Ridge, Orchard Hills, and Northwood Pointe.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    slug: 'coto-de-caza',
    city: 'Coto de Caza',
    state: 'CA',
    region: 'Orange County',
    published: true,
    communities: ['Golf & Racquet Club', 'The Summit', 'The Village'],
    priceExt: '$5.50/sqft',
    priceInt: '$4.50/sqft',
    seo: {
      title: 'House Painting Coto de Caza, CA | VIP Premier Painting | VIP Home Painting',
      description: 'VIP Premier Painting serves Coto de Caza homeowners with premium exterior & interior painting. Free custom color visualization. Licensed & insured. Call (909) 312-5400.',
      keywords: 'painting contractor Coto de Caza, house painting Coto de Caza CA, exterior painting Coto de Caza, interior painters Coto de Caza',
      h1: 'Coto de Caza Home Painting — Free Custom Color Consultation',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'VIP Premier Painting — Coto de Caza',
        'telephone': '(909) 312-5400',
        'url': 'https://viphomepainting.com',
        'areaServed': 'Coto de Caza, CA'
      }
    },
    maps: {
      lat: 33.5966,
      lng: -117.5886,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13254.31!2d-117.5886!3d33.5966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dce5d0b6c8ad4b%3A0xabcdef1234567890!2sCoto%20de%20Caza%2C%20CA!5e0!3m2!1sen!2sus!4v1699000000003',
      serviceRadius: '15 miles',
      landmarks: ['Coto de Caza Golf & Racquet Club', 'The Summit at Coto', 'Trabuco Canyon', 'Mission Viejo Lake'],
      napAddress: 'Serving Coto de Caza, CA 92679',
      napPhone: '(909) 312-5400'
    },
    hero: {
      overline: 'Coto de Caza Customized Home Painting Services',
      clientName: 'The Harrison Family',
      clientNeighborhood: 'The Summit',
      heroCaption: 'A Coto de Caza Estate Reimagined'
    },
    faqs: [
      { q: 'Do you paint gated estates in Coto de Caza?', a: 'Yes — we serve all gated areas of Coto de Caza including the Golf & Racquet Club, The Summit, and The Village. We coordinate gate access and work by appointment.' },
      { q: 'Do you handle HOA color approvals in Coto de Caza?', a: 'We help guide your color selection to meet Coto de Caza HOA guidelines and can advise on approved palettes for your specific community.' }
    ],
    videos: { tofu: '', mofu: '', bofu: '' },
    seoBlock: 'VIP Premier Painting provides concierge-level residential painting services to Coto de Caza\'s most prestigious gated estates within the Golf & Racquet Club, The Summit, and The Village communities.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    slug: 'ladera-ranch',
    city: 'Ladera Ranch',
    state: 'CA',
    region: 'Orange County',
    published: true,
    communities: ['Covenant Hills', 'Flintridge', 'Terramor', 'Avendale Village'],
    priceExt: '$4.75/sqft',
    priceInt: '$3.95/sqft',
    seo: {
      title: 'House Painting Ladera Ranch, CA | VIP Premier Painting | VIP Home Painting',
      description: 'VIP Premier Painting serves Ladera Ranch homeowners with premium exterior & interior painting. Free custom color visualization. Licensed & insured. Call (909) 312-5400.',
      keywords: 'painting contractor Ladera Ranch, house painting Ladera Ranch CA, exterior painting Ladera Ranch, interior painters Ladera Ranch, Covenant Hills painting',
      h1: 'Ladera Ranch Home Painting — Free Custom Color Consultation',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'VIP Premier Painting — Ladera Ranch',
        'telephone': '(909) 312-5400',
        'url': 'https://viphomepainting.com',
        'areaServed': 'Ladera Ranch, CA'
      }
    },
    maps: {
      lat: 33.5350,
      lng: -117.6340,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13254.18!2d-117.6340!3d33.5350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dce60d03a17f7f%3A0x1234abcd5678ef90!2sLadera%20Ranch%2C%20CA!5e0!3m2!1sen!2sus!4v1699000000004',
      serviceRadius: '12 miles',
      landmarks: ['Covenant Hills Gate', 'Ladera Ranch Town Green', 'Aliso Viejo', 'Mission Viejo'],
      napAddress: 'Serving Ladera Ranch, CA 92694',
      napPhone: '(909) 312-5400'
    },
    hero: {
      overline: 'Ladera Ranch Customized Home Painting Services',
      clientName: 'The Whitfield Family',
      clientNeighborhood: 'Covenant Hills',
      heroCaption: 'A Covenant Hills Estate Transformed'
    },
    faqs: [
      { q: 'Do you serve Covenant Hills in Ladera Ranch?', a: 'Yes — Covenant Hills, Terramor, Flintridge, and all of Ladera Ranch. We are experienced with Ladera Ranch HOA color palettes.' },
      { q: 'What is the cost to paint a home in Ladera Ranch?', a: 'We charge $4.75/sqft for exterior painting in Ladera Ranch. A typical 2,800 sqft exterior runs $9,500–$16,000 including prep, prime, and two-coat finish.' }
    ],
    videos: { tofu: '', mofu: '', bofu: '' },
    seoBlock: 'VIP Premier Painting provides concierge-level residential painting services to Ladera Ranch\'s most sought-after communities — Covenant Hills, Flintridge, Terramor, and Avendale Village.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    slug: 'hidden-hills',
    city: 'Hidden Hills',
    state: 'CA',
    region: 'Los Angeles County',
    published: true,
    communities: ['Hidden Hills Estates', 'Equestrian Estates'],
    priceExt: '$5.50/sqft',
    priceInt: '$4.50/sqft',
    seo: {
      title: 'House Painting Hidden Hills, CA | VIP Premier Painting | VIP Home Painting',
      description: 'VIP Premier Painting serves Hidden Hills homeowners with premium exterior & interior painting. Free custom color visualization. Licensed & insured. Call (909) 312-5400.',
      keywords: 'painting contractor Hidden Hills, house painting Hidden Hills CA, exterior painting Hidden Hills, interior painters Hidden Hills, luxury estate painting Hidden Hills',
      h1: 'Hidden Hills Home Painting — Free Custom Color Consultation',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'VIP Premier Painting — Hidden Hills',
        'telephone': '(909) 312-5400',
        'url': 'https://viphomepainting.com',
        'areaServed': 'Hidden Hills, CA'
      }
    },
    maps: {
      lat: 34.1658,
      lng: -118.6618,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13223.45!2d-118.6618!3d34.1658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c29b0cfe5df83b%3A0xabcd1234efgh5678!2sHidden%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1699000000005',
      serviceRadius: '20 miles',
      landmarks: ['Calabasas Commons', 'Malibu Creek State Park', 'The Commons at Calabasas', 'Westlake Village'],
      napAddress: 'Serving Hidden Hills, CA 91302',
      napPhone: '(909) 312-5400'
    },
    hero: {
      overline: 'Hidden Hills Customized Home Painting Services',
      clientName: 'The Caldwell Family',
      clientNeighborhood: 'Hidden Hills Estate',
      heroCaption: 'A Hidden Hills Estate Masterpiece'
    },
    faqs: [
      { q: 'Do you paint luxury estates in Hidden Hills?', a: 'Yes — Hidden Hills is one of our specialty markets. We serve the gated community\'s equestrian estates, ranch-style homes, and custom luxury properties.' },
      { q: 'Can you match HOA color requirements in Hidden Hills?', a: 'Absolutely. We work with the Hidden Hills Community Association color palette and can advise on approved exterior schemes for your property.' }
    ],
    videos: { tofu: '', mofu: '', bofu: '' },
    seoBlock: 'VIP Premier Painting provides concierge-level residential painting services to Hidden Hills\' most prestigious gated estates and equestrian properties throughout this exclusive Los Angeles County enclave.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
