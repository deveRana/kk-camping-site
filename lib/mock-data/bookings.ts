import { Booking } from '@/types';

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    referenceId: 'LS-2026-8891',
    propertyId: 'prop-1',
    propertyName: 'Sunset Haven Lakeside Glamping',
    propertyImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80',
    location: 'Thakurwadi, Pawna Lake',
    checkIn: '2026-10-15',
    checkOut: '2026-10-16',
    guests: { adults: 2, children: 0 },
    totalAmount: 3798,
    status: 'Confirmed',
    paymentMethod: 'UPI / Razorpay',
    bookedOn: 'Sep 12, 2026',
    addOns: ['Sunset Kayaking', 'BBQ Skewers']
  },
  {
    id: 'bk-102',
    referenceId: 'LS-2026-7420',
    propertyId: 'prop-2',
    propertyName: 'Misty Bay Wooden Cottage',
    propertyImage: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=600&q=80',
    location: 'Ambegaon, Pawna Lake',
    checkIn: '2026-08-20',
    checkOut: '2026-08-21',
    guests: { adults: 3, children: 1 },
    totalAmount: 4998,
    status: 'Completed',
    paymentMethod: 'Credit Card',
    bookedOn: 'Aug 10, 2026'
  },
  {
    id: 'bk-103',
    referenceId: 'LS-2026-6114',
    propertyId: 'prop-3',
    propertyName: 'Starlight Safari Tent Camp',
    propertyImage: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80',
    location: 'Kevare, Pawna Lake',
    checkIn: '2026-07-05',
    checkOut: '2026-07-06',
    guests: { adults: 4, children: 0 },
    totalAmount: 4796,
    status: 'Cancelled',
    paymentMethod: 'UPI',
    bookedOn: 'Jun 28, 2026'
  }
];
