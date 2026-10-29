'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/toast/useToast';

export default function DataDeletionPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bookingReference: '',
    reason: '',
    dataConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.reason) {
      showToast({
        type: 'error',
        message: 'Please fill in all required fields.',
      });
      return;
    }

    if (!formData.dataConsent) {
      showToast({
        type: 'error',
        message: 'Please confirm that you understand the data deletion implications.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email to admin (you would implement this API route)
      const response = await fetch('/api/data-deletion-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit request');

      showToast({
        type: 'success',
        message: 'Data deletion request submitted successfully. We will process it within 30 days.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        bookingReference: '',
        reason: '',
        dataConsent: false,
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Failed to submit request. Please try again or email us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Data Deletion Request' }]} />

      <div className="text-center space-y-3 mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
          Data Deletion Request
        </h1>
        <p className="text-forest-deep/70 max-w-2xl mx-auto">
          As per India's Digital Personal Data Protection Act (DPDP), 2023, you have the right to request deletion of your personal data.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Info Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-mist">
            <h3 className="font-display text-lg font-semibold text-forest-deep mb-4">
              What Gets Deleted
            </h3>
            <ul className="space-y-2 text-sm text-forest-deep/80">
              <li className="flex items-start gap-2">
                <span className="text-forest">✓</span>
                <span>Personal information (name, email, phone)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-forest">✓</span>
                <span>Booking history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-forest">✓</span>
                <span>Communication records</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-forest">✓</span>
                <span>Preferences and settings</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
            <h3 className="font-display text-lg font-semibold text-forest-deep mb-4">
              Important Notes
            </h3>
            <ul className="space-y-3 text-sm text-forest-deep/80">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">⚠️</span>
                <span>
                  <strong>Financial records</strong> will be retained for 2 years as required by tax laws
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">⚠️</span>
                <span>
                  <strong>Active bookings</strong> cannot be deleted - please cancel first
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">⚠️</span>
                <span>
                  <strong>This action is permanent</strong> and cannot be undone
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">ℹ️</span>
                <span>
                  We will process your request within <strong>30 days</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-8 border border-mist">
            <h2 className="font-display text-2xl font-semibold text-forest-deep mb-6">
              Submit Data Deletion Request
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full Name *"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                label="Email Address *"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <Input
                label="Booking Reference (if any)"
                placeholder="LKO-XXXX-XXXX"
                value={formData.bookingReference}
                onChange={(e) => setFormData({ ...formData, bookingReference: e.target.value })}
              />

              <div>
                <label className="block text-sm font-medium text-forest-deep mb-2">
                  Reason for Deletion *
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-mist rounded-xl focus:outline-none focus:ring-2 focus:ring-forest/20 text-sm"
                  rows={4}
                  placeholder="Please tell us why you want your data deleted (optional but helpful)"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                />
              </div>

              {/* Confirmation Checkbox */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-forest focus:ring-forest border-gray-300 rounded"
                    checked={formData.dataConsent}
                    onChange={(e) =>
                      setFormData({ ...formData, dataConsent: e.target.checked })
                    }
                    required
                  />
                  <span className="text-xs text-forest-deep/80 leading-relaxed">
                    I understand that:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>This action is permanent and cannot be undone</li>
                      <li>I will not be able to access my booking history</li>
                      <li>I will need to create a new account for future bookings</li>
                      <li>Financial records will be retained as per legal requirements</li>
                      <li>Lakeora will process this request within 30 days</li>
                    </ul>
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Submitting Request...' : 'Submit Data Deletion Request'}
              </Button>

              <p className="text-xs text-center text-forest-deep/60">
                You will receive a confirmation email once we process your request.
                For urgent concerns, contact us at{' '}
                <a href="mailto:privacy@lakeorastay.com" className="text-forest hover:underline">
                  privacy@lakeorastay.com
                </a>
              </p>
            </form>
          </div>

          {/* Alternative Contact */}
          <div className="mt-6 bg-forest/5 rounded-xl p-6">
            <h3 className="font-semibold text-forest-deep mb-2">
              Prefer to Email?
            </h3>
            <p className="text-sm text-forest-deep/70 mb-3">
              You can also send your data deletion request directly to:
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:privacy@lakeorastay.com"
                className="text-forest hover:underline font-semibold"
              >
                📧 privacy@lakeorastay.com
              </a>
              <p className="text-xs text-forest-deep/60">
                Please include your name, email, and booking reference in your email.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Notice */}
      <div className="bg-white rounded-2xl p-6 border border-mist text-xs text-forest-deep/60">
        <p className="mb-2">
          <strong>Legal Notice:</strong> This data deletion process is in compliance with:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Digital Personal Data Protection Act (DPDP), 2023 (India)</li>
          <li>Information Technology Act, 2000</li>
          <li>Information Technology (Reasonable Security Practices) Rules, 2011</li>
        </ul>
        <p className="mt-4">
          For more information, please refer to our{' '}
          <a href="/privacy" className="text-forest hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
