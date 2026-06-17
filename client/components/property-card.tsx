"use client";

import Image from 'next/image'
import { Heart, Zap, Star } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

// This interface perfectly matches the data structure running in your home-page.tsx layout grid
export interface Property {
  id: string
  title: string
  location: string
  area: string
  distance: string
  image: string
  price: number
  rating: number
  reviews: number
  category: string
}

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Link href={`/property/${property.id}`} className="block h-full">
      <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-500 cursor-pointer flex flex-col h-full">
        
        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-100 shrink-0">
          <Image
            src={property.image}
            alt={property.title}
            fill
            /* 3. Image Optimization Scaling Ratio: Instantly pre-loads the top 3 cards to boost Core Web Vitals */
            priority={Number(property.id) <= 3}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-w-7xl) 33vw, 100vw"
          />

          {/* Instant Book Badge */}
          <div className="absolute top-3 right-3 rounded-full bg-blue-600 p-2 shadow-lg group-hover:scale-110 transition-transform z-10">
            <Zap className="h-4 w-4 text-white fill-white" />
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-3 left-3 rounded-full bg-white/90 p-2 hover:bg-white transition-all shadow-xs z-10 cursor-pointer"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-700'
              }`}
            />
          </button>

          {/* Gradient Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent z-0" />
        </div>

        {/* Content Details */}
        <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
          <div>
            {/* Rating and Reviews Row */}
            <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-slate-800">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>{property.rating}</span>
                <span className="text-slate-400 font-medium">({property.reviews} reviews)</span>
              </div>
            </div>

            {/* Area Info Metadata */}
            <div className="mb-1 text-xs text-slate-400 font-bold uppercase tracking-tight">
              <span>{property.area}</span>
              <span className="mx-1.5 text-slate-300">•</span>
              <span>{property.distance}</span>
            </div>

            {/* Property Title */}
            <h3 className="line-clamp-2 text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
              {property.title}
            </h3>
          </div>

          {/* M-Pesa Badge and Pricing Action Matrix */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 shrink-0">
            <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1">
              <span className="text-xs">🟢</span>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tight">M-Pesa Safe</span>
            </div>
            
            <div className="text-right">
              <div className="text-base font-black text-slate-900 tracking-tight">
                KSh {property.price.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">per night</div>
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}