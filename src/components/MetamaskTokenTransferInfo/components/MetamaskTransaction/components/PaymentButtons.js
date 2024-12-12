import { useContext } from "react";
import CryptoContext from "../../../../../AppContext/CryptoContext";
import { handlePayment } from "../hooks/handlePayment";

export function PaymentButton({ amount ,recipient,setTransactionHash}) {
  const {
    selectedToken,
    account,
    web3Ref,
  } = useContext(CryptoContext);
    function paymentHandler() {
      console.log('five item',selectedToken, account, web3Ref, amount, recipient);
      handlePayment({
        web3Ref,
        account,
        amount,
        recipient,
        selectedToken,
        setTransactionHash,
      });
    }
  return <button onClick={paymentHandler}>Send</button>;
}
