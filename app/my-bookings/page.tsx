'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MOCK_BOOKINGS } from '@/lib/mock-data/bookings';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/components/modal/useModal';
import { useToast } from '@/components/toast/useToast';

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<'Confirmed' | 'Completed' | 'Cancelled'>('Confirmed');
  const [bookingsList, setBookingsList] = useState(MOCK_BOOKINGS);

  const { openModal, closeModal } = useModal();
  const { showToast } = useToast();

  const filteredBookings = bookingsList.filter((b) => b.status === activeTab);

  const handleCancelBooking = (bookingId: string, referenceId: string) => {
    openModal(
      <div className="space-y-4 text-center p-2">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center font-bold text-xl">
          ⚠️
        </div>
        <h4 className="font-display text-xl font-semibold text-forest-deep">
          Cancel Reservation {referenceId}?
        </h4>
        <p className="text-xs text-forest-deep/70 leading-relaxed">
          Are you sure you want to cancel? Cancellations made 48 hours prior to check-in receive a 100% refund voucher.
        </p>
        <div className="flex gap-3 pt-2">
          <Button onClick={closeModal} variant="outline" size="sm" className="flex-1">
            Keep Booking
          </Button>
          <Button
            onClick={() => {
              setBookingsList((prev) =>
                prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
              );
              closeModal();
              showToast({
                type: 'info',
                message: `Booking ${referenceId} has been cancelled. Refund initiated.`,
              });
            }}
            variant="danger"
            size="sm"
            className="flex-1"
          >
            Confirm Cancellation
          </Button>
        </div>
      </div>,
      { title: 'Cancel Booking', size: 'sm' }
    );
  };

  const handleDownloadInvoice = (refId: string) => {
    showToast({
      type: 'success',
      message: `Invoice for ${refId} downloaded successfully!`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'My Bookings' }]} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-mist pb-6">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
            My Campsite Bookings
          </h1>
          <p className="text-sm text-forest-deep/70 mt-1">
            Manage your upcoming weekend getaways and past receipts
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex border border-mist rounded-xl overflow-hidden bg-white p-1">
          {(['Confirmed', 'Completed', 'Cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === tab
                  ? 'bg-forest text-white shadow-sm'
                  : 'text-forest-deep hover:bg-mist/40'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-mist p-12 text-center space-y-4">
          <p className="text-base font-semibold text-forest-deep">No {activeTab.toLowerCase()} bookings found.</p>
          <p className="text-xs text-forest-deep/60">
            Looking for a weekend stay? Explore our curated Pawna Lake glamping options.
          </p>
          <Link href="/properties">
            <Button variant="primary" size="sm">
              Browse Campsites
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBookings.map((bk) => (
            <div
              key={bk.id}
              className="bg-white rounded-2xl border border-mist p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-5">
                <img
                  src={bk.propertyImage}
                  alt={bk.propertyName}
                  className="w-24 h-24 rounded-xl object-cover border border-mist flex-shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        bk.status === 'Confirmed'
                          ? 'success'
                          : bk.status === 'Completed'
                          ? 'forest'
                          : 'outline'
                      }
                      size="sm"
                    >
                      {bk.status}
                    </Badge>
                    <span className="text-xs font-mono text-forest-deep/60">{bk.referenceId}</span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-forest-deep">
                    {bk.propertyName}
                  </h3>

                  <p className="text-xs text-forest-deep/70">
                    📍 {bk.location} · {bk.guests.adults} Adults
                  </p>

                  <p className="text-xs text-forest-deep/60">
                    Check-in: <span className="font-semibold text-forest-deep">{bk.checkIn}</span> | Total: <span className="font-bold text-forest">₹{bk.totalAmount}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end border-t md:border-0 border-mist pt-4 md:pt-0">
                <Button
                  onClick={() => handleDownloadInvoice(bk.referenceId)}
                  variant="outline"
                  size="sm"
                >
                  Invoice PDF
                </Button>

                {bk.status === 'Confirmed' && (
                  <Button
                    onClick={() => handleCancelBooking(bk.id, bk.referenceId)}
                    variant="danger"
                    size="sm"
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
