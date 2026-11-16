export function SessionAvailability({ bookedCount, capacity = 5 }: { bookedCount: number; capacity?: number }) {
  const booked = Math.min(capacity, Math.max(0, Math.floor(bookedCount)));
  return (
    <div className="min-w-[110px] text-sm text-muted">
      <div className="mb-1.5">{booked} / {capacity} 人</div>
      <div className="h-1 overflow-hidden rounded bg-cream-d" aria-hidden="true">
        <div className="h-full rounded bg-terracotta" style={{ width: `${booked / capacity * 100}%` }} />
      </div>
    </div>
  );
}
