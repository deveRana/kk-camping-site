import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/send';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, bookingReference, reason } = body;

    // Validate required fields
    if (!name || !email || !reason) {
      return NextResponse.json(
        { error: 'Name, email, and reason are required' },
        { status: 400 }
      );
    }

    // Email to admin about data deletion request
    const adminEmailSubject = `Data Deletion Request - ${name}`;
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a5f4f;">Data Deletion Request Received</h2>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">User Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${bookingReference ? `<p><strong>Booking Reference:</strong> ${bookingReference}</p>` : ''}
        </div>

        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <h3 style="margin-top: 0;">Reason for Deletion:</h3>
          <p>${reason}</p>
        </div>

        <div style="background: #e7f5f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Action Required:</h3>
          <ol style="line-height: 1.8;">
            <li>Verify the user's identity</li>
            <li>Check for active bookings (cannot delete if active)</li>
            <li>Delete personal data from:
              <ul>
                <li>Sanity CMS (bookings, user records)</li>
                <li>Email marketing lists (if any)</li>
                <li>Any backup systems</li>
              </ul>
            </li>
            <li>Retain financial records for 2 years (tax compliance)</li>
            <li>Send confirmation email to user</li>
            <li>Complete within 30 days (DPDP Act requirement)</li>
          </ol>
        </div>

        <div style="background: #f8d7da; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545;">
          <p style="margin: 0; color: #721c24;">
            <strong>⚠️ Legal Requirement:</strong> This request must be processed within 30 days as per DPDP Act 2023.
          </p>
        </div>

        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Request received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
        </p>
      </div>
    `;

    // Send email to admin
    await sendEmail(
      process.env.ADMIN_EMAIL || 'info@lakeorastay.com',
      adminEmailSubject,
      adminEmailContent
    );

    // Send acknowledgment email to user
    const userEmailSubject = 'Data Deletion Request Received - Lakeora';
    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a5f4f;">Data Deletion Request Received</h2>

        <p>Dear ${name},</p>

        <p>We have received your request to delete your personal data from our systems.</p>

        <div style="background: #e7f5f1; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1a5f4f;">
          <h3 style="margin-top: 0;">What Happens Next:</h3>
          <ol style="line-height: 1.8;">
            <li>We will verify your identity</li>
            <li>Your personal data will be deleted from our systems</li>
            <li>You will receive a confirmation email once complete</li>
            <li>Process timeline: <strong>Within 30 days</strong></li>
          </ol>
        </div>

        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <p style="margin: 0;"><strong>Please Note:</strong></p>
          <ul style="line-height: 1.6;">
            <li>Financial records will be retained for 2 years as required by tax laws</li>
            <li>This action is permanent and cannot be undone</li>
            <li>You will need to create a new account for future bookings</li>
          </ul>
        </div>

        <p>If you have any questions or did not submit this request, please contact us immediately:</p>
        <p>
          📧 Email: <a href="mailto:privacy@lakeorastay.com">privacy@lakeorastay.com</a><br/>
          📞 Phone: <a href="tel:+917499757607">+91 74997 57607</a>
        </p>

        <p style="margin-top: 30px;">
          Best regards,<br/>
          <strong>Lakeora Team</strong>
        </p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />

        <p style="color: #666; font-size: 11px;">
          This request is being processed in compliance with the Digital Personal Data Protection Act (DPDP), 2023.
        </p>
      </div>
    `;

    await sendEmail(email, userEmailSubject, userEmailContent);

    return NextResponse.json({
      success: true,
      message: 'Data deletion request submitted successfully',
    });
  } catch (error) {
    console.error('Data deletion request error:', error);
    return NextResponse.json(
      { error: 'Failed to process data deletion request' },
      { status: 500 }
    );
  }
}
