import type {
  InstitutionSettingApiResource,
  InstitutionSettings,
} from "./types";

export function mapInstitutionSettingResourcesToSettings(
  resources: InstitutionSettingApiResource[],
): InstitutionSettings {
  const settings: InstitutionSettings = {
    general: {},
    contact: {},
    social: {},
  };

  resources.forEach((settingResource) => {
    const { category, key, value } = settingResource.attributes;

    if (category in settings) {
      settings[category as keyof InstitutionSettings][key] = value;
    }
  });

  return settings;
}
