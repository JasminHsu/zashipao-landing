"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "./ButtonLink";

const avatars = [
  ["宇", "bg-terracotta-lt text-terracotta"],
  ["芯", "bg-forest-lt text-forest"],
  ["岳", "bg-lavender-lt text-lavender"],
  ["婷", "bg-amberish-lt text-amberish"],
  ["彥", "bg-terracotta-lt text-terracotta"]
] as const;

const tasks = [
  {
    avatar: "宇",
    avatarClass: "bg-terracotta-lt text-terracotta",
    name: "申辦數位部節能補助",
    delay: "拖延 45 天",
    delayClass: "bg-[#FEE8E8] text-[#C13B3B]",
    category: "文件行政"
  },
  {
    avatar: "芯",
    avatarClass: "bg-forest-lt text-forest",
    name: "更新護照照片預約",
    delay: "拖延 22 天",
    delayClass: "bg-amberish-lt text-amberish",
    category: "生活行政"
  },
  {
    avatar: "岳",
    avatarClass: "bg-lavender-lt text-lavender",
    name: "整理健保卡與家人保單",
    delay: "拖延 8 天",
    delayClass: "bg-cream-dd text-muted",
    category: "健康醫療"
  },
  {
    avatar: "婷",
    avatarClass: "bg-amberish-lt text-amberish",
    name: "退 iHerb 訂單與填問卷",
    delay: "拖延 14 天",
    delayClass: "bg-amberish-lt text-amberish",
    category: "購物財務"
  }
];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function Hero() {
  const [secondsLeft, setSecondsLeft] = useState(32 * 60 + 47);
  const [liveCount, setLiveCount] = useState(12);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const counter = window.setInterval(() => {
      setLiveCount((current) => {
        if (Math.random() >= 0.3) return current;
        return Math.max(8, current + (Math.random() < 0.6 ? 1 : -1));
      });
    }, 4000);

    return () => window.clearInterval(counter);
  }, []);

  return (
    <section className="px-0 py-0">
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-14 px-[6%] py-14 pt-20 max-[900px]:grid-cols-1 max-[900px]:px-[5%] max-[900px]:py-12">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-terracotta/20 bg-terracotta-lt px-3.5 py-1.5 text-xs font-semibold text-terracotta">
            <span className="size-[7px] animate-blink rounded-full bg-terracotta" />
            現在有 <strong>{liveCount}</strong> 人正在完成雜事
          </div>
          <h1 className="mb-5 font-serif text-5xl font-black leading-[1.22] tracking-normal max-[900px]:text-4xl">
            把一直
            <br />
            拖著的事，
            <br />
            <em className="not-italic text-terracotta">今天一起做完</em>
          </h1>
          <p className="mb-8 max-w-[440px] text-[1.05rem] leading-[1.75] text-muted">
            加入線上共事場次，在 50 分鐘內完成那些你清單上
            <br />
            永遠排不到的生活雜事。
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/signup" className="px-7 py-3 text-base font-bold">
              免費加入，今天就開始
            </ButtonLink>
            <ButtonLink href="#sessions" variant="outline" className="px-6 py-[.7rem] text-[.95rem]">
              看今日場次 →
            </ButtonLink>
          </div>
          <div className="mt-7 flex items-center gap-2 text-sm text-light">
            <div className="flex">
              {avatars.map(([label, className]) => (
                <span
                  className={`-mr-2 flex size-[22px] items-center justify-center rounded-full border-2 border-cream text-[.6rem] font-bold ${className}`}
                  key={label}
                >
                  {label}
                </span>
              ))}
            </div>
            <span>
              <strong className="text-muted">1,200+ 人</strong>已完成共 8,400 件雜事
            </span>
          </div>
        </div>

        <div className="relative max-[900px]:hidden">
          <div className="absolute -right-4 -top-4 z-10 flex whitespace-nowrap rounded-xl border-[1.5px] border-border bg-white px-3.5 py-2 text-sm shadow-soft">
            <span className="mr-2">🔥</span>
            <span>
              <strong>7 週</strong>連續完成記錄
            </span>
          </div>
          <div className="rounded-xl2 border-[1.5px] border-border bg-white p-6 shadow-lift">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 rounded-full bg-forest-lt px-3 py-1 text-xs font-semibold text-forest">
                <span className="size-1.5 animate-blink rounded-full bg-forest" />
                進行中
              </div>
              <div className="rounded-lg bg-cream-d px-2.5 py-1 font-mono text-base font-bold tracking-normal text-ink">
                {formatTime(secondsLeft)}
              </div>
            </div>
            <div className="mb-1 font-serif text-base font-bold">晚間雜事衝刺 #3</div>
            <div className="mb-5 text-xs text-light">21:00 – 21:50 · 今日 · 6 / 8 人參與</div>
            <ul className="flex list-none flex-col gap-2">
              {tasks.map((task) => (
                <li className="flex items-start gap-3 rounded-lg bg-cream p-3" key={task.name}>
                  <div className={`flex size-[30px] shrink-0 items-center justify-center rounded-full text-[.63rem] font-bold ${task.avatarClass}`}>
                    {task.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 text-sm font-medium leading-tight">{task.name}</div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`rounded px-1.5 py-0.5 text-[.68rem] font-semibold ${task.delayClass}`}>
                        {task.delay}
                      </span>
                      <span className="text-[.68rem] text-light">{task.category}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-cream-d pt-4">
              <span className="text-sm text-muted">還有 2 個名額</span>
              <ButtonLink href="/signup" className="px-4 py-1.5 text-xs">
                加入這場次
              </ButtonLink>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-9 flex whitespace-nowrap rounded-xl border-[1.5px] border-border bg-white px-3.5 py-2 text-sm shadow-soft">
            <span className="mr-2 flex size-5 items-center justify-center rounded-full bg-forest-lt text-xs font-bold text-forest">✓</span>
            <span>庭慧 剛完成了「申報綜所稅」</span>
          </div>
        </div>
      </div>
    </section>
  );
}
