import { useContext } from 'react';
import { Header } from './components/Header/Header';
import ConnectMetamaskButton from './components/ConnectMetamaskButton/ConnectMetamaskButton';

import CryptoContext from '../../AppContext/CryptoContext';

export default function MetamaskStart() {
  const { account } = useContext(CryptoContext);
  return (
    <>
      <Header />
      {!account && <ConnectMetamaskButton />}
    </>
  );
}
