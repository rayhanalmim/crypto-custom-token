import React, { useState,  useRef } from "react";

import { Header } from "./partials/Elements/Header/Header";
import { Button } from "./partials/Elements/Buttons/Button";
import { WalletInfo } from "./partials/Screen/Main/Wallet/WalletInfo";
import { TransactionHash } from "./partials/Screen/Main/TransactionHash/TransactionHash";

import useLoadBalance from "./utilities/hooks/useLoadBalance";
import useLoadTokens from "./utilities/hooks/useLoadTokens";
import useWeb3Setup from "./utilities/hooks/useWeb3Setup";

import { connectWallet } from "./utilities/connectWallet";
import { handleTokenChange } from "./utilities/changeToken";
import { handleTransfer } from "./utilities/transfer";

import "./App.css";

const App = () => {

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState(null);

  const web3Ref = useRef(null);

  const loadBalance = useLoadBalance(web3Ref.current, setBalance);
  const loadTokens = useLoadTokens(web3Ref, setTokens);

  useWeb3Setup({ web3Ref, setAccount, loadTokens, loadBalance, setBalance, selectedToken });

  function connectWalletHandler() {
    connectWallet({ web3Ref, setAccount, loadTokens, loadBalance, selectedToken })
  }

  function tokenChangeHandler(event) {
    handleTokenChange({ tokens, setSelectedToken, account, loadBalance, setBalance, event });
  };

  function transferHandler() {
    handleTransfer({ web3Ref, account, recipient, amount, selectedToken, setTransactionHash });
  }

  return (
    <div className="App">
      <div className="main">
        <Header />
        {!account ? (
          <Button text={"Connect MetaMask"} action={connectWalletHandler} />
        ) : (
          <WalletInfo
            account={account}
            setAccount={setAccount}
            setBalance={setBalance}
            setTransactionHash={setTransactionHash}
            amount={amount}
            balance={balance}
            handleTokenChange={tokenChangeHandler}
            handleTransfer={transferHandler}
            recipient={recipient}
            selectedToken={selectedToken}
            setAmount={setAmount}
            setRecipient={setRecipient}
            tokens={tokens}
          />
        )}
        <TransactionHash
          setTransactionHash={setTransactionHash}
          transactionHash={transactionHash}
        />
      </div>
    </div>
  );
};

export default App;