import { useContext } from 'react';
import CryptoContext from '../../AppContext/CryptoContext';
import MetamaskTransaction from './components/MetamaskTransaction/MetamaskTransaction';
import MetamaskAccountNumber from './components/MetamaskAccountNumber/MetamaskAccountNumber';

export default function MetamaskTokenTransferInfo() {
  const { account } = useContext(CryptoContext);
  return (
    <>
      {account && (
        <>
          <MetamaskAccountNumber />
          <MetamaskTransaction />
        </>
      )}
    </>
  );
}
