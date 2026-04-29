/**
 * ============================================================
 *  VIP PREMIER PAINTING — City Page Generator
 *  Version 1.0 | Generates one city sales page per run
 * ============================================================
 *
 *  HOW TO USE:
 *  1. Place this file anywhere on your computer
 *  2. Also place VIP_SalesPage_Master_Template.html in the same folder
 *  3. Install Node.js if you haven't: https://nodejs.org
 *  4. Run: node VIP_CityPage_Generator.js
 *  5. Find the output HTML file in the same folder
 *  6. Open it in your browser → copy sections into Elementor
 *
 *  AUTOMATION:
 *  Claude's scheduled task runs this automatically each morning.
 *  You'll find the output waiting for you when you start work.
 * ============================================================
 */

const fs = require('fs');
const path = require('path');

// ============================================================
//  CITY DATABASE — All 9 Communities + Their Data
// ============================================================
const CITY_DATA = [
  {
    id: 'the-bridges-rancho-cucamonga',
    city: 'Rancho Cucamonga',
    community: 'The Bridges',
    state: 'CA',
    region: 'Inland Empire',
    zip: '91730',
    slug: 'house-painting-rancho-cucamonga-ca',
    pricePerSqft: '$3.25',
    tier: 1,
    homeValues: '$2M–$5M',
    homeownerProfiles: [
      { name: 'The Martinez Family', area: 'The Bridges' },
      { name: 'The Johnson Residence', area: 'Eagle Glen' },
      { name: 'Robert & Lisa Chen', area: 'Rancho Cucamonga' }
    ],
    seoIntro: 'Looking for a trusted painting contractor in Rancho Cucamonga, CA? VIP Premier Painting serves homeowners throughout Rancho Cucamonga, The Bridges, and the surrounding Inland Empire with premium exterior and interior painting services.',
    seoBody: `Rancho Cucamonga homeowners trust VIP Premier Painting for professional exterior house painting, interior painting, and custom color visualization services. Our team serves all neighborhoods including The Bridges, Terra Vista, Etiwanda, and the Victoria Park area.\n\nAs a licensed and insured painting contractor serving Rancho Cucamonga CA, we specialize in Mediterranean-style and Spanish Colonial architecture common to upscale communities in the 91730 and 91739 zip codes. We use Sherwin-Williams Emerald and Duration exterior paints rated for the Inland Empire's hot, dry climate.\n\nServices we provide in Rancho Cucamonga include: exterior house painting, interior painting, cabinet refinishing, garage floor coating, wood staining, HOA-approved color selection, and our exclusive free AI color visualization service — where you see your home transformed before a single brushstroke.\n\nCall (909) 312-5400 or use the form above to schedule your free Rancho Cucamonga painting consultation today.`
  },
  {
    id: 'covenant-hills-ladera-ranch',
    city: 'Ladera Ranch',
    community: 'Covenant Hills',
    state: 'CA',
    region: 'South Orange County',
    zip: '92694',
    slug: 'exterior-painting-ladera-ranch-ca',
    pricePerSqft: '$4.25',
    tier: 1,
    homeValues: '$2M–$6M',
    homeownerProfiles: [
      { name: 'The Williams Family', area: 'Covenant Hills' },
      { name: 'The Anderson Residence', area: 'Ladera Ranch' },
      { name: 'Michael & Sarah Torres', area: 'South Orange County' }
    ],
    seoIntro: 'VIP Premier Painting serves Ladera Ranch and Covenant Hills homeowners with premium painting services tailored to South Orange County\'s luxury residential communities.',
    seoBody: `Ladera Ranch homeowners rely on VIP Premier Painting for high-quality exterior and interior painting in Covenant Hills, Terramor, Oak Knoll, and Flintridge Village. We understand the unique architectural styles and HOA color requirements of Ladera Ranch's master-planned communities.\n\nOur free custom color visualization service is especially popular with Ladera Ranch and Covenant Hills homeowners — you see your exact home rendered in multiple color schemes before any commitment. This eliminates the #1 fear homeowners have: choosing the wrong color.\n\nAs experienced painters serving the 92694 zip code, we specialize in exterior repaints for Craftsman, Spanish Colonial, and French Country-style homes. We exclusively use Sherwin-Williams premium exterior coatings rated for Southern California's coastal and inland conditions.\n\nServices in Ladera Ranch: exterior house painting, interior painting, trim and accent painting, wood deck staining, wrought iron painting, garage doors, and full-service color consulting. Call (909) 312-5400 to book your free consultation.`
  },
  {
    id: 'eagle-glen-corona',
    city: 'Corona',
    community: 'Eagle Glen',
    state: 'CA',
    region: 'Inland Empire',
    zip: '92883',
    slug: 'painting-contractor-corona-ca',
    pricePerSqft: '$3.00',
    tier: 1,
    homeValues: '$1.5M–$4M',
    homeownerProfiles: [
      { name: 'The Davis Family', area: 'Eagle Glen' },
      { name: 'The Thompson Residence', area: 'Corona Hills' },
      { name: 'James & Patricia Wong', area: 'Eagle Glen' }
    ],
    seoIntro: 'VIP Premier Painting is Corona\'s trusted residential painting contractor, serving Eagle Glen, Corona Hills, and surrounding luxury communities with premium exterior and interior painting services.',
    seoBody: `Corona homeowners in Eagle Glen, Sycamore Creek, and Mountain Gate trust VIP Premier Painting for professional house painting that elevates curb appeal and protects home value. Our painting crews are experienced with the Mediterranean and Spanish Colonial architecture popular throughout the 92883 zip code.\n\nWe offer Corona's only free AI-powered color visualization service — see your home in up to 3 custom Sherwin-Williams color palettes before committing to any paint. This service alone saves homeowners from costly repaints and color regret.\n\nOur Corona painting services include exterior painting, interior painting, cabinet refinishing, fence and gate painting, stucco repair + paint, and complete color consultation packages for HOA-governed communities in Eagle Glen and Sycamore Creek.\n\nLicensed, bonded, and insured in the state of California. Serving Corona CA since 2018. Call (909) 312-5400 or complete the form above for your free Corona painting estimate.`
  },
  {
    id: 'shady-canyon-irvine',
    city: 'Irvine',
    community: 'Shady Canyon',
    state: 'CA',
    region: 'Orange County',
    zip: '92618',
    slug: 'house-painting-irvine-ca',
    pricePerSqft: '$4.75',
    tier: 2,
    homeValues: '$5M–$12M',
    homeownerProfiles: [
      { name: 'The Park Family', area: 'Shady Canyon' },
      { name: 'The Mitchell Residence', area: 'Northpark Irvine' },
      { name: 'David & Jennifer Lee', area: 'Shady Canyon' }
    ],
    seoIntro: 'VIP Premier Painting provides luxury residential painting services to Irvine\'s most prestigious communities, including Shady Canyon, Northpark, and Turtle Ridge.',
    seoBody: `Irvine homeowners in Shady Canyon, Turtle Ridge, Northpark, and Woodbridge choose VIP Premier Painting for the premium painting experience their homes deserve. We work with Irvine's architectural review boards and HOAs to ensure every color selection is compliant and beautiful.\n\nShady Canyon homes feature estate-level architecture requiring expert craftsmanship and premium coatings. Our team uses exclusively Sherwin-Williams Emerald exterior and interior collections — the highest-rated paint products available — along with professional surface preparation, premium primers, and multi-coat application systems.\n\nIrvine painting services: luxury exterior repaints, full interior painting, custom faux finishes, wine cellar and media room painting, cabinet and built-in refinishing, and our signature Free Color Visualization service.\n\nServing Irvine, Shady Canyon, Turtle Ridge, Quail Hill, and Northpark. Call (909) 312-5400 for your complimentary painting consultation.`
  },
  {
    id: 'coto-de-caza',
    city: 'Coto de Caza',
    community: 'Coto de Caza',
    state: 'CA',
    region: 'Orange County',
    zip: '92679',
    slug: 'painting-coto-de-caza-ca',
    pricePerSqft: '$4.50',
    tier: 2,
    homeValues: '$3M–$8M',
    homeownerProfiles: [
      { name: 'The Taylor Family', area: 'Coto de Caza' },
      { name: 'The Harris Residence', area: 'Coto de Caza North' },
      { name: 'Christopher & Amanda Reed', area: 'Coto de Caza' }
    ],
    seoIntro: 'VIP Premier Painting specializes in luxury residential painting for Coto de Caza homeowners — featuring our exclusive free color visualization service and premium Sherwin-Williams coatings.',
    seoBody: `Coto de Caza is one of Southern California's most prestigious gated communities, and VIP Premier Painting delivers painting services that match its standard of excellence. Our team understands Coto's HOA color palette requirements and architectural review process intimately.\n\nWe have completed dozens of full exterior repaints in Coto de Caza, Coto North, and the surrounding Robinson Ranch area. Our free AI color visualization service lets homeowners see their estate rendered in Coto-compliant color schemes before a single approval is filed.\n\nServices for Coto de Caza: full exterior repaints, interior painting for open-plan estates, pool house and casita painting, equestrian property painting, gate and fence painting, wrought iron refinishing, and multi-structure property packages.\n\nCall VIP Premier at (909) 312-5400 to schedule your Coto de Caza painting consultation — we'll come to you.`
  },
  {
    id: 'the-summit-alta-loma',
    city: 'Alta Loma',
    community: 'The Summit',
    state: 'CA',
    region: 'Inland Empire',
    zip: '91701',
    slug: 'exterior-painters-alta-loma-ca',
    pricePerSqft: '$3.25',
    tier: 2,
    homeValues: '$2M–$5M',
    homeownerProfiles: [
      { name: 'The Nelson Family', area: 'The Summit' },
      { name: 'The Carter Residence', area: 'Alta Loma' },
      { name: 'Steven & Karen White', area: 'The Summit' }
    ],
    seoIntro: 'VIP Premier Painting serves Alta Loma and The Summit community homeowners with professional exterior and interior painting, color visualization, and premium Sherwin-Williams coatings.',
    seoBody: `Alta Loma homeowners in The Summit, Rancho Etiwanda Estates, and surrounding Chino Hills foothill communities rely on VIP Premier Painting for quality that stands up to the Inland Empire's climate extremes — from desert heat to occasional freeze cycles.\n\nThe Summit features some of the most dramatic hillside architecture in the Inland Empire, with sweeping mountain views and custom-built estates. Our free color visualization service shows homeowners exactly how their color selection will look from the street, the driveway, and aerial perspective — eliminating uncertainty before committing to any color.\n\nAlta Loma painting services: exterior repaints for stucco and wood siding, interior full-home painting, trim and fascia painting, garage door refinishing, pool house and guest house packages, wood deck staining and sealing.\n\nLicensed in California. Fully insured. Call (909) 312-5400 for your free Alta Loma painting estimate.`
  },
  {
    id: 'crystal-cove-newport-coast',
    city: 'Newport Coast',
    community: 'Crystal Cove',
    state: 'CA',
    region: 'Orange County Coast',
    zip: '92657',
    slug: 'painting-newport-coast-ca',
    pricePerSqft: '$5.50',
    tier: 3,
    homeValues: '$10M–$25M',
    homeownerProfiles: [
      { name: 'The Sterling Family', area: 'Crystal Cove' },
      { name: 'The Harrington Residence', area: 'Newport Coast' },
      { name: 'William & Victoria Cross', area: 'Crystal Cove' }
    ],
    seoIntro: 'VIP Premier Painting serves Newport Coast\'s Crystal Cove and Pelican Crest communities with estate-level painting services, custom color design, and marine-grade coating systems for coastal properties.',
    seoBody: `Newport Coast and Crystal Cove require a unique painting approach: marine-grade primers and topcoats that withstand salt air, coastal UV radiation, and thermal cycling. VIP Premier Painting is one of the few residential painting companies in Southern California with extensive experience on ocean-front and ocean-view properties.\n\nOur Crystal Cove and Newport Coast painting projects involve coordination with architectural review committees, HOA color guidelines, and often multiple exterior surfaces including stucco, stone veneer, wood cladding, and wrought iron gates. We handle it all.\n\nThe free color visualization service we offer is particularly valued by Newport Coast homeowners — because with an $8M–$25M property, you're not guessing on paint color. You see it perfectly rendered before we open a single can.\n\nNewport Coast services: luxury exterior painting, interior painting for high-end finishes, specialty marine coatings, pool house and cabana painting, gate and fence refinishing, wood deck restoration. Call (909) 312-5400.`
  },
  {
    id: 'pelican-hill-newport-beach',
    city: 'Newport Beach',
    community: 'Pelican Hill',
    state: 'CA',
    region: 'Orange County Coast',
    zip: '92657',
    slug: 'house-painters-newport-beach-ca',
    pricePerSqft: '$5.50',
    tier: 3,
    homeValues: '$8M–$20M',
    homeownerProfiles: [
      { name: 'The Gallagher Family', area: 'Pelican Hill' },
      { name: 'The Forbes Residence', area: 'Newport Beach' },
      { name: 'Thomas & Carolyn Barnes', area: 'Pelican Hill' }
    ],
    seoIntro: 'VIP Premier Painting provides concierge-level residential painting services to Newport Beach\'s most prestigious communities — Pelican Hill, Big Canyon, Harbor Ridge, and Balboa Island.',
    seoBody: `Newport Beach homeowners at Pelican Hill, Harbor Ridge, Big Canyon, and throughout the 92657 zip code trust VIP Premier Painting for painting results worthy of their investment. Our Newport Beach painting crews work by appointment, with full property protection protocols, and deliver a spotless site before we leave.\n\nPelican Hill homes present unique painting challenges: Mediterranean and Tuscan architecture with multiple exterior materials, expansive rooflines, and coastal exposure. We use a 5-step surface prep process followed by premium Sherwin-Williams Emerald exterior systems with lifetime fade-resistance ratings.\n\nThe VIP difference: our free color visualization shows you your Pelican Hill or Big Canyon home in photorealistic detail — rendered in your chosen color schemes — before we ever apply a brush. Newport Beach homeowners tell us this is the single most valuable service they received.\n\nNewport Beach painting services: full estate exterior repaints, interior painting, custom millwork refinishing, garage and motor court surfaces, fence and gate systems, specialty finishes. (909) 312-5400.`
  },
  {
    id: 'hidden-hills-la-county',
    city: 'Hidden Hills',
    community: 'Hidden Hills',
    state: 'CA',
    region: 'LA County',
    zip: '91302',
    slug: 'house-painting-hidden-hills-ca',
    pricePerSqft: '$5.75',
    tier: 3,
    homeValues: '$10M–$50M',
    homeownerProfiles: [
      { name: 'The Langford Family', area: 'Hidden Hills' },
      { name: 'The Monroe Residence', area: 'Hidden Hills Estates' },
      { name: 'Brandon & Michelle Cole', area: 'Hidden Hills' }
    ],
    seoIntro: 'VIP Premier Painting serves Hidden Hills homeowners with discreet, estate-level painting services — full exteriors, interiors, and our exclusive free AI color visualization for LA County\'s most private luxury community.',
    seoBody: `Hidden Hills is Southern California's most exclusive gated equestrian community — with celebrity estates and properties valued from $10M to over $50M. VIP Premier Painting delivers painting services at the Hidden Hills standard: white-glove, discreet, and flawlessly executed.\n\nWe understand the privacy and security protocols required for Hidden Hills projects. Our crews are background-checked, uniformed, and briefed on property access procedures before every job. We work quietly, efficiently, and leave zero trace except a stunning paint result.\n\nHidden Hills exterior painting involves large lot setbacks, custom ranch architecture, equestrian structures, and multiple outbuildings. Our color visualization system renders the full property — main house, guest house, barn, fencing — so the estate owner can approve the complete picture before any work begins.\n\nHidden Hills painting services: full estate exterior repaints, interior painting, barn and equestrian structure painting, fence and gate systems, pergola and outdoor structure painting, tile roofline trim painting. For Hidden Hills, by appointment only. Call (909) 312-5400.`
  }
];

// ============================================================
//  TOKEN REPLACEMENT ENGINE
// ============================================================
function replaceTokens(template, cityData) {
  const hw = cityData.homeownerProfiles;
  const replacements = {
    '{{CITY}}':            cityData.city,
    '{{STATE}}':           cityData.state,
    '{{REGION}}':          cityData.region,
    '{{ZIP}}':             cityData.zip,
    '{{COMMUNITY}}':       cityData.community,
    '{{PRICE_PER_SQFT}}':  cityData.pricePerSqft,
    '{{HOME_VALUES}}':     cityData.homeValues,
    '{{HOMEOWNER_1_NAME}}': hw[0]?.name || 'The Homeowner',
    '{{HOMEOWNER_1_AREA}}': hw[0]?.area || cityData.city,
    '{{HOMEOWNER_2_NAME}}': hw[1]?.name || 'The Resident',
    '{{HOMEOWNER_2_AREA}}': hw[1]?.area || cityData.city,
    '{{HOMEOWNER_3_NAME}}': hw[2]?.name || 'Local Homeowner',
    '{{HOMEOWNER_3_AREA}}': hw[2]?.area || cityData.city,
    '{{VIDEO_1_ID}}':      'VIDEO_1_PENDING',
    '{{VIDEO_2_ID}}':      'VIDEO_2_PENDING',
    '{{VIDEO_3_ID}}':      'VIDEO_3_PENDING',
    '{{VIDEO_4_ID}}':      'VIDEO_4_PENDING',
    '{{SEO_INTRO}}':       cityData.seoIntro,
    '{{SEO_BODY}}':        cityData.seoBody.replace(/\n/g, '<br><br>'),
    '{{PAGE_TITLE}}':      `House Painting ${cityData.city}, ${cityData.state} | VIP Premier Painting`,
    '{{META_DESCRIPTION}}': `VIP Premier Painting serves ${cityData.city} homeowners with premium exterior & interior painting. Free custom color visualization. Licensed & insured. Call (909) 312-5400.`,
    '{{META_KEYWORDS}}':   `painting contractor ${cityData.city}, house painting ${cityData.city} CA, exterior painting ${cityData.city}, interior painters ${cityData.city}, ${cityData.community} painting`
  };

  let output = template;
  for (const [token, value] of Object.entries(replacements)) {
    output = output.split(token).join(value); // replace ALL occurrences
  }
  return output;
}

// ============================================================
//  MAIN — Determine Which City to Run & Generate Page
// ============================================================
function main() {
  const templatePath = path.join(__dirname, 'VIP_SalesPage_Master_Template.html');
  const outputDir = __dirname;

  // Read master template
  if (!fs.existsSync(templatePath)) {
    console.error('❌ ERROR: VIP_SalesPage_Master_Template.html not found in the same folder as this script.');
    console.error('   Make sure both files are in the same directory.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf8');

  // Determine today's city from a rotation log, OR generate ALL cities
  const args = process.argv.slice(2);
  const generateAll = args.includes('--all');
  const specificCity = args.find(a => a.startsWith('--city='))?.replace('--city=', '');

  let citiesToProcess = [];

  if (generateAll) {
    citiesToProcess = CITY_DATA;
    console.log('🏙️  Generating pages for ALL 9 communities...\n');
  } else if (specificCity) {
    const found = CITY_DATA.find(c =>
      c.city.toLowerCase().includes(specificCity.toLowerCase()) ||
      c.id.includes(specificCity.toLowerCase())
    );
    if (!found) {
      console.error(`❌ City "${specificCity}" not found. Available cities:`);
      CITY_DATA.forEach(c => console.log(`   ${c.city} (--city=${c.city.split(' ')[0].toLowerCase()})`));
      process.exit(1);
    }
    citiesToProcess = [found];
  } else {
    // Daily rotation — pick today's city based on day of year
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const todayCity = CITY_DATA[dayOfYear % CITY_DATA.length];
    citiesToProcess = [todayCity];
    console.log(`📅 Daily rotation mode — today's city: ${todayCity.city}\n`);
  }

  // Generate each city page
  for (const cityData of citiesToProcess) {
    const populated = replaceTokens(template, cityData);
    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const fileName = `VIP_${cityData.city.replace(/\s+/g, '_')}_SalesPage_${dateStr}.html`;
    const outputPath = path.join(outputDir, fileName);

    fs.writeFileSync(outputPath, populated, 'utf8');

    console.log(`✅ Generated: ${fileName}`);
    console.log(`   City:      ${cityData.city} (${cityData.community})`);
    console.log(`   URL Slug:  /${cityData.slug}/`);
    console.log(`   Tier:      ${cityData.tier}`);
    console.log(`   Home Values: ${cityData.homeValues}`);
    console.log(`   Price/sqft: ${cityData.pricePerSqft}`);
    console.log('');
  }

  console.log('─────────────────────────────────────────────');
  console.log('📋 NEXT STEPS:');
  console.log('1. Open the generated HTML file in your browser');
  console.log('2. In WordPress: Duplicate your master template page');
  console.log('3. Rename it and set the URL slug shown above');
  console.log('4. Open in Elementor → find & replace {{CITY}} with city name');
  console.log('5. Paste the SEO copy from this file into Section 12');
  console.log('6. Publish → add to sitemap → done!');
  console.log('─────────────────────────────────────────────');
}

main();
