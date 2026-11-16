import { AccountMenu } from "@/components/AccountMenu";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getPublicSessions, type PublicSession } from "@/lib/publicSessions";
import { BookingFlowSteps } from "@/components/BookingFlowSteps";
import { AvailableSessionsList } from "@/components/AvailableSessionsList";

export const metadata = { title: "可預約場次 — 雜事房" };
export const dynamic = "force-dynamic";

export default async function SessionsPage({ searchParams }: { searchParams: { tasks?: string } }) {
  const tasks = (searchParams.tasks ?? "").split(",").filter(id => /^\d+$/.test(id)).join(",");
  let sessions: PublicSession[] = [];
  let failed = false;
  try { sessions = await getPublicSessions(); }
  catch { failed = true; }

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-border bg-paper">
        <div className="mx-auto flex min-h-[62px] max-w-7xl flex-wrap items-center justify-between gap-3 px-[5%] py-3">
          <Logo />
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link href="/my-sessions" className="inline-flex min-h-11 items-center rounded-lg border border-border px-4 text-muted hover:bg-cream">已預約場次</Link>
            <Link href="/sessions" aria-current="page" className="inline-flex min-h-11 items-center rounded-lg bg-terracotta-lt px-4 font-bold text-terracotta">可預約場次</Link>
            <Link href="/tasks" className="inline-flex min-h-11 items-center rounded-lg border border-border px-4 text-muted hover:bg-cream">我的待辦清單</Link>
            <AccountMenu />
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-[5%] py-8">
        <BookingFlowSteps current={1} selectedTaskCount={tasks ? tasks.split(",").length : 0} />
        <h1 className="text-4xl font-black">可預約場次</h1>
        <p className="mt-3 text-muted">先挑一個你願意出現的時段。選好後，再決定這場要處理哪些事。</p>
        {tasks ? <p className="mt-4 rounded-xl bg-forest-lt p-3 text-sm text-forest">你已選好 {tasks.split(",").length} 件待辦。選擇場次後仍可調整。</p> : null}
        <AvailableSessionsList sessions={sessions} tasks={tasks} failed={failed} />
      </div>
    </main>
  );
}
