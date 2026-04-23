export default function Footer() {
  return (
    <footer className="w-full py-6 mt-auto border-t border-gray-200 bg-gray-50 text-center">
      <div className="flex items-center justify-center gap-3 text-sm text-gray-600 mb-2">
        <span>
          Supervised by:{" "}
          <a
            href="https://www.linkedin.com/in/chemist-abdelrahman-khalaf209"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >
            Chemist Abd Elrahman Khlaf
          </a>
        </span>
        <span className="text-gray-300">|</span>
        <span>
          Developed with <span className="text-red-500">♥</span> by{" "}
          <a
            href="https://www.linkedin.com/in/mus-tafaa-/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >
            Mustafa Mohamed
          </a>
        </span>
      </div>
      <p className="text-xs text-gray-400">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}
