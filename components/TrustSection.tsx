const trustPoints = [
  {
    label: "小房間",
    detail: "每房最多 5 人，不是公開的大型會議室。"
  },
  {
    label: "預約後進房",
    detail: "場次只開放已預約的成員進入。"
  },
  {
    label: "自己的進度",
    detail: "待辦與場次紀錄由登入後的個人帳號管理。"
  }
];

export function TrustSection() {
  return (
    <section className="bg-[#244D3D] px-[6%] py-16 text-white max-[720px]:py-12" aria-labelledby="trust-title">
      <div className="mx-auto grid max-w-6xl grid-cols-[.8fr_1.2fr] gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-9">
        <div>
          <p className="mb-4 text-sm font-bold text-[#F4C9B9]">加入前，先把規則說清楚</p>
          <h2 id="trust-title" className="font-sans text-[clamp(2.1rem,4vw,3.8rem)] font-black leading-[1.08]">
            小規模共做，<br />不靠誇大的數字。
          </h2>
          <p className="mt-5 max-w-[430px] text-sm leading-[1.75] text-white/80">
            雜事房目前仍在小規模測試。真實使用者見證會在確認內容與公開授權後再放上首頁。
          </p>
        </div>
        <div className="border-t border-white/25">
          {trustPoints.map((point, index) => (
            <div className="grid grid-cols-[42px_140px_1fr] gap-4 border-b border-white/25 py-5 max-[560px]:grid-cols-[36px_1fr]" key={point.label}>
              <span className="text-sm font-black text-[#F4C9B9]">0{index + 1}</span>
              <strong className="text-base">{point.label}</strong>
              <span className="text-sm leading-[1.7] text-white/80 max-[560px]:col-start-2">{point.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
