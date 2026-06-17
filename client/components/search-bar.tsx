"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, Search, Zap } from "lucide-react";

const MOMBASA_AREAS = [
  { id: "nyali", label: "Nyali", distance: "5 mins from City Mall" },
  { id: "bamburi", label: "Bamburi", distance: "North Beach" },
  { id: "shanzu", label: "Shanzu", distance: "15 mins from Town" },
  { id: "mtwapa", label: "Mtwapa", distance: "20 mins North" },
  { id: "diani", label: "Diani", distance: "30 mins South" },
];

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  alignWithSGR: boolean;
}

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [alignWithSGR, setAlignWithSGR] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  const handleSearch = () => {
    onSearch?.({
      location,
      checkIn,
      checkOut,
      guests,
      alignWithSGR,
    });
  };

  const getNextFridayToSunday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    // Calculate days until next Friday
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    const friday = new Date(today);
    friday.setDate(friday.getDate() + daysUntilFriday);

    const sunday = new Date(friday);
    sunday.setDate(sunday.getDate() + 2);

    return {
      checkIn: friday.toISOString().split("T")[0],
      checkOut: sunday.toISOString().split("T")[0],
    };
  };

  const handleSGRToggle = (checked: boolean) => {
    setAlignWithSGR(checked);
    if (checked) {
      const dates = getNextFridayToSunday();
      setCheckIn(dates.checkIn);
      setCheckOut(dates.checkOut);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white p-5 border border-slate-200/80 shadow-xl md:p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-3">
        
        {/* Location Dropdown selector */}
        <div className="relative flex flex-col">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Where in Mombasa?
          </label>
          <div className="relative" onMouseLeave={() => setIsLocationOpen(false)}>
            <button
              type="button"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-left text-sm font-bold text-slate-800 hover:border-blue-500 transition-colors flex items-center justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-100"
            >
              <span className="flex items-center gap-2 truncate">
                <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                {location || "Select coastal neighborhood"}
              </span>
            </button>

            {isLocationOpen && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-2xl p-1 animate-in fade-in slide-in-from-top-1 duration-150">
                {MOMBASA_AREAS.map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => {
                      setLocation(area.label);
                      setIsLocationOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">{area.label}</div>
                    <div className="text-[10px] sm:text-xs text-slate-400 font-medium">{area.distance}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Check-in Calendar Interface Input */}
        <div className="flex flex-col">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Check-in
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              setAlignWithSGR(false);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-bold text-slate-800 hover:border-blue-500 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-100 h-[42px]"
          />
        </div>

        {/* Check-out Calendar Interface Input */}
        <div className="flex flex-col">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Check-out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setAlignWithSGR(false);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-bold text-slate-800 hover:border-blue-500 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-100 h-[42px]"
          />
        </div>

        {/* Guests Counter Dynamic Row Popover */}
        <div className="relative flex flex-col">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Guests
          </label>
          <div className="relative" onMouseLeave={() => setIsGuestOpen(false)}>
            <button
              type="button"
              onClick={() => setIsGuestOpen(!isGuestOpen)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-left text-sm font-bold text-slate-800 hover:border-blue-500 transition-colors flex items-center justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-100"
            >
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                {guests} guest{guests !== 1 ? "s" : ""}
              </span>
            </button>

            {isGuestOpen && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl border border-slate-200 bg-white shadow-2xl p-3 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="h-8 w-8 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors font-black text-slate-600 cursor-pointer flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-sm font-bold text-slate-800">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests(guests + 1)}
                    className="h-8 w-8 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors font-black text-slate-600 cursor-pointer flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Action Search Action Button */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={handleSearch}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold gap-2 h-[42px] rounded-xl flex items-center justify-center shadow-md shadow-blue-100 transition-all cursor-pointer text-sm"
          >
            <Search className="h-4 w-4" />
            <span>Search Stays</span>
          </button>
        </div>
      </div>

      {/* SGR Train Schedule Dynamic Toggle Overlay */}
      <div className="mt-4 flex items-start gap-3 rounded-xl bg-blue-50/50 border border-blue-100/60 p-3.5">
        <input
          type="checkbox"
          id="sgr-toggle"
          checked={alignWithSGR}
          onChange={(e) => handleSGRToggle(e.target.checked)}
          className="h-4 w-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer mt-0.5"
        />
        <label htmlFor="sgr-toggle" className="flex-1 cursor-pointer select-none">
          <span className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase tracking-tight">
            <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
            Align with SGR Train Schedule
          </span>
          <div className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed">
            Friday afternoon to Sunday afternoon slots optimized perfectly for weekend rail travelers.
          </div>
        </label>
      </div>
    </div>
  );
}