import { Experience } from '@/types';

export const MOCK_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    title: 'Sunset Kayaking on Pawna Lake',
    slug: 'sunset-kayaking',
    category: 'Water Sports',
    duration: '1.5 Hours',
    pricePerPerson: 499,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    description: 'Paddle across calm, golden lake waters as the sun dips behind the Western Ghats mountain range.',
    included: ['Single/Double Kayak', 'Safety Lifejacket', 'Certified Instructor', 'Waterproof Phone Case'],
    timing: '5:00 PM – 6:30 PM',
    isPopular: true
  },
  {
    id: 'exp-2',
    title: 'Acoustic Bonfire & Live Guitar Night',
    slug: 'bonfire-guitar-night',
    category: 'Nightlife',
    duration: '3 Hours',
    pricePerPerson: 299,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    description: 'Gather around a roaring campfire with marshmallows, warm tea, and acoustic songs played by local artists.',
    included: ['Campfire Access', 'Acoustic Guitarist', 'Unlimited Marshmallows', 'Hot Chai & Coffee'],
    timing: '8:00 PM – 11:00 PM',
    isPopular: true
  },
  {
    id: 'exp-3',
    title: 'Lakeside BBQ & Marinated Grill Session',
    slug: 'lakeside-bbq',
    category: 'Food',
    duration: '2 Hours',
    pricePerPerson: 599,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    description: 'Grill your own choice of paneer, veggies, or marinated chicken over hot charcoal embers right by your tent.',
    included: ['Charcoal Grill Kit', '250g Veg/Non-Veg Skewers', 'Dip & Seasonings', 'Personal Chef Assist'],
    timing: '7:30 PM – 9:30 PM',
    isPopular: true
  },
  {
    id: 'exp-4',
    title: 'Tikona Fort Sunrise Trek',
    slug: 'tikona-fort-trek',
    category: 'Outdoor',
    duration: '3.5 Hours',
    pricePerPerson: 399,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    description: 'Guided early morning climb up historic Tikona Fort offering 360-degree views of Pawna Dam.',
    included: ['Local Guide', 'Energy Drinks & Fruit', 'First Aid Support', 'Fort Entry Access'],
    timing: '5:30 AM – 9:00 AM',
    isPopular: false
  }
];
