import { CTA } from "@/components/CTA";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LineBand } from "@/components/LineBand";
import { Navbar } from "@/components/Navbar";
import { ProblemSection } from "@/components/ProblemSection";
import { RevealController } from "@/components/RevealController";
import { Sessions } from "@/components/Sessions";
import { Testimonials } from "@/components/Testimonials";
import { Ticker } from "@/components/Ticker";
import type { HomeSession } from "@/components/HomeSessionCard";

// Replace this fixture with published backend sessions and remove the preview prop.
const previewSessions: HomeSession[] = [
  {
    title: "晚間雜事衝刺",
    bookedCount: 4,
    startsAt: "2026-09-30T21:00:00+08:00",
    endsAt: "2026-09-30T21:50:00+08:00",
    bookingHref: "/sessions/book"
  }
];

export default function Home() {
  return (
    <>
      <RevealController />
      <Navbar />
      <main>
        <Hero upcomingSessions={previewSessions} preview />
        <Ticker />
        <ProblemSection />
        <HowItWorks />
        <Features />
        <Sessions />
        <LineBand />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
