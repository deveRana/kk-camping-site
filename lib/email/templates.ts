/**
 * Professional Email Templates for Lakeora Camping & Cafe
 * Modern, clean design following industry best practices
 * No icons/emojis - pure professional business style
 */

interface BookingDetails {
  referenceId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCity?: string;
  propertyName: string;
  propertyCategory: string;
  numberOfGuests: number;
  checkInDate?: string;
  checkOutDate?: string;
  addons: string[];
  basePrice: number;
  addonTotal: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMethod: string;
  bookingDate: string;
}

const emailStyles = `
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #374151;
      background-color: #f3f4f6;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #065f46;
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-size: 28px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      letter-spacing: 3px;
    }
    .tagline {
      color: #d1fae5;
      font-size: 13px;
      margin: 8px 0 0 0;
      font-weight: 400;
    }
    .content {
      padding: 40px 30px;
    }
    .success-banner {
      background-color: #ecfdf5;
      border-left: 4px solid: #10b981;
      padding: 24px;
      margin-bottom: 32px;
    }
    .success-title {
      color: #065f46;
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 8px 0;
    }
    .success-text {
      color: #047857;
      font-size: 15px;
      margin: 0;
    }
    .booking-ref-box {
      background: #ffffff;
      border: 2px solid #d1fae5;
      padding: 20px;
      margin-top: 20px;
      text-align: center;
    }
    .ref-label {
      color: #6b7280;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 8px;
    }
    .ref-value {
      color: #065f46;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 2px;
      font-family: 'Courier New', monospace;
    }
    .section-title {
      color: #111827;
      font-size: 16px;
      font-weight: 700;
      margin: 32px 0 16px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #e5e7eb;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 14px;
    }
    .info-table {
      width: 100%;
      margin: 16px 0;
    }
    .info-row {
      border-bottom: 1px solid #f3f4f6;
    }
    .info-row td {
      padding: 12px 0;
    }
    .info-label {
      color: #6b7280;
      font-size: 14px;
      font-weight: 500;
      width: 40%;
    }
    .info-value {
      color: #111827;
      font-size: 14px;
      font-weight: 600;
      text-align: right;
    }
    .invoice-table {
      width: 100%;
      margin: 20px 0;
      border: 1px solid #e5e7eb;
    }
    .invoice-row td {
      padding: 14px 16px;
      border-bottom: 1px solid #f3f4f6;
    }
    .invoice-label {
      color: #374151;
      font-size: 14px;
    }
    .invoice-value {
      text-align: right;
      color: #111827;
      font-size: 14px;
      font-weight: 600;
    }
    .total-row td {
      background-color: #f9fafb;
      font-weight: 700;
      font-size: 16px;
      color: #065f46;
      padding: 16px;
      border-bottom: none;
    }
    .paid-row td {
      background-color: #065f46;
      color: #ffffff;
      font-weight: 700;
      padding: 16px;
      border-bottom: none;
    }
    .action-button {
      display: inline-block;
      background-color: #065f46;
      color: #ffffff;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
      margin: 24px 0;
    }
    .note-box {
      background-color: #fffbeb;
      border: 1px solid #fbbf24;
      padding: 16px;
      margin: 24px 0;
    }
    .note-box.success {
      background-color: #ecfdf5;
      border-color: #10b981;
    }
    .note-title {
      font-weight: 700;
      font-size: 14px;
      color: #92400e;
      margin-bottom: 8px;
    }
    .note-box.success .note-title {
      color: #065f46;
    }
    .note-text {
      font-size: 14px;
      color: #78350f;
      line-height: 1.6;
    }
    .note-box.success .note-text {
      color: #047857;
    }
    .list-item {
      padding: 8px 0;
      border-bottom: 1px solid #f3f4f6;
      font-size: 14px;
      color: #374151;
    }
    .footer {
      background-color: #f9fafb;
      padding: 32px 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer-brand {
      color: #065f46;
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 8px;
    }
    .footer-text {
      color: #6b7280;
      font-size: 12px;
      margin: 6px 0;
      line-height: 1.5;
    }
    .footer-links {
      margin: 16px 0;
    }
    .footer-link {
      color: #047857;
      text-decoration: none;
      margin: 0 10px;
      font-size: 12px;
      font-weight: 500;
    }
    @media only screen and (max-width: 600px) {
      .content { padding: 24px 16px; }
      .header { padding: 32px 16px; }
      .logo { font-size: 24px; }
      .success-title { font-size: 20px; }
    }
  </style>
`;

export function generateGuestConfirmationEmail(booking: BookingDetails): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed - Lakeora</title>
  ${emailStyles}
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header">
      <div class="logo">LAKEORA</div>
      <p class="tagline">Lakeside Camping & Cafe · Pawna Lake</p>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Success Banner -->
      <div class="success-banner">
        <h1 class="success-title">Booking Confirmed</h1>
        <p class="success-text">
          Hi ${booking.guestName}, your reservation at Pawna Lake is confirmed and ready.
        </p>
        <div class="booking-ref-box">
          <div class="ref-label">Booking Reference</div>
          <div class="ref-value">${booking.referenceId}</div>
        </div>
      </div>

      <p style="font-size: 15px; color: #4b5563; margin-bottom: 24px;">
        Thank you for choosing Lakeora. We look forward to hosting you at Pawna Lake.
      </p>

      <!-- Guest Details -->
      <h2 class="section-title">Guest Information</h2>
      <table class="info-table">
        <tr class="info-row">
          <td class="info-label">Name</td>
          <td class="info-value">${booking.guestName}</td>
        </tr>
        <tr class="info-row">
          <td class="info-label">Email</td>
          <td class="info-value">${booking.guestEmail}</td>
        </tr>
        <tr class="info-row">
          <td class="info-label">Phone</td>
          <td class="info-value">${booking.guestPhone}</td>
        </tr>
        ${booking.guestCity ? `
        <tr class="info-row">
          <td class="info-label">City</td>
          <td class="info-value">${booking.guestCity}</td>
        </tr>
        ` : ''}
        <tr class="info-row">
          <td class="info-label">Guests</td>
          <td class="info-value">${booking.numberOfGuests}</td>
        </tr>
      </table>

      <!-- Property Details -->
      <h2 class="section-title">Reservation Details</h2>
      <table class="info-table">
        <tr class="info-row">
          <td class="info-label">Property</td>
          <td class="info-value">${booking.propertyName}</td>
        </tr>
        <tr class="info-row">
          <td class="info-label">Category</td>
          <td class="info-value">${booking.propertyCategory}</td>
        </tr>
        ${booking.checkInDate ? `
        <tr class="info-row">
          <td class="info-label">Check-in</td>
          <td class="info-value">${booking.checkInDate} at 4:00 PM</td>
        </tr>
        ` : ''}
        ${booking.checkOutDate ? `
        <tr class="info-row">
          <td class="info-label">Check-out</td>
          <td class="info-value">${booking.checkOutDate} at 11:00 AM</td>
        </tr>
        ` : ''}
        <tr class="info-row">
          <td class="info-label">Booking Date</td>
          <td class="info-value">${new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
        </tr>
      </table>

      ${booking.addons.length > 0 ? `
      <!-- Add-ons -->
      <h2 class="section-title">Selected Add-ons</h2>
      ${booking.addons.map(addon => `<div class="list-item">${addon}</div>`).join('')}
      ` : ''}

      <!-- Payment Invoice -->
      <h2 class="section-title">Payment Summary</h2>
      <table class="invoice-table" cellpadding="0" cellspacing="0">
        <tr class="invoice-row">
          <td class="invoice-label">Base Price (${booking.numberOfGuests} guests)</td>
          <td class="invoice-value">₹${booking.basePrice.toLocaleString()}</td>
        </tr>
        ${booking.addonTotal > 0 ? `
        <tr class="invoice-row">
          <td class="invoice-label">Add-ons</td>
          <td class="invoice-value">₹${booking.addonTotal.toLocaleString()}</td>
        </tr>
        ` : ''}
        ${booking.discount > 0 ? `
        <tr class="invoice-row">
          <td class="invoice-label">Discount ${booking.couponCode ? `(${booking.couponCode})` : ''}</td>
          <td class="invoice-value" style="color: #10b981;">-₹${booking.discount.toLocaleString()}</td>
        </tr>
        ` : ''}
        <tr class="total-row">
          <td>Total Amount</td>
          <td style="text-align: right;">₹${booking.totalAmount.toLocaleString()}</td>
        </tr>
        <tr class="paid-row">
          <td>Payment Received</td>
          <td style="text-align: right;">₹${booking.totalAmount.toLocaleString()}</td>
        </tr>
      </table>

      <!-- Payment Confirmation -->
      <div class="note-box success">
        <div class="note-title">Payment Complete</div>
        <div class="note-text">
          Your payment of ₹${booking.totalAmount.toLocaleString()} has been received successfully via ${booking.paymentMethod.toUpperCase()}.
          No additional payment required at check-in.
        </div>
      </div>

      <!-- What to Bring -->
      <h2 class="section-title">What to Bring</h2>
      <div class="list-item">Valid ID proof (Aadhaar/DL/Passport)</div>
      <div class="list-item">Comfortable clothes and footwear</div>
      <div class="list-item">Personal toiletries</div>
      <div class="list-item">Medicines (if required)</div>
      <div class="list-item">Power bank and charger</div>

      <!-- Contact -->
      <h2 class="section-title">Contact Us</h2>
      <table class="info-table">
        <tr class="info-row">
          <td class="info-label">Phone</td>
          <td class="info-value">+91 74997 57607</td>
        </tr>
        <tr class="info-row">
          <td class="info-label">Email</td>
          <td class="info-value">booking@lakeora.com</td>
        </tr>
        <tr class="info-row">
          <td class="info-label">Location</td>
          <td class="info-value">Pawna Lake, Maharashtra</td>
        </tr>
      </table>

      <center>
        <a href="https://maps.app.goo.gl/c6JVSxCKqkyfMrR47" class="action-button">
          Get Directions
        </a>
      </center>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-brand">Lakeora Cafe & Camping</div>
      <p class="footer-text">Pawna Lake · Near Lonavala · Maharashtra</p>
      <div class="footer-links">
        <a href="https://pawnatentcamp.com" class="footer-link">Website</a>
        <a href="tel:+917499757607" class="footer-link">Contact</a>
      </div>
      <p class="footer-text" style="margin-top: 16px;">
        This is an automated confirmation. For support, contact booking@lakeora.com
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateAdminNotificationEmail(booking: BookingDetails): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking - ${booking.referenceId}</title>
  ${emailStyles}
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header" style="background-color: #1e40af;">
      <div class="logo">NEW BOOKING</div>
      <p class="tagline" style="color: #bfdbfe;">Admin Notification · Lakeora</p>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Alert Banner -->
      <div class="success-banner" style="background-color: #dbeafe; border-left-color: #3b82f6;">
        <h1 class="success-title" style="color: #1e40af;">New Booking Received</h1>
        <p class="success-text" style="color: #1e40af;">
          A new booking has been confirmed. Please review and prepare for guest arrival.
        </p>
        <div class="booking-ref-box" style="border-color: #bfdbfe;">
          <div class="ref-label">Booking Reference</div>
          <div class="ref-value" style="color: #1e40af;">${booking.referenceId}</div>
        </div>
      </div>

      <p style="font-size: 14px; color: #6b7280; margin-bottom: 24px;">
        <strong>Booking Time:</strong> ${new Date(booking.bookingDate).toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>

      <!-- Guest Information -->
      <h2 class="section-title">Guest Information</h2>
      <table class="info-table">
        <tr class="info-row">
          <td class="info-label">Name</td>
          <td class="info-value">${booking.guestName}</td>
        </tr>
        <tr class="info-row">
          <td class="info-label">Email</td>
          <td class="info-value"><a href="mailto:${booking.guestEmail}" style="color: #2563eb; text-decoration: none;">${booking.guestEmail}</a></td>
        </tr>
        <tr class="info-row">
          <td class="info-label">Phone</td>
          <td class="info-value"><a href="tel:${booking.guestPhone}" style="color: #2563eb; text-decoration: none; font-weight: 700;">${booking.guestPhone}</a></td>
        </tr>
        ${booking.guestCity ? `
        <tr class="info-row">
          <td class="info-label">City</td>
          <td class="info-value">${booking.guestCity}</td>
        </tr>
        ` : ''}
        <tr class="info-row">
          <td class="info-label">Guests</td>
          <td class="info-value" style="font-size: 16px;">${booking.numberOfGuests}</td>
        </tr>
      </table>

      <!-- Property Details -->
      <h2 class="section-title">Property & Stay Details</h2>
      <table class="info-table">
        <tr class="info-row">
          <td class="info-label">Property</td>
          <td class="info-value">${booking.propertyName}</td>
        </tr>
        <tr class="info-row">
          <td class="info-label">Category</td>
          <td class="info-value">${booking.propertyCategory}</td>
        </tr>
        ${booking.checkInDate ? `
        <tr class="info-row">
          <td class="info-label">Check-in</td>
          <td class="info-value">${booking.checkInDate} at 4:00 PM</td>
        </tr>
        ` : ''}
        ${booking.checkOutDate ? `
        <tr class="info-row">
          <td class="info-label">Check-out</td>
          <td class="info-value">${booking.checkOutDate} at 11:00 AM</td>
        </tr>
        ` : ''}
      </table>

      ${booking.addons.length > 0 ? `
      <!-- Add-ons -->
      <h2 class="section-title">Selected Add-ons</h2>
      ${booking.addons.map(addon => `<div class="list-item" style="font-weight: 600;">${addon}</div>`).join('')}
      ` : ''}

      <!-- Payment Summary -->
      <h2 class="section-title">Payment Summary</h2>
      <table class="invoice-table" cellpadding="0" cellspacing="0">
        <tr class="invoice-row">
          <td class="invoice-label">Base Price</td>
          <td class="invoice-value">₹${booking.basePrice.toLocaleString()}</td>
        </tr>
        ${booking.addonTotal > 0 ? `
        <tr class="invoice-row">
          <td class="invoice-label">Add-ons</td>
          <td class="invoice-value">₹${booking.addonTotal.toLocaleString()}</td>
        </tr>
        ` : ''}
        ${booking.discount > 0 ? `
        <tr class="invoice-row">
          <td class="invoice-label">Discount ${booking.couponCode ? `(${booking.couponCode})` : ''}</td>
          <td class="invoice-value" style="color: #dc2626;">-₹${booking.discount.toLocaleString()}</td>
        </tr>
        ` : ''}
        <tr class="total-row" style="color: #1e40af;">
          <td>Total Amount</td>
          <td style="text-align: right;">₹${booking.totalAmount.toLocaleString()}</td>
        </tr>
        <tr class="paid-row">
          <td>Full Payment Received</td>
          <td style="text-align: right;">₹${booking.totalAmount.toLocaleString()}</td>
        </tr>
      </table>

      <!-- Action Required -->
      <div class="note-box">
        <div class="note-title">Action Required</div>
        <div class="note-text">
          <strong>Checklist:</strong><br>
          • Check availability and prepare ${booking.propertyName}<br>
          • Contact guest: <a href="tel:${booking.guestPhone}" style="color: #92400e; font-weight: 700;">${booking.guestPhone}</a><br>
          • Arrange add-ons: ${booking.addons.length > 0 ? booking.addons.join(', ') : 'None'}<br>
          • Full payment received: ₹${booking.totalAmount.toLocaleString()}
        </div>
      </div>

      <center>
        <a href="https://lakeora.sanity.studio" class="action-button" style="background-color: #2563eb;">
          Open in Sanity Studio
        </a>
      </center>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-brand">Lakeora Admin Panel</div>
      <p class="footer-text">
        This is an automated notification. Booking details are saved in Sanity CMS.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
