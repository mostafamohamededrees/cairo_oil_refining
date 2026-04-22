"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileAudio, FileImage, Loader2, X } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

interface FileUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept: "image/*" | "audio/*";
  placeholder?: string;
}

export default function FileUpload({ label, value, onChange, accept, placeholder }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith(accept.split("/")[0])) {
      alert(`Invalid file type. Please upload an ${accept.split("/")[0]} file.`);
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      onChange(data.url);
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الرفع");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <label className="form-label">{label}</label>
      <div className="flex flex-col gap-2">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={clsx(
            "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors relative overflow-hidden",
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50",
            isUploading && "pointer-events-none opacity-70"
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
            accept={accept}
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center text-gray-500 gap-2 w-full h-full min-h-[100px] z-10 relative">
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            ) : value && accept.includes("image") ? (
              <div className="absolute inset-0 w-full h-full rounded-md overflow-hidden">
                <Image src={value} alt="Preview" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ) : accept.includes("audio") ? (
              <FileAudio className="w-6 h-6" />
            ) : (
              <FileImage className="w-6 h-6" />
            )}
            {!value && (
              <span className="text-xs font-medium">
                {isUploading ? "جاري الرفع..." : placeholder || "اسحب وأفلت الملف هنا، أو اضغط للاختيار"}
              </span>
            )}
          </div>
        </div>

        {/* Manual URL Input */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="form-input text-xs"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="أو ضع الرابط المباشر هنا..."
            dir="ltr"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="حذف"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
