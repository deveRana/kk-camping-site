import { FAQItem } from '@/types';
import { PAWNA_CAMPSITE_MASTER_DATA } from './campsite-info';

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'Where is Pawna Lake NightHunt campsite located?',
    answer: `Our campsite (${PAWNA_CAMPSITE_MASTER_DATA.brandName}) is located at Thakursai-Aajiwali Rd, At Gevhande Khadak, Pawna Lake, Maharashtra 410406. It takes approx 2.5 hours from Mumbai and 1.5 hours from Pune.`
  },
  {
    id: 'faq-2',
    category: 'Check-in/out',
    question: 'How are tents arranged? Will we have to share with strangers?',
    answer: `${PAWNA_CAMPSITE_MASTER_DATA.tentArrangement.privacyGuarantee} Tents come equipped with foam mattresses, clean bed-sheets, pillows, and blankets. (We do not provide sleeping bags for hygiene reasons).`
  },
  {
    id: 'faq-3',
    category: 'Food & Activities',
    question: 'What is included in the food menu? Is Jain food available?',
    answer: 'High Tea (Tea/Coffee & Unlimited Pakodas), Limited Veg Paneer BBQ / Non-Veg Chicken BBQ (5-6 pcs), Unlimited Veg Dinner (Paneer, Potato Sabji, Dal, Chapati, Rice, Salad, Sweet) & Non-Veg Dinner (Egg Curry, Chicken Sukha, Roti, Rice, Salad, Sweet), and Breakfast (Poha, Tea/Coffee, Bread Butter Jam). Jain food is available upon request during booking!'
  },
  {
    id: 'faq-4',
    category: 'Booking & Payment',
    question: 'What is the booking payment process?',
    answer: `50% advance payment is required to confirm your booking. Payments are accepted via Google Pay, Paytm, or PhonePe at ${PAWNA_CAMPSITE_MASTER_DATA.paymentUPI} (Contact: ${PAWNA_CAMPSITE_MASTER_DATA.contactNumbers.join(' / ')}).`
  },
  {
    id: 'faq-5',
    category: 'Check-in/out',
    question: 'What is the campsite daily schedule?',
    answer: 'Day 1: 4:00 PM Check-in & reporting, 4:30 PM High Tea, 6:30 PM Sunset & DJ Music, 7:00 PM BBQ, 9:30 PM Dinner, 12:00 AM Bonfire & Live Music, 1:00 AM to 7:00 AM Silent Hours. Day 2: 7:00 AM Sunrise, 8:00 AM Breakfast, 11:00 AM Check-out.'
  },
  {
    id: 'faq-6',
    category: 'Food & Activities',
    question: 'Is boating included in the package?',
    answer: 'Boating is not included in the standard camping packages. You can enjoy boating by paying extra directly at the lakeside spot.'
  },
  {
    id: 'faq-7',
    category: 'Safety',
    question: 'What free activities and facilities are included?',
    answer: `Free activities include Archery 🏹, Dart Game 🎯, Cricket 🏏, Badminton 🏸, Carrom, Chess, and Volleyball 🏐. Facilities include Common & Attached Washrooms, First Aid Kit, Free Parking, DJ & Acoustic Live Music Campfire.`
  }
];
