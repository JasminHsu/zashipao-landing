"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Logo } from "./Logo";

type Priority = "now" | "soon" | "quick" | "later" | "split";
type BookingStep = "sessions" | "commitment";

type Session = {
  id: string;
  time: string;
  endTime: string;
  day: string;
  title: string;
  tone: string;
  spots: string;
  status: "open" | "live" | "almost";
  tags: string[];
};

type BookableTask = {
  id: number;
  title: string;
  category: string;
  priority: Priority;
  deadline: string;
  source: "list" | "adHoc";
};

type SessionBookingProps = {
  initialStep?: BookingStep;
};

const sessions: Session[] = [
  {
    id: "evening-21",
    time: "21:00",
    endTime: "21:50",
    day: "今晚",
    title: "晚間雜事衝刺",
    tone: "下班後，把今天一直避開的事收掉",
    spots: "6 / 8 人",
    status: "open",
    tags: ["文件行政", "健康醫療", "財務"]
  },
  {
    id: "night-22",
    time: "22:00",
    endTime: "22:50",
    day: "今晚",
    title: "睡前清空場",
    tone: "適合小事連發：預約、回覆、退款、整理",
    spots: "3 / 8 人",
    status: "open",
    tags: ["購物退款", "家務整理"]
  },
  {
    id: "morning-07",
    time: "07:00",
    endTime: "07:50",
    day: "明早",
    title: "出門前做一件事",
    tone: "用一件小事開局，不把雜事帶進白天",
    spots: "2 / 8 人",
    status: "almost",
    tags: ["文件行政", "家庭行政"]
  },
  {
    id: "lunch-12",
    time: "12:00",
    endTime: "12:50",
    day: "明日午休",
    title: "午休生活行政快攻",
    tone: "50 分鐘，處理那些要打電話或填表的事",
    spots: "5 / 8 人",
    status: "open",
    tags: ["健康醫療", "財務"]
  }
];

const initialTasks: BookableTask[] = [
  {
    id: 1,
    title: "補齊所得稅延期申報資料",
    category: "財務",
    priority: "now",
    deadline: "2026-05-24",
    source: "list"
  },
  {
    id: 2,
    title: "更新護照照片預約",
    category: "文件行政",
    priority: "soon",
    deadline: "2026-06-05",
    source: "list"
  },
  {
    id: 3,
    title: "退 iHerb 重複訂單",
    category: "購物退款",
    priority: "soon",
    deadline: "2026-05-20",
    source: "list"
  },
  {
    id: 4,
    title: "預約牙醫洗牙",
    category: "健康醫療",
    priority: "quick",
    deadline: "2026-05-30",
    source: "list"
  },
  {
    id: 5,
    title: "研究媽媽保單內容並做摘要",
    category: "家庭行政",
    priority: "split",
    deadline: "2026-05-28",
    source: "list"
  }
];

const priorityStyle: Record<Priority, { label: string; className: string; sort: number }> = {
  now: { label: "先做", className: "bg-terracotta-lt text-terracotta", sort: 1 },
  soon: { label: "快到期", className: "bg-[#FCEBEB] text-[#E24B4A]", sort: 2 },
  quick: { label: "順手", className: "bg-forest-lt text-forest", sort: 3 },
  split: { label: "拆小", className: "bg-lavender-lt text-lavender", sort: 4 },
  later: { label: "晚點", className: "bg-cream-dd text-muted", sort: 5 }
};

const statusCopy = {
  open: "可預約",
  live: "進行中",
  almost: "快滿"
};

export function SessionBooking({ initialStep = "sessions" }: SessionBookingProps) {
  const [step, setStep] = useState<BookingStep>(initialStep);
  const [selectedSessionId, setSelectedSessionId] = useState(sessions[0].id);
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([1, 4]);
  const [adHocTitle, setAdHocTitle] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const selectedSession = sessions.find((session) => session.id === selectedSessionId) ?? sessions[0];
  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => priorityStyle[a.priority].sort - priorityStyle[b.priority].sort),
    [tasks]
  );
  const selectedTasks = tasks.filter((task) => selectedTaskIds.includes(task.id));
  const hardTaskSelected = selectedTasks.some((task) => task.priority === "split");
  const selectionFeelsHeavy = selectedTasks.length > 3 || (hardTaskSelected && selectedTasks.length > 1);

  function toggleTask(taskId: number) {
    setConfirmed(false);
    setSelectedTaskIds((current) =>
      current.includes(taskId) ? current.filter((id) => id !== taskId) : [...current, taskId]
    );
  }

  function chooseSession(sessionId: string) {
    setSelectedSessionId(sessionId);
    setConfirmed(false);
    setStep("commitment");
  }

  function addAdHocTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = adHocTitle.trim();
    if (!trimmedTitle) return;

    const task: BookableTask = {
      id: Date.now(),
      title: trimmedTitle,
      category: "臨時事項",
      priority: "quick",
      deadline: "2026-05-17",
      source: "adHoc"
    };

    setTasks((current) => [task, ...current]);
    setSelectedTaskIds((current) => [task.id, ...current]);
    setAdHocTitle("");
    setConfirmed(false);
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

      <div className="mx-auto max-w-6xl px-[5%] py-8">
        <div className="mb-6 flex gap-2 text-sm">
          <span className={`rounded-full px-3 py-1.5 font-bold ${step === "sessions" ? "bg-terracotta text-white" : "bg-terracotta-lt text-terracotta"}`}>
            1 選場次
          </span>
          <span className={`rounded-full px-3 py-1.5 font-bold ${step === "commitment" ? "bg-terracotta text-white" : "bg-cream-d text-muted"}`}>
            2 選這場要做什麼
          </span>
        </div>

        {step === "sessions" ? (
          <>
            <section className="mb-6">
              <div>
                <div className="mb-2 text-xs font-bold uppercase tracking-[.1em] text-terracotta">預約場次</div>
                <h1 className="font-serif text-4xl font-black leading-tight tracking-normal">先選你要出現的時間</h1>
                <p className="mt-2 max-w-[650px] text-[.96rem] leading-[1.7] text-muted">
                  選好場次後，下一步再挑這場要處理的雜事，也可以臨時加一件。
                </p>
              </div>
            </section>

            <section className="grid gap-3">
              {sessions.map((session) => (
                <article className="rounded-2xl border-[1.5px] border-border bg-white p-5 transition-all hover:border-terracotta hover:shadow-soft" key={session.id}>
                  <div className="grid grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-4 max-[640px]:grid-cols-[68px_minmax(0,1fr)]">
                    <div className="text-center">
                      <div className="font-serif text-2xl font-black leading-none text-ink">{session.time}</div>
                      <div className="mt-1 text-xs text-light">{session.day}</div>
                      <div className="mt-1 text-xs font-semibold text-muted">到 {session.endTime}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-bold">{session.title}</h2>
                        <span className="rounded bg-forest-lt px-2 py-0.5 text-xs font-bold text-forest">{statusCopy[session.status]}</span>
                      </div>
                      <p className="mb-2 text-sm leading-[1.5] text-muted">{session.tone}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {session.tags.map((tag) => (
                          <span className="rounded bg-cream-dd px-2 py-0.5 text-xs font-semibold text-muted" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right max-[640px]:col-span-2 max-[640px]:text-left">
                      <div className="mb-3 text-sm font-bold text-muted">{session.spots}</div>
                      <button
                        className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-bold text-white hover:bg-terracotta-d"
                        type="button"
                        onClick={() => chooseSession(session.id)}
                      >
                        選這場
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </>
        ) : (
          <section className="grid grid-cols-[minmax(0,1fr)_340px] gap-5 max-[960px]:grid-cols-1">
            <div>
              <button className="mb-5 text-sm font-bold text-muted hover:text-ink" type="button" onClick={() => setStep("sessions")}>
                ← 換一個場次
              </button>
              <div className="mb-5 rounded-2xl border-[1.5px] border-terracotta bg-white p-5 shadow-soft">
                <div className="mb-1 text-xs font-bold uppercase tracking-[.1em] text-terracotta">
                  {selectedSession.day} {selectedSession.time} - {selectedSession.endTime}
                </div>
                <h1 className="font-serif text-3xl font-black leading-tight tracking-normal">這場要處理什麼？</h1>
                <p className="mt-2 text-sm leading-[1.7] text-muted">
                  從清單選，也可以直接加一件臨時冒出來的小事。
                </p>
              </div>

              <form className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] gap-2 rounded-2xl border-[1.5px] border-border bg-white p-3" onSubmit={addAdHocTask}>
                <input
                  className="min-h-11 rounded-xl border-[1.5px] border-border bg-cream px-4 text-sm outline-none placeholder:text-light focus:border-terracotta"
                  value={adHocTitle}
                  onChange={(event) => setAdHocTitle(event.target.value)}
                  placeholder="臨時想到的事，例如：回覆房東、取消訂閱"
                />
                <button className="rounded-full bg-terracotta px-5 text-sm font-bold text-white hover:bg-terracotta-d" type="submit">
                  加到本場
                </button>
              </form>

              <div className="grid gap-2">
                {sortedTasks.map((task) => {
                  const checked = selectedTaskIds.includes(task.id);
                  const priority = priorityStyle[task.priority];

                  return (
                    <button
                      className={`grid grid-cols-[24px_minmax(0,1fr)] gap-3 rounded-xl border p-3 text-left transition-colors ${
                        checked ? "border-terracotta bg-terracotta-lt/40" : "border-border bg-white hover:border-border-d"
                      }`}
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      key={task.id}
                    >
                      <span
                        className={`mt-0.5 flex size-5 items-center justify-center rounded-md border text-xs font-black ${
                          checked ? "border-terracotta bg-terracotta text-white" : "border-border bg-cream text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span className="min-w-0">
                        <span className="mb-1 flex items-center gap-2">
                          <span className={`rounded px-1.5 py-0.5 text-[.68rem] font-bold ${priority.className}`}>{priority.label}</span>
                          <span className="text-xs text-light">{task.category}</span>
                          {task.source === "adHoc" ? <span className="rounded bg-cream-dd px-1.5 py-0.5 text-[.68rem] font-bold text-muted">臨時</span> : null}
                        </span>
                        <span className="block truncate text-sm font-bold">{task.title}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <aside className="h-fit rounded-2xl border-[1.5px] border-border bg-white p-5 shadow-lift">
              <div className="mb-4">
                <div className="mb-1 text-xs font-bold uppercase tracking-[.1em] text-terracotta">本場承諾</div>
                <h2 className="font-serif text-2xl font-black">{selectedTasks.length} 件雜事</h2>
              </div>

              <div className="mb-4 grid gap-2">
                {selectedTasks.length ? (
                  selectedTasks.map((task) => (
                    <div className="rounded-xl border border-border bg-cream p-3" key={task.id}>
                      <div className="text-sm font-bold">{task.title}</div>
                      <div className="mt-1 text-xs text-light">{task.category}</div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-border bg-cream p-4 text-sm text-muted">
                    還沒選。至少放一件事進來，這場才有明確目標。
                  </div>
                )}
              </div>

              {selectionFeelsHeavy ? (
                <div className="mb-4 rounded-xl border border-[#E24B4A]/20 bg-[#FCEBEB] p-3 text-sm leading-[1.6] text-[#B63C3C]">
                  這場看起來有點滿。建議保留最重要的一到三件。
                </div>
              ) : (
                <div className="mb-4 rounded-xl border border-forest/20 bg-forest-lt p-3 text-sm leading-[1.6] text-forest">
                  這個承諾很清楚。開始前可以貼到場次公告。
                </div>
              )}

              <button
                className="w-full rounded-full bg-terracotta px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-px hover:bg-terracotta-d disabled:cursor-not-allowed disabled:bg-light"
                disabled={!selectedTaskIds.length}
                type="button"
                onClick={() => setConfirmed(true)}
              >
                確認預約
              </button>

            </aside>
          </section>
        )}
      </div>

      {confirmed ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 px-4">
          <div className="w-full max-w-[440px] rounded-2xl border-[1.5px] border-border bg-white p-6 shadow-lift">
            <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-forest-lt text-xl font-black text-forest">✓</div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[.1em] text-terracotta">預約完成</div>
            <h2 className="mb-2 font-serif text-3xl font-black leading-tight tracking-normal">
              {selectedSession.day} {selectedSession.time} - {selectedSession.endTime}
            </h2>
            <p className="mb-4 text-sm leading-[1.7] text-muted">
              這場會帶著 {selectedTasks.length} 件雜事進場。開始前可以再回來調整本場承諾。
            </p>
            <div className="mb-5 grid gap-2">
              {selectedTasks.map((task) => (
                <div className="rounded-xl bg-cream px-3 py-2 text-sm font-semibold" key={task.id}>
                  {task.title}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 rounded-full bg-terracotta px-4 py-3 text-sm font-bold text-white hover:bg-terracotta-d"
                type="button"
                onClick={() => setStep("sessions")}
              >
                回場次
              </button>
              <button
                className="flex-1 rounded-full border border-border px-4 py-3 text-sm font-bold text-muted hover:border-muted hover:text-ink"
                type="button"
                onClick={() => setConfirmed(false)}
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
