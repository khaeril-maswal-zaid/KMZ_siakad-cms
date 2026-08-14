"use client";

import { PmbFlowShell } from "@/components/PmbFlowShell";
import { ErrorComponent } from "@/components/ErrorComponent";
import { LoadingComponent } from "@/components/LoadingComponent";
import { NextActionCard } from "../components/NextActionCard";
import { ProgressCard } from "../components/ProgressCard";
import { SelectionCard } from "../components/SelectionCard";
import { StatusCards } from "../components/StatusCards";
import { useDashboard } from "../hooks";

export function DashboardPage() {
  const { data: dashboardData, isLoading, error, refetch } = useDashboard();

  if (error) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isLoading || !dashboardData) {
    return <LoadingComponent />;
  }

  return (
    <PmbFlowShell
      authenticatedArea
      currentStep={3}
      eyebrow={dashboardData.eyebrow}
      title={`Selamat datang, ${dashboardData.firstName}!`}
      description={dashboardData.titleDescription}
    >
      <section className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <StatusCards statuses={dashboardData.statuses} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <ProgressCard steps={dashboardData.processSteps} />

          <div className="space-y-5 lg:sticky lg:top-6">
            <SelectionCard selection={dashboardData.selection} />
            <NextActionCard
              action={dashboardData.nextAction}
              label={dashboardData.nextActionLabel}
              href={dashboardData.nextActionHref}
            />
          </div>
        </div>
      </section>
    </PmbFlowShell>
  );
}
