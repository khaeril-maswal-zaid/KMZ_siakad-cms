import { ActiveMave, ActiveMaveApiResponse } from "./types";

export function mapActiveMave(
  response: ActiveMaveApiResponse,
): ActiveMave | null {
  const resource = response.data[0];

  if (!resource) {
    return null;
  }

  return {
    id: resource.id,
    name: resource.attributes.name,
    registrationStart: resource.attributes.registration_start,
    registrationEnd: resource.attributes.registration_end,
    reRegistrationStart: resource.attributes.re_registration_start,
    reRegistrationEnd: resource.attributes.re_registration_end,
    announcementDate: resource.attributes.announcement_date,
    academicYearId: resource.attributes.academic_year_id,
  };
}
