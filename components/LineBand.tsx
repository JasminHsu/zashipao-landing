export function LineBand() {
  return (
    <div className="flex items-center justify-between gap-5 bg-[#06C755] px-[6%] py-5 max-[900px]:flex-col max-[900px]:text-center">
      <div className="flex items-center gap-4 max-[720px]:flex-col">
        <div className="flex h-[42px] min-w-16 items-center justify-center rounded-[10px] bg-white px-2 font-sans text-lg font-black text-[#06C755]">
          LINE
        </div>
        <div className="text-white">
          <div className="text-[.95rem] font-bold">加入 LINE 官方帳號，場次提醒直接送到你手上</div>
          <div className="text-sm opacity-85">開場前 10 分鐘推播通知，從不讓你忘記自己預約的雜事時間</div>
        </div>
      </div>
      <a href="/signup" className="whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#06C755] no-underline">
        加入 LINE 帳號
      </a>
    </div>
  );
}
