import { Product, ProductQA, Review } from '../types';

// Amazon AI Review Summaries generator based on category & rating
export function generateAiReviewSummary(product: Product): {
  sentiment: string;
  pros: string[];
  cons: string[];
  summaryText: string;
  customerSayTags: string[];
} {
  const isHighRated = product.rating >= 4.7;
  
  const categoryPros: Record<string, string[]> = {
    phones: ['Blazing fast processor', 'Exceptional camera zoom', 'All-day battery life', 'Vibrant OLED screen'],
    computers: ['Top-tier multi-tasking speed', 'Quiet cooling system', 'Crisp display resolution', 'High build quality'],
    electronics: ['Superior active noise cancellation', 'Rich bass and balanced trebles', 'Long battery duration', 'Instant Bluetooth pairing'],
    fashion: ['True to size fit', 'Ultra-comfortable breathable fabric', 'Durable stitching', 'Premium packaging'],
    'home-appliances': ['Simple intuitive controls', 'Extremely quiet operation', 'Sleek modern design', 'Easy to clean'],
    beauty: ['Gentle on sensitive skin', 'Visible results in days', 'Pleasant subtle scent', 'Dermatologist verified'],
    groceries: ['Incredible freshness', 'Authentic taste', 'Great value bulk size', 'Eco-friendly packaging'],
    accessories: ['High-end tactile finish', 'Lightweight & ergonomic', 'Scratch resistant', 'Gift-ready box']
  };

  const categoryCons: Record<string, string[]> = {
    phones: ['Charging brick sold separately', 'Slightly heavy in one hand'],
    computers: ['Power adapter is somewhat bulky', 'Fans audible under maximum gaming load'],
    electronics: ['Ear cushions warm during intense workouts', 'Companion app setup required for EQ'],
    fashion: ['Delicate wash recommended', 'Popular sizes sell out fast'],
    'home-appliances': ['User manual is extensive', 'Takes countertop footprint'],
    beauty: ['Keep away from direct sunlight', 'Dispenser pump requires gentle press'],
    groceries: ['Best enjoyed within 2 weeks of opening'],
    accessories: ['Limited color variations in stock']
  };

  const pros = categoryPros[product.category] || ['High overall quality', 'Fast shipping', 'Easy to use', 'Solid value'];
  const cons = categoryCons[product.category] || ['Minor learning curve with advanced features'];

  const customerSayTags = [
    'Quality of materials',
    'Value for money',
    'Battery life',
    'Easy to set up',
    'Speed & Performance',
    'Packaging'
  ];

  const summaryText = isHighRated
    ? `Customers find this item to be of exceptional quality, praising the ${pros[0].toLowerCase()} and ${pros[1].toLowerCase()}. Reviewers frequently note that delivery was on time and packaging was pristine.`
    : `Customers appreciate the solid performance and ${pros[0].toLowerCase()}, with many noting it offers great functionality for its price point.`;

  return {
    sentiment: isHighRated ? '94% Positive Customer Sentiment' : '88% Positive Customer Sentiment',
    pros,
    cons,
    summaryText,
    customerSayTags
  };
}

// Generate realistic Community Q&As
export function generateProductQAs(product: Product): ProductQA[] {
  const qaMap: Record<string, ProductQA[]> = {
    phones: [
      {
        id: 'qa-1',
        question: 'Does this come unlocked for all carriers (AT&T, Verizon, T-Mobile, International)?',
        asker: 'Marcus K.',
        answer: 'Yes! This device is 100% factory unlocked and supports both physical SIM and dual eSIM for all global 5G/LTE bands.',
        answerer: 'OmniDirect Official Seller',
        date: 'Verified Answer • 3 weeks ago',
        votes: 42
      },
      {
        id: 'qa-2',
        question: 'Is fast wireless charging supported out of the box?',
        asker: 'Rachel P.',
        answer: 'Yes, it supports Qi2 and MagFast wireless charging up to 15W, as well as 65W wired hyper-charging.',
        answerer: 'TechReviewer_Pro',
        date: 'Verified Answer • 1 month ago',
        votes: 28
      }
    ],
    electronics: [
      {
        id: 'qa-3',
        question: 'How effective is the Active Noise Cancellation for airplane cabin rumble?',
        asker: 'Elena V.',
        answer: 'Outstanding! The dual ANC microphones eliminate low-frequency engine drone almost completely. Perfect for long flights.',
        answerer: 'Acoustic Labs Support',
        date: 'Verified Answer • 2 weeks ago',
        votes: 56
      },
      {
        id: 'qa-4',
        question: 'Can this connect to my laptop and phone at the same time?',
        asker: 'Jordan S.',
        answer: 'Yes, Multipoint Bluetooth allows seamless auto-switching between audio on your laptop and incoming calls on your phone.',
        answerer: 'AudioFanatic',
        date: 'Verified Answer • 1 month ago',
        votes: 19
      }
    ],
    computers: [
      {
        id: 'qa-5',
        question: 'Is the internal SSD or RAM user-upgradable in the future?',
        asker: 'Alex G.',
        answer: 'The primary M.2 NVMe slot is fully accessible with a standard precision screwdriver, allowing storage expansions up to 4TB.',
        answerer: 'NovaTech Hardware Team',
        date: 'Verified Answer • 4 days ago',
        votes: 31
      }
    ]
  };

  const defaultQAs: ProductQA[] = [
    {
      id: `qa-def-1-${product.id}`,
      question: `What is the warranty coverage on this ${product.brand} item?`,
      asker: 'Chris Miller',
      answer: `This item includes a full 1-Year Manufacturer Warranty covering parts and labor, plus 30-Day Hassle-Free Amazon Returns.`,
      answerer: `${product.seller?.name || 'Verified Distributor'}`,
      date: 'Verified Answer • 1 week ago',
      votes: 34
    },
    {
      id: `qa-def-2-${product.id}`,
      question: 'Is this item shipped directly in original packaging or with an outer Amazon box?',
      asker: 'Samantha T.',
      answer: 'It ships inside a discreet, shock-absorbent outer Amazon fulfillment box to protect the retail packaging and prevent porch theft.',
      answerer: 'Amazon Logistics Team',
      date: 'Verified Answer • 2 weeks ago',
      votes: 22
    }
  ];

  return qaMap[product.category] || defaultQAs;
}

// Enrich a product with Amazon specific flags and attributes
export function enrichProductWithAmazonFeatures(product: Product, allProducts: Product[]): Product {
  // Prime eligibility (90% of catalog is Prime eligible)
  const isPrimeEligible = product.price > 15 || product.seller.verified;
  
  // Amazon Choice tags
  let amazonChoiceTag: string | undefined = undefined;
  if (product.rating >= 4.9 && product.reviewCount > 300) {
    amazonChoiceTag = 'Overall Pick';
  } else if (product.rating >= 4.8) {
    amazonChoiceTag = "Amazon's Choice";
  } else if (product.reviewCount > 500) {
    amazonChoiceTag = 'Best Seller';
  } else if (product.isFlashSale) {
    amazonChoiceTag = 'Lightning Deal';
  }

  // Subscribe & Save eligibility
  const isSubscribeEligible = ['groceries', 'beauty', 'home-appliances', 'accessories', 'electronics'].includes(product.category);
  const subscribeAndSave = isSubscribeEligible ? {
    eligible: true,
    discountPercentage: 10,
    defaultFrequencyMonths: 1
  } : undefined;

  // Frequently Bought Together: choose 2 complementary products
  const otherSameCategory = allProducts.filter((p) => p.id !== product.id && p.category === product.category);
  const otherRelated = allProducts.filter((p) => p.id !== product.id && p.category !== product.category);
  
  const fbt1 = otherSameCategory[0] || otherRelated[0];
  const fbt2 = otherRelated[1] || otherSameCategory[1];
  const frequentlyBoughtTogetherIds = [fbt1?.id, fbt2?.id].filter(Boolean) as string[];

  // Compare products: choose 3 items in same category
  const compareProductIds = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || Math.abs(p.price - product.price) < 200))
    .slice(0, 3)
    .map((p) => p.id);

  // Lightning deals claim simulation
  const isLightning = !!product.isFlashSale;
  const lightningClaimed = isLightning ? Math.floor(62 + ((product.id.charCodeAt(product.id.length - 1) * 7) % 32)) : undefined;

  return {
    ...product,
    isPrimeEligible,
    primeDeliveryTime: isPrimeEligible ? 'FREE Tomorrow, 8 AM - 12 PM' : 'Standard 3-5 Days',
    amazonChoiceTag,
    isLightningDeal: isLightning,
    lightningDealClaimedPercentage: lightningClaimed,
    lightningDealEndsAt: product.flashSaleEndsAt || new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
    subscribeAndSave,
    frequentlyBoughtTogetherIds: product.frequentlyBoughtTogetherIds || frequentlyBoughtTogetherIds,
    compareProductIds: product.compareProductIds || compareProductIds,
    aiReviewSummary: product.aiReviewSummary || generateAiReviewSummary(product),
    qaList: product.qaList || generateProductQAs(product)
  };
}

// Calculate delivery estimate based on zip code
export function calculateDeliveryETA(zipCode: string, isPrime: boolean = true) {
  const now = new Date();
  const cutoffHours = 3;
  const cutoffMinutes = 24;

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + (isPrime ? 1 : 3));

  const dayName = tomorrow.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return {
    label: isPrime ? `FREE Prime One-Day by ${dayName}` : `Standard Ground by ${dayName}`,
    fastestOption: isPrime ? `Tomorrow by 8:00 AM` : `In 2-3 business days`,
    cutoffRemaining: `${cutoffHours} hrs ${cutoffMinutes} mins`,
    zip: zipCode || '10001',
    isNextDay: isPrime
  };
}

// Rufus AI Assistant Engine
export function askRufusAssistant(
  question: string, 
  product: Product | null, 
  allProducts: Product[]
): {
  answer: string;
  sourceCitations: string[];
  suggestedFollowUps: string[];
  recommendedProducts?: Product[];
} {
  const q = question.toLowerCase();

  if (!product) {
    // General marketplace query
    if (q.includes('deal') || q.includes('discount') || q.includes('sale')) {
      const dealProducts = allProducts.filter((p) => p.isFlashSale || p.discountPercentage).slice(0, 3);
      return {
        answer: `I found several hot Lightning Deals today! You can save up to 40% with instant checkout and free Prime delivery. Here are the highest-rated deals right now:`,
        sourceCitations: ['Today’s Lightning Deals Hub', 'Amazon Verified Prices'],
        suggestedFollowUps: ['Show electronics deals under $100', 'What is the Deal of the Day?', 'Are there student discounts?'],
        recommendedProducts: dealProducts
      };
    }

    if (q.includes('gift') || q.includes('present') || q.includes('recommend')) {
      const giftItems = allProducts.filter((p) => p.rating >= 4.8).slice(0, 3);
      return {
        answer: `Here are our most gifted and highest-rated items this week across tech, audio, and lifestyle:`,
        sourceCitations: ['Top Gift Registry Lists', 'Customer Favorites 2026'],
        suggestedFollowUps: ['Gift ideas under $50', 'Gifts for tech lovers', 'Gift wrapping options'],
        recommendedProducts: giftItems
      };
    }

    return {
      answer: `Hello! I'm Rufus, your Amazon Shopping Assistant. I can help you compare products, check compatibility, summarize customer reviews, or find the best deals. What are you looking for today?`,
      sourceCitations: ['Amazon Knowledge Graph'],
      suggestedFollowUps: ['What are today’s top deals?', 'Find wireless noise-cancelling headphones', 'How does Prime One-Day delivery work?']
    };
  }

  // Product specific query
  if (q.includes('battery') || q.includes('charge') || q.includes('life')) {
    const batterySpec = product.specs['Battery Life'] || product.specs['Battery'] || 'all-day battery endurance';
    return {
      answer: `According to product specs and customer feedback, this ${product.name} features **${batterySpec}**. Reviewers report it easily lasts through heavy daily usage, and ${product.highlights[2] || 'supports rapid charging'}.`,
      sourceCitations: ['Product Technical Specs', 'Verified Customer Reviews (420+ mentions)'],
      suggestedFollowUps: ['Does it come with a fast charger?', 'How long does a full charge take?', 'Is wireless charging supported?']
    };
  }

  if (q.includes('fit') || q.includes('size') || q.includes('dimension') || q.includes('weight')) {
    const dim = product.specs['Dimensions'] || product.specs['Screen Size'] || 'standard ergonomic form factor';
    return {
      answer: `The dimensions and sizing details for this item are: **${dim}**. Reviewers confirm it matches the manufacturer sizing guide accurately.`,
      sourceCitations: ['Manufacturer Specifications Table', 'Size & Fit Feedback from 280+ Customers'],
      suggestedFollowUps: ['What is the return policy if size doesn’t fit?', 'Is this lightweight for travel?', 'Compare dimensions with alternative models']
    };
  }

  if (q.includes('review') || q.includes('opinion') || q.includes('pros') || q.includes('cons') || q.includes('sentiment')) {
    const summary = product.aiReviewSummary || generateAiReviewSummary(product);
    return {
      answer: `Here is the AI summary of **${product.reviewCount} customer reviews** (${product.rating} ★ average):\n\n• **Pros**: ${summary.pros.join(', ')}.\n• **Key takeaway**: ${summary.summaryText}`,
      sourceCitations: ['Analyzed 100% of Verified Purchases on Amazon', 'AI Sentiment Engine'],
      suggestedFollowUps: ['What do critical 1-star reviews say?', 'Show photo reviews from customers', 'Is this worth the price compared to competitors?']
    };
  }

  if (q.includes('box') || q.includes('include') || q.includes('cable') || q.includes('accessories')) {
    return {
      answer: `Inside the box with your ${product.name}, you receive the main unit, official documentation/quick start guide, manufacturer warranty card, and essential accessories. It ships in standard protective Amazon packaging.`,
      sourceCitations: ['Package Contents Breakdown', 'Unboxing Customer Photos'],
      suggestedFollowUps: ['What accessories do people frequently buy with this?', 'Is there an extended protection plan available?']
    };
  }

  if (q.includes('compare') || q.includes('better') || q.includes('difference')) {
    const competitors = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 2);
    return {
      answer: `Compared to similar models in ${product.category}, this ${product.name} stands out for its **${product.highlights[0] || 'premium build'}** and higher customer rating (${product.rating}★ vs category average of 4.5★).`,
      sourceCitations: ['Side-by-Side Category Matrix', 'Amazon Best Sellers Index'],
      suggestedFollowUps: ['Show detailed comparison table', 'Which one has the best warranty?'],
      recommendedProducts: competitors
    };
  }

  // Default smart product answer
  return {
    answer: `The **${product.name}** by ${product.brand} is currently rated **${product.rating} / 5.0** (${product.reviewCount} reviews). Key highlights include:\n\n1. ${product.highlights[0] || 'Top performance'}\n2. ${product.highlights[1] || 'Premium design'}\n3. ${product.highlights[2] || 'Fast Prime Delivery'}\n\nIt is ${product.isPrimeEligible ? 'eligible for FREE Prime One-Day delivery' : 'ready to ship'} with standard 30-day hassle-free returns.`,
    sourceCitations: ['Amazon Catalog Data', 'Seller Warranty Specifications'],
    suggestedFollowUps: [
      'What do reviewers say about battery & build quality?',
      'Does it have a discount or promo code?',
      'What are the frequently bought together accessories?'
    ]
  };
}
