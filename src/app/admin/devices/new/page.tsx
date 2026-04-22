import DeviceForm from "@/components/admin/DeviceForm";
import Link from "next/link";
import { ChevronLeft, Plus } from "lucide-react";

export default function NewDevicePage() {
  return (
    <div>
      {/* Breadcrumb */}
      <nav className="breadcrumb mb-4">
        <Link href="/admin">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <Link href="/admin/devices">الأجهزة</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <span>إضافة جهاز جديد</span>
      </nav>

      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-[#0A2342] rounded-lg flex items-center justify-center">
          <Plus className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl font-bold text-[#0A2342]">إضافة جهاز جديد</h2>
      </div>

      <DeviceForm mode="create" />
    </div>
  );
}
