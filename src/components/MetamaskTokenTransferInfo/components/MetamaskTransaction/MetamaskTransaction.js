import { TokenOptions } from './components/TokenOptions';
import { SelectedToken } from './components/SelectedToken';
import { SendButtons } from './components/SendButtons';
import { TransactionInput } from './components/TransactionInput';
import { TransactionHash } from './components/TransactionHash';

import './MetamaskTransaction.css';
import { useContext, useState } from 'react';
import CryptoContext from '../../../../AppContext/CryptoContext';
import { handleTransfer } from './hooks/transfer';
import MetaMaskDeleteButton from './components/MetaMaskDeleteButton';

export default function MetamaskTransaction() {
  const {
    selectedToken,
    tokens,
    account,
    balance,
    setSelectedToken,
    web3Ref,
    setBalance,
    setAccount,
  } = useContext(CryptoContext);

  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [transactionHash, setTransactionHash] = useState(null);

  function tokenChangeHandler(event) {
    const token = tokens.find((t) => t.address === event.target.value);
    setSelectedToken(token);
  }

  function transferHandler() {
    console.log('htting');
    handleTransfer({
      web3Ref,
      account,
      amount,
      recipient,
      selectedToken,
      setTransactionHash,
    });
  }
  return (
    <div className='transaction_row'>
      <TokenOptions
        selectedToken={selectedToken}
        tokens={tokens}
        onTokenChange={tokenChangeHandler}
      />
      <SelectedToken selectedToken={selectedToken} balance={balance} />
      <TransactionInput
        amount={amount}
        recipient={recipient}
        onAmountChange={setAmount}
        onRecipientChange={setRecipient}
      />
      <SendButtons onTransfer={transferHandler} />
      <TransactionHash
        transactionHash={transactionHash}
        setTransactionHash={setTransactionHash}
      />
      <MetaMaskDeleteButton
        setAccount={setAccount}
        setBalance={setBalance}
        setRecipient={setRecipient}
        setAmount={setAmount}
        setTransactionHash={setTransactionHash}
      />
    </div>
  );
}
