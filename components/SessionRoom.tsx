"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "./Logo";

type RoomTask = {
  id: number;
  title: string;
  category: string;
  done: boolean;
};

const initialTasks: RoomTask[] = [
  { id: 1, title: "補齊所得稅延期申報資料", category: "財務", done: false },
  { id: 2, title: "預約牙醫洗牙", category: "健康醫療", done: false },
  { id: 3, title: "回覆房東確認冷氣維修時間", category: "臨時事項", done: false }
];

const participants = [
  ["你", "bg-terracotta-lt text-terracotta"],
  ["芯", "bg-forest-lt text-forest"],
  ["岳", "bg-lavender-lt text-lavender"],
  ["婷", "bg-amberish-lt text-amberish"],
  ["威", "bg-cream-dd text-muted"],
  ["品", "bg-terracotta-lt text-terracotta"]
] as const;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function SessionRoom() {
  const [tasks, setTasks] = useState(initialTasks);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(50 * 60);

  const completedCount = tasks.filter((task) => task.done).length;
  const progress = useMemo(() => Math.round((completedCount / tasks.length) * 100), [completedCount, tasks.length]);

  useEffect(() => {
    if (!started || ended) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [started, ended]);

  function toggleTask(taskId: number) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task))
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between px-[5%]">
          <Logo />
          <nav className="flex items-center gap-3 text-sm">
            <Link className="rounded-full border border-border px-4 py-2 font-semibold text-muted no-underline hover:border-muted" href="/tasks">
              待辦事項
            </Link>
            <Link className="rounded-full bg-terracotta-lt px-4 py-2 font-bold text-terracotta no-underline" href="/sessions">
              場次
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-[5%] py-6">
        <section className="mb-5 flex items-center justify-between gap-4 max-[760px]:block">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[.1em] text-terracotta">晚間雜事衝刺</div>
            <h1 className="font-serif text-3xl font-black leading-tight tracking-normal">今晚 21:00 - 21:50</h1>
          </div>
          <div className="mt-4 flex items-center gap-3 max-[760px]:justify-between">
            <div className="rounded-xl bg-white px-4 py-2 text-center shadow-soft">
              <div className="font-mono text-2xl font-black tracking-normal text-ink">{formatTime(secondsLeft)}</div>
              <div className="text-xs text-light">{started ? "剩餘時間" : "尚未開始"}</div>
            </div>
            {!started ? (
              <button className="rounded-full bg-terracotta px-5 py-3 text-sm font-bold text-white hover:bg-terracotta-d" type="button" onClick={() => setStarted(true)}>
                開始場次
              </button>
            ) : (
              <button className="rounded-full border border-border px-5 py-3 text-sm font-bold text-muted hover:border-muted hover:text-ink" type="button" onClick={() => setEnded(true)}>
                結束場次
              </button>
            )}
          </div>
        </section>

        <div className="grid grid-cols-[minmax(0,1fr)_360px] gap-5 max-[1080px]:grid-cols-1">
          <section className="rounded-2xl border-[1.5px] border-border bg-[#171412] p-4 shadow-lift">
            <div className="mb-3 flex items-center justify-between text-sm text-white/70">
              <span>{started ? "場次進行中" : "等待開始"}</span>
              <span>Daily / LiveKit video slot</span>
            </div>
            <div className="grid min-h-[520px] grid-cols-3 gap-3 max-[900px]:min-h-0 max-[900px]:grid-cols-2">
              {participants.map(([name, className], index) => (
                <div
                  className={`flex min-h-[150px] flex-col items-center justify-center rounded-xl border border-white/10 ${
                    index === 0 ? "bg-white/[.12]" : "bg-white/[.06]"
                  }`}
                  key={name}
                >
                  <div className={`mb-3 flex size-14 items-center justify-center rounded-full text-lg font-black ${className}`}>{name}</div>
                  <div className="text-sm font-bold text-white">{index === 0 ? "你" : `${name} 的雜事時間`}</div>
                  <div className="mt-1 text-xs text-white/45">{index === 0 ? "鏡頭預覽區" : "已加入"}</div>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-2xl border-[1.5px] border-border bg-white p-5 shadow-lift">
            <div className="mb-5">
              <div className="mb-1 text-xs font-bold uppercase tracking-[.1em] text-terracotta">本場承諾</div>
              <h2 className="font-serif text-2xl font-black">{completedCount} / {tasks.length} 已完成</h2>
              <div className="mt-3 h-2 overflow-hidden rounded bg-cream-d">
                <div className="h-full rounded bg-forest transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="mb-5 grid gap-2">
              {tasks.map((task) => (
                <button
                  className={`grid grid-cols-[24px_minmax(0,1fr)] gap-3 rounded-xl border p-3 text-left transition-colors ${
                    task.done ? "border-forest/30 bg-forest-lt" : "border-border bg-cream hover:border-border-d"
                  }`}
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  key={task.id}
                >
                  <span
                    className={`mt-0.5 flex size-5 items-center justify-center rounded-md border text-xs font-black ${
                      task.done ? "border-forest bg-forest text-white" : "border-border bg-white text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-sm font-bold ${task.done ? "text-forest line-through" : "text-ink"}`}>{task.title}</span>
                    <span className="mt-1 block text-xs text-light">{task.category}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-cream p-3 text-sm leading-[1.6] text-muted">
              場次結束時，完成的事項會進入封存；沒完成的會回到待辦清單。
            </div>
          </aside>
        </div>
      </div>

      {ended ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 px-4">
          <div className="w-full max-w-[440px] rounded-2xl border-[1.5px] border-border bg-white p-6 shadow-lift">
            <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-forest-lt text-xl font-black text-forest">✓</div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[.1em] text-terracotta">場次結束</div>
            <h2 className="mb-2 font-serif text-3xl font-black leading-tight tracking-normal">
              你完成了 {completedCount} / {tasks.length} 件
            </h2>
            <p className="mb-5 text-sm leading-[1.7] text-muted">
              已完成的雜事會封存，沒做完的可以留到下一場。
            </p>
            <div className="mb-5 grid gap-2">
              {tasks.map((task) => (
                <div className={`rounded-xl px-3 py-2 text-sm font-semibold ${task.done ? "bg-forest-lt text-forest" : "bg-cream text-muted"}`} key={task.id}>
                  {task.done ? "完成：" : "保留："}{task.title}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Link className="flex-1 rounded-full bg-terracotta px-4 py-3 text-center text-sm font-bold text-white no-underline hover:bg-terracotta-d" href="/tasks">
                回待辦事項
              </Link>
              <button
                className="flex-1 rounded-full border border-border px-4 py-3 text-sm font-bold text-muted hover:border-muted hover:text-ink"
                type="button"
                onClick={() => setEnded(false)}
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
