import { prepareTransaction, toWei } from "thirdweb";
import { base } from "thirdweb/chains";

export const prepareAndSendTransaction = async (
  to: string,
  amount: string,
  client: any,
  sendTx: any
) => {
  try {
    const transaction = prepareTransaction({
      to: to,
      value: toWei(amount),
      chain: base,
      client,
    });

    sendTx(transaction, {
      onSuccess: (result: any) => {
        console.log("Transaction successful!", result);
      },
      onError: (err: any) => {
        console.error("Transaction failed!", err);
      },
    });
  } catch (error) {
    console.error("Error preparing transaction:", error);
    throw error;
  }
};
