import { getDevice } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Edit, ExternalLink } from "lucide-react";
import DeviceForm from "@/components/admin/DeviceForm";
import QRCodeGenerator from "@/components/admin/QRCodeGenerator";
import { DeviceStep } from "@/types/device";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DeviceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const device = await getDevice(id);

  if (!device) notFound();

  const formData = {
    title: device.title,
    subtitle: device.subtitle,
    description: device.description,
    methodCode: device.methodCode,
    versionNumber: device.versionNumber,
    issueDate: device.issueDate,
    lastReview: device.lastReview,
    approvedBy: device.approvedBy,
    standard: device.standard,
    detectionLimit: device.detectionLimit,
    range: device.range,
    repeatability: device.repeatability,
    enrichmentFactor: device.enrichmentFactor,
    sampleVolume: device.sampleVolume,
    measurementTime: device.measurementTime,
    purpose: device.purpose,
    scope: device.scope,
    principleOfOperation: device.principleOfOperation,
    approvedStandards: device.approvedStandards,
    extractionSolvent: device.extractionSolvent,
    sampleCleanUp: device.sampleCleanUp,
    displaySystem: device.displaySystem,
    interfaces: device.interfaces,
    software: device.software,
    internalMemory: device.internalMemory,
    alarmTrackingSystem: device.alarmTrackingSystem,
    powerRequirements: device.powerRequirements,
    dimensions: device.dimensions,
    weight: device.weight,
    autosampler: device.autosampler,
    applications: device.applications,
    advantages: device.advantages,
    warnings: device.warnings,
    steps: device.steps as unknown as DeviceStep[],
    videoUrl: device.videoUrl,
    audioUrl: device.audioUrl,
    imageUrl: device.imageUrl,
  };

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="breadcrumb mb-4">
        <Link href="/admin">الرئيسية</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <Link href="/admin/devices">الأجهزة</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <span>{device.title}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0A2342] rounded-lg flex items-center justify-center flex-shrink-0">
            <Edit className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0A2342]">{device.title}</h2>
            <p className="text-sm text-gray-500">{device.subtitle} — {device.methodCode}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/device/${device.id}`}
            target="_blank"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            معاينة صفحة الجهاز
          </Link>
          <QRCodeGenerator deviceId={device.id} deviceTitle={device.title} />
        </div>
      </div>

      <DeviceForm mode="edit" deviceId={device.id} initialData={formData} />
    </div>
  );
}
