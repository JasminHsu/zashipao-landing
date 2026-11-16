const timeBasedDefaults = new Set([
  "午間雜事衝刺",
  "晚間雜事衝刺"
]);

export function displaySessionTitle(title: string) {
  return timeBasedDefaults.has(title.trim()) ? "雜事房共同專注" : title;
}
