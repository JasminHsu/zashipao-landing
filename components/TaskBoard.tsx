"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Logo } from "./Logo";

type Priority = "now" | "soon" | "quick" | "later" | "split";
type Difficulty = "簡單" | "中等" | "困難";

type Task = {
  id: number;
  title: string;
  category: string;
  deadline: string;
  firstNoticed: string;
  difficulty: Difficulty;
  priority: Priority;
  archived?: boolean;
  note?: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "補齊所得稅延期申報資料",
    category: "財務",
    deadline: "2026-05-24",
    firstNoticed: "2026-03-16",
    difficulty: "中等",
    priority: "now",
    note: "先找扣繳憑單和去年申報資料"
  },
  {
    id: 2,
    title: "更新護照照片預約",
    category: "文件行政",
    deadline: "2026-06-05",
    firstNoticed: "2026-04-02",
    difficulty: "中等",
    priority: "soon",
    note: "查附近照相館，確認週末時間"
  },
  {
    id: 3,
    title: "預約牙醫洗牙",
    category: "健康醫療",
    deadline: "2026-05-30",
    firstNoticed: "2026-05-03",
    difficulty: "簡單",
    priority: "quick",
    note: "打電話或線上預約即可"
  },
  {
    id: 4,
    title: "整理五月份收據",
    category: "家務整理",
    deadline: "2026-06-15",
    firstNoticed: "2026-05-08",
    difficulty: "簡單",
    priority: "later"
  },
  {
    id: 5,
    title: "研究媽媽保單內容並做摘要",
    category: "家庭行政",
    deadline: "2026-05-28",
    firstNoticed: "2026-02-20",
    difficulty: "困難",
    priority: "split",
    note: "先拆成找文件、看保障、列問題"
  },
  {
    id: 6,
    title: "退 iHerb 重複訂單",
    category: "購物退款",
    deadline: "2026-05-20",
    firstNoticed: "2026-05-09",
    difficulty: "簡單",
    priority: "soon"
  }
];

const priorityStyle: Record<Priority, { label: string; shortLabel: string; className: string; rowClass: string; sort: number }> = {
  now: {
    label: "今天先做",
    shortLabel: "先做",
    className: "bg-terracotta-lt text-terracotta",
    rowClass: "border-l-terracotta",
    sort: 1
  },
  soon: {
    label: "快到期",
    shortLabel: "快到期",
    className: "bg-[#FCEBEB] text-[#E24B4A]",
    rowClass: "border-l-[#E24B4A]",
    sort: 2
  },
  quick: {
    label: "順手做",
    shortLabel: "順手",
    className: "bg-forest-lt text-forest",
    rowClass: "border-l-forest",
    sort: 3
  },
  split: {
    label: "先拆小",
    shortLabel: "拆小",
    className: "bg-lavender-lt text-lavender",
    rowClass: "border-l-lavender",
    sort: 4
  },
  later: {
    label: "放著沒事",
    shortLabel: "晚點",
    className: "bg-cream-dd text-muted",
    rowClass: "border-l-border-d",
    sort: 5
  }
};

const categoryOptions = ["文件行政", "健康醫療", "財務", "家務整理", "家庭行政", "購物退款", "其他"];

function daysBetween(from: string, to = "2026-05-17") {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
}

function daysUntil(deadline: string, from = "2026-05-17") {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${deadline}T00:00:00`);
  return Math.round((end.getTime() - start.getTime()) / 86400000);
}

function suggestPriority(deadline: string, firstNoticed: string, difficulty: Difficulty): Priority {
  const dueIn = daysUntil(deadline);
  const delayed = daysBetween(firstNoticed);

  if (difficulty === "困難") return "split";
  if (dueIn <= 7) return "soon";
  if (delayed >= 45) return "now";
  if (difficulty === "簡單") return "quick";
  return "later";
}

function defaultDate(offsetDays: number) {
  const date = new Date("2026-05-17T00:00:00");
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

export function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [deadline, setDeadline] = useState(defaultDate(7));
  const [difficulty, setDifficulty] = useState<Difficulty>("中等");
  const [showDetails, setShowDetails] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [firstNoticed, setFirstNoticed] = useState(defaultDate(-14));
  const [note, setNote] = useState("");

  const activeTasks = tasks.filter((task) => !task.archived);
  const archivedTasks = tasks.filter((task) => task.archived);

  const sortedTasks = useMemo(
    () => [...activeTasks].sort((a, b) => priorityStyle[a.priority].sort - priorityStyle[b.priority].sort),
    [activeTasks]
  );

  const priorityCounts = useMemo(
    () =>
      activeTasks.reduce(
        (counts, task) => {
          counts[task.priority] += 1;
          return counts;
        },
        { now: 0, soon: 0, quick: 0, later: 0, split: 0 } as Record<Priority, number>
      ),
    [activeTasks]
  );

  function archiveTask(taskId: number) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, archived: true } : task))
    );
  }

  function restoreTask(taskId: number) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, archived: false } : task))
    );
  }

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const task: Task = {
      id: Date.now(),
      title: trimmedTitle,
      category,
      deadline,
      firstNoticed,
      difficulty,
      priority: suggestPriority(deadline, firstNoticed, difficulty),
      note: note.trim() || undefined
    };

    setTasks((current) => [task, ...current]);
    setTitle("");
    setNote("");
    setDifficulty("中等");
    setDeadline(defaultDate(7));
    setFirstNoticed(defaultDate(-14));
    setShowDetails(false);
  }

  return (
    <main className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between px-[5%]">
          <Logo />
          <nav className="flex items-center gap-3 text-sm">
            <Link className="rounded-full bg-terracotta-lt px-4 py-2 font-bold text-terracotta no-underline" href="/tasks">
              待辦事項
            </Link>
            <Link className="rounded-full border border-border px-4 py-2 font-semibold text-muted no-underline hover:border-muted" href="/sessions">
              場次
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-[5%] py-8">
        <section className="mb-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-[.1em] text-terracotta">雜事清單</div>
          <div className="flex items-end justify-between gap-5 max-[760px]:block">
            <div>
              <h1 className="font-serif text-4xl font-black leading-tight tracking-normal">先把卡住的事放這裡</h1>
              <p className="mt-2 max-w-[620px] text-[.96rem] leading-[1.7] text-muted">
                不用整理到完美，先記下來。系統會把快到期、拖很久、可以順手處理的事排在前面。
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm max-[760px]:grid-cols-3">
              <div className="rounded-xl border border-border bg-white px-4 py-3">
                <div className="font-serif text-2xl font-black text-terracotta">{activeTasks.length}</div>
                <div className="text-light">總數</div>
              </div>
              <div className="rounded-xl border border-border bg-white px-4 py-3">
                <div className="font-serif text-2xl font-black text-[#E24B4A]">{priorityCounts.now + priorityCounts.soon}</div>
                <div className="text-light">先處理</div>
              </div>
              <div className="rounded-xl border border-border bg-white px-4 py-3">
                <div className="font-serif text-2xl font-black text-forest">{priorityCounts.quick}</div>
                <div className="text-light">順手做</div>
              </div>
            </div>
          </div>
        </section>

        <form className="mb-5 rounded-2xl border-[1.5px] border-border bg-white p-4 shadow-soft" onSubmit={handleAddTask}>
          <div className="grid grid-cols-[minmax(0,1fr)_150px_140px_auto] gap-3 max-[900px]:grid-cols-1">
            <input
              className="min-h-12 rounded-xl border-[1.5px] border-border bg-cream px-4 text-base outline-none placeholder:text-light focus:border-terracotta"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="把一件雜事丟進來，例如：預約牙醫、補申報資料"
            />
            <select
              className="min-h-12 rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categoryOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <input
              className="min-h-12 rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta"
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              aria-label="Deadline"
            />
            <button className="min-h-12 rounded-full bg-terracotta px-6 text-sm font-bold text-white hover:bg-terracotta-d" type="submit">
              加入
            </button>
          </div>

          {showDetails ? (
            <div className="mt-3 grid grid-cols-[140px_140px_minmax(0,1fr)] gap-3 max-[760px]:grid-cols-1">
              <select
                className="min-h-11 rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta"
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value as Difficulty)}
              >
                <option>簡單</option>
                <option>中等</option>
                <option>困難</option>
              </select>
              <input
                className="min-h-11 rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta"
                type="date"
                value={firstNoticed}
                onChange={(event) => setFirstNoticed(event.target.value)}
                aria-label="第一次想到這件事"
              />
              <input
                className="min-h-11 rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="備註或第一步，不填也可以"
              />
            </div>
          ) : null}

          <button
            className="mt-3 text-sm font-semibold text-muted underline-offset-4 hover:text-ink hover:underline"
            type="button"
            onClick={() => setShowDetails((current) => !current)}
          >
            {showDetails ? "收起細節" : "加難易度 / 第一次想到日期 / 備註"}
          </button>
        </form>

        <section className="overflow-hidden rounded-2xl border-[1.5px] border-border bg-white shadow-soft">
          <div className="grid grid-cols-[34px_86px_minmax(0,1fr)_124px_76px_72px] gap-3 border-b border-border bg-cream-d px-4 py-3 text-xs font-bold uppercase tracking-normal text-muted max-[820px]:hidden">
            <div />
            <div>狀態</div>
            <div>雜事</div>
            <div>Deadline</div>
            <div>拖延</div>
            <div />
          </div>

          <div className="divide-y divide-border">
            {sortedTasks.map((task) => {
              const dueIn = daysUntil(task.deadline);
              const delayed = daysBetween(task.firstNoticed);
              const priority = priorityStyle[task.priority];

              return (
                <article
                  className={`grid min-h-[58px] grid-cols-[34px_86px_minmax(0,1fr)_124px_76px_72px] items-center gap-3 border-l-4 bg-white px-4 py-2.5 transition-colors hover:bg-cream/70 max-[820px]:grid-cols-[34px_minmax(0,1fr)_auto] max-[820px]:gap-2 ${priority.rowClass}`}
                  key={task.id}
                >
                  <button
                    className="flex size-6 items-center justify-center rounded-full border-[1.5px] border-border bg-cream text-transparent transition-colors hover:border-forest hover:bg-forest-lt hover:text-forest"
                    type="button"
                    onClick={() => archiveTask(task.id)}
                    aria-label={`完成 ${task.title}`}
                    title="完成並封存"
                  >
                    ✓
                  </button>
                  <div className="max-[820px]:hidden">
                    <span className={`inline-flex min-w-[54px] justify-center rounded px-2 py-1 text-xs font-bold ${priority.className}`}>
                      {priority.shortLabel}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[.95rem] font-bold max-[820px]:whitespace-normal">
                      <span className={`mr-2 hidden rounded px-1.5 py-0.5 text-[.68rem] font-bold max-[820px]:inline-flex ${priority.className}`}>
                        {priority.shortLabel}
                      </span>
                      {task.title}
                    </div>
                    <div className="mt-0.5 flex min-w-0 flex-nowrap gap-2 overflow-hidden text-xs text-light">
                      <span>{task.category}</span>
                      <span>{task.difficulty}</span>
                      {task.note ? <span className="truncate">{task.note}</span> : null}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-muted max-[820px]:col-start-2">
                    <span className="max-[820px]:hidden">{task.deadline}</span>
                    <span className={`ml-2 text-xs ${dueIn <= 7 ? "text-[#E24B4A]" : "text-light"}`}>
                      {dueIn >= 0 ? `剩 ${dueIn} 天` : `過期 ${Math.abs(dueIn)} 天`}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-muted max-[820px]:hidden">{delayed} 天</div>
                  <button
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-muted transition-colors hover:border-muted hover:text-ink max-[820px]:hidden"
                    type="button"
                    onClick={() => archiveTask(task.id)}
                  >
                    封存
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border-[1.5px] border-border bg-white">
          <button
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-bold text-muted"
            type="button"
            onClick={() => setShowArchive((current) => !current)}
          >
            <span>已完成 / 封存 ({archivedTasks.length})</span>
            <span>{showArchive ? "收起" : "展開"}</span>
          </button>
          {showArchive ? (
            <div className="divide-y divide-border border-t border-border">
              {archivedTasks.length ? (
                archivedTasks.map((task) => (
                  <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-light" key={task.id}>
                    <div className="min-w-0">
                      <div className="truncate font-semibold line-through">{task.title}</div>
                      <div className="text-xs">{task.category}</div>
                    </div>
                    <button
                      className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-muted hover:border-muted hover:text-ink"
                      type="button"
                      onClick={() => restoreTask(task.id)}
                    >
                      還原
                    </button>
                  </div>
                ))
              ) : (
                <div className="px-4 py-4 text-sm text-light">還沒有封存的雜事。</div>
              )}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
