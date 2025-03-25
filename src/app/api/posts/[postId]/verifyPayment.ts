import { POST_FEE } from '@/constants';
import { PaymentSimple } from '@/types';
import { isAddressEqual } from 'viem';
import { Address } from 'viem';

export const verifyPayment = (
  payment: PaymentSimple,
  receiverAddress: Address,
  postId: string,
): boolean => {
  if (!isAddressEqual(payment.receiverAddress as Address, receiverAddress)) {
    throw new Error('Verification failed: Receiver address does not match');
  }

  if (Number(payment.invoiceAmount) < POST_FEE.amount)
    throw new Error('Verification failed: Amount is too small');

  if (payment.invoiceCurrency !== POST_FEE.currency)
    throw new Error(`Verification failed: Currency must be ${POST_FEE.currency}`);

  // if (postId && payment.memo !== postId) throw new Error("Verification failed: Memo does not match"); // TODO: retuyrn memo in indexerApi.

  return true;
};
