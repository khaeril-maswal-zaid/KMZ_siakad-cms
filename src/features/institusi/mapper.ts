import type {
  InstitutionSettingApiResource,
  InstitutionSettings,
} from "./types";

export function mapInstitutionSettings(
  resources: InstitutionSettingApiResource[],
): InstitutionSettings {
  const settings: InstitutionSettings = {
    general: {},
    contact: {},
    social: {},
  };

  resources.forEach((item) => {
    const { category, key, value } = item.attributes;

    if (category in settings) {
      settings[category as keyof InstitutionSettings][key] = value;
    }
  });

  return settings;
}
