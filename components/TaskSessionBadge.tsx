"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { upcomingSessions } from "./sessionData";
import { readTasks } from "./taskStore";

export function TaskSessionBadge({ taskId }: { taskId: number }) {
  const [sessions, setSessions] = useState<typeof upcomingSessions>([]);
  useEffect(() => {
    const refresh = () => setSessions(upcomingSessions.filter(session => {
      const key = `${session.date}-${session.time}`;
      try {
        const saved: unknown = JSON.parse(localStorage.getItem(`zashipao:session-task-ids:${key}`) ?? "null");
        if (Array.isArray(saved)) return saved.includes(taskId);
        const legacy: unknown = JSON.parse(localStorage.getItem(`zashipao:session-tasks:${key}`) ?? "null");
        if (Array.isArray(legacy)) return legacy.includes(readTasks().find(task => task.id === taskId)?.title);
      } catch {}
      return session.taskIds.includes(taskId);
    }));
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("zashipao-session-tasks", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("zashipao-session-tasks", refresh);
    };
  }, [taskId]);

  if (!sessions.length) return null;
  const links = sessions.map(session => (
    <Link key={session.id} href={`/my-sessions#${session.id}`} className="block whitespace-nowrap py-1 text-xs font-medium text-lavender no-underline hover:underline hover:underline-offset-4">
      已排入 {Number(session.date.split("/")[1])}/{Number(session.date.split("/")[2].slice(0, 2))} {session.time.split(" - ")[0]} →
    </Link>
  ));
  return (
    <div className="mt-2">
      {sessions.length === 1 ? links : (
        <details>
          <summary className="w-fit cursor-pointer rounded bg-lavender-lt px-2 py-1 text-xs font-bold text-lavender">已排入 {sessions.length} 場</summary>
          {links}
        </details>
      )}
    </div>
  );
}
