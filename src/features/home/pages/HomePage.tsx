"use client";

import { useHome } from "../hooks";

import {
  Header,
  Hero,
  Footer,
  LandingSkeleton,
  ProgramSection,
  FaqSection,
  CallToAction,
  AdmissionFlowSection,
} from "@/features/home/components";

export function HomePage() {
  const { data, isLoading } = useHome();

  if (isLoading || !data) {
    return <LandingSkeleton />;
  }

  console.log(data);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-950">
      <Header campus={data.campus} />

      <main>
        <Hero data={data} />
        <ProgramSection programs={data.programs} />
        {/* <AdmissionFlowSection steps={data.steps} /> */}
        {/* <FaqSection faq={data.faq} /> */}
        <CallToAction />
      </main>

      <Footer campus={data.campus} />
    </div>
  );
}
