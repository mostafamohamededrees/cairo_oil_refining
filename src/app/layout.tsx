import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "بوابة تعليمات أجهزة المعمل | شركة القاهرة لتكرير البترول",
  description:
    "بوابة تعليمات التشغيل والصيانة لأجهزة المعمل الكيميائية والتحاليل — شركة القاهرة لتكرير البترول (CORC)",
  keywords: ["تعليمات المعمل", "أجهزة التحليل", "CORC", "شركة القاهرة لتكرير البترول"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
