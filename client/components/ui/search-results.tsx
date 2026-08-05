"use client";

import { useEffect, useState } from "react";
import { searchListings, Listing } from "@/lib/api";

interface SearchResultsProps {
  params: {
    location?: string;
    check_in?: string;
    check_out?: string;
    guests?: string;
    align_sgr?: string;
  };
}

export default function SearchResults({ params }: SearchResultsProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        setLoading(true);
        const data = await searchListings({
          location: params.location,
          check_in: params.check_in,
          check_out: params.check_out,
          guests: params.guests ? parseInt(params.guests) : 1,
          align_sgr: params.align_sgr === "true",
        });
        setListings(data);
      } catch (err) {
        setError("Failed to fetch search results from FastAPI engine.");
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [params.location, params.check_in, params.check_out, params.guests, params.align_sgr]);

  if (loading) return <SearchResultsFallback />;

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl">
        {error}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
        <h3 className="text-lg font-bold text-gray-700">No properties matched your search criteria</h3>
        <p className="text-sm text-gray-500 mt-1">Try broadening your location keyword or clearing filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {listings.map((stay) => (
        <div key={stay.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
          <img src={stay.image_url} alt={stay.title} className="w-full h-48 object-cover" />
          <div className="p-5">
            <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {stay.location}
            </span>
            <h2 className="font-bold text-lg text-gray-900 mt-2 line-clamp-1">{stay.title}</h2>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{stay.description}</p>
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <div>
                <span className="text-xl font-black text-gray-900">KSh {stay.price_per_night.toLocaleString()}</span>
                <span className="text-xs text-gray-400"> / night</span>
              </div>
              {stay.is_mpesa_safe && (
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">
                  M-PESA SAFE
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SearchResultsFallback() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse border rounded-2xl p-4 space-y-4">
          <div className="bg-gray-200 h-48 rounded-xl"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}