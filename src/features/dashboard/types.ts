import type { ReactNode } from "react";

export type DashboardApiResource<TAttributes> = {
  id: string;
  type: string;
  attributes: TAttributes;
};

export type DashboardApplicationAttributes = {
  registration_number: string;
  full_name: string;
  status: string;
  phone: string;
  created_at: string;
};

export type DashboardRelationshipIdentifier = {
  id: string;
  type: string;
};

export type DashboardApplicationResource =
  DashboardApiResource<DashboardApplicationAttributes> & {
    relationships?: {
      admissionPeriod?: {
        data: DashboardRelationshipIdentifier | null;
      };
      studyProgramChoices?: {
        data: DashboardRelationshipIdentifier[];
      };
      admissionPath?: {
        data: DashboardRelationshipIdentifier | null;
      };
      classShedule?: {
        data: DashboardRelationshipIdentifier | null;
      };
    };
  };

export type DashboardIncludedResource = DashboardApiResource<
  Record<string, string>
> & {
  relationships?: {
    studyProgram?: {
      data: DashboardRelationshipIdentifier | null;
    };
    faculty?: {
      data: DashboardRelationshipIdentifier | null;
    };
  };
};

export type DashboardApiResponse = {
  data: DashboardApplicationResource;
  included?: DashboardIncludedResource[];
};

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
  level: string;
  faculty: string;
  programName: string;
  waveName: string;
  studySystem: string;
  admissionPathName: string;
  registrationFee: string;
};

export type DashboardData = {
  registrationNumber: string;
  fullName: string;
  registeredAt: string;
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
