"use client";

import { useState } from "react";

const previewParticipants = [
  { name: "你", task: "補齊所得稅資料", color: "bg-[#FFD4C9] text-[#9B3E29]", active: true },
  { name: "芯", task: "更新護照照片預約", color: "bg-[#CBE3D5] text-[#285A46]" },
  { name: "岳", task: "整理健保卡與保單", color: "bg-[#D8D2EA] text-[#574779]" },
  { name: "婷", task: "繳交國民年金", color: "bg-[#F1D88A] text-[#755A14]" }
];

const previewTasks = ["補齊所得稅延期申報資料", "預約牙醫洗牙", "回覆房東確認維修時間"];

const stages = [
  {
    id: "opening",
    label: "開場",
    status: "準備開場",
    timer: "50:00",
    completed: 0,
    progress: "0%",
    presence: "已進房",
    note: "先說好這場想完成什麼，再一起開始。"
  },
  {
    id: "focus",
    label: "專注中",
    status: "專注工作中",
    timer: "49:55",
    completed: 0,
    progress: "8%",
    presence: "在線",
    note: "中間安靜各做各的；結束時再回來分享進度。"
  },
  {
    id: "sharing",
    label: "結束分享",
    status: "回來分享",
    timer: "00:00",
    completed: 2,
    progress: "67%",
    presence: "回來了",
    note: "更新完成進度，也聽聽彼此往前了多少。"
  }
] as const;

type StageId = (typeof stages)[number]["id"];

export function RoomPreview() {
  const [stageId, setStageId] = useState<StageId>("focus");
  const stage = stages.find((item) => item.id === stageId) ?? stages[1];

  const moveTab = (currentIndex: number, key: string, buttons: NodeListOf<HTMLButtonElement>) => {
    let nextIndex = currentIndex;
    if (key === "ArrowRight") nextIndex = (currentIndex + 1) % stages.length;
    else if (key === "ArrowLeft") nextIndex = (currentIndex - 1 + stages.length) % stages.length;
    else if (key === "Home") nextIndex = 0;
    else if (key === "End") nextIndex = stages.length - 1;
    else return;
    setStageId(stages[nextIndex].id);
    buttons[nextIndex]?.focus();
  };

  return (
    <section className="overflow-hidden bg-white px-[5%] py-24 max-[720px]:py-16">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-12 grid grid-cols-[.8fr_1.2fr] items-end gap-12 max-[760px]:grid-cols-1 max-[760px]:gap-5">
          <div>
            <p className="mb-4 text-sm font-bold text-[#33614E]">進房後會看到什麼</p>
            <h2 className="rv font-serif text-[clamp(2.5rem,4.5vw,4.6rem)] font-black leading-[1.08] text-ink">看見彼此，<br />不需要互相打擾。</h2>
          </div>
          <p className="max-w-[500px] text-base leading-[1.8] text-ink/60">
            每個人先放上這場想完成的事，接著安靜各做各的。你會知道房裡還有人也正在努力，結束時再一起回來更新進度。
          </p>
        </div>

        <div className="mb-4 flex items-end justify-between border-b border-ink/15 text-sm font-bold text-ink/45 max-[560px]:items-center">
          <div className="grid grid-cols-3" role="tablist" aria-label="房間流程示意">
            {stages.map((item, index) => {
              const selected = item.id === stageId;
              return (
                <button
                  key={item.id}
                  id={`room-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="room-stage-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`min-h-11 border-b-2 px-4 pb-3 pt-1 text-center transition-colors max-[420px]:px-2 ${selected ? "border-[#FF5A36] text-ink" : "border-transparent text-ink/45 hover:text-ink"}`}
                  onClick={() => setStageId(item.id)}
                  onKeyDown={(event) => moveTab(index, event.key, event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? document.querySelectorAll<HTMLButtonElement>('[role="tab"]'))}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <span className="pb-3 max-[560px]:hidden">一場 50 分鐘的共做時間</span>
        </div>

        <figure id="room-stage-panel" role="tabpanel" aria-labelledby={`room-tab-${stage.id}`}>
          <figcaption className="sr-only" aria-live="polite">雜事房{stage.label}畫面示意：{stage.note}</figcaption>
          <div className="overflow-hidden rounded-md border border-black/15 bg-[#171412] shadow-[0_22px_60px_rgba(23,20,18,.16)]" aria-hidden="true">
            <div className="flex min-h-16 items-center justify-between gap-4 border-b border-white/10 px-5 py-3 text-white max-[560px]:items-start">
              <div className="flex items-center gap-4">
                <span className="font-sans text-lg font-black">雜事房</span><span className="h-5 w-px bg-white/15" />
                <span><strong className="block text-sm">晚間雜事衝刺 #3</strong><span className="mt-0.5 block text-xs text-white/45">今晚 21:00 - 21:50 · 4 / 5 人</span></span>
              </div>
              <div className="flex shrink-0 items-center gap-3 max-[560px]:flex-col max-[560px]:items-end max-[560px]:gap-1.5">
                <span className="flex items-center gap-2 whitespace-nowrap text-xs font-bold text-[#89C6AA]"><span className="size-1.5 rounded-full bg-current" />{stage.status}</span>
                <span className="min-w-[74px] border border-white/20 px-4 py-1.5 text-center font-mono text-lg font-bold">{stage.timer}</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_270px]">
              <div className="grid grid-cols-2 gap-3 p-3 max-[480px]:grid-cols-1">
                {previewParticipants.map((participant) => (
                  <div className={`relative flex min-h-[170px] items-center justify-center border bg-white/[.055] max-[480px]:min-h-[150px] ${participant.active ? "border-[#FF5A36]" : "border-white/10"}`} key={participant.name}>
                    <span className="absolute right-3 top-3 text-[.68rem] font-bold text-white/40">{stage.presence}</span>
                    <div className="text-center text-white">
                      <span className={`mx-auto flex size-14 items-center justify-center rounded-full text-lg font-black ${participant.color}`}>{participant.name}</span>
                      <strong className="mt-3 block text-sm">{participant.name === "你" ? "你" : `${participant.name} 的雜事時間`}</strong>
                      <span className="mt-1 block text-xs text-white/40">{participant.task}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-l border-white/10 bg-[#F7F9F7] p-5 text-ink max-lg:border-l-0 max-lg:border-t">
                <span className="text-xs font-bold text-[#33614E]">本場承諾</span>
                <p className="mt-1 font-sans text-2xl font-black">{stage.completed} / 3 已完成</p>
                <div className="mt-4 h-1.5 bg-black/10"><div className="h-full bg-[#33614E] transition-[width] duration-500 motion-reduce:transition-none" style={{ width: stage.progress }} /></div>
                <div className="mt-6 space-y-3">
                  {previewTasks.map((task, index) => (
                    <div className="flex gap-3 border-b border-black/10 pb-3" key={task}>
                      <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center border ${index < stage.completed ? "border-[#33614E] bg-[#33614E] text-white" : "border-black/20 bg-white text-transparent"}`}>✓</span>
                      <span className={`text-sm font-bold leading-5 ${index < stage.completed ? "text-ink/55 line-through" : ""}`}>{task}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-5 text-ink/45">{stage.note}</p>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
