"use client";

import { useState } from "react";
import Navbar from "./navbar";
import SearchBar, { SearchFilters } from "./search-bar";
import CategoryPills from "./category-pills";
// Import via named structure to align with property-card.tsx perfectly
import { PropertyCard, type Property } from "./property-card";
import BookingTicker from "./booking-ticker";
import FloatingWhatsApp from "./floating-whatsapp";
import FeaturedSections from "./featured-sections";

const PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Executive 1-Bedroom Penthouse with Ocean View",
    location: "Nyali",
    area: "Nyali",
    distance: "5 mins from City Mall",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    price: 4500,
    rating: 4.9,
    reviews: 42,
    category: "beachfront",
  },
  {
    id: "2",
    title: "Cozy Beachfront Cottage with Direct Beach Access",
    location: "Bamburi",
    area: "Bamburi",
    distance: "North Beach",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    price: 3200,
    rating: 4.8,
    reviews: 28,
    category: "beachfront",
  },
  {
    id: "3",
    title: "Affordable AC Studio Near Restaurants",
    location: "Shanzu",
    area: "Shanzu",
    distance: "15 mins from Town",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    price: 2800,
    rating: 4.6,
    reviews: 19,
    category: "budget",
  },
  {
    id: "4",
    title: "Elegant 2-Bedroom Villa with Infinity Pool",
    location: "Mtwapa",
    area: "Mtwapa",
    distance: "20 mins North",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    price: 6500,
    rating: 4.95,
    reviews: 35,
    category: "pool",
  },
  {
    id: "5",
    title: "Modern Industrial Loft with AC & Working Space",
    location: "Diani",
    area: "Diani",
    distance: "30 mins South",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    price: 3800,
    rating: 4.7,
    reviews: 24,
    category: "ac",
  },
  {
    id: "6",
    title: "Spacious 2-Bedroom with Private Pool & Gardens",
    location: "Nyali",
    area: "Nyali",
    distance: "5 mins from City Mall",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    price: 5200,
    rating: 4.85,
    reviews: 31,
    category: "pool",
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);

  const filteredProperties = PROPERTIES.filter((property) => {
    // 1. Check Category Match
    if (selectedCategory) {
      const matchKey = selectedCategory.toLowerCase();
      if (matchKey === "beachfront" && property.category !== "beachfront") return false;
      if (matchKey === "pool" && property.category !== "pool") return false;
      if (matchKey === "ac" && property.category !== "ac") return false;
      if (matchKey === "budget" && property.price > 3500) return false;
    }

    // 2. Check Search Parameters
    if (searchFilters) {
      if (searchFilters.location && property.location.toLowerCase() !== searchFilters.location.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800">
      <Navbar />

      <section className="relative bg-gradient-to-b from-blue-50/60 via-white to-slate-50/50 px-4 py-12 sm:py-16 md:py-20 border-b border-slate-100">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center space-y-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-none">
              Escape to the Coast <span className="text-blue-600">This Weekend</span>
            </h1>
            <p className="text-sm md:text-base font-medium text-slate-500 max-w-xl mx-auto leading-relaxed">
              Find the perfect Mombasa staycation in minutes. 1-night stays & weekend packages optimized with instant M-Pesa tracking utilities.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <SearchBar onSearch={setSearchFilters} />
          </div>
        </div>
      </section>

      <BookingTicker />

      <section className="px-4 py-6 md:py-8 border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl">
          <CategoryPills onCategoryChange={setSelectedCategory} />
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              {selectedCategory ? "Filtered Selections" : "Featured Coastal Stays"}
            </h2>
            <p className="text-xs md:text-sm font-semibold text-slate-400">
              {filteredProperties.length} verified staying layout blocks available matching criteria
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            /* Updated layout row-gap constraints to separate stacked decks beautifully */
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-8 xl:gap-x-10">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="w-full text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-white space-y-2">
              <div className="text-2xl">🔍</div>
              <h4 className="font-bold text-slate-800 text-sm md:text-base">No Matching Stays Located</h4>
              <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto">Try expanding your area query fields.</p>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-12 md:py-16 bg-slate-100/60 border-t border-slate-200/60">
        <div className="mx-auto max-w-7xl">
          <FeaturedSections />
        </div>
      </section>

      <section className="px-4 py-14 bg-gradient-to-br from-blue-700 to-indigo-800 text-white text-center relative overflow-hidden shadow-inner">
        <div className="mx-auto max-w-4xl relative z-10 space-y-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">Ready to Book Your Coastal Escape?</h2>
          <p className="text-blue-100 font-medium text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Join thousands of local weekenders. Instant M-Pesa automated booking flows, background verified property listings, and 24/7 dedicated WhatsApp customer support channels.
          </p>
          <button 
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex bg-white hover:bg-slate-50 text-blue-700 text-xs md:text-sm font-bold px-6 py-3 rounded-xl transition shadow-lg cursor-pointer hover:scale-102 active:scale-98"
          >
            Start Discovering Stays Now
          </button>
        </div>
        <div className="absolute inset-0 bg-radial from-transparent to-black/10 opacity-40" />
      </section>

      <FloatingWhatsApp />
    </div>
  );
}