'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Property } from '@/types';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/toast/useToast';

export function BookingView({
  property,
  guests: initialGuests,
}: {
  property: Property;
  guests: number;
}) {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [numberOfGuests, setNumberOfGuests] = useState(initialGuests);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    paymentMethod: 'razorpay',
  });

  const { showToast } = useToast();

  const basePrice = property.price * numberOfGuests;
  const totalBeforeDiscount = basePrice;
  const finalTotal = Math.max(0, totalBeforeDiscount - discount);

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

    return true;
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'LAKEORA10') {
      setDiscount(Math.round(totalBeforeDiscount * 0.1));
      showToast({
        type: 'success',
        message: 'Coupon LAKEORA10 applied! You saved 10%.',
      });
    } else {
      showToast({
        type: 'error',
        message: 'Invalid coupon code. Try "LAKEORA10".',
      });
    }
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

    const refId = `LS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      showToast({
        type: 'success',
        message: 'Processing your booking...',
      });

      // Save booking to Sanity
      const response = await fetch('/api/bookings', {
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
          addons: [],
          basePrice,
          addonTotal: 0,
          discount,
          couponCode: coupon,
          totalAmount: finalTotal,
          paymentMethod: formData.paymentMethod,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showToast({
          type: 'success',
          message: 'Booking confirmed! Redirecting to confirmation page...',
        });
        router.push(`/booking/confirmed?referenceId=${refId}&propertyId=${property.id}`);
      } else {
        throw new Error(data.error || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      showToast({
        type: 'error',
        message: 'Failed to create booking. Please try again or contact support.',
      });
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
                <Button onClick={() => setStep(1)} type="button" variant="ghost" size="md">
                  ← Back
                </Button>
                <Button type="submit" variant="primary" size="lg">
                  Proceed to Payment ₹{finalTotal.toLocaleString()}
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

            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code (LAKEORA10)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="bg-paper/40 border border-mist rounded-xl px-3 py-2 text-xs uppercase flex-1 focus:outline-none focus:ring-1 focus:ring-forest"
              />
              <Button type="submit" variant="outline" size="sm">
                Apply
              </Button>
            </form>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-forest-deep/80 pt-4 border-t border-mist">
              <div className="flex justify-between">
                <span>
                  {numberOfGuests} {numberOfGuests === 1 ? 'guest' : 'guests'} × ₹{property.price.toLocaleString()}
                </span>
                <span>₹{basePrice.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount (LAKEORA10)</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
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
