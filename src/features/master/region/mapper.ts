import type {
  DistrictApiResource,
  ProvinceApiResource,
  RegencyApiResource,
  Region,
  RegionApiResponse,
  VillageApiResource,
} from "./types";

export function mapRegions(response: RegionApiResponse): Region[] {
  const districts = new Map<string, DistrictApiResource>();
  const regencies = new Map<string, RegencyApiResource>();
  const provinces = new Map<string, ProvinceApiResource>();

  response.included.forEach((item) => {
    switch (item.type) {
      case "master_districts":
        districts.set(item.id, item);
        break;

      case "master_regencies":
        regencies.set(item.id, item);
        break;

      case "master_provinces":
        provinces.set(item.id, item);
        break;
    }
  });

  return response.data.map((village: VillageApiResource): Region => {
    const district = districts.get(village.relationships.district.data.id)!;

    const regency = regencies.get(district.relationships.regency.data.id)!;

    const province = provinces.get(regency.relationships.province.data.id)!;

    return {
      village: {
        id: village.id,
        code: village.attributes.code,
        name: village.attributes.name,
      },

      district: {
        id: district.id,
        code: district.attributes.code,
        name: district.attributes.name,
      },

      regency: {
        id: regency.id,
        code: regency.attributes.code,
        name: regency.attributes.name,
      },

      province: {
        id: province.id,
        code: province.attributes.code,
        name: province.attributes.name,
      },
    };
  });
}
