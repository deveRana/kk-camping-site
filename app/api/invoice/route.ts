import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get('ref');

  if (!ref) {
    return new NextResponse('Missing reference ID', { status: 400 });
  }

  // Fetch booking from Sanity
  const booking = await client.fetch(
    `*[_type == "booking" && referenceId == $ref][0]{
      referenceId, guestName, guestEmail, guestPhone, guestCity,
      propertyName, propertyCategory, numberOfGuests, vegCount, nonVegCount,
      checkInDate, checkOutDate, addons,
      basePrice, addonTotal, discount, couponCode, totalAmount,
      paymentMethod, paymentStatus, bookingDate
    }`,
    { ref }
  );

  if (!booking) {
    return new NextResponse('Booking not found', { status: 404 });
  }

  // Generate professional HTML invoice
  const invoiceHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice - ${booking.referenceId}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
      padding: 40px 20px;
    }
    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    }
    .invoice-header {
      background: linear-gradient(135deg, #065f46 0%, #047857 100%);
      color: white;
      padding: 40px;
      position: relative;
    }
    .invoice-header::after {
      content: '';
      position: absolute;
      bottom: -20px;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(135deg, #065f46 0%, #047857 100%);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
    }
    .company-info {
      margin-bottom: 30px;
    }
    .company-name {
      font-size: 36px;
      font-weight: 800;
      letter-spacing: 4px;
      margin-bottom: 8px;
    }
    .company-tagline {
      font-size: 14px;
      color: #d1fae5;
      letter-spacing: 1.5px;
    }
    .invoice-meta {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 30px;
    }
    .invoice-title {
      font-size: 28px;
      font-weight: 700;
      color: white;
    }
    .invoice-details {
      text-align: right;
    }
    .invoice-number {
      font-size: 20px;
      font-weight: 800;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
      color: #d1fae5;
    }
    .invoice-date {
      font-size: 13px;
      color: #d1fae5;
      margin-top: 4px;
    }
    .invoice-body {
      padding: 60px 40px 40px;
    }
    .section {
      margin-bottom: 40px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #065f46;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #065f46;
    }
    .info-grid {
      background: #f9fafb;
      padding: 24px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }
    .info-value {
      font-size: 14px;
      color: #111827;
      font-weight: 600;
      text-align: right;
    }
    .guest-box {
      background: #ecfdf5;
      border: 2px solid #10b981;
      padding: 24px;
      border-radius: 8px;
    }
    .guest-name {
      font-size: 20px;
      font-weight: 700;
      color: #065f46;
      margin-bottom: 12px;
    }
    .guest-detail {
      font-size: 14px;
      color: #047857;
      margin: 6px 0;
    }
    .addons-list {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    .addon-item {
      padding: 8px 0;
      font-size: 14px;
      color: #374151;
      padding-left: 20px;
      position: relative;
    }
    .addon-item::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: bold;
    }
    .payment-table {
      width: 100%;
      margin-top: 20px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    }
    .payment-row {
      display: flex;
      justify-content: space-between;
      padding: 16px 24px;
      border-bottom: 1px solid #e5e7eb;
    }
    .payment-row:last-child {
      border-bottom: none;
    }
    .payment-label {
      font-size: 14px;
      color: #374151;
      font-weight: 500;
    }
    .payment-value {
      font-size: 14px;
      color: #111827;
      font-weight: 600;
    }
    .payment-total {
      background: #f9fafb;
      font-size: 18px;
      font-weight: 700;
      color: #065f46;
    }
    .payment-paid {
      background: #065f46;
      color: white;
      font-size: 16px;
      font-weight: 700;
    }
    .status-badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .status-confirmed {
      background: #10b981;
      color: white;
    }
    .invoice-footer {
      margin-top: 60px;
      padding-top: 30px;
      border-top: 2px solid #e5e7eb;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 30px;
    }
    .footer-section h4 {
      font-size: 14px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .footer-section p {
      font-size: 13px;
      color: #6b7280;
      margin: 6px 0;
      line-height: 1.6;
    }
    .footer-note {
      background: #fffbeb;
      border: 1px solid #fbbf24;
      padding: 20px;
      border-radius: 8px;
      margin-top: 30px;
    }
    .footer-note p {
      font-size: 13px;
      color: #92400e;
      line-height: 1.6;
    }
    .signature-section {
      margin-top: 60px;
      text-align: right;
    }
    .signature-line {
      width: 250px;
      margin-left: auto;
      border-top: 2px solid #111827;
      margin-bottom: 8px;
      margin-top: 60px;
    }
    .signature-label {
      font-size: 13px;
      color: #6b7280;
      font-weight: 600;
    }
    @media print {
      body {
        padding: 0;
      }
      .invoice-container {
        border: none;
        border-radius: 0;
      }
    }
    @media (max-width: 768px) {
      .invoice-meta {
        flex-direction: column;
        gap: 20px;
      }
      .invoice-details {
        text-align: left;
      }
      .footer-grid {
        grid-template-columns: 1fr;
        gap: 30px;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <!-- Header -->
    <div class="invoice-header">
      <div class="company-info">
        <div class="company-name">LAKEORA</div>
        <div class="company-tagline">Lakeside Camping & Cafe · Pawna Lake</div>
      </div>
      <div class="invoice-meta">
        <div class="invoice-title">INVOICE</div>
        <div class="invoice-details">
          <div class="invoice-number">${booking.referenceId}</div>
          <div class="invoice-date">Date: ${new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="invoice-body">
      <!-- Bill To -->
      <div class="section">
        <div class="section-title">Bill To</div>
        <div class="guest-box">
          <div class="guest-name">${booking.guestName}</div>
          <div class="guest-detail">Email: ${booking.guestEmail}</div>
          <div class="guest-detail">Phone: ${booking.guestPhone}</div>
          ${booking.guestCity ? `<div class="guest-detail">City: ${booking.guestCity}</div>` : ''}
        </div>
      </div>

      <!-- Booking Details -->
      <div class="section">
        <div class="section-title">Booking Details</div>
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
            <div class="info-label">Number of Guests</div>
            <div class="info-value">${booking.numberOfGuests} ${booking.numberOfGuests === 1 ? 'person' : 'people'}</div>
          </div>
          ${booking.vegCount !== undefined && booking.nonVegCount !== undefined ? `
          <div class="info-row">
            <div class="info-label">Food Preference</div>
            <div class="info-value">
              <span style="display: inline-block; padding: 4px 12px; background: #10b981; color: white; border-radius: 12px; font-size: 11px; font-weight: 700; margin-right: 8px;">
                🥗 ${booking.vegCount} VEG
              </span>
              <span style="display: inline-block; padding: 4px 12px; background: #ef4444; color: white; border-radius: 12px; font-size: 11px; font-weight: 700;">
                🍗 ${booking.nonVegCount} NON-VEG
              </span>
            </div>
          </div>
          ` : ''}
          ${booking.checkInDate ? `
          <div class="info-row">
            <div class="info-label">Check-in Date</div>
            <div class="info-value">${booking.checkInDate} at 4:00 PM</div>
          </div>
          ` : ''}
          ${booking.checkOutDate ? `
          <div class="info-row">
            <div class="info-label">Check-out Date</div>
            <div class="info-value">${booking.checkOutDate} at 11:00 AM</div>
          </div>
          ` : ''}
          <div class="info-row">
            <div class="info-label">Payment Method</div>
            <div class="info-value">${booking.paymentMethod.toUpperCase()}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Payment Status</div>
            <div class="info-value">
              <span class="status-badge status-confirmed">${booking.paymentStatus?.toUpperCase() || 'CONFIRMED'}</span>
            </div>
          </div>
        </div>
      </div>

      ${booking.addons && booking.addons.length > 0 ? `
      <!-- Add-ons -->
      <div class="section">
        <div class="section-title">Add-ons & Services</div>
        <div class="addons-list">
          ${booking.addons.map((addon: string) => `<div class="addon-item">${addon}</div>`).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Payment Summary -->
      <div class="section">
        <div class="section-title">Payment Summary</div>
        <div class="payment-table">
          <div class="payment-row">
            <div class="payment-label">Base Price (${booking.numberOfGuests} ${booking.numberOfGuests === 1 ? 'guest' : 'guests'})</div>
            <div class="payment-value">₹${booking.basePrice?.toLocaleString() || '0'}</div>
          </div>
          ${booking.addonTotal && booking.addonTotal > 0 ? `
          <div class="payment-row">
            <div class="payment-label">Add-ons</div>
            <div class="payment-value">₹${booking.addonTotal.toLocaleString()}</div>
          </div>
          ` : ''}
          ${booking.discount && booking.discount > 0 ? `
          <div class="payment-row">
            <div class="payment-label">Discount ${booking.couponCode ? `(${booking.couponCode})` : ''}</div>
            <div class="payment-value" style="color: #10b981;">-₹${booking.discount.toLocaleString()}</div>
          </div>
          ` : ''}
          <div class="payment-row payment-total">
            <div class="payment-label">TOTAL AMOUNT</div>
            <div class="payment-value">₹${booking.totalAmount?.toLocaleString() || '0'}</div>
          </div>
          <div class="payment-row payment-paid">
            <div class="payment-label">AMOUNT PAID</div>
            <div class="payment-value">₹${booking.totalAmount?.toLocaleString() || '0'}</div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="invoice-footer">
        <div class="footer-grid">
          <div class="footer-section">
            <h4>Contact Information</h4>
            <p><strong>Lakeora Cafe & Camping</strong></p>
            <p>Pawna Lake, Near Lonavala</p>
            <p>Maharashtra, India</p>
            <p>Phone: +91 74997 57607</p>
            <p>Email: booking@lakeora.com</p>
            <p>Website: lakeorastay.com</p>
          </div>
          <div class="footer-section">
            <h4>Terms & Conditions</h4>
            <p>• Valid ID proof required at check-in</p>
            <p>• Check-in: 4:00 PM | Check-out: 11:00 AM</p>
            <p>• Cancellation policy as per booking terms</p>
            <p>• No refund for early check-out</p>
            <p>• Property rules must be followed</p>
          </div>
        </div>

        <div class="footer-note">
          <p><strong>Important:</strong> Please carry this invoice along with a valid government-issued ID proof at the time of check-in. For any queries or assistance, feel free to contact us at +91 74997 57607 or email booking@lakeora.com. We look forward to hosting you at Pawna Lake!</p>
        </div>

        <div class="signature-section">
          <div class="signature-line"></div>
          <div class="signature-label">Authorized Signature</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  return new NextResponse(invoiceHTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `attachment; filename="Lakeora-Invoice-${booking.referenceId}.html"`,
    },
  });
}
