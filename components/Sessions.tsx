import { SessionAvailability } from "./SessionAvailability";
import { ButtonLink } from "./ButtonLink";

const sessions = [
  {
    date: "9/30 週三",
    time: "21:00 – 21:50",
    title: "晚間雜事衝刺",
    bookedCount: 4,
    live: true
  },
  {
    date: "9/30 週三",
    time: "22:00 – 22:50",
    title: "睡前雜事清空場",
    bookedCount: 3,
    live: false
  },
  {
    date: "10/1 週四",
    time: "12:00 – 12:50",
    title: "午間一起做一件事",
    bookedCount: 2,
    live: false
  },
  {
    date: "10/3 週六",
    time: "10:00 – 10:50",
    title: "週末雜事整理場",
    bookedCount: 4,
    live: false
  }
] as const;

export function Sessions() {
  return (
    <section id="sessions" className="bg-[#F7F9F7] px-[6%] py-24 max-[720px]:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between gap-8 max-[720px]:items-start">
          <div>
            <p className="mb-4 text-sm font-bold text-[#244D3D]">近期場次</p>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] font-black leading-[1.06]">找一段時間，<br />留給那件事。</h2>
          </div>
          <ButtonLink href="/login" variant="outline" className="border-black/25 bg-[#FFFDF8] px-5 py-2.5 max-[600px]:hidden">
            查看所有場次
          </ButtonLink>
        </div>

        <div className="rv border-t-2 border-ink">
          {sessions.map((session) => (
            <div
              className="grid grid-cols-[130px_160px_1fr_120px_auto] items-center gap-6 border-b border-ink/25 py-6 max-[900px]:grid-cols-[120px_1fr_auto] max-[620px]:grid-cols-[1fr_auto] max-[620px]:gap-2"
              key={`${session.date}-${session.time}`}
            >
              <div className="text-sm font-bold max-[620px]:col-span-2">{session.date}</div>
              <div className="text-sm text-ink/65 max-[900px]:col-start-1 max-[620px]:col-span-2">{session.time}</div>
              <div className="flex items-center gap-3 font-serif text-xl font-bold max-[900px]:col-start-2 max-[900px]:row-start-1 max-[620px]:col-start-1 max-[620px]:row-auto">
                {session.title}
                {session.live ? <span className="rounded-sm bg-[#244D3D] px-2 py-1 font-sans text-[.68rem] font-bold text-white">進行中</span> : null}
              </div>
              <div className="max-[900px]:hidden">
                <SessionAvailability bookedCount={session.bookedCount} />
              </div>
              <ButtonLink href="/login" variant={session.live ? "primary" : "outline"} className={session.live ? "bg-[#F26C4F] px-5 py-2.5 font-bold hover:bg-ink" : "border-black/25 bg-[#FFFDF8]/70 px-5 py-2.5 font-bold hover:bg-[#FFFDF8]"}>
                {session.live ? "加入場次" : "預約"}
              </ButtonLink>
            </div>
          ))}
        </div>
        <ButtonLink href="/login" variant="outline" className="mt-8 hidden border-black/25 bg-[#FFFDF8] px-5 py-2.5 max-[600px]:inline-flex">
          查看所有場次
        </ButtonLink>
      </div>
    </section>
  );
}
