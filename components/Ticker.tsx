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
        {[false, true].map((duplicate) => (
          <div className="flex" aria-hidden={duplicate || undefined} key={String(duplicate)}>
            {taskExamples.map((item) => (
              <span className="flex shrink-0 items-center gap-3 px-10 text-sm text-white/80" key={item}>
                <span className="size-1.5 rounded-full bg-[#FF5A36]" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
      <label
        htmlFor="ticker-paused"
        className="ticker-toggle absolute right-2 top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/35 bg-ink text-sm text-white transition hover:border-white/70 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white motion-reduce:transition-none"
        title="暫停或播放待辦跑馬燈"
      />
    </div>
  );
}
