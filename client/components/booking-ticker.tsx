"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const BOOKINGS = [
  "Someone just booked a studio in Bamburi for Saturday!",
  "🔥 Last 2 rooms left at Nyali Penthouse this weekend",
  "A group of 4 just reserved the Diani Villa for Friday–Sunday",
  "Someone saved Beachfront Cottage in their wishlist",
  "Quick bookings! 5 properties booked in the last hour",
  "New property added: Luxury Pool Villa in Mtwapa",
  "Someone just booked AC Essential Studio in Shanzu",
  "⭐ Executive Penthouse rated 5/5 by recent guest",
];

export default function BookingTicker() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger a clean fade out right before shifting indexes
      setFade(false);
      
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % BOOKINGS.length);
        setFade(true);
      }, 300); // Allow time for transition opacity to catch up
      
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-emerald-50/60 border-y border-emerald-100 py-2.5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          
          {/* Static Live Tracker Badge Anchor */}
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase tracking-wider whitespace-nowrap">
            <Zap className="h-4 w-4 fill-emerald-600 animate-bounce" />
            <span>Live Activity</span>
          </div>
          
          {/* Vertical Separator line */}
          <div className="h-4 w-px bg-emerald-200 hidden sm:block" />

          {/* Dynamic Content Notification Core */}
          <div className="flex-1 overflow-hidden">
            <p 
              className={`text-xs sm:text-sm text-slate-700 font-semibold tracking-tight transition-opacity duration-300 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {BOOKINGS[current]}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}