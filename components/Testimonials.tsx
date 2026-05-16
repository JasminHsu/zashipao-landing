import { SectionHeading } from "./SectionHeading";

const testimonials = [
  {
    text: "更新護照的事我放了兩個月。加入場次之後，有人一起坐著做，莫名其妙就把表格填完了，連預約日期都選好了。",
    avatar: "品",
    avatarClass: "bg-terracotta-lt text-terracotta",
    name: "思品",
    role: "行銷企劃 · 台北"
  },
  {
    text: "我是那種一個人在家絕對坐不下來處理行政的人。在場次裡知道旁邊有人在做他們的雜事，突然就有一種「好啦我也來」的感覺。",
    avatar: "威",
    avatarClass: "bg-forest-lt text-forest",
    name: "聖威",
    role: "軟體工程師 · 新竹"
  },
  {
    text: "拖延指數這個設計真的很妙。看到「你已經拖了 47 天」，心裡那個說不出的壓力有了形狀，反而更容易下定決心做。",
    avatar: "怡",
    avatarClass: "bg-lavender-lt text-lavender",
    name: "雅怡",
    role: "人資顧問 · 台中"
  }
];

export function Testimonials() {
  return (
    <section className="bg-cream-d px-[6%] py-22">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="用戶回饋"
          title={
            <>
              他們拖了幾十天的事，
              <br />
              在一個小時內搞定了
            </>
          }
        />
        <div className="mt-10 grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
          {testimonials.map((testimonial, index) => (
            <div
              className="rv rounded-2xl border-[1.5px] border-border bg-white p-6"
              style={{ transitionDelay: `${index * 0.1}s` }}
              key={testimonial.name}
            >
              <div className="mb-3 font-serif text-2xl font-black leading-none text-terracotta">&quot;</div>
              <p className="mb-4 text-sm leading-[1.65] text-muted">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className={`flex size-[34px] shrink-0 items-center justify-center rounded-full text-xs font-bold ${testimonial.avatarClass}`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{testimonial.name}</div>
                  <div className="text-xs text-light">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
