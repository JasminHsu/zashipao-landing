"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Logo } from "./Logo";

type TaskStatus = "overdue" | "urgent" | "stale" | "soon" | "open";

type Task = {
  id: number;
  title: string;
  deadline: string;
  firstNoticed: string;
  archived?: boolean;
  note?: string;
};

const demoToday = "2026-05-17";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "補齊所得稅延期申報資料",
    deadline: "2026-05-24",
    firstNoticed: "2026-03-16",
    note: "先找扣繳憑單和去年申報資料"
  },
  {
    id: 2,
    title: "更新護照照片預約",
    deadline: "2026-06-05",
    firstNoticed: "2026-04-02",
    note: "查附近照相館，確認週末時間"
  },
  {
    id: 3,
    title: "預約牙醫洗牙",
    deadline: "2026-05-30",
    firstNoticed: "2026-05-03",
    note: "打電話或線上預約即可"
  },
  {
    id: 4,
    title: "整理五月份收據",
    deadline: "2026-06-15",
    firstNoticed: "2026-05-08"
  },
  {
    id: 5,
    title: "研究媽媽保單內容並做摘要",
    deadline: "2026-05-28",
    firstNoticed: "2026-02-20",
    note: "先找保單，再列出看不懂的地方"
  },
  {
    id: 6,
    title: "退 iHerb 重複訂單",
    deadline: "2026-05-20",
    firstNoticed: "2026-05-09"
  }
];

const statusStyle: Record<TaskStatus, { label: string; className: string; rowClass: string; sort: number }> = {
  overdue: {
    label: "已過期",
    className: "bg-[#FCEBEB] text-[#E24B4A]",
    rowClass: "border-l-[#E24B4A]",
    sort: 1
  },
  urgent: {
    label: "快到期",
    className: "bg-terracotta-lt text-terracotta",
    rowClass: "border-l-terracotta",
    sort: 2
  },
  stale: {
    label: "拖很久",
    className: "bg-lavender-lt text-lavender",
    rowClass: "border-l-lavender",
    sort: 3
  },
  soon: {
    label: "近期",
    className: "bg-forest-lt text-forest",
    rowClass: "border-l-forest",
    sort: 4
  },
  open: {
    label: "可安排",
    className: "bg-cream-dd text-muted",
    rowClass: "border-l-border-d",
    sort: 5
  }
};

function daysBetween(from: string, to = demoToday) {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
}

function daysUntil(deadline: string, from = demoToday) {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${deadline}T00:00:00`);
  return Math.round((end.getTime() - start.getTime()) / 86400000);
}

function getTaskStatus(task: Task): TaskStatus {
  const dueIn = daysUntil(task.deadline);
  const delayed = daysBetween(task.firstNoticed);

  if (dueIn < 0) return "overdue";
  if (dueIn <= 3) return "urgent";
  if (delayed >= 21) return "stale";
  if (dueIn <= 14) return "soon";
  return "open";
}

function defaultDate(offsetDays: number) {
  const date = new Date(`${demoToday}T00:00:00`);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function formatDeadline(deadline: string) {
  const dueIn = daysUntil(deadline);
  if (dueIn < 0) return `已過期 ${Math.abs(dueIn)} 天`;
  if (dueIn === 0) return "今天到期";
  return `${dueIn} 天後到期`;
}

export function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(defaultDate(7));
  const [showDetails, setShowDetails] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [firstNoticed, setFirstNoticed] = useState(defaultDate(-14));
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editFirstNoticed, setEditFirstNoticed] = useState("");
  const [editNote, setEditNote] = useState("");

  const activeTasks = tasks.filter((task) => !task.archived);
  const archivedTasks = tasks.filter((task) => task.archived);

  const sortedTasks = useMemo(
    () =>
      [...activeTasks].sort((a, b) => {
        const statusDiff = statusStyle[getTaskStatus(a)].sort - statusStyle[getTaskStatus(b)].sort;
        if (statusDiff !== 0) return statusDiff;
        return daysUntil(a.deadline) - daysUntil(b.deadline);
      }),
    [activeTasks]
  );

  const urgentCount = activeTasks.filter((task) => {
    const status = getTaskStatus(task);
    return status === "overdue" || status === "urgent";
  }).length;
  const staleCount = activeTasks.filter((task) => getTaskStatus(task) === "stale").length;

  function archiveTask(taskId: number) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, archived: true } : task))
    );
    if (editingId === taskId) setEditingId(null);
  }

  function restoreTask(taskId: number) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, archived: false } : task))
    );
  }

  function deleteTask(taskId: number) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
    if (editingId === taskId) setEditingId(null);
  }

  function startEditing(task: Task) {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDeadline(task.deadline);
    setEditFirstNoticed(task.firstNoticed);
    setEditNote(task.note ?? "");
  }

  function saveEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId || !editTitle.trim()) return;

    setTasks((current) =>
      current.map((task) =>
        task.id === editingId
          ? {
              ...task,
              title: editTitle.trim(),
              deadline: editDeadline,
              firstNoticed: editFirstNoticed,
              note: editNote.trim() || undefined
            }
          : task
      )
    );
    setEditingId(null);
  }

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const task: Task = {
      id: Date.now(),
      title: trimmedTitle,
      deadline,
      firstNoticed,
      note: note.trim() || undefined
    };

    setTasks((current) => [task, ...current]);
    setTitle("");
    setNote("");
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
          <div className="flex items-end justify-between gap-5 max-[760px]:block">
            <div>
              <h1 className="font-serif text-4xl font-black leading-tight tracking-normal">待辦事項</h1>
              <p className="mt-2 max-w-[620px] text-[.96rem] leading-[1.7] text-muted">
                把一直卡著的小事先放進來。預約場次時，可以直接從這裡挑今天要處理哪幾件。
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm max-[760px]:grid-cols-3">
              <div className="rounded-xl border border-border bg-white px-4 py-3">
                <div className="font-serif text-2xl font-black text-terracotta">{activeTasks.length}</div>
                <div className="text-light">待辦</div>
              </div>
              <div className="rounded-xl border border-border bg-white px-4 py-3">
                <div className="font-serif text-2xl font-black text-[#E24B4A]">{urgentCount}</div>
                <div className="text-light">快到期</div>
              </div>
              <div className="rounded-xl border border-border bg-white px-4 py-3">
                <div className="font-serif text-2xl font-black text-lavender">{staleCount}</div>
                <div className="text-light">拖很久</div>
              </div>
            </div>
          </div>
        </section>

        <form className="mb-5 rounded-2xl border-[1.5px] border-border bg-white p-4 shadow-soft" onSubmit={handleAddTask}>
          <div className="grid grid-cols-[minmax(0,1fr)_160px_auto] gap-3 max-[900px]:grid-cols-1">
            <input
              className="min-h-12 rounded-xl border-[1.5px] border-border bg-cream px-4 text-base outline-none placeholder:text-light focus:border-terracotta"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="輸入一件想處理的事，例如：預約牙醫、補申報資料"
            />
            <input
              className="min-h-12 rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta"
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              aria-label="期限"
            />
            <button className="min-h-12 rounded-full bg-terracotta px-6 text-sm font-bold text-white hover:bg-terracotta-d" type="submit">
              加入
            </button>
          </div>

          {showDetails ? (
            <div className="mt-3 grid grid-cols-[170px_minmax(0,1fr)] gap-3 max-[760px]:grid-cols-1">
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
            className="mt-3 inline-flex items-center gap-1 rounded-full px-1 text-sm font-bold text-muted underline-offset-4 hover:text-ink hover:underline"
            type="button"
            onClick={() => setShowDetails((current) => !current)}
          >
            <span>{showDetails ? "−" : "+"}</span>
            {showDetails ? "收起補充細節" : "補充細節"}
          </button>
        </form>

        <section className="overflow-hidden rounded-2xl border-[1.5px] border-border bg-white shadow-soft">
          <div className="grid grid-cols-[34px_90px_minmax(0,1fr)_120px_100px_132px] gap-3 border-b border-border bg-cream-d px-4 py-3 text-xs font-bold uppercase tracking-normal text-muted max-[900px]:hidden">
            <div />
            <div>提醒</div>
            <div>事項</div>
            <div>期限</div>
            <div>已放著</div>
            <div />
          </div>

          <div className="divide-y divide-border">
            {sortedTasks.map((task) => {
              const delayed = daysBetween(task.firstNoticed);
              const status = statusStyle[getTaskStatus(task)];
              const isEditing = editingId === task.id;

              return (
                <article className={`border-l-4 bg-white px-4 py-3 transition-colors hover:bg-cream/70 ${status.rowClass}`} key={task.id}>
                  {isEditing ? (
                    <form className="grid grid-cols-[minmax(0,1fr)_150px_150px_auto] gap-3 max-[900px]:grid-cols-1" onSubmit={saveEdit}>
                      <input
                        className="min-h-11 rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta"
                        value={editTitle}
                        onChange={(event) => setEditTitle(event.target.value)}
                      />
                      <input
                        className="min-h-11 rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta"
                        type="date"
                        value={editDeadline}
                        onChange={(event) => setEditDeadline(event.target.value)}
                        aria-label="修改期限"
                      />
                      <input
                        className="min-h-11 rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta"
                        type="date"
                        value={editFirstNoticed}
                        onChange={(event) => setEditFirstNoticed(event.target.value)}
                        aria-label="修改第一次想到日期"
                      />
                      <div className="flex gap-2">
                        <button className="rounded-full bg-terracotta px-4 text-sm font-bold text-white hover:bg-terracotta-d" type="submit">
                          儲存
                        </button>
                        <button className="rounded-full border border-border px-4 text-sm font-bold text-muted hover:border-muted" type="button" onClick={() => setEditingId(null)}>
                          取消
                        </button>
                      </div>
                      <input
                        className="col-span-3 min-h-11 rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta max-[900px]:col-span-1"
                        value={editNote}
                        onChange={(event) => setEditNote(event.target.value)}
                        placeholder="備註"
                      />
                    </form>
                  ) : (
                    <div className="grid min-h-[58px] grid-cols-[34px_90px_minmax(0,1fr)_120px_100px_132px] items-center gap-3 max-[900px]:grid-cols-[34px_minmax(0,1fr)_auto] max-[900px]:gap-2">
                      <button
                        className="flex size-6 items-center justify-center rounded-full border-[1.5px] border-border bg-cream text-transparent transition-colors hover:border-forest hover:bg-forest-lt hover:text-forest"
                        type="button"
                        onClick={() => archiveTask(task.id)}
                        aria-label={`完成 ${task.title}`}
                        title="完成"
                      >
                        ✓
                      </button>
                      <div className="max-[900px]:hidden">
                        <span className={`inline-flex min-w-[62px] justify-center rounded px-2 py-1 text-xs font-bold ${status.className}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[.95rem] font-bold max-[900px]:whitespace-normal">
                          <span className={`mr-2 hidden rounded px-1.5 py-0.5 text-[.68rem] font-bold max-[900px]:inline-flex ${status.className}`}>
                            {status.label}
                          </span>
                          {task.title}
                        </div>
                        {task.note ? <div className="mt-0.5 truncate text-xs text-light">{task.note}</div> : null}
                      </div>
                      <div className="text-sm font-semibold text-muted max-[900px]:col-start-2">{formatDeadline(task.deadline)}</div>
                      <div className="text-sm font-semibold text-muted max-[900px]:hidden">已放著 {delayed} 天</div>
                      <div className="flex justify-end gap-2 max-[900px]:col-span-3 max-[900px]:justify-start">
                        <button
                          className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-muted transition-colors hover:border-muted hover:text-ink"
                          type="button"
                          onClick={() => startEditing(task)}
                        >
                          編輯
                        </button>
                        <button
                          className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-muted transition-colors hover:border-[#E24B4A] hover:text-[#E24B4A]"
                          type="button"
                          onClick={() => deleteTask(task.id)}
                        >
                          刪除
                        </button>
                      </div>
                    </div>
                  )}
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
                      <div className="text-xs">完成後已封存</div>
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
                <div className="px-4 py-4 text-sm text-light">還沒有封存的待辦事項。</div>
              )}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
