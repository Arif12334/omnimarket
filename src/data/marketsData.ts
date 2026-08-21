import { Market, CategorySlug } from '../types';

interface CityData {
  city: string;
  country: string;
  location: string;
  streets: string[];
}

const GLOBAL_CITIES: CityData[] = [
  { city: 'New York', country: 'United States', location: 'Manhattan, New York', streets: ['5th Avenue', 'Broadway', 'Mercer St', 'Madison Ave', 'Lexington Ave', 'Canal St', 'Wall Street'] },
  { city: 'San Francisco', country: 'United States', location: 'Bay Area, California', streets: ['Market St', 'Mission St', 'Howard St', 'Powell St', 'Geary Blvd', 'Montgomery St'] },
  { city: 'Los Angeles', country: 'United States', location: 'Southern California', streets: ['Rodeo Dr', 'Sunset Blvd', 'Melrose Ave', 'Wilshire Blvd', 'Abbot Kinney Blvd'] },
  { city: 'Seattle', country: 'United States', location: 'Pacific Northwest, Washington', streets: ['Pike St', 'Pine St', '1st Avenue', 'Westlake Ave', 'University Way'] },
  { city: 'Chicago', country: 'United States', location: 'Illinois, United States', streets: ['Michigan Ave', 'State St', 'Wacker Dr', 'Rush St', 'Randolph St'] },
  { city: 'Austin', country: 'United States', location: 'Texas, United States', streets: ['Congress Ave', '6th Street', 'South Congress', 'Lamar Blvd', 'Guadalupe St'] },
  { city: 'Miami', country: 'United States', location: 'Florida, United States', streets: ['Ocean Drive', 'Collins Ave', 'Biscayne Blvd', 'Lincoln Rd', 'Brickell Ave'] },
  { city: 'London', country: 'United Kingdom', location: 'Greater London, UK', streets: ['Oxford Street', 'Regent Street', 'Bond Street', 'Piccadilly', 'Kings Road', 'Covent Garden'] },
  { city: 'Manchester', country: 'United Kingdom', location: 'Northern England, UK', streets: ['Deansgate', 'Market Street', 'King Street', 'Cross Street'] },
  { city: 'Paris', country: 'France', location: 'Île-de-France, France', streets: ['Champs-Élysées', 'Rue de Rivoli', 'Boulevard Haussmann', 'Rue Saint-Honoré', 'Boulevard Saint-Germain'] },
  { city: 'Berlin', country: 'Germany', location: 'Berlin Metropolitan, Germany', streets: ['Kurfürstendamm', 'Friedrichstraße', 'Alexanderplatz', 'Unter den Linden', 'Potsdamer Platz'] },
  { city: 'Munich', country: 'Germany', location: 'Bavaria, Germany', streets: ['Maximilianstraße', 'Kaufingerstraße', 'Theatinerstraße', 'Neuhauser Straße'] },
  { city: 'Milan', country: 'Italy', location: 'Lombardy, Italy', streets: ['Via Montenapoleone', 'Corso Vittorio Emanuele II', 'Via della Spiga', 'Corso Buenos Aires'] },
  { city: 'Rome', country: 'Italy', location: 'Lazio, Italy', streets: ['Via del Corso', 'Via Condotti', 'Via Veneto', 'Via Cola di Rienzo'] },
  { city: 'Madrid', country: 'Spain', location: 'Community of Madrid, Spain', streets: ['Gran Vía', 'Calle Serrano', 'Calle Preciados', 'Paseo de la Castellana'] },
  { city: 'Barcelona', country: 'Spain', location: 'Catalonia, Spain', streets: ['Passeig de Gràcia', 'Avinguda Diagonal', 'Las Ramblas', 'Portal de l\'Àngel'] },
  { city: 'Amsterdam', country: 'Netherlands', location: 'North Holland, Netherlands', streets: ['Kalverstraat', 'P.C. Hooftstraat', 'Leidsestraat', 'Damrak'] },
  { city: 'Zurich', country: 'Switzerland', location: 'Canton of Zurich, Switzerland', streets: ['Bahnhofstrasse', 'Niederdorfstrasse', 'Rennweg', 'Limmatquai'] },
  { city: 'Toronto', country: 'Canada', location: 'Ontario, Canada', streets: ['Yonge Street', 'Queen Street West', 'Bloor Street', 'King Street West'] },
  { city: 'Vancouver', country: 'Canada', location: 'British Columbia, Canada', streets: ['Robson Street', 'Granville Street', 'Alberni Street', 'Water Street'] },
  { city: 'Tokyo', country: 'Japan', location: 'Kanto Region, Japan', streets: ['Ginza 6-Chome', 'Shibuya Crossing', 'Omotesando Ave', 'Akihabara Main St', 'Shinjuku 3-Chome'] },
  { city: 'Osaka', country: 'Japan', location: 'Kansai Region, Japan', streets: ['Shinsaibashi-suji', 'Dotonbori', 'Midosuji Blvd', 'Umeda Center'] },
  { city: 'Seoul', country: 'South Korea', location: 'Seoul Capital, South Korea', streets: ['Myeongdong 8-gil', 'Gangnam-daero', 'Garosu-gil', 'Hongdae Main St'] },
  { city: 'Singapore', country: 'Singapore', location: 'Central Region, Singapore', streets: ['Orchard Road', 'Marina Bay Sands Mall', 'Bugis Junction', 'Raffles City'] },
  { city: 'Hong Kong', country: 'Hong Kong', location: 'Hong Kong Island', streets: ['Queen\'s Road Central', 'Nathan Road', 'Canton Road', 'Causeway Bay'] },
  { city: 'Sydney', country: 'Australia', location: 'New South Wales, Australia', streets: ['George Street', 'Pitt Street Mall', 'Castlereagh St', 'Oxford Street'] },
  { city: 'Melbourne', country: 'Australia', location: 'Victoria, Australia', streets: ['Bourke Street Mall', 'Collins Street', 'Chapel Street', 'Flinders Lane'] },
  { city: 'Dubai', country: 'United Arab Emirates', location: 'Dubai Emirate, UAE', streets: ['Sheikh Zayed Road', 'Downtown Blvd', 'Dubai Mall Avenue', 'Jumeirah Beach Rd'] },
  { city: 'Abu Dhabi', country: 'United Arab Emirates', location: 'Abu Dhabi Emirate, UAE', streets: ['Corniche Road', 'Hamdan Street', 'Al Maryah Island', 'Yas Island'] },
  { city: 'Lagos', country: 'Nigeria', location: 'Lagos State, Nigeria', streets: ['Victoria Island Waterfront', 'Adetokunbo Ademola St', 'Lekki Phase 1', 'Marina Road'] },
  { city: 'Johannesburg', country: 'South Africa', location: 'Gauteng, South Africa', streets: ['Sandton City', 'Rosebank Mall Walk', 'Nelson Mandela Square', 'Melrose Arch'] },
  { city: 'São Paulo', country: 'Brazil', location: 'State of São Paulo, Brazil', streets: ['Avenida Paulista', 'Rua Oscar Freire', 'Faria Lima', 'Shopping JK Iguatemi'] }
];

const CATEGORY_NAMES: Record<CategorySlug, string> = {
  phones: 'Phones & Tablets',
  computers: 'Computers & Laptops',
  electronics: 'Electronics & Audio',
  fashion: 'Fashion & Apparel',
  'home-appliances': 'Home Appliances',
  beauty: 'Beauty & Skincare',
  groceries: 'Groceries & Fresh',
  accessories: 'Watches & Accessories'
};

const CATEGORY_PREFIXES: Record<CategorySlug, string[]> = {
  phones: ['Apex Mobile', 'Nova Wireless', 'HyperCell', 'Titan Phone Emporium', 'Vanguard Mobile', 'Quantum Cellular', 'Horizon 5G', 'Lumina Gadgets', 'Nexus Phone Hub', 'Zenith Smart Mobiles', 'Urban Cellular', 'PixelWave Mobile', 'Aura Smartphones', 'CyberPhone Flagship', 'EchoCellular'],
  computers: ['CyberByte Systems', 'Quantum PC Lab', 'Matrix Rig Studio', 'Silicon Valley Compute', 'NovaTech Workstations', 'AeroByte Laptops', 'UltraCore Gaming', 'Vanguard Computing', 'Precision Silicon', 'NextGen Hardware', 'Apex Compute Hub', 'HyperRig Dynamics', 'PulseTech Labs', 'Titan Ultrabooks'],
  electronics: ['Acoustic Luxe Audio', 'SonicWave Electronics', 'Crystal 4K Vision', 'Harmonic Soundscapes', 'Titan Audio Lab', 'Aura Visual Systems', 'EchoSphere Electronics', 'SoundCraft Dynamics', 'Vanguard Hi-Fi', 'Lumina Studio Sound', 'PulseAudio Flagship', 'Apex Home Cinema', 'Zenith Audio Lab'],
  fashion: ['Aura Atelier & Couture', 'Milanese Thread House', 'Urban Vanguard Apparel', 'Velvet & Silk Studio', 'Nomad Luxury Goods', 'Luxe Living Clothiers', 'Solstice Minimal Wear', 'Empire Leathercraft', 'Elysian Wardrobe', 'Oasis Botanical Wear', 'Savile Row Tailors', 'Verona Fine Silks', 'Prism Designer Studio'],
  'home-appliances': ['PureLiving Smart Home', 'Culinary Craft Appliances', 'Barista Touch House', 'ThermoJet Home Care', 'Nordic Kitchen Systems', 'EcoClean Smart Living', 'AeroPure Air & Home', 'MasterChef Hub', 'Zenith Kitchenware', 'NovaHome Robotics', 'Artisan Coffee & Kitchen', 'HomeSense Smart Tech'],
  beauty: ['Lumière Botanical Beauty', 'Velvet Glow Organics', 'Elysian Dermatics', 'Aura Radiance Labs', 'PureSilk Cosmetics', 'Golden Hour Perfumery', 'Zenith Herbal Care', 'Dermacare Elite', 'Flora & Essence Beauty', 'Oasis Mineral Skincare', 'Prism Cosmetics', 'Vanguard Skincare Lab'],
  groceries: ['GreenBounty Organics', 'Artisan Pantry Direct', 'Harvest Valley Market', 'Terra Farm Collective', 'PureOrigin Wholefoods', 'Golden Grain Organic', 'SunKissed Orchard', 'Rustic Meadow Farms', 'Epicurean Reserve', 'Nectar & Vine Market', 'BlueSky Farm Produce', 'Mediterranean Grove'],
  accessories: ['Crown & Chrono Horology', 'Luxe Timepieces & Leather', 'Titan Watch Vault', 'Aura Heritage Leather', 'Zenith Eyewear & Belts', 'Apex Chronometer Co.', 'Sovereign Jewelry & Bags', 'Monarch Fine Goods', 'Velvet Watch Studio', 'Infinity Horology Lab', 'Starlight Gems & Time']
};

const MERCHANT_FIRST_NAMES = [
  'Alexander', 'Elena', 'Marcus', 'Sophia', 'Julian', 'Olivia', 'David', 'Emma', 'Lucas', 'Isabella',
  'Liam', 'Charlotte', 'Noah', 'Amelia', 'Ethan', 'Mia', 'Oliver', 'Harper', 'James', 'Evelyn',
  'Benjamin', 'Abigail', 'Henry', 'Emily', 'Sebastian', 'Elizabeth', 'Mateo', 'Sofia', 'Daniel', 'Avery',
  'Tariq', 'Fatima', 'Darius', 'Zainab', 'Chen', 'Mei', 'Kenji', 'Yuki', 'Kwame', 'Amara',
  'Rafael', 'Camila', 'Viktor', 'Astrid', 'Arjun', 'Priya', 'Nikolai', 'Ingrid', 'Jean-Pierre', 'Claire'
];

const MERCHANT_LAST_NAMES = [
  'Vance', 'Rostova', 'Sterling', 'Chen', 'Dubois', 'Kowalski', 'Nakamura', 'Okafor', 'Moretti', 'Al-Mansoor',
  'Lindqvist', 'Hernandez', 'Kim', 'Patel', 'Schneider', 'Santos', 'O\'Connor', 'Novak', 'Gupta', 'Sinclair',
  'Mercer', 'Castillo', 'Bauer', 'Popov', 'Takahashi', 'Adebayo', 'Fischer', 'Rossi', 'Larsson', 'Fontaine',
  'De Vries', 'Mendoza', 'Kuznetsov', 'Ibrahim', 'Blackwood', 'Gallagher', 'Muller', 'Sato', 'Mensah', 'Navarro'
];

const CATEGORY_BANNER_PHOTOS: Record<CategorySlug, string[]> = {
  phones: [
    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=1200&auto=format&fit=crop&q=80'
  ],
  computers: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1200&auto=format&fit=crop&q=80'
  ],
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&auto=format&fit=crop&q=80'
  ],
  fashion: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80'
  ],
  'home-appliances': [
    'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&auto=format&fit=crop&q=80'
  ],
  beauty: [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&auto=format&fit=crop&q=80'
  ],
  groceries: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506484381205-f7945653044d?w=1200&auto=format&fit=crop&q=80'
  ],
  accessories: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1547996160-71dfabb1d5b3?w=1200&auto=format&fit=crop&q=80'
  ]
};

const LOGO_PHOTOS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
];

const TAG_POOL = [
  'Official Brand', 'Prime 1-Day Ship', 'Verified Merchant', 'Direct Manufacturer',
  'Eco-Friendly', 'Artisan Crafted', 'Authentic 2-Yr Warranty', 'Bestseller Store',
  'Top Rated 2026', 'Zero Carbon', 'Priority Support', 'Exclusive Global Imports'
];

/**
 * Generate 1,200+ Rich, Searchable, High-Fidelity Global Markets
 */
export function generateThousandsOfMarkets(): Market[] {
  const categories: CategorySlug[] = [
    'phones',
    'computers',
    'electronics',
    'fashion',
    'home-appliances',
    'beauty',
    'groceries',
    'accessories'
  ];

  const allMarkets: Market[] = [];
  const TOTAL_MARKETS_TO_GENERATE = 1250;

  for (let i = 0; i < TOTAL_MARKETS_TO_GENERATE; i++) {
    const category = categories[i % categories.length];
    const categoryName = CATEGORY_NAMES[category];
    const cityObj = GLOBAL_CITIES[i % GLOBAL_CITIES.length];
    const street = cityObj.streets[i % cityObj.streets.length];
    const streetNum = 10 + ((i * 37) % 980);
    const address = `${streetNum} ${street}, Suite ${100 + (i % 40) * 10}`;

    const prefixList = CATEGORY_PREFIXES[category];
    const prefix = prefixList[i % prefixList.length];
    const marketName = `${prefix} • ${cityObj.city}`;
    const slug = `${prefix.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${cityObj.city.toLowerCase()}-${i + 1}`;

    const firstName = MERCHANT_FIRST_NAMES[i % MERCHANT_FIRST_NAMES.length];
    const lastName = MERCHANT_LAST_NAMES[(i * 3 + 7) % MERCHANT_LAST_NAMES.length];
    const ownerName = `${firstName} ${lastName}`;
    
    // Adult Age Verification (always >= 21)
    const ownerAge = 21 + ((i * 7 + 13) % 45); // Ages 21 to 65
    const cleanDomain = prefix.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
    const ownerEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${cleanDomain}`;
    const storeEmail = `contact@${cleanDomain}`;
    const phone = `+1 (${200 + (i % 700)}) 555-${String(1000 + (i * 13) % 9000).padStart(4, '0')}`;

    const bannerList = CATEGORY_BANNER_PHOTOS[category];
    const bannerImage = bannerList[i % bannerList.length];
    const logoImage = LOGO_PHOTOS[i % LOGO_PHOTOS.length];

    // Ratings between 4.30 and 4.99
    const rating = Number((4.3 + (((i * 19) % 69) / 100)).toFixed(2));
    const reviewCount = 80 + ((i * 127) % 4200);
    const totalProductsCount = 35 + ((i * 31) % 450);
    const establishedYear = 1990 + (i % 35); // 1990 to 2024

    const tag1 = TAG_POOL[i % TAG_POOL.length];
    const tag2 = TAG_POOL[(i + 3) % TAG_POOL.length];
    const tag3 = TAG_POOL[(i + 7) % TAG_POOL.length];
    const tags = Array.from(new Set([tag1, tag2, tag3, categoryName]));

    const openHour = 7 + (i % 3);
    const closeHour = 8 + (i % 4);
    const openingHours = `${openHour}:00 AM - ${closeHour}:00 PM (Daily)`;

    const descriptions = [
      `Premier verified boutique for ${categoryName.toLowerCase()}, offering certified warranty, expedited Prime courier dispatch, and direct importer pricing.`,
      `Official flagship merchant providing authentic collections, specialized customer concierge, and certified genuine ${categoryName.toLowerCase()}.`,
      `Award-winning international supplier delivering 1-day expedited shipments, sustainable packaging, and exclusive seasonal releases.`
    ];
    const description = descriptions[i % descriptions.length];

    allMarkets.push({
      id: `mkt-${i + 1}`,
      name: marketName,
      slug,
      category,
      categoryName,
      description,
      location: cityObj.location,
      address,
      city: cityObj.city,
      country: cityObj.country,
      phone,
      email: storeEmail,
      bannerImage,
      logoImage,
      rating,
      reviewCount,
      totalProductsCount,
      verifiedAdultOwner: true,
      ownerAge,
      ownerName,
      ownerEmail,
      establishedYear,
      openingHours,
      isOpen: (i % 10) !== 0, // 90% open
      isAmazonFulfilled: (i % 3) !== 0, // 66% prime fulfilled
      tags,
      createdAt: new Date(Date.now() - (i * 86400000 * 2)).toISOString()
    });
  }

  return allMarkets;
}

export const THOUSANDS_OF_MARKETS = generateThousandsOfMarkets();
