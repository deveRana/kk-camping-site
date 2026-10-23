import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/client';

export async function POST(request: NextRequest) {
  try {
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
      checkInDate,
      checkOutDate,
      addons,
      basePrice,
      addonTotal,
      discount,
      couponCode,
      totalAmount,
      advancePercentage,
      advanceAmount,
      balanceAmount,
      paymentMethod,
      notes,
    } = body;

    // Validate required fields
    if (!referenceId || !propertyId || !propertyName || !guestName || !guestEmail || !guestPhone || !numberOfGuests || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create booking document in Sanity
    const booking = await writeClient.create({
      _type: 'booking',
      referenceId,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',

      // Property details
      propertyId,
      propertyName,
      propertyCategory,

      // Guest details
      guestName,
      guestEmail,
      guestPhone,
      guestCity,

      // Booking details
      numberOfGuests,
      checkInDate,
      checkOutDate,
      addons: addons || [],

      // Pricing
      basePrice,
      addonTotal: addonTotal || 0,
      discount: discount || 0,
      couponCode,
      totalAmount,
      advancePercentage: advancePercentage || 50,
      advanceAmount,
      balanceAmount,

      // Payment
      paymentMethod,
      paymentStatus: 'paid',

      // Notes
      notes,
    });

    // Create payment record
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const payment = await writeClient.create({
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
      amount: advanceAmount,
      paymentType: 'advance',
      paymentMethod,
      paymentStatus: 'success',
      currency: 'INR',

      // Additional
      paymentGateway: 'Manual',
      notes: `Advance payment for booking ${referenceId}`,
    });

    return NextResponse.json({
      success: true,
      booking: {
        _id: booking._id,
        referenceId: booking.referenceId,
      },
      payment: {
        _id: payment._id,
        transactionId: payment.transactionId,
      },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch bookings
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    const referenceId = searchParams.get('referenceId');

    let query = '*[_type == "booking"';

    if (email) {
      query += ` && guestEmail == "${email}"`;
    }
    if (phone) {
      query += ` && guestPhone == "${phone}"`;
    }
    if (referenceId) {
      query += ` && referenceId == "${referenceId}"`;
    }

    query += '] | order(bookingDate desc)';

    const bookings = await writeClient.fetch(query);

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
