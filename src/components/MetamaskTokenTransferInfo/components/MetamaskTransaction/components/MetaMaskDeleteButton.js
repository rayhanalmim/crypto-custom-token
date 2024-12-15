import { useContext } from "react";
import CryptoContext from "../../../../../AppContext/CryptoContext";

export default function MetaMaskDeleteButton({ setRecipient, setAmount, setTransactionHash, }) {
  const {
    setBalance,
    setAccount,
  } = useContext(CryptoContext);

  function disconnectWallet() {
    setAccount(null);
    setBalance(null);
    setRecipient('');
    setAmount('');
    setTransactionHash(null);
    window.location.reload();
  };
  return <button onClick={disconnectWallet}>Disconnect</button>;
}
