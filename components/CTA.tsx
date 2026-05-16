import { ButtonLink } from "./ButtonLink";

const stats = [
  ["1,247", "累積用戶"],
  ["8,431", "雜事完成件數"],
  ["34", "平均拖延天數"],
  ["10+", "每日場次數"]
];

export function CTA() {
  return (
    <section className="bg-terracotta px-[6%] py-22 text-center">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto mb-4 max-w-[600px] font-serif text-4xl font-black leading-[1.3] tracking-normal text-white">
          你清單上最老的那件事，
          <br />
          今晚就做完它
        </h2>
        <p className="mx-auto mb-9 max-w-[500px] text-[1.02rem] leading-[1.75] text-white/80">
          免費加入，第一場次今晚 21:00。
          <br />
          不需要下載 app，打開瀏覽器就能開始。
        </p>
        <ButtonLink href="/signup" variant="white" className="px-9 py-3.5 text-base font-bold">
          免費加入，今晚就開始
        </ButtonLink>
        <div className="mt-4 text-sm text-white/60">完全免費 · 不需要信用卡 · 隨時可以取消</div>
        <div className="mt-12 flex justify-center gap-12 max-[720px]:grid max-[720px]:grid-cols-2 max-[720px]:gap-6">
          {stats.map(([value, label]) => (
            <div className="text-white" key={label}>
              <div className="font-serif text-4xl font-black leading-none">{value}</div>
              <div className="mt-1 text-sm opacity-70">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
