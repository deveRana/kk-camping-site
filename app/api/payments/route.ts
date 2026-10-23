import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      bookingReferenceId,
      customerName,
      customerEmail,
      customerPhone,
      amount,
      paymentType,
      paymentMethod,
      paymentGateway,
      gatewayTransactionId,
      gatewayOrderId,
      upiId,
      upiTransactionRef,
      cardLast4,
      cardType,
      notes,
    } = body;

    // Validate required fields
    if (!bookingReferenceId || !customerName || !amount || !paymentType || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Find the booking reference
    const bookingQuery = `*[_type == "booking" && referenceId == "${bookingReferenceId}"][0]`;
    const booking = await writeClient.fetch(bookingQuery);

    // Create payment document
    const payment = await writeClient.create({
      _type: 'payment',
      transactionId,
      ...(booking?._id && {
        bookingReference: {
          _type: 'reference',
          _ref: booking._id,
        },
      }),
      bookingReferenceId,
      paymentDate: new Date().toISOString(),

      // Customer details
      customerName,
      customerEmail,
      customerPhone,

      // Payment details
      amount,
      paymentType,
      paymentMethod,
      paymentStatus: 'success',
      currency: 'INR',

      // Gateway details
      paymentGateway,
      gatewayTransactionId,
      gatewayOrderId,

      // UPI details
      upiId,
      upiTransactionRef,

      // Card details
      cardLast4,
      cardType,

      // Additional
      notes,
    });

    return NextResponse.json({
      success: true,
      payment: {
        _id: payment._id,
        transactionId: payment.transactionId,
      },
    });
  } catch (error) {
    console.error('Error creating payment record:', error);
    return NextResponse.json(
      { error: 'Failed to create payment record', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch payments
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookingRef = searchParams.get('bookingRef');
    const email = searchParams.get('email');
    const transactionId = searchParams.get('transactionId');

    let query = '*[_type == "payment"';

    if (bookingRef) {
      query += ` && bookingReferenceId == "${bookingRef}"`;
    }
    if (email) {
      query += ` && customerEmail == "${email}"`;
    }
    if (transactionId) {
      query += ` && transactionId == "${transactionId}"`;
    }

    query += '] | order(paymentDate desc)';

    const payments = await writeClient.fetch(query);

    return NextResponse.json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}
