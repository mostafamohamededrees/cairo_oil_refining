"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import Footer from "@/components/Footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-cairo">
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <Sidebar isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
      
      <div className="lg:ms-64 flex flex-col min-h-screen transition-all duration-300">
        <AdminHeader onMenuClick={() => setIsMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6 flex flex-col overflow-x-hidden min-w-0">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
