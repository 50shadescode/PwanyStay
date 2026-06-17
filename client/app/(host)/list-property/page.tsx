"use client";

import React, { useState } from "react";
import { Camera, Upload, AlertTriangle, Building, CheckCircle2 } from "lucide-react";

export default function ListPropertyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    location: "Nyali",
    price: "",
    videoFile: null as File | null,
    hostPhone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Advance straight to verification pending state
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
        
        {/* Header Block */}
        <div className="bg-slate-900 px-6 py-8 text-white space-y-2">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-400" />
            <span className="text-xs font-bold tracking-wider uppercase text-blue-400">Zuri Homes Vendor Intake</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">List Your Coastal Property</h1>
          <p className="text-slate-400 text-xs font-medium">Complete verification to stream your listing live to incoming travelers.</p>
        </div>

        {/* Form Body Layout */}
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Step 1: Property Fundamentals</h3>
                <p className="text-xs text-slate-400 font-medium">Provide baseline metadata tracking coordinates for your staycation unit.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Listing Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Executive 1-Bedroom Penthouse with Ocean View" 
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 transition-colors"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Mombasa Neighborhood</label>
                    <select 
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 transition-colors"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    >
                      <option value="Nyali">Nyali</option>
                      <option value="Bamburi">Bamburi</option>
                      <option value="Shanzu">Shanzu</option>
                      <option value="Mtwapa">Mtwapa</option>
                      <option value="Diani">Diani</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Price Per Night (KES)</label>
                    <input 
                      type="number" 
                      placeholder="e.g., 4500" 
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 transition-colors"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">M-Pesa Connected Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="e.g., 0712345678" 
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 transition-colors"
                    value={formData.hostPhone}
                    onChange={(e) => setFormData({...formData, hostPhone: e.target.value})}
                  />
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={!formData.title || !formData.price || !formData.hostPhone}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-slate-900/10"
              >
                Proceed to Security Verification
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Step 2: Anti-Scam Video Gateway</h3>
                <p className="text-xs text-slate-400 font-medium">To protect clients, upload an unedited, continuous smartphone walkthrough video showing the physical interior rooms matching your listing.</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 font-semibold leading-relaxed">
                  Zuri Homes maintains a strict anti-fraud framework. Static photo uploads are barred. Your property file requires explicit internal admin video validation before listing activation.
                </p>
              </div>

              <div className="border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-2xl p-8 text-center bg-slate-50 transition-colors relative cursor-pointer">
                <input 
                  type="file" 
                  accept="video/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    if(e.target.files?.[0]) setFormData({...formData, videoFile: e.target.files[0]});
                  }}
                />
                <div className="space-y-3">
                  <div className="h-10 w-10 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center justify-center mx-auto text-slate-500">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-700">
                      {formData.videoFile ? formData.videoFile.name : "Select or record walkthrough video"}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">MP4, MOV up to 50MB max file size</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-bold rounded-xl transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={!formData.videoFile}
                  className="w-2/3 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2"
                >
                  <Upload className="h-4 w-4" /> Submit Application
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-8 text-center space-y-4 max-w-sm mx-auto">
              <div className="h-14 w-14 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto shadow-sm shadow-emerald-100">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Verification Pending</h3>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  Your details and video walkthrough for <span className="text-slate-800 font-bold">"{formData.title}"</span> have been queued for admin verification review.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-left">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Assigned Metrics</p>
                <p className="text-xs font-bold text-slate-700">Region Target: {formData.location}</p>
                <p className="text-xs font-bold text-slate-700">Payout Channel: KES {formData.price}/night via {formData.hostPhone}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}