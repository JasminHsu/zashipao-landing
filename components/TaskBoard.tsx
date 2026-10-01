"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useSharedTasks } from "./useSharedTasks";
import type { Task } from "./taskStore";
import { Logo } from "./Logo";
import { TaskSessionBadge } from "./TaskSessionBadge";

type TaskStatus = "overdue" | "urgent" | "stale" | "open";

const demoToday = "2026-05-17";

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
  open: {
    label: "一般",
    className: "bg-cream-dd text-muted",
    rowClass: "border-l-border-d",
    sort: 4
  }
};

function daysBetween(from: string, to = demoToday) {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
}

function daysUntil(deadline: string, from = demoToday) {
  if (!deadline) return Number.POSITIVE_INFINITY;
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
  return "open";
}

function defaultDate(offsetDays: number) {
  const date = new Date(`${demoToday}T00:00:00`);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function formatDeadline(deadline: string) {
  if (!deadline) return "未設定期限";
  const dueIn = daysUntil(deadline);
  if (dueIn < 0) return `已過期 ${Math.abs(dueIn)} 天`;
  if (dueIn === 0) return "今天到期";
  return `${dueIn} 天後到期`;
}

export function TaskBoard() {
  const [tasks, setTasks] = useSharedTasks();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(defaultDate(7));
  const [showDetails, setShowDetails] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editNote, setEditNote] = useState("");
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dropId, setDropId] = useState<number | null>(null);
  const [sortNotice, setSortNotice] = useState("");

  const activeTasks = tasks.filter((task) => !task.archived);
  const archivedTasks = tasks.filter((task) => task.archived);

  const sortedTasks = useMemo(
    () =>
      [...activeTasks].sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        if (a.order !== undefined || b.order !== undefined) {
          return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
        }
        const statusDiff = statusStyle[getTaskStatus(a)].sort - statusStyle[getTaskStatus(b)].sort;
        if (statusDiff !== 0) return statusDiff;
        return daysUntil(a.deadline) - daysUntil(b.deadline);
      }),
    [activeTasks]
  );

  const unfinishedTasks = activeTasks.filter((task) => !task.completed);
  const orderedUnfinished = sortedTasks.filter(task => !task.completed);

  function moveTask(sourceId: number, targetId: number) {
    const ordered = orderedUnfinished.map(task => task.id);
    const from = ordered.indexOf(sourceId);
    const to = ordered.indexOf(targetId);
    if (from < 0 || to < 0 || from === to) return;
    ordered.splice(from, 1);
    ordered.splice(to, 0, sourceId);
    try {
      setTasks(current => current.map(task => {
        const order = ordered.indexOf(task.id);
        return order < 0 ? task : { ...task, order };
      }));
      setSortNotice(`已移至第 ${to + 1} 位，順序已儲存。`);
    } catch {
      setSortNotice("排序儲存失敗，請重試。");
    }
  }
  const urgentCount = unfinishedTasks.filter((task) => {
    const status = getTaskStatus(task);
    return status === "overdue" || status === "urgent";
  }).length;
  const staleCount = unfinishedTasks.filter((task) => getTaskStatus(task) === "stale").length;

  function toggleComplete(taskId: number) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
    if (editingId === taskId) setEditingId(null);
  }

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
      firstNoticed: demoToday,
      note: note.trim() || undefined
    };

    setTasks((current) => [task, ...current]);
    setTitle("");
    setNote("");
    setDeadline(defaultDate(7));
    setShowDetails(false);
  }

  return (
    <main className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between px-[5%]">
          <Logo />
          <nav className="flex items-center gap-3 text-sm">
            <Link className="rounded-full border border-border px-4 py-2 font-semibold text-muted no-underline hover:border-muted" href="/my-sessions">
              我的場次
            </Link>
            <Link className="rounded-full border border-border px-4 py-2 font-semibold text-muted no-underline hover:border-muted" href="/sessions">
              預約場次
            </Link>
            <Link className="rounded-full bg-terracotta-lt px-4 py-2 font-bold text-terracotta no-underline" href="/tasks">
              待辦清單
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-[5%] py-8">
        <section className="mb-5">
          <div className="flex items-end justify-between gap-5 max-[760px]:block">
            <div>
              <h1 className="font-serif text-4xl font-black leading-tight tracking-normal">待辦清單</h1>
              <p className="mt-2 max-w-[620px] text-[.96rem] leading-[1.7] text-muted">
                把一直卡著的小事先放進來。預約場次時，可以直接從這裡挑今天要處理哪幾件。
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm max-[760px]:grid-cols-3">
              <div className="rounded-xl border border-border bg-white px-4 py-3">
                <div className="font-serif text-2xl font-black text-terracotta">{unfinishedTasks.length}</div>
                <div className="text-light">未完成</div>
              </div>
              <div className="rounded-xl border border-border bg-white px-4 py-3">
                <div className="font-serif text-2xl font-black text-[#E24B4A]">{urgentCount}</div>
                <div className="text-light">快到期</div>
                <div className="mt-1 text-[.68rem] leading-tight text-light">3 天內</div>
              </div>
              <div className="rounded-xl border border-border bg-white px-4 py-3">
                <div className="font-serif text-2xl font-black text-lavender">{staleCount}</div>
                <div className="text-light">拖很久</div>
                <div className="mt-1 text-[.68rem] leading-tight text-light">21 天+</div>
              </div>
            </div>
          </div>
        </section>

        <form className="mb-5 rounded-2xl border-[1.5px] border-border bg-white p-4 shadow-soft" onSubmit={handleAddTask}>
          <div className="grid grid-cols-[minmax(0,1fr)_156px_112px] gap-3 max-[900px]:grid-cols-1">
            <label className="block">
              <span className="mb-1 block text-xs font-bold text-muted">事項</span>
              <input
                className="h-12 w-full rounded-xl border-[1.5px] border-border bg-cream px-4 text-base outline-none placeholder:text-light focus:border-terracotta"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="輸入一件想處理的事，例如：預約牙醫、補申報資料"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold text-muted">預計完成日</span>
              <input
                className="h-12 w-full rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta"
                type="date"
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                aria-label="預計完成日"
              />
            </label>
            <div className="block">
              <span className="mb-1 block text-xs font-bold text-transparent">加入</span>
              <button className="h-12 w-full rounded-xl bg-terracotta px-6 text-base font-bold text-white transition-colors hover:bg-terracotta-d" type="submit">
                加入
              </button>
            </div>
          </div>

          {showDetails ? (
            <div className="mt-3">
              <input
                className="min-h-11 w-full rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta"
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

        <p className="mb-3 text-sm text-muted">拖曳左側把手安排先後順序。已完成事項會放在最後。</p>
        <p role="status" className="sr-only">{sortNotice}</p>
        <section className="rounded-2xl border-[1.5px] border-border bg-white shadow-soft">
          <div className="grid grid-cols-[24px_60px_90px_minmax(0,1fr)_120px_100px_148px] gap-3 border-b border-border bg-cream-d px-4 py-3 text-xs font-bold uppercase tracking-normal text-muted max-[900px]:hidden">
            <div />
            <div className="text-center">完成</div>
            <div className="text-center">提醒</div>
            <div>事項</div>
            <div>預計完成</div>
            <div>已放著</div>
            <div />
          </div>

          <div className="divide-y divide-border">
            {sortedTasks.map((task) => {
              const delayed = daysBetween(task.firstNoticed);
              const status = statusStyle[getTaskStatus(task)];
              const isEditing = editingId === task.id;

              return (
                <article
                  onDragOver={event => {
                    if (draggedId !== null && !task.completed && !isEditing) {
                      event.preventDefault();
                      event.dataTransfer.dropEffect = "move";
                      setDropId(task.id);
                    }
                  }}
                  onDrop={event => {
                    event.preventDefault();
                    if (draggedId !== null && !task.completed && !isEditing) moveTask(draggedId, task.id);
                    setDraggedId(null); setDropId(null);
                  }}
                  className={`border-l-4 px-4 py-3 transition-colors hover:bg-cream/70 ${dropId === task.id ? "ring-2 ring-inset ring-terracotta" : ""} ${draggedId === task.id ? "opacity-50" : ""} ${
                    task.completed ? "border-l-forest bg-forest-lt/45" : `bg-white ${status.rowClass}`
                  }`}
                  key={task.id}
                >
                  {isEditing ? (
                    <form className="grid grid-cols-[minmax(0,1fr)_150px_auto] gap-3 max-[900px]:grid-cols-1" onSubmit={saveEdit}>
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
                        aria-label="修改預計完成日"
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
                        className="col-span-2 min-h-11 rounded-xl border-[1.5px] border-border bg-cream px-3 text-sm outline-none focus:border-terracotta max-[900px]:col-span-1"
                        value={editNote}
                        onChange={(event) => setEditNote(event.target.value)}
                        placeholder="備註"
                      />
                    </form>
                  ) : (
                    <div className="grid min-h-[58px] grid-cols-[24px_60px_90px_minmax(0,1fr)_120px_100px_148px] items-center gap-3 max-[900px]:grid-cols-[24px_60px_minmax(0,1fr)_auto] max-[900px]:gap-2">
                      {!task.completed ? (
                        <button type="button" draggable aria-label={`拖曳排序：${task.title}，可用鍵盤上下鍵調整`} title="拖曳調整順序"
                          className="flex h-10 w-6 cursor-grab items-center justify-center rounded text-xl text-light hover:text-muted focus-visible:outline-terracotta active:cursor-grabbing"
                          onDragStart={event => { setDraggedId(task.id); event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("text/plain", String(task.id)); }}
                          onDragEnd={() => { setDraggedId(null); setDropId(null); }}
                          onKeyDown={event => {
                            if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
                            event.preventDefault();
                            const index = orderedUnfinished.findIndex(item => item.id === task.id);
                            const target = orderedUnfinished[index + (event.key === "ArrowUp" ? -1 : 1)];
                            if (target) moveTask(task.id, target.id);
                          }}>⠿</button>
                      ) : <div />}
                      <label className="flex cursor-pointer flex-col items-center gap-1 py-2 text-xs text-muted">
                        <input type="checkbox" className="size-5 cursor-pointer accent-forest"
                          checked={!!task.completed} onChange={() => toggleComplete(task.id)}
                          aria-label={task.completed ? `取消完成 ${task.title}` : `標記完成 ${task.title}`} />
                        <span>{task.completed ? "已完成" : "完成"}</span>
                      </label>
                      <div className="max-[900px]:hidden">
                        <span className={`inline-flex min-w-[62px] justify-center rounded px-2 py-1 text-xs font-bold ${task.completed ? "bg-forest text-white" : status.className}`}>
                          {task.completed ? "已完成" : status.label}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`truncate text-[.95rem] font-bold max-[900px]:whitespace-normal ${task.completed ? "text-forest line-through" : ""}`}
                          title={task.title}
                        >
                          <span className={`mr-2 hidden rounded px-1.5 py-0.5 text-[.68rem] font-bold max-[900px]:inline-flex ${task.completed ? "bg-forest text-white" : status.className}`}>
                            {task.completed ? "已完成" : status.label}
                          </span>
                          {task.title}
                        </div>
                        <TaskSessionBadge taskId={task.id} />
                        {!task.completed && task.note ? (
                          <div
                            className="mt-0.5 truncate text-xs leading-relaxed text-light"
                            title={task.note}
                          >
                            {task.note}
                          </div>
                        ) : null}
                      </div>
                      <div className="text-sm font-semibold text-muted max-[900px]:col-start-3">
                        {task.completed ? "完成" : formatDeadline(task.deadline)}
                      </div>
                      <div className="text-sm font-semibold text-muted max-[900px]:hidden">
                        {task.completed ? "—" : `已放著 ${delayed} 天`}
                      </div>
                      <div className="flex justify-end gap-2 max-[900px]:col-span-4 max-[900px]:justify-start">
                        {task.completed ? (
                          <button
                            className="rounded-full bg-forest px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-forest/90"
                            type="button"
                            onClick={() => archiveTask(task.id)}
                          >
                            封存
                          </button>
                        ) : (
                          <button
                            className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-muted transition-colors hover:border-muted hover:text-ink"
                            type="button"
                            onClick={() => startEditing(task)}
                          >
                            編輯
                          </button>
                        )}
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
                      <div className="truncate font-semibold line-through" title={task.title}>{task.title}</div>
                      <div className="text-xs">完成後已封存</div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-muted hover:border-muted hover:text-ink"
                        type="button"
                        onClick={() => restoreTask(task.id)}
                      >
                        還原
                      </button>
                      <button
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-muted hover:border-[#E24B4A] hover:text-[#E24B4A]"
                        type="button"
                        onClick={() => deleteTask(task.id)}
                      >
                        刪除
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-4 text-sm text-light">還沒有封存的待辦清單。</div>
              )}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
