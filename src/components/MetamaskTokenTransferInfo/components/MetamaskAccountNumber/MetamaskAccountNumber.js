import { useContext } from 'react';
import CryptoContext from '../../../../AppContext/CryptoContext';

export default function MetamaskAccountNumber() {
  const { account } = useContext(CryptoContext);
  return <p>{`Account: ${account}`}</p>;
}
