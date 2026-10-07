'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Property } from '@/types';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/toast/useToast';

export function BookingView({ property }: { property: Property }) {
  const router = useRouter();
  const propertyId = property.id;

  const [step, setStep] = useState(1);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['Kayaking']);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    paymentMethod: 'upi',
  });

  const { showToast } = useToast();

  const basePrice = property.price * 2; // 2 nights default assumption
  const addonTotal = selectedAddons.length * 499;
  const totalBeforeDiscount = basePrice + addonTotal;
  const finalTotal = Math.max(0, totalBeforeDiscount - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'PAWNA10') {
      setDiscount(Math.round(totalBeforeDiscount * 0.1));
      showToast({
        type: 'success',
        message: 'Coupon PAWNA10 applied! You saved 10%.',
      });
    } else {
      showToast({
        type: 'error',
        message: 'Invalid coupon code. Try "PAWNA10".',
      });
    }
  };

  const handleAddonToggle = (addonName: string) => {
    if (selectedAddons.includes(addonName)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addonName));
    } else {
      setSelectedAddons([...selectedAddons, addonName]);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      showToast({
        type: 'error',
        message: 'Please complete all required contact fields.',
      });
      return;
    }

    const refId = `LS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    showToast({
      type: 'success',
      message: 'Payment processed! Confirming your campsite booking...',
    });
    router.push(`/booking/confirmed?referenceId=${refId}&propertyId=${property.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Book Stay' }]} />

      <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
        Complete Your Reservation
      </h1>

      {/* Step Indicators */}
      <div className="flex items-center justify-between max-w-xl mx-auto border-b border-mist pb-4">
        {[1, 2, 3].map((s) => (
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
              {s === 1 ? 'Add-ons' : s === 2 ? 'Contact Details' : 'Payment'}
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
                Enhance Your Trip with Add-ons
              </h3>

              <div className="space-y-3">
                {[
                  { name: 'Sunset Kayaking', price: 499, desc: '90 minutes single/double boat rental' },
                  { name: 'Marinated BBQ Grill Kit', price: 599, desc: 'Charcoal grill with veg/non-veg skewers' },
                  { name: 'Tikona Fort Guided Trek', price: 399, desc: 'Early morning climb with certified guide' },
                ].map((addon) => (
                  <label
                    key={addon.name}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                      selectedAddons.includes(addon.name)
                        ? 'border-forest bg-forest/5'
                        : 'border-mist bg-white hover:bg-mist/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon.name)}
                        onChange={() => handleAddonToggle(addon.name)}
                        className="accent-forest w-5 h-5"
                      />
                      <div>
                        <p className="font-semibold text-forest-deep text-sm">{addon.name}</p>
                        <p className="text-xs text-forest-deep/60">{addon.desc}</p>
                      </div>
                    </div>
                    <span className="font-bold text-forest text-sm">+₹{addon.price}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} variant="primary" size="md">
                  Continue to Contact Info →
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
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
              </div>

              <div className="flex justify-between pt-4">
                <Button onClick={() => setStep(1)} variant="ghost" size="md">
                  ← Back to Add-ons
                </Button>
                <Button onClick={() => setStep(3)} variant="primary" size="md">
                  Proceed to Payment →
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmitBooking} className="bg-white rounded-2xl p-6 border border-mist space-y-6">
              <h3 className="font-display text-2xl font-semibold text-forest-deep">
                Select Payment Method
              </h3>

              <div className="space-y-3">
                {[
                  { id: 'upi', label: 'Google Pay / PhonePe / Paytm UPI', icon: '📱' },
                  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                  { id: 'netbanking', label: 'Net Banking (All Indian Banks)', icon: '🏛️' },
                ].map((pm) => (
                  <label
                    key={pm.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                      formData.paymentMethod === pm.id
                        ? 'border-forest bg-forest/5'
                        : 'border-mist bg-white hover:bg-mist/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === pm.id}
                      onChange={() => setFormData({ ...formData, paymentMethod: pm.id })}
                      className="accent-forest w-5 h-5"
                    />
                    <span className="text-xl">{pm.icon}</span>
                    <span className="font-semibold text-forest-deep text-sm">{pm.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button onClick={() => setStep(2)} type="button" variant="ghost" size="md">
                  ← Back
                </Button>
                <Button type="submit" variant="primary" size="lg">
                  Pay ₹{finalTotal.toLocaleString()} &amp; Confirm Booking
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
                  ₹{property.price} / night
                </span>
              </div>
            </div>

            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code (PAWNA10)"
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
                <span>Accommodation (2 nights)</span>
                <span>₹{basePrice.toLocaleString()}</span>
              </div>
              {selectedAddons.length > 0 && (
                <div className="flex justify-between">
                  <span>Add-ons ({selectedAddons.length})</span>
                  <span>+₹{addonTotal.toLocaleString()}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount (PAWNA10)</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-forest pt-2 border-t border-mist">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
