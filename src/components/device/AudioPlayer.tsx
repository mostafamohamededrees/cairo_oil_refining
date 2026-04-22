"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Square, Loader2 } from "lucide-react";

interface AudioPlayerProps {
  audioUrl?: string | null;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const handleEnded = () => setIsPlaying(false);
      const handleWaiting = () => setIsLoading(true);
      const handlePlaying = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };

      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("waiting", handleWaiting);
      audio.addEventListener("playing", handlePlaying);

      return () => {
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("waiting", handleWaiting);
        audio.removeEventListener("playing", handlePlaying);
      };
    }
  }, []);

  if (!audioUrl) return null;

  const handleToggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => {
        console.error("Audio playback failed:", e);
        setIsPlaying(false);
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="inline-flex items-center">
      <audio ref={audioRef} src={audioUrl} preload="none" />
      <button
        onClick={handleToggle}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0A2342] text-white hover:bg-blue-800 transition-colors shadow-md"
        aria-label={isPlaying ? "إيقاف الصوت" : "تشغيل الصوت"}
        title={isPlaying ? "إيقاف الصوت" : "تشغيل الصوت"}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isPlaying ? (
          <Square className="w-4 h-4 fill-white" />
        ) : (
          <Play className="w-4 h-4 fill-white ml-1" />
        )}
      </button>
    </div>
  );
}
