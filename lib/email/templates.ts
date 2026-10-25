/**
 * Professional Email Templates for Lakeora Camping & Cafe
 * Modern, clean design with proper color scheme and branding
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background-color: #f9fafb;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #065f46 0%, #047857 100%);
      padding: 40px 24px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 8px 0;
      letter-spacing: 2px;
    }
    .tagline {
      color: #d1fae5;
      font-size: 14px;
      margin: 0;
      font-weight: 500;
    }
    .content {
      padding: 40px 24px;
    }
    .success-badge {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      margin-bottom: 32px;
      box-shadow: 0 4px 6px rgba(16, 185, 129, 0.15);
    }
    .success-icon {
      width: 64px;
      height: 64px;
      background: #ffffff;
      border-radius: 50%;
      margin: 0 auto 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: #10b981;
      font-weight: bold;
    }
    .success-title {
      color: #ffffff;
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px 0;
    }
    .success-text {
      color: #d1fae5;
      font-size: 15px;
      margin: 0;
    }
    .booking-ref {
      background: #ffffff;
      border: 2px solid #d1fae5;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
      text-align: center;
    }
    .booking-ref-label {
      color: #059669;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .booking-ref-value {
      color: #065f46;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 2px;
      font-family: 'Courier New', monospace;
    }
    .section-title {
      color: #065f46;
      font-size: 20px;
      font-weight: 700;
      margin: 32px 0 16px 0;
      padding-bottom: 12px;
      border-bottom: 3px solid #d1fae5;
    }
    .info-card {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      color: #6b7280;
      font-size: 14px;
      font-weight: 600;
    }
    .info-value {
      color: #1f2937;
      font-size: 14px;
      font-weight: 700;
      text-align: right;
    }
    .invoice-table {
      width: 100%;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      overflow: hidden;
      margin: 20px 0;
    }
    .invoice-row {
      display: flex;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #e5e7eb;
    }
    .invoice-row:last-child {
      border-bottom: none;
    }
    .invoice-row.total {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      font-weight: 700;
      font-size: 18px;
      color: #065f46;
    }
    .invoice-row.paid {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      font-weight: 700;
      font-size: 16px;
    }
    .addon-list {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px 20px;
      margin: 16px 0;
    }
    .addon-item {
      padding: 8px 0;
      color: #1f2937;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
    .addon-item::before {
      content: "✓";
      color: #10b981;
      font-weight: bold;
      margin-right: 12px;
      font-size: 16px;
    }
    .action-button {
      display: inline-block;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 16px;
      text-align: center;
      margin: 24px auto;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
      transition: all 0.3s ease;
    }
    .action-button:hover {
      box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
      transform: translateY(-2px);
    }
    .highlight-box {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border: 2px solid #f59e0b;
      border-radius: 12px;
      padding: 20px;
      margin: 24px 0;
    }
    .highlight-box.success {
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
      border-color: #10b981;
    }
    .highlight-title {
      color: #92400e;
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 8px;
    }
    .highlight-box.success .highlight-title {
      color: #065f46;
    }
    .highlight-text {
      color: #78350f;
      font-size: 14px;
      line-height: 1.6;
    }
    .highlight-box.success .highlight-text {
      color: #047857;
    }
    .footer {
      background: #f9fafb;
      padding: 32px 24px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer-brand {
      color: #065f46;
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 8px;
    }
    .footer-text {
      color: #6b7280;
      font-size: 13px;
      margin: 8px 0;
    }
    .footer-links {
      margin: 20px 0;
    }
    .footer-link {
      color: #047857;
      text-decoration: none;
      margin: 0 12px;
      font-size: 13px;
      font-weight: 600;
    }
    .footer-link:hover {
      color: #065f46;
      text-decoration: underline;
    }
    .divider {
      height: 1px;
      background: #e5e7eb;
      margin: 32px 0;
    }
    @media only screen and (max-width: 600px) {
      .content { padding: 24px 16px; }
      .header { padding: 32px 16px; }
      .logo { font-size: 28px; }
      .success-title { font-size: 24px; }
      .booking-ref-value { font-size: 20px; }
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
      <!-- Success Badge -->
      <div class="success-badge">
        <div class="success-icon">✓</div>
        <h1 class="success-title">Booking Confirmed!</h1>
        <p class="success-text">
          Hi ${booking.guestName}, your lakeside getaway is confirmed and ready!
        </p>
        <div class="booking-ref">
          <div class="booking-ref-label">Your Booking Reference</div>
          <div class="booking-ref-value">${booking.referenceId}</div>
        </div>
      </div>

      <p style="font-size: 15px; color: #4b5563; margin-bottom: 24px;">
        Thank you for choosing Lakeora! We're excited to host you at Pawna Lake.
        Your booking has been confirmed and payment received successfully.
      </p>

      <!-- Guest Details -->
      <h2 class="section-title">Guest Information</h2>
      <div class="info-card">
        <div class="info-row">
          <span class="info-label">Name</span>
          <span class="info-value">${booking.guestName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value">${booking.guestEmail}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone</span>
          <span class="info-value">${booking.guestPhone}</span>
        </div>
        ${booking.guestCity ? `
        <div class="info-row">
          <span class="info-label">City</span>
          <span class="info-value">${booking.guestCity}</span>
        </div>
        ` : ''}
        <div class="info-row">
          <span class="info-label">Number of Guests</span>
          <span class="info-value">${booking.numberOfGuests}</span>
        </div>
      </div>

      <!-- Property Details -->
      <h2 class="section-title">Accommodation Details</h2>
      <div class="info-card">
        <div class="info-row">
          <span class="info-label">Property</span>
          <span class="info-value">${booking.propertyName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Category</span>
          <span class="info-value">${booking.propertyCategory}</span>
        </div>
        ${booking.checkInDate ? `
        <div class="info-row">
          <span class="info-label">Check-in</span>
          <span class="info-value">${booking.checkInDate} at 4:00 PM</span>
        </div>
        ` : ''}
        ${booking.checkOutDate ? `
        <div class="info-row">
          <span class="info-label">Check-out</span>
          <span class="info-value">${booking.checkOutDate} at 11:00 AM</span>
        </div>
        ` : ''}
        <div class="info-row">
          <span class="info-label">Booking Date</span>
          <span class="info-value">${new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      ${booking.addons.length > 0 ? `
      <!-- Add-ons -->
      <h2 class="section-title">Selected Add-ons</h2>
      <div class="addon-list">
        ${booking.addons.map(addon => `<div class="addon-item">${addon}</div>`).join('')}
      </div>
      ` : ''}

      <!-- Payment Invoice -->
      <h2 class="section-title">Payment Summary</h2>
      <div class="invoice-table">
        <div class="invoice-row">
          <span>Base Price (${booking.numberOfGuests} × ₹${(booking.basePrice / booking.numberOfGuests).toLocaleString()})</span>
          <span style="font-weight: 600;">₹${booking.basePrice.toLocaleString()}</span>
        </div>
        ${booking.addonTotal > 0 ? `
        <div class="invoice-row">
          <span>Add-ons (${booking.addons.length})</span>
          <span style="font-weight: 600;">₹${booking.addonTotal.toLocaleString()}</span>
        </div>
        ` : ''}
        ${booking.discount > 0 ? `
        <div class="invoice-row">
          <span>Discount ${booking.couponCode ? `(${booking.couponCode})` : ''}</span>
          <span style="color: #10b981; font-weight: 600;">-₹${booking.discount.toLocaleString()}</span>
        </div>
        ` : ''}
        <div class="invoice-row total">
          <span>Total Amount</span>
          <span>₹${booking.totalAmount.toLocaleString()}</span>
        </div>
        <div class="invoice-row paid">
          <span>Payment Received (${booking.paymentMethod.toUpperCase()})</span>
          <span>₹${booking.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <!-- Payment Confirmation -->
      <div class="highlight-box success">
        <div class="highlight-title">Payment Complete</div>
        <div class="highlight-text">
          Your payment of <strong>₹${booking.totalAmount.toLocaleString()}</strong> has been received successfully.
          No additional payment required at check-in.
        </div>
      </div>

      <!-- What to Bring -->
      <h2 class="section-title">What to Bring</h2>
      <div class="addon-list">
        <div class="addon-item">Valid ID proof (Aadhaar/DL/Passport)</div>
        <div class="addon-item">Comfortable clothes & footwear</div>
        <div class="addon-item">Personal toiletries</div>
        <div class="addon-item">Medicines (if required)</div>
        <div class="addon-item">Power bank & charger</div>
        <div class="addon-item">Camera for memories!</div>
      </div>

      <div class="divider"></div>

      <!-- Contact -->
      <h2 class="section-title">Need Help?</h2>
      <p style="font-size: 14px; color: #4b5563; margin-bottom: 16px;">
        Our team is here to assist you with anything you need!
      </p>
      <div style="margin: 20px 0;">
        <p style="margin: 8px 0;"><strong style="color: #065f46;">Phone:</strong> <a href="tel:+917499757607" style="color: #047857;">+91 74997 57607</a></p>
        <p style="margin: 8px 0;"><strong style="color: #065f46;">Email:</strong> <a href="mailto:booking@lakeora.com" style="color: #047857;">booking@lakeora.com</a></p>
        <p style="margin: 8px 0;"><strong style="color: #065f46;">Location:</strong> Lakeora, Pawna Lake, Gevhande Khadak, Maharashtra</p>
      </div>

      <center>
        <a href="https://maps.app.goo.gl/c6JVSxCKqkyfMrR47" class="action-button">
          Get Directions to Lakeora
        </a>
      </center>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-brand">Lakeora Cafe & Camping</div>
      <p class="footer-text">Pawna Lake · Near Lonavala · Maharashtra</p>
      <div class="footer-links">
        <a href="https://pawnatentcamp.com" class="footer-link">Website</a>
        <a href="https://instagram.com/lakeora" class="footer-link">Instagram</a>
        <a href="tel:+917499757607" class="footer-link">Contact</a>
      </div>
      <p class="footer-text" style="font-size: 11px; margin-top: 20px;">
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
    <div class="header" style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);">
      <div class="logo">🔔 NEW BOOKING</div>
      <p class="tagline">Admin Notification · Lakeora</p>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Alert Badge -->
      <div class="success-badge" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">
        <div class="success-icon" style="color: #3b82f6;">!</div>
        <h1 class="success-title">New Booking Received</h1>
        <p class="success-text">
          A new booking has been confirmed. Please review and prepare.
        </p>
        <div class="booking-ref">
          <div class="booking-ref-label" style="color: #2563eb;">Booking Reference</div>
          <div class="booking-ref-value" style="color: #1e40af;">${booking.referenceId}</div>
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
      <h2 class="section-title" style="color: #1e40af; border-color: #bfdbfe;">Guest Information</h2>
      <div class="info-card">
        <div class="info-row">
          <span class="info-label">Name</span>
          <span class="info-value" style="font-size: 16px;">${booking.guestName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value"><a href="mailto:${booking.guestEmail}" style="color: #2563eb; text-decoration: none;">${booking.guestEmail}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone</span>
          <span class="info-value"><a href="tel:${booking.guestPhone}" style="color: #2563eb; text-decoration: none; font-weight: 700;">${booking.guestPhone}</a></span>
        </div>
        ${booking.guestCity ? `
        <div class="info-row">
          <span class="info-label">City</span>
          <span class="info-value">${booking.guestCity}</span>
        </div>
        ` : ''}
        <div class="info-row">
          <span class="info-label">Number of Guests</span>
          <span class="info-value" style="font-size: 18px; color: #1e40af;">${booking.numberOfGuests}</span>
        </div>
      </div>

      <!-- Property & Stay Details -->
      <h2 class="section-title" style="color: #1e40af; border-color: #bfdbfe;">Property & Stay Details</h2>
      <div class="info-card">
        <div class="info-row">
          <span class="info-label">Property</span>
          <span class="info-value">${booking.propertyName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Category</span>
          <span class="info-value">${booking.propertyCategory}</span>
        </div>
        ${booking.checkInDate ? `
        <div class="info-row">
          <span class="info-label">Check-in</span>
          <span class="info-value" style="font-weight: 700;">${booking.checkInDate} at 4:00 PM</span>
        </div>
        ` : ''}
        ${booking.checkOutDate ? `
        <div class="info-row">
          <span class="info-label">Check-out</span>
          <span class="info-value">${booking.checkOutDate} at 11:00 AM</span>
        </div>
        ` : ''}
      </div>

      ${booking.addons.length > 0 ? `
      <!-- Add-ons -->
      <h2 class="section-title" style="color: #1e40af; border-color: #bfdbfe;">Selected Add-ons</h2>
      <div class="addon-list">
        ${booking.addons.map(addon => `<div class="addon-item"><strong>${addon}</strong></div>`).join('')}
      </div>
      ` : ''}

      <!-- Payment Summary -->
      <h2 class="section-title" style="color: #1e40af; border-color: #bfdbfe;">Payment Summary</h2>
      <div class="invoice-table">
        <div class="invoice-row">
          <span>Base Price</span>
          <span style="font-weight: 600;">₹${booking.basePrice.toLocaleString()}</span>
        </div>
        ${booking.addonTotal > 0 ? `
        <div class="invoice-row">
          <span>Add-ons</span>
          <span style="font-weight: 600;">₹${booking.addonTotal.toLocaleString()}</span>
        </div>
        ` : ''}
        ${booking.discount > 0 ? `
        <div class="invoice-row">
          <span>Discount ${booking.couponCode ? `(${booking.couponCode})` : ''}</span>
          <span style="color: #dc2626; font-weight: 600;">-₹${booking.discount.toLocaleString()}</span>
        </div>
        ` : ''}
        <div class="invoice-row total" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); color: #1e40af;">
          <span>Total Amount</span>
          <span>₹${booking.totalAmount.toLocaleString()}</span>
        </div>
        <div class="invoice-row paid">
          <span>Full Payment Received (${booking.paymentMethod.toUpperCase()})</span>
          <span>₹${booking.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <!-- Action Required -->
      <div class="highlight-box">
        <div class="highlight-title">Action Required</div>
        <div class="highlight-text">
          <strong>Checklist:</strong><br>
          • Check availability and prepare ${booking.propertyName}<br>
          • Contact guest: <a href="tel:${booking.guestPhone}" style="color: #92400e; font-weight: 700;">${booking.guestPhone}</a><br>
          • Arrange add-ons: ${booking.addons.length > 0 ? booking.addons.join(', ') : 'None'}<br>
          • Full payment received: ₹${booking.totalAmount.toLocaleString()}
        </div>
      </div>

      <center>
        <a href="https://lakeora.sanity.studio" class="action-button" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">
          Open in Sanity Studio
        </a>
      </center>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-brand">Lakeora Admin Panel</div>
      <p class="footer-text" style="font-size: 11px;">
        This is an automated notification. Booking details are saved in Sanity CMS.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
