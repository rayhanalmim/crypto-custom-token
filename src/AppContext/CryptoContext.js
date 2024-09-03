import { createContext, useState, useRef } from 'react';
import useLoadBalance from '../utilities/hooks/useLoadBalance';
import useLoadTokens from '../utilities/hooks/useLoadTokens';
import useWeb3Setup from '../utilities/hooks/useWeb3Setup';

const CryptoContext = createContext({});

function CryptoContextProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);

  const web3Ref = useRef(null);

  const loadBalance = useLoadBalance(web3Ref.current, setBalance);
  const loadTokens = useLoadTokens(web3Ref, setTokens);

  useWeb3Setup({
    web3Ref,
    setAccount,
    loadTokens,
    loadBalance,
    setBalance,
    selectedToken,
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
        loadBalance,
        loadTokens,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export { CryptoContextProvider };
export default CryptoContext;
