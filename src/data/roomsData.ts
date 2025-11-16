export interface Room {
  id: string;
  slug: string; // URL-friendly identifier
  name: string;
  category: 'DELUXE' | 'SUITE' | 'VILLA' | 'PENTHOUSE' | 'STUDIO';
  price: number;
  originalPrice?: number; // For showing discounts
  description: string;
  fullDescription: string[];
  images: string[];
  features: {
    icon: string;
    text: string;
  }[];
  amenities: string[];
  size: number; // sq ft
  maxGuests: number;
  bedType: string;
  viewType: string;
  isAIRecommended?: boolean;
  specialOffer?: {
    type: 'DISCOUNT' | 'BEST_VALUE';
    text: string;
  };
  availability: 'HIGH' | 'MEDIUM' | 'LOW';
  rating?: {
    score: number; // 0-5
    count: number; // Number of reviews
  };
}

export const roomsData: Room[] = [
  {
    id: 'deluxe-ocean-view',
    slug: 'deluxe-ocean-view',
    name: 'Deluxe Ocean View',
    category: 'DELUXE',
    price: 299,
    description: 'Spacious room with panoramic ocean views and private balcony',
    fullDescription: [
      'Experience breathtaking ocean views from your private balcony in our Deluxe Ocean View room. This elegantly appointed space combines contemporary luxury with coastal charm.',
      'The room features a plush king-size bed, modern amenities, and floor-to-ceiling windows that flood the space with natural light. Perfect for couples seeking a romantic getaway.',
      'Wake up to the sound of waves and enjoy your morning coffee while watching the sunrise over the Pacific Ocean.'
    ],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    features: [
      { icon: 'Bed', text: 'King Bed' },
      { icon: 'Maximize', text: '450 sq ft' },
      { icon: 'Eye', text: 'Ocean View' },
      { icon: 'Users', text: '2 Guests' }
    ],
    amenities: [
      'King-size bed',
      'Private balcony',
      'Ocean views',
      'Rain shower',
      'Premium toiletries',
      'Minibar',
      'Nespresso machine',
      'Smart TV 55"',
      'High-speed WiFi',
      'Work desk',
      'In-room safe',
      'Bathrobes & slippers',
      'Daily housekeeping',
      'Iron & ironing board',
      'Hair dryer',
      'Air conditioning'
    ],
    size: 450,
    maxGuests: 2,
    bedType: 'King Bed',
    viewType: 'Ocean View',
    isAIRecommended: true,
    availability: 'MEDIUM',
    rating: {
      score: 4.8,
      count: 124
    }
  },
  {
    id: 'premium-suite',
    slug: 'premium-suite',
    name: 'Premium Suite',
    category: 'SUITE',
    price: 499,
    description: 'Luxurious suite with separate living area and spa bathroom',
    fullDescription: [
      'Our Premium Suite offers the perfect blend of comfort and sophistication. With a separate living area and bedroom, you\'ll have ample space to relax and unwind.',
      'The suite features a king-size bed in the master bedroom, a spacious living room with a sofa bed, and a luxurious spa bathroom with both a rain shower and soaking tub.',
      'Ideal for extended stays or guests who appreciate extra space and premium amenities.'
    ],
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    features: [
      { icon: 'Bed', text: 'King Bed' },
      { icon: 'Maximize', text: '750 sq ft' },
      { icon: 'Eye', text: 'Suite' },
      { icon: 'Users', text: '3 Guests' }
    ],
    amenities: [
      'King-size bed',
      'Separate living area',
      'Spa bathroom',
      'Rain shower',
      'Soaking bathtub',
      'Premium toiletries',
      'Minibar',
      'Nespresso machine',
      'Smart TV 65"',
      'High-speed WiFi',
      'Work desk',
      'In-room safe',
      'Private balcony',
      'Bathrobes & slippers',
      'Daily housekeeping',
      'Iron & ironing board',
      'Hair dryer',
      'Air conditioning',
      'Sofa bed'
    ],
    size: 750,
    maxGuests: 3,
    bedType: 'King Bed',
    viewType: 'Suite',
    isAIRecommended: true,
    specialOffer: {
      type: 'BEST_VALUE',
      text: 'BEST VALUE'
    },
    availability: 'HIGH',
    rating: {
      score: 4.9,
      count: 203
    }
  },
  {
    id: 'penthouse',
    slug: 'penthouse',
    name: 'Penthouse',
    category: 'PENTHOUSE',
    price: 899,
    description: 'Ultimate luxury with panoramic views and private terrace',
    fullDescription: [
      'Experience the pinnacle of luxury in our exclusive Penthouse suite. Occupying the entire top floor, this magnificent space offers 360-degree panoramic views of the ocean and coastline.',
      'The Penthouse features two bedrooms, two and a half bathrooms, a gourmet kitchenette, formal dining area, and an expansive private terrace with outdoor seating and jacuzzi.',
      'Perfect for special occasions, this is our most exclusive offering with unparalleled views, space, and amenities.'
    ],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    features: [
      { icon: 'Bed', text: '2 King Beds' },
      { icon: 'Maximize', text: '1,800 sq ft' },
      { icon: 'Eye', text: 'Panoramic View' },
      { icon: 'Users', text: '6 Guests' }
    ],
    amenities: [
      '2 King-size bedrooms',
      'Private terrace',
      'Outdoor jacuzzi',
      'Panoramic ocean views',
      '2.5 bathrooms',
      'Rain showers',
      'Soaking bathtubs',
      'Premium toiletries',
      'Full minibar',
      'Nespresso machine',
      'Wine cooler',
      'Gourmet kitchenette',
      'Formal dining area',
      'Smart TVs in all rooms',
      'High-speed WiFi',
      'Work desk',
      'In-room safe',
      'Bathrobes & slippers',
      'Daily housekeeping',
      'Butler service',
      'Private check-in',
      'Complimentary breakfast'
    ],
    size: 1800,
    maxGuests: 6,
    bedType: '2 King Beds',
    viewType: 'Panoramic View',
    specialOffer: {
      type: 'DISCOUNT',
      text: '15% OFF'
    },
    availability: 'LOW',
    originalPrice: 1059,
    rating: {
      score: 5.0,
      count: 87
    }
  },
  {
    id: 'garden-villa',
    slug: 'garden-villa',
    name: 'Garden Villa',
    category: 'VILLA',
    price: 649,
    description: 'Private villa with lush garden and outdoor shower',
    fullDescription: [
      'Escape to your own private paradise in our Garden Villa. Surrounded by lush tropical gardens, this standalone villa offers complete privacy and tranquility.',
      'The villa features a spacious bedroom, living area, and a unique outdoor bathroom with a rain shower surrounded by bamboo and tropical plants.',
      'Enjoy your private garden terrace, perfect for morning yoga or evening cocktails in complete seclusion.'
    ],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    features: [
      { icon: 'Bed', text: 'King Bed' },
      { icon: 'Maximize', text: '950 sq ft' },
      { icon: 'Eye', text: 'Garden View' },
      { icon: 'Users', text: '2 Guests' }
    ],
    amenities: [
      'King-size bed',
      'Private garden',
      'Outdoor shower',
      'Garden terrace',
      'Spa bathroom',
      'Rain shower',
      'Soaking bathtub',
      'Premium toiletries',
      'Minibar',
      'Nespresso machine',
      'Smart TV 55"',
      'High-speed WiFi',
      'Work desk',
      'In-room safe',
      'Bathrobes & slippers',
      'Yoga mats',
      'Daily housekeeping',
      'Air conditioning',
      'Ceiling fan'
    ],
    size: 950,
    maxGuests: 2,
    bedType: 'King Bed',
    viewType: 'Garden View',
    availability: 'MEDIUM'
  },
  {
    id: 'beach-villa',
    slug: 'beach-villa',
    name: 'Beach Villa',
    category: 'VILLA',
    price: 799,
    description: 'Direct beach access with private pool and terrace',
    fullDescription: [
      'Step directly onto the sand from your private Beach Villa. This exclusive accommodation offers the ultimate beach experience with direct ocean access.',
      'The villa features a master bedroom, living area, private pool, and expansive terrace with ocean views. Enjoy morning swims in your private pool or step directly onto the beach.',
      'Perfect for beach lovers seeking privacy and luxury in a stunning beachfront setting.'
    ],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    features: [
      { icon: 'Bed', text: 'King Bed' },
      { icon: 'Maximize', text: '1,200 sq ft' },
      { icon: 'Eye', text: 'Beachfront' },
      { icon: 'Users', text: '4 Guests' }
    ],
    amenities: [
      'King-size bed',
      'Private pool',
      'Direct beach access',
      'Ocean terrace',
      'Outdoor shower',
      'Spa bathroom',
      'Rain shower',
      'Soaking bathtub',
      'Premium toiletries',
      'Full minibar',
      'Nespresso machine',
      'Kitchenette',
      'Smart TV 65"',
      'High-speed WiFi',
      'Work desk',
      'In-room safe',
      'Bathrobes & slippers',
      'Beach loungers',
      'Daily housekeeping',
      'Air conditioning'
    ],
    size: 1200,
    maxGuests: 4,
    bedType: 'King Bed',
    viewType: 'Beachfront',
    isAIRecommended: true,
    availability: 'LOW',
    rating: {
      score: 4.7,
      count: 156
    }
  },
  {
    id: 'family-suite',
    slug: 'family-suite',
    name: 'Family Suite',
    category: 'SUITE',
    price: 549,
    description: 'Spacious suite perfect for families with connecting rooms',
    fullDescription: [
      'Our Family Suite is designed with families in mind. This spacious accommodation features a master bedroom with king bed and a separate children\'s room with two twin beds.',
      'The suite includes a living area with sofa bed, two bathrooms, and family-friendly amenities including games, children\'s bathrobes, and a welcome gift for kids.',
      'Perfect for families seeking comfort and space during their vacation.'
    ],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    features: [
      { icon: 'Bed', text: 'King + 2 Twins' },
      { icon: 'Maximize', text: '900 sq ft' },
      { icon: 'Eye', text: 'Suite' },
      { icon: 'Users', text: '6 Guests' }
    ],
    amenities: [
      'King-size bed',
      '2 twin beds',
      'Living area',
      'Sofa bed',
      '2 bathrooms',
      'Rain showers',
      'Premium toiletries',
      'Minibar',
      'Nespresso machine',
      'Kitchenette',
      'Smart TV 55"',
      'High-speed WiFi',
      'Work desk',
      'In-room safe',
      'Bathrobes & slippers',
      'Kids bathrobes',
      'Board games',
      'Welcome gift for kids',
      'Daily housekeeping',
      'Air conditioning'
    ],
    size: 900,
    maxGuests: 6,
    bedType: 'King + 2 Twins',
    viewType: 'Suite',
    availability: 'HIGH'
  },
  {
    id: 'honeymoon-suite',
    slug: 'honeymoon-suite',
    name: 'Honeymoon Suite',
    category: 'SUITE',
    price: 699,
    description: 'Romantic suite with private jacuzzi and ocean views',
    fullDescription: [
      'Celebrate your love in our romantic Honeymoon Suite. This intimate space is designed for couples seeking a romantic escape with luxurious amenities.',
      'The suite features a king bed, private jacuzzi with ocean views, rose petal turndown service, and champagne on arrival. The spacious bathroom includes a rain shower and aromatherapy.',
      'Perfect for honeymoons, anniversaries, or romantic getaways.'
    ],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    features: [
      { icon: 'Bed', text: 'King Bed' },
      { icon: 'Maximize', text: '680 sq ft' },
      { icon: 'Eye', text: 'Ocean View' },
      { icon: 'Users', text: '2 Guests' }
    ],
    amenities: [
      'King-size bed',
      'Private jacuzzi',
      'Ocean views',
      'Private balcony',
      'Spa bathroom',
      'Rain shower',
      'Aromatherapy',
      'Premium toiletries',
      'Minibar',
      'Champagne on arrival',
      'Rose petal turndown',
      'Nespresso machine',
      'Smart TV 55"',
      'High-speed WiFi',
      'In-room safe',
      'Bathrobes & slippers',
      'Daily housekeeping',
      'Romance package available',
      'Air conditioning'
    ],
    size: 680,
    maxGuests: 2,
    bedType: 'King Bed',
    viewType: 'Ocean View',
    availability: 'MEDIUM'
  },
  {
    id: 'junior-suite',
    slug: 'junior-suite',
    name: 'Junior Suite',
    category: 'SUITE',
    price: 399,
    description: 'Comfortable suite with sitting area and modern amenities',
    fullDescription: [
      'Our Junior Suite offers a perfect balance of space and value. This well-appointed suite features a bedroom area and separate sitting space.',
      'The suite includes a king bed, comfortable seating area, work desk, and modern bathroom with rain shower. Ideal for business travelers or couples wanting extra space.',
      'Enjoy all the amenities of our premium suites at an accessible price point.'
    ],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    features: [
      { icon: 'Bed', text: 'King Bed' },
      { icon: 'Maximize', text: '550 sq ft' },
      { icon: 'Eye', text: 'Suite' },
      { icon: 'Users', text: '2 Guests' }
    ],
    amenities: [
      'King-size bed',
      'Sitting area',
      'Rain shower',
      'Premium toiletries',
      'Minibar',
      'Nespresso machine',
      'Smart TV 50"',
      'High-speed WiFi',
      'Work desk',
      'In-room safe',
      'Bathrobes & slippers',
      'Daily housekeeping',
      'Iron & ironing board',
      'Hair dryer',
      'Air conditioning'
    ],
    size: 550,
    maxGuests: 2,
    bedType: 'King Bed',
    viewType: 'Suite',
    availability: 'HIGH'
  },
  {
    id: 'executive-suite',
    slug: 'executive-suite',
    name: 'Executive Suite',
    category: 'SUITE',
    price: 599,
    description: 'Business-ready suite with office space and meeting area',
    fullDescription: [
      'Our Executive Suite is designed for the modern business traveler. This sophisticated space combines comfort with functionality.',
      'The suite features a separate bedroom, home office with executive desk and ergonomic chair, meeting area for up to 4 people, and high-speed business-grade WiFi.',
      'Complimentary access to business center, printing services, and express laundry included.'
    ],
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    features: [
      { icon: 'Bed', text: 'King Bed' },
      { icon: 'Maximize', text: '720 sq ft' },
      { icon: 'Eye', text: 'Suite' },
      { icon: 'Users', text: '2 Guests' }
    ],
    amenities: [
      'King-size bed',
      'Home office',
      'Executive desk',
      'Ergonomic chair',
      'Meeting area',
      'Business-grade WiFi',
      'Rain shower',
      'Premium toiletries',
      'Minibar',
      'Nespresso machine',
      'Smart TV 55"',
      'Printer access',
      'In-room safe',
      'Bathrobes & slippers',
      'Daily housekeeping',
      'Express laundry',
      'Business center access',
      'Air conditioning'
    ],
    size: 720,
    maxGuests: 2,
    bedType: 'King Bed',
    viewType: 'Suite',
    availability: 'MEDIUM'
  },
  {
    id: 'royal-suite',
    slug: 'royal-suite',
    name: 'Royal Suite',
    category: 'PENTHOUSE',
    price: 1299,
    description: 'Our most prestigious suite with butler service',
    fullDescription: [
      'Experience royalty in our magnificent Royal Suite. This palatial accommodation spans 2,200 square feet of pure luxury.',
      'The suite features two master bedrooms, formal living and dining rooms, private library, butler\'s pantry, and three marble bathrooms. Your personal butler is available 24/7.',
      'Reserved for our most discerning guests, the Royal Suite offers the ultimate in luxury hospitality.'
    ],
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80'
    ],
    features: [
      { icon: 'Bed', text: '2 King Beds' },
      { icon: 'Maximize', text: '2,200 sq ft' },
      { icon: 'Eye', text: 'Panoramic View' },
      { icon: 'Users', text: '6 Guests' }
    ],
    amenities: [
      '2 King-size bedrooms',
      'Formal living room',
      'Formal dining room',
      'Private library',
      'Butler service 24/7',
      '3 marble bathrooms',
      'Rain showers',
      'Soaking bathtubs',
      'Premium toiletries',
      'Full bar',
      'Wine cellar',
      'Nespresso machine',
      'Kitchenette',
      'Smart TVs in all rooms',
      'High-speed WiFi',
      'Work desk',
      'In-room safe',
      'Bathrobes & slippers',
      'Private terrace',
      'Daily housekeeping',
      'Turndown service',
      'Private check-in',
      'Complimentary breakfast',
      'Airport transfer'
    ],
    size: 2200,
    maxGuests: 6,
    bedType: '2 King Beds',
    viewType: 'Panoramic View',
    availability: 'LOW'
  },
  {
    id: 'studio-room',
    slug: 'studio-room',
    name: 'Studio Room',
    category: 'STUDIO',
    price: 249,
    description: 'Modern, efficient space perfect for solo travelers',
    fullDescription: [
      'Our Studio Room is perfect for solo travelers or couples seeking a comfortable, efficient space. This modern room maximizes every inch with smart design.',
      'The studio features a queen bed, compact work area, and well-designed bathroom with rain shower. Despite its compact size, the room feels spacious and bright.',
      'Great value with all essential amenities included.'
    ],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    features: [
      { icon: 'Bed', text: 'Queen Bed' },
      { icon: 'Maximize', text: '320 sq ft' },
      { icon: 'Eye', text: 'City View' },
      { icon: 'Users', text: '2 Guests' }
    ],
    amenities: [
      'Queen-size bed',
      'Compact work area',
      'Rain shower',
      'Premium toiletries',
      'Minibar',
      'Coffee maker',
      'Smart TV 43"',
      'High-speed WiFi',
      'In-room safe',
      'Hair dryer',
      'Daily housekeeping',
      'Air conditioning'
    ],
    size: 320,
    maxGuests: 2,
    bedType: 'Queen Bed',
    viewType: 'City View',
    availability: 'HIGH'
  },
  {
    id: 'corner-suite',
    slug: 'corner-suite',
    name: 'Corner Suite',
    category: 'SUITE',
    price: 749,
    description: 'Unique corner location with wraparound windows and dual views',
    fullDescription: [
      'Our Corner Suite occupies a premium corner location, offering panoramic views through floor-to-ceiling wraparound windows.',
      'This unique suite features a spacious bedroom, living area, and bathroom with both ocean and city views. The abundant natural light creates an airy, luxurious atmosphere.',
      'Perfect for guests who appreciate exceptional views and natural light.'
    ],
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    features: [
      { icon: 'Bed', text: 'King Bed' },
      { icon: 'Maximize', text: '820 sq ft' },
      { icon: 'Eye', text: 'Dual Views' },
      { icon: 'Users', text: '3 Guests' }
    ],
    amenities: [
      'King-size bed',
      'Wraparound windows',
      'Ocean & city views',
      'Living area',
      'Sofa bed',
      'Spa bathroom',
      'Rain shower',
      'Soaking bathtub',
      'Premium toiletries',
      'Minibar',
      'Nespresso machine',
      'Smart TV 60"',
      'High-speed WiFi',
      'Work desk',
      'In-room safe',
      'Bathrobes & slippers',
      'Daily housekeeping',
      'Air conditioning'
    ],
    size: 820,
    maxGuests: 3,
    bedType: 'King Bed',
    viewType: 'Dual Views',
    isAIRecommended: true,
    availability: 'MEDIUM'
  }
];
