"use client";

import { useState } from "react";
import {
  FlaskConical,
  Layers,
  Zap,
  Droplets,
  Waves,
  ScanLine,
  Beaker,
  Thermometer,
  Activity,
  Filter,
  Microscope,
  TestTube,
  LucideIcon,
  ChevronLeft,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  FlaskConical,
  Layers,
  Zap,
  Droplets,
  Waves,
  ScanLine,
  Beaker,
  Thermometer,
  Activity,
  Filter,
  Microscope,
  TestTube,
};

interface Step {
  id: number;
  title: string;
  titleEn?: string;
  iconType: string;
}

interface StepsTimelineProps {
  steps: Step[];
}

export default function StepsTimeline({ steps }: StepsTimelineProps) {
  const [visibleCount, setVisibleCount] = useState(10);

  return (
    <div className="card overflow-hidden">
      <div className="card-header" style={{ background: "#1e3a6e", color: "white" }}>
        <span>📋</span>
        خطوات إجراء التحليل (Measurement Procedure)
      </div>
      <div className="p-4">
        {/* Desktop: horizontal flow */}
        <div className="hidden md:flex items-start gap-0 overflow-x-auto pb-2">
          {steps.map((step, idx) => {
            const Icon = ICON_MAP[step.iconType] || FlaskConical;
            const isLast = idx === steps.length - 1;
            return (
              <div key={step.id} className="flex items-center flex-shrink-0">
                {/* Step */}
                <div className="flex flex-col items-center gap-2 min-w-[140px] max-w-[180px] px-2">
                  {/* Number badge */}
                  <div className="w-7 h-7 rounded-full bg-[#0A2342] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </div>
                  {/* Icon circle */}
                  <div className="w-14 h-14 rounded-full border-2 border-[#0A2342] bg-blue-50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#0A2342]" />
                  </div>
                  {/* Title */}
                  <div className="text-center">
                    <p className="text-xs font-bold text-[#0A2342] leading-tight">{step.title}</p>
                    {step.titleEn && (
                      <p className="text-[10px] text-gray-400 mt-0.5" dir="ltr">{step.titleEn}</p>
                    )}
                  </div>
                </div>

                {/* Arrow between steps */}
                {!isLast && (
                  <ChevronLeft className="w-5 h-5 text-gray-300 mx-1 flex-shrink-0 mt-[-24px]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical list */}
        <div className="flex flex-col gap-3 md:hidden">
          {steps.slice(0, visibleCount).map((step, idx) => {
            const Icon = ICON_MAP[step.iconType] || FlaskConical;
            const showLine = idx < visibleCount - 1 || visibleCount < steps.length;
            
            return (
              <div 
                key={step.id} 
                className="flex items-start gap-3 transition-all duration-500 ease-in-out"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-9 h-9 rounded-full bg-[#0A2342] text-white text-sm font-bold flex items-center justify-center z-10 relative shadow-sm">
                    {idx + 1}
                  </div>
                  {showLine && <div className="w-0.5 h-8 bg-gray-200 mt-[-4px]" />}
                </div>
                <div className="flex items-center gap-3 flex-1 bg-white border border-blue-100 shadow-sm rounded-xl p-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#0A2342]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0A2342] leading-tight mb-1">{step.title}</p>
                    {step.titleEn && (
                      <p className="text-xs text-gray-400" dir="ltr">{step.titleEn}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Load More Button */}
          {visibleCount < steps.length && (
            <div className="flex justify-center mt-2 relative z-10 pt-2">
              <button 
                onClick={() => setVisibleCount(v => Math.min(v + 6, steps.length))}
                className="bg-white border-2 border-[#0A2342] text-[#0A2342] px-6 py-2 rounded-full text-sm font-bold hover:bg-[#0A2342] hover:text-white transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 -rotate-90" />
                عرض المزيد (متبقي {steps.length - visibleCount})
              </button>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-4 border-t border-gray-100 pt-3">
          ملاحظة: تأكد من فصل الطورين جيداً قبل إدخال العينة للجهاز للحصول على نتيجة دقيقة.
        </p>
      </div>
    </div>
  );
}
