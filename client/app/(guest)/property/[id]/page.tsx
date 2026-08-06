import { Listing } from '@/lib/api';
import BookingCard from './booking-card';

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

async function getListing(id: string): Promise<Listing | null> {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

  try {
    const res = await fetch(`${API_BASE}/listings/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const listing = await getListing(id);

  if (!listing) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Property #{id} Not Found</h1>
        <p className="text-gray-500 mt-2">The requested stay could not be retrieved from the backend.</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Title Header */}
      <div className="mb-6">
        <span className="text-xs font-bold uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          Stay #{listing.id}
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-2">{listing.title}</h1>
        <p className="text-gray-500 mt-1">{listing.location}</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Gallery & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
            <img
              src={listing.image_url || '/placeholder.jpg'}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">About this stay</h2>
            <p className="text-gray-600 leading-relaxed">{listing.description}</p>
          </div>
        </div>

        {/* Right Column: Reservation Sidebar */}
        <div className="lg:col-span-1">
          <BookingCard listingId={listing.id} pricePerNight={listing.price_per_night} />
        </div>
      </div>
    </main>
  );
}