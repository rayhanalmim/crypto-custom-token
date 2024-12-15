import { useEffect } from "react";
import Web3 from "web3";
import handleAccountsChanged from "./handleAccountChange";

function useWeb3AccountHandler ({ web3Ref, setAccount, loadTokens, selectedToken, account, loadBalanceFunction }) {
  useEffect(() => {
    if (window.ethereum) {
      web3Ref.current = new Web3(window.ethereum);

      function onAccountsChanged(accounts) {
        handleAccountsChanged(accounts, setAccount, loadTokens,  selectedToken);
        
      };

      async function loadAccountBalance() {
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
