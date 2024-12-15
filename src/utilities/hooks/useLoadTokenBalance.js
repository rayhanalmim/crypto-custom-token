import { Contract } from 'ethers';
import { formatUnits } from 'ethers';
import { ERC20_ABI } from '../erc20';

const useLoadTokenBalance = (provider, setBalance) => {
  const loadBalance = async (account, token) => {
    try {
      console.log(token, token.address); 
      setBalance(token.balance); 
      // if (token && token.address) {
      //   const balance = await provider.getBalance(account);
      //   setBalance(formatUnits(balance, 18)); 
      // } else {
      //   const tokenContract = new Contract(token.address, ERC20_ABI, provider);
      //   const rawBalance = await tokenContract.balanceOf(account);
      //   const decimals = await tokenContract.decimals();
      //   const formattedBalance = formatUnits(rawBalance, decimals);
      //   setBalance(formattedBalance);
      // }
    } catch (error) {
      console.error(`Failed to load balance for token ${token?.symbol || 'native'}:`, error);
      setBalance(null);
    }
  };

  return loadBalance;
};

export default useLoadTokenBalance;
