/**
 * ==========================================
 * API Response (Laravel JSON:API)
 * ==========================================
 */

export interface PaymentMethodApiResource {
  id: string;
  type: "master_payment_methods";

  attributes: {
    name: string;
    code: string;
    type: "virtual_account" | "qris" | string;
  };
}

export interface PaymentMethodApiResponse {
  data: PaymentMethodApiResource[];
}

/**
 * ==========================================
 * Frontend Model
 * ==========================================
 */

export interface PaymentMethodMaster {
  id: string;
  name: string;
  code: string;
  type: "virtual_account" | "qris" | string;
}
