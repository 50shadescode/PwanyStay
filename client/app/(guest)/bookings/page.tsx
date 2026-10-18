"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useAuth } from "@/context/AuthContext";
import { getUserBookings, type BookingResponse } from "@/lib/api";

type ReservationsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; bookings: BookingResponse[] };

const statusClasses: Record<BookingResponse["status"], string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-slate-100 text-slate-600",
};

const dateFormatter = new Intl.DateTimeFormat("en-KE", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const priceFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  currencyDisplay: "code",
});

function ReservationsList({ token }: { token: string }) {
  const [state, setState] = useState<ReservationsState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    getUserBookings(token).then(
      (bookings) => {
        if (active) setState({ status: "success", bookings });
      },
      (error: unknown) => {
        if (!active) return;
        setState({
          status: "error",
          message: error instanceof Error && !(error instanceof TypeError) && !(error instanceof SyntaxError)
            ? error.message
            : "Unable to load your reservations. Please check your connection and try again.",
        });
      },
    );
    return () => { active = false; };
  }, [token, attempt]);

  if (state.status === "loading") {
    return <p role="status" className="py-12 text-center text-slate-500">Loading your reservations…</p>;
  }

  if (state.status === "error") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p role="alert" className="text-red-800">{state.message}</p>
        <button
          type="button"
          onClick={() => { setState({ status: "loading" }); setAttempt((value) => value + 1); }}
          className="mt-4 rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-100"
        >
          Try again
        </button>
      </div>
    );
  }

  if (state.bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900">No reservations yet</h2>
        <p className="mt-2 text-slate-500">Your coastal stays will appear here once you reserve a property.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">Explore stays</Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {state.bookings.map((booking) => (
        <li key={booking.id}>
          <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900">Booking #{booking.id}</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClasses[booking.status]}`}>{booking.status}</span>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-5 text-sm">
              <div>
                <dt className="text-slate-500">Check-in</dt>
                <dd className="mt-1 font-semibold text-slate-900"><time dateTime={booking.check_in}>{dateFormatter.format(new Date(booking.check_in))}</time></dd>
              </div>
              <div>
                <dt className="text-slate-500">Check-out</dt>
                <dd className="mt-1 font-semibold text-slate-900"><time dateTime={booking.check_out}>{dateFormatter.format(new Date(booking.check_out))}</time></dd>
              </div>
              <div>
                <dt className="text-slate-500">Guests</dt>
                <dd className="mt-1 font-semibold text-slate-900">{booking.total_guests}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Total price</dt>
                <dd className="mt-1 font-bold text-slate-900">{priceFormatter.format(booking.total_price)}</dd>
              </div>
            </dl>
            <Link href={`/property/${booking.listing_id}`} className="mt-6 inline-block text-sm font-bold text-blue-600 underline-offset-4 hover:underline">View property</Link>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function BookingsPage() {
  const { user, token, isLoading } = useAuth();

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My reservations</h1>
          <p className="mt-2 text-slate-500">Your upcoming and past coastal stays.</p>
        </header>
        {isLoading ? (
          <p role="status" className="py-12 text-center text-slate-500">Checking your session…</p>
        ) : !user || !token ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h2 className="text-xl font-bold text-slate-900">Log in to view your reservations</h2>
            <p className="mt-2 text-slate-600">Use the Log In button in the navbar to access your bookings.</p>
          </div>
        ) : (
          // A new session starts a fresh list and cannot display the previous user's bookings.
          <ReservationsList key={token} token={token} />
        )}
      </main>
    </>
  );
}
