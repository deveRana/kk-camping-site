/**
 * Clean Email Templates for Lakeora Camping & Cafe
 * Minimal design with essential info + invoice download
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background-color: #f9fafb;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    }
    .header {
      background: linear-gradient(135deg, #065f46 0%, #047857 100%);
      padding: 32px 24px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 4px;
      margin-bottom: 8px;
    }
    .tagline {
      color: #d1fae5;
      font-size: 13px;
      letter-spacing: 1px;
    }
    .content {
      padding: 32px 24px;
    }
    .success-check {
      width: 64px;
      height: 64px;
      margin: 0 auto 24px;
      background: #10b981;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .checkmark {
      width: 32px;
      height: 32px;
      border: 3px solid white;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
      margin-top: -4px;
    }
    .title {
      font-size: 24px;
      font-weight: 700;
      color: #065f46;
      text-align: center;
      margin-bottom: 12px;
    }
    .subtitle {
      font-size: 15px;
      color: #6b7280;
      text-align: center;
      margin-bottom: 32px;
    }
    .ref-box {
      background: #f0fdf4;
      border: 2px dashed #10b981;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin-bottom: 32px;
    }
    .ref-label {
      font-size: 11px;
      color: #6b7280;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 8px;
    }
    .ref-number {
      font-size: 24px;
      font-weight: 800;
      color: #065f46;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
    }
    .info-grid {
      display: table;
      width: 100%;
      margin: 24px 0;
    }
    .info-row {
      display: table-row;
    }
    .info-label {
      display: table-cell;
      padding: 10px 0;
      font-size: 14px;
      color: #6b7280;
      width: 40%;
    }
    .info-value {
      display: table-cell;
      padding: 10px 0;
      font-size: 14px;
      color: #111827;
      font-weight: 600;
      text-align: right;
    }
    .divider {
      height: 1px;
      background: #e5e7eb;
      margin: 24px 0;
    }
    .button-primary {
      display: inline-block;
      background: #065f46;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 15px;
      text-align: center;
      margin: 16px 0;
    }
    .button-secondary {
      display: inline-block;
      background: #ffffff;
      color: #065f46 !important;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 15px;
      text-align: center;
      margin: 16px 0;
      border: 2px solid #065f46;
    }
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    .price-summary {
      background: #f9fafb;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
      color: #4b5563;
    }
    .price-total {
      display: flex;
      justify-content: space-between;
      padding: 16px 0 0 0;
      margin-top: 12px;
      border-top: 2px solid #e5e7eb;
      font-size: 18px;
      font-weight: 700;
      color: #065f46;
    }
    .footer {
      background: #f9fafb;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer-text {
      font-size: 13px;
      color: #6b7280;
      margin: 4px 0;
    }
    .footer-link {
      color: #065f46;
      text-decoration: none;
      font-weight: 500;
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
  <title>Booking Confirmed</title>
  ${emailStyles}
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <div class="logo">LAKEORA</div>
      <div class="tagline">Lakeside Camping & Cafe · Pawna Lake</div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Success Icon -->
      <div class="success-check">
        <div class="checkmark"></div>
      </div>

      <h1 class="title">Booking Confirmed!</h1>
      <p class="subtitle">Hi ${booking.guestName}, your reservation is confirmed</p>

      <!-- Reference Number -->
      <div class="ref-box">
        <div class="ref-label">Booking Reference</div>
        <div class="ref-number">${booking.referenceId}</div>
      </div>

      <!-- Key Details -->
      <div class="info-grid">
        <div class="info-row">
          <div class="info-label">Property</div>
          <div class="info-value">${booking.propertyName}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Guests</div>
          <div class="info-value">${booking.numberOfGuests} ${booking.numberOfGuests === 1 ? 'person' : 'people'}</div>
        </div>
        ${booking.checkInDate ? `
        <div class="info-row">
          <div class="info-label">Check-in</div>
          <div class="info-value">${booking.checkInDate} at 4:00 PM</div>
        </div>
        ` : ''}
        ${booking.checkOutDate ? `
        <div class="info-row">
          <div class="info-label">Check-out</div>
          <div class="info-value">${booking.checkOutDate} at 11:00 AM</div>
        </div>
        ` : ''}
      </div>

      <!-- Price Summary -->
      <div class="price-summary">
        <div class="price-row">
          <span>Booking Amount</span>
          <span>₹${booking.basePrice.toLocaleString()}</span>
        </div>
        ${booking.addonTotal > 0 ? `
        <div class="price-row">
          <span>Add-ons</span>
          <span>₹${booking.addonTotal.toLocaleString()}</span>
        </div>
        ` : ''}
        ${booking.discount > 0 ? `
        <div class="price-row">
          <span>Discount${booking.couponCode ? ` (${booking.couponCode})` : ''}</span>
          <span style="color: #10b981;">-₹${booking.discount.toLocaleString()}</span>
        </div>
        ` : ''}
        <div class="price-total">
          <span>Total Paid</span>
          <span>₹${booking.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="button-container">
        <a href="https://pawnatentcamp.com/api/invoice?ref=${booking.referenceId}" class="button-primary">
          Download Invoice
        </a>
        <br />
        <a href="https://maps.app.goo.gl/c6JVSxCKqkyfMrR47" class="button-secondary">
          Get Directions
        </a>
      </div>

      <div class="divider"></div>

      <!-- Contact -->
      <div style="text-align: center;">
        <p style="font-size: 14px; color: #6b7280; margin-bottom: 16px;">
          Need help? Contact us
        </p>
        <p style="font-size: 14px; color: #065f46; font-weight: 600;">
          +91 74997 57607
        </p>
        <p style="font-size: 14px; color: #065f46;">
          booking@lakeora.com
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        <strong>Lakeora Cafe & Camping</strong>
      </p>
      <p class="footer-text">
        Pawna Lake · Near Lonavala · Maharashtra
      </p>
      <p class="footer-text" style="margin-top: 12px;">
        <a href="https://pawnatentcamp.com" class="footer-link">Visit Website</a>
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
  <div class="email-container">
    <!-- Header -->
    <div class="header" style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);">
      <div class="logo">NEW BOOKING</div>
      <div class="tagline">Admin Notification · Lakeora</div>
    </div>

    <!-- Content -->
    <div class="content">
      <h1 class="title" style="color: #1e40af;">New Reservation Received</h1>
      <p class="subtitle">
        ${new Date(booking.bookingDate).toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>

      <!-- Reference Number -->
      <div class="ref-box" style="background: #dbeafe; border-color: #3b82f6;">
        <div class="ref-label">Booking Reference</div>
        <div class="ref-number" style="color: #1e40af;">${booking.referenceId}</div>
      </div>

      <!-- Guest Details -->
      <div class="info-grid">
        <div class="info-row">
          <div class="info-label">Guest Name</div>
          <div class="info-value">${booking.guestName}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Email</div>
          <div class="info-value">
            <a href="mailto:${booking.guestEmail}" style="color: #1e40af; text-decoration: none;">
              ${booking.guestEmail}
            </a>
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">Phone</div>
          <div class="info-value">
            <a href="tel:${booking.guestPhone}" style="color: #1e40af; text-decoration: none; font-weight: 700;">
              ${booking.guestPhone}
            </a>
          </div>
        </div>
        ${booking.guestCity ? `
        <div class="info-row">
          <div class="info-label">City</div>
          <div class="info-value">${booking.guestCity}</div>
        </div>
        ` : ''}
      </div>

      <div class="divider"></div>

      <!-- Booking Details -->
      <div class="info-grid">
        <div class="info-row">
          <div class="info-label">Property</div>
          <div class="info-value">${booking.propertyName}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Category</div>
          <div class="info-value">${booking.propertyCategory}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Guests</div>
          <div class="info-value">${booking.numberOfGuests}</div>
        </div>
        ${booking.checkInDate ? `
        <div class="info-row">
          <div class="info-label">Check-in</div>
          <div class="info-value">${booking.checkInDate}</div>
        </div>
        ` : ''}
        ${booking.checkOutDate ? `
        <div class="info-row">
          <div class="info-label">Check-out</div>
          <div class="info-value">${booking.checkOutDate}</div>
        </div>
        ` : ''}
      </div>

      ${booking.addons.length > 0 ? `
      <div class="divider"></div>
      <p style="font-size: 13px; color: #6b7280; font-weight: 600; margin-bottom: 8px;">ADD-ONS:</p>
      ${booking.addons.map(addon => `
        <p style="font-size: 14px; color: #374151; margin: 4px 0; padding-left: 12px;">• ${addon}</p>
      `).join('')}
      ` : ''}

      <!-- Price Summary -->
      <div class="price-summary">
        <div class="price-row">
          <span>Base Price</span>
          <span>₹${booking.basePrice.toLocaleString()}</span>
        </div>
        ${booking.addonTotal > 0 ? `
        <div class="price-row">
          <span>Add-ons</span>
          <span>₹${booking.addonTotal.toLocaleString()}</span>
        </div>
        ` : ''}
        ${booking.discount > 0 ? `
        <div class="price-row">
          <span>Discount</span>
          <span style="color: #dc2626;">-₹${booking.discount.toLocaleString()}</span>
        </div>
        ` : ''}
        <div class="price-total" style="color: #1e40af;">
          <span>Total Amount</span>
          <span>₹${booking.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <!-- Admin Actions -->
      <div class="button-container">
        <a href="https://lakeora.sanity.studio" class="button-primary" style="background: #1e40af;">
          Open in Sanity Studio
        </a>
      </div>

      <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <p style="font-size: 13px; color: #92400e; font-weight: 600; margin-bottom: 8px;">
          ACTION REQUIRED
        </p>
        <p style="font-size: 13px; color: #78350f; line-height: 1.6;">
          • Confirm property availability<br>
          • Contact guest: <strong>${booking.guestPhone}</strong><br>
          • Arrange add-ons if any<br>
          • Payment received: ₹${booking.totalAmount.toLocaleString()}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        <strong>Lakeora Admin Panel</strong>
      </p>
      <p class="footer-text">
        This is an automated notification from your booking system
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
