"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Video, ShieldCheck, Camera } from "lucide-react";

export default function FeaturedSections() {
  return (
    <div className="w-full space-y-12">
      
      {/* 1. Nairobi Friday Exodus Banner Section */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-950">
              Nairobi Friday Exodus
            </h3>
            <p className="text-slate-600 font-medium text-xs md:text-sm max-w-xl leading-relaxed">
              Special deals customized for Nairobi weekenders. Friday afternoon to Sunday evening packages with integrated M-Pesa tracking mechanisms and guaranteed premium AC amenities.
            </p>
          </div>
          
          <Link 
            href="/search?exodus=true"
            className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-100 shrink-0 cursor-pointer"
          >
            View Deals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Dynamic Trust Infrastructure Statistics Row */}
        <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/60">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-black text-blue-600">500+</div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">Properties</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-black text-blue-600">2h</div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">Avg Setup Time</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-black text-blue-600">100%</div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">M-Pesa Safe</div>
          </div>
        </div>
      </div>

      {/* 2. Verified by Walkthrough Videos Trust Matrix Section */}
      <div className="w-full space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-950 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
            Verified by Walkthrough Videos
          </h2>
          <p className="text-xs md:text-sm font-medium text-slate-500 max-w-2xl leading-relaxed">
            Every property cataloged in our marketplace includes transparent walkthrough captures so you know exactly what you are securing. Zero deviations, pure trust.
          </p>
        </div>

        {/* Feature Component Array Grid mapping blocks */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Feature Card 1 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition">
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Video className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm md:text-base mb-1">360° Virtual Tours</h4>
            <p className="text-xs md:text-sm font-medium text-slate-500 leading-relaxed">Full walkthrough videos captured from every geometric angle.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm md:text-base mb-1">Host Verified</h4>
            <p className="text-xs md:text-sm font-medium text-slate-500 leading-relaxed">All listed host identities background-checked and guest-rated.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Camera className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm md:text-base mb-1">Real Photos & Reviews</h4>
            <p className="text-xs md:text-sm font-medium text-slate-500 leading-relaxed">Authentic structural captures and unedited customer walkthrough logs.</p>
          </div>

        </div>
      </div>

    </div>
  );
}