"use client";

import { useEffect, useState } from "react";
import { useSharedTasks } from "./useSharedTasks";
import { readTasks, writeTasks } from "./taskStore";

export function SessionTaskEditor({ sessionId, initialTasks }: { sessionId: string; initialTasks: string[] }) {
  const [tasks] = useSharedTasks();
  const [ids, setIds] = useState<number[]>([]);
  const [draft, setDraft] = useState<number[] | null>(null);
  const [picker, setPicker] = useState(false);
  const [title, setTitle] = useState("");
  const [notice, setNotice] = useState("");
  const [ready, setReady] = useState(false);
  const storageKey = `zashipao:session-task-ids:${sessionId}`;

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "null");
      if (Array.isArray(saved) && saved.every(id => typeof id === "number")) {
        setIds(saved);
      } else {
        const legacy: unknown = JSON.parse(localStorage.getItem(`zashipao:session-tasks:${sessionId}`) ?? "null");
        const titles = Array.isArray(legacy) && legacy.every(t => typeof t === "string") ? legacy as string[] : initialTasks;
        const all = [...readTasks()];
        const selected = titles.map(text => {
          let task = all.find(t => t.title === text);
          if (!task) {
            task = { id: Math.max(Date.now(), ...all.map(t => t.id + 1)), title: text, deadline: "", firstNoticed: new Date().toISOString().slice(0, 10) };
            all.push(task);
          }
          return task.id;
        });
        writeTasks(all);
        localStorage.setItem(storageKey, JSON.stringify(selected));
        setIds(selected);
      }
    } catch { setIds(readTasks().filter(t => initialTasks.includes(t.title)).map(t => t.id)); }
    setReady(true);
  }, [storageKey, sessionId, initialTasks]);

  const selected = (draft ?? ids).map(id => tasks.find(task => task.id === id)).filter(task => task !== undefined);
  const available = tasks.filter(task => !task.completed && !task.archived);
  const button = "rounded-full border border-border px-4 py-2 text-sm font-bold text-muted hover:border-terracotta";

  return (
    <div className="mt-3 grid gap-2">
      {selected.map(task => (
        <div className="flex items-center justify-between gap-2 rounded-xl bg-cream px-3 py-2 text-sm font-semibold text-muted" key={task.id}>
          <span>{task.title}{task.completed ? "（已完成）" : task.archived ? "（已封存）" : ""}</span>
          {draft !== null ? <button type="button" className="shrink-0 p-1 text-terracotta" aria-label={`從本場移除${task.title}`} onClick={() => setDraft(draft.filter(id => id !== task.id))}>移除</button> : null}
        </div>
      ))}
      {draft === null ? (
        <button disabled={!ready} type="button" className={`${button} mt-1 justify-self-start`} onClick={() => { setDraft([...ids]); setPicker(false); setNotice(""); }}>編輯待辦</button>
      ) : (
        <>
          <button type="button" className="justify-self-start py-2 text-sm font-bold text-terracotta" aria-expanded={picker} onClick={() => setPicker(!picker)}>＋ 新增待辦</button>
          {picker ? (
            <div className="grid gap-3 rounded-xl border border-border p-3">
              <h3 className="text-sm font-bold">從待辦清單選取</h3>
              <div className="grid max-h-60 gap-2 overflow-y-auto">
                {available.map(task => (
                  <label className="flex items-center gap-2 rounded-lg bg-cream p-2 text-sm" key={task.id}>
                    <input type="checkbox" checked={draft.includes(task.id)} onChange={event => setDraft(event.target.checked ? [...draft, task.id] : draft.filter(id => id !== task.id))} />
                    <span className="flex-1">{task.title}</span>
                    {draft.includes(task.id) ? <span className="text-xs text-forest">已選</span> : null}
                  </label>
                ))}
                {!available.length ? <p className="text-sm text-muted">目前沒有未完成待辦，可以先建立一件。</p> : null}
              </div>
              <form className="grid gap-2 border-t border-border pt-3" onSubmit={event => {
                event.preventDefault();
                if (!title.trim()) return;
                try {
                  const all = readTasks();
                  const id = Math.max(Date.now(), ...all.map(task => task.id + 1));
                  const today = new Date().toISOString().slice(0, 10);
                  writeTasks([...all, { id, title: title.trim(), firstNoticed: today, deadline: "" }]);
                  setDraft([...draft, id]);
                  setTitle("");
                  setNotice("新待辦已加入待辦清單；取消編輯場次也會保留。");
                } catch { setNotice("無法儲存新待辦，請確認瀏覽器允許本機儲存。"); }
              }}>
                <label className="text-sm font-bold" htmlFor={`new-task-${sessionId}`}>或建立新待辦</label>
                <input id={`new-task-${sessionId}`} className="min-w-0 rounded-lg border border-border px-3 py-2 text-sm" value={title} onChange={event => setTitle(event.target.value)} placeholder="輸入想完成的事" />
                <button disabled={!title.trim()} className={`${button} justify-self-start disabled:opacity-40`} type="submit">建立並選取</button>
              </form>
            </div>
          ) : null}
          <p className="text-xs text-muted">移除只取消本場安排，不會刪除待辦。至少保留一件事項。</p>
          <div className="flex gap-2">
            <button type="button" disabled={!selected.length} className="rounded-full bg-terracotta px-4 py-2 text-sm font-bold text-white disabled:opacity-40" onClick={() => {
              try {
                const next = selected.map(task => task.id);
                localStorage.setItem(storageKey, JSON.stringify(next));
                window.dispatchEvent(new Event("zashipao-session-tasks"));
                setIds(next); setDraft(null); setPicker(false); setNotice("已儲存於此瀏覽器");
              } catch { setNotice("儲存失敗，請重試。變更尚未儲存。"); }
            }}>儲存待辦</button>
            <button type="button" className={button} onClick={() => { setDraft(null); setPicker(false); setTitle(""); setNotice(""); }}>取消</button>
          </div>
        </>
      )}
      <p role="status" className="text-xs text-muted">{notice}</p>
    </div>
  );
}
