import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: '隱私政策 — 雜事房' };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8] px-[6%] py-16 text-ink">
      <article className="mx-auto max-w-3xl">
        <Link className="text-sm font-semibold text-forest" href="/">← 回到首頁</Link>
        <h1 className="mt-10 font-serif text-4xl font-black">隱私政策</h1>
        <p className="mt-4 text-sm text-ink/60">更新日期：2026 年 11 月 8 日</p>
        <div className="mt-10 space-y-8 leading-8 text-ink/75">
          <section><h2 className="text-xl font-bold text-ink">我們蒐集的資料</h2><p className="mt-2">為提供帳號、待辦、場次預約與線上共做功能，我們可能處理你的電子郵件、暱稱、預約內容、待辦事項與場次參與紀錄。</p></section>
          <section><h2 className="text-xl font-bold text-ink">資料的用途</h2><p className="mt-2">資料只用於登入驗證、提供服務、維護安全、處理預約與改善產品體驗，不會出售給第三方。</p></section>
          <section><h2 className="text-xl font-bold text-ink">第三方服務</h2><p className="mt-2">本站使用 Supabase 提供帳號與資料服務、LiveKit 提供視訊功能，並由 Vercel 託管。各服務可能依其政策處理必要的技術資料。</p></section>
          <section><h2 className="text-xl font-bold text-ink">分析工具</h2><p className="mt-2">目前尚未啟用 Google Analytics。若日後啟用，我們會同步更新本政策並提供必要的告知與選擇。</p></section>
          <section><h2 className="text-xl font-bold text-ink">你的選擇</h2><p className="mt-2">你可以停止使用服務，或聯繫我們詢問、更正或刪除與帳號相關的資料。</p></section>
        </div>
      </article>
    </main>
  );
}
