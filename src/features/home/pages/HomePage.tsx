import {
  AdmissionFlowSection,
  CallToAction,
  FaqSection,
  Footer,
  Header,
  Hero,
  ProgramSection,
} from "@/features/home/components";

export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-950">
      <Header />
      <main>
        <Hero />

        <ProgramSection />

        <AdmissionFlowSection />

        <FaqSection />

        <CallToAction />
      </main>
      <Footer />/
    </div>
  );
}
