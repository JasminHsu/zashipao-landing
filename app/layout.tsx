import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_TC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap"
});

const serif = Noto_Serif_TC({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "雜事房 — 把一直拖著的事，今天一起開始",
  description: "加入 5 人以內的線上共做場次，替一直被延後的生活雜事留一段 50 分鐘的時間。"
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
