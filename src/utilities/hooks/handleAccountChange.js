const handleAccountsChanged = async (accounts, setAccount, loadTokens, loadBalance, setBalance, selectedToken) => {
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
  
  export default handleAccountsChanged;
  