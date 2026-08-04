/**
 * ==========================================
 * API Response (Laravel JSON:API)
 * ==========================================
 */

export interface VillageApiResource {
  id: string;
  type: "master_villages";

  attributes: {
    code: string;
    name: string;
  };

  relationships: {
    district: {
      data: {
        id: string;
        type: "master_districts";
      };
    };
  };
}

export interface DistrictApiResource {
  id: string;
  type: "master_districts";

  attributes: {
    code: string;
    name: string;
  };

  relationships: {
    regency: {
      data: {
        id: string;
        type: "master_regencies";
      };
    };
  };
}

export interface RegencyApiResource {
  id: string;
  type: "master_regencies";

  attributes: {
    code: string;
    name: string;
  };

  relationships: {
    province: {
      data: {
        id: string;
        type: "master_provinces";
      };
    };
  };
}

export interface ProvinceApiResource {
  id: string;
  type: "master_provinces";

  attributes: {
    code: string;
    name: string;
  };
}

export interface RegionApiResponse {
  data: VillageApiResource[];

  included: Array<
    DistrictApiResource | RegencyApiResource | ProvinceApiResource
  >;
}

/**
 * ==========================================
 * Frontend Model
 * ==========================================
 */

export interface Region {
  village: {
    id: string;
    code: string;
    name: string;
  };

  district: {
    id: string;
    code: string;
    name: string;
  };

  regency: {
    id: string;
    code: string;
    name: string;
  };

  province: {
    id: string;
    code: string;
    name: string;
  };
}
