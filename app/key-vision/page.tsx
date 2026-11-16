import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Key Vision — 雜事房",
  robots: { index: false, follow: false }
};

const colors = [
  { name: "Paper", value: "#FFFDF8", className: "bg-paper border border-border" },
  { name: "Cream", value: "#FAF7F2", className: "bg-cream border border-border" },
  { name: "Ink", value: "#1C1917", className: "bg-ink" },
  { name: "Coral", value: "#FF5A36", className: "bg-terracotta" },
  { name: "Forest", value: "#4A7260", className: "bg-forest" },
  { name: "Border", value: "#DDD6CB", className: "bg-border" }
];

export default function KeyVisionPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border bg-paper px-[5%] py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Logo />
          <span className="rounded-full bg-forest-lt px-3 py-1 text-xs font-bold text-forest">Key Vision 01</span>
        </div>
      </header>

      <section className="border-b border-border bg-paper px-[5%] pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-2 text-sm font-bold text-forest">
            <span className="size-2 bg-terracotta" aria-hidden="true" />
            溫暖、俐落的共同工作室
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.15] sm:text-7xl sm:leading-[1.08]">
            把一直拖著的事，<br />今天一起開始。
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
            有陪伴，但不喧鬧；有秩序，但不僵硬。雜事房讓人感覺可以安心坐下來，先完成眼前的一件事。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="min-h-12 rounded-lg bg-terracotta px-6 py-3 font-bold text-ink transition-transform hover:-translate-y-px">免費加入</button>
            <button type="button" className="min-h-12 rounded-lg border border-border-d bg-transparent px-6 py-3 font-bold text-ink hover:border-muted">看近期場次</button>
          </div>
        </div>
      </section>

      <section className="bg-cream px-[5%] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold text-terracotta">01 / COLOR</p>
          <h2 className="mt-2 text-3xl font-black">少量色彩，清楚分工。</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
            {colors.map(color => (
              <div key={color.name}>
                <div className={`aspect-square w-full rounded-lg ${color.className}`} />
                <p className="mt-3 text-sm font-bold">{color.name}</p>
                <p className="mt-1 font-mono text-xs text-muted">{color.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-paper px-[5%] py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.25fr]">
          <div>
            <p className="text-sm font-bold text-terracotta">02 / TYPE</p>
            <h2 className="mt-2 text-3xl font-black">有個性，但不搶工作。</h2>
            <p className="mt-4 max-w-md leading-7 text-muted">品牌名稱保留宋體。標題、內文與操作介面統一使用黑體，讓閱讀和操作更俐落。</p>
          </div>
          <div className="border-l-4 border-terracotta pl-6 sm:pl-8">
            <p className="font-serif text-4xl font-black">雜事房</p>
            <p className="mt-8 text-4xl font-black leading-tight sm:text-5xl">先替那件事，<br />留一段時間。</p>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted">選一場適合的 50 分鐘。大家一起開始，各自完成，最後再回來看看這次走了多遠。</p>
          </div>
        </div>
      </section>

      <section className="bg-cream px-[5%] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold text-terracotta">03 / PRODUCT</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-black">同一套介面語言。</h2>
            <div className="flex gap-2" aria-label="狀態範例">
              <span className="rounded-full bg-forest-lt px-3 py-1 text-xs font-bold text-forest">已預約</span>
              <span className="rounded-full bg-[#F7EDD8] px-3 py-1 text-xs font-bold text-[#7A5419]">剩 3 位</span>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
            <article className="rounded-lg border border-border bg-paper p-6">
              <p className="text-sm font-bold text-terracotta">2026/12/03（週四）</p>
              <h3 className="mt-3 text-2xl font-black">晚間雜事衝刺</h3>
              <p className="mt-2 text-muted">21:00–21:50 · 還有 3 個名額</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button type="button" className="min-h-11 rounded-lg bg-terracotta px-5 py-2 font-bold text-ink">預約這場</button>
                <button type="button" className="min-h-11 rounded-lg border border-border-d px-5 py-2 font-bold">加入行事曆</button>
              </div>
            </article>

            <section className="rounded-lg border border-border bg-paper p-6" aria-label="表單範例">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-forest">本場待辦</p>
                  <h3 className="mt-1 text-2xl font-black">今晚想推進什麼？</h3>
                </div>
                <span className="text-sm font-bold text-muted">1 / 3</span>
              </div>
              <label className="mt-6 block text-sm font-bold" htmlFor="key-vision-task">待辦名稱</label>
              <input id="key-vision-task" readOnly value="整理保單資料" className="mt-2 min-h-12 w-full rounded-lg border border-border-d bg-white px-4 text-ink" />
              <div className="mt-4 flex items-center gap-3 rounded-lg bg-cream p-4">
                <span className="flex size-5 items-center justify-center rounded border border-border-d bg-white text-xs text-forest">✓</span>
                <span className="font-bold">回覆房東確認維修時間</span>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="bg-[#171412] px-[5%] py-14 text-white sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold text-[#9CCDB8]">04 / FOCUS ROOM</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black">深色房間，同一個品牌。</h2>
              <p className="mt-3 text-sm leading-7 text-white/60">功能場景可以變暗，但橘色、綠色、字體與控制方式維持一致。</p>
            </div>
            <span className="rounded-full bg-[#DFF0E9] px-3 py-1 text-xs font-bold text-forest">專注中 · 49:55</span>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-[1.4fr_.8fr]">
            <div className="grid min-h-72 grid-cols-2 gap-3 rounded-lg border border-white/15 bg-[#26221F] p-4">
              {["你", "芯", "岳", "婷"].map((name, index) => (
                <div key={name} className={`flex items-center justify-center rounded-lg border ${index === 0 ? "border-terracotta" : "border-white/15"}`}>
                  <span className={`flex size-14 items-center justify-center rounded-full text-xl font-black ${index === 0 ? "bg-[#FFD3C8] text-[#A93822]" : "bg-[#DFF0E9] text-forest"}`}>{name}</span>
                </div>
              ))}
            </div>
            <aside className="rounded-lg bg-paper p-5 text-ink">
              <div className="flex gap-2 border-b border-border pb-4">
                <span className="rounded-full bg-forest px-4 py-2 text-sm font-bold text-white">本場待辦</span>
                <span className="rounded-full px-4 py-2 text-sm font-bold text-forest">本場聊天</span>
              </div>
              <p className="mt-5 text-sm font-bold text-terracotta">本場承諾</p>
              <p className="mt-1 text-2xl font-black">1 / 3 已完成</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-border"><div className="h-full w-1/3 bg-forest" /></div>
              <button type="button" className="mt-7 min-h-11 w-full rounded-lg bg-terracotta px-5 py-2 font-bold text-ink">更新進度</button>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-cream px-[5%] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold text-terracotta">05 / NAVIGATION & CTA</p>
          <h2 className="mt-2 text-3xl font-black">選單與收尾，也使用同一套規則。</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
            <section className="rounded-lg border border-border bg-paper p-5" aria-label="手機選單範例">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <Logo />
                <button type="button" aria-label="關閉選單" className="flex size-11 items-center justify-center rounded-lg border border-border-d text-xl">×</button>
              </div>
              <nav className="mt-4 grid gap-1" aria-label="選單範例">
                <span className="rounded-lg bg-terracotta-lt px-4 py-3 font-bold text-terracotta">可預約場次</span>
                <span className="rounded-lg px-4 py-3 font-bold text-muted">我的場次</span>
                <span className="rounded-lg px-4 py-3 font-bold text-muted">待辦清單</span>
              </nav>
              <button type="button" className="mt-4 min-h-11 w-full rounded-lg border border-border-d px-4 font-bold">帳號設定</button>
            </section>

            <section className="rounded-lg border border-border bg-paper p-6 sm:p-8" aria-label="頁尾行動呼籲範例">
              <p className="text-sm font-bold text-forest">有件事，已經想很久了嗎？</p>
              <h3 className="mt-3 text-4xl font-black leading-tight">這次，一起開始就好。</h3>
              <p className="mt-4 max-w-xl leading-7 text-muted">不用先變得很有自制力。選一場適合的時間，帶著那件事進來。</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button type="button" className="min-h-12 rounded-lg bg-terracotta px-6 py-3 font-bold text-ink">免費加入雜事房</button>
                <button type="button" className="min-h-12 rounded-lg border border-border-d px-6 py-3 font-bold text-ink">查看近期場次</button>
              </div>
            </section>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-paper px-[5%] py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <Logo />
          <Link href="/" className="text-sm font-bold text-muted underline decoration-border-d underline-offset-4">返回目前首頁</Link>
        </div>
      </footer>
    </main>
  );
}
