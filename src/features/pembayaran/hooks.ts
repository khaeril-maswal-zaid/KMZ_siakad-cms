"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import type {
  PaymentState,
  GenerateVirtualAccountPayload,
  SimulatePaymentPayload,
  VirtualAccount,
} from "./types/payment.types";
import {
  getPaymentMethods,
  dummyApplicant,
  dummySelection,
  makeVirtualAccount,
  makeReceipt,
} from "./mapper";

export function usePaymentPage() {
  const methodsQuery = useQuery({
    queryKey: ["payment-methods"],
    queryFn: getPaymentMethods,
  });

  const methods = methodsQuery.data ?? [];

  const [payment, setPayment] = useState<PaymentState>({
    selectedBankId: null,
    virtualAccount: null,
    receipt: null,
  });

  const applicant = dummyApplicant;
  const selection = dummySelection;

  const selectPaymentBank = useCallback((bankId: any) => {
    setPayment((p) => ({ ...p, selectedBankId: bankId }));
  }, []);

  const setVirtualAccount = useCallback((va: VirtualAccount | null) => {
    setPayment((p) => ({ ...p, virtualAccount: va }));
  }, []);

  // Simple pending flags for UI to reflect loading state
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const generateVirtualAccount = {
    isPending: isGenerating,
    async mutateAsync({ bankId, amount }: GenerateVirtualAccountPayload) {
      setIsGenerating(true);
      try {
        await new Promise((r) => setTimeout(r, 600));
        const va = makeVirtualAccount(bankId, amount);
        setPayment((p) => ({ ...p, virtualAccount: va }));
        return va;
      } finally {
        setIsGenerating(false);
      }
    },
  };

  const simulatePayment = {
    isPending: isSimulating,
    async mutateAsync({ virtualAccount }: SimulatePaymentPayload) {
      setIsSimulating(true);
      try {
        await new Promise((r) => setTimeout(r, 400));
        const receipt = makeReceipt(virtualAccount);
        setPayment((p) => ({ ...p, receipt }));
        return receipt;
      } finally {
        setIsSimulating(false);
      }
    },
  };

  const completePayment = useCallback((receipt: any) => {
    setPayment((p) => ({ ...p, receipt }));
  }, []);

  return {
    methods,
    payment,
    applicant,
    selection,
    selectPaymentBank,
    setVirtualAccount,
    generateVirtualAccount,
    simulatePayment,
    completePayment,
  } as const;
}
