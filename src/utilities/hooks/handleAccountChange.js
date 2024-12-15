async function handleAccountsChanged(accounts, setAccount, loadTokens) {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      await loadTokens(accounts[0]);
   
    } else {
      setAccount(null);
    }
  };
  
  export default handleAccountsChanged;
  