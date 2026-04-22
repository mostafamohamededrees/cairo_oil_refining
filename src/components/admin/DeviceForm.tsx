"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDevice, updateDevice } from "@/lib/actions";
import { DeviceFormData, DeviceStep } from "@/types/device";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import clsx from "clsx";
import FileUpload from "./FileUpload";

const ICON_OPTIONS = [
  "FlaskConical", "Layers", "Zap", "Droplets", "Waves", "ScanLine",
  "Beaker", "Thermometer", "Activity", "Filter", "Microscope", "TestTube",
];

interface DeviceFormProps {
  initialData?: Partial<DeviceFormData>;
  deviceId?: string;
  mode: "create" | "edit";
}

const defaultStep: DeviceStep = { id: Date.now(), title: "", titleEn: "", iconType: "FlaskConical" };

export default function DeviceForm({ initialData, deviceId, mode }: DeviceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<DeviceFormData>({
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    description: initialData?.description || "",
    methodCode: initialData?.methodCode || "",
    versionNumber: initialData?.versionNumber || "",
    issueDate: initialData?.issueDate || "",
    lastReview: initialData?.lastReview || "",
    approvedBy: initialData?.approvedBy || "",
    standard: initialData?.standard || "",
    detectionLimit: initialData?.detectionLimit || "",
    range: initialData?.range || "",
    repeatability: initialData?.repeatability || "",
    enrichmentFactor: initialData?.enrichmentFactor || "",
    sampleVolume: initialData?.sampleVolume || "",
    measurementTime: initialData?.measurementTime || "",
    purpose: initialData?.purpose || "",
    scope: initialData?.scope || "",
    principleOfOperation: initialData?.principleOfOperation || "",
    approvedStandards: initialData?.approvedStandards || [""],
    extractionSolvent: initialData?.extractionSolvent || "",
    sampleCleanUp: initialData?.sampleCleanUp || "",
    displaySystem: initialData?.displaySystem || "",
    interfaces: initialData?.interfaces || "",
    software: initialData?.software || "",
    internalMemory: initialData?.internalMemory || "",
    alarmTrackingSystem: initialData?.alarmTrackingSystem || "",
    powerRequirements: initialData?.powerRequirements || "",
    dimensions: initialData?.dimensions || "",
    weight: initialData?.weight || "",
    autosampler: initialData?.autosampler || "",
    applications: initialData?.applications || [""],
    advantages: initialData?.advantages || [""],
    warnings: initialData?.warnings || [""],
    steps: (initialData?.steps as DeviceStep[]) || [{ ...defaultStep }],
    videoUrl: initialData?.videoUrl || "",
    audioUrl: initialData?.audioUrl || "",
    imageUrl: initialData?.imageUrl || "",
  });

  const update = (field: keyof DeviceFormData, value: unknown) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const updateArrayItem = (field: "applications" | "advantages" | "warnings" | "approvedStandards", idx: number, value: string) => {
    const arr = [...(formData[field] as string[])];
    arr[idx] = value;
    update(field, arr);
  };

  const addArrayItem = (field: "applications" | "advantages" | "warnings" | "approvedStandards") =>
    update(field, [...(formData[field] as string[]), ""]);

  const removeArrayItem = (field: "applications" | "advantages" | "warnings" | "approvedStandards", idx: number) =>
    update(field, (formData[field] as string[]).filter((_, i) => i !== idx));

  const addStep = () =>
    update("steps", [...formData.steps, { id: Date.now(), title: "", titleEn: "", iconType: "FlaskConical" }]);

  const updateStep = (idx: number, field: keyof DeviceStep, value: string | number) => {
    const steps = [...formData.steps];
    steps[idx] = { ...steps[idx], [field]: value };
    update("steps", steps);
  };

  const removeStep = (idx: number) =>
    update("steps", formData.steps.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const cleanData = {
        ...formData,
        applications: formData.applications.filter(Boolean),
        advantages: formData.advantages.filter(Boolean),
        warnings: formData.warnings.filter(Boolean),
        approvedStandards: (formData.approvedStandards || []).filter(Boolean),
        steps: formData.steps.filter((s) => s.title),
      };
      if (mode === "create") {
        const device = await createDevice(cleanData);
        router.push(`/admin/devices/${device.id}`);
      } else if (deviceId) {
        await updateDevice(deviceId, cleanData);
        router.push(`/admin/devices/${deviceId}`);
      }
    } catch (err) {
      setError("حدث خطأ أثناء الحفظ. يرجى المحاولة مرة أخرى.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto w-full">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-5 text-sm">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <FormSection title="📋 المعلومات الأساسية">
        <FieldRow cols={1}>
          <Field label="اسم الجهاز (عربي)">
            <Input value={formData.title} onChange={(e) => update("title", e.target.value)} placeholder="جهاز قياس الزيت في المياه" required />
          </Field>
        </FieldRow>
        <FieldRow>
          <Field label="الاسم التجاري / الموديل">
            <Input value={formData.subtitle} onChange={(e) => update("subtitle", e.target.value)} placeholder="ERACHECK ECO" required />
          </Field>
          <Field label="كود الطريقة">
            <Input value={formData.methodCode} onChange={(e) => update("methodCode", e.target.value)} placeholder="WI-LAB-OIW-001" required />
          </Field>
        </FieldRow>
        <FieldRow>
          <Field label="رقم الإصدار">
            <Input value={formData.versionNumber} onChange={(e) => update("versionNumber", e.target.value)} placeholder="02" />
          </Field>
          <Field label="المواصفة القياسية">
            <Input value={formData.standard} onChange={(e) => update("standard", e.target.value)} placeholder="ASTM D8193" />
          </Field>
        </FieldRow>
        <FieldRow cols={3}>
          <Field label="تاريخ الإصدار">
            <Input value={formData.issueDate} onChange={(e) => update("issueDate", e.target.value)} placeholder="01/01/2019" />
          </Field>
          <Field label="آخر مراجعة">
            <Input value={formData.lastReview} onChange={(e) => update("lastReview", e.target.value)} placeholder="01/05/2024" />
          </Field>
          <Field label="الموافق عليه من">
            <Input value={formData.approvedBy} onChange={(e) => update("approvedBy", e.target.value)} placeholder="مدير عام المعمل" />
          </Field>
        </FieldRow>
        <Field label="الوصف المختصر">
          <Textarea value={formData.description} onChange={(e) => update("description", e.target.value)} placeholder="وصف مختصر للجهاز..." rows={3} />
        </Field>
      </FormSection>

      {/* Technical Specs */}
      <FormSection title="⚙️ المواصفات الفنية">
        <FieldRow>
          <Field label="حد الكشف (MDL)">
            <Input value={formData.detectionLimit} onChange={(e) => update("detectionLimit", e.target.value)} placeholder="0.5 mg/L في الماء" />
          </Field>
          <Field label="مدى القياس">
            <Input value={formData.range} onChange={(e) => update("range", e.target.value)} placeholder="0–1000 mg/L" />
          </Field>
        </FieldRow>
        <FieldRow>
          <Field label="دقة التكرارية">
            <Textarea value={formData.repeatability} onChange={(e) => update("repeatability", e.target.value)} rows={3} placeholder="0–49.9 mg/L: ±0.2 mg/L&#10;50–299.9 mg/L: ±0.5 mg/L" />
          </Field>
          <div className="space-y-4">
            <Field label="معامل التركيز">
              <Input value={formData.enrichmentFactor} onChange={(e) => update("enrichmentFactor", e.target.value)} placeholder="50:900" />
            </Field>
            <Field label="حجم العينة">
              <Input value={formData.sampleVolume} onChange={(e) => update("sampleVolume", e.target.value)} placeholder="900 mL + 50 mL Cyclohexane" />
            </Field>
            <Field label="زمن القياس">
              <Input value={formData.measurementTime} onChange={(e) => update("measurementTime", e.target.value)} placeholder="2 دقيقة قياس + 2 دقيقة خلفية" />
            </Field>
          </div>
        </FieldRow>
      </FormSection>

      {/* Technical Specs 2 */}
      <FormSection title="📊 خصائص ومواصفات إضافية">
        <FieldRow>
          <Field label="نطاق التطبيق (Scope)">
            <Textarea value={formData.scope || ""} onChange={(e) => update("scope", e.target.value)} rows={3} placeholder="يستخدم الجهاز لتحليل الزيت الكلي في المياه..." />
          </Field>
          <Field label="مبدأ التشغيل (Principle of Operation)">
            <Textarea value={formData.principleOfOperation || ""} onChange={(e) => update("principleOfOperation", e.target.value)} rows={3} placeholder="يعتمد الجهاز على قياس امتصاص الأشعة تحت الحمراء..." />
          </Field>
        </FieldRow>
        <FieldRow>
          <Field label="المواد الكيميائية المستخدمة (Extraction Solvent)">
            <Input value={formData.extractionSolvent || ""} onChange={(e) => update("extractionSolvent", e.target.value)} placeholder="Cyclohexane (سيكلوهكسان)" />
          </Field>
          <Field label="تنظيف العينة قبل القياس (Sample Clean-up)">
            <Input value={formData.sampleCleanUp || ""} onChange={(e) => update("sampleCleanUp", e.target.value)} placeholder="Florisil Cartridge" />
          </Field>
        </FieldRow>
      </FormSection>

      {/* System & Hardware Details */}
      <FormSection title="🖥️ تفاصيل النظام والأجهزة">
        <FieldRow cols={3}>
          <Field label="شاشة الجهاز (Display System)">
            <Input value={formData.displaySystem || ""} onChange={(e) => update("displaySystem", e.target.value)} placeholder="شاشة لمس 8.4 بوصة" />
          </Field>
          <Field label="البرنامج (Software)">
            <Input value={formData.software || ""} onChange={(e) => update("software", e.target.value)} placeholder="ERASOFT RCS" />
          </Field>
          <Field label="الذاكرة الداخلية (Internal Memory)">
            <Input value={formData.internalMemory || ""} onChange={(e) => update("internalMemory", e.target.value)} placeholder="تخزين أكثر من 100,000 نتيجة" />
          </Field>
        </FieldRow>
        <FieldRow cols={2}>
          <Field label="وسائل الاتصال (Interfaces)">
            <Input value={formData.interfaces || ""} onChange={(e) => update("interfaces", e.target.value)} placeholder="Ethernet, USB, RS232, Wi-Fi" />
          </Field>
          <Field label="نظام تتبع الأعطال (Alarm Tracking)">
            <Input value={formData.alarmTrackingSystem || ""} onChange={(e) => update("alarmTrackingSystem", e.target.value)} placeholder="تسجيل جميع رسائل الأعطال" />
          </Field>
        </FieldRow>
        <FieldRow cols={3}>
          <Field label="الأبعاد (Dimensions)">
            <Input value={formData.dimensions || ""} onChange={(e) => update("dimensions", e.target.value)} placeholder="29 × 35 × 34 سم" />
          </Field>
          <Field label="الوزن (Weight)">
            <Input value={formData.weight || ""} onChange={(e) => update("weight", e.target.value)} placeholder="9.7 كجم" />
          </Field>
          <Field label="متطلبات التشغيل (Power)">
            <Input value={formData.powerRequirements || ""} onChange={(e) => update("powerRequirements", e.target.value)} placeholder="85 – 264 VAC, 150 وات" />
          </Field>
        </FieldRow>
        <FieldRow cols={1}>
          <Field label="وحدة التحليل التلقائي الاختيارية (Autosampler)">
            <Input value={formData.autosampler || ""} onChange={(e) => update("autosampler", e.target.value)} placeholder="10-Position Autosampler" />
          </Field>
        </FieldRow>
      </FormSection>

      {/* Standards */}
      <FormSection title="📑 المواصفات القياسية المعتمدة">
        <div className="space-y-2">
          {(formData.approvedStandards || []).map((std, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                className="form-input flex-1"
                value={std}
                onChange={(e) => updateArrayItem("approvedStandards", idx, e.target.value)}
                placeholder="ASTM D8193..."
              />
              <button type="button" onClick={() => removeArrayItem("approvedStandards", idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => addArrayItem("approvedStandards")} className="inline-flex items-center gap-2 text-sm text-[#0A2342] font-semibold hover:underline mt-1 cursor-pointer">
          <Plus className="w-4 h-4" /> إضافة مواصفة معتمدة
        </button>
      </FormSection>

      {/* Purpose */}
      <FormSection title="🎯 الغرض من الجهاز">
        <Field label="وصف تفصيلي للغرض من الجهاز">
          <Textarea value={formData.purpose} onChange={(e) => update("purpose", e.target.value)} rows={5} placeholder="يستخدم جهاز ERACHECK ECO لتحديد..." />
        </Field>
      </FormSection>

      {/* Procedural Steps */}
      <FormSection title="📋 خطوات إجراء التحليل">
        <div className="space-y-3">
          {formData.steps.map((step, idx) => (
            <div key={step.id} className="flex gap-3 items-start bg-gray-50 rounded-lg p-3">
              <div className="step-circle text-sm flex-shrink-0 mt-1">{idx + 1}</div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-1">
                  <input
                    className="form-input text-sm"
                    value={step.title}
                    onChange={(e) => updateStep(idx, "title", e.target.value)}
                    placeholder="اسم الخطوة بالعربية"
                  />
                </div>
                <div>
                  <input
                    className="form-input text-sm"
                    value={step.titleEn || ""}
                    onChange={(e) => updateStep(idx, "titleEn", e.target.value)}
                    placeholder="Step name in English"
                    dir="ltr"
                  />
                </div>
                <div>
                  <select
                    className="form-input text-sm"
                    value={step.iconType}
                    onChange={(e) => updateStep(idx, "iconType", e.target.value)}
                  >
                    {ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeStep(idx)}
                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addStep}
          className="inline-flex items-center gap-2 text-sm text-[#0A2342] font-semibold hover:underline mt-2"
        >
          <Plus className="w-4 h-4" /> إضافة خطوة
        </button>
      </FormSection>

      {/* Applications */}
      <FormSection title="🔬 التطبيقات">
        <div className="space-y-2">
          {formData.applications.map((app, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                className="form-input flex-1"
                value={app}
                onChange={(e) => updateArrayItem("applications", idx, e.target.value)}
                placeholder="مراقبة مياه الصرف الصناعي..."
              />
              <button type="button" onClick={() => removeArrayItem("applications", idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => addArrayItem("applications")} className="inline-flex items-center gap-2 text-sm text-[#0A2342] font-semibold hover:underline mt-1 cursor-pointer">
          <Plus className="w-4 h-4" /> إضافة تطبيق
        </button>
      </FormSection>

      {/* Advantages */}
      <FormSection title="⭐ مميزات الجهاز">
        <div className="space-y-2">
          {formData.advantages.map((adv, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                className="form-input flex-1"
                value={adv}
                onChange={(e) => updateArrayItem("advantages", idx, e.target.value)}
                placeholder="دقة عالية جداً..."
              />
              <button type="button" onClick={() => removeArrayItem("advantages", idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => addArrayItem("advantages")} className="inline-flex items-center gap-2 text-sm text-[#0A2342] font-semibold hover:underline mt-1 cursor-pointer">
          <Plus className="w-4 h-4" /> إضافة ميزة
        </button>
      </FormSection>

      {/* Warnings */}
      <FormSection title="⚠️ تنبيهات مهمة">
        <div className="space-y-2">
          {formData.warnings.map((warn, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                className="form-input flex-1"
                value={warn}
                onChange={(e) => updateArrayItem("warnings", idx, e.target.value)}
                placeholder="تأكد من تنظيف الجهاز..."
              />
              <button type="button" onClick={() => removeArrayItem("warnings", idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => addArrayItem("warnings")} className="inline-flex items-center gap-2 text-sm text-[#0A2342] font-semibold hover:underline mt-1 cursor-pointer">
          <Plus className="w-4 h-4" /> إضافة تنبيه
        </button>
      </FormSection>

      {/* Media */}
      <FormSection title="🎬 الوسائط">
        <FieldRow cols={3}>
          <FileUpload
            label="ملف أو رابط الصوت (Audio)"
            value={formData.audioUrl || ""}
            onChange={(url) => update("audioUrl", url)}
            accept="audio/*"
          />
          <FileUpload
            label="ملف أو رابط صورة الجهاز (Image)"
            value={formData.imageUrl || ""}
            onChange={(url) => update("imageUrl", url)}
            accept="image/*"
          />
          <Field label="رابط الفيديو التعليمي (YouTube أو URL مباشر)">
            <Input
              value={formData.videoUrl || ""}
              onChange={(e) => update("videoUrl", e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              dir="ltr"
            />
          </Field>
        </FieldRow>
      </FormSection>

      {/* Submit */}
      <div className="flex items-center gap-4 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-[#0A2342] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#122a52] transition-colors shadow-md disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {loading ? "جاري الحفظ..." : mode === "create" ? "إضافة الجهاز" : "حفظ التعديلات"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-lg font-semibold text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-bold text-white bg-[#0A2342] px-4 py-2.5 rounded-t-lg -mx-0 flex items-center gap-2">
    {children}
  </h3>
);

const FormSection = ({ title, children }: { title: React.ReactNode; children: React.ReactNode }) => (
  <div className="card overflow-hidden mb-5">
    <SectionTitle>{title}</SectionTitle>
    <div className="p-4 space-y-4">{children}</div>
  </div>
);

const FieldRow = ({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) => (
  <div className={clsx("grid gap-4", cols === 2 ? "grid-cols-1 sm:grid-cols-2" : cols === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1")}>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="form-label">{label}</label>
    {children}
  </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className="form-input" {...props} />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className="form-input min-h-[90px] resize-y" {...props} />
);
