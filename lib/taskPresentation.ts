type RecurringTask = {
  title: string;
  weeklyGoalId?: string;
  occurrenceWeek?: string;
  occurrenceNumber?: number;
};

export function taskDisplayTitle(task: RecurringTask): string {
  if (!task.weeklyGoalId) return task.title;
  return task.title.split('｜', 1)[0].trim() || task.title;
}

export function snapshotTaskDisplayTitle(title: string): string {
  return title.replace(/\s*[｜|]\s*\d{1,2}\/\d{1,2}\s+這週第\d+次\s*$/, '').trim() || title;
}

export function recurringTaskMeta(task: RecurringTask): string | null {
  if (!task.weeklyGoalId || !task.occurrenceWeek || !task.occurrenceNumber) return null;
  const start = new Date(`${task.occurrenceWeek}T00:00:00Z`);
  if (Number.isNaN(start.getTime())) return `第 ${task.occurrenceNumber} 次`;
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  const shortDate = (value: Date) => `${value.getUTCMonth() + 1}/${value.getUTCDate()}`;
  return `${shortDate(start)}–${shortDate(end)} · 第 ${task.occurrenceNumber} 次`;
}
