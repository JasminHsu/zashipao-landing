const questions = [
  {
    question: "參加前要準備什麼？",
    answer: "帶一件你想推進的生活雜事就好。預約時可以先把待辦放進場次，進房後再決定這 50 分鐘要做到哪裡。"
  },
  {
    question: "一場有多久、多少人？",
    answer: "每場 50 分鐘，每個房間最多 5 人。開場先說好各自的目標，中間安靜處理，結束前再回來更新進度。"
  },
  {
    question: "什麼時候可以進入場次？",
    answer: "已預約的使用者可在開始前 5 分鐘進入等候區，檢查裝置並準備進房。"
  },
  {
    question: "沒有全部做完也可以嗎？",
    answer: "可以。雜事房不是完成度比賽；結束時如實更新進度，未完成的待辦仍可保留，下一次再接著處理。"
  }
];

export function FAQ() {
  return (
    <section className="bg-white px-[6%] py-20 max-[720px]:py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-[.72fr_1.28fr] gap-20 max-[900px]:grid-cols-1 max-[900px]:gap-10">
        <div>
          <p className="mb-4 text-sm font-bold text-[#33614E]">常見問題</p>
          <h2 className="font-sans text-[clamp(2.5rem,4.7vw,4.8rem)] font-black leading-[1.08]">來之前，<br />可能想先知道。</h2>
        </div>
        <div className="border-t border-ink/25">
          {questions.map((item) => (
            <details className="group border-b border-ink/25" key={item.question}>
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-black [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="text-2xl font-normal text-[#C7462C] transition-transform motion-reduce:transition-none group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="max-w-[650px] pb-6 pr-12 text-sm leading-[1.8] text-ink/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
