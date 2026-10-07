'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/toast/useToast';
import type { SiteSettings } from '@/lib/sanity/data';
import { submitContact } from './actions';

export function ContactView({ settings }: { settings: SiteSettings }) {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    website: '',
  });

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setSending(true);
    const result = await submitContact(formData);
    setSending(false);

    if (!result.ok) {
      showToast({ type: 'error', message: result.error });
      return;
    }

    showToast({
      type: 'success',
      message: 'Thank you! Your message has been sent. We will contact you shortly.',
    });
    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '', website: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
          Get in Touch
        </h1>
        <p className="text-sm text-forest-deep/75 leading-relaxed">
          Planning a group camping trip or have a special event request? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-mist shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center font-bold">
              📞
            </div>
            <h3 className="font-display text-lg font-semibold text-forest-deep">Phone &amp; WhatsApp</h3>
            <p className="text-xs text-forest-deep/70">{settings.contactNumbers.join(' / ')}</p>
            <p className="text-[11px] text-forest-deep/50">Mon – Sun: 9:00 AM – 9:00 PM</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-mist shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sage/30 text-forest flex items-center justify-center font-bold">
              📍
            </div>
            <h3 className="font-display text-lg font-semibold text-forest-deep">Location</h3>
            <p className="text-xs text-forest-deep/70">{settings.address}</p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-mist shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-forest-deep mb-6">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Your Name *"
                placeholder="Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="Email Address *"
                placeholder="rahul@example.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-forest-deep">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-white border border-mist rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-forest"
                >
                  <option>General Inquiry</option>
                  <option>Group Booking Request</option>
                  <option>Corporate Event</option>
                  <option>Cancellation / Reschedule</option>
                </select>
              </div>
            </div>

            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-forest-deep">
                Your Message *
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your trip dates or requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white border border-mist rounded-xl p-4 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" isLoading={sending}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
