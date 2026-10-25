import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay/server';
import { sanitizeString } from '@/lib/validation';

/**
 * POST /api/razorpay/create-order
 *
 * Creates a Razorpay order for payment processing
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
    const { amount, currency, receipt, guestName, guestEmail, propertyName } = body;

    // Validate required fields
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount. Must be a positive number.' },
        { status: 400 }
      );
    }

    if (amount > 1000000) {
      return NextResponse.json(
        { error: 'Amount exceeds maximum limit of ₹10,00,000' },
        { status: 400 }
      );
    }

    if (!receipt || typeof receipt !== 'string') {
      return NextResponse.json(
        { error: 'Receipt ID is required' },
        { status: 400 }
      );
    }

    // Sanitize string inputs
    const sanitizedReceipt = sanitizeString(receipt, 40);
    const sanitizedGuestName = guestName ? sanitizeString(guestName, 100) : undefined;
    const sanitizedPropertyName = propertyName ? sanitizeString(propertyName, 100) : undefined;

    // Create Razorpay order
    const result = await createRazorpayOrder({
      amount,
      currency: currency || 'INR',
      receipt: sanitizedReceipt,
      notes: {
        guestName: sanitizedGuestName || 'N/A',
        guestEmail: guestEmail || 'N/A',
        propertyName: sanitizedPropertyName || 'N/A',
      },
    });

    if (!result.success || !result.order) {
      console.error('Failed to create Razorpay order:', result.error);
      return NextResponse.json(
        { error: 'Failed to create payment order. Please try again or contact support.' },
        { status: 500 }
      );
    }

    // Return order details (safe to send to frontend)
    return NextResponse.json({
      success: true,
      orderId: result.order.id,
      amount: result.order.amount, // in paise
      currency: result.order.currency,
      receipt: result.order.receipt,
    });
  } catch (error) {
    console.error('Error in create-order API:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
