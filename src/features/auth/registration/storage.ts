import type { StudySelection } from "@/features/program-selection/types";

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

export function getRegistrationSelection(): StudySelection | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedSelection = window.localStorage.getItem(
    REGISTRATION_SELECTION_KEY,
  );
  if (!storedSelection) {
    return null;
  }

  try {
    return JSON.parse(storedSelection) as StudySelection;
  } catch {
    return null;
  }
}
