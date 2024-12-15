import { useState } from "react";
import { TokenOptions } from "./components/TokenOptions";
import { SelectedToken } from "./components/SelectedToken";
import { PaymentButton } from "./components/PaymentButtons";
import { TransactionInput } from "./components/TransactionInput";
import { TransactionHash } from "./components/TransactionHash";
import MetaMaskDeleteButton from "./components/MetaMaskDeleteButton";
import "./MetamaskTransaction.css";

export default function MetamaskTransaction() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactionHash, setTransactionHash] = useState(null);

  return (
    <div className="transaction_row">
      <TokenOptions />
      <SelectedToken />
      <TransactionInput
        amount={amount}
        recipient={recipient}
        onAmountChange={setAmount}
        onRecipientChange={setRecipient}
      />
      <PaymentButton
        amount={amount}
        recipient={recipient}
        setTransactionHash={setTransactionHash}
      />
      <TransactionHash
        transactionHash={transactionHash}
        setTransactionHash={setTransactionHash}
      />
      <MetaMaskDeleteButton
        setRecipient={setRecipient}
        setAmount={setAmount}
        setTransactionHash={setTransactionHash}
      />
    </div>
  );
}
