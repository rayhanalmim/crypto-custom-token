import { useEffect } from "react";
import Web3 from "web3";
import handleAccountsChanged from "./handleAccountChange";

const useWeb3AccountHandler = ({ web3Ref, setAccount, loadTokens, selectedToken, account, loadBalanceFunction }) => {
  useEffect(() => {
    if (window.ethereum) {
      console.log('window.ethereum', window.ethereum);
      web3Ref.current = new Web3(window.ethereum);

      const onAccountsChanged = (accounts) => {
        handleAccountsChanged(accounts, setAccount, loadTokens,  selectedToken);
        
      };

      const loadAccountBalance = async () => {
        if (account) {
          await loadBalanceFunction(account, selectedToken); 
        }
      };
      loadAccountBalance();

      window.ethereum.on("accountsChanged", onAccountsChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", onAccountsChanged);
      };
    }
  }, [web3Ref, setAccount, loadTokens, selectedToken, account, loadBalanceFunction]);
};

export default useWeb3AccountHandler;
