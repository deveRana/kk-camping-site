import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature, fetchPaymentDetails } from '@/lib/razorpay/server';
import { writeClient } from '@/lib/sanity/client';
import { sendBookingEmails } from '@/lib/email/client';
import { generateGuestConfirmationEmail, generateAdminNotificationEmail } from '@/lib/email/templates';

/**
 * POST /api/razorpay/verify-payment
 *
 * Verifies Razorpay payment signature and updates booking/payment records
 */
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
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingReferenceId,
    } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment verification parameters' },
        { status: 400 }
      );
    }

    if (!bookingReferenceId) {
      return NextResponse.json(
        { error: 'Booking reference ID is required' },
        { status: 400 }
      );
    }

    // Verify signature
    const verification = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!verification.isValid) {
      console.error('Payment signature verification failed:', verification.error);
      return NextResponse.json(
        {
          success: false,
          error: 'Payment verification failed. Please contact support.',
          verified: false,
        },
        { status: 400 }
      );
    }

    // Fetch payment details from Razorpay for additional verification
    const paymentResult = await fetchPaymentDetails(razorpay_payment_id);

    if (!paymentResult.success || !paymentResult.payment) {
      console.error('Failed to fetch payment details:', paymentResult.error);
      return NextResponse.json(
        { error: 'Failed to verify payment details. Please contact support.' },
        { status: 500 }
      );
    }

    const payment = paymentResult.payment;

    // Check if payment was captured (successful)
    if (payment.status !== 'captured') {
      return NextResponse.json(
        {
          success: false,
          error: `Payment status is ${payment.status}. Please try again or contact support.`,
          verified: false,
        },
        { status: 400 }
      );
    }

    // Find the booking
    const bookingQuery = `*[_type == "booking" && referenceId == $bookingRef][0]`;
    const booking = await writeClient.fetch(bookingQuery, {
      bookingRef: bookingReferenceId,
    });

    if (!booking) {
      console.error('Booking not found:', bookingReferenceId);
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Update booking status to confirmed
    await writeClient
      .patch(booking._id)
      .set({
        status: 'confirmed',
        paymentStatus: 'paid',
      })
      .commit();

    // Create/update payment record in Sanity
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const paymentRecord = await writeClient.create({
      _type: 'payment',
      transactionId,
      bookingReference: {
        _type: 'reference',
        _ref: booking._id,
      },
      bookingReferenceId: bookingReferenceId,
      paymentDate: new Date().toISOString(),

      // Customer details
      customerName: booking.guestName,
      customerEmail: booking.guestEmail,
      customerPhone: booking.guestPhone,

      // Payment details
      amount: Number(payment.amount) / 100, // Convert paise to INR
      paymentType: 'full',
      paymentMethod: payment.method || 'razorpay',
      paymentStatus: 'success',
      currency: payment.currency || 'INR',

      // Razorpay gateway details
      paymentGateway: 'Razorpay',
      gatewayTransactionId: razorpay_payment_id,
      gatewayOrderId: razorpay_order_id,

      // Card/UPI details if available
      ...(payment.card && {
        cardLast4: payment.card.last4,
        cardType: payment.card.network,
      }),
      ...(payment.vpa && {
        upiId: payment.vpa,
      }),

      notes: `Payment verified successfully for booking ${bookingReferenceId}`,
    });

    // Send confirmation emails after successful payment verification
    try {
      const bookingDetails = {
        referenceId: bookingReferenceId,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        guestPhone: booking.guestPhone,
        guestCity: booking.guestCity,
        propertyName: booking.propertyName,
        propertyCategory: booking.propertyCategory,
        numberOfGuests: booking.numberOfGuests,
        ...(booking.vegCount !== undefined && { vegCount: booking.vegCount }),
        ...(booking.nonVegCount !== undefined && { nonVegCount: booking.nonVegCount }),
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        addons: booking.addons || [],
        basePrice: booking.basePrice,
        addonTotal: booking.addonTotal || 0,
        discount: booking.discount || 0,
        couponCode: booking.couponCode,
        totalAmount: booking.totalAmount,
        ...(booking.advanceAmount !== undefined && { advanceAmount: booking.advanceAmount }),
        ...(booking.remainingAmount !== undefined && { remainingAmount: booking.remainingAmount }),
        paymentMethod: 'razorpay',
        bookingDate: booking.bookingDate,
      };

      const guestEmailHtml = generateGuestConfirmationEmail(bookingDetails);
      const adminEmailHtml = generateAdminNotificationEmail(bookingDetails);

      await sendBookingEmails(
        booking.guestEmail,
        guestEmailHtml,
        adminEmailHtml,
        bookingReferenceId
      );
    } catch (emailError) {
      // Log email error but don't fail the payment verification
      console.error('Failed to send confirmation emails:', emailError);
    }

    return NextResponse.json({
      success: true,
      verified: true,
      bookingId: booking._id,
      paymentId: paymentRecord._id,
      transactionId: paymentRecord.transactionId,
      amount: Number(payment.amount) / 100,
      message: 'Payment verified successfully',
    });
  } catch (error) {
    console.error('Error in verify-payment API:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please contact support.' },
      { status: 500 }
    );
  }
}
