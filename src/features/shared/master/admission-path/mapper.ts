import type { AdmissionPath, AdmissionPathApiResource } from "./types";

export function mapAdmissionPath(
  resource: AdmissionPathApiResource,
): AdmissionPath {
  return {
    id: resource.id,
    code: resource.attributes.code,
    name: resource.attributes.name,
    description: resource.attributes.description,
  };
}

export function mapAdmissionPaths(
  resources: AdmissionPathApiResource[],
): AdmissionPath[] {
  return resources.map(mapAdmissionPath);
}
