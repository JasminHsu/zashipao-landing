import Link from "next/link";
import { Logo } from "./Logo";
import { SessionTaskEditor } from "./SessionTaskEditor";

import { upcomingSessions } from "./sessionData";

const completedSessions = [
  {
    title: "雜事衝刺場",
    date: "2026/05/10（週日）",
    time: "21:00 - 21:50",
    summary: "完成 2 件，1 件留到下次",
    tasks: ["取消重複訂閱", "整理五月收據"]
  }
];

export function MySessions() {
  return (
    <main className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between px-[5%]">
          <Logo />
          <nav className="flex items-center gap-3 text-sm">
            <Link className="rounded-full bg-terracotta-lt px-4 py-2 font-bold text-terracotta no-underline" href="/my-sessions">
              我的場次
            </Link>
            <Link className="rounded-full border border-border px-4 py-2 font-semibold text-muted no-underline hover:border-muted" href="/sessions">
              預約場次
            </Link>
            <Link className="rounded-full border border-border px-4 py-2 font-semibold text-muted no-underline hover:border-muted" href="/tasks">
              待辦清單
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-[5%] py-8">
        <section className="mb-6 flex items-end justify-between gap-5 max-[760px]:block">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[.1em] text-terracotta">我的場次</div>
            <h1 className="font-serif text-4xl font-black leading-tight tracking-normal">接下來的場次</h1>
            <p className="mt-2 max-w-[640px] text-[.96rem] leading-[1.7] text-muted">
              已預約的場次會在這裡，可隨時編輯待辦事項。等候區於活動開始前五分鐘開放。
            </p>
          </div>
          <Link
            className="mt-4 inline-flex rounded-full bg-terracotta px-5 py-3 text-sm font-bold text-white no-underline hover:bg-terracotta-d"
            href="/sessions"
          >
            預約新場次
          </Link>
        </section>

        <section className="grid gap-3">
          {upcomingSessions.map((session) => (
            <article id={session.id} className="scroll-mt-20 rounded-2xl border-[1.5px] border-border bg-white p-5 shadow-soft" key={`${session.date}-${session.time}`}>
              <div className="grid grid-cols-[220px_minmax(0,1fr)_auto] gap-5 max-[760px]:grid-cols-1">
                <div>
                  <div className="whitespace-nowrap font-serif text-[1.35rem] font-black text-ink">{session.date}</div>
                  <div className="mt-1 text-sm font-bold text-muted">{session.time}</div>
                </div>
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold">{session.title}</h2>
                  </div>
                  <SessionTaskEditor sessionId={`${session.date}-${session.time}`} initialTasks={session.tasks} />
                </div>
                <div className="flex items-center">
                  {session.canEnterWaiting ? (
                    <Link
                      className="rounded-full bg-terracotta px-5 py-3 text-sm font-bold text-white no-underline hover:bg-terracotta-d"
                      href="/sessions/waiting/demo"
                    >
                      進入等候區
                    </Link>
                  ) : (
                    <button
                      className="cursor-not-allowed rounded-full border border-border px-5 py-3 text-sm font-bold text-light"
                      disabled
                      type="button"
                    >
                      尚未開放
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-serif text-2xl font-black">已完成場次</h2>
          <div className="grid gap-3">
            {completedSessions.map((session) => (
              <article className="rounded-2xl border-[1.5px] border-border bg-white/70 p-5" key={`${session.date}-${session.time}`}>
                <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-5 max-[760px]:grid-cols-1">
                  <div>
                    <div className="whitespace-nowrap font-serif text-[1.2rem] font-black text-muted">{session.date}</div>
                    <div className="mt-1 text-sm font-bold text-light">{session.time}</div>
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-muted">{session.title}</h3>
                      <span className="rounded bg-forest-lt px-2 py-0.5 text-xs font-bold text-forest">已完成</span>
                    </div>
                    <div className="text-sm font-semibold text-muted">{session.summary}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {session.tasks.map((task) => (
                        <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-light" key={task}>
                          {task}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
