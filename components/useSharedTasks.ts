"use client";
import { useEffect, useState, type SetStateAction } from "react";
import { initialTasks, readTasks, writeTasks, type Task } from "./taskStore";

export function useSharedTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  useEffect(() => {
    const refresh = () => setTasks(readTasks());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("zashipao-tasks", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("zashipao-tasks", refresh);
    };
  }, []);
  function updateTasks(update: SetStateAction<Task[]>) {
    const current = readTasks();
    const next = typeof update === "function" ? update(current) : update;
    writeTasks(next);
    setTasks(next);
  }
  return [tasks, updateTasks] as const;
}
