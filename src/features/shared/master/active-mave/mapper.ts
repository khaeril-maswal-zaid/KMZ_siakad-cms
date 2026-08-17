import { ActiveMave, ActiveMaveApiResource } from "./types";

export function mapActiveMaves(resource: ActiveMaveApiResource): ActiveMave {
  return {
    id: resource.id,
    name: resource.attributes.name,
  };
}
