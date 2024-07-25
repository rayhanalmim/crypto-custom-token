

import { useCallback } from 'react';
import Web3 from 'web3';
import { ERC20_ABI } from '../erc20';
import { knownTokens } from '../knownTokens';

const useLoadTokens = (web3, setTokens) => {
  return useCallback(
    async (account) => {
      if (!web3) {
        console.error("Web3 is not initialized.");
        return;
      }
      
      const tokenBalances = [];
      try {
        // Load ETH balance
        const ethBalance = await web3.eth.getBalance(account);
        tokenBalances.push({
          symbol: "ETH",
          balance: Web3.utils.fromWei(ethBalance, "ether"),
          address: "",
        });

        // Load ERC20 token balances
        for (const token of knownTokens) {
          try {
            const tokenContract = new web3.eth.Contract(ERC20_ABI, token.address);
            const balance = await tokenContract.methods.balanceOf(account).call();
            const decimals = await tokenContract.methods.decimals().call();
            const symbol = await tokenContract.methods.symbol().call();
            tokenBalances.push({
              symbol,
              balance: Number(balance) / 10 ** Number(decimals),
              address: token.address,
            });
          } catch (error) {
            console.error(`Failed to load token ${token.name}:`, error);
          }
        }
        setTokens(tokenBalances);
      } catch (error) {
        console.error("Failed to load tokens:", error);
      }
    },
    [web3, setTokens]
  );
};

export default useLoadTokens;
