import type { ReactNode } from "react";

export type DashboardStatusTone = "amber" | "blue" | "cyan" | "emerald";

export type DashboardStatus = {
  label: string;
  value: string;
  description: string;
  tone: DashboardStatusTone;
  icon: ReactNode;
};

export type DashboardProcessStep = {
  id: string;
  label: string;
  description: string;
  status: "completed" | "current" | "upcoming";
};

export type DashboardSelection = {
  institutionName: string;
  level: string;
  faculty: string;
  programName: string;
  waveName: string;
  studySystem: string;
  admissionPathName: string;
  registrationFee: string;
};

export type DashboardData = {
  firstName: string;
  eyebrow: string;
  titleDescription: string;
  statuses: DashboardStatus[];
  processSteps: DashboardProcessStep[];
  selection: DashboardSelection;
  nextAction: string;
  nextActionLabel: string;
  nextActionHref: string;
};
