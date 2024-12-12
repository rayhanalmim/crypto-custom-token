import { useEffect } from "react";
import Web3 from "web3";
import handleAccountsChanged from "./handleAccountChange";

const useWeb3AccountHandler = ({ web3Ref, setAccount, loadTokens, loadBalance, setBalance, selectedToken }) => {
  useEffect(() => {
    if (window.ethereum) {
      console.log('window.ethereum', window.ethereum);
      web3Ref.current = new Web3(window.ethereum);

      const onAccountsChanged = (accounts) => {
        handleAccountsChanged(accounts, setAccount, loadTokens, loadBalance, setBalance, selectedToken);
      };

      window.ethereum.on("accountsChanged", onAccountsChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", onAccountsChanged);
      };
    }
  }, [web3Ref, setAccount, loadTokens, loadBalance, selectedToken, setBalance]);
};

export default useWeb3AccountHandler;
