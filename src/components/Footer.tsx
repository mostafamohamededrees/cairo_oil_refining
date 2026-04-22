import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-1.5 font-medium flex-wrap">
          © {new Date().getFullYear()} جميع الحقوق محفوظة. تم التطوير بواسطة 
          <Link 
            href="https://www.linkedin.com/in/mus-tafaa-/" 
            target="_blank" 
            className="text-blue-600 font-bold hover:text-black transition-colors flex items-center gap-1 mx-1"
          >
            Mustafa Mohamed
          </Link>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
        </p>
      </div>
    </footer>
  );
}
