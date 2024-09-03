import { useCallback } from 'react';
import Web3 from 'web3';
import { ERC20_ABI } from './erc20';

const useLoadBalance = (web3, setBalance) => {
  const loadBalance = useCallback(
    async (account, token) => {
      if (web3 && token) {
        try {
          if (token.symbol === 'ETH') {
            const balance = await web3.eth.getBalance(account);
            setBalance(Web3.utils.fromWei(balance, 'ether'));
          } else {
            const tokenContract = new web3.eth.Contract(
              ERC20_ABI,
              token.address,
            );
            const balance = await tokenContract.methods
              .balanceOf(account)
              .call();
            const decimals = await tokenContract.methods.decimals().call();
            setBalance(Number(balance) / 10 ** Number(decimals));
          }
        } catch (error) {
          console.error(
            `Failed to load balance for token ${token.symbol}:`,
            error,
          );
          setBalance(null);
        }
      }
    },
    [web3, setBalance],
  );

  return loadBalance;
};

export default useLoadBalance;
