import { ButtonLink } from "./ButtonLink";
import { SectionHeading } from "./SectionHeading";

const sessions = [
  {
    time: "21:00",
    day: "今晚 · 進行中",
    title: "晚間雜事衝刺 #3",
    live: true,
    tags: [
      ["文件行政", "bg-lavender-lt text-lavender"],
      ["健康醫療", "bg-forest-lt text-forest"],
      ["其他", "bg-cream-dd text-muted"]
    ],
    spots: "6 / 8 人",
    fill: "75%",
    cta: "立即加入",
    href: "/signup"
  },
  {
    time: "22:00",
    day: "今晚",
    title: "睡前雜事清空場",
    live: false,
    tags: [
      ["財務", "bg-terracotta-lt text-terracotta"],
      ["購物退款", "bg-cream-dd text-muted"]
    ],
    spots: "3 / 8 人",
    fill: "37%",
    cta: "預約",
    href: "/signup"
  },
  {
    time: "07:00",
    day: "明日早晨",
    title: "晨間衝刺 — 出門前做一件事",
    live: false,
    tags: [
      ["文件行政", "bg-lavender-lt text-lavender"],
      ["家務", "bg-amberish-lt text-amberish"]
    ],
    spots: "2 / 8 人",
    fill: "25%",
    cta: "預約",
    href: "/signup"
  },
  {
    time: "12:00",
    day: "明日午休",
    title: "午休 50 分鐘 · 生活行政快攻",
    live: false,
    tags: [
      ["健康醫療", "bg-forest-lt text-forest"],
      ["財務", "bg-terracotta-lt text-terracotta"]
    ],
    spots: "5 / 8 人",
    fill: "62%",
    cta: "預約",
    href: "/signup"
  },
  {
    time: "10:00",
    day: "週六早晨",
    title: "週末雜事大清倉 ✦ 限量 12 人",
    live: false,
    tags: [
      ["家務", "bg-amberish-lt text-amberish"],
      ["文件", "bg-lavender-lt text-lavender"],
      ["醫療", "bg-forest-lt text-forest"],
      ["財務", "bg-terracotta-lt text-terracotta"]
    ],
    spots: "8 / 12 人",
    fill: "67%",
    cta: "預約",
    href: "/signup"
  }
] as const;

const delays = [
  {
    label: "申報所得稅（已申請延期）",
    width: "90%",
    color: "#E24B4A",
    days: "62 天",
    badge: "⚠ 很急",
    badgeClass: "bg-[#FCEBEB] text-[#E24B4A]"
  },
  {
    label: "更新護照（已快到期）",
    width: "66%",
    color: "#BA7517",
    days: "45 天",
    badge: "催一催",
    badgeClass: "bg-amberish-lt text-amberish"
  },
  {
    label: "預約健康檢查",
    width: "55%",
    color: "#BA7517",
    days: "38 天",
    badge: "催一催",
    badgeClass: "bg-amberish-lt text-amberish"
  },
  {
    label: "整理健保存摺",
    width: "32%",
    color: "#4A7260",
    days: "22 天",
    badge: "還好",
    badgeClass: "bg-forest-lt text-forest"
  },
  {
    label: "回覆表哥婚禮邀請",
    width: "16%",
    color: "#7062A3",
    days: "11 天",
    badge: "新加入",
    badgeClass: "bg-lavender-lt text-lavender"
  }
];

export function Sessions() {
  return (
    <section id="sessions" className="px-[6%] py-22">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex items-end justify-between gap-4 max-[720px]:items-start">
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-[.1em] text-terracotta">今日場次</div>
            <h2 className="m-0 font-serif text-3xl font-black leading-tight">今天就可以開始</h2>
          </div>
          <ButtonLink href="/signup" variant="outline" className="px-5 py-2">
            查看所有場次
          </ButtonLink>
        </div>

        <div className="rv flex flex-col gap-3">
          {sessions.map((session) => (
            <div
              className={`flex cursor-pointer items-center gap-6 rounded-xl border-[1.5px] p-5 transition-all duration-200 hover:border-terracotta hover:shadow-soft max-[780px]:grid max-[780px]:grid-cols-[auto_1fr] max-[780px]:gap-4 ${
                session.live ? "border-forest bg-forest-lt" : "border-border bg-white"
              }`}
              key={`${session.time}-${session.title}`}
            >
              <div className="min-w-[55px] text-center">
                <div className={`font-serif text-lg font-bold leading-none ${session.live ? "text-forest" : "text-ink"}`}>{session.time}</div>
                <div className="mt-1 text-xs text-light">{session.day}</div>
              </div>
              <div className="h-10 w-px bg-border max-[780px]:hidden" />
              <div className="flex-1 max-[780px]:col-span-2">
                <h3 className="mb-1.5 text-sm font-semibold">
                  {session.title}{" "}
                  {session.live ? (
                    <span className="rounded border border-forest/25 bg-forest-lt px-2 py-0.5 text-xs font-bold text-forest">直播中</span>
                  ) : null}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {session.tags.map(([tag, className]) => (
                    <span className={`rounded px-2 py-0.5 text-[.68rem] font-medium ${className}`} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="min-w-[90px] text-right max-[780px]:text-left">
                <div className="mb-1.5 text-xs text-muted">{session.spots}</div>
                <div className="h-1 overflow-hidden rounded bg-cream-d">
                  <div className="h-full rounded bg-terracotta" style={{ width: session.fill }} />
                </div>
              </div>
              <ButtonLink
                href={session.href}
                variant={session.live ? "primary" : "outline"}
                className="shrink-0 px-5 py-2 text-xs max-[780px]:justify-center"
              >
                {session.cta}
              </ButtonLink>
            </div>
          ))}
        </div>

        <div className="rv mt-10 rounded-xl2 border-[1.5px] border-border bg-white px-9 py-8">
          <div className="mb-6">
            <div className="mb-1 font-serif text-xl font-bold">你的雜事，到底拖了多久？</div>
            <div className="text-sm text-muted">雜事房替你記錄每一件事的「誕生日」，讓拖延指數一目瞭然</div>
          </div>
          <div className="flex flex-col gap-3.5">
            {delays.map((delay) => (
              <div className="flex items-center gap-5 max-[720px]:grid max-[720px]:grid-cols-[1fr_auto] max-[720px]:gap-2" key={delay.label}>
                <div className="min-w-[190px] truncate text-sm font-medium max-[720px]:col-span-2">{delay.label}</div>
                <div className="h-2 flex-1 overflow-hidden rounded bg-cream-d max-[720px]:col-span-2">
                  <div
                    className="delay-bar h-full origin-left scale-x-0 rounded transition-transform duration-700"
                    style={{ width: delay.width, background: delay.color }}
                  />
                </div>
                <div className="min-w-12 text-right text-sm font-bold" style={{ color: delay.color }}>
                  {delay.days}
                </div>
                <div className={`min-w-14 rounded px-2 py-0.5 text-center text-xs font-semibold ${delay.badgeClass}`}>{delay.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
