'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Property } from '@/types';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/toast/useToast';
import {
  createRazorpayOrderAPI,
  openRazorpayCheckout,
  verifyRazorpayPaymentAPI,
} from '@/lib/razorpay/client';

export function BookingView({
  property,
  guests: initialGuests,
  checkInDate,
  checkOutDate,
}: {
  property: Property;
  guests: number;
  checkInDate?: string;
  checkOutDate?: string;
}) {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [numberOfGuests, setNumberOfGuests] = useState(initialGuests);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    paymentMethod: 'razorpay',
    dataConsent: false,
  });

  const { showToast } = useToast();

  const basePrice = property.price * numberOfGuests;
  const finalTotal = basePrice;

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      showToast({
        type: 'error',
        message: 'Please enter your full name.',
      });
      return false;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      showToast({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return false;
    }

    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) {
      showToast({
        type: 'error',
        message: 'Please enter a valid 10-digit phone number.',
      });
      return false;
    }

    if (numberOfGuests < 1) {
      showToast({
        type: 'error',
        message: 'Number of guests must be at least 1.',
      });
      return false;
    }

    if (!formData.dataConsent) {
      showToast({
        type: 'error',
        message: 'Please accept the data collection consent to proceed.',
      });
      return false;
    }

    return true;
  };



  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.fullName.trim()) {
      showToast({
        type: 'error',
        message: 'Please enter your full name.',
      });
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      showToast({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) {
      showToast({
        type: 'error',
        message: 'Please enter a valid 10-digit phone number.',
      });
      return;
    }

    if (numberOfGuests < 1) {
      showToast({
        type: 'error',
        message: 'Please enter number of guests (minimum 1).',
      });
      return;
    }

    if (!formData.dataConsent) {
      showToast({
        type: 'error',
        message: 'Please accept the data collection consent to proceed.',
      });
      return;
    }

    setIsProcessingPayment(true);
    const refId = `LS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // Step 1: Create Razorpay order
      const orderResult = await createRazorpayOrderAPI({
        amount: finalTotal,
        currency: 'INR',
        receipt: refId,
        guestName: formData.fullName,
        guestEmail: formData.email,
        propertyName: property.title,
      });

      if (!orderResult.success || !orderResult.orderId) {
        throw new Error(orderResult.error || 'Failed to create payment order');
      }

      // Step 2: Create booking with pending payment status
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referenceId: refId,
          propertyId: property.id,
          propertyName: property.title,
          propertyCategory: property.category,
          guestName: formData.fullName,
          guestEmail: formData.email,
          guestPhone: formData.phone,
          guestCity: formData.city,
          numberOfGuests: numberOfGuests,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          addons: [],
          basePrice,
          addonTotal: 0,
          discount: 0,
          couponCode: '',
          totalAmount: finalTotal,
          paymentMethod: 'razorpay',
          dataConsent: formData.dataConsent,
          consentTimestamp: new Date().toISOString(),
          paymentStatus: 'pending', // Initially pending
          razorpayOrderId: orderResult.orderId,
        }),
      });

      const bookingData = await bookingResponse.json();

      if (!bookingData.success) {
        throw new Error(bookingData.error || 'Failed to create booking');
      }

      // Step 3: Open Razorpay checkout
      await openRazorpayCheckout({
        orderId: orderResult.orderId,
        amount: orderResult.amount || finalTotal * 100,
        currency: orderResult.currency || 'INR',
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        description: `Booking for ${property.title} - ${numberOfGuests} guest${numberOfGuests > 1 ? 's' : ''}`,
        onSuccess: async (response) => {
          // Step 4: Verify payment on server
          showToast({
            type: 'success',
            message: 'Payment successful! Verifying...',
          });

          try {
            const verifyResult = await verifyRazorpayPaymentAPI({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingReferenceId: refId,
            });

            if (verifyResult.success && verifyResult.verified) {
              showToast({
                type: 'success',
                message: 'Payment verified! Redirecting to confirmation...',
              });
              router.push(`/booking/confirmed?referenceId=${refId}&propertyId=${property.id}`);
            } else {
              throw new Error(verifyResult.error || 'Payment verification failed');
            }
          } catch (verifyError) {
            console.error('Payment verification error:', verifyError);
            showToast({
              type: 'error',
              message: 'Payment verification failed. Please contact support with reference: ' + refId,
            });
            setIsProcessingPayment(false);
          }
        },
        onFailure: (error) => {
          console.error('Payment failed:', error);
          showToast({
            type: 'error',
            message: error.description || 'Payment failed. Please try again.',
          });
          setIsProcessingPayment(false);
        },
        onDismiss: () => {
          showToast({
            type: 'error',
            message: 'Payment cancelled. You can try again when ready.',
          });
          setIsProcessingPayment(false);
        },
      });
    } catch (error) {
      console.error('Booking error:', error);
      showToast({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to process booking. Please try again.',
      });
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Book Stay' }]} />

      <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
        Complete Your Reservation
      </h1>

      {/* Step Indicators */}
      <div className="flex items-center justify-between max-w-md mx-auto border-b border-mist pb-4">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step === s
                  ? 'bg-forest text-white'
                  : step > s
                  ? 'bg-emerald-600 text-white'
                  : 'bg-mist text-forest-deep/60'
              }`}
            >
              {step > s ? '✓' : s}
            </span>
            <span
              className={`text-xs font-semibold ${
                step === s ? 'text-forest' : 'text-forest-deep/60'
              }`}
            >
              {s === 1 ? 'Contact Details' : 'Payment'}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Columns: Multi-step Form */}
        <div className="lg:col-span-2 space-y-8">
          {step === 1 && (
            <div className="bg-white rounded-2xl p-6 border border-mist space-y-6">
              <h3 className="font-display text-2xl font-semibold text-forest-deep">
                Guest Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                <Input
                  label="Phone / WhatsApp Number *"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Input
                  label="Email Address *"
                  placeholder="name@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  label="City of Residence"
                  placeholder="e.g. Mumbai / Pune"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <Input
                  label="Number of Guests *"
                  placeholder="e.g. 2"
                  type="number"
                  min="1"
                  max="50"
                  value={numberOfGuests.toString()}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setNumberOfGuests(Math.min(50, Math.max(1, val)));
                  }}
                />
              </div>

              {/* DPDPA Consent */}
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-5 border border-blue-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dataConsent}
                    onChange={(e) => setFormData({ ...formData, dataConsent: e.target.checked })}
                    className="mt-1 w-5 h-5 accent-forest cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-forest-deep leading-relaxed">
                      <strong className="font-semibold">Data Collection Consent *</strong>
                      <br />
                      <span className="text-forest-deep/80">
                        I consent to Lakeora collecting and processing my personal data (name, email, phone, city)
                        for booking management, communication, and service delivery. This data will be stored securely
                        and used only for legitimate business purposes as per India's Digital Personal Data Protection Act (DPDPA), 2023.
                      </span>
                    </p>
                    <p className="text-xs text-forest-deep/60 mt-2">
                      Read our <a href="/privacy" className="text-forest underline hover:no-underline" target="_blank">Privacy Policy</a> for details.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => {
                    if (validateStep1()) {
                      setStep(2);
                    }
                  }}
                  variant="primary"
                  size="md"
                >
                  Proceed to Payment →
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitBooking} className="bg-white rounded-2xl p-6 border border-mist space-y-6">
              <h3 className="font-display text-2xl font-semibold text-forest-deep">
                Complete Payment
              </h3>

              <div className="bg-gradient-to-br from-forest/5 to-sage/5 rounded-xl p-6 border border-forest/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-forest text-white flex items-center justify-center">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest-deep">Secure Payment via Razorpay</h4>
                    <p className="text-xs text-forest-deep/70">Pay using UPI, Card, Net Banking & more</p>
                  </div>
                </div>
                <p className="text-sm text-forest-deep/80 leading-relaxed">
                  You'll be redirected to Razorpay's secure payment gateway to complete your transaction. We accept all major payment methods.
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  onClick={() => setStep(1)}
                  type="button"
                  variant="ghost"
                  size="md"
                  disabled={isProcessingPayment}
                >
                  ← Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Proceed to Payment ₹${finalTotal.toLocaleString()}`
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-mist shadow-md space-y-6">
            <h3 className="font-display text-xl font-semibold text-forest-deep border-b border-mist pb-4">
              Booking Summary
            </h3>

            <div className="flex gap-3">
              <img
                src={property.coverImage}
                alt={property.title}
                className="w-20 h-20 rounded-xl object-cover border border-mist"
              />
              <div>
                <h4 className="font-semibold text-forest-deep text-sm line-clamp-1">
                  {property.title}
                </h4>
                <p className="text-xs text-forest-deep/60 mt-0.5">{property.location}</p>
                <span className="text-xs font-semibold text-forest mt-1 block">
                  ₹{property.price.toLocaleString()} / person
                </span>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-forest-deep/80 pt-4 border-t border-mist">
              <div className="flex justify-between">
                <span>
                  {numberOfGuests} {numberOfGuests === 1 ? 'guest' : 'guests'} × ₹{property.price.toLocaleString()}
                </span>
                <span>₹{basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-forest pt-2 border-t border-mist">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold text-lg mt-3 pt-3 border-t-2 border-emerald-200">
                <span>✓ Pay Full Amount</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
