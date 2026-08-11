import type { StudySelection } from "@/features/program-selection/types";
import api from "@/lib/axios";

import type { RegisterUserPayload } from "./types";

export const REGISTRATION_SELECTION_KEY = "pmb_registration_selection";

export function saveRegistrationSelection(selection: StudySelection) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    REGISTRATION_SELECTION_KEY,
    JSON.stringify(selection),
  );
}

export async function getStoredRegistrationSelection(): Promise<StudySelection | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(REGISTRATION_SELECTION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StudySelection;
  } catch {
    return null;
  }
}

export async function registerUser(payload: RegisterUserPayload) {
  const { data } = await api.post("/auth/register-user", payload);

  return data;
}
