import { SectionHeading } from "./SectionHeading";

const features = [
  {
    icon: "⏱",
    iconClass: "bg-amberish-lt",
    title: "拖延指數追蹤",
    description: "每件雜事都記錄第一次想到的日期，即時顯示「你已經拖了幾天」，讓拖延變得有感。",
    badge: "核心功能",
    badgeClass: "bg-terracotta-lt text-terracotta"
  },
  {
    icon: "📢",
    iconClass: "bg-terracotta-lt",
    title: "場次公告欄",
    description: "每場次開始前，在公告欄貼上你要做的事。公開承諾讓完成率提升 3 倍。",
    badge: "核心功能",
    badgeClass: "bg-terracotta-lt text-terracotta"
  },
  {
    icon: "🏆",
    iconClass: "bg-forest-lt",
    title: "雜事完成排行",
    description: "累計完成件數、拖延天數、連續週數的社群排行榜。讓清除雜事變成一件有成就感的事。",
    badge: "社群功能",
    badgeClass: "bg-lavender-lt text-lavender"
  },
  {
    icon: "🌿",
    iconClass: "bg-lavender-lt",
    title: "短暫互相交代，主要時間安靜做",
    description: "開場說一下這場要完成什麼，結束回報進度就能離開。想多聊的人，可以再留下來分享五分鐘。"
  },
  {
    icon: "🟢",
    iconClass: "bg-[#E8F5E9]",
    title: "LINE 場次通知",
    description: "開場前 10 分鐘 LINE 推播提醒，你選的場次不會忘。不用開網頁等待。",
    badge: "台灣在地",
    badgeClass: "bg-forest-lt text-forest"
  },
  {
    icon: "🪑",
    iconClass: "bg-cream-dd",
    title: "每個人處理自己的事",
    description: "同一個房間裡，不需要做同類型雜事。有人填表、有人預約、有人整理帳單，重點是一起開始。"
  }
];

export function Features() {
  return (
    <section id="features" className="bg-cream-d px-[6%] py-22">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="雜事房專屬功能"
          title="不是工作生產力工具，是生活雜事的完成場"
          subtitle={
            <>
              專門處理那些沒有天然 deadline、但一直卡在心裡的事：
              <em className="font-bold not-italic">不難，卻很容易被生活擠掉。</em>
            </>
          }
        />
        <div className="mt-12 grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
          {features.map((feature, index) => (
            <div
              className="rv rounded-2xl border-[1.5px] border-border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-border-d hover:shadow-lift"
              style={{ transitionDelay: `${(index % 3) * 0.07}s` }}
              key={feature.title}
            >
              <div className={`mb-4 flex size-10 items-center justify-center rounded-[10px] text-2xl ${feature.iconClass}`}>{feature.icon}</div>
              <div className="mb-1.5 text-[.95rem] font-bold">{feature.title}</div>
              <p className="text-sm leading-[1.6] text-muted">{feature.description}</p>
              {feature.badge ? (
                <span className={`mt-3 inline-block rounded px-2 py-1 text-[.68rem] font-bold tracking-normal ${feature.badgeClass}`}>
                  {feature.badge}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
