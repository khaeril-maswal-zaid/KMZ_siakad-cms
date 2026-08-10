import type { AuthSession, LoginApiResponse } from "./types";

export function mapLoginApiResponse(response: LoginApiResponse): AuthSession {
  const resource = response?.data;
  const included = response?.included ?? [];
  const applicationIdentifier = resource?.relationships?.pmbApplication?.data;
  const applicationResource =
    applicationIdentifier &&
    included.find(
      (item) =>
        item.id === applicationIdentifier.id &&
        item.type === applicationIdentifier.type,
    );
  const admissionPeriodIdentifier = applicationResource?.relationships
    ?.admissionPeriod as
    | { data?: { id: string; type: string } | null }
    | undefined;
  const admissionPeriodResource =
    admissionPeriodIdentifier?.data &&
    included.find(
      (item) =>
        item.id === admissionPeriodIdentifier.data?.id &&
        item.type === admissionPeriodIdentifier.data?.type,
    );

  const token = response?.meta?.token ?? response?.token;

  if (!token) {
    throw new Error("Login response tidak mengembalikan token");
  }

  const user = resource
    ? {
        id: resource.id,
        type: resource.type,
        ...resource.attributes,
        ...(applicationResource
          ? {
              pmbApplication: {
                id: applicationResource.id,
                ...applicationResource.attributes,
                ...(admissionPeriodResource
                  ? {
                      admissionPeriod: {
                        id: admissionPeriodResource.id,
                        ...admissionPeriodResource.attributes,
                      },
                    }
                  : {}),
              },
            }
          : {}),
      }
    : response?.user;

  return {
    token,
    user,
    message: response?.meta?.message ?? response?.message,
  };
}
