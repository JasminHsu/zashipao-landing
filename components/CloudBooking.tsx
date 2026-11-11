'use client';

import Link from 'next/link';
import { type FormEvent, useRef, useState } from 'react';
import { browserAuth } from '@/lib/supabase/browser';
import { bookingError, sessionDate, sessionTime } from '@/lib/bookingErrors';
import type { PublicSession } from '@/lib/publicSessions';
import { AddToCalendar } from './AddToCalendar';
import { BookedTaskContent } from './BookedTaskContent';
import { BookingFlowSteps } from './BookingFlowSteps';
import { Logo } from './Logo';
import { TaskSyncStatus } from './TaskSyncStatus';
import { useSharedTasks } from './useSharedTasks';

export function CloudBooking({ session, initialIds }: { session: PublicSession; initialIds: number[] }) {
  const [tasks, setTasks, sync] = useSharedTasks();
  const [ids, setIds] = useState(initialIds);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [note, setNote] = useState('');
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState('');
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const addLock = useRef(false);

  const available = tasks.filter(task => !task.completed && !task.archived);
  const selected = available.filter(task => ids.includes(task.id));
  const disabled = busy || adding || sync.loading || sync.saving || !!sync.error || !sync.userId;

  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = title.trim();
    if (!name || addLock.current || disabled) return;

    addLock.current = true;
    setAdding(true);
    setNotice('');
    try {
      const now = new Date();
      const firstNoticed = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const id = Math.max(Date.now(), ...tasks.map(task => task.id + 1));
      const saved = await setTasks(current => [
        ...current,
        { id, title: name, deadline, firstNoticed, note: note.trim() || undefined }
      ]);
      if (!saved) return;
      setIds(current => Array.from(new Set([...current, id])));
      setTitle('');
      setDeadline('');
      setNote('');
      setNotice('已加入我的待辦清單，也已放進本場承諾。');
    } finally {
      addLock.current = false;
      setAdding(false);
    }
  }

  async function confirmBooking() {
    if (!selected.length || disabled) return;
    setBusy(true);
    setError('');
    try {
      const { data, error: requestError } = await browserAuth().rpc('book_session', {
        p_session_id: session.id,
        p_task_ids: selected.map(task => task.id)
      });
      if (requestError) throw requestError;
      window.dispatchEvent(new Event('zashipao-bookings-updated'));
      setConfirmed(String(data));
    } catch (requestError) {
      setError(bookingError(requestError instanceof Error ? requestError.message : (requestError as { message?: string })?.message ?? ''));
      setBusy(false);
    }
  }

  if (confirmed) {
    return (
      <main className="min-h-screen bg-cream px-[5%] py-8">
        <div className="mx-auto max-w-3xl">
          <Logo />
          <section className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-forest-lt text-xl font-black text-forest" aria-hidden="true">✓</div>
            <p className="text-sm font-bold text-forest">預約完成</p>
            <h1 className="mt-2 font-serif text-3xl font-black">這段時間已經替你留下來</h1>
            <h2 className="mt-5 text-xl font-bold">{session.title}</h2>
            <p className="mt-2 text-muted">{sessionDate(session.starts_at)} · {sessionTime(session.starts_at)}–{sessionTime(session.ends_at)}（台灣時間）</p>

            <div className="my-6 rounded-2xl bg-cream p-4">
              <p className="mb-3 text-sm font-bold text-terracotta">本場承諾 · {selected.length} 件</p>
              <div className="grid gap-2">
                {selected.map(task => <div key={task.id} className="rounded-xl bg-white px-4 py-3 text-sm font-bold">{task.title}</div>)}
              </div>
            </div>

            <AddToCalendar session={session} />
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/my-sessions#${confirmed}`} className="inline-flex min-h-11 items-center rounded-full bg-terracotta px-5 py-3 font-bold text-ink">查看已預約場次</Link>
              <Link href="/tasks" className="inline-flex min-h-11 items-center rounded-full border border-border px-5 py-3 font-bold text-muted">整理待辦清單</Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-[5%] py-8">
      <div className="mx-auto max-w-6xl">
        <Logo />
        <Link href="/sessions" className="my-6 inline-flex min-h-11 items-center text-sm font-bold text-muted">← 重新選擇場次</Link>
        <BookingFlowSteps current={2} />

        <section className="mb-5 rounded-2xl border border-terracotta bg-white p-5 shadow-soft">
          <p className="text-sm font-bold text-terracotta">{sessionDate(session.starts_at)} · {sessionTime(session.starts_at)}–{sessionTime(session.ends_at)}（台灣時間）</p>
          <h1 className="mt-2 font-serif text-3xl font-black">{session.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">選擇這場要推進的事。預約完成前都還可以調整。</p>
        </section>

        <TaskSyncStatus />
        <fieldset disabled={disabled} className="min-w-0 border-0 p-0">
          <div className="grid grid-cols-[minmax(0,1fr)_320px] items-start gap-5 max-[900px]:grid-cols-1">
            <div className="min-w-0">
              <form className="mb-5 rounded-2xl border border-border bg-white p-4" onSubmit={addTask}>
                <h2 className="font-bold">新增這場想完成的事</h2>
                <p className="mt-1 text-xs text-muted">新增後會同時存進「我的待辦清單」。</p>
                <label className="mt-4 grid gap-1 text-sm">
                  待辦名稱
                  <input required value={title} onChange={event => setTitle(event.target.value)} placeholder="例如：買電池、預約看診" className="min-h-11 min-w-0 rounded-lg border border-border px-3 py-2" />
                </label>
                <details className="mt-3 text-sm text-muted">
                  <summary className="cursor-pointer py-2">補充日期與備註（選填）</summary>
                  <label className="mt-2 grid gap-1">預計完成日期<input type="date" value={deadline} onChange={event => setDeadline(event.target.value)} className="min-w-0 rounded-lg border border-border px-3 py-2" /></label>
                  <label className="mt-3 grid gap-1">備註<textarea value={note} onChange={event => setNote(event.target.value)} rows={2} className="min-w-0 rounded-lg border border-border px-3 py-2" /></label>
                </details>
                <button type="submit" disabled={!title.trim()} className="mt-3 min-h-11 rounded-full bg-forest px-4 py-2 text-sm font-bold text-white disabled:opacity-40">{adding ? '新增中…' : '加到本場'}</button>
              </form>

              {notice ? <p role="status" className="mb-4 rounded-xl bg-forest-lt p-3 text-sm text-forest">{notice}</p> : null}
              <h2 className="mb-3 font-bold">或從待辦清單選</h2>
              <div className="grid gap-3">
                {available.map(task => {
                  const checked = ids.includes(task.id);
                  return (
                    <label key={task.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${checked ? 'border-terracotta bg-terracotta-lt/40' : 'border-border bg-white hover:border-border-d'}`}>
                      <input type="checkbox" aria-label={`選取${task.title}`} className="mt-3 size-5 shrink-0 accent-terracotta" checked={checked} onChange={event => setIds(current => event.target.checked ? [...current, task.id] : current.filter(id => id !== task.id))} />
                      <BookedTaskContent task={task} disabled={busy || adding} />
                    </label>
                  );
                })}
              </div>
              {!sync.loading && !available.length ? <p className="rounded-xl border border-dashed border-border bg-white p-5 text-muted">還沒有待辦，直接在上方新增第一件即可。</p> : null}
            </div>

            <aside className="sticky top-5 rounded-2xl border border-border bg-white p-5 shadow-lift max-[900px]:static">
              <p className="text-sm font-bold text-terracotta">本場承諾</p>
              <h2 className="mt-1 font-serif text-2xl font-black">{selected.length} 件雜事</h2>
              <div className="my-4 grid gap-2">
                {selected.length ? selected.map(task => (
                  <div key={task.id} className="rounded-xl bg-cream px-3 py-3 text-sm font-bold">{task.title}</div>
                )) : <p className="rounded-xl border border-dashed border-border bg-cream p-4 text-sm text-muted">至少選一件，這場才有明確目標。</p>}
              </div>
              {selected.length > 3 ? <p className="mb-4 rounded-xl bg-[#FCEBEB] p-3 text-sm leading-relaxed text-[#B63C3C]">這場內容有點多。建議先保留最想推進的一到三件。</p> : <p className="mb-4 rounded-xl bg-forest-lt p-3 text-sm leading-relaxed text-forest">預約後仍可在「已預約場次」調整；移出本場不會刪除待辦。</p>}
              {error ? <p role="alert" className="mb-4 text-sm text-terracotta">{error} <Link href="/my-sessions" className="underline">查看已預約場次</Link></p> : null}
              <button type="button" disabled={!selected.length || busy} className="w-full rounded-full bg-terracotta px-5 py-3 font-bold text-ink disabled:opacity-40" onClick={confirmBooking}>{busy ? '正在確認預約…' : `確認預約（${selected.length} 件）`}</button>
            </aside>
          </div>
        </fieldset>
      </div>
    </main>
  );
}
