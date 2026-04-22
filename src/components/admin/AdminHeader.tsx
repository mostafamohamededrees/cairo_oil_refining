"use client";

import { Bell, Search, User, LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (!window.confirm("هل أنت متأكد من رغبتك في تسجيل الخروج؟")) return;
    
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
    }
  };
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center gap-3 md:gap-4 sticky top-0 z-40 shadow-sm">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={onMenuClick}
        className="lg:hidden p-1.5 -ms-2 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Company name */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[#0A2342] font-bold text-sm md:text-base leading-tight truncate">
          شركة القاهرة لتكرير البترول
        </h1>
        <p className="text-gray-500 text-[10px] md:text-xs truncate hidden sm:block">
          Cairo Oil Refining Company (CORC) — الإدارة العامة للمعامل الكيميائية والتحاليل
        </p>
      </div>

      {/* User */}
      <div className="flex items-center gap-2 border-l border-gray-200 pl-4 ml-2">
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-red-50 text-red-600 transition-colors border border-transparent hover:border-red-100 disabled:opacity-50"
          title="تسجيل الخروج"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-xs font-semibold hidden md:block">
            {isLoggingOut ? "جاري الخروج..." : "تسجيل الخروج"}
          </span>
        </button>
      </div>
    </header>
  );
}
