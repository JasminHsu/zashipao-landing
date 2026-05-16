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

export default function Home() {
  return (
    <>
      <RevealController />
      <Navbar />
      <main>
        <Hero />
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
