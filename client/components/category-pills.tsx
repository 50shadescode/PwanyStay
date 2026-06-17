"use client";

import { useState } from "react";

const CATEGORIES = [
  {
    id: "beachfront",
    icon: "🏝️",
    label: "Beachfront",
    description: "Steps from the sand",
  },
  {
    id: "pool",
    icon: "🏊",
    label: "Infinity Pool",
    description: "Resort-style pools",
  },
  {
    id: "ac",
    icon: "❄️",
    label: "AC Essential",
    description: "Beat the heat",
  },
  {
    id: "party",
    icon: "🔊",
    label: "Party Allowed",
    description: "Celebration-friendly",
  },
  {
    id: "budget",
    icon: "💰",
    label: "Budget Studios",
    description: "Under KSh 3,500",
  },
  {
    id: "parking",
    icon: "🔒",
    label: "Secure Parking",
    description: "Safe vehicle storage",
  },
];

interface CategoryPillsProps {
  onCategoryChange?: (categoryId: string) => void;
}

export default function CategoryPills({ onCategoryChange }: CategoryPillsProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    const newSelected = selected === id ? null : id;
    setSelected(newSelected);
    onCategoryChange?.(newSelected || "");
  };

  return (
    /* Expanded padding vectors to provide cards dynamic room to breathe */
    <div className="w-full overflow-x-auto no-scrollbar py-4 px-2">
      {/* Aligned items to justify-start on mobile rails, snapping to center configurations on desktop viewports */}
      <div className="flex gap-4 pb-1 min-w-max justify-start md:justify-center">
        {CATEGORIES.map((category) => {
          const isSelected = selected === category.id;
          
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleSelect(category.id)}
              className={`flex flex-col items-center justify-center text-center gap-1 rounded-2xl p-4 transition-all duration-200 min-w-[110px] sm:min-w-[125px] cursor-pointer select-none focus:outline-hidden ${
                isSelected
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100 border border-blue-600 scale-[1.02]"
                  : "bg-white border border-slate-200/80 hover:border-blue-500 text-slate-800 hover:shadow-md hover:shadow-slate-100"
              }`}
            >
              <span className="text-xl sm:text-2xl filter drop-shadow-xs mb-0.5">
                {category.icon}
              </span>
              
              <span className="text-xs font-bold tracking-tight">
                {category.label}
              </span>
              
              <span 
                className={`text-[10px] font-medium transition-colors ${
                  isSelected ? "text-blue-100" : "text-slate-400"
                }`}
              >
                {category.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}