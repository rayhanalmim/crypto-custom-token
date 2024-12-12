import React from 'react';
import { useConnectMetamask } from './hooks/connectMetamaskWallet.js';

export default function ConnectMetamaskButton() {
  const connectMetamaskWallet = useConnectMetamask(); 

  return (
    <button onClick={connectMetamaskWallet}>
      Connect MetaMask
    </button>
  );
}
