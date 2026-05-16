import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-cream font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
