import Razorpay from 'razorpay';
import crypto from 'crypto';

/**
 * Razorpay Server-Side Utilities
 *
 * IMPORTANT: These functions should ONLY be used on the server-side.
 * Never expose Razorpay Key Secret to the client.
 */

// Lazy initialization - only create when needed
let razorpayInstance: Razorpay | null = null;

/**
 * Get Razorpay instance (singleton pattern)
 */
export function getRazorpayInstance(): Razorpay {
  if (!razorpayInstance) {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      throw new Error(
        'Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.'
      );
    }

    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  return razorpayInstance;
}

/**
 * Create a Razorpay order
 */
export async function createRazorpayOrder(params: {
  amount: number; // Amount in INR (will be converted to paise)
  currency?: string;
  receipt: string; // Unique receipt ID (e.g., booking reference)
  notes?: Record<string, string>;
}) {
  try {
    const razorpay = getRazorpayInstance();

    // Razorpay expects amount in smallest currency unit (paise for INR)
    const amountInPaise = Math.round(params.amount * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: params.currency || 'INR',
      receipt: params.receipt,
      notes: params.notes || {},
    });

    return {
      success: true,
      order,
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create Razorpay order',
    };
  }
}

/**
 * Verify Razorpay payment signature
 *
 * This is critical for security - always verify the payment signature
 * before marking a payment as successful.
 */
export function verifyRazorpaySignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): { isValid: boolean; error?: string } {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return {
        isValid: false,
        error: 'Razorpay key secret not configured',
      };
    }

    // Create expected signature
    const text = `${params.orderId}|${params.paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(text)
      .digest('hex');

    // Compare signatures
    const isValid = expectedSignature === params.signature;

    return {
      isValid,
      error: isValid ? undefined : 'Invalid payment signature',
    };
  } catch (error) {
    console.error('Error verifying Razorpay signature:', error);
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Signature verification failed',
    };
  }
}

/**
 * Fetch payment details from Razorpay
 */
export async function fetchPaymentDetails(paymentId: string) {
  try {
    const razorpay = getRazorpayInstance();
    const payment = await razorpay.payments.fetch(paymentId);

    return {
      success: true,
      payment,
    };
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch payment details',
    };
  }
}

/**
 * Create a refund
 */
export async function createRefund(params: {
  paymentId: string;
  amount?: number; // Optional - if not provided, full amount will be refunded
  notes?: Record<string, string>;
}) {
  try {
    const razorpay = getRazorpayInstance();

    const refundData: any = {
      payment_id: params.paymentId,
      notes: params.notes || {},
    };

    // If amount is provided, convert to paise
    if (params.amount) {
      refundData.amount = Math.round(params.amount * 100);
    }

    const refund = await razorpay.payments.refund(params.paymentId, refundData);

    return {
      success: true,
      refund,
    };
  } catch (error) {
    console.error('Error creating refund:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create refund',
    };
  }
}
