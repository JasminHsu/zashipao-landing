import { SectionHeading } from "./SectionHeading";

const problems = [
  {
    number: "01",
    title: "「等我有空再說」",
    description: "更新護照、申辦補助、預約健檢——這些事沒有截止日，所以永遠被推到最後。",
    quote: "你清單上最老的事，是幾天前加的？"
  },
  {
    number: "02",
    title: "一個人坐下來做不到",
    description: "打開政府網站、找文件、填表、等信件——光是「要開始」就讓你想關掉視窗。",
    quote: "有人陪著做，就莫名其妙可以了"
  },
  {
    number: "03",
    title: "沒有工具幫你記帳",
    description: "這件事你已經想做多久了？ 沒人知道。拖延的壓力悄悄累積，但你看不見。",
    quote: "拖延本身就是一種消耗"
  }
];

export function ProblemSection() {
  return (
    <section className="bg-ink px-[6%] py-22">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="你也這樣嗎？"
          title={
            <>
              雜事為什麼永遠
              <br />
              做不完？
            </>
          }
          subtitle={
            <>
              它不急、不緊、但一直在那裡。
              <br />
              等你「有空」的時候，就是它永遠不會被做完的原因。
            </>
          }
          light
        />
        <div className="mt-12 grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
          {problems.map((problem, index) => (
            <div
              className="rv rounded-2xl border border-white/10 bg-white/[.04] p-7"
              style={{ transitionDelay: `${index * 0.1}s` }}
              key={problem.number}
            >
              <div className="mb-4 font-serif text-6xl font-black leading-none text-white/[.07]">{problem.number}</div>
              <div className="mb-2 text-base font-bold text-white">{problem.title}</div>
              <p className="text-sm leading-[1.65] text-white/50">{problem.description}</p>
              <div className="mt-4 inline-flex rounded-r-lg border-l-[3px] border-terracotta bg-terracotta/15 px-3 py-1.5 text-sm italic text-white/60">
                {problem.quote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
