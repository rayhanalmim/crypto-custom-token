import { createContext, useState, useRef, useEffect } from 'react';
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
   const provider = web3Ref.current ? web3Ref.current.eth : null;

  const loadBalance = useLoadTokenBalance(provider, setBalance);
  const loadTokens = useLoadTokens(web3Ref, setTokens);

  useWeb3AccountHandler({
    web3Ref,
    setAccount,
    loadTokens,
    loadBalance,
    setBalance,
    selectedToken,
  });

  useEffect(() => {
    const testLoadBalance = async () => {
      if (account) {
        await loadBalance(account, selectedToken); 
      }
    };
    console.log(balance);
    testLoadBalance();
  }, [account, selectedToken, loadBalance, balance]);

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
