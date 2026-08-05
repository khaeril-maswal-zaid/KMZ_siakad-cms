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
} from "../components";

export function HomePage() {
  const { data, isLoading } = useHome();

  if (isLoading || !data) {
    return <LandingSkeleton />;
  }

  return (
    <>
      <Header campus={data.campus} />

      <main>
        <Hero data={data} />
        {/* <ProgramSection programs={data} />
        <AdmissionFlowSection steps={data.steps} />
        <FaqSection faq={data.faq} /> */}
        <CallToAction />
      </main>

      <Footer campus={data.campus} />
    </>
  );
}
