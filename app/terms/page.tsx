import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: '使用條款 — 雜事房' };

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8] px-[6%] py-16 text-ink">
      <article className="mx-auto max-w-3xl">
        <Link className="text-sm font-semibold text-forest" href="/">← 回到首頁</Link>
        <h1 className="mt-10 font-serif text-4xl font-black">使用條款</h1>
        <p className="mt-4 text-sm text-ink/60">更新日期：2026 年 11 月 8 日</p>
        <div className="mt-10 space-y-8 leading-8 text-ink/75">
          <section><h2 className="text-xl font-bold text-ink">服務內容</h2><p className="mt-2">雜事房提供待辦整理、場次預約與線上共做空間。功能可能隨測試與營運需求調整。</p></section>
          <section><h2 className="text-xl font-bold text-ink">帳號使用</h2><p className="mt-2">請提供正確資訊並妥善保管登入方式。你需對自己帳號下的操作負責，發現未授權使用時應儘快通知我們。</p></section>
          <section><h2 className="text-xl font-bold text-ink">使用規範</h2><p className="mt-2">請尊重同場參與者，不得騷擾他人、冒用身分、破壞服務、散布違法內容或嘗試未經授權存取系統。</p></section>
          <section><h2 className="text-xl font-bold text-ink">服務限制</h2><p className="mt-2">我們會盡力維持服務穩定，但不保證服務永不中斷。必要時可能暫停、限制或終止違反規範的使用。</p></section>
          <section><h2 className="text-xl font-bold text-ink">條款更新</h2><p className="mt-2">條款有重大變更時，我們會在網站上更新日期與內容。繼續使用服務代表你接受更新後的條款。</p></section>
        </div>
      </article>
    </main>
  );
}
