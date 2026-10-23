import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const FROM_EMAIL = process.env.EMAIL_FROM || 'Lakeora <bookings@lakeora.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@lakeora.com';

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send an email using Resend
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

/**
 * Send booking confirmation to guest
 */
export async function sendGuestConfirmation(guestEmail: string, subject: string, html: string) {
  return sendEmail({
    to: guestEmail,
    subject,
    html,
    replyTo: ADMIN_EMAIL,
  });
}

/**
 * Send booking notification to admin
 */
export async function sendAdminNotification(subject: string, html: string) {
  return sendEmail({
    to: ADMIN_EMAIL,
    subject,
    html,
  });
}

/**
 * Send emails to both guest and admin
 */
export async function sendBookingEmails(
  guestEmail: string,
  guestHtml: string,
  adminHtml: string,
  referenceId: string
) {
  const guestSubject = `Booking Confirmed - ${referenceId} | Lakeora Camping`;
  const adminSubject = `🔔 New Booking: ${referenceId}`;

  // Send both emails in parallel
  const [guestResult, adminResult] = await Promise.all([
    sendGuestConfirmation(guestEmail, guestSubject, guestHtml),
    sendAdminNotification(adminSubject, adminHtml),
  ]);

  return {
    guestEmailSent: guestResult.success,
    adminEmailSent: adminResult.success,
    errors: {
      guest: guestResult.error,
      admin: adminResult.error,
    },
  };
}
