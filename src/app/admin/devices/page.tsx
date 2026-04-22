import { getAllDevices } from "@/lib/actions";
import Link from "next/link";
import { Plus, Edit, QrCode, Cpu, FileText } from "lucide-react";
import QRCodeGenerator from "@/components/admin/QRCodeGenerator";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function DevicesPage() {
  const devices = await getAllDevices();

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#0A2342] flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            إدارة الأجهزة
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {devices.length} جهاز مسجل في قاعدة البيانات
          </p>
        </div>
        <Link
          href="/admin/devices/new"
          className="inline-flex items-center gap-2 bg-[#0A2342] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#122a52] transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          إضافة جهاز جديد
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#0A2342]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A2342]">{devices.length}</p>
              <p className="text-xs text-gray-500">إجمالي الأجهزة</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{devices.length}</p>
              <p className="text-xs text-gray-500">أجهزة نشطة</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{devices.length}</p>
              <p className="text-xs text-gray-500">رموز QR جاهزة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Devices table */}
      <div className="card overflow-hidden">
        <div className="card-header section-blue">
          <Cpu className="w-4 h-4" />
          قائمة الأجهزة المسجلة
        </div>
        {devices.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Cpu className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">لا توجد أجهزة مسجلة بعد</p>
            <p className="text-sm mt-1">ابدأ بإضافة جهاز جديد</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>اسم الجهاز</th>
                  <th>كود الطريقة</th>
                  <th>المواصفة القياسية</th>
                  <th>آخر مراجعة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr key={device.id}>
                    <td>
                      <div>
                        <p className="font-semibold text-[#0A2342]">{device.title}</p>
                        <p className="text-xs text-gray-400">{device.subtitle}</p>
                      </div>
                    </td>
                    <td>
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">
                        {device.methodCode}
                      </code>
                    </td>
                    <td>
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {device.standard}
                      </span>
                    </td>
                    <td className="text-gray-500 text-sm">{device.lastReview}</td>
                    <td>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/admin/devices/${device.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#0A2342] bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          تعديل
                        </Link>
                        <Link
                          href={`/device/${device.id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                          معاينة
                        </Link>
                        <QRCodeGenerator deviceId={device.id} deviceTitle={device.title} />
                        <DeleteButton id={device.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
