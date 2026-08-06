'use client';

import { useState } from 'react';
import { createBooking } from '@/lib/api';

interface BookingCardProps {
  listingId: number;
  pricePerNight: number;
}

export default function BookingCard({ listingId, pricePerNight }: BookingCardProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * pricePerNight;

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!checkIn || !checkOut || nights <= 0) {
      setError('Check-out date must be after check-in date.');
      return;
    }

    setSubmitting(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

      if (!token) {
        throw new Error('Please log in to make a reservation.');
      }

      const booking = await createBooking(
        {
          listing_id: listingId,
          check_in: checkIn,
          check_out: checkOut,
          total_guests: guests,
        },
        token
      );

      setSuccessMsg(`Reservation created! Booking ref: #${booking.id} (${booking.status})`);
    } catch (err: any) {
      setError(err.message || 'Failed to complete reservation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24 space-y-6 bg-white">
      <div className="flex justify-between items-baseline">
        <span className="text-2xl font-extrabold text-gray-900">
          KES {pricePerNight.toLocaleString()}
        </span>
        <span className="text-gray-500 text-sm">/ night</span>
      </div>

      {error && <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>}
      {successMsg && <div className="p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium">{successMsg}</div>}

      <form onSubmit={handleReserve} className="space-y-4">
        <div className="grid grid-cols-2 gap-2 border border-gray-200 rounded-xl p-3 bg-gray-50">
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="w-full text-xs outline-none bg-transparent text-gray-800"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full text-xs outline-none bg-transparent text-gray-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none bg-gray-50 text-gray-800"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>

        {nights > 0 && (
          <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>KES {pricePerNight.toLocaleString()} × {nights} nights</span>
              <span>KES {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-extrabold text-gray-900 text-base pt-2 border-t border-gray-100">
              <span>Total</span>
              <span>KES {totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition disabled:opacity-50"
        >
          {submitting ? 'Processing...' : 'Reserve Property'}
        </button>
      </form>
    </div>
  );
}