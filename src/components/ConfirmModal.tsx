"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title = "تأكيد العملية",
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-6 relative animate-fade-in">
        <button
          onClick={onCancel}
          className="absolute top-3 left-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
        <h3 className="font-bold text-lg text-[#0A2342] mb-3 text-center">{title}</h3>
        <p className="text-gray-700 text-center mb-6 text-sm leading-relaxed">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
