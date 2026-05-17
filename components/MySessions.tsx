import Link from "next/link";
import { Logo } from "./Logo";

const upcomingSessions = [
  {
    title: "晚間雜事衝刺",
    day: "今晚",
    time: "21:00 - 21:50",
    status: "等候區已開放",
    tasks: ["補齊所得稅延期申報資料", "預約牙醫洗牙"],
    canEnterWaiting: true
  },
  {
    title: "午休生活行政快攻",
    day: "明日午休",
    time: "12:00 - 12:50",
    status: "開場前 5 分鐘開放",
    tasks: ["更新護照照片預約"],
    canEnterWaiting: false
  }
];

export function MySessions() {
  return (
    <main className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between px-[5%]">
          <Logo />
          <nav className="flex items-center gap-3 text-sm">
            <Link className="rounded-full border border-border px-4 py-2 font-semibold text-muted no-underline hover:border-muted" href="/tasks">
              待辦事項
            </Link>
            <Link className="rounded-full bg-terracotta-lt px-4 py-2 font-bold text-terracotta no-underline" href="/my-sessions">
              我的場次
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-[5%] py-8">
        <section className="mb-6">
          <div className="mb-2 text-xs font-bold uppercase tracking-[.1em] text-terracotta">我的場次</div>
          <h1 className="font-serif text-4xl font-black leading-tight tracking-normal">接下來要出現在哪裡</h1>
          <p className="mt-2 max-w-[640px] text-[.96rem] leading-[1.7] text-muted">
            已預約的場次會在這裡。開場前 5 分鐘可以進等候區，再確認一次這場真的要做什麼。
          </p>
        </section>

        <section className="grid gap-3">
          {upcomingSessions.map((session) => (
            <article className="rounded-2xl border-[1.5px] border-border bg-white p-5 shadow-soft" key={`${session.day}-${session.time}`}>
              <div className="grid grid-cols-[140px_minmax(0,1fr)_auto] gap-5 max-[760px]:grid-cols-1">
                <div>
                  <div className="font-serif text-2xl font-black text-ink">{session.time}</div>
                  <div className="mt-1 text-sm text-light">{session.day}</div>
                </div>
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold">{session.title}</h2>
                    <span className={`rounded px-2 py-0.5 text-xs font-bold ${session.canEnterWaiting ? "bg-forest-lt text-forest" : "bg-cream-dd text-muted"}`}>
                      {session.status}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2">
                    {session.tasks.map((task) => (
                      <div className="rounded-xl bg-cream px-3 py-2 text-sm font-semibold text-muted" key={task}>
                        {task}
                      </div>
                    ))}
                  </div>
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
      </div>
    </main>
  );
}
