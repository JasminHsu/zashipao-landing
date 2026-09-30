const taskExamples = [
  "預約牙醫",
  "取消訂閱",
  "申請退款",
  "整理帳單",
  "回覆訊息",
  "填完表格",
  "備份照片",
  "更新履歷"
];

export function Ticker() {
  return (
    <div className="overflow-hidden border-y border-border bg-cream-d py-2">
      <div className="flex w-max animate-tick">
        {[...taskExamples, ...taskExamples].map((item, index) => (
          <span className="flex shrink-0 items-center gap-2 px-10 text-sm text-muted" key={`${item}-${index}`}>
            <span className="text-xs font-bold text-forest">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
