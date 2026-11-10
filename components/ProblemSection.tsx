const values = [
  {
    number: "01",
    title: "先替它留一段時間",
    description: "選一場適合的 50 分鐘，先替那件一直被延後的事留個位置。"
  },
  {
    number: "02",
    title: "有人同行，但不必聊天",
    description: "開場說好各自的目標，接著安靜做自己的事。知道房裡還有人，就比較容易坐得住。"
  },
  {
    number: "03",
    title: "結束時，回顧自己的進度",
    description: "回來看看這次完成到哪裡，留下自己的里程碑，下一次再接著走。"
  }
];

export function ProblemSection() {
  return (
    <section id="how" className="bg-[#DDEEF2] px-[6%] py-20 max-[720px]:py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-[.85fr_1.15fr] gap-20 max-[900px]:grid-cols-1 max-[900px]:gap-12">
        <div>
          <p className="mb-5 text-sm font-bold text-[#244D3D]">我們都不是不想做</p>
          <h2 className="rv max-w-[650px] font-sans text-[clamp(2.6rem,5vw,5rem)] font-black leading-[1.06] text-ink">
            只是有些事，<br />一個人很難開始。
          </h2>
          <p className="mt-6 max-w-[470px] text-base leading-[1.75] text-ink/70">
            雜事房替你留一段時間。和其他人一起開始，各自完成，再回來看看這次走了多遠。
          </p>
        </div>
        <div className="border-t border-ink/25">
          {values.map((value, index) => (
            <article className="rv grid grid-cols-[54px_1fr] gap-4 border-b border-ink/25 py-6" style={{ transitionDelay: `${index * 0.08}s` }} key={value.number}>
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
