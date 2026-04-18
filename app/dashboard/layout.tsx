'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import { Suspense } from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(`[DashboardLayout] Rendering layout`);
  
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar - Fixed width and height */}
      <div className="w-72 shrink-0 border-r border-slate-100 bg-white hidden lg:block">
        <Suspense fallback={<div className="w-72 h-full bg-white animate-pulse" />}>
          <Sidebar />
        </Suspense>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="relative w-full max-w-[400px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search patients, records..."
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-3 lg:gap-6 ml-4">
            <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all relative group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            
            <div className="h-8 w-px bg-slate-100 hidden sm:block" />
            
            <button className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-50 rounded-2xl transition-all group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-100 shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-bold text-slate-900 leading-none">Dr. Sarah Wilson</p>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Senior Cardiologist</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors hidden sm:block" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
