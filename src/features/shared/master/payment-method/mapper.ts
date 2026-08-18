import type {
  PaymentMethodApiResource,
  PaymentMethodApiResponse,
  PaymentMethodMaster,
} from "./types";

export function mapPaymentMethod(
  resource: PaymentMethodApiResource,
): PaymentMethodMaster {
  return {
    id: resource.id,
    name: resource.attributes.name,
    code: resource.attributes.code,
    type: resource.attributes.type,
  };
}

export function mapPaymentMethods(
  response: PaymentMethodApiResponse,
): PaymentMethodMaster[] {
  return response.data.map(mapPaymentMethod);
}
