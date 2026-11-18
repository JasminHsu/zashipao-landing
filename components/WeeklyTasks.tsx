'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { browserAuth } from '@/lib/supabase/browser';
import { moveWeek, taipeiWeek, weekStartFromDate } from '@/lib/weeklyTasks';
import { useSharedTasks } from './useSharedTasks';
import { TaskSessionBadge } from './TaskSessionBadge';
type Goal = { id: string; title: string; weekly_count: number; active: boolean };
export function WeeklyTasks({ refreshKey = 0 }: { refreshKey?: number }) {
  const [tasks, setTasks, sync] = useSharedTasks();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [week, setWeek] = useState(() => taipeiWeek());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    setGoals([]); setReady(false); setError('');
    if (!sync.userId) return;
    const load = async () => {
      const client = browserAuth();
      const result = await client.from('weekly_goals').select('id,title,weekly_count,active').eq('user_id', sync.userId!).order('created_at');
      if (!active) return;
      if (result.error) { setError('每週重複待辦尚未就緒，請確認資料庫更新與連線。一般待辦仍可照常使用。'); return; }
      setGoals(result.data);
      const currentWeek = taipeiWeek();
      const nextWeek = moveWeek(currentWeek, 1);
      const canGenerate = week === currentWeek || week === nextWeek;
      const generated = canGenerate ? await client.rpc('ensure_weekly_tasks', { p_week: week }) : { error: null };
      if (!active) return;
      if (generated.error) { setError('這個週次目前無法建立重複待辦。請回到本週，或稍後確認資料庫設定。'); return; }
      setReady(true);
      window.dispatchEvent(new Event('zashipao-cloud-tasks-updated'));
    };
    void load().catch(() => { if (active) setError('無法連線，請稍後重試。'); });
    return () => { active = false; };
  }, [sync.userId, week, revision, refreshKey]);
  async function toggleGoal(goal: Goal) {
    if (busy || !sync.userId) return;
    setBusy(true);
    try {
      const { data, error } = await browserAuth().from('weekly_goals').update({ active: !goal.active }).eq('user_id', sync.userId).eq('id', goal.id).select('id');
      if (error || data?.length !== 1) throw error;
      setRevision(x => x + 1);
    } catch { setError('變更未確認成功，請重新載入確認。'); }
    finally { setBusy(false); }
  }
  if (ready && goals.length === 0) return null;
  const currentWeek = taipeiWeek();
  const nextWeek = moveWeek(currentWeek, 1);
  const isPastWeek = week < currentWeek;
  const isBeyondNextWeek = week > nextWeek;
  return <section aria-label="重複待辦" className="mb-6 rounded-lg border border-border bg-paper p-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-black text-ink">重複待辦</h2>
      <div className="flex flex-wrap items-end gap-2" aria-label="選擇查看週次">
        <button type="button" onClick={() => setWeek(current => moveWeek(current, -1))} aria-label="查看前一週" title="前一週" className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-white text-xl text-ink hover:border-muted">←</button>
        <label className="grid gap-1 text-xs font-semibold text-muted">查看週次
          <input type="date" value={week} onChange={event => setWeek(weekStartFromDate(event.target.value))} className="min-h-11 rounded-lg border border-border bg-white px-3 text-sm text-ink" />
        </label>
        <button type="button" onClick={() => setWeek(current => moveWeek(current, 1))} aria-label="查看後一週" title="後一週" className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-white text-xl text-ink hover:border-muted">→</button>
        {week !== taipeiWeek() ? <button type="button" onClick={() => setWeek(taipeiWeek())} className="min-h-11 px-2 text-sm font-bold text-forest underline">回到本週</button> : null}
      </div>
    </div>
    <p className="mt-2 text-sm leading-6 text-muted">目前為每週頻率 · {week} 起的一週</p>
    {isBeyondNextWeek ? <p className="mt-3 rounded-lg bg-cream px-3 py-2 text-sm text-muted">目前只能提前建立到下週。這個週次可先查看；待資料庫升級後才能產生新的重複待辦。</p> : null}
    {error && <p role="alert" className="mt-3 text-sm text-terracotta">{error} <button type="button" className="underline" onClick={() => setRevision(x=>x+1)}>重新載入</button></p>}
    {!ready && !error && <p role="status" className="mt-3 text-sm text-muted">正在準備每週待辦…</p>}
    <div className="mt-4 space-y-3">{goals.map(goal => {
      const occurrences = tasks.filter(t=>t.weeklyGoalId===goal.id&&t.occurrenceWeek===week).sort((a,b)=>(a.occurrenceNumber??0)-(b.occurrenceNumber??0));
      const completed = occurrences.filter(t=>t.completed).length;
      return <details key={goal.id} className="rounded-xl border border-border bg-cream p-4">
        <summary className="cursor-pointer font-bold">{goal.title} <span className="ml-2 text-sm font-normal text-forest">{completed}／{goal.weekly_count} 次完成{!goal.active?' · 已暫停':''}</span></summary>
        <div className="mt-3 space-y-2">{occurrences.map(task=><div key={task.id} className="rounded-xl bg-white p-3">
          <div className="flex flex-wrap items-center justify-between gap-3"><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={!!task.completed} disabled={sync.loading||sync.saving||!!sync.error||busy} onChange={()=>void setTasks(current=>current.map(t=>t.id===task.id?{...t,completed:!t.completed}:t))} className="size-5 accent-[#4A7260]" />第{task.occurrenceNumber}次{task.completed?' · 已完成':''}</label>
          {!task.completed&&!task.archived&&<Link className="rounded-full border border-border px-3 py-2 text-sm text-forest" href={`/sessions?tasks=${task.id}`}>選擇場次</Link>}</div>
          <TaskSessionBadge taskId={task.id} />
        </div>)}{occurrences.length === 0 ? <p className="rounded-lg bg-white px-3 py-3 text-sm text-muted">{isPastWeek ? '這週沒有建立紀錄。過去週次不會事後補產生。' : !goal.active ? '已暫停，這週沒有建立新的次數。' : isBeyondNextWeek ? '這週尚未開放提前建立。' : '這週尚未建立次數。'}</p> : null}</div>
        <button type="button" disabled={busy||!ready} onClick={()=>void toggleGoal(goal)} className="mt-3 text-sm text-muted underline">{goal.active?'暫停未來重複':'恢復每週重複'}</button>
        {!goal.active&&<p className="mt-2 text-xs text-muted">已建立的次數與預約保留；暫停後不再產生新的週次。</p>}
      </details>;
    })}</div>
    <p className="mt-4 text-xs leading-6 text-muted">每次可分別完成或安排場次；新的一週重新累計，過去紀錄會保留。</p>
  </section>;
}
