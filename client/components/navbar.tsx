"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Compass, HelpCircle, LayoutGrid } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Real Branding Core Anchor */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 transition-transform group-hover:scale-105">
              <span className="text-xl font-bold">Z</span>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Zuri<span className="text-blue-600 font-extrabold">Homes</span>
            </span>
          </Link>

          {/* Center Navigation Track - Desktop */}
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <Compass className="h-4 w-4" />
              Explore
            </Link>
            <Link href="/help" className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <HelpCircle className="h-4 w-4" />
              Help
            </Link>
            <Link href="/list-property" className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-100">
              <LayoutGrid className="h-4 w-4 text-blue-600" />
              Host Your Space
            </Link>
          </div>

          {/* Right Side Controls - Live Trust Badges & Profile */}
          <div className="flex items-center gap-3">
            
            {/* The Visual M-Pesa Verification Badge */}
            <div className="hidden items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 sm:flex shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-700 tracking-tight">M-Pesa Secured</span>
            </div>

            {/* Micro Profile Settings Shell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1.5 p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="h-7 w-7 rounded-lg bg-slate-200 font-bold text-xs text-slate-700 flex items-center justify-center uppercase shadow-2xs">
                  MO
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link href="/profile" className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg">
                    My Profile
                  </Link>
                  <Link href="/bookings" className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg">
                    My Bookings
                  </Link>
                  <Link href="/wishlist" className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg">
                    Saved Stays
                  </Link>
                  <div className="h-px bg-slate-100 my-1" />
                  <button
                    className="block w-full px-3 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Sidebar Navigation Toggle Trigger */}
            <button
              className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 md:hidden cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Panel Drawer */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 space-y-3 md:hidden">
          <Link href="/" className="block text-sm font-bold text-slate-700 hover:text-blue-600 py-1" onClick={() => setIsOpen(false)}>
            Explore Stays
          </Link>
          <Link href="/help" className="block text-sm font-bold text-slate-700 hover:text-blue-600 py-1" onClick={() => setIsOpen(false)}>
            Help Center
          </Link>
          <Link href="/list-property" className="block text-sm font-bold text-slate-700 hover:text-blue-600 py-1" onClick={() => setIsOpen(false)}>
            Host Your Space
          </Link>
          <div className="border-t border-slate-100 pt-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-emerald-700">M-Pesa Secured</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}