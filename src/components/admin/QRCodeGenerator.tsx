"use client";

import { useState, useRef, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { QrCode, Download, X, ExternalLink } from "lucide-react";

interface QRCodeGeneratorProps {
  deviceId: string;
  deviceTitle: string;
}

export default function QRCodeGenerator({ deviceId, deviceTitle }: QRCodeGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "https://your-app.vercel.app";

  const deviceUrl = `${baseUrl}/device/${deviceId}`;

  const handleDownload = useCallback(() => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    // Create a larger canvas with padding and branding
    const outputCanvas = document.createElement("canvas");
    const padding = 40;
    const logoHeight = 60;
    outputCanvas.width = canvas.width + padding * 2;
    outputCanvas.height = canvas.height + padding * 2 + logoHeight;

    const ctx = outputCanvas.getContext("2d");
    if (!ctx) return;

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

    // Navy header
    ctx.fillStyle = "#0A2342";
    ctx.fillRect(0, 0, outputCanvas.width, logoHeight);

    // Header text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText("شركة القاهرة لتكرير البترول", outputCanvas.width / 2, 25);
    ctx.font = "14px Arial";
    ctx.fillStyle = "#93c5fd";
    ctx.fillText(deviceTitle, outputCanvas.width / 2, 47);

    // QR Code
    ctx.drawImage(canvas, padding, logoHeight + padding / 2);

    // Footer URL
    ctx.fillStyle = "#374151";
    ctx.font = "11px Arial";
    ctx.fillText(deviceUrl, outputCanvas.width / 2, outputCanvas.height - 12);

    // Download
    const link = document.createElement("a");
    link.download = `QR-${deviceId}.png`;
    link.href = outputCanvas.toDataURL("image/png");
    link.click();
  }, [deviceId, deviceTitle, deviceUrl]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-[#0A2342] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#122a52] transition-colors shadow-md cursor-pointer"
      >
        <QrCode className="w-4 h-4" />
        توليد QR Code
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#0A2342]" />
                <h3 className="font-bold text-[#0A2342]">توليد QR Code للجهاز</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500 mb-5">
                يمكن للفنيين مسح هذا الرمز للوصول الفوري إلى تعليمات الجهاز
              </p>

              {/* QR Code */}
              <div ref={qrRef} className="inline-block qr-container mb-4">
                <QRCodeCanvas
                  value={deviceUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                  fgColor="#0A2342"
                />
              </div>

              {/* Device name */}
              <p className="font-bold text-[#0A2342] text-sm mb-1">{deviceTitle}</p>
              <p className="text-xs text-gray-400 break-all mb-5">{deviceUrl}</p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0A2342] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#122a52] transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  تحميل كصورة PNG
                </button>
                <a
                  href={deviceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  معاينة
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
