import { PaymentSimple } from "@/types";
import { CONFIG } from "@/constants";
import { isAddressEqual } from "viem";
import { Address } from "viem";

/**
 * Validates if a payment is valid for post creation
 */
export const validatePayment = (payment: PaymentSimple, receiverAddress: Address, postId: string): boolean => {
  if (!isAddressEqual(payment.receiverAddress as Address, receiverAddress)) {
    throw new Error("Verification failed: Receiver address does not match");
  }

  if (Number(payment.invoiceAmount) < CONFIG.POST_FEE.amount) throw new Error("Verification failed: Amount is too small");

  if (payment.invoiceCurrency !== CONFIG.POST_FEE.currency) throw new Error(`Verification failed: Currency must be ${CONFIG.POST_FEE.currency}`);

  //   if (postId && payment.memo !== postId) throw new Error("Verification failed: Memo does not match"); // TODO: retuyrn memo in indexerApi.

  return true;
};
