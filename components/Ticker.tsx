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
    <div className="relative overflow-hidden bg-ink py-3.5 pr-14 text-white">
      <input id="ticker-paused" type="checkbox" className="peer sr-only" aria-label="暫停或播放待辦跑馬燈" />
      <div className="flex w-max animate-tick peer-checked:[animation-play-state:paused]">
        {[...taskExamples, ...taskExamples].map((item, index) => (
          <span className="flex shrink-0 items-center gap-3 px-10 text-sm text-white/75" key={`${item}-${index}`}>
            <span className="size-1.5 rounded-full bg-[#FF5A36]" />
            {item}
          </span>
        ))}
      </div>
      <label
        htmlFor="ticker-paused"
        className="ticker-toggle absolute right-3 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/25 bg-ink text-sm text-white transition hover:border-white/60 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white"
        title="暫停或播放"
      />
    </div>
  );
}
