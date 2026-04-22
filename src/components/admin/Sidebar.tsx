"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Cpu,
  BookOpen,
  ClipboardCheck,
  FolderOpen,
  BookMarked,
  HelpCircle,
  ChevronLeft,
  Beaker,
  X,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { href: "/admin", label: "الرئيسية", icon: LayoutDashboard, exact: true },
  { href: "/admin/devices", label: "الأجهزة", icon: Cpu },
  { href: "/admin/instructions", label: "تعليمات التشغيل", icon: BookOpen, disabled: true },
  { href: "/admin/quality", label: "إجراءات الجودة", icon: ClipboardCheck, disabled: true },
  { href: "/admin/templates", label: "النماذج والسجلات", icon: FolderOpen, disabled: true },
  { href: "/admin/references", label: "المراجع", icon: BookMarked, disabled: true },
  { href: "/admin/support", label: "المساعدة والدعم", icon: HelpCircle, disabled: true },
];

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={clsx(
      "fixed top-0 start-0 h-screen w-64 bg-[#0A2342] flex flex-col z-50 shadow-2xl transition-transform duration-300 lg:translate-x-0",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
          <Image src="/logo.jpg" alt="CORC Logo" width={40} height={40} className="object-cover" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">شركة القاهرة</p>
          <p className="text-blue-300 text-xs leading-tight">لتكرير البترول (CORC)</p>
        </div>
        <button 
          className="lg:hidden ms-auto p-1 text-gray-400 hover:text-white transition-colors"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <p className="text-blue-400 text-xs font-semibold px-3 mb-2 uppercase tracking-wider">
          القائمة الرئيسية
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          if (item.disabled) {
            return (
              <div
                key={item.href}
                className="nav-link group opacity-50 cursor-not-allowed"
                title="قريباً"
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "nav-link group cursor-pointer",
                isActive && "active"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
              {isActive && (
                <ChevronLeft className="w-3.5 h-3.5 me-auto opacity-60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom info */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-blue-300 text-xs">بوابة تعليمات أجهزة المعمل</p>
          <p className="text-white/40 text-xs mt-1">v2.0 — 2024</p>
        </div>
      </div>
    </aside>
  );
}
