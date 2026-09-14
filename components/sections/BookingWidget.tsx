'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';

export interface BookingWidgetProps {
  initialPropertyId?: string;
  className?: string;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ className = '' }) => {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/properties?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-white rounded-2xl p-4 md:p-6 shadow-2xl border border-cream-dark text-left relative z-30 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <DatePicker
            label="Check-in"
            placeholder="Select Check-in"
            value={checkIn}
            onChange={setCheckIn}
          />
        </div>
        <div>
          <DatePicker
            label="Check-out"
            placeholder="Select Check-out"
            value={checkOut}
            minDate={checkIn}
            onChange={setCheckOut}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-terracotta-deep uppercase tracking-wider mb-1.5">
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full text-sm font-medium text-gray-800 bg-cream/40 border border-cream-dark rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-terracotta shadow-sm"
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests (Couple)</option>
            <option value="4">4 Guests (Group)</option>
            <option value="6">6+ Guests (Family)</option>
          </select>
        </div>
        <div>
          <Button type="submit" variant="primary" size="lg" className="w-full">
            Search Stays
          </Button>
        </div>
      </div>
    </form>
  );
};
