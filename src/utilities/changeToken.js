

export const handleTokenChange = (tokens, setSelectedToken, account, loadBalance, setBalance) => (e) => {
    const token = tokens.find((t) => t.address === e.target.value);
    setSelectedToken(token);
    if (account) {
      loadBalance(account, token, setBalance);
    }
  };
  
