/**
 * Professional Email Templates for Lakeora Camping & Cafe
 * Enterprise-grade HTML email templates with invoice formatting
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
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #1a4d2e 0%, #2d5f3f 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      margin: 0;
      letter-spacing: 1px;
    }
    .tagline {
      color: #a8d5ba;
      font-size: 14px;
      margin: 8px 0 0 0;
    }
    .content {
      padding: 40px 30px;
    }
    .booking-status {
      background: #f0fdf4;
      border-left: 4px solid #22c55e;
      padding: 16px 20px;
      margin-bottom: 30px;
      border-radius: 4px;
    }
    .status-title {
      color: #166534;
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }
    .status-text {
      color: #15803d;
      font-size: 14px;
      margin: 0;
    }
    .section-title {
      color: #1a4d2e;
      font-size: 18px;
      font-weight: 600;
      margin: 30px 0 16px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #e5e7eb;
    }
    .info-grid {
      display: table;
      width: 100%;
      margin-bottom: 20px;
    }
    .info-row {
      display: table-row;
    }
    .info-label {
      display: table-cell;
      padding: 10px 16px 10px 0;
      color: #6b7280;
      font-size: 14px;
      width: 40%;
    }
    .info-value {
      display: table-cell;
      padding: 10px 0;
      color: #1f2937;
      font-size: 14px;
      font-weight: 500;
    }
    .invoice-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background: #f9fafb;
      border-radius: 8px;
      overflow: hidden;
    }
    .invoice-table th {
      background: #1a4d2e;
      color: #ffffff;
      padding: 12px 16px;
      text-align: left;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .invoice-table td {
      padding: 12px 16px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 14px;
      color: #374151;
    }
    .invoice-table tr:last-child td {
      border-bottom: none;
    }
    .price-breakdown {
      background: #f9fafb;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
    }
    .price-label {
      color: #6b7280;
    }
    .price-value {
      color: #1f2937;
      font-weight: 500;
    }
    .price-total {
      border-top: 2px solid #1a4d2e;
      padding-top: 12px;
      margin-top: 12px;
      font-size: 18px;
      font-weight: 700;
      color: #1a4d2e;
    }
    .highlight-box {
      background: #fef3c7;
      border: 2px solid #fbbf24;
      border-radius: 8px;
      padding: 16px;
      margin: 20px 0;
    }
    .highlight-title {
      color: #92400e;
      font-weight: 600;
      font-size: 15px;
      margin: 0 0 8px 0;
    }
    .highlight-text {
      color: #78350f;
      font-size: 14px;
      margin: 0;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      background: #1a4d2e;
      color: #ffffff;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 15px;
      margin: 20px 0;
    }
    .footer {
      background: #f9fafb;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer-text {
      color: #6b7280;
      font-size: 13px;
      line-height: 1.6;
      margin: 8px 0;
    }
    .footer-links {
      margin: 16px 0;
    }
    .footer-link {
      color: #1a4d2e;
      text-decoration: none;
      margin: 0 12px;
      font-size: 13px;
    }
    .divider {
      height: 1px;
      background: #e5e7eb;
      margin: 30px 0;
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
  <title>Booking Confirmation - Lakeora</title>
  ${emailStyles}
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <h1 class="logo">LAKEORA</h1>
      <p class="tagline">Lakeside Camping & Cafe · Pawna Lake</p>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Confirmation Status -->
      <div class="booking-status">
        <h2 class="status-title">✅ Booking Confirmed!</h2>
        <p class="status-text">Thank you ${booking.guestName}! Your lakeside getaway is confirmed.</p>
      </div>

      <p style="color: #374151; font-size: 15px; line-height: 1.6;">
        We're excited to host you at Lakeora! Your booking has been confirmed and we've received your advance payment.
        Get ready for an unforgettable experience at Pawna Lake.
      </p>

      <!-- Booking Reference -->
      <div class="highlight-box">
        <p class="highlight-title">📋 Your Booking Reference</p>
        <p class="highlight-text" style="font-size: 24px; font-weight: 700; letter-spacing: 1px;">${booking.referenceId}</p>
        <p class="highlight-text" style="margin-top: 8px;">Save this reference number for all communications</p>
      </div>

      <!-- Guest Details -->
      <h3 class="section-title">Guest Information</h3>
      <div class="info-grid">
        <div class="info-row">
          <div class="info-label">Name</div>
          <div class="info-value">${booking.guestName}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Email</div>
          <div class="info-value">${booking.guestEmail}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Phone</div>
          <div class="info-value">${booking.guestPhone}</div>
        </div>
        ${booking.guestCity ? `
        <div class="info-row">
          <div class="info-label">City</div>
          <div class="info-value">${booking.guestCity}</div>
        </div>
        ` : ''}
      </div>

      <!-- Accommodation Details -->
      <h3 class="section-title">Accommodation Details</h3>
      <table class="invoice-table">
        <thead>
          <tr>
            <th>Description</th>
            <th style="text-align: right;">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>${booking.propertyName}</strong></td>
            <td style="text-align: right;">${booking.numberOfGuests} Guest${booking.numberOfGuests > 1 ? 's' : ''}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td style="text-align: right;">${booking.propertyCategory}</td>
          </tr>
          ${booking.checkInDate ? `
          <tr>
            <td>Check-in</td>
            <td style="text-align: right;">${booking.checkInDate} at 4:00 PM</td>
          </tr>
          ` : ''}
          ${booking.checkOutDate ? `
          <tr>
            <td>Check-out</td>
            <td style="text-align: right;">${booking.checkOutDate} at 11:00 AM</td>
          </tr>
          ` : ''}
          <tr>
            <td>Booking Date</td>
            <td style="text-align: right;">${new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
          </tr>
        </tbody>
      </table>

      ${booking.addons.length > 0 ? `
      <!-- Add-ons -->
      <h3 class="section-title">Selected Add-ons</h3>
      <table class="invoice-table">
        <tbody>
          ${booking.addons.map(addon => `
          <tr>
            <td>✓ ${addon}</td>
          </tr>
          `).join('')}
        </tbody>
      </table>
      ` : ''}

      <!-- Payment Invoice -->
      <h3 class="section-title">Payment Invoice</h3>
      <div class="price-breakdown">
        <div class="price-row">
          <span class="price-label">Base Price (${booking.numberOfGuests} × ₹${(booking.basePrice / booking.numberOfGuests).toLocaleString()})</span>
          <span class="price-value">₹${booking.basePrice.toLocaleString()}</span>
        </div>
        ${booking.addonTotal > 0 ? `
        <div class="price-row">
          <span class="price-label">Add-ons (${booking.addons.length})</span>
          <span class="price-value">₹${booking.addonTotal.toLocaleString()}</span>
        </div>
        ` : ''}
        ${booking.discount > 0 ? `
        <div class="price-row">
          <span class="price-label">Discount ${booking.couponCode ? `(${booking.couponCode})` : ''}</span>
          <span class="price-value" style="color: #16a34a;">-₹${booking.discount.toLocaleString()}</span>
        </div>
        ` : ''}
        <div class="price-row price-total">
          <span>Total Amount</span>
          <span>₹${booking.totalAmount.toLocaleString()}</span>
        </div>
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #d1d5db;">
          <div class="price-row" style="color: #16a34a; font-weight: 600; font-size: 16px;">
            <span>✓ Payment Received (${booking.paymentMethod.toUpperCase()})</span>
            <span>₹${booking.totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <!-- Payment Confirmation -->
      <div class="highlight-box" style="background: #f0fdf4; border-color: #22c55e;">
        <p class="highlight-title" style="color: #166534;">✓ Payment Complete</p>
        <p class="highlight-text" style="color: #15803d;">
          Your payment of <strong>₹${booking.totalAmount.toLocaleString()}</strong> has been received successfully.
          No additional payment required at check-in.
        </p>
      </div>

      <!-- What to Bring -->
      <h3 class="section-title">What to Bring</h3>
      <p style="color: #374151; font-size: 14px; line-height: 1.8;">
        ✓ Valid ID proof (Aadhaar/DL/Passport)<br>
        ✓ Comfortable clothes & footwear<br>
        ✓ Personal toiletries<br>
        ✓ Medicines (if required)<br>
        ✓ Power bank & charger<br>
        ✓ Camera for memories!
      </p>

      <div class="divider"></div>

      <!-- Contact Information -->
      <h3 class="section-title">Need Help?</h3>
      <p style="color: #374151; font-size: 14px; line-height: 1.8;">
        📞 <strong>Call us:</strong> +91 74997 57607 | +91 95271 43112<br>
        📧 <strong>Email:</strong> booking@lakeora.com<br>
        📍 <strong>Location:</strong> Lakeora, Pawna Lake, Gevhande Khadak, Maharashtra 410406
      </p>

      <a href="https://maps.app.goo.gl/c6JVSxCKqkyfMrR47" class="button">Get Directions</a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text" style="font-weight: 600; color: #1a4d2e;">Lakeora Cafe & Camping</p>
      <p class="footer-text">Pawna Lake · Near Lonavala · Maharashtra</p>
      <div class="footer-links">
        <a href="https://pawnatentcamp.com" class="footer-link">Website</a>
        <a href="https://instagram.com/lakeora" class="footer-link">Instagram</a>
        <a href="tel:+917499757607" class="footer-link">Contact</a>
      </div>
      <p class="footer-text" style="font-size: 12px; margin-top: 20px;">
        This is an automated confirmation email. Please do not reply to this email.<br>
        For any queries, reach out to us at booking@lakeora.com or call us directly.
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
  <title>New Booking Received - ${booking.referenceId}</title>
  ${emailStyles}
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header" style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);">
      <h1 class="logo">🔔 NEW BOOKING</h1>
      <p class="tagline">Admin Notification · Lakeora</p>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Alert Status -->
      <div class="booking-status" style="background: #dbeafe; border-left-color: #2563eb;">
        <h2 class="status-title" style="color: #1e40af;">New Booking Received</h2>
        <p class="status-text" style="color: #1e40af;">Action required: Prepare for guest arrival</p>
      </div>

      <!-- Booking Reference -->
      <div class="highlight-box" style="background: #f3f4f6; border-color: #6b7280;">
        <p class="highlight-title" style="color: #374151;">📋 Booking Reference</p>
        <p class="highlight-text" style="font-size: 24px; font-weight: 700; letter-spacing: 1px; color: #1f2937;">${booking.referenceId}</p>
        <p class="highlight-text" style="margin-top: 8px; color: #6b7280;">Booking Time: ${new Date(booking.bookingDate).toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      </div>

      <!-- Guest Information -->
      <h3 class="section-title" style="color: #1e40af;">👤 Guest Information</h3>
      <div class="info-grid">
        <div class="info-row">
          <div class="info-label">Name</div>
          <div class="info-value" style="font-weight: 700;">${booking.guestName}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Email</div>
          <div class="info-value"><a href="mailto:${booking.guestEmail}" style="color: #2563eb;">${booking.guestEmail}</a></div>
        </div>
        <div class="info-row">
          <div class="info-label">Phone</div>
          <div class="info-value"><a href="tel:${booking.guestPhone}" style="color: #2563eb; font-weight: 600;">${booking.guestPhone}</a></div>
        </div>
        ${booking.guestCity ? `
        <div class="info-row">
          <div class="info-label">City</div>
          <div class="info-value">${booking.guestCity}</div>
        </div>
        ` : ''}
        <div class="info-row">
          <div class="info-label">Number of Guests</div>
          <div class="info-value" style="font-weight: 700; font-size: 16px;">${booking.numberOfGuests}</div>
        </div>
      </div>

      <!-- Property Details -->
      <h3 class="section-title" style="color: #1e40af;">🏕️ Property & Stay Details</h3>
      <table class="invoice-table">
        <tbody>
          <tr>
            <td><strong>Property</strong></td>
            <td style="text-align: right;"><strong>${booking.propertyName}</strong></td>
          </tr>
          <tr>
            <td>Category</td>
            <td style="text-align: right;">${booking.propertyCategory}</td>
          </tr>
          ${booking.checkInDate ? `
          <tr>
            <td>Check-in</td>
            <td style="text-align: right; font-weight: 600;">${booking.checkInDate} at 4:00 PM</td>
          </tr>
          ` : ''}
          ${booking.checkOutDate ? `
          <tr>
            <td>Check-out</td>
            <td style="text-align: right;">${booking.checkOutDate} at 11:00 AM</td>
          </tr>
          ` : ''}
        </tbody>
      </table>

      ${booking.addons.length > 0 ? `
      <!-- Add-ons -->
      <h3 class="section-title" style="color: #1e40af;">➕ Selected Add-ons</h3>
      <table class="invoice-table">
        <tbody>
          ${booking.addons.map(addon => `
          <tr>
            <td style="font-weight: 600;">✓ ${addon}</td>
          </tr>
          `).join('')}
        </tbody>
      </table>
      ` : ''}

      <!-- Payment Details -->
      <h3 class="section-title" style="color: #1e40af;">💰 Payment Summary</h3>
      <div class="price-breakdown">
        <div class="price-row">
          <span class="price-label">Base Price</span>
          <span class="price-value">₹${booking.basePrice.toLocaleString()}</span>
        </div>
        ${booking.addonTotal > 0 ? `
        <div class="price-row">
          <span class="price-label">Add-ons</span>
          <span class="price-value">₹${booking.addonTotal.toLocaleString()}</span>
        </div>
        ` : ''}
        ${booking.discount > 0 ? `
        <div class="price-row">
          <span class="price-label">Discount ${booking.couponCode ? `(${booking.couponCode})` : ''}</span>
          <span class="price-value" style="color: #dc2626;">-₹${booking.discount.toLocaleString()}</span>
        </div>
        ` : ''}
        <div class="price-row price-total" style="color: #1e40af;">
          <span>Total Amount</span>
          <span>₹${booking.totalAmount.toLocaleString()}</span>
        </div>
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #d1d5db;">
          <div class="price-row" style="color: #16a34a; font-weight: 600; font-size: 16px;">
            <span>✓ Full Payment Received (${booking.paymentMethod.toUpperCase()})</span>
            <span>₹${booking.totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <!-- Action Required -->
      <div class="highlight-box" style="background: #fef3c7; border-color: #f59e0b;">
        <p class="highlight-title" style="color: #92400e;">⚠️ Action Required</p>
        <p class="highlight-text" style="color: #78350f;">
          ✓ Check availability and prepare ${booking.propertyName}<br>
          ✓ Contact guest: <strong><a href="tel:${booking.guestPhone}" style="color: #92400e;">${booking.guestPhone}</a></strong><br>
          ✓ Arrange add-ons: ${booking.addons.length > 0 ? booking.addons.join(', ') : 'None'}<br>
          ✓ Full payment received: ₹${booking.totalAmount.toLocaleString()} ✅
        </p>
      </div>

      <!-- Quick Actions -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://lakeora.sanity.studio" class="button" style="background: #2563eb;">Open in Sanity Studio</a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text" style="font-weight: 600;">Lakeora Admin Panel</p>
      <p class="footer-text" style="font-size: 12px;">
        This is an automated notification. Booking details are saved in Sanity CMS.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
