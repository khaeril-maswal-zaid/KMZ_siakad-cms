export const paymentQueryKeys = {
  all: ["payment"] as const,

  status: () => [...paymentQueryKeys.all, "status"] as const,
};
