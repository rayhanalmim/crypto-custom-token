import { useEffect } from "react";

function useLoadAccountBalance(account, selectedToken, loadBalance, balance) {
    useEffect(() => {
        const loadAccountBalance = async () => {
          if (account) {
            await loadBalance(account, selectedToken); 
          }
        };
        console.log(balance);
        loadAccountBalance();
      }, [account, selectedToken, loadBalance, balance]);
}

export default useLoadAccountBalance;