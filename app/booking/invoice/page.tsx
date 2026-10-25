import { notFound } from 'next/navigation';
import { getBookings } from '@/lib/sanity/data';

export default async function InvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  if (!ref) {
    notFound();
  }

  // Fetch booking from Sanity
  const bookings = await getBookings();
  const booking = bookings.find((b) => b.referenceId === ref);

  if (!booking) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-12 border-b border-gray-200 pb-8">
            <div>
              <h1 className="text-4xl font-bold text-forest-deep mb-2">LAKEORA</h1>
              <p className="text-sm text-gray-600">Lakeside Camping & Cafe</p>
              <p className="text-sm text-gray-600">Pawna Lake, Maharashtra</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">INVOICE</h2>
              <p className="text-sm text-gray-600">
                Date: {new Date(booking.bookingDate || '').toLocaleDateString('en-IN')}
              </p>
              <p className="text-sm font-mono font-bold text-forest mt-1">
                {booking.referenceId}
              </p>
            </div>
          </div>

          {/* Guest Information */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
              Billed To
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold text-gray-900 text-lg mb-2">{booking.guestName}</p>
              <p className="text-gray-600">{booking.guestEmail}</p>
              <p className="text-gray-600">{booking.guestPhone}</p>
              {booking.guestCity && <p className="text-gray-600">{booking.guestCity}</p>}
            </div>
          </div>

          {/* Booking Details */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
              Booking Details
            </h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-600">Property</td>
                  <td className="py-3 text-right font-semibold text-gray-900">
                    {booking.propertyName}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-600">Category</td>
                  <td className="py-3 text-right font-semibold text-gray-900">
                    {booking.propertyCategory}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-600">Number of Guests</td>
                  <td className="py-3 text-right font-semibold text-gray-900">
                    {booking.numberOfGuests}
                  </td>
                </tr>
                {booking.checkInDate && (
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-600">Check-in</td>
                    <td className="py-3 text-right font-semibold text-gray-900">
                      {booking.checkInDate} at 4:00 PM
                    </td>
                  </tr>
                )}
                {booking.checkOutDate && (
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-600">Check-out</td>
                    <td className="py-3 text-right font-semibold text-gray-900">
                      {booking.checkOutDate} at 11:00 AM
                    </td>
                  </tr>
                )}
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-600">Payment Method</td>
                  <td className="py-3 text-right font-semibold text-gray-900">
                    {booking.paymentMethod.toUpperCase()}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-600">Payment Status</td>
                  <td className="py-3 text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {booking.paymentStatus?.toUpperCase() || 'CONFIRMED'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add-ons */}
          {booking.addons && booking.addons.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
                Add-ons & Services
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                {booking.addons.map((addon, index) => (
                  <p key={index} className="text-gray-700 mb-2">
                    • {addon}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
              Payment Summary
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-3 text-gray-700">
                      Base Price ({booking.numberOfGuests} guests)
                    </td>
                    <td className="py-3 text-right font-semibold text-gray-900">
                      ₹{booking.basePrice?.toLocaleString() || '0'}
                    </td>
                  </tr>
                  {booking.addonTotal && booking.addonTotal > 0 && (
                    <tr className="border-b border-gray-300">
                      <td className="py-3 text-gray-700">Add-ons</td>
                      <td className="py-3 text-right font-semibold text-gray-900">
                        ₹{booking.addonTotal.toLocaleString()}
                      </td>
                    </tr>
                  )}
                  {booking.discount && booking.discount > 0 && (
                    <tr className="border-b border-gray-300">
                      <td className="py-3 text-gray-700">
                        Discount {booking.couponCode && `(${booking.couponCode})`}
                      </td>
                      <td className="py-3 text-right font-semibold text-green-600">
                        -₹{booking.discount.toLocaleString()}
                      </td>
                    </tr>
                  )}
                  <tr className="border-t-2 border-gray-900">
                    <td className="py-4 text-gray-900 font-bold text-lg">TOTAL AMOUNT</td>
                    <td className="py-4 text-right font-bold text-2xl text-forest">
                      ₹{booking.totalAmount?.toLocaleString() || '0'}
                    </td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="py-4 text-green-800 font-bold">AMOUNT PAID</td>
                    <td className="py-4 text-right font-bold text-xl text-green-600">
                      ₹{booking.totalAmount?.toLocaleString() || '0'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Contact Information</h4>
                <p className="text-sm text-gray-600 mb-1">Phone: +91 74997 57607</p>
                <p className="text-sm text-gray-600 mb-1">Email: booking@lakeora.com</p>
                <p className="text-sm text-gray-600">Website: lakeorastay.com</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Terms & Conditions</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Please carry a valid ID proof. Check-in time is 4:00 PM and check-out time is
                  11:00 AM. Cancellation policy applies as per booking terms. For any queries,
                  please contact us.
                </p>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="mt-12 text-center print-hidden">
            <button
              onClick={() => typeof window !== 'undefined' && window.print()}
              className="bg-forest text-white px-8 py-3 rounded-lg font-semibold hover:bg-forest-dark transition"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
