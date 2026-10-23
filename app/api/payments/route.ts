import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/client';
import { validateEmail, validatePhone, sanitizeString } from '@/lib/validation';

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

    // Validate email if provided
    if (customerEmail && !validateEmail(customerEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (customerPhone && !validatePhone(customerPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0 || amount > 1000000) {
      return NextResponse.json(
        { error: 'Invalid payment amount' },
        { status: 400 }
      );
    }

    // Sanitize string inputs
    const sanitizedCustomerName = sanitizeString(customerName, 100);
    const sanitizedNotes = notes ? sanitizeString(notes, 1000) : undefined;

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

      // Customer details (sanitized)
      customerName: sanitizedCustomerName,
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

      // Additional (sanitized)
      notes: sanitizedNotes,
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
    // Don't expose internal error details
    return NextResponse.json(
      { error: 'Failed to create payment record. Please try again or contact support.' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch payments (SECURED - requires authentication)
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
    const bookingRef = searchParams.get('bookingRef');
    const email = searchParams.get('email');
    const transactionId = searchParams.get('transactionId');

    // Use parameterized queries to prevent GROQ injection
    let query = '*[_type == "payment"';
    const params: Record<string, string> = {};

    if (bookingRef) {
      query += ' && bookingReferenceId == $bookingRef';
      params.bookingRef = bookingRef;
    }
    if (email) {
      query += ' && customerEmail == $email';
      params.email = email;
    }
    if (transactionId) {
      query += ' && transactionId == $transactionId';
      params.transactionId = transactionId;
    }

    query += '] | order(paymentDate desc)';

    // Use parameterized query to prevent injection
    const payments = await writeClient.fetch(query, params);

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
