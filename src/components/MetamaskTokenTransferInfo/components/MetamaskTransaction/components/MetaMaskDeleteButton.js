import { useContext } from "react";
import CryptoContext from "../../../../../AppContext/CryptoContext";

export default function MetaMaskDeleteButton({ setRecipient, setAmount, setTransactionHash, }) {
  const {
    setBalance,
    setAccount,
  } = useContext(CryptoContext);

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setRecipient('');
    setAmount('');
    setTransactionHash(null);
    window.location.reload();
  };
  return <button onClick={disconnectWallet}>Disconnect</button>;
}
