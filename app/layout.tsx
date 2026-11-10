import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_TC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap"
});

const serif = Noto_Serif_TC({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "雜事房 — 把一直拖著的事，今天一起做完",
  description: "加入線上共事場次，在 50 分鐘內完成那些你清單上永遠排不到的生活雜事。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${sans.variable} ${serif.variable} bg-cream font-sans text-ink antialiased`}>{children}</body>
    </html>
  );
}
