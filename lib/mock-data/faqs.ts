import { FAQItem } from '@/types';
import { PAWNA_CAMPSITE_MASTER_DATA } from './campsite-info';

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'Where is Lakeora located?',
    answer: `Our campsite (${PAWNA_CAMPSITE_MASTER_DATA.brandName}) is located at Thakursai-Aajiwali Rd, At Gevhande Khadak, Pawna Lake, Maharashtra 410406. It takes approx 2.5 hours from Mumbai and 1.5 hours from Pune.`
  },
  {
    id: 'faq-2',
    category: 'Check-in/out',
    question: 'How are tents arranged? Will we have to share with strangers?',
    answer: `${PAWNA_CAMPSITE_MASTER_DATA.tentArrangement.privacyGuarantee} Tents come equipped with foam mattresses, clean bed-sheets, pillows, and blankets. (We do not provide sleeping bags for hygiene reasons).`
  },
  {
    id: 'faq-4',
    category: 'Booking & Payment',
    question: 'What is the booking payment process?',
    answer: `Full payment is required to confirm your booking. We accept payments via our secure Razorpay gateway (UPI, Credit/Debit Cards, Net Banking, etc.). You will receive an instant email confirmation after successful payment.`
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
  },
  {
    id: 'faq-8',
    category: 'Booking & Payment',
    question: 'Will I receive a booking confirmation?',
    answer: `Yes! After successful payment, you will receive an instant email confirmation with your booking reference number, complete booking details, payment invoice, and check-in information. Please save this email as it contains all important details for your stay.`
  },
  {
    id: 'faq-9',
    category: 'Booking & Payment',
    question: 'How can I view or track my booking?',
    answer: `Your booking confirmation email contains all details including your unique reference ID (e.g., LS-2026-XXXX). Keep this email safe. For any changes or queries about your booking, contact us via WhatsApp at ${PAWNA_CAMPSITE_MASTER_DATA.contactNumbers[0]} with your reference number.`
  },
  {
    id: 'faq-10',
    category: 'Booking & Payment',
    question: 'What is your cancellation policy?',
    answer: `Free cancellation is available up to 48 hours before your check-in date. For cancellations made within 48 hours of check-in or no-shows, refunds will be subject to a cancellation fee. Please contact us at ${PAWNA_CAMPSITE_MASTER_DATA.contactNumbers[0]} for cancellation requests.`
  },
  {
    id: 'faq-11',
    category: 'Booking & Payment',
    question: 'Can I modify my booking after confirmation?',
    answer: `Yes, you can modify your booking (change dates, add/remove guests) by contacting us via WhatsApp at ${PAWNA_CAMPSITE_MASTER_DATA.contactNumbers[0]} with your booking reference number. Modifications are subject to availability and may affect the total price.`
  },
  {
    id: 'faq-12',
    category: 'General',
    question: 'Is the campsite couple-friendly and safe?',
    answer: `Yes, absolutely! We are a 100% couple-friendly campsite with 24/7 security. We maintain a safe, respectful environment for all guests including couples, families, and solo travelers. All accommodations have proper privacy, and our staff is trained to ensure guest safety at all times.`
  },
  {
    id: 'faq-13',
    category: 'Check-in/out',
    question: 'What should I bring for camping?',
    answer: `We provide all essential bedding (mattress, sheets, pillows, blankets). You should bring: comfortable clothes for the evening, a light jacket (it gets cool by the lake), toiletries, personal medicines, torch/flashlight, valid ID proof for check-in, and your booking confirmation email. Everything else is taken care of!`
  },
  {
    id: 'faq-14',
    category: 'Food & Activities',
    question: 'Are outside food and alcohol allowed?',
    answer: `Outside food is generally not allowed as we provide complete meals. However, you can bring snacks for personal consumption. Alcohol is allowed for responsible consumption only within your tent area. Please maintain the campsite's peaceful environment and dispose of bottles properly.`
  }
];
