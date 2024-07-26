import { useEffect } from "react";
import Web3 from "web3";

const useWeb3Setup = ({ web3Ref, setAccount, loadTokens, loadBalance, setBalance, selectedToken }) => {
  useEffect(() => {
    if (window.ethereum) {
      web3Ref.current = new Web3(window.ethereum);
      const web3 = web3Ref.current;
      
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await loadTokens(accounts[0]);
          if (selectedToken) {
            loadBalance(accounts[0], selectedToken);
          }
        } else {
          setAccount(null);
          setBalance(null);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    } else {
      alert("MetaMask is not installed");
    }
  }, [web3Ref, setAccount, loadTokens, loadBalance, selectedToken, setBalance]);
};

export default useWeb3Setup;
