"use client";

import { useHome } from "../hooks";

import {
  Header,
  Hero,
  Footer,
  LandingSkeleton,
  ProgramSection,
  CallToAction,
  AdmissionFlowSection,
} from "@/features/home/components";

export function HomePage() {
  const { data, isLoading } = useHome();

  if (isLoading || !data) {
    return <LandingSkeleton />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-950">
      <Header />

      <main>
        <Hero data={data} />
        <ProgramSection programs={data.programs} />
        <AdmissionFlowSection steps={data.admissionSteps} />
        {/* <FaqSection faq={data.faq} /> */}
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
