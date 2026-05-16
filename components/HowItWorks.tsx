import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    number: "1",
    icon: "📋",
    iconClass: "bg-terracotta-lt",
    title: "挑一件你一直在拖的事",
    description: "把那件「等一下再說」的事加進你的雜事清單，記錄你第一次想到它是什麼時候。"
  },
  {
    number: "2",
    icon: "🤝",
    iconClass: "bg-forest-lt",
    title: "加入場次，公開承諾",
    description: "選一個適合你的時間加入共事場次，開始前說好你要完成什麼。其他人也在做他們的事。"
  },
  {
    number: "3",
    icon: "🎉",
    iconClass: "bg-amberish-lt",
    title: "50 分鐘後，一起慶祝",
    description: "時間到，分享你完成了什麼，看看其他人做了哪些事，累積連續完成紀錄。"
  }
];

export function HowItWorks() {
  return (
    <section id="how" className="px-[6%] py-22">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="三步驟" title="就這麼簡單" subtitle="不用下載 app，不用建立群組，打開網頁就能開始。" />
        <div className="relative mt-12 grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          <div className="absolute left-[calc(33.33%_+_0.5rem)] top-10 h-0.5 w-[calc(33.33%_-_1rem)] bg-border max-[900px]:hidden" />
          <div className="absolute left-[calc(66.66%_+_0.5rem)] top-10 h-0.5 w-[calc(33.33%_-_1rem)] bg-border max-[900px]:hidden" />
          {steps.map((step, index) => (
            <div
              className="rv relative rounded-2xl border-[1.5px] border-border bg-white p-8 transition-all duration-200 hover:border-terracotta hover:shadow-soft"
              style={{ transitionDelay: `${index * 0.12}s` }}
              key={step.number}
            >
              <div className="absolute right-6 top-6 select-none font-serif text-6xl font-black leading-none text-cream-d">{step.number}</div>
              <div className={`mb-5 flex size-11 items-center justify-center rounded-xl text-xl ${step.iconClass}`}>{step.icon}</div>
              <div className="mb-2 font-serif text-[1.05rem] font-bold">{step.title}</div>
              <p className="text-sm leading-[1.65] text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
