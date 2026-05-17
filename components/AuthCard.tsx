"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Logo } from "./Logo";

type AuthMode = "login" | "signup";

type AuthCardProps = {
  mode: AuthMode;
};

const copy = {
  login: {
    eyebrow: "歡迎回來",
    title: "回到你的雜事房",
    subtitle: "登入後可以查看已預約場次、雜事清單和完成紀錄。",
    button: "登入",
    switchText: "還沒有帳號？",
    switchAction: "免費加入",
    switchHref: "/signup",
    helper: "目前是靜態展示版，正式登入功能會在接上 Supabase 後開放。",
    success: "登入功能即將開放。下一步接上 Supabase 後，這裡就會真的建立登入狀態。"
  },
  signup: {
    eyebrow: "免費開始",
    title: "加入第一批雜事房成員",
    subtitle: "先建立帳號入口，之後可以接上等待名單、LINE 通知和正式會員系統。",
    button: "建立帳號",
    switchText: "已經有帳號？",
    switchAction: "登入",
    switchHref: "/login",
    helper: "目前先保留 Email 註冊入口，不會真的送出資料。",
    success: "註冊功能即將開放。接上 Supabase 後，這裡會正式建立會員帳號。"
  }
};

export function AuthCard({ mode }: AuthCardProps) {
  const [message, setMessage] = useState("");
  const current = copy[mode];
  const isSignup = mode === "signup";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(current.success);
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-[1fr_1.05fr] px-[6%] py-8 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <section className="flex flex-col justify-between py-8 max-[900px]:py-0">
          <Logo />
          <div className="max-w-[440px] max-[900px]:mt-12">
            <div className="mb-4 inline-flex rounded-full border border-terracotta/20 bg-terracotta-lt px-3 py-1 text-xs font-bold text-terracotta">
              50 分鐘，把一件事做完
            </div>
            <h1 className="mb-5 font-serif text-5xl font-black leading-tight tracking-normal max-[720px]:text-4xl">
              {isSignup ? "把拖著的事，變成今天完成的事" : "繼續清掉那些一直掛心的小事"}
            </h1>
            <p className="text-[1.02rem] leading-[1.75] text-muted">
              雜事房把生活行政、預約、退款、整理文件這些容易被擠掉的任務，放進一個有人一起開始、一起收尾的共事節奏。
            </p>
          </div>
          <div className="grid max-w-[520px] grid-cols-3 gap-3 text-sm max-[900px]:hidden">
            <div className="rounded-2xl border border-border bg-white/70 p-4">
              <div className="font-serif text-2xl font-black text-terracotta">50</div>
              <div className="text-muted">分鐘場次</div>
            </div>
            <div className="rounded-2xl border border-border bg-white/70 p-4">
              <div className="font-serif text-2xl font-black text-forest">8,431</div>
              <div className="text-muted">件雜事完成</div>
            </div>
            <div className="rounded-2xl border border-border bg-white/70 p-4">
              <div className="font-serif text-2xl font-black text-lavender">10+</div>
              <div className="text-muted">每日場次</div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-[460px] rounded-xl2 border-[1.5px] border-border bg-white p-8 shadow-lift max-[520px]:p-6">
            <div className="mb-7">
              <div className="mb-2 text-xs font-bold uppercase tracking-[.1em] text-terracotta">{current.eyebrow}</div>
              <h2 className="mb-2 font-serif text-3xl font-black tracking-normal">{current.title}</h2>
              <p className="text-sm leading-[1.7] text-muted">{current.subtitle}</p>
            </div>

            <button
              type="button"
              className="mb-5 flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-border bg-white px-4 py-3 text-sm font-bold text-ink transition-colors hover:border-muted"
              onClick={() => setMessage("Google 登入會在正式帳號系統建立後開放。")}
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-cream-d text-xs font-black">G</span>
              使用 Google 繼續
            </button>

            <div className="mb-5 flex items-center gap-3 text-xs text-light">
              <span className="h-px flex-1 bg-border" />
              或使用 Email
              <span className="h-px flex-1 bg-border" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">Email</span>
                <input
                  className="w-full rounded-xl border-[1.5px] border-border bg-cream px-4 py-3 text-base outline-none transition-colors placeholder:text-light focus:border-terracotta"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">密碼</span>
                <input
                  className="w-full rounded-xl border-[1.5px] border-border bg-cream px-4 py-3 text-base outline-none transition-colors placeholder:text-light focus:border-terracotta"
                  type="password"
                  placeholder="至少 8 個字元"
                  minLength={8}
                  required
                />
              </label>
              {isSignup ? (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">確認密碼</span>
                  <input
                    className="w-full rounded-xl border-[1.5px] border-border bg-cream px-4 py-3 text-base outline-none transition-colors placeholder:text-light focus:border-terracotta"
                    type="password"
                    placeholder="再輸入一次密碼"
                    minLength={8}
                    required
                  />
                </label>
              ) : null}

              {!isSignup ? (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm font-semibold text-terracotta transition-colors hover:text-terracotta-d"
                    onClick={() => setMessage("忘記密碼流程會在接上帳號系統後開放。")}
                  >
                    忘記密碼？
                  </button>
                </div>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-full bg-terracotta px-5 py-3 text-base font-bold text-white transition-all hover:-translate-y-px hover:bg-terracotta-d"
              >
                {current.button}
              </button>
            </form>

            {message ? (
              <div className="mt-5 rounded-xl border border-forest/20 bg-forest-lt px-4 py-3 text-sm leading-[1.65] text-forest">
                <div>{message}</div>
                <Link className="mt-3 inline-flex font-bold text-forest underline underline-offset-4" href="/tasks">
                  先看任務白板 demo
                </Link>
              </div>
            ) : (
              <p className="mt-5 text-sm leading-[1.65] text-light">{current.helper}</p>
            )}

            <div className="mt-7 border-t border-cream-d pt-5 text-center text-sm text-muted">
              {current.switchText}{" "}
              <Link className="font-bold text-terracotta no-underline hover:text-terracotta-d" href={current.switchHref}>
                {current.switchAction}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
