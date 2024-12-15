import { createContext, useState, useRef } from 'react';
import useLoadTokenBalance from '../utilities/hooks/useLoadTokenBalance';
import useLoadTokens from '../utilities/hooks/useLoadTokens';
import useWeb3AccountHandler from '../utilities/hooks/useWeb3AccountHandler';

const CryptoContext = createContext({});

function CryptoContextProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);

  const web3Ref = useRef(null);

  const loadBalanceFunction = useLoadTokenBalance(setBalance );
  const loadTokens = useLoadTokens(web3Ref, setTokens);

  useWeb3AccountHandler({
    account,
    web3Ref,
    setAccount,
    loadTokens,
    selectedToken,
    loadBalanceFunction,
  });

  return (
    <CryptoContext.Provider
      value={{
        account,
        setAccount,
        balance,
        setBalance,
        tokens,
        setTokens,
        selectedToken,
        setSelectedToken,
        web3Ref,
        loadBalance : loadBalanceFunction,
        loadTokens,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export { CryptoContextProvider };
export default CryptoContext;
