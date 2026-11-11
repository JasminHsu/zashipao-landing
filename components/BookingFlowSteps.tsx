type BookingFlowStepsProps = {
  current: 1 | 2;
  selectedTaskCount?: number;
};

export function BookingFlowSteps({ current, selectedTaskCount = 0 }: BookingFlowStepsProps) {
  const steps = [
    { number: 1, label: "選擇場次" },
    { number: 2, label: "決定這場要做什麼" }
  ] as const;

  return (
    <ol aria-label="預約進度" className="mb-7 flex flex-wrap items-center gap-2 text-sm">
      {steps.map(step => {
        const active = step.number === current;
        const complete = step.number < current;
        return (
          <li
            key={step.number}
            aria-current={active ? "step" : undefined}
            className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 py-2 font-bold ${
              active
                ? "bg-terracotta text-ink"
                : complete
                  ? "bg-terracotta-lt text-terracotta"
                  : "bg-cream-d text-muted"
            }`}
          >
            <span aria-hidden="true">{complete ? "✓" : step.number}</span>
            <span>{step.label}</span>
          </li>
        );
      })}
      {current === 1 && selectedTaskCount > 0 ? (
        <li className="text-sm text-forest">已從待辦清單帶入 {selectedTaskCount} 件</li>
      ) : null}
    </ol>
  );
}
