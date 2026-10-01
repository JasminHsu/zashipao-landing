export function SessionAvailability({ bookedCount }: { bookedCount: number }) {
  const booked = Math.min(5, Math.max(0, Math.floor(bookedCount)));
  const remaining = 5 - booked;

  return (
    <div className="min-w-[110px] text-sm text-muted">
      <div className="mb-1.5">{booked} / 5 人</div>
      <div className="h-1 overflow-hidden rounded bg-cream-d" aria-hidden="true">
        <div className="h-full rounded bg-terracotta" style={{ width: `${booked / 5 * 100}%` }} />
      </div>
      <div className="mt-2 text-xs font-semibold text-terracotta">{remaining > 0 ? `還有 ${remaining} 個名額` : "已額滿"}</div>
    </div>
  );
}
