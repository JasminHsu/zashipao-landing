'use client';
import Link from 'next/link';
import { useSharedTasks } from './useSharedTasks';
export function TaskSyncStatus() {
  const [, , sync] = useSharedTasks();
  if (!sync.error && !sync.loading && !sync.saving && sync.userId) return null;
  return <div className="my-3 text-sm text-muted" role={sync.error ? 'alert' : 'status'}>
    {sync.error ? <>{sync.error} {!sync.userId ? <Link href="/login" className="font-bold text-terracotta underline">重新登入</Link> : <button type="button" className="font-bold text-terracotta underline" onClick={() => void sync.reload()}>重新載入</button>}</>
      : sync.loading ? '正在載入你的待辦…' : sync.saving ? '正在儲存…' : <><Link href="/login" className="font-bold text-terracotta underline">登入</Link>後查看待辦。</>}
  </div>;
}
