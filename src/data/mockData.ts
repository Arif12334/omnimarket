import { 
  Category, 
  Product, 
  UserProfile, 
  PromoCode, 
  ShippingMethod, 
  Order,
  DeliveryDriver,
  Market
} from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    slug: 'phones',
    name: 'Phones & Tablets',
    iconName: 'Smartphone',
    description: 'Flagship smartphones, 5G devices & tablets',
    itemCount: 1420,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-2',
    slug: 'computers',
    name: 'Computers & Laptops',
    iconName: 'Laptop',
    description: 'Workstations, ultrabooks, gaming rigs & accessories',
    itemCount: 890,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-3',
    slug: 'electronics',
    name: 'Electronics & Audio',
    iconName: 'Headphones',
    description: 'Noise-cancelling headphones, soundbars & 4K TVs',
    itemCount: 2310,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-4',
    slug: 'fashion',
    name: 'Fashion & Apparel',
    iconName: 'Shirt',
    description: 'Designer clothing, footwear & luxury outerwear',
    itemCount: 4120,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-5',
    slug: 'home-appliances',
    name: 'Home Appliances',
    iconName: 'Home',
    description: 'Smart kitchen, air purifiers & robotic vacuums',
    itemCount: 1140,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-6',
    slug: 'beauty',
    name: 'Beauty & Skincare',
    iconName: 'Sparkles',
    description: 'Dermatological skincare, perfumes & cosmetic care',
    itemCount: 1650,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-7',
    slug: 'groceries',
    name: 'Groceries & Fresh',
    iconName: 'ShoppingBag',
    description: 'Organic produce, pantry staples & artisan snacks',
    itemCount: 3200,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-8',
    slug: 'accessories',
    name: 'Accessories & Watches',
    iconName: 'Watch',
    description: 'Smartwatches, leather bags, eyewear & jewelry',
    itemCount: 2040,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Ultra Pro Max 5G Flagship Smartphone 256GB',
    slug: 'ultra-pro-max-5g-smartphone',
    brand: 'NovaTech',
    category: 'phones',
    price: 899.99,
    originalPrice: 1099.99,
    discountPercentage: 18,
    rating: 4.8,
    reviewCount: 428,
    stockCount: 145,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'Experience ultra-fast computing with the octa-core Snapdragon AI processor, 120Hz dynamic AMOLED HDR10+ display, 108MP quad-camera matrix with optical zoom, and 65W hyper-charge technology.',
    highlights: [
      '6.8-inch Quad HD+ Dynamic AMOLED 120Hz',
      '108MP Pro Sensor with 8K Video Recording',
      '5000mAh Battery with 65W Fast Wireless Charging',
      'IP68 Water and Dust Resistance',
      '5G Global Band Compatibility'
    ],
    specs: {
      'Screen Size': '6.8 inches',
      'Processor': 'Snapdragon 8 Gen 3 Octa-Core',
      'RAM': '12GB LPDDR5X',
      'Storage': '256GB / 512GB UFS 4.0',
      'Operating System': 'Android 14'
    },
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Titanium Black', hex: '#1e293b', imageIndex: 0 },
      { name: 'Starlight Silver', hex: '#e2e8f0', imageIndex: 1 },
      { name: 'Midnight Navy', hex: '#1e3a8a', imageIndex: 2 }
    ],
    variations: [
      { name: 'Storage Capacity', options: ['128GB', '256GB', '512GB', '1TB'] }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-1',
        userName: 'David Vance',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Camera quality is mind-blowing! Battery lasts over a full day of heavy productivity and gaming. Delivery arrived the next morning.',
        verifiedPurchase: true,
        helpfulCount: 38
      },
      {
        id: 'rev-2',
        userName: 'Sophia Chen',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Screen is so crisp in bright daylight. The haptic feedback and speaker clarity are superior to any flagship I owned before.',
        verifiedPurchase: true,
        helpfulCount: 19
      }
    ],
    deliveryEstimateDays: 2,
    isFeatured: true,
    tags: ['Flagship', '5G', 'Best Seller', 'Top Rated']
  },
  {
    id: 'prod-2',
    name: 'Acoustic Studio Wireless Noise-Cancelling Headphones',
    slug: 'acoustic-studio-wireless-headphones',
    brand: 'SoundMaster',
    category: 'electronics',
    price: 249.50,
    originalPrice: 349.00,
    discountPercentage: 28,
    rating: 4.9,
    reviewCount: 682,
    stockCount: 150,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'East Coast Logistics Hub',
    description: 'Custom 40mm titanium drivers deliver high-resolution audio with active hybrid noise cancellation, transparency audio mode, and 45 hours of non-stop battery life on a single charge.',
    highlights: [
      'Hybrid Active Noise Cancellation (40dB depth)',
      'Spatial 3D Audio with dynamic head tracking',
      '45-Hour Battery Life with 10-min Fast Fuel Charge (5 hrs play)',
      'Ultra-soft memory foam earcups with breathable leather',
      'Multipoint Bluetooth 5.3 connection'
    ],
    specs: {
      'Driver Unit': '40mm Titanium Dome',
      'Battery Life': '45 Hours (ANC On)',
      'Connectivity': 'Bluetooth 5.3 + 3.5mm Aux',
      'Weight': '250g'
    },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Matte Onyx', hex: '#0f172a', imageIndex: 0 },
      { name: 'Warm Sand', hex: '#d6d3d1', imageIndex: 1 },
      { name: 'Forest Green', hex: '#064e3b', imageIndex: 2 }
    ],
    seller: {
      id: 'sel-2',
      name: 'SoundCraft Pro Audio',
      rating: 4.95,
      totalSales: 15300,
      verified: true,
      responseTime: 'Instant',
      location: 'Boston, MA',
      joinedDate: 'Mar 2020'
    },
    reviews: [
      {
        id: 'rev-3',
        userName: 'Marcus Thorne',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Silences airplane engine rumble instantly. The companion EQ app allows pinpoint sound tweaking.',
        verifiedPurchase: true,
        helpfulCount: 42
      }
    ],
    deliveryEstimateDays: 1,
    isFeatured: true,
    isRecommended: true,
    tags: ['ANC', 'Hi-Res', 'Bluetooth 5.3', 'Trending']
  },
  {
    id: 'prod-3',
    name: 'ZenBook Aero 15.6" Ultra-Slim M3 Laptop',
    slug: 'zenbook-aero-slim-laptop',
    brand: 'Zenith Tech',
    category: 'computers',
    price: 1299.00,
    originalPrice: 1499.00,
    discountPercentage: 13,
    rating: 4.7,
    reviewCount: 310,
    stockCount: 12,
    condition: 'New',
    location: 'West Distribution Center, CA',
    description: 'Engineered for power users, creators and programmers. Features a breathtaking 3.2K OLED 120Hz Pantone-validated display, 16-Core M3 Silicon processor, 32GB Unified Memory, and all-day 18-hour battery.',
    highlights: [
      '15.6-inch 3.2K (3200x2000) 120Hz OLED 100% DCI-P3',
      '16-Core Ultra M3 Processor with Neural AI engine',
      '32GB Unified Ultra-Speed RAM & 1TB NVMe PCIe 4.0 SSD',
      'Magnesium-aluminum unibody weighing only 1.39kg',
      'Thunderbolt 4, Wi-Fi 7, and Backlit Ergonomic Keyboard'
    ],
    specs: {
      'Display': '15.6" 3.2K OLED 120Hz',
      'CPU': 'M3 Max 16-Core',
      'RAM': '32GB Unified',
      'SSD': '1TB NVMe SSD',
      'Weight': '1.39 kg'
    },
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Space Gray', hex: '#334155', imageIndex: 0 },
      { name: 'Silver Mist', hex: '#cbd5e1', imageIndex: 1 }
    ],
    variations: [
      { name: 'Configuration', options: ['16GB RAM / 512GB SSD', '32GB RAM / 1TB SSD', '64GB RAM / 2TB SSD'] }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-4',
        userName: 'Elena Rostova',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'Runs Docker, VS Code, and Figma effortlessly without ever spinning up noisy fans. Screen is gorgeous.',
        verifiedPurchase: true,
        helpfulCount: 27
      }
    ],
    deliveryEstimateDays: 2,
    isFeatured: true,
    tags: ['OLED', 'M3 Chip', 'Ultrabook', 'Pro Choice']
  },
  {
    id: 'prod-4',
    name: 'Italian Tailored Merino Wool Blazer & Trench',
    slug: 'italian-merino-wool-blazer',
    brand: 'Atelier Sartoriale',
    category: 'fashion',
    price: 189.00,
    originalPrice: 280.00,
    discountPercentage: 32,
    rating: 4.85,
    reviewCount: 154,
    stockCount: 22,
    condition: 'New',
    location: 'Milan / NY Fashion Hub',
    description: 'Masterfully woven from 100% fine Italian merino wool. Breathable, naturally wrinkle-resistant, with horn buttons and silk interior lining. Effortlessly transitions between business and casual outings.',
    highlights: [
      '100% Super 130s Italian Merino Wool',
      'Full Bemberg Silk Interior Lining',
      'Genuine Horn Buttons with Notch Lapel',
      'Tailored European modern slim-regular silhouette'
    ],
    specs: {
      'Material': '100% Merino Wool',
      'Lining': '100% Bemberg Cupro Silk',
      'Care': 'Dry Clean Only',
      'Origin': 'Made in Italy'
    },
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#374151', imageIndex: 0 },
      { name: 'Camel Tan', hex: '#d97706', imageIndex: 1 },
      { name: 'Royal Navy', hex: '#1e3a8a', imageIndex: 2 }
    ],
    variations: [
      { name: 'Size', options: ['S (38R)', 'M (40R)', 'L (42R)', 'XL (44R)', 'XXL (46R)'] }
    ],
    seller: {
      id: 'sel-3',
      name: 'Milanese Couture Boutique',
      rating: 4.88,
      totalSales: 6200,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Milan, Italy',
      joinedDate: 'Aug 2022'
    },
    reviews: [
      {
        id: 'rev-5',
        userName: 'Julian Wright',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Drapes like a bespoke $1000 suit jacket. Perfect shoulder structure and buttery soft wool.',
        verifiedPurchase: true,
        helpfulCount: 14
      }
    ],
    deliveryEstimateDays: 3,
    isRecommended: true,
    tags: ['Luxury', 'Merino Wool', 'Designer', 'Italian']
  },
  {
    id: 'prod-5',
    name: 'Smart Barista Precision Espresso Machine',
    slug: 'smart-barista-espresso-machine',
    brand: 'AromaCraft',
    category: 'home-appliances',
    price: 499.00,
    originalPrice: 650.00,
    discountPercentage: 23,
    rating: 4.92,
    reviewCount: 390,
    stockCount: 15,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Chicago Distribution Center',
    description: 'Commercial-grade 15-bar Italian pump with digital PID temperature stability, integrated conical burr grinder with 30 micro-settings, and manual micro-foam steam wand for third-wave specialty coffee.',
    highlights: [
      '15-Bar ThermoJet High-Pressure Extraction',
      'Digital PID Temperature Control within ±1°C',
      'Built-in Stainless Steel Conical Burr Grinder',
      'Hands-Free Portafilter Dosing Cradle',
      'Powerful 360-Degree Swivel Microfoam Steam Wand'
    ],
    specs: {
      'Water Tank Capacity': '2.0 Liters',
      'Bean Hopper': '250g Airtight',
      'Pressure': '15 Bar Italian Pump',
      'Power': '1600W ThermoJet'
    },
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Brushed Stainless', hex: '#94a3b8', imageIndex: 0 },
      { name: 'Matte Black', hex: '#0f172a', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-4',
      name: 'CoffeeLab Equipment',
      rating: 4.96,
      totalSales: 9400,
      verified: true,
      responseTime: 'Under 15 mins',
      location: 'Seattle, WA',
      joinedDate: 'Feb 2019'
    },
    reviews: [
      {
        id: 'rev-6',
        userName: 'Chloe Bennett',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Pulls cafe-level espresso shots with thick golden crema. Steaming milk for latte art is seamless.',
        verifiedPurchase: true,
        helpfulCount: 52
      }
    ],
    deliveryEstimateDays: 2,
    isFeatured: true,
    tags: ['Espresso', 'PID Control', 'Coffee', 'Kitchen']
  },
  {
    id: 'prod-6',
    name: 'Advanced Botanical Hyaluronic Serum 50ml',
    slug: 'advanced-botanical-hyaluronic-serum',
    brand: 'Lumiere Organics',
    category: 'beauty',
    price: 45.00,
    originalPrice: 68.00,
    discountPercentage: 34,
    rating: 4.88,
    reviewCount: 512,
    stockCount: 88,
    condition: 'New',
    location: 'West Coast Beauty Hub, CA',
    description: 'Formulated with multi-molecular weight Hyaluronic Acid, Vitamin C ester, and Swiss Alpine Rose extract. Plumps skin, boosts cellular hydration, and restores radiant youthful firmness.',
    highlights: [
      'Triple-Molecular Hyaluronic Acid for deep-layer hydration',
      'Stabilized 15% Vitamin C Antioxidant Complex',
      '100% Vegan, Cruelty-Free, Paraben & Fragrance Free',
      'Dermatologist Tested for Sensitive Skin'
    ],
    specs: {
      'Volume': '50ml (1.7 fl. oz.)',
      'Skin Type': 'All Skin Types including sensitive',
      'Key Ingredients': 'Hyaluronic Acid, Niacinamide, Rosehip'
    },
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel-5',
      name: 'Lumiere Beauty Labs',
      rating: 4.91,
      totalSales: 18900,
      verified: true,
      responseTime: 'Under 30 mins',
      location: 'Los Angeles, CA',
      joinedDate: 'May 2021'
    },
    reviews: [
      {
        id: 'rev-7',
        userName: 'Camila Rodriguez',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '4 days ago',
        comment: 'Absorbs instantly without feeling sticky. My skin feels bouncy and radiant within 3 days!',
        verifiedPurchase: true,
        helpfulCount: 31
      }
    ],
    deliveryEstimateDays: 1,
    isRecommended: true,
    tags: ['Skincare', 'Hydration', 'Organic', 'Clean Beauty']
  },
  {
    id: 'prod-7',
    name: 'Artisan Organic Fairtrade Coffee & Gourmet Pantry Bundle',
    slug: 'artisan-organic-coffee-bundle',
    brand: 'Heritage Harvest',
    category: 'groceries',
    price: 38.50,
    originalPrice: 48.00,
    discountPercentage: 20,
    rating: 4.79,
    reviewCount: 220,
    stockCount: 45,
    condition: 'New',
    location: 'Organic Farmers Network, OR',
    description: 'Freshly roasted whole-bean specialty Arabica coffee beans paired with organic wild blossom raw honey, cold-pressed virgin olive oil, and hand-harvested sea salt.',
    highlights: [
      'Direct-Trade Single-Origin Ethiopian & Colombian Beans',
      'Raw Unfiltered Wildflower Honey (16 oz)',
      'First Cold Pressed Extra Virgin Olive Oil from Greece',
      '100% Certified USDA Organic'
    ],
    specs: {
      'Coffee Roast': 'Medium Roast Whole Bean (1 lb)',
      'Honey': '16 oz Glass Jar',
      'Olive Oil': '500ml Dark Glass Bottle'
    },
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel-6',
      name: 'Heritage Farm Co-Op',
      rating: 4.85,
      totalSales: 8700,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Portland, OR',
      joinedDate: 'Jul 2020'
    },
    reviews: [
      {
        id: 'rev-8',
        userName: 'Liam Gallagher',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '6 days ago',
        comment: 'The roast date was only 3 days before it arrived at my door! Incredible aroma notes of chocolate and berry.',
        verifiedPurchase: true,
        helpfulCount: 18
      }
    ],
    deliveryEstimateDays: 1,
    tags: ['Organic', 'Fresh', 'Specialty Coffee', 'Pantry']
  },
  {
    id: 'prod-8',
    name: 'Titanium Chrono Smartwatch with Sapphire Crystal',
    slug: 'titanium-chrono-smartwatch',
    brand: 'Chronos Precision',
    category: 'accessories',
    price: 320.00,
    originalPrice: 420.00,
    discountPercentage: 24,
    rating: 4.93,
    reviewCount: 470,
    stockCount: 28,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 14 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'Aerospace-grade Grade 5 titanium case with unscratchable sapphire crystal glass. Features advanced ECG heart rate monitoring, dual-band GPS, 100m water resistance, and 14-day battery life.',
    highlights: [
      'Grade 5 Aerospace Titanium & Sapphire Crystal Lens',
      'Dual-Frequency Multi-GNSS Precise Satellite Tracking',
      'Clinical-Grade ECG & SpO2 Blood Oxygen Monitoring',
      '10 ATM (100-meter) Diving Water Resistance',
      '14-Day Continuous Battery on a Single Wireless Charge'
    ],
    specs: {
      'Case Size': '46mm Titanium',
      'Display': '1.43" AMOLED 466x466 pixels (1000 nits)',
      'Battery': 'Up to 14 Days',
      'Sensors': 'ECG, Optical PPG, Barometer, Compass'
    },
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Brushed Titanium', hex: '#64748b', imageIndex: 0 },
      { name: 'Obsidian Black', hex: '#0f172a', imageIndex: 1 }
    ],
    variations: [
      { name: 'Strap Material', options: ['Titanium Link', 'Italian Leather', 'Fluoroelastomer Sport'] }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-9',
        userName: 'Alexandre Meyer',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Looks like a classic Swiss luxury timepiece but packs full smart health telemetry. Battery genuinely lasts two weeks.',
        verifiedPurchase: true,
        helpfulCount: 64
      }
    ],
    deliveryEstimateDays: 2,
    isFeatured: true,
    isRecommended: true,
    tags: ['Smartwatch', 'Titanium', 'Sapphire', 'Fitness']
  },
  {
    id: 'prod-9',
    name: 'Certified Refurbished Pro Tablet 12.9" 256GB Wi-Fi',
    slug: 'refurbished-pro-tablet-12-9',
    brand: 'NovaTech',
    category: 'phones',
    price: 649.00,
    originalPrice: 999.00,
    discountPercentage: 35,
    rating: 4.75,
    reviewCount: 185,
    stockCount: 8,
    condition: 'Refurbished',
    location: 'Certified Renewal Facility, TX',
    description: 'Factory certified refurbished with pristine cosmetic condition, brand new battery, original accessories, and a full 1-year comprehensive warranty.',
    highlights: [
      'Liquid Retina XDR Mini-LED 120Hz ProMotion display',
      'Next-Gen High Performance Octa-Core Chip',
      'Includes 1-Year Comprehensive Warranty & Original Charger',
      'Passes 100-Point Hardware Quality Assurance Test'
    ],
    specs: {
      'Condition Grade': 'Grade A+ Pristine (Zero Scratches)',
      'Display': '12.9" Liquid Retina XDR Mini-LED',
      'Storage': '256GB',
      'Battery Health': '100% Brand New Cell'
    },
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-10',
        userName: 'Hannah Kim',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Cannot tell the difference from brand new. Battery cycle count was 0 and screen is pristine.',
        verifiedPurchase: true,
        helpfulCount: 22
      }
    ],
    deliveryEstimateDays: 2,
    tags: ['Refurbished', 'Value Deal', 'Tablet', 'Warranty']
  },
  {
    id: 'prod-10',
    name: 'Open Box Smart 4K UHD OLED 65" Cinema TV',
    slug: 'open-box-oled-65-cinema-tv',
    brand: 'VisionPlus',
    category: 'electronics',
    price: 1350.00,
    originalPrice: 1999.00,
    discountPercentage: 32,
    rating: 4.82,
    reviewCount: 96,
    stockCount: 4,
    condition: 'Open Box',
    location: 'East Coast Clearance Depot, NJ',
    description: 'Customer return in open box condition, fully tested and repackaged with all remotes and stand mounts. Features self-lit OLED pixels for infinite contrast and Dolby Vision IQ.',
    highlights: [
      '65-inch Self-Lit OLED 4K (3840 x 2160) 120Hz',
      'Dolby Vision IQ & Dolby Atmos 60W Speaker System',
      'HDMI 2.1 with VRR, ALLM & G-Sync for next-gen gaming',
      'Open box inspected, flawless panel without dead pixels'
    ],
    specs: {
      'Screen Size': '65 Inches',
      'Display Tech': 'Self-Emitting OLED',
      'Refresh Rate': '120Hz Native',
      'HDMI Ports': '4x HDMI 2.1'
    },
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel-2',
      name: 'SoundCraft Pro Audio',
      rating: 4.95,
      totalSales: 15300,
      verified: true,
      responseTime: 'Instant',
      location: 'Boston, MA',
      joinedDate: 'Mar 2020'
    },
    reviews: [
      {
        id: 'rev-11',
        userName: 'Robert Miller',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 month ago',
        comment: 'Saved $650 on this open box deal! The blacks are pitch dark and movies look stunning.',
        verifiedPurchase: true,
        helpfulCount: 35
      }
    ],
    deliveryEstimateDays: 3,
    tags: ['OLED', '4K TV', 'Open Box', 'Clearance']
  },
  {
    id: 'prod-11',
    name: 'Ergonomic Mesh Pro Executive Office Chair',
    slug: 'ergonomic-mesh-office-chair',
    brand: 'ErgoComfort',
    category: 'home-appliances',
    price: 319.00,
    originalPrice: 450.00,
    discountPercentage: 29,
    rating: 4.87,
    reviewCount: 340,
    stockCount: 16,
    condition: 'New',
    location: 'Midwest Furniture Hub, IL',
    description: 'Dynamic 3D lumbar support system that automatically responds to your spine curve, 4D adjustable armrests, breathable Korean high-tensile mesh, and 135-degree recline mechanism.',
    highlights: [
      'Adaptive Dynamic Lumbar Spine Support',
      '4D Multi-directional Armrests (Height, Angle, Depth)',
      'Breathable High-Tensile Polymer Mesh',
      'Class-4 Heavy Duty SGS Certified Gas Lift (up to 350 lbs)'
    ],
    specs: {
      'Weight Capacity': '350 lbs (160 kg)',
      'Recline Angle': '90° to 135°',
      'Materials': 'Korean Mesh & Aluminum Alloy'
    },
    images: [
      'https://images.unsplash.com/photo-1580481077195-c3a8a30f7299?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Executive Graphite', hex: '#1e293b', imageIndex: 0 },
      { name: 'Silver Grey', hex: '#94a3b8', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-4',
      name: 'CoffeeLab & Living',
      rating: 4.96,
      totalSales: 9400,
      verified: true,
      responseTime: 'Under 15 mins',
      location: 'Chicago, IL',
      joinedDate: 'Feb 2019'
    },
    reviews: [
      {
        id: 'rev-12',
        userName: 'Rachel Adams',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Cured my lower back fatigue during 10-hour remote work days. Solid build and easy assembly.',
        verifiedPurchase: true,
        helpfulCount: 49
      }
    ],
    deliveryEstimateDays: 2,
    tags: ['Ergonomic', 'Work From Home', 'Comfort', 'Chair']
  },
  {
    id: 'prod-12',
    name: 'Minimalist Handcrafted Full-Grain Leather Backpack',
    slug: 'handcrafted-leather-backpack',
    brand: 'Vanguard Leatherworks',
    category: 'accessories',
    price: 165.00,
    originalPrice: 220.00,
    discountPercentage: 25,
    rating: 4.9,
    reviewCount: 290,
    stockCount: 20,
    condition: 'New',
    location: 'Craftsman Workshop, TX',
    description: 'Hand-stitched from vegetable-tanned full-grain leather that patinas beautifully over time. Padded compartment fits up to 16-inch laptops with weather-resistant YKK brass zippers.',
    highlights: [
      '100% Full-Grain Vegetable-Tanned Cowhide Leather',
      'Padded Laptop Compartment (Fits up to 16" Laptops)',
      'Solid Brass Hardware & Japanese YKK Zippers',
      'Hidden Anti-Theft Back Passport Pocket'
    ],
    specs: {
      'Dimensions': '42cm x 30cm x 14cm',
      'Capacity': '20 Liters',
      'Laptop Sleeve': 'Up to 16 Inches'
    },
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Cognac Brown', hex: '#78350f', imageIndex: 0 },
      { name: 'Midnight Charcoal', hex: '#1c1917', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-3',
      name: 'Milanese Couture Boutique',
      rating: 4.88,
      totalSales: 6200,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Milan, Italy',
      joinedDate: 'Aug 2022'
    },
    reviews: [
      {
        id: 'rev-13',
        userName: 'Daniel Sterling',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'The leather smells incredible and the stitching is indestructible. Perfect daily commuter pack.',
        verifiedPurchase: true,
        helpfulCount: 28
      }
    ],
    deliveryEstimateDays: 2,
    tags: ['Full Grain', 'Leather', 'Laptop Bag', 'Handcrafted']
  },
  {
    id: 'prod-13',
    name: 'Sony WH-1000XM5 Wireless Industry-Leading Noise Cancelling Headphones',
    slug: 'sony-wh1000xm5-wireless-headphones',
    brand: 'Sony',
    category: 'electronics',
    price: 398.00,
    originalPrice: 449.99,
    discountPercentage: 12,
    rating: 4.91,
    reviewCount: 1420,
    stockCount: 180,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 20 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'Two processors and 8 microphones for unprecedented noise cancellation. Auto NC Optimizer automatically optimizes noise cancelling based on wearing conditions and environment. Magnificent sound quality with 30-hour battery life.',
    highlights: [
      'Industry-leading noise cancellation optimized to you',
      'Magnificent Sound, engineered to perfection with Integrated Processor V1',
      'Crystal clear hands-free calling with 4 beamforming microphones',
      'Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)'
    ],
    specs: {
      'Battery Life': 'Up to 30 Hours',
      'Microphones': '8 Beamforming Mics',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.2 / 3.5mm Aux'
    },
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Silver Platinum', hex: '#e2e8f0', imageIndex: 0 },
      { name: 'Black Velvet', hex: '#0f172a', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-14',
        userName: 'Jordan Davis',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 day ago',
        comment: 'Best ANC on the market hands down. The microphone clarity during work zoom calls is phenomenal.',
        verifiedPurchase: true,
        helpfulCount: 52
      }
    ],
    deliveryEstimateDays: 1,
    isFeatured: true,
    isRecommended: true,
    tags: ['Sony', 'ANC', 'Hi-Res', 'Headphones', 'Best Seller']
  },
  {
    id: 'prod-14',
    name: 'Apple iPad Air 11-inch M2 Liquid Retina Display 128GB Wi-Fi',
    slug: 'apple-ipad-air-m2-11-inch',
    brand: 'Apple',
    category: 'phones',
    price: 599.00,
    originalPrice: 699.00,
    discountPercentage: 14,
    rating: 4.94,
    reviewCount: 980,
    stockCount: 220,
    isFlashSale: false,
    condition: 'New',
    location: 'West Distribution Center, CA',
    description: 'Supercharged by the incredibly fast Apple M2 chip. It features a brilliant 11-inch Liquid Retina display, a new landscape camera perfect for FaceTime and video calls, and superfast Wi-Fi 6E.',
    highlights: [
      '11-inch Liquid Retina display with True Tone and P3 wide color',
      'Apple M2 chip with 8-core CPU and 10-core GPU',
      'Landscape 12MP Ultra Wide front camera with Center Stage',
      'Works with Apple Pencil Pro and Magic Keyboard'
    ],
    specs: {
      'Display': '11-inch LED-backlit Liquid Retina',
      'Processor': 'Apple M2 Chip',
      'Storage': '128GB / 256GB / 512GB',
      'Weight': '462 grams'
    },
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Space Gray', hex: '#475569', imageIndex: 0 },
      { name: 'Starlight Gold', hex: '#fef08a', imageIndex: 1 }
    ],
    variations: [
      { name: 'Storage', options: ['128GB', '256GB', '512GB', '1TB'] }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-15',
        userName: 'Clara Oswald',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'The M2 speed is lightning fast. Sketching on Procreate with the Apple Pencil Pro feels like real paper.',
        verifiedPurchase: true,
        helpfulCount: 41
      }
    ],
    deliveryEstimateDays: 2,
    isFeatured: true,
    tags: ['iPad', 'Apple', 'M2', 'Tablet', 'Drawing']
  },
  {
    id: 'prod-15',
    name: 'Dell XPS 16 OLED InfinityEdge 4K Laptop (Intel Core Ultra 9)',
    slug: 'dell-xps-16-oled-laptop',
    brand: 'Dell',
    category: 'computers',
    price: 2199.00,
    originalPrice: 2499.00,
    discountPercentage: 12,
    rating: 4.86,
    reviewCount: 415,
    stockCount: 65,
    isFlashSale: false,
    condition: 'New',
    location: 'West Distribution Center, CA',
    description: 'Iconic design crafted with CNC machined aluminum and Gorilla Glass 3. Powered by Intel Core Ultra 9 with AI acceleration, NVIDIA GeForce RTX 4070 Graphics, and a 4K+ OLED Touch display.',
    highlights: [
      '16.3-inch 4K+ (3840 x 2400) OLED 120Hz Touch Display',
      'Intel Core Ultra 9 185H with dedicated NPU AI engine',
      'NVIDIA GeForce RTX 4070 8GB GDDR6 Laptop GPU',
      'Quad-speaker design with 10W output tuned by Grammy winners'
    ],
    specs: {
      'CPU': 'Intel Core Ultra 9 185H',
      'GPU': 'NVIDIA RTX 4070 8GB',
      'RAM': '32GB LPDDR5X 7467MHz',
      'Storage': '2TB PCIe Gen4 SSD',
      'Display': '16.3" 4K+ OLED Touch'
    },
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Platinum Silver', hex: '#e2e8f0', imageIndex: 0 },
      { name: 'Graphite Dark', hex: '#1e293b', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-16',
        userName: 'Vikram Patel',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'The OLED panel is unreal for color grading and 4K rendering. Premium build quality.',
        verifiedPurchase: true,
        helpfulCount: 30
      }
    ],
    deliveryEstimateDays: 2,
    isFeatured: true,
    tags: ['Dell', 'XPS', 'OLED', 'RTX 4070', 'Laptop']
  },
  {
    id: 'prod-16',
    name: 'Nike Air Max Pulse Roam Trail & Urban Running Sneakers',
    slug: 'nike-air-max-pulse-roam-sneakers',
    brand: 'Nike',
    category: 'fashion',
    price: 140.00,
    originalPrice: 175.00,
    discountPercentage: 20,
    rating: 4.82,
    reviewCount: 530,
    stockCount: 310,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 16 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'Takes cues from London music underground scene to bring an edgy aesthetic to the iconic Air Max line. Point-loaded cushioning system features a plastic clip that distributes weight to targeted points on the Air unit.',
    highlights: [
      'Point-Loaded Air cushioning delivers bouncy responsiveness',
      'Textile upper with leather and synthetic overlays for breathability',
      'Rubber Waffle outsole provides durable multi-surface traction',
      'Foam midsole with reflective lace accents'
    ],
    specs: {
      'Sole Material': 'Rubber Waffle with Air Bag',
      'Upper': 'Ripstop Textile & Synthetic Suede',
      'Fit': 'True to Size',
      'Origin': 'Imported'
    },
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Bright Crimson', hex: '#dc2626', imageIndex: 0 },
      { name: 'Stealth Grey', hex: '#475569', imageIndex: 1 }
    ],
    variations: [
      { name: 'Shoe Size (US)', options: ['US 7.5', 'US 8.5', 'US 9.5', 'US 10.5', 'US 11.5', 'US 12'] }
    ],
    seller: {
      id: 'sel-3',
      name: 'Milanese Couture Boutique',
      rating: 4.88,
      totalSales: 6200,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Milan, Italy',
      joinedDate: 'Aug 2022'
    },
    reviews: [
      {
        id: 'rev-17',
        userName: 'Malik Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Super bouncy cushion feel. Walked 15 miles in NYC without any foot soreness.',
        verifiedPurchase: true,
        helpfulCount: 39
      }
    ],
    deliveryEstimateDays: 2,
    isRecommended: true,
    tags: ['Nike', 'Sneakers', 'Air Max', 'Streetwear', 'Running']
  },
  {
    id: 'prod-17',
    name: 'Dyson V15 Detect Absolute Cordless Smart Vacuum Cleaner',
    slug: 'dyson-v15-detect-cordless-vacuum',
    brand: 'Dyson',
    category: 'home-appliances',
    price: 649.99,
    originalPrice: 749.99,
    discountPercentage: 13,
    rating: 4.95,
    reviewCount: 760,
    stockCount: 95,
    isFlashSale: false,
    condition: 'New',
    location: 'Chicago Distribution Center',
    description: 'Dyson most intelligent cordless vacuum. Engineered with the power, intelligence, versatility, and run time to deep clean your whole home. Piezo sensor continuously sizes and counts dust particles.',
    highlights: [
      'Fluffy Optic cleaner head reveals invisible micro-dust',
      'A piezo sensor counts and measures the size of dust particles',
      'Up to 60 minutes of fade-free suction with digital motor',
      'Advanced whole-machine filtration traps 99.99% of particles down to 0.3 microns'
    ],
    specs: {
      'Suction Power': '240 AW',
      'Bin Volume': '0.77 Liters',
      'Run Time': 'Up to 60 Minutes',
      'Charge Time': '4.5 Hours'
    },
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Yellow & Iron', hex: '#eab308', imageIndex: 0 },
      { name: 'Nickel & Copper', hex: '#b45309', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-4',
      name: 'CoffeeLab & Living',
      rating: 4.96,
      totalSales: 9400,
      verified: true,
      responseTime: 'Under 15 mins',
      location: 'Chicago, IL',
      joinedDate: 'Feb 2019'
    },
    reviews: [
      {
        id: 'rev-18',
        userName: 'Samantha Ray',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '4 days ago',
        comment: 'The laser headlight is both satisfying and horrifying - you see every speck of pet hair.',
        verifiedPurchase: true,
        helpfulCount: 68
      }
    ],
    deliveryEstimateDays: 2,
    isFeatured: true,
    tags: ['Dyson', 'Vacuum', 'Smart Home', 'Cordless', 'Deep Clean']
  },
  {
    id: 'prod-18',
    name: 'Estée Lauder Advanced Night Repair Synchronized Recovery Complex 100ml',
    slug: 'estee-lauder-advanced-night-repair-100ml',
    brand: 'Estée Lauder',
    category: 'beauty',
    price: 115.00,
    originalPrice: 155.00,
    discountPercentage: 25,
    rating: 4.92,
    reviewCount: 1120,
    stockCount: 260,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 22 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'West Coast Beauty Hub, CA',
    description: 'The #1 serum in the US. Deep- and fast-penetrating face serum with patented Chronolux Power Signal Technology to reduce the look of multiple signs of aging caused by the environmental assaults of modern life.',
    highlights: [
      'Chronolux Power Signal Technology boosts skin natural renewal',
      '72-hour hydration with high-dose Hyaluronic Acid',
      '8-hour anti-oxidant protection against free radicals',
      'Strengthens skin barrier in just 4 hours'
    ],
    specs: {
      'Volume': '100ml Jumbo Size',
      'Application': 'Night & Morning',
      'Skin Type': 'All Skin Types'
    },
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel-5',
      name: 'Lumiere Beauty Labs',
      rating: 4.91,
      totalSales: 18900,
      verified: true,
      responseTime: 'Under 30 mins',
      location: 'Los Angeles, CA',
      joinedDate: 'May 2021'
    },
    reviews: [
      {
        id: 'rev-19',
        userName: 'Aaliyah Bennett',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Holy grail night serum. Waking up with glassy, smooth hydrated skin is priceless.',
        verifiedPurchase: true,
        helpfulCount: 77
      }
    ],
    deliveryEstimateDays: 1,
    isRecommended: true,
    tags: ['Estee Lauder', 'Serum', 'Anti-Aging', 'Luxury Skincare']
  },
  {
    id: 'prod-19',
    name: 'Organic Grade A Japanese Ceremonial Uji Matcha Powder 100g Tin',
    slug: 'japanese-ceremonial-uji-matcha-powder',
    brand: 'Uji Teahouse Kyoto',
    category: 'groceries',
    price: 32.00,
    originalPrice: 42.00,
    discountPercentage: 23,
    rating: 4.96,
    reviewCount: 640,
    stockCount: 420,
    isFlashSale: false,
    condition: 'New',
    location: 'Organic Farmers Network, OR',
    description: 'First harvest stone-ground green tea leaves from shaded family tea gardens in Uji, Kyoto. Vibrant electric emerald green color with velvety umami sweetness and zero bitterness.',
    highlights: [
      '100% First Harvest Single-Estate Tencha Leaves from Uji, Kyoto',
      'Slow Stone-Ground at low temperatures to preserve L-theanine',
      'Certified JAS and USDA Organic with zero additives',
      'Airtight gold foil pull-tab freshness seal tin'
    ],
    specs: {
      'Net Weight': '100 grams (approx. 50 servings)',
      'Grade': 'Ceremonial Grade Pinnacle',
      'Origin': 'Uji, Kyoto, Japan'
    },
    images: [
      'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel-6',
      name: 'Heritage Farm Co-Op',
      rating: 4.85,
      totalSales: 8700,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Portland, OR',
      joinedDate: 'Jul 2020'
    },
    reviews: [
      {
        id: 'rev-20',
        userName: 'Kenji Sato',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '6 days ago',
        comment: 'Electric green froth with rich buttery sweetness. Authentic Kyoto quality shipped fresh.',
        verifiedPurchase: true,
        helpfulCount: 45
      }
    ],
    deliveryEstimateDays: 1,
    isFeatured: true,
    tags: ['Matcha', 'Japanese', 'Organic', 'Tea', 'Superfood']
  },
  {
    id: 'prod-20',
    name: 'Ray-Ban Polarized Wayfarer Classic Sunglasses with UV400 Protection',
    slug: 'ray-ban-polarized-wayfarer-classic',
    brand: 'Ray-Ban',
    category: 'accessories',
    price: 168.00,
    originalPrice: 210.00,
    discountPercentage: 20,
    rating: 4.89,
    reviewCount: 890,
    stockCount: 190,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 15 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'The most recognizable style in the history of sunglasses. First designed in 1952, Wayfarers gained popularity among celebrities, musicians, and artists. Polarized G-15 crystal lenses eliminate 99% of reflected glare.',
    highlights: [
      'Polarized green G-15 mineral glass lenses for true color perception',
      '100% UV400 ultraviolet solar radiation protection',
      'Handcrafted Italian acetate frames with silver hinge rivets',
      'Includes authentic Ray-Ban leather case and microfiber cloth'
    ],
    specs: {
      'Frame Material': 'Polished Black Acetate',
      'Lens Technology': 'Polarized Crystal Green G-15',
      'Bridge / Lens Size': '50mm / 22mm',
      'Origin': 'Made in Italy'
    },
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Classic Black G-15', hex: '#0f172a', imageIndex: 0 },
      { name: 'Tortoise Brown', hex: '#78350f', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-3',
      name: 'Milanese Couture Boutique',
      rating: 4.88,
      totalSales: 6200,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Milan, Italy',
      joinedDate: 'Aug 2022'
    },
    reviews: [
      {
        id: 'rev-21',
        userName: 'Tom Hiddleston',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Timeless classic. Crystal lenses are crisp, scratch-resistant, and cut out water glare completely.',
        verifiedPurchase: true,
        helpfulCount: 58
      }
    ],
    deliveryEstimateDays: 2,
    isRecommended: true,
    tags: ['Ray-Ban', 'Polarized', 'Eyewear', 'Classic', 'Sunglasses']
  },
  {
    id: 'prod-21',
    name: 'Samsung Galaxy S24 Ultra 5G AI Smartphone 512GB (Titanium Gray)',
    slug: 'samsung-galaxy-s24-ultra-5g-512gb',
    brand: 'Samsung',
    category: 'phones',
    price: 1199.99,
    originalPrice: 1419.99,
    discountPercentage: 15,
    rating: 4.93,
    reviewCount: 1350,
    stockCount: 175,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'Unleash new levels of creativity and productivity with Galaxy AI. Features a built-in S Pen stylus, titanium exterior shield, 200MP camera with 100x Space Zoom, and Snapdragon 8 Gen 3 for Galaxy.',
    highlights: [
      '6.8-inch Dynamic AMOLED 2X 120Hz Flat Display with Corning Gorilla Armor',
      'Galaxy AI features: Circle to Search, Live Translate, Note Assist',
      '200MP Quad Telephoto Camera with 5x optical and 100x digital zoom',
      'Built-in S Pen stylus with Bluetooth remote actions'
    ],
    specs: {
      'Display': '6.8" QHD+ Dynamic AMOLED 2X (2600 nits)',
      'RAM & Storage': '12GB RAM / 512GB Storage',
      'Battery': '5000mAh with 45W Fast Charging',
      'Stylus': 'Embedded S Pen'
    },
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Titanium Gray', hex: '#64748b', imageIndex: 0 },
      { name: 'Titanium Black', hex: '#0f172a', imageIndex: 1 }
    ],
    variations: [
      { name: 'Storage', options: ['256GB', '512GB', '1TB'] }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-22',
        userName: 'Evelyn Taylor',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'The anti-reflective glass screen is astonishing outdoors. Galaxy AI photo editing is like magic.',
        verifiedPurchase: true,
        helpfulCount: 62
      }
    ],
    deliveryEstimateDays: 1,
    isFeatured: true,
    tags: ['Samsung', 'S24 Ultra', '5G', 'Flagship', 'Galaxy AI']
  },
  {
    id: 'prod-22',
    name: 'Logitech MX Master 3S Wireless Performance Mouse 8K DPI',
    slug: 'logitech-mx-master-3s-mouse',
    brand: 'Logitech',
    category: 'computers',
    price: 89.99,
    originalPrice: 99.99,
    discountPercentage: 10,
    rating: 4.95,
    reviewCount: 2100,
    stockCount: 380,
    isFlashSale: false,
    condition: 'New',
    location: 'West Distribution Center, CA',
    description: 'An icon remastered. Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and an 8,000 DPI track-on-glass optical sensor.',
    highlights: [
      '8,000 DPI Darkfield sensor tracks on any surface including glass',
      'Quiet Click switches reduce 90% click noise while keeping tactile bump',
      'MagSpeed Electromagnetic scrolling shifts from line-by-line to 1000 lines/sec',
      'Ergonomic hand-sculpted silhouette with thumb wheel control'
    ],
    specs: {
      'Sensor': 'Darkfield High Precision (200-8000 DPI)',
      'Battery': '70 Days on full charge / 3 min quick charge',
      'Connectivity': 'Bluetooth Low Energy & Logi Bolt USB'
    },
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Graphite Black', hex: '#1e293b', imageIndex: 0 },
      { name: 'Pale Grey', hex: '#e2e8f0', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-23',
        userName: 'Lucas Scott',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Cannot work without this mouse. The frictionless metal scroll wheel and horizontal thumb scroll are essential.',
        verifiedPurchase: true,
        helpfulCount: 94
      }
    ],
    deliveryEstimateDays: 1,
    isRecommended: true,
    tags: ['Logitech', 'Mouse', 'Ergonomic', 'MX Master', 'Productivity']
  },
  {
    id: 'prod-23',
    name: 'Bose QuietComfort Ultra Spatial Audio Bluetooth Earbuds',
    slug: 'bose-quietcomfort-ultra-earbuds',
    brand: 'Bose',
    category: 'electronics',
    price: 249.00,
    originalPrice: 299.00,
    discountPercentage: 17,
    rating: 4.87,
    reviewCount: 840,
    stockCount: 210,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 19 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'East Coast Logistics Hub',
    description: 'Groundbreaking spatial audio for more immersive listening that makes your music feel realer than ever before. World-class noise cancellation calibrated to the unique shape of your ears.',
    highlights: [
      'Bose Immersive Spatial Audio places sound right in front of you',
      'CustomTune technology automatically personalizes sound and ANC to your ears',
      '3 listening modes: Quiet Mode, Aware Mode, and Immersion Mode',
      'Up to 6 hours listening (24 hours total with wireless charging case)'
    ],
    specs: {
      'Battery Life': '6 hours earbuds + 18 hours case',
      'Water Resistance': 'IPX4 Sweat & Splash Resistant',
      'Bluetooth': 'Bluetooth 5.3 with Snapdragon Sound'
    },
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Triple Black', hex: '#0f172a', imageIndex: 0 },
      { name: 'White Smoke', hex: '#f1f5f9', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-2',
      name: 'SoundCraft Pro Audio',
      rating: 4.95,
      totalSales: 15300,
      verified: true,
      responseTime: 'Instant',
      location: 'Boston, MA',
      joinedDate: 'Mar 2020'
    },
    reviews: [
      {
        id: 'rev-24',
        userName: 'Zoe Kravitz',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'Cancels out subway rumble completely. The umbrella ear tips seal comfortably without ear canal pressure.',
        verifiedPurchase: true,
        helpfulCount: 46
      }
    ],
    deliveryEstimateDays: 1,
    isFeatured: true,
    tags: ['Bose', 'Earbuds', 'ANC', 'Spatial Audio', 'Wireless']
  },
  {
    id: 'prod-24',
    name: 'Ninja Foodi Smart XL 6-in-1 Indoor Grill & 4-Quart Air Fryer',
    slug: 'ninja-foodi-smart-xl-indoor-grill',
    brand: 'Ninja',
    category: 'home-appliances',
    price: 199.99,
    originalPrice: 259.99,
    discountPercentage: 23,
    rating: 4.91,
    reviewCount: 910,
    stockCount: 130,
    isFlashSale: false,
    condition: 'New',
    location: 'Chicago Distribution Center',
    description: 'The Smart XL grill that sears, sizzles, and air fry crisps. Innovative Smart Cook System with Foodi Smart Thermometer achieves the perfect doneness from rare to well-done at the touch of a button.',
    highlights: [
      '500°F Cyclonic Grilling technology for authentic char-grilled flavor',
      'Foodi Smart Thermometer with 4 smart protein settings & 9 doneness levels',
      '6-in-1 Cooking: Grill, Air Crisp, Roast, Bake, Broil, and Dehydrate',
      'Smoke Control System keeps indoor kitchen smoke-free'
    ],
    specs: {
      'Capacity': 'XL 9" x 12" High-Density Grill Grate (Fits 6 Steaks)',
      'Power': '1760 Watts',
      'Temperature Range': '105°F to 500°F'
    },
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Brushed Stainless & Black', hex: '#64748b', imageIndex: 0 }
    ],
    seller: {
      id: 'sel-4',
      name: 'CoffeeLab & Living',
      rating: 4.96,
      totalSales: 9400,
      verified: true,
      responseTime: 'Under 15 mins',
      location: 'Chicago, IL',
      joinedDate: 'Feb 2019'
    },
    reviews: [
      {
        id: 'rev-25',
        userName: 'Gordon Miller',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '4 days ago',
        comment: 'Steaks come out medium-rare edge to edge with restaurant grill marks without setting off smoke alarms.',
        verifiedPurchase: true,
        helpfulCount: 73
      }
    ],
    deliveryEstimateDays: 2,
    isRecommended: true,
    tags: ['Ninja', 'Air Fryer', 'Grill', 'Kitchen', 'Smart Cook']
  },
  {
    id: 'prod-25',
    name: 'Apple iPhone 16 Pro Max 256GB Desert Titanium',
    slug: 'apple-iphone-16-pro-max-256gb',
    brand: 'Apple',
    category: 'phones',
    price: 1199.00,
    originalPrice: 1299.00,
    discountPercentage: 8,
    rating: 4.96,
    reviewCount: 1850,
    stockCount: 160,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 26 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'Featuring a stunning titanium design, Camera Control button, 4K 120 fps Dolby Vision, and the lightning-fast A18 Pro chip with Apple Intelligence.',
    highlights: [
      '6.9-inch Super Retina XDR display with ProMotion up to 120Hz',
      'A18 Pro chip with 6-core GPU powering Apple Intelligence',
      '48MP Fusion camera with 5x optical zoom Telephoto lens',
      'Camera Control button for instant exposure and depth capture'
    ],
    specs: {
      'Display': '6.9" Super Retina XDR OLED',
      'Processor': 'Apple A18 Pro',
      'Storage': '256GB / 512GB / 1TB',
      'Battery': 'Up to 33 hours video playback'
    },
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Desert Titanium', hex: '#c5a085', imageIndex: 0 },
      { name: 'Natural Titanium', hex: '#94948f', imageIndex: 1 }
    ],
    variations: [
      { name: 'Storage', options: ['256GB', '512GB', '1TB'] }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-26',
        userName: 'David Miller',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 day ago',
        comment: 'Camera Control button makes shooting 4K video feel like handling a dedicated mirrorless camera.',
        verifiedPurchase: true,
        helpfulCount: 88
      }
    ],
    deliveryEstimateDays: 1,
    isFeatured: true,
    tags: ['Apple', 'iPhone', 'A18 Pro', 'Titanium', 'Flagship']
  },
  {
    id: 'prod-26',
    name: 'Google Pixel 9 Pro Fold 512GB Obsidian 8-inch Super Actua Flex Display',
    slug: 'google-pixel-9-pro-fold-512gb',
    brand: 'Google',
    category: 'phones',
    price: 1799.00,
    originalPrice: 1919.00,
    discountPercentage: 6,
    rating: 4.88,
    reviewCount: 420,
    stockCount: 85,
    isFlashSale: false,
    condition: 'New',
    location: 'West Distribution Center, CA',
    description: 'The thinnest foldable smartphone with an immersive 8-inch Super Actua Flex inner display. Powered by Google Tensor G4 with advanced Gemini AI assistants built directly into the operating system.',
    highlights: [
      '8-inch inner Super Actua Flex OLED display + 6.3-inch outer screen',
      'Google Tensor G4 processor with 16GB RAM for multitasking',
      'Triple rear camera system with 5x telephoto optical zoom',
      'Split-screen app multitasking with drag-and-drop workflow'
    ],
    specs: {
      'Main Display': '8.0" Super Actua Flex OLED 120Hz',
      'Cover Display': '6.3" Actua OLED 120Hz',
      'Processor': 'Google Tensor G4 with Titan M2',
      'RAM & Storage': '16GB RAM / 512GB Storage'
    },
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0f172a', imageIndex: 0 },
      { name: 'Porcelain White', hex: '#f8fafc', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-27',
        userName: 'Alex Wong',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Huge screen for reading PDFs and spreadsheets on the go. The hinge feels solid.',
        verifiedPurchase: true,
        helpfulCount: 34
      }
    ],
    deliveryEstimateDays: 2,
    isRecommended: true,
    tags: ['Google', 'Pixel', 'Foldable', 'Gemini AI', 'Android']
  },
  {
    id: 'prod-27',
    name: 'OnePlus 12 5G Hasselblad Camera 256GB Silky Black',
    slug: 'oneplus-12-5g-smartphone',
    brand: 'OnePlus',
    category: 'phones',
    price: 699.99,
    originalPrice: 799.99,
    discountPercentage: 13,
    rating: 4.87,
    reviewCount: 650,
    stockCount: 190,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 14 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'Powered by Snapdragon 8 Gen 3 with 4th Gen Hasselblad Camera System, 5400mAh massive battery with 80W SUPERVOOC ultra-fast charging.',
    highlights: [
      '4th Gen Hasselblad Camera for Mobile with Sony LYT-808 sensor',
      'Snapdragon 8 Gen 3 with Dual Cryo-velocity VC cooling',
      '5400mAh battery with 80W SUPERVOOC and 50W AIRVOOC wireless',
      '2K 120Hz ProXDR Display with Aqua Touch wet-finger detection'
    ],
    specs: {
      'Processor': 'Snapdragon 8 Gen 3',
      'Screen': '6.82" 2K 120Hz ProXDR AMOLED',
      'Charging': '80W Wired + 50W Wireless',
      'RAM & ROM': '12GB RAM + 256GB Storage'
    },
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Silky Black', hex: '#1e293b', imageIndex: 0 },
      { name: 'Flowy Emerald', hex: '#065f46', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-28',
        userName: 'Liam Cooper',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'Full 100% battery recharge in 30 minutes. The Hasselblad portrait mode depth of field is superb.',
        verifiedPurchase: true,
        helpfulCount: 42
      }
    ],
    deliveryEstimateDays: 1,
    isRecommended: true,
    tags: ['OnePlus', 'Hasselblad', 'Fast Charging', '5G', 'Android']
  },
  {
    id: 'prod-28',
    name: 'ASUS ROG Zephyrus G16 OLED Gaming Laptop (Intel Core Ultra 9 & RTX 4080)',
    slug: 'asus-rog-zephyrus-g16-gaming-laptop',
    brand: 'ASUS',
    category: 'computers',
    price: 2499.99,
    originalPrice: 2899.99,
    discountPercentage: 14,
    rating: 4.92,
    reviewCount: 310,
    stockCount: 75,
    isFlashSale: false,
    condition: 'New',
    location: 'West Distribution Center, CA',
    description: 'Precision CNC-machined aluminum chassis weighing just 1.85kg. Equipped with a ROG Nebula 2.5K 240Hz OLED display, NVIDIA GeForce RTX 4080 Laptop GPU, and Slash Lighting array on the lid.',
    highlights: [
      'ROG Nebula Display: 16" 2.5K OLED 240Hz 0.2ms with G-SYNC',
      'NVIDIA GeForce RTX 4080 12GB GDDR6 with MUX Switch & Advanced Optimus',
      'Intel Core Ultra 9 185H processor with AI Boost NPU',
      'Ultra-thin 1.49cm CNC unibody aluminum chassis'
    ],
    specs: {
      'CPU': 'Intel Core Ultra 9 185H',
      'GPU': 'NVIDIA RTX 4080 12GB',
      'RAM': '32GB LPDDR5X 7467MHz',
      'Storage': '2TB PCIe 4.0 NVMe SSD',
      'Display': '16.0" 2.5K OLED 240Hz'
    },
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Eclipse Gray', hex: '#334155', imageIndex: 0 },
      { name: 'Platinum White', hex: '#f8fafc', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-29',
        userName: 'Derrick Evans',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Runs Cyberpunk at 2.5K ultra ray tracing with butter smooth 100+ FPS. Gorgeous OLED colors.',
        verifiedPurchase: true,
        helpfulCount: 55
      }
    ],
    deliveryEstimateDays: 2,
    isFeatured: true,
    tags: ['ASUS', 'ROG', 'RTX 4080', 'Gaming Laptop', 'OLED']
  },
  {
    id: 'prod-29',
    name: 'Apple MacBook Air 15-inch M3 Midnight 16GB Unified Memory 512GB SSD',
    slug: 'apple-macbook-air-15-inch-m3',
    brand: 'Apple',
    category: 'computers',
    price: 1499.00,
    originalPrice: 1699.00,
    discountPercentage: 12,
    rating: 4.97,
    reviewCount: 1140,
    stockCount: 230,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 20 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'Impossibly thin and fast. Powered by the M3 chip with an 8-core CPU and 10-core GPU, Liquid Retina display, MagSafe 3 charging, and up to 18 hours of battery life.',
    highlights: [
      '15.3-inch Liquid Retina display with 500 nits brightness and P3 color',
      'Apple M3 chip with hardware-accelerated ray tracing',
      'Fanless completely silent design even during heavy workload',
      'Six-speaker sound system with Spatial Audio and Force-Cancelling Woofers'
    ],
    specs: {
      'Chip': 'Apple M3 (8-core CPU, 10-core GPU)',
      'Memory': '16GB Unified Memory',
      'Storage': '512GB SSD',
      'Weight': '1.51 kg'
    },
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Midnight Blue', hex: '#0f172a', imageIndex: 0 },
      { name: 'Space Gray', hex: '#475569', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-30',
        userName: 'Hannah Abbott',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '4 days ago',
        comment: 'Battery lasts two full workdays on a single charge. 15-inch display is perfect for side-by-side windows.',
        verifiedPurchase: true,
        helpfulCount: 91
      }
    ],
    deliveryEstimateDays: 1,
    isFeatured: true,
    isRecommended: true,
    tags: ['Apple', 'MacBook Air', 'M3', 'Laptop', 'Best Seller']
  },
  {
    id: 'prod-30',
    name: 'LG UltraGear 34-inch Curved OLED 240Hz WQHD Gaming Monitor',
    slug: 'lg-ultragear-34-curved-oled-monitor',
    brand: 'LG',
    category: 'computers',
    price: 899.99,
    originalPrice: 1199.99,
    discountPercentage: 25,
    rating: 4.91,
    reviewCount: 520,
    stockCount: 95,
    isFlashSale: false,
    condition: 'New',
    location: 'East Coast Logistics Hub',
    description: 'Immerse yourself in vivid gaming with LG 34GS95QE 800R curved OLED panel featuring 240Hz refresh rate, 0.03ms response time, DisplayHDR True Black 400, and NVIDIA G-SYNC compatibility.',
    highlights: [
      '34-inch 21:9 WQHD (3440 x 1440) 800R Curvature OLED display',
      'Ultra-fast 240Hz Refresh Rate & 0.03ms GtG Response Time',
      'DisplayHDR True Black 400 with 1,500,000:1 contrast ratio',
      'Anti-Glare & Low Reflection coating for glare-free gaming'
    ],
    specs: {
      'Panel Type': 'Curved OLED (800R)',
      'Resolution': '3440 x 1440 (WQHD 21:9)',
      'Refresh Rate': '240Hz',
      'Ports': '2x HDMI 2.1, 1x DisplayPort 1.4, USB Hub'
    },
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Hexagon Black RGB', hex: '#0f172a', imageIndex: 0 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-31',
        userName: 'Mason Clark',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'The 800R curve wraps around your peripheral vision completely. True blacks make space games look incredible.',
        verifiedPurchase: true,
        helpfulCount: 47
      }
    ],
    deliveryEstimateDays: 2,
    isRecommended: true,
    tags: ['LG', 'OLED', 'Gaming Monitor', '240Hz', 'Ultrawide']
  },
  {
    id: 'prod-31',
    name: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard (QMK/VIA CNC Aluminum)',
    slug: 'keychron-q1-pro-wireless-keyboard',
    brand: 'Keychron',
    category: 'computers',
    price: 199.00,
    originalPrice: 220.00,
    discountPercentage: 10,
    rating: 4.94,
    reviewCount: 780,
    stockCount: 210,
    isFlashSale: false,
    condition: 'New',
    location: 'West Distribution Center, CA',
    description: 'All-metal QMK/VIA wireless custom mechanical keyboard with double-gasket design, south-facing RGB, KSA profile double-shot PBT keycaps, and hot-swappable Keychron K Pro Banana Switches.',
    highlights: [
      '6063 CNC Machined Aluminum body with double-gasket sound dampening',
      'Bluetooth 5.1 wireless and Type-C wired connectivity',
      'Fully programmable via QMK and VIA web configurator',
      'Hot-swappable PCB supporting both 3-pin and 5-pin MX switches'
    ],
    specs: {
      'Layout': '75% Compact with Rotary Knob',
      'Switches': 'Keychron K Pro Banana Tactile',
      'Keycaps': 'Double-Shot KSA PBT',
      'Battery': '4000mAh (Up to 300 hours non-backlit)'
    },
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Carbon Black', hex: '#1e293b', imageIndex: 0 },
      { name: 'Silver Grey', hex: '#cbd5e1', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-32',
        userName: 'Rachel Green',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '6 days ago',
        comment: 'Hefty metal weight and that satisfying deep "thocky" typing sound right out of the box without any modding.',
        verifiedPurchase: true,
        helpfulCount: 63
      }
    ],
    deliveryEstimateDays: 2,
    isRecommended: true,
    tags: ['Keychron', 'Mechanical Keyboard', 'Custom', 'Wireless', 'Typing']
  },
  {
    id: 'prod-32',
    name: 'Sonos Era 300 Spatial Audio Smart Speaker with Dolby Atmos',
    slug: 'sonos-era-300-smart-speaker',
    brand: 'Sonos',
    category: 'electronics',
    price: 449.00,
    originalPrice: 499.00,
    discountPercentage: 10,
    rating: 4.93,
    reviewCount: 680,
    stockCount: 140,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'East Coast Logistics Hub',
    description: 'Feel sound all around you with spatial audio. Featuring six optimally positioned drivers all around the front, sides, and top to support Dolby Atmos Music, the breakthrough acoustic design projects sound from wall to wall and floor to ceiling.',
    highlights: [
      'Revolutionary acoustic architecture with 6 Class-D digital amplifiers',
      'Supports Dolby Atmos spatial music via Apple Music and Amazon Music',
      'Trueplay tuning technology optimizes sound for your specific room acoustics',
      'Wi-Fi 6, Bluetooth 5.0, and USB-C line-in connectivity'
    ],
    specs: {
      'Amplifiers': '6 Class-D Digital Amplifiers',
      'Tweeters': '4 Tweeters (Directional & Up-firing)',
      'Woofers': '2 High-Output Woofers',
      'Connectivity': 'Wi-Fi 6, AirPlay 2, Bluetooth 5.0'
    },
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Matte Black', hex: '#0f172a', imageIndex: 0 },
      { name: 'Matte White', hex: '#f8fafc', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-2',
      name: 'SoundCraft Pro Audio',
      rating: 4.95,
      totalSales: 15300,
      verified: true,
      responseTime: 'Instant',
      location: 'Boston, MA',
      joinedDate: 'Mar 2020'
    },
    reviews: [
      {
        id: 'rev-33',
        userName: 'Bradley Cooper',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Dolby Atmos music tracks sound like the instruments are floating right in front of you. Room-filling bass.',
        verifiedPurchase: true,
        helpfulCount: 51
      }
    ],
    deliveryEstimateDays: 1,
    isFeatured: true,
    tags: ['Sonos', 'Spatial Audio', 'Dolby Atmos', 'Smart Speaker', 'Hi-Fi']
  },
  {
    id: 'prod-33',
    name: 'LG C3 Series 65-Inch Class OLED evo 4K Smart TV with α9 AI Processor Gen6',
    slug: 'lg-c3-65-inch-oled-4k-tv',
    brand: 'LG',
    category: 'electronics',
    price: 1596.99,
    originalPrice: 1999.99,
    discountPercentage: 20,
    rating: 4.96,
    reviewCount: 1620,
    stockCount: 60,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'The standard for OLED TVs. LG OLED evo with Brightness Booster gives you luminous picture and high contrast even in well-lit rooms. Powered by the next-gen α9 AI Processor Gen6 for realistic 4K upscaling.',
    highlights: [
      'Self-lit OLED evo pixels with infinite contrast and 100% color volume',
      'α9 AI Processor Gen6 automatically adjusts picture and sound tone',
      '4x HDMI 2.1 ports with 4K 120Hz, VRR, ALLM, FreeSync Premium, and G-SYNC',
      'Dolby Vision IQ and Dolby Atmos cinema audio built-in'
    ],
    specs: {
      'Screen Size': '65-inch OLED evo 4K UHD',
      'Refresh Rate': 'Native 120Hz (VRR Supported)',
      'HDR': 'Dolby Vision / HDR10 / HLG',
      'Audio': '40W 2.2 Channel with Dolby Atmos'
    },
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Titan Gunmetal', hex: '#334155', imageIndex: 0 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-34',
        userName: 'Oliver Queen',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'Playing PS5 games in 4K 120Hz HDR on this TV is breathtaking. Zero input lag.',
        verifiedPurchase: true,
        helpfulCount: 112
      }
    ],
    deliveryEstimateDays: 2,
    isFeatured: true,
    tags: ['LG', 'OLED', '4K TV', 'HDR', 'Dolby Vision']
  },
  {
    id: 'prod-34',
    name: 'DJI Mini 4 Pro Drone with RC 2 Controller & 4K HDR Omni-directional Sensing',
    slug: 'dji-mini-4-pro-drone-rc2',
    brand: 'DJI',
    category: 'electronics',
    price: 759.00,
    originalPrice: 899.00,
    discountPercentage: 16,
    rating: 4.94,
    reviewCount: 880,
    stockCount: 115,
    isFlashSale: false,
    condition: 'New',
    location: 'West Distribution Center, CA',
    description: 'Under 249g ultra-light foldable camera drone. Omnidirectional obstacle sensing, 4K/60fps HDR True Vertical Shooting, up to 20km FHD video transmission with DJI O4, and 34 minutes flight time.',
    highlights: [
      'Ultra-light under 249g - No registration required in most regions',
      '4K/60fps HDR True Vertical Shooting for social media',
      'Omnidirectional Active Obstacle Sensing with APAS',
      'Includes DJI RC 2 Remote Controller with built-in FHD 700-nit screen'
    ],
    specs: {
      'Weight': '< 249 grams',
      'Camera Sensor': '1/1.3-inch CMOS 48MP',
      'Max Flight Time': '34 Minutes per battery',
      'Video Transmission': 'DJI O4 up to 20 km range'
    },
    images: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'DJI Matte Gray', hex: '#cbd5e1', imageIndex: 0 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-35',
        userName: 'Nathan Drake',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Omnidirectional sensors stop the drone before it can hit any tree branches. The RC 2 controller screen is crisp in direct sunlight.',
        verifiedPurchase: true,
        helpfulCount: 79
      }
    ],
    deliveryEstimateDays: 2,
    isRecommended: true,
    tags: ['DJI', 'Drone', '4K HDR', 'Aerial Photography', 'Lightweight']
  },
  {
    id: 'prod-35',
    name: 'Fujifilm X100VI Digital Camera with 40MP Sensor & 6-Stop IBIS (Silver)',
    slug: 'fujifilm-x100vi-digital-camera',
    brand: 'Fujifilm',
    category: 'electronics',
    price: 1599.99,
    originalPrice: 1799.99,
    discountPercentage: 11,
    rating: 4.98,
    reviewCount: 940,
    stockCount: 45,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'The pinnacle of tactile street photography. Equipped with a 40.2MP X-Trans CMOS 5 HR sensor, 6.0-stop in-body image stabilization, hybrid optical/electronic viewfinder, and 20 legendary Fujifilm Film Simulation modes.',
    highlights: [
      '40.2MP back-illuminated X-Trans CMOS 5 HR Sensor',
      'Up to 6.0 Stops of 5-axis In-Body Image Stabilization (IBIS)',
      'Fixed Fujinon 23mm F2.0 Mark II precision optical lens',
      'Advanced Hybrid Viewfinder (0.52x OVF + 3.69M-dot OLED EVF)'
    ],
    specs: {
      'Sensor': '40.2MP X-Trans CMOS 5 HR',
      'Lens': '23mm F2.0 (35mm equivalent)',
      'Video': '6.2K/30p & 4K/60p 10-bit',
      'Stabilization': '6.0 Stop 5-Axis IBIS'
    },
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Vintage Silver & Black', hex: '#cbd5e1', imageIndex: 0 },
      { name: 'All Black Satin', hex: '#0f172a', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-36',
        userName: 'Elena Rostova',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 day ago',
        comment: 'The Classic Chrome and Reala ACE film simulations produce straight-out-of-camera JPEGs that need zero color grading.',
        verifiedPurchase: true,
        helpfulCount: 104
      }
    ],
    deliveryEstimateDays: 1,
    isFeatured: true,
    tags: ['Fujifilm', 'X100VI', 'Street Photography', 'Camera', 'Film Simulation']
  },
  {
    id: 'prod-36',
    name: 'Patagonia Better Sweater 1/4-Zip Fleece Pullover (Fair Trade Certified)',
    slug: 'patagonia-better-sweater-quarter-zip',
    brand: 'Patagonia',
    category: 'fashion',
    price: 139.00,
    originalPrice: 159.00,
    discountPercentage: 12,
    rating: 4.88,
    reviewCount: 920,
    stockCount: 280,
    isFlashSale: false,
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'Warm, low-bulk quarter-zip jacket made of soft, 100% recycled polyester fleece dyed with a low-impact process that significantly reduces the use of dyestuffs, energy, and water.',
    highlights: [
      '100% Recycled Polyester knitted fleece with brushed fleece interior',
      'Quarter-length front zipper with zip-through stand-up collar',
      'Raglan sleeves for mobility and backpack-carrying comfort',
      'Zippered left-chest security pocket'
    ],
    specs: {
      'Fabric': '10-oz 100% Recycled Polyester Knitted Fleece',
      'Certifications': 'Fair Trade Certified™ sewn & bluesign® approved',
      'Fit': 'Regular Fit'
    },
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Stonewash Heather', hex: '#64748b', imageIndex: 0 },
      { name: 'Oatmeal Heather', hex: '#d6d3d1', imageIndex: 1 }
    ],
    variations: [
      { name: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] }
    ],
    seller: {
      id: 'sel-3',
      name: 'Milanese Couture Boutique',
      rating: 4.88,
      totalSales: 6200,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Milan, Italy',
      joinedDate: 'Aug 2022'
    },
    reviews: [
      {
        id: 'rev-37',
        userName: 'Trevor Wright',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '4 days ago',
        comment: 'Warmest mid-layer I own for autumn hiking and casual office wear. Doesn’t pill after washing.',
        verifiedPurchase: true,
        helpfulCount: 38
      }
    ],
    deliveryEstimateDays: 2,
    isRecommended: true,
    tags: ['Patagonia', 'Fleece', 'Sustainable', 'Outdoor', 'Pullover']
  },
  {
    id: 'prod-37',
    name: 'Lululemon Align High-Rise Yoga Pants 25" with Butter-Soft Nulu Fabric',
    slug: 'lululemon-align-high-rise-pant-25',
    brand: 'Lululemon',
    category: 'fashion',
    price: 98.00,
    originalPrice: 118.00,
    discountPercentage: 17,
    rating: 4.95,
    reviewCount: 2450,
    stockCount: 350,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 16 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'West Distribution Center, CA',
    description: 'When feeling nothing is everything. The Align collection, powered by Nulu™ fabric, is so weightless and buttery soft, all you feel is your yoga practice flow.',
    highlights: [
      'Ultra-soft Nulu™ fabric feels weightless like a second skin',
      'Added Lycra® fibre for stretch and shape retention',
      'Hidden waistband drop-in pocket holds a card or key',
      'High-rise waist fits comfortably without digging in'
    ],
    specs: {
      'Inseam': '25 inches (7/8 length)',
      'Fabric Composition': '81% Nylon, 19% Lycra Elastane',
      'Care': 'Machine wash cold, tumble dry low'
    },
    images: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Black Velvet', hex: '#0f172a', imageIndex: 0 },
      { name: 'True Navy', hex: '#1e3a8a', imageIndex: 1 }
    ],
    variations: [
      { name: 'Size', options: ['US 2', 'US 4', 'US 6', 'US 8', 'US 10', 'US 12'] }
    ],
    seller: {
      id: 'sel-3',
      name: 'Milanese Couture Boutique',
      rating: 4.88,
      totalSales: 6200,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Milan, Italy',
      joinedDate: 'Aug 2022'
    },
    reviews: [
      {
        id: 'rev-38',
        userName: 'Chloe Sullivan',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Literally the most comfortable leggings on earth. Waist stays put throughout intense hot yoga sessions.',
        verifiedPurchase: true,
        helpfulCount: 82
      }
    ],
    deliveryEstimateDays: 1,
    isRecommended: true,
    tags: ['Lululemon', 'Leggings', 'Yoga', 'Nulu', 'Activewear']
  },
  {
    id: 'prod-38',
    name: 'Canada Goose Expedition Parka Arctic Tech 625 Fill Power White Duck Down',
    slug: 'canada-goose-expedition-parka',
    brand: 'Canada Goose',
    category: 'fashion',
    price: 1395.00,
    originalPrice: 1550.00,
    discountPercentage: 10,
    rating: 4.96,
    reviewCount: 390,
    stockCount: 65,
    isFlashSale: false,
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'Originally developed for scientists working in McMurdo Station, Antarctica. Tested in the most extreme cold on Earth with TEI 5 (-30°C and below) thermal performance.',
    highlights: [
      '625 Fill Power Responsibly Sourced White Duck Down',
      'Arctic Tech fabric designed to stay dry in extreme weather and climates',
      'Down-filled hood with shaping wire for maximum wind protection',
      'Fleece-lined upper handwarmer pockets and lower dual-entry utility pockets'
    ],
    specs: {
      'Thermal Rating': 'TEI 5 (-30°C / -22°F and below)',
      'Fill': '625 Fill Power White Duck Down',
      'Origin': 'Made in Canada'
    },
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Northern Black', hex: '#0f172a', imageIndex: 0 },
      { name: 'Arctic Red', hex: '#dc2626', imageIndex: 1 }
    ],
    variations: [
      { name: 'Size', options: ['S', 'M', 'L', 'XL'] }
    ],
    seller: {
      id: 'sel-3',
      name: 'Milanese Couture Boutique',
      rating: 4.88,
      totalSales: 6200,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Milan, Italy',
      joinedDate: 'Aug 2022'
    },
    reviews: [
      {
        id: 'rev-39',
        userName: 'Sven Lindqvist',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Surviving a brutal blizzard in Tromsø Norway was like standing inside a warm heated room. Incredible craftsmanship.',
        verifiedPurchase: true,
        helpfulCount: 65
      }
    ],
    deliveryEstimateDays: 2,
    isFeatured: true,
    tags: ['Canada Goose', 'Parka', 'Winter Jacket', 'Arctic', 'Down Coat']
  },
  {
    id: 'prod-39',
    name: "Levi's Vintage Clothing 1954 501 Original Fit Selvedge Denim Jeans",
    slug: 'levis-vintage-1954-501-selvedge-jeans',
    brand: "Levi's",
    category: 'fashion',
    price: 198.00,
    originalPrice: 240.00,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 480,
    stockCount: 190,
    isFlashSale: false,
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'An exact reproduction of the 1954 501® Jeans representing the transition into the American East Coast market with a zip fly and tapered leg. Cut from premium Japanese red-line selvedge denim.',
    highlights: [
      '100% Cotton 12oz Cone Mills Red Selvedge Denim',
      'Talon zipper fly with copper shanks and concealed back-pocket rivets',
      'Classic straight leg with subtle taper from knee to ankle',
      'Two-Horse Pull leather patch and Big "E" red tab'
    ],
    specs: {
      'Material': '100% Cotton Japanese Selvedge Denim',
      'Fly': 'Heavy-Duty Brass Zip Fly',
      'Fit': 'Mid Rise Straight Taper'
    },
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Rigid Raw Indigo', hex: '#1e3a8a', imageIndex: 0 },
      { name: 'Vintage Stone Wash', hex: '#60a5fa', imageIndex: 1 }
    ],
    variations: [
      { name: 'Waist & Inseam', options: ['30x32', '32x32', '34x32', '36x34'] }
    ],
    seller: {
      id: 'sel-3',
      name: 'Milanese Couture Boutique',
      rating: 4.88,
      totalSales: 6200,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Milan, Italy',
      joinedDate: 'Aug 2022'
    },
    reviews: [
      {
        id: 'rev-40',
        userName: 'Jason Bourne',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'Real raw selvedge denim that fades with your natural wear creases over time. Built like a tank.',
        verifiedPurchase: true,
        helpfulCount: 37
      }
    ],
    deliveryEstimateDays: 2,
    isRecommended: true,
    tags: ["Levi's", '501', 'Selvedge Denim', 'Vintage', 'Jeans']
  },
  {
    id: 'prod-40',
    name: 'Breville Barista Touch Impress Espresso Machine with Touchscreen & Auto Milk Frother',
    slug: 'breville-barista-touch-impress-espresso',
    brand: 'Breville',
    category: 'home-appliances',
    price: 1499.95,
    originalPrice: 1699.95,
    discountPercentage: 12,
    rating: 4.97,
    reviewCount: 890,
    stockCount: 70,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 22 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Chicago Distribution Center',
    description: 'Third wave specialty coffee at home with intuitive touchscreen display and step-by-step barista guidance. The Impress Puck System assists with precise dosing and assisted 10kg tamp with 7º barista twist.',
    highlights: [
      'Barista Touch screen with pre-programmed cafe drinks menu',
      'Impress Puck System delivers precision dosing and assisted 10kg tamping',
      'Auto MilQ technology with microfoam settings calibrated for Oat, Almond, Soy, and Dairy',
      'ThermoJet heating system reaches optimum extraction temperature in 3 seconds'
    ],
    specs: {
      'Water Tank Capacity': '2.0 Liters (67.6 fl oz)',
      'Bean Hopper': '340 grams with airtight lock',
      'Heating System': 'ThermoJet 3-Second Fast Warmup',
      'Pump Pressure': '15 Bar Italian Pump'
    },
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Brushed Stainless Steel', hex: '#94a3b8', imageIndex: 0 },
      { name: 'Black Truffle', hex: '#1e293b', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-4',
      name: 'CoffeeLab & Living',
      rating: 4.96,
      totalSales: 9400,
      verified: true,
      responseTime: 'Under 15 mins',
      location: 'Chicago, IL',
      joinedDate: 'Feb 2019'
    },
    reviews: [
      {
        id: 'rev-41',
        userName: 'Gigi Hadid',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Silk-textured oat milk latte art in under a minute every morning. The automated tamp removes all guesswork.',
        verifiedPurchase: true,
        helpfulCount: 95
      }
    ],
    deliveryEstimateDays: 1,
    isFeatured: true,
    tags: ['Breville', 'Espresso', 'Coffee Machine', 'Barista', 'Latte Art']
  },
  {
    id: 'prod-41',
    name: 'Philips Hue White & Color Ambiance Smart LED Starter Kit (4 E26 Bulbs + Hue Bridge)',
    slug: 'philips-hue-white-color-starter-kit',
    brand: 'Philips Hue',
    category: 'home-appliances',
    price: 169.99,
    originalPrice: 199.99,
    discountPercentage: 15,
    rating: 4.92,
    reviewCount: 1420,
    stockCount: 310,
    isFlashSale: false,
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'Transform your home with 16 million colors and shades of white light. Sync your smart lights to movies, gaming, and music via the Philips Hue Bridge with Apple HomeKit, Alexa, and Google Home compatibility.',
    highlights: [
      '16 Million colors and 50,000 shades of warm-to-cool white light',
      'Includes Hue Bridge for whole-home Zigbee connectivity without Wi-Fi congestion',
      'Sync lighting with PC games, Spotify playlists, and smart home routines',
      'Energy efficient 800-lumen 75W equivalent LED bulbs with 25,000-hour lifespan'
    ],
    specs: {
      'Bulb Base': 'Standard E26 Medium Screw',
      'Brightness': '800 Lumens per bulb',
      'Lifespan': '25,000 Hours (approx. 22 years)',
      'Protocols': 'Zigbee 3.0 & Bluetooth Low Energy'
    },
    images: [
      'https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel-4',
      name: 'CoffeeLab & Living',
      rating: 4.96,
      totalSales: 9400,
      verified: true,
      responseTime: 'Under 15 mins',
      location: 'Chicago, IL',
      joinedDate: 'Feb 2019'
    },
    reviews: [
      {
        id: 'rev-42',
        userName: 'Daniel Craig',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '4 days ago',
        comment: 'Sunset automation mode turns the living room into a relaxing warm amber sanctuary automatically at 8 PM.',
        verifiedPurchase: true,
        helpfulCount: 57
      }
    ],
    deliveryEstimateDays: 1,
    isRecommended: true,
    tags: ['Philips Hue', 'Smart Lighting', 'HomeKit', 'RGB', 'Smart Home']
  },
  {
    id: 'prod-42',
    name: 'Shark Matrix Plus 2-in-1 Robot Vacuum & Sonic Mop with Self-Empty XL Base',
    slug: 'shark-matrix-plus-robot-vacuum-mop',
    brand: 'Shark',
    category: 'home-appliances',
    price: 449.99,
    originalPrice: 599.99,
    discountPercentage: 25,
    rating: 4.89,
    reviewCount: 710,
    stockCount: 120,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 15 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Chicago Distribution Center',
    description: 'Cleans in a precision matrix grid ensuring no spots are missed. Sonic mopping scrubs hard floors 100 times per minute, while the bagless self-emptying base holds up to 60 days of dirt and debris.',
    highlights: [
      'Matrix Clean Navigation takes multiple overlapping passes over high-traffic spots',
      'Sonic Mopping scrubs hard floors 100x per minute to break down stuck-on messes',
      'Bagless Self-Empty Base with HEPA anti-allergen seal holds 60 days of dust',
      '360° LiDAR vision maps your home room-by-room with no-go zones'
    ],
    specs: {
      'Navigation': '360° Precision LiDAR Laser',
      'Base Capacity': 'Bagless 60-Day Self-Emptying',
      'Runtime': 'Up to 120 Minutes on hard floors'
    },
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Dark Graphite', hex: '#1e293b', imageIndex: 0 }
    ],
    seller: {
      id: 'sel-4',
      name: 'CoffeeLab & Living',
      rating: 4.96,
      totalSales: 9400,
      verified: true,
      responseTime: 'Under 15 mins',
      location: 'Chicago, IL',
      joinedDate: 'Feb 2019'
    },
    reviews: [
      {
        id: 'rev-43',
        userName: 'Jessica Pearson',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Having both vacuuming and scrubbing mopping in one device saves 4 hours of weekend cleaning.',
        verifiedPurchase: true,
        helpfulCount: 66
      }
    ],
    deliveryEstimateDays: 2,
    isFeatured: true,
    tags: ['Shark', 'Robot Vacuum', 'Mop', 'Self Empty', 'Smart Cleaning']
  },
  {
    id: 'prod-43',
    name: 'Le Creuset Enameled Cast Iron Signature Round Dutch Oven 5.5 Qt (Cerise Red)',
    slug: 'le-creuset-enameled-dutch-oven-5qt',
    brand: 'Le Creuset',
    category: 'home-appliances',
    price: 335.95,
    originalPrice: 420.00,
    discountPercentage: 20,
    rating: 4.99,
    reviewCount: 1980,
    stockCount: 160,
    isFlashSale: false,
    condition: 'New',
    location: 'Chicago Distribution Center',
    description: 'An indispensable culinary icon beloved by home cooks and master chefs around the world. Handcrafted in France since 1925, perfect for slow-cooking stews, braising meats, and baking crusty artisan sourdough breads.',
    highlights: [
      'Handcrafted in Fresnoy-le-Grand, France from premium enameled cast iron',
      'Superior heat distribution and retention keeps food warm during table serving',
      'Smooth, sand-colored interior enamel promotes caramelization and resists staining',
      'Oven-safe composite stainless steel knob up to 500°F (260°C)'
    ],
    specs: {
      'Capacity': '5.5 Quarts (5.2 Liters)',
      'Dimensions': '10.25" Diameter x 6.75" Height',
      'Weight': '11.4 lbs with lid',
      'Origin': 'Made in France'
    },
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Cerise Red', hex: '#dc2626', imageIndex: 0 },
      { name: 'Marseille Blue', hex: '#2563eb', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-4',
      name: 'CoffeeLab & Living',
      rating: 4.96,
      totalSales: 9400,
      verified: true,
      responseTime: 'Under 15 mins',
      location: 'Chicago, IL',
      joinedDate: 'Feb 2019'
    },
    reviews: [
      {
        id: 'rev-44',
        userName: 'Ina Garten',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Heirloom quality that lasts generations. Dutch oven sourdough bread comes out with bakery-quality blistered crust.',
        verifiedPurchase: true,
        helpfulCount: 140
      }
    ],
    deliveryEstimateDays: 2,
    isRecommended: true,
    tags: ['Le Creuset', 'Dutch Oven', 'Cast Iron', 'French Cookware', 'Kitchen']
  },
  {
    id: 'prod-44',
    name: 'Dyson Supersonic Nural Intelligent Hair Dryer with Scalp Protect Sensor',
    slug: 'dyson-supersonic-nural-hair-dryer',
    brand: 'Dyson',
    category: 'beauty',
    price: 499.99,
    originalPrice: 549.99,
    discountPercentage: 9,
    rating: 4.95,
    reviewCount: 830,
    stockCount: 140,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 17 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'West Coast Beauty Hub, CA',
    description: 'Dyson most intelligent hair dryer. A network of Nural™ sensors automatically adapts airflow and heat to protect scalp health and enhance natural shine, preventing heat damage.',
    highlights: [
      'Scalp Protect Mode automatically reduces heat to 131°F as it nears your head',
      'Attachment learning recognizes each styling nozzle and remembers your preferred speed/heat settings',
      'Pause detect accelerometer knows when the machine is put down, pausing heat and airflow',
      'Includes 5 magnetic intelligent styling attachments with Wave+Curl diffuser'
    ],
    specs: {
      'Motor': 'Dyson Digital Motor V9 (110,000 RPM)',
      'Power': '1600 Watts',
      'Cable Length': '9 ft Professional Cord'
    },
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Ceramic Patina & Topaz', hex: '#0284c7', imageIndex: 0 },
      { name: 'Vinca Blue & Rose', hex: '#4338ca', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-5',
      name: 'Lumiere Beauty Labs',
      rating: 4.91,
      totalSales: 18900,
      verified: true,
      responseTime: 'Under 30 mins',
      location: 'Los Angeles, CA',
      joinedDate: 'May 2021'
    },
    reviews: [
      {
        id: 'rev-45',
        userName: 'Scarlett Johansson',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Dries thick long hair in under 6 minutes with zero frizz and zero hot burning sensations on the scalp.',
        verifiedPurchase: true,
        helpfulCount: 78
      }
    ],
    deliveryEstimateDays: 1,
    isFeatured: true,
    tags: ['Dyson', 'Hair Dryer', 'Scalp Care', 'Luxury Beauty', 'Styling']
  },
  {
    id: 'prod-45',
    name: 'Maison Francis Kurkdjian Baccarat Rouge 540 Eau de Parfum 70ml',
    slug: 'baccarat-rouge-540-eau-de-parfum',
    brand: 'Maison Francis Kurkdjian',
    category: 'beauty',
    price: 325.00,
    originalPrice: 380.00,
    discountPercentage: 14,
    rating: 4.98,
    reviewCount: 1750,
    stockCount: 90,
    isFlashSale: false,
    condition: 'New',
    location: 'West Coast Beauty Hub, CA',
    description: 'An iconic fragrance born from the encounter between Maison Francis Kurkdjian and Baccarat crystal. Luminous and intense, laying on the skin like an amber, floral and woody breeze.',
    highlights: [
      'Top Notes: Jasmine Grandiflorum from Egypt & Saffron',
      'Heart Notes: Bitter Almond from Morocco & Cedarwood',
      'Base Notes: Ambergris accord & Woody Musk',
      'Hand-finished luxury French glass bottle with 24k gold leaf lettering'
    ],
    specs: {
      'Volume': '70ml / 2.4 fl. oz.',
      'Concentration': 'Eau de Parfum (EDP)',
      'Origin': 'Made in Paris, France'
    },
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel-5',
      name: 'Lumiere Beauty Labs',
      rating: 4.91,
      totalSales: 18900,
      verified: true,
      responseTime: 'Under 30 mins',
      location: 'Los Angeles, CA',
      joinedDate: 'May 2021'
    },
    reviews: [
      {
        id: 'rev-46',
        userName: 'Victoria Beckham',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'The scent trail is mesmerizing. Lasts for 18+ hours and receives compliments wherever I walk.',
        verifiedPurchase: true,
        helpfulCount: 124
      }
    ],
    deliveryEstimateDays: 1,
    isRecommended: true,
    tags: ['MFK', 'Baccarat Rouge 540', 'Perfume', 'Luxury Fragrance', 'Paris']
  },
  {
    id: 'prod-46',
    name: 'La Mer Crème de la Mer Moisturizing Cream 60ml with Miracle Broth™',
    slug: 'la-mer-creme-de-la-mer-60ml',
    brand: 'La Mer',
    category: 'beauty',
    price: 380.00,
    originalPrice: 425.00,
    discountPercentage: 11,
    rating: 4.94,
    reviewCount: 880,
    stockCount: 110,
    isFlashSale: false,
    condition: 'New',
    location: 'West Coast Beauty Hub, CA',
    description: 'The legendary ultra-rich moisturizer that started it all. Infused with cell-renewing Miracle Broth™ and antioxidant Lime Tea, it delivers healing moisture, daily protection, and energized natural repair.',
    highlights: [
      'Cell-renewing Miracle Broth™ fermented from wild giant sea kelp',
      'Soothes visible redness and irritation within hours',
      'Transforms dry, sensitive skin to plump, firm, and radiant',
      'Warm between fingertips before pressing onto clean skin'
    ],
    specs: {
      'Volume': '60ml / 2 oz Jar',
      'Key Ingredient': 'Giant Sea Kelp Miracle Broth™',
      'Texture': 'Ultra-Rich Cream'
    },
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel-5',
      name: 'Lumiere Beauty Labs',
      rating: 4.91,
      totalSales: 18900,
      verified: true,
      responseTime: 'Under 30 mins',
      location: 'Los Angeles, CA',
      joinedDate: 'May 2021'
    },
    reviews: [
      {
        id: 'rev-47',
        userName: 'Camila Morrone',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'Cured my winter dry skin barrier in 3 days. Skin feels soft and luminous like silk.',
        verifiedPurchase: true,
        helpfulCount: 68
      }
    ],
    deliveryEstimateDays: 1,
    isRecommended: true,
    tags: ['La Mer', 'Miracle Broth', 'Luxury Skincare', 'Anti-Aging', 'Moisturizer']
  },
  {
    id: 'prod-47',
    name: '100% Pure Raw New Zealand Manuka Honey MGO 850+ (UMF 20+) 500g Jar',
    slug: 'pure-new-zealand-manuka-honey-mgo850',
    brand: 'Wild Cape Honey',
    category: 'groceries',
    price: 89.99,
    originalPrice: 119.99,
    discountPercentage: 25,
    rating: 4.97,
    reviewCount: 620,
    stockCount: 290,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'Organic Farmers Network, OR',
    description: 'Harvested from the pristine East Cape region of New Zealand. Independently certified MGO 850+ (equivalent to UMF 20+) for potent immune support, digestive wellness, and natural antibacterial properties.',
    highlights: [
      'Certified MGO 850+ / UMF 20+ verified by independent laboratory testing',
      '100% Monofloral Raw Honey harvested from remote wild Manuka blossoms',
      'Rich, velvety caramel flavor with potent therapeutic benefits',
      'BPA-free amber safety jar to preserve bioactive enzyme integrity'
    ],
    specs: {
      'Weight': '500g (17.6 oz)',
      'Grade': 'MGO 850+ / UMF 20+ Ultra Potency',
      'Origin': 'East Cape, New Zealand'
    },
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel-6',
      name: 'Heritage Farm Co-Op',
      rating: 4.85,
      totalSales: 8700,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Portland, OR',
      joinedDate: 'Jul 2020'
    },
    reviews: [
      {
        id: 'rev-48',
        userName: 'Dr. Andrew Huberman',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '4 days ago',
        comment: 'One spoonful in morning tea boosts energy and soothes throat inflammation completely. Genuine NZ certification.',
        verifiedPurchase: true,
        helpfulCount: 89
      }
    ],
    deliveryEstimateDays: 1,
    isRecommended: true,
    tags: ['Manuka Honey', 'MGO 850+', 'Organic', 'Superfood', 'New Zealand']
  },
  {
    id: 'prod-48',
    name: 'Extra Virgin Single-Estate Cold-Pressed Tuscan Olive Oil 750ml (IGP Certified)',
    slug: 'single-estate-tuscan-extra-virgin-olive-oil',
    brand: 'Fattoria San Miniato',
    category: 'groceries',
    price: 36.50,
    originalPrice: 45.00,
    discountPercentage: 19,
    rating: 4.96,
    reviewCount: 510,
    stockCount: 380,
    isFlashSale: false,
    condition: 'New',
    location: 'Organic Farmers Network, OR',
    description: 'First cold extraction within 6 hours of harvest in the rolling hills of Tuscany, Italy. Characterized by intense artichoke, freshly cut grass aromas, and a peppery polyphenol finish.',
    highlights: [
      '100% Italian Frantoio, Leccino, and Moraiolo hand-picked olives',
      'Cold-pressed under 24°C within 6 hours of picking to maximize polyphenols',
      'Certified Tuscan IGP with ultra-low acidity (<0.18%)',
      'UV-blocking dark glass bottle with anti-drip pour spout'
    ],
    specs: {
      'Volume': '750ml (25.4 fl oz)',
      'Harvest Date': 'November 2025 Autumn Harvest',
      'Origin': 'Tuscany, Italy'
    },
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80'
    ],
    seller: {
      id: 'sel-6',
      name: 'Heritage Farm Co-Op',
      rating: 4.85,
      totalSales: 8700,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Portland, OR',
      joinedDate: 'Jul 2020'
    },
    reviews: [
      {
        id: 'rev-49',
        userName: 'Massimo Bottura',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Vibrant green color with that signature Tuscan peppery throat catch that indicates top polyphenol count.',
        verifiedPurchase: true,
        helpfulCount: 71
      }
    ],
    deliveryEstimateDays: 2,
    isRecommended: true,
    tags: ['Olive Oil', 'Extra Virgin', 'Tuscany', 'Organic', 'Gourmet']
  },
  {
    id: 'prod-49',
    name: 'Garmin Fenix 7 Pro Sapphire Solar Multi-Sport GPS Smartwatch (Titanium with DLC)',
    slug: 'garmin-fenix-7-pro-sapphire-solar',
    brand: 'Garmin',
    category: 'accessories',
    price: 799.99,
    originalPrice: 899.99,
    discountPercentage: 11,
    rating: 4.96,
    reviewCount: 870,
    stockCount: 130,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 21 * 3600 * 1000).toISOString(),
    condition: 'New',
    location: 'East Coast Logistics Hub',
    description: 'Conquer every hour with advanced training features, 24/7 health and wellness monitoring, and up to 37 days of battery life in smartwatch mode with the solar charging Power Sapphire™ lens.',
    highlights: [
      'Power Sapphire™ solar charging lens with scratch-resistant titanium bezel',
      'Built-in multi-LED flashlight with variable intensities and strobe modes',
      'Multi-band GPS with SatIQ technology for superior positioning accuracy',
      'Up to 37 days of battery life with 3 hours of direct sunlight daily'
    ],
    specs: {
      'Case Size': '47mm Fiber-reinforced Polymer with Titanium Rear Cover',
      'Display': '1.3" Sunlight-visible Transflective MIP',
      'Water Rating': '10 ATM (100 meters dive rating)',
      'Sensors': 'Wrist Heart Rate, Pulse Ox, Multi-GNSS, Compass'
    },
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Carbon Gray DLC Titanium', hex: '#334155', imageIndex: 0 },
      { name: 'Titanium with Fog Gray', hex: '#94a3b8', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-1',
      name: 'OmniDirect Official Store',
      rating: 4.9,
      totalSales: 28400,
      verified: true,
      responseTime: 'Under 10 mins',
      location: 'New York, USA',
      joinedDate: 'Jan 2021'
    },
    reviews: [
      {
        id: 'rev-50',
        userName: 'Alex Honnold',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Took it on a 10-day backcountry trail run without charging once. Built-in flashlight is surprisingly bright for night runs.',
        verifiedPurchase: true,
        helpfulCount: 94
      }
    ],
    deliveryEstimateDays: 1,
    isFeatured: true,
    tags: ['Garmin', 'Fenix 7 Pro', 'GPS Watch', 'Solar', 'Fitness Tracker']
  },
  {
    id: 'prod-50',
    name: 'Tumi Alpha 3 Continental Dual Access 4-Wheeled Carry-On Suitcase (Ballistic Nylon)',
    slug: 'tumi-alpha-3-carry-on-suitcase',
    brand: 'Tumi',
    category: 'accessories',
    price: 895.00,
    originalPrice: 995.00,
    discountPercentage: 10,
    rating: 4.97,
    reviewCount: 650,
    stockCount: 110,
    isFlashSale: false,
    condition: 'New',
    location: 'Central Fulfillment Hub, NY',
    description: 'The ultimate travel companion for frequent flyers. Crafted from ultra-durable FXT® ballistic nylon with dual-entry main compartment, built-in USB power port, and dual spinner wheels with steel ball bearings.',
    highlights: [
      'FXT® Ballistic Nylon resists abrasions and punctures through millions of air miles',
      'Dual-access system gives option to pack through front lid or split case opening',
      'X-Brace 45® aircraft-grade aluminum 3-stage telescoping handle',
      'Integrated TSA combination lock and complimentary Tumi Tracer® recovery program'
    ],
    specs: {
      'Dimensions': '22" x 16" x 9" (Meets domestic and international carry-on requirements)',
      'Weight': '11.0 lbs (4.98 kg)',
      'Capacity': '42 Liters expandable to 47L',
      'Material': 'Patented FXT® Ballistic Nylon'
    },
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Classic Matte Black', hex: '#0f172a', imageIndex: 0 },
      { name: 'Anthracite Gunmetal', hex: '#475569', imageIndex: 1 }
    ],
    seller: {
      id: 'sel-3',
      name: 'Milanese Couture Boutique',
      rating: 4.88,
      totalSales: 6200,
      verified: true,
      responseTime: 'Under 1 hour',
      location: 'Milan, Italy',
      joinedDate: 'Aug 2022'
    },
    reviews: [
      {
        id: 'rev-51',
        userName: 'Logan Roy',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Flown 80,000 miles this year with this bag. Wheels glide effortlessly through airport concourses.',
        verifiedPurchase: true,
        helpfulCount: 83
      }
    ],
    deliveryEstimateDays: 2,
    isFeatured: true,
    isRecommended: true,
    tags: ['Tumi', 'Luggage', 'Carry-On', 'Ballistic Nylon', 'Travel']
  }
];

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'SAVE20',
    discountType: 'percentage',
    value: 20,
    minOrder: 50,
    description: 'Get 20% off on orders above $50'
  },
  {
    code: 'FREESHIP',
    discountType: 'free_shipping',
    value: 0,
    minOrder: 30,
    description: 'Free expedited delivery on all orders over $30'
  },
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    minOrder: 20,
    description: '10% welcome discount for your order'
  },
  {
    code: 'FLASH50',
    discountType: 'fixed',
    value: 50,
    minOrder: 250,
    description: 'Flat $50 discount on orders over $250'
  }
];

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    price: 0,
    estimatedDays: '3 - 5 Business Days',
    description: 'Reliable ground shipping with doorstep tracking',
    badge: 'FREE'
  },
  {
    id: 'express',
    name: 'Express Air Priority',
    price: 8.99,
    estimatedDays: '1 - 2 Business Days',
    description: 'Expedited air courier with guaranteed delivery window',
    badge: 'FAST'
  },
  {
    id: 'same_day',
    name: 'Same-Day Dedicated Courier',
    price: 14.99,
    estimatedDays: 'Today within 3-4 Hours',
    description: 'Direct courier delivery with live GPS map tracking',
    badge: 'LIVE GPS'
  }
];

export const DEFAULT_USER: UserProfile = {
  id: 'usr-guest',
  name: 'OmniMarket Shopper',
  email: 'shopper@omnimarket.com',
  phone: '+1 (555) 019-2834',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  authProvider: 'email',
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Home',
      fullName: 'OmniMarket Shopper',
      phone: '+1 (555) 019-2834',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true,
      lat: 40.748817,
      lng: -73.985428
    },
    {
      id: 'addr-2',
      label: 'Office',
      fullName: 'OmniMarket Delivery',
      phone: '+1 (555) 019-2835',
      street: '350 5th Avenue, Suite 2200',
      city: 'New York',
      state: 'NY',
      zipCode: '10118',
      country: 'United States',
      isDefault: false,
      lat: 40.7484405,
      lng: -73.9856644
    }
  ],
  savedPaymentCards: [
    {
      id: 'card-1',
      cardHolder: 'VALUED SHOPPER',
      brand: 'visa',
      last4: '4242',
      expMonth: '08',
      expYear: '28',
      isDefault: true
    },
    {
      id: 'card-2',
      cardHolder: 'VALUED SHOPPER',
      brand: 'mastercard',
      last4: '8819',
      expMonth: '11',
      expYear: '27',
      isDefault: false
    }
  ],
  securitySettings: {
    twoFactorEnabled: true,
    twoFactorMethod: 'authenticator_app',
    passwordLastChanged: '2026-06-12',
    loginNotifications: true,
    activeSessions: [
      {
        id: 'sess-1',
        device: 'MacBook Pro 16"',
        browser: 'Chrome 128.0',
        location: 'New York, US',
        ip: '198.51.100.45',
        lastActive: 'Active Now',
        isCurrent: true
      },
      {
        id: 'sess-2',
        device: 'iPhone 15 Pro Max',
        browser: 'Mobile Safari 17.4',
        location: 'New York, US',
        ip: '198.51.100.89',
        lastActive: '2 hours ago',
        isCurrent: false
      }
    ]
  },
  joinedDate: 'January 2024'
};

export const SAMPLE_DRIVER: DeliveryDriver = {
  id: 'drv-77',
  name: 'Marcus Sterling',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  phone: '+1 (555) 789-3321',
  vehicleType: 'Electric Scooter',
  vehiclePlate: 'NY-EV-9428',
  rating: 4.94,
  completedDeliveries: 1840
};

export const INITIAL_SAMPLE_ORDER: Order = {
  id: 'ord-88392',
  orderNumber: 'OMNI-2026-9821',
  date: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  items: [
    {
      id: 'cart-init-1',
      productId: 'prod-2',
      product: PRODUCTS[1],
      quantity: 1,
      selectedColor: 'Matte Onyx',
      unitPrice: 249.50
    },
    {
      id: 'cart-init-2',
      productId: 'prod-8',
      product: PRODUCTS[7],
      quantity: 1,
      selectedColor: 'Brushed Titanium',
      selectedVariation: { 'Strap Material': 'Titanium Link' },
      unitPrice: 320.00
    }
  ],
  subtotal: 569.50,
  deliveryFee: 14.99,
  discountAmount: 50.00,
  tax: 41.56,
  total: 576.05,
  promoCodeApplied: 'FLASH50',
  deliveryAddress: DEFAULT_USER.savedAddresses[0],
  shippingMethod: SHIPPING_METHODS[2], // Same-day courier
  paymentMethod: 'card',
  paymentDetails: {
    brand: 'Visa',
    last4: '4242',
    referenceId: 'TXN-9984-7712'
  },
  paymentStatus: 'successful',
  orderStatus: 'out_for_delivery',
  estimatedDeliveryDate: 'Today by 4:30 PM (ETA 18 mins)',
  driver: SAMPLE_DRIVER,
  storeLocation: {
    lat: 40.758896,
    lng: -73.985130,
    name: 'OmniMarket Central Hub, Times Sq'
  },
  customerLocation: {
    lat: 40.748817,
    lng: -73.985428,
    name: 'Home (742 Evergreen Terrace)'
  },
  courierLocation: {
    lat: 40.7535,
    lng: -73.98525
  },
  routePath: [
    [40.758896, -73.985130],
    [40.757100, -73.985180],
    [40.755200, -73.985220],
    [40.753500, -73.985250], // Current live courier location
    [40.751200, -73.985330],
    [40.748817, -73.985428]
  ],
  checkpoints: [
    {
      id: 'cp-1',
      status: 'placed',
      title: 'Order Confirmed & Paid',
      description: 'Payment verified via Visa •••• 4242',
      timestamp: '2:15 PM',
      completed: true,
      current: false,
      locationName: 'OmniMarket Payment Gateway'
    },
    {
      id: 'cp-2',
      status: 'processing',
      title: 'Packed & Barcoded',
      description: 'Items packed in eco-friendly protective packaging',
      timestamp: '2:32 PM',
      completed: true,
      current: false,
      locationName: 'Central Fulfillment Hub'
    },
    {
      id: 'cp-3',
      status: 'shipped',
      title: 'Handed to Dedicated Courier',
      description: 'Assigned to driver Marcus Sterling',
      timestamp: '2:48 PM',
      completed: true,
      current: false,
      locationName: 'Courier Dispatch Station'
    },
    {
      id: 'cp-4',
      status: 'out_for_delivery',
      title: 'Out for Delivery (On the way)',
      description: 'Courier is 0.6 miles away from your doorstep',
      timestamp: 'Active Now',
      completed: false,
      current: true,
      locationName: 'En Route on 6th Avenue'
    },
    {
      id: 'cp-5',
      status: 'delivered',
      title: 'Delivery Handover',
      description: 'Direct contactless handover or door placement',
      timestamp: 'Est. 3:15 PM',
      completed: false,
      current: false,
      locationName: '742 Evergreen Terrace, Apt 4B'
    }
  ],
  notes: 'Ring doorbell 4B or leave in secure parcel locker if away.'
};

import { THOUSANDS_OF_MARKETS } from './marketsData';

export const SAMPLE_MARKETS: Market[] = THOUSANDS_OF_MARKETS;


