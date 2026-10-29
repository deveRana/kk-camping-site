import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/client';
import { sendBookingEmails } from '@/lib/email/client';
import { generateGuestConfirmationEmail, generateAdminNotificationEmail } from '@/lib/email/templates';
import { validateBookingData, sanitizeBookingData } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    // Validate content-type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content-type. Expected application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      referenceId,
      propertyId,
      propertyName,
      propertyCategory,
      guestName,
      guestEmail,
      guestPhone,
      guestCity,
      numberOfGuests,
      vegCount,
      nonVegCount,
      checkInDate,
      checkOutDate,
      addons,
      basePrice,
      addonTotal,
      discount,
      couponCode,
      totalAmount,
      advanceAmount,
      remainingAmount,
      paymentMethod,
      notes,
      dataConsent,
      consentTimestamp,
      paymentStatus,
      razorpayOrderId,
    } = body;

    // Validate required fields
    if (!referenceId || !propertyId || !propertyName || !guestName || !guestEmail || !guestPhone || !numberOfGuests || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // DPDPA Compliance - Validate consent
    if (!dataConsent || dataConsent !== true) {
      return NextResponse.json(
        { error: 'Data collection consent is required as per DPDPA 2023' },
        { status: 400 }
      );
    }

    if (!consentTimestamp) {
      return NextResponse.json(
        { error: 'Consent timestamp is required' },
        { status: 400 }
      );
    }

    // Validate and sanitize input data
    const validation = validateBookingData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Invalid input data', details: validation.errors },
        { status: 400 }
      );
    }

    // Sanitize data to prevent injection attacks
    const sanitizedData = sanitizeBookingData(body);

    // Determine booking status based on payment status
    // If payment is pending (Razorpay), booking is initially 'pending'
    // If payment is already completed (manual/cash), booking is 'confirmed'
    const bookingStatus = paymentStatus === 'pending' ? 'pending' : 'confirmed';
    const bookingPaymentStatus = paymentStatus || 'paid';

    // Create booking document in Sanity
    const booking = await writeClient.create({
      _type: 'booking',
      referenceId,
      bookingDate: new Date().toISOString(),
      status: bookingStatus,

      // Property details
      propertyId,
      propertyName,
      propertyCategory,

      // Guest details (sanitized)
      guestName: sanitizedData.guestName,
      guestEmail: sanitizedData.guestEmail,
      guestPhone: sanitizedData.guestPhone,
      guestCity: sanitizedData.guestCity,

      // Booking details
      numberOfGuests,
      ...(vegCount !== undefined && { vegCount: Number(vegCount) }),
      ...(nonVegCount !== undefined && { nonVegCount: Number(nonVegCount) }),
      checkInDate,
      checkOutDate,
      addons: addons || [],

      // Pricing (sanitized)
      basePrice: Number(basePrice),
      addonTotal: Number(addonTotal) || 0,
      discount: Number(discount) || 0,
      couponCode: sanitizedData.couponCode,
      totalAmount: Number(totalAmount),
      ...(advanceAmount !== undefined && { advanceAmount: Number(advanceAmount) }),
      ...(remainingAmount !== undefined && { remainingAmount: Number(remainingAmount) }),

      // Payment
      paymentMethod,
      paymentStatus: bookingPaymentStatus,
      ...(razorpayOrderId && { razorpayOrderId }),

      // Notes (sanitized)
      notes: sanitizedData.notes,

      // DPDPA Compliance - Consent
      dataConsent: true,
      consentTimestamp,
      consentIpAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    });

    // Only create payment record and send emails if payment is not pending
    // For Razorpay payments, these will be done in the verify-payment endpoint
    let payment = null;
    let emailResults = null;

    if (paymentStatus !== 'pending') {
      // Create payment record for non-Razorpay payments (manual/cash)
      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      payment = await writeClient.create({
        _type: 'payment',
        transactionId,
        bookingReference: {
          _type: 'reference',
          _ref: booking._id,
        },
        bookingReferenceId: referenceId,
        paymentDate: new Date().toISOString(),

        // Customer details
        customerName: guestName,
        customerEmail: guestEmail,
        customerPhone: guestPhone,

        // Payment details
        amount: totalAmount,
        paymentType: 'full',
        paymentMethod,
        paymentStatus: 'success',
        currency: 'INR',

        // Additional
        paymentGateway: 'Manual',
        notes: `Full payment for booking ${referenceId}`,
      });

      // Prepare booking details for email templates
      const bookingDetails = {
        referenceId,
        guestName,
        guestEmail,
        guestPhone,
        guestCity,
        propertyName,
        propertyCategory,
        numberOfGuests,
        ...(vegCount !== undefined && { vegCount }),
        ...(nonVegCount !== undefined && { nonVegCount }),
        checkInDate,
        checkOutDate,
        addons: addons || [],
        basePrice,
        addonTotal: addonTotal || 0,
        discount: discount || 0,
        couponCode,
        totalAmount,
        ...(advanceAmount !== undefined && { advanceAmount }),
        ...(remainingAmount !== undefined && { remainingAmount }),
        paymentMethod,
        bookingDate: booking.bookingDate,
      };

      // Generate email templates
      const guestEmailHtml = generateGuestConfirmationEmail(bookingDetails);
      const adminEmailHtml = generateAdminNotificationEmail(bookingDetails);

      // Send emails to both guest and admin
      emailResults = await sendBookingEmails(
        guestEmail,
        guestEmailHtml,
        adminEmailHtml,
        referenceId
      );
    }

    return NextResponse.json({
      success: true,
      booking: {
        _id: booking._id,
        referenceId: booking.referenceId,
        status: booking.status,
      },
      ...(payment && {
        payment: {
          _id: payment._id,
          transactionId: payment.transactionId,
        },
      }),
      ...(emailResults && {
        emails: {
          guestEmailSent: emailResults.guestEmailSent,
          adminEmailSent: emailResults.adminEmailSent,
        },
      }),
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    // Don't expose internal error details to client
    return NextResponse.json(
      { error: 'Failed to create booking. Please try again or contact support.' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch bookings (SECURED - requires authentication token)
export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    const authHeader = request.headers.get('authorization');
    const adminToken = process.env.ADMIN_API_TOKEN;

    if (!authHeader || !adminToken || authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    const referenceId = searchParams.get('referenceId');

    // Use parameterized queries to prevent GROQ injection
    let query = '*[_type == "booking"';
    const params: Record<string, string> = {};

    if (email) {
      query += ' && guestEmail == $email';
      params.email = email;
    }
    if (phone) {
      query += ' && guestPhone == $phone';
      params.phone = phone;
    }
    if (referenceId) {
      query += ' && referenceId == $referenceId';
      params.referenceId = referenceId;
    }

    query += '] | order(bookingDate desc)';

    // Use parameterized query to prevent injection
    const bookings = await writeClient.fetch(query, params);

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
