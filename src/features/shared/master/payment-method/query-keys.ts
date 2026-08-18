export const paymentMethodQueryKeys = {
  all: ["payment-method"] as const,

  lists: () => [...paymentMethodQueryKeys.all, "list"] as const,

  detail: (id: string) =>
    [...paymentMethodQueryKeys.all, "detail", id] as const,
};
