"use client";

import { useState } from "react";
import { Play, Video } from "lucide-react";

interface VideoPlayerProps {
  videoUrl?: string | null;
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function isYouTubeUrl(url: string) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const youtubeId = videoUrl && isYouTubeUrl(videoUrl) ? getYouTubeId(videoUrl) : null;

  return (
    <div className="card overflow-hidden">
      {/* Card Header */}
      <div className="card-header section-blue">
        <Video className="w-4 h-4" />
        فيديو تعليمي — طريقة تشغيل الجهاز
      </div>

      <div className="p-4">
        {!videoUrl ? (
          <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400">
            <Video className="w-12 h-12 mb-3 opacity-40" />
            <p className="font-semibold text-sm">لا يوجد فيديو تعليمي بعد</p>
            <p className="text-xs mt-1">يمكن إضافة رابط الفيديو من لوحة الإدارة</p>
          </div>
        ) : youtubeId ? (
          <div className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
            {!isPlaying ? (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => setIsPlaying(true)}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <div className="relative z-10 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 text-white fill-white ms-1" />
                </div>
                <p className="relative z-10 text-white font-semibold text-sm mt-3 drop-shadow">
                  اضغط لتشغيل الفيديو التعليمي
                </p>
              </div>
            ) : (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title="فيديو تعليمي"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        ) : (
          <div className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
            <video
              className="w-full h-full"
              controls
              src={videoUrl}
              preload="metadata"
            />
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-3">
          الفيديو يشرح طريقة تشغيل الجهاز وإجراءات التحليل خطوة بخطوة
        </p>
      </div>
    </div>
  );
}
