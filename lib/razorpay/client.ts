/**
 * Razorpay Client-Side Utilities
 *
 * Handles Razorpay checkout integration on the frontend
 */

// Extend Window interface to include Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

/**
 * Load Razorpay checkout script dynamically
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    // Check if already loaded
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export interface RazorpayCheckoutOptions {
  orderId: string;
  amount: number; // in paise
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description: string;
  onSuccess: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onFailure: (error: any) => void;
  onDismiss?: () => void;
}

/**
 * Open Razorpay checkout modal
 */
export async function openRazorpayCheckout(options: RazorpayCheckoutOptions): Promise<void> {
  // Load Razorpay script if not already loaded
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded) {
    options.onFailure(new Error('Failed to load Razorpay. Please try again.'));
    return;
  }

  // Get public Razorpay key
  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  if (!razorpayKeyId) {
    console.error('Razorpay key ID not configured');
    options.onFailure(new Error('Payment gateway not configured. Please contact support.'));
    return;
  }

  // Configure Razorpay options
  const razorpayOptions = {
    key: razorpayKeyId,
    amount: options.amount,
    currency: options.currency,
    name: 'Lakeora Camping & Cafe',
    description: options.description,
    image: '/logo.png', // Your logo
    order_id: options.orderId,
    prefill: {
      name: options.customerName,
      email: options.customerEmail,
      contact: options.customerPhone,
    },
    theme: {
      color: '#1a4d2e', // Your brand color (forest-deep)
    },
    handler: function (response: any) {
      // Payment successful
      options.onSuccess({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
      });
    },
    modal: {
      ondismiss: function () {
        // User closed the modal
        if (options.onDismiss) {
          options.onDismiss();
        }
      },
      escape: true,
      backdropclose: false,
    },
    retry: {
      enabled: true,
      max_count: 3,
    },
    timeout: 900, // 15 minutes
    notes: {
      description: options.description,
    },
  };

  // Create Razorpay instance and open checkout
  try {
    const razorpay = new window.Razorpay(razorpayOptions);

    razorpay.on('payment.failed', function (response: any) {
      console.error('Payment failed:', response.error);
      options.onFailure({
        code: response.error.code,
        description: response.error.description,
        reason: response.error.reason,
      });
    });

    razorpay.open();
  } catch (error) {
    console.error('Error opening Razorpay checkout:', error);
    options.onFailure(error);
  }
}

/**
 * Create Razorpay order via API
 */
export async function createRazorpayOrderAPI(params: {
  amount: number;
  currency?: string;
  receipt: string;
  guestName: string;
  guestEmail: string;
  propertyName: string;
}): Promise<{
  success: boolean;
  orderId?: string;
  amount?: number;
  currency?: string;
  error?: string;
}> {
  try {
    const response = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || 'Failed to create payment order',
      };
    }

    return {
      success: true,
      orderId: data.orderId,
      amount: data.amount,
      currency: data.currency,
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Verify Razorpay payment via API
 */
export async function verifyRazorpayPaymentAPI(params: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  bookingReferenceId: string;
}): Promise<{
  success: boolean;
  verified?: boolean;
  transactionId?: string;
  error?: string;
}> {
  try {
    const response = await fetch('/api/razorpay/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        verified: false,
        error: data.error || 'Payment verification failed',
      };
    }

    return {
      success: true,
      verified: data.verified,
      transactionId: data.transactionId,
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      success: false,
      verified: false,
      error: 'Network error. Please contact support.',
    };
  }
}
