import { useContext } from 'react';
import CryptoContext from '../../../../AppContext/CryptoContext';
import { connectWallet } from '../hooks/connectWallet';

export default function ConnectMetamaskButton() {
  const { web3Ref, setAccount, loadTokens, loadBalance, selectedToken } =
    useContext(CryptoContext);

  function handleTransfer() {
    connectWallet({
      web3Ref,
      setAccount,
      loadTokens,
      loadBalance,
      selectedToken,
    });
  }

  return <button onClick={handleTransfer}>Connect MetaMask</button>;
}
