"use client";

import React, { useState, useRef } from "react";

export default function ListPropertyPage() {
  // 1. Core Metadata States
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [hostPhone, setHostPhone] = useState("");
  const [description, setDescription] = useState("");
  
  // 2. Video Upload State Engine
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 3. System Processing States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Prevent massive storage dumps at the gateway edge: restrict to max 50MB
      if (file.size > 50 * 1024 * 1024) {
        alert("System Boundary Alert: Video file size exceeds the 50MB maximum threshold for temporary parsing.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
      setVideoFile(file);
    }
  };

  const handleSubmitOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      alert("Verification Required: Please record or attach a short property video walkthrough to pass the scam shield.");
      return;
    }

    setIsSubmitting(true);

    // SYSTEM ARCHITECTURE NOTE:
    // Because we are sending a physical file asset (binary data) paired with text strings,
    // we use a standard multipart/form-data payload instead of a raw JSON string.
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("price_per_night", pricePerNight);
    formData.append("host_phone", hostPhone);
    formData.append("description", description);
    formData.append("verification_video", videoFile); // Temporary security asset

    console.log("System Dispatching Multipart FormData to FastAPI Node Engine...");
    
    // Simulate pipeline latency
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Clear local memory states cleanly
      setTitle("");
      setLocation("");
      setPricePerNight("");
      setHostPhone("");
      setDescription("");
      setVideoFile(null);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Header Branding Panel */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-8 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Onboard Your Coastal Stay</h1>
          <p className="text-sm text-blue-200 mt-2">
            Join the Zuri Homes trusted network. Submit your unlisted BnB details along with a verification clip to launch your listing.
          </p>
        </div>

        {submitSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Application Submitted Successfully</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Your property metadata and temporary verification walkthrough have been securely staged. Once our admin team approves your video clip, your listing will go live instantly.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => setSubmitSuccess(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-colors"
              >
                Onboard Another Property
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOnboarding} className="p-8 space-y-6">
            
            {/* SECTION 1: CORE PROPERTY DATA */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">
                1. Property Details
              </h3>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Listing Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Luxury 2-Bedroom Executive Suite with Nyali Ocean View"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Coastal Neighborhood
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Nyali, Diani, Bamburi, Shanzu"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Price Per Night (KES)
                  </label>
                  <input
                    type="number"
                    required
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(e.target.value)}
                    placeholder="e.g., 8500"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe layout specifications, amenities (WiFi, pool, AC), beach proximity, and house policies..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm resize-none text-slate-800"
                />
              </div>
            </div>

            {/* SECTION 2: ANTI-SCAM VIDEO GATEWAY (NEW IMPLEMENTATION) */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">
                2. Automated Verification Vault
              </h3>
              
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50/50 text-center">
                <input
                  type="file"
                  required
                  accept="video/mp4,video/quicktime"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  id="verification-video-input"
                />
                
                <label 
                  htmlFor="verification-video-input"
                  className="cursor-pointer inline-flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 font-bold text-xl">
                    ⤓
                  </div>
                  <span className="text-sm font-semibold text-blue-600 hover:underline">
                    {videoFile ? "Change Video File" : "Upload Verification Video Walkthrough"}
                  </span>
                  <span className="text-xs text-slate-400 mt-1 block">
                    {videoFile ? `Selected: ${videoFile.name} (${(videoFile.size / (1024 * 1024)).toFixed(2)} MB)` : "Raw camera video capture • Max 30 seconds (Max size 50MB)"}
                  </span>
                </label>
              </div>

              {/* Data Privacy Contract Box */}
              <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-blue-800">
                <span className="text-sm mt-0.5">🔒</span>
                <p>
                  <strong>Automated Privacy Protocol Enforced:</strong> This temporary video asset is handled solely by Suby Tech network managers to eliminate fraudulent entities. It will be <strong>permanently purged</strong> from our disk storage layers the exact minute your listing passes inspection.
                </p>
              </div>
            </div>

            {/* SECTION 3: COMMUNICATIONS & TELEPHONY */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">
                3. Direct Messaging Configuration
              </h3>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Host WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  value={hostPhone}
                  onChange={(e) => setHostPhone(e.target.value)}
                  placeholder="e.g., 2547XXXXXXXX"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-800"
                />
                <span className="text-xs text-slate-400 block mt-1">
                  Input international telephone layout format (starting with country code e.g., 254) without spaces or tracking plus symbols. This guarantees client WhatsApp messaging links match safely.
                </span>
              </div>
            </div>

            {/* EXECUTION SUBMIT ACTION */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 rounded-xl transition-colors text-sm shadow-sm cursor-pointer text-center"
              >
                {isSubmitting ? "Uploading Cryptographic Payload..." : "Submit Property & Schedule Remote Audit"}
              </button>
            </div>

          </form>
        )}
      </div>
    </main>
  );
}