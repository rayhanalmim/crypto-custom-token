
const useLoadTokenBalance = (setBalance) => {
  const loadBalance = async (account, token) => {
    try {
      console.log(token, token.address); 
      setBalance(token.balance); 
    } catch (error) {
      console.error(`Failed to load balance for token ${token?.symbol || 'native'}:`, error);
      setBalance(null);
    }
  };

  return loadBalance;
};

export default useLoadTokenBalance;
