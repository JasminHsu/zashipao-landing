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
    icon: "🗂",
    iconClass: "bg-lavender-lt",
    title: "雜事分類系統",
    description: "文件行政、健康醫療、財務、家務、社交——找到跟你做同類型雜事的人一起衝。"
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
    icon: "🌙",
    iconClass: "bg-cream-dd",
    title: "台灣時區場次",
    description: "早晨、午休、下班後、夜間四個時段，每天 10+ 場次，UTC+8 優先設計，不用配合美國時間。",
    badge: "台灣在地",
    badgeClass: "bg-forest-lt text-forest"
  }
];

export function Features() {
  return (
    <section id="features" className="bg-cream-d px-[6%] py-22">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="雜事房專屬功能"
          title="不只是共同工作空間"
          subtitle={
            <>
              Flow Club 適合工作。雜事房專門為
              <em className="font-bold not-italic">生活中被擠掉的那些事</em>
              設計。
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
