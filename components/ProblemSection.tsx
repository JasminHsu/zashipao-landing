const values = [
  {
    number: "01",
    title: "先替它留一段時間",
    description: "不用等到很有自制力。選一場適合的 50 分鐘，讓那件事終於有開始的時間。"
  },
  {
    number: "02",
    title: "有人同行，不必一直聊天",
    description: "開場說好目標後，各自安靜處理自己的事。知道房裡還有人，就比較容易坐得住。"
  },
  {
    number: "03",
    title: "結束時，看見往前多少",
    description: "回來更新進度，不用比誰完成得多。做多少都留下紀錄，下一次可以接著走。"
  }
];

export function ProblemSection() {
  return (
    <section className="bg-[#DDEEF2] px-[6%] py-24 max-[720px]:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-[.85fr_1.15fr] gap-20 max-[900px]:grid-cols-1 max-[900px]:gap-12">
        <div>
          <p className="mb-5 text-sm font-bold text-[#244D3D]">我們都不是不想做</p>
          <h2 className="rv max-w-[650px] font-sans text-[clamp(2.6rem,5vw,5rem)] font-black leading-[1.06] text-ink">
            只是有些事，<br />一個人很難開始。
          </h2>
          <p className="mt-7 max-w-[470px] text-base leading-[1.8] text-ink/70">
            它們不一定很難，也不一定很急，卻總被更重要的事擠到後面。雜事房把「開始」拆成三件簡單的事。
          </p>
        </div>
        <div className="border-t border-ink/25">
          {values.map((value, index) => (
            <article className="rv grid grid-cols-[54px_1fr] gap-4 border-b border-ink/25 py-7" style={{ transitionDelay: `${index * 0.08}s` }} key={value.number}>
              <span className="pt-1 text-sm font-black text-[#C7462C]">{value.number}</span>
              <div>
                <h3 className="text-xl font-black text-ink">{value.title}</h3>
                <p className="mt-2 max-w-[560px] text-sm leading-[1.75] text-ink/70">{value.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
