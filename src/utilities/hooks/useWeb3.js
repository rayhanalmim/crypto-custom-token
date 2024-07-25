import { useRef, useEffect } from "react";
import Web3 from "web3";

const useWeb3 = (onAccountsChanged) => {
  const web3Ref = useRef(null);
  const handleAccountsChanged = async (accounts) => {
    if (onAccountsChanged) {
      await onAccountsChanged(accounts);
    }
  };
  useEffect(() => {
    if (window.ethereum) {
      web3Ref.current = new Web3(window.ethereum);

      

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    } else {
      alert("MetaMask is not installed");
    }
  }, [onAccountsChanged]);

return {
  web3: web3Ref.current,
    handleAccountsChanged,
  };
};

export default useWeb3;
