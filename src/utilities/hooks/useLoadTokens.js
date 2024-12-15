import { useCallback } from 'react';
import Web3 from 'web3';
import { knownTokens } from '../knownTokens';
import { getTokenInfo } from '../getTokenInfo';


function useLoadTokens(web3Ref, setTokens) {
  const loadTokens = useCallback(
    async function (account) {
      const web3 = web3Ref.current;
      const tokenInfo = [];

      try {
        const ethBalance = await web3.eth.getBalance(account);
        tokenInfo.push({
          symbol: 'AVAX',
          balance: Web3.utils.fromWei(ethBalance, 'ether'),
          address: '0x0000000000000000000000000000000000000000',
        });
      } catch (error) {
        console.error('Failed to load AVAX balance:', error);
      }

      for (const token of knownTokens) {
        const tokenDetails = await getTokenInfo(web3, account, token);
        if (tokenDetails) {
          tokenInfo.push(tokenDetails);
        }
      }

      setTokens(tokenInfo);
    },
    [setTokens, web3Ref]
  );

  return loadTokens;
};

export default useLoadTokens;
