"use client";

import { useHome } from "../hooks";

import {
  Header,
  Hero,
  PmbSiteFooter,
  LandingSkeleton,
  ProgramSection,
  CallToAction,
  AdmissionFlowSection,
} from "@/features/home/components";

export function HomePage() {
  const { data: homeData, isLoading } = useHome();

  if (isLoading || !homeData) {
    return <LandingSkeleton />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-950">
      <Header />

      <main>
        <Hero data={homeData} />
        <ProgramSection programs={homeData.programs} />
        <AdmissionFlowSection steps={homeData.admissionSteps} />
        {/* <FaqSection faq={homeData.faq} /> */}
        <CallToAction />
      </main>

      <PmbSiteFooter />
    </div>
  );
}
