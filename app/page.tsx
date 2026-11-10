import { CTA } from "@/components/CTA";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LineBand } from "@/components/LineBand";
import { Navbar } from "@/components/Navbar";
import { ProblemSection } from "@/components/ProblemSection";
import { RevealController } from "@/components/RevealController";
import { RoomPreview } from "@/components/RoomPreview";
import { Sessions } from "@/components/Sessions";
import { Testimonials } from "@/components/Testimonials";
import { Ticker } from "@/components/Ticker";
import type { HomeSession } from "@/components/HomeSessionCard";

import { getPublicSessions } from "@/lib/publicSessions";
export const revalidate = 60;

export default async function Home() {
  let sessions: HomeSession[] = [];
  let failed = false;
  try {
    sessions = (await getPublicSessions()).map(session => ({
      title: session.title, startsAt: session.starts_at, endsAt: session.ends_at,
      bookedCount: session.booked_count, capacity: session.capacity,
      bookingHref: `/sessions/book?session=${session.id}`
    }));
  } catch { failed = true; }
  return (
    <>
      <a href="#main-content" className="sr-only z-[100] bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">跳到主要內容</a>
      <RevealController />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Ticker />
        <ProblemSection />
        <RoomPreview />
        <HowItWorks />
        <Features upcomingSessions={sessions} loadError={failed} />
        <Sessions sessions={sessions.slice(0, 6)} loadError={failed} />
        <LineBand />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
