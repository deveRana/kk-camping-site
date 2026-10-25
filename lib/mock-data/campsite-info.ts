import { CampsiteMasterInfo } from '@/types';

export const PAWNA_CAMPSITE_MASTER_DATA: CampsiteMasterInfo = {
  name: 'Lakeora Cafe & Camping',
  brandName: 'Lakeora',
  tagline: 'Lakeside Camping & Glamping at Pawna Lake with Live Music & Water Views',
  website: 'https://pawnatentcamp.com/',
  contactNumbers: ['+91 74997 57607'],
  paymentMethods: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking'],
  paymentGateway: 'Razorpay',
  
  location: {
    address: 'Lakeora, Pawna Lake, Thakursai-Aajiwali Rd, At, Gevhande Khadak, Maharashtra 410406',
    landmark: 'Gevhande Khadak, Pawna Lake, Near Lonavala / Pune',
    googleMapsUrl: 'https://maps.app.goo.gl/c6JVSxCKqkyfMrR47',
    coordinates: {
      lat: 18.6825,
      lng: 73.4912
    }
  },

  checkInTime: '04:00 PM',
  checkOutTime: '11:00 AM',

  freeActivities: [
    'Archery 🏹',
    'Dart Game 🎯',
    'Cricket 🏏',
    'Badminton 🏸',
    'Carrom ♟️',
    'Chess ♟️',
    'Volleyball 🏐',
    'Football ⚽'
  ],

  otherFacilities: [
    'Common Toilets 🚽',
    'Attached Washrooms (in select stays)',
    'First Aid Kit 🚑',
    'Free Vehicle Parking 🅿️',
    'Music System / DJ 🎧',
    'Live Acoustic Campfire Music 🔥'
  ],

  additionalServices: [
    {
      name: 'Boating',
      included: false,
      note: 'Boating is not included in package; payable extra directly at lake spot.'
    }
  ],

  tentArrangement: {
    sharingTypes: ['2 Person Sharing', '3 Person Sharing', '4 Person Sharing'],
    privacyGuarantee: 'Separate private tents allocated based on your group size. You will NEVER have to share a tent with unknown persons.',
    beddingProvided: [
      'Foam Mattresses',
      'Clean Bedsheet',
      'Pillows',
      'Warm Blanket'
    ],
    hygieneNotice: 'We do not provide sleeping bags for strict hygiene and cleanliness standards.'
  },

  schedule: [
    {
      day: 'Day 1',
      title: 'Arrival, Sunset, Barbeque & Musical Night',
      items: [
        {
          time: '04:00 PM',
          title: 'Reporting & Check-in',
          description: 'Arrive at campsite, easy check-in, free parking, and tent/cottage allocation.',
          icon: 'clock'
        },
        {
          time: '04:30 PM',
          title: 'High Tea & Snacks',
          description: 'Fresh hot Pakodas served with unlimited Tea and Coffee by the lakeside.',
          icon: 'tea'
        },
        {
          time: '06:30 PM',
          title: 'Sunset Views & DJ Evening',
          description: 'Soak in the panoramic Pawna Lake sunset while warm evening DJ music begins.',
          icon: 'sun'
        },
        {
          time: '07:00 PM - 08:30 PM',
          title: 'Barbeque (Veg & Non-Veg)',
          description: 'Hot sizzling BBQ: Marinated Paneer & Veggies or Marinated Chicken (5-6 pcs/person).',
          icon: 'bbq'
        },
        {
          time: '09:30 PM - 11:00 PM',
          title: 'Unlimited Dinner',
          description: 'Delicious buffet featuring Paneer, Chicken Curry, Chapati, Rice, Salad & Sweets.',
          icon: 'food'
        },
        {
          time: '12:00 AM',
          title: 'Campfire with Live Acoustic Music',
          description: 'Gather around the cozy bonfire for acoustic songs under starry night sky.',
          icon: 'bonfire'
        },
        {
          time: '01:00 AM - 07:00 AM',
          title: 'Silent Hours',
          description: 'Quiet restful night surrounded by calm lake breeze and nature.',
          icon: 'moon'
        }
      ]
    },
    {
      day: 'Day 2',
      title: 'Morning Lake Sunrise, Breakfast & Farewell',
      items: [
        {
          time: '07:00 AM',
          title: 'Morning Sunrise Call',
          description: 'Wake up to fresh mountain air and stunning golden sunrise over Pawna Lake.',
          icon: 'sun'
        },
        {
          time: '08:00 AM - 09:30 AM',
          title: 'Hearty Breakfast',
          description: 'Hot Poha, Bread Butter & Jam served with Tea and Coffee.',
          icon: 'coffee'
        },
        {
          time: '11:00 AM',
          title: 'Check-out',
          description: 'Pack warm memories and check out from the campsite.',
          icon: 'flag'
        }
      ]
    }
  ],

  foodMenu: [
    {
      categoryName: 'Evening Snacks',
      type: 'Snacks',
      timing: '04:30 PM - 05:30 PM',
      isUnlimited: true,
      vegOptions: ['Crispy Hot Pakodas', 'Hot Tea', 'Coffee'],
      specialNote: 'Unlimited servings provided during high tea hour.'
    },
    {
      categoryName: 'Barbeque (Limited)',
      type: 'BBQ',
      timing: '07:00 PM - 08:30 PM',
      isUnlimited: false,
      vegOptions: ['Marinated Paneer with Assorted Veggies (Limited portion)'],
      nonVegOptions: ['Marinated Chicken (5 to 6 pieces per person)'],
      specialNote: 'Served hot right by the grill.'
    },
    {
      categoryName: 'Dinner Buffet',
      type: 'Dinner',
      timing: '09:30 PM - 11:00 PM',
      isUnlimited: true,
      vegOptions: [
        'Paneer Butter Masala / Paneer Mutter',
        'Aalu Sabji / Potato Curry',
        'Dal Tadka',
        'Jeera Rice',
        'Fresh Roti / Chapati',
        'Salad, Papad & Pickle',
        'Sweet Dish'
      ],
      nonVegOptions: [
        'Chicken Sukha / Chicken Masala',
        'Egg Curry',
        'Jeera Rice',
        'Fresh Roti / Chapati',
        'Salad & Sweet Dish'
      ],
    },
    {
      categoryName: 'Morning Breakfast',
      type: 'Breakfast',
      timing: '08:00 AM - 09:30 AM',
      isUnlimited: true,
      vegOptions: ['Fresh Hot Poha', 'Bread with Butter & Jam', 'Tea', 'Coffee']
    }
  ],

  packages: [
    {
      id: 'pkg-machang-cottage',
      slug: 'machang-cottages',
      name: 'Machang Cottages',
      tagline: 'Elevated wooden machang stay with attached light, fan, power board, and private washroom',
      pricePerPerson: 2500,
      washroomType: 'Attached',
      capacity: '2/3 Guests sharing',
      hasAttachedWashroom: true,
      hasLightFanBoard: true,
      category: 'Cottage',
      coverImage: '/machang-cottage-images/machang-cottage-1.jpg',
      gallery: [
        '/machang-cottage-images/machang-cottage-1.jpg',
        '/machang-cottage-images/machang-cottage-2.jpg',
        '/machang-cottage-images/machang-cottage-3.jpg'
      ],
      highlights: [
        'Attached Private Washroom',
        'In-room Light, Fan & Charging Board',
        'Lakeside View Porch',
        'Includes Meals, BBQ & Campfire'
      ],
      inclusions: [
        '2/3 Person Sharing Machang Accommodation',
        'Attached Light, Fan, Power Board',
        'Attached Clean Washroom',
        'Evening High Tea & Hot Pakodas',
        'Barbeque (Veg / Non-Veg)',
        'Unlimited Dinner Buffet (Veg / Non-Veg)',
        'Live Acoustic Music Campfire',
        'Morning Breakfast & Tea',
        'Free Outdoor & Indoor Games Access',
        'First Aid & Parking'
      ]
    },
    {
      id: 'pkg-swiss-tent',
      slug: 'swiss-tent',
      name: 'Swiss Tent (Attached Washroom)',
      tagline: 'Spacious luxury Swiss tent with attached washroom, light, fan & electricity board',
      pricePerPerson: 2300,
      originalPricePerPerson: 2500,
      washroomType: 'Attached',
      capacity: '2/3 Guests sharing',
      hasAttachedWashroom: true,
      hasLightFanBoard: true,
      category: 'Glamping',
      coverImage: '/swiss-tent/swiss-tent-1.jpg',
      gallery: [
        '/swiss-tent/swiss-tent-1.jpg',
        '/white-tent/white-tent-1.jpg'
      ],
      highlights: [
        'Attached Private Washroom',
        'Equipped with Light, Fan & Charging Board',
        'High Density Foam Mattresses & Blankets',
        'Includes All Meals, BBQ & Live Music'
      ],
      inclusions: [
        '2/3 Person Sharing Swiss Tent',
        'Attached Private Washroom',
        'Attached Light, Fan & Charging Board',
        'Evening High Tea with Pakoda',
        'Limited Veg / Non-Veg Barbeque',
        'Unlimited Dinner Buffet (Veg / Non-Veg)',
        'Campfire with Acoustic Live Music',
        'Morning Sunrise & Breakfast',
        'All Free Sports & Activities',
        'First Aid & Free Parking'
      ]
    },
    {
      id: 'pkg-white-tent',
      slug: 'white-tent',
      name: 'White Tent (With Light, Fan & Board)',
      tagline: 'Premium white canvas tent equipped with interior light, fan, and charging board',
      pricePerPerson: 1700,
      washroomType: 'Common',
      capacity: '2/3 Guests sharing',
      hasAttachedWashroom: false,
      hasLightFanBoard: true,
      category: 'Dome',
      coverImage: '/white-tent/white-tent-1.jpg',
      gallery: [
        '/white-tent/white-tent-1.jpg',
        '/white-tent/white-tent-2.jpg',
        '/white-tent/white-tent-3.jpg',
        '/white-tent/white-tent-4.jpg'
      ],
      highlights: [
        'Light, Fan & Power Socket inside Tent',
        'Clean Mattress, Sheet, Pillow & Blanket',
        'Common Clean Toilets',
        'Includes Tea, BBQ, Dinner & Music'
      ],
      inclusions: [
        '2/3 Person Sharing Premium White Tent',
        'Interior Light, Fan & Power Board',
        'Mattress, Pillow, Sheet & Blanket',
        'Evening High Tea & Pakoda',
        'Veg / Non-Veg BBQ',
        'Unlimited Dinner (Veg / Non-Veg)',
        'Live Music & Campfire',
        'Morning Breakfast',
        'Free Outdoor & Indoor Games',
        'Common Clean Washrooms & Parking'
      ]
    },
    {
      id: 'pkg-normal-tent',
      slug: 'normal-waterproof-tent',
      name: 'Normal Waterproof Tent',
      tagline: 'Classic waterproof camping tent right by the lake, perfect for friends, couples & groups',
      pricePerPerson: 1200,
      washroomType: 'Common',
      capacity: '2/3/4 Guests sharing',
      hasAttachedWashroom: false,
      hasLightFanBoard: false,
      category: 'Tent Camping',
      coverImage: '/normal-tent/normal-tent-1.jpeg',
      gallery: [
        '/normal-tent/normal-tent-1.jpeg',
        '/normal-tent/normal-tent-2.jpeg',
        '/normal-tent/normal-tent-3.jpeg'
      ],
      highlights: [
        'Waterproof Double-Layer Tent',
        'Private tent for your group (no forced sharing)',
        'Foam Mattress, Pillow & Blanket Provided',
        'Budget-Friendly Complete Package'
      ],
      inclusions: [
        '2/3/4 Person Waterproof Tent',
        'Foam Mattresses, Pillow & Blanket',
        'Evening High Tea & Pakoda',
        'Barbeque (Veg / Non-Veg)',
        'Unlimited Dinner Buffet (Veg / Non-Veg)',
        'Live Acoustic Campfire & Music',
        'Morning Breakfast',
        'Archery, Cricket, Volleyball, Carrom, Chess',
        'Common Clean Toilets & First Aid'
      ]
    },
    {
      id: 'pkg-maitri-camping',
      slug: 'maitri-camping',
      name: 'Maitri Camping',
      tagline: 'Affordable lakeside camping with complete meals, BBQ, and free activities for couples & families',
      pricePerPerson: 1500,
      washroomType: 'Common',
      capacity: '2/3/4 Guests sharing',
      hasAttachedWashroom: false,
      hasLightFanBoard: true,
      category: 'Tent Camping',
      coverImage: '/normal-tent/normal-tent-2.jpeg',
      gallery: [
        '/normal-tent/normal-tent-2.jpeg',
        '/normal-tent/normal-tent-1.jpeg',
        '/normal-tent/normal-tent-3.jpeg'
      ],
      highlights: [
        'Western Toilet Facility',
        'Free Sports Activities (Badminton, Cricket, Volleyball, Archery)',
        'Complete Meal Plan with BBQ',
        'Music System & Entertainment'
      ],
      inclusions: [
        '2/3/4 Person Sharing Waterproof Tents',
        'Western Toilet Access',
        'Free Parking',
        'Evening Snacks & High Tea',
        'Free Activities: Badminton, Football, Volleyball, Cricket, Archery 🏏🏹⚽',
        'Music System for Entertainment 🎼',
        'Limited Veg / Non-Veg BBQ (7:00 PM - 8:30 PM) 🍢',
        'Unlimited Dinner Buffet (9:30 PM - 11:00 PM)',
        'Veg: Paneer Masala, Dal, Roti, Rice, Aalu Sabji, Salad, Sweet',
        'Non-Veg: Chicken Masala, Chicken Curry, Roti, Rice, Salad, Sweet',
        'Morning Breakfast: Poha & Tea',
        'Check-in: 4:00 PM | Check-out: 11:00 AM',
        'Contact: +91 95271 43112'
      ],
      // Maitri Camping specific location data
      googleMapsUrl: 'https://www.google.com/maps/place/Pawna+Tent+Camp+by+Maitri+Pawna+Lake+Camping+for+Couples+%26+Family+Lonavala+%7C+Tent+%26+Cottage+Camping/@18.6324747,73.4943782,17z/data=!4m9!3m8!1s0x3bc2a7ea40fa93d5:0xd347c333111ba7d8!5m2!4m1!1i2!8m2!3d18.6311632!4d73.4951721!16s%2Fg%2F11x8v2c58q',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.7018670068865!2d73.49437816613157!3d18.632474684937243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2a7ea40fa93d5%3A0xd347c333111ba7d8!2sPawna%20Tent%20Camp%20by%20Maitri%20Pawna%20Lake%20Camping%20for%20Couples%20%26%20Family%20Lonavala%20%7C%20Tent%20%26%20Cottage%20Camping!5e0!3m2!1sen!2sin!4v1792930352424!5m2!1sen!2sin',
      locationName: 'Pawna Tent Camp by Maitri - Lonavala',
      coordinates: {
        lat: 18.6311632,
        lng: 73.4951721
      }
    }
  ]
};
