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
