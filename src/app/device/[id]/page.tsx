import { getDevice } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Home,
  CheckCircle2,
  Star,
  AlertTriangle,
  Target,
  Cpu,
  Download,
  ClipboardList,
  Wrench,
  BookOpen,
  Phone,
  Calendar,
  User,
  Hash,
  Gauge,
  Microscope,
  Cpu as CpuIcon,
  HardDrive,
  MonitorSmartphone,
  Wifi,
  Scale,
  Zap,
  ShieldCheck,
  FlaskConical,
} from "lucide-react";
import AudioPlayer from "@/components/device/AudioPlayer";
import VideoPlayer from "@/components/device/VideoPlayer";
import StepsTimeline from "@/components/device/StepsTimeline";
import Footer from "@/components/Footer";
import { DeviceStep } from "@/types/device";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const device = await getDevice(id);
  if (!device) return { title: "جهاز غير موجود" };
  return {
    title: `${device.title} — ${device.subtitle} | CORC`,
    description: device.description,
  };
}

export default async function DevicePage({ params }: PageProps) {
  const { id } = await params;
  const device = await getDevice(id);

  if (!device) notFound();

  const steps = device.steps as unknown as DeviceStep[];

  return (
    <div className="min-h-screen bg-gray-50 font-cairo" dir="rtl">
      {/* Top Header */}
      <header className="bg-[#0A2342] text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo + Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image src="/logo.jpg" alt="CORC Logo" width={40} height={40} className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">شركة القاهرة لتكرير البترول</p>
                <p className="text-blue-300 text-xs leading-tight">
                  Cairo Oil Refining Company (CORC)
                </p>
              </div>
            </div>
            {/* Right side */}
            <div className="hidden md:block text-end">
              <p className="font-bold text-sm">بوابة تعليمات أجهزة المعمل</p>
              <p className="text-blue-300 text-xs">
                الإدارة العامة للمعامل الكيميائية والتحاليل
              </p>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mt-2 pb-2 border-t border-white/10 pt-2">
            <Link href="/" className="flex items-center gap-1 text-blue-300 hover:text-white text-xs transition-colors">
              <Home className="w-3.5 h-3.5" />
              الرئيسية
            </Link>
            <ChevronLeft className="w-3 h-3 text-blue-400" />
            <span className="text-blue-300 text-xs">تعليمات التشغيل</span>
            <ChevronLeft className="w-3 h-3 text-blue-400" />
            <span className="text-white text-xs font-semibold">{device.title}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex gap-5">
          {/* ═══ MAIN CONTENT ═══ */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Hero Card */}
            <div className="card overflow-hidden">
              <div className="p-5">
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  {/* Device Image */}
                  <div className="relative w-full sm:w-52 h-44 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-blue-100">
                    {device.imageUrl ? (
                      <Image
                        src={device.imageUrl}
                        alt={device.subtitle}
                        fill
                        unoptimized
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <div className="w-16 h-16 mx-auto bg-[#0A2342] rounded-full flex items-center justify-center mb-2">
                          <Gauge className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-[#0A2342] font-bold text-sm">Oil in Water</p>
                        <p className="text-blue-500 text-xs">Analyzer</p>
                      </div>
                    )}
                  </div>

                  {/* Title + Description */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-black text-[#0A2342] leading-tight">
                        {device.title}
                      </h1>
                      <AudioPlayer audioUrl={device.audioUrl} />
                    </div>
                    <p className="text-xl font-bold text-blue-600 mt-0.5">{device.subtitle}</p>
                    <p className="text-sm text-gray-500 font-medium">(Oil-in-Water Analyzer)</p>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-3">
                      {device.description}
                    </p>

                    {/* Meta badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                      <MetaBadge icon={<Hash className="w-3.5 h-3.5" />} label="كود الطريقة" value={device.methodCode} />
                      <MetaBadge icon={<BookOpen className="w-3.5 h-3.5" />} label="رقم الإصدار" value={device.versionNumber} />
                      <MetaBadge icon={<Calendar className="w-3.5 h-3.5" />} label="تاريخ الإصدار" value={device.issueDate} />
                      <MetaBadge icon={<Calendar className="w-3.5 h-3.5" />} label="آخر مراجعة" value={device.lastReview} />
                      <MetaBadge icon={<User className="w-3.5 h-3.5" />} label="الموافق عليه من" value={device.approvedBy} />
                      <MetaBadge icon={<ClipboardList className="w-3.5 h-3.5" />} label="طبقاً للمواصفة" value={device.standard} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specs Card */}
            <div className="card overflow-hidden">
              <div className="card-header" style={{ background: "#dbeafe", color: "#1e3a5f" }}>
                <Gauge className="w-4 h-4" />
                المواصفات الرئيسية للجهاز
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <SpecItem label="حد الكشف (MDL)" value={device.detectionLimit} />
                  <SpecItem label="مدى القياس (Range)" value={device.range} />
                  <SpecItem label="حجم العينة" value={device.sampleVolume} />
                  <SpecItem label="زمن القياس" value={device.measurementTime} />
                  <SpecItem label="معامل التركيز (Enrichment Factor)" value={device.enrichmentFactor} />
                  <SpecItem label="دقة التكرارية (Repeatability)" value={device.repeatability} multiline />
                </div>
              </div>
            </div>

            {/* Steps Timeline */}
            <StepsTimeline steps={steps} />

            {/* Purpose */}
            <div className="card overflow-hidden">
              <div className="card-header" style={{ background: "#dcfce7", color: "#14532d" }}>
                <Target className="w-4 h-4" />
                الغرض من الجهاز (Purpose)
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 leading-loose whitespace-pre-line">{device.purpose}</p>
              </div>
            </div>

            {/* Scope & Principle */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {device.scope && (
                <div className="card overflow-hidden">
                  <div className="card-header" style={{ background: "#e0f2fe", color: "#0369a1" }}>
                    <Microscope className="w-4 h-4" />
                    نطاق التطبيق (Scope)
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-700 leading-loose whitespace-pre-line">{device.scope}</p>
                  </div>
                </div>
              )}
              {device.principleOfOperation && (
                <div className="card overflow-hidden">
                  <div className="card-header" style={{ background: "#f3e8ff", color: "#6b21a8" }}>
                    <CpuIcon className="w-4 h-4" />
                    مبدأ التشغيل (Principle)
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-700 leading-loose whitespace-pre-line">{device.principleOfOperation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Standards & Chemicals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {device.approvedStandards && device.approvedStandards.length > 0 && (
                <div className="card overflow-hidden">
                  <div className="card-header" style={{ background: "#e0f2fe", color: "#0369a1" }}>
                    <ShieldCheck className="w-4 h-4" />
                    المواصفات القياسية المعتمدة
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {(device.approvedStandards as string[]).map((std: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-bold">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {(device.extractionSolvent || device.sampleCleanUp) && (
                <div className="card overflow-hidden">
                  <div className="card-header" style={{ background: "#fce7f3", color: "#be185d" }}>
                    <FlaskConical className="w-4 h-4" />
                    المواد الكيميائية والتنظيف
                  </div>
                  <div className="p-4 space-y-3">
                    {device.extractionSolvent && (
                      <div>
                        <p className="text-xs font-bold text-gray-900 mb-1">المذيب المستخدم (Solvent):</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{device.extractionSolvent}</p>
                      </div>
                    )}
                    {device.sampleCleanUp && (
                      <div>
                        <p className="text-xs font-bold text-gray-900 mb-1">تنظيف العينة (Clean-up):</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{device.sampleCleanUp}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Applications + Advantages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Applications */}
              <div className="card overflow-hidden">
                <div className="card-header" style={{ background: "#fef3c7", color: "#92400e" }}>
                  <Wrench className="w-4 h-4" />
                  التطبيقات (Applications)
                </div>
                <div className="p-4">
                  <ul className="space-y-0">
                    {(device.applications as string[]).map((app: string, i: number) => (
                      <li key={i} className="advantage-badge">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Advantages */}
              <div className="card overflow-hidden">
                <div className="card-header" style={{ background: "#fef3c7", color: "#92400e" }}>
                  <Star className="w-4 h-4" />
                  مميزات الجهاز (Advantages)
                </div>
                <div className="p-4">
                  <ul className="space-y-0">
                    {(device.advantages as string[]).map((adv: string, i: number) => (
                      <li key={i} className="advantage-badge">
                        <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5 fill-yellow-400" />
                        <span className="text-gray-700">{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Warnings */}
            <div className="card overflow-hidden">
              <div className="card-header" style={{ background: "#fee2e2", color: "#991b1b" }}>
                <AlertTriangle className="w-4 h-4" />
                تنبيهات مهمة ⚠
              </div>
              <div className="p-4">
                <ul className="space-y-0">
                  {(device.warnings as string[]).map((w: string, i: number) => (
                    <li key={i} className="warning-item">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* System Details */}
            <div className="card overflow-hidden">
              <div className="card-header" style={{ background: "#f1f5f9", color: "#334155" }}>
                <HardDrive className="w-4 h-4" />
                تفاصيل النظام والأجهزة (System Details)
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {device.displaySystem && <SysItem icon={<MonitorSmartphone className="w-4 h-4"/>} label="الشاشة" value={device.displaySystem} />}
                  {device.interfaces && <SysItem icon={<Wifi className="w-4 h-4"/>} label="وسائل الاتصال" value={device.interfaces} />}
                  {device.software && <SysItem icon={<CpuIcon className="w-4 h-4"/>} label="البرنامج" value={device.software} />}
                  {device.internalMemory && <SysItem icon={<HardDrive className="w-4 h-4"/>} label="الذاكرة الداخلية" value={device.internalMemory} />}
                  {device.alarmTrackingSystem && <SysItem icon={<AlertTriangle className="w-4 h-4"/>} label="تتبع الأعطال" value={device.alarmTrackingSystem} />}
                  {device.autosampler && <SysItem icon={<Target className="w-4 h-4"/>} label="التحليل التلقائي" value={device.autosampler} />}
                  {device.powerRequirements && <SysItem icon={<Zap className="w-4 h-4"/>} label="متطلبات التشغيل" value={device.powerRequirements} />}
                  {device.dimensions && <SysItem icon={<Wrench className="w-4 h-4"/>} label="الأبعاد" value={device.dimensions} />}
                  {device.weight && <SysItem icon={<Scale className="w-4 h-4"/>} label="الوزن" value={device.weight} />}
                </div>
              </div>
            </div>

            <VideoPlayer videoUrl={device.videoUrl} />
          </div>

          {/* ═══ SIDEBAR (Desktop Only) ═══ */}
          <div className="hidden lg:flex flex-col gap-4 w-64 flex-shrink-0">
            {/* Quick Links */}
            <div className="card overflow-hidden">
              <div className="card-header section-blue">
                <BookOpen className="w-4 h-4" />
                روابط سريعة
              </div>
              <div className="p-3">
                <QuickLink icon={<Download className="w-3.5 h-3.5" />} label="تحميل دليل الجهاز" />
                <QuickLink icon={<ClipboardList className="w-3.5 h-3.5" />} label="نموذج تشغيل يومي" />
                <QuickLink icon={<Wrench className="w-3.5 h-3.5" />} label="سجل الصيانة" />
                <QuickLink icon={<Gauge className="w-3.5 h-3.5" />} label="نموذج معايرة" />
                <QuickLink icon={<Phone className="w-3.5 h-3.5" />} label="طلب فني دعم" />
              </div>
            </div>

            {/* Key Advantages Sidebar */}
            <div className="card overflow-hidden">
              <div className="card-header" style={{ background: "#fef3c7", color: "#92400e" }}>
                <Star className="w-4 h-4" />
                أهم المميزات
              </div>
              <div className="p-3">
                {(device.advantages as string[]).slice(0, 5).map((adv: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 py-1.5 border-b border-gray-50 last:border-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 leading-snug">{adv}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings Sidebar */}
            <div className="card overflow-hidden">
              <div className="card-header" style={{ background: "#fee2e2", color: "#991b1b" }}>
                <AlertTriangle className="w-4 h-4" />
                تنبيهات مهمة
              </div>
              <div className="p-3">
                {(device.warnings as string[]).slice(0, 3).map((w: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 py-1.5 border-b border-red-50 last:border-0">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700 leading-snug">{w}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Info box */}
            <div className="bg-[#0A2342] rounded-xl p-4 text-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <p className="font-bold text-sm">معلومات مهمة</p>
              </div>
              <p className="text-blue-200 text-xs leading-relaxed">
                يجب قراءة تعليمات التشغيل بعناية قبل استخدام الجهاز لضمان سلامة المستخدم ودقة النتائج.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ─── Helper Components ───────────────────────────────────────────────────────

function MetaBadge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
      <div className="flex items-center gap-1.5 text-gray-400 mb-1">
        {icon}
        <span className="text-[10px] font-medium">{label}</span>
      </div>
      <p className="text-xs font-bold text-[#0A2342]">{value}</p>
    </div>
  );
}

function SpecItem({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="spec-badge">
      <p className="text-[11px] font-semibold text-blue-600 mb-1">{label}</p>
      {multiline ? (
        <div className="space-y-0.5">
          {value.split("\n").map((line, i) => (
            <p key={i} className="text-xs text-gray-700 font-medium">{line}</p>
          ))}
        </div>
      ) : (
        <p className="text-xs font-bold text-[#0A2342]">{value}</p>
      )}
    </div>
  );
}

function QuickLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-[#0A2342] transition-colors text-xs font-medium text-start">
      <span className="text-[#0A2342] flex-shrink-0">{icon}</span>
      {label}
    </button>
  );
}

function SysItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
      <div className="text-blue-500 mt-0.5">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-gray-500 mb-0.5">{label}</p>
        <p className="text-xs text-gray-800 font-medium leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
