export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Glamping' | 'Cottage' | 'Dome' | 'Tent Camping' | 'Villa';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  location: string;
  distance: string;
  capacity: string;
  coverImage: string;
  gallery: string[];
  description: string;
  features: string[];
  inclusions?: string[];
  amenities: Array<{
    icon: string;
    name: string;
  }>;
  host: {
    name: string;
    avatar: string;
    superhost: boolean;
    joined: string;
    phone: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  isPopular?: boolean;
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  stayType: string;
  comment: string;
}

export interface Experience {
  id: string;
  title: string;
  slug: string;
  category: 'Water Sports' | 'Nightlife' | 'Food' | 'Outdoor' | 'Relaxation';
  duration: string;
  pricePerPerson: number;
  image: string;
  description: string;
  included: string[];
  timing: string;
  isPopular?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
}

export interface Booking {
  id: string;
  referenceId: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  totalAmount: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  paymentMethod: string;
  bookedOn: string;
  addOns?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Booking & Payment' | 'Check-in/out' | 'Food & Activities' | 'Safety';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  stayType: string;
  comment: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Campsites' | 'Sunsets' | 'Activities' | 'Food';
  imageUrl: string;
  caption: string;
}

export interface CampingPackage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  pricePerPerson: number;
  originalPricePerPerson?: number;
  washroomType: 'Attached' | 'Common';
  capacity: string;
  hasAttachedWashroom: boolean;
  hasLightFanBoard: boolean;
  coverImage: string;
  gallery: string[];
  highlights: string[];
  inclusions: string[];
  category: 'Glamping' | 'Cottage' | 'Dome' | 'Tent Camping' | 'Villa';
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon?: string;
}

export interface CampsiteDaySchedule {
  day: string;
  title: string;
  items: ScheduleItem[];
}

export interface FoodCategoryMenu {
  categoryName: string;
  type: 'Snacks' | 'BBQ' | 'Dinner' | 'Breakfast';
  timing?: string;
  isUnlimited: boolean;
  vegOptions: string[];
  nonVegOptions?: string[];
  specialNote?: string;
}

export interface TentArrangementDetails {
  sharingTypes: string[];
  privacyGuarantee: string;
  beddingProvided: string[];
  hygieneNotice: string;
}

export interface CampsiteMasterInfo {
  name: string;
  brandName: string;
  tagline: string;
  website?: string;
  contactNumbers: string[];
  advancePaymentPercentage: number;
  paymentMethods: string[];
  paymentUPI: string;
  location: {
    address: string;
    landmark: string;
    googleMapsUrl: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  checkInTime: string;
  checkOutTime: string;
  freeActivities: string[];
  otherFacilities: string[];
  additionalServices: Array<{
    name: string;
    included: boolean;
    note?: string;
  }>;
  schedule: CampsiteDaySchedule[];
  foodMenu: FoodCategoryMenu[];
  tentArrangement: TentArrangementDetails;
  packages: CampingPackage[];
}

