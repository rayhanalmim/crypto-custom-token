import React, { useState, useEffect, useCallback, useRef } from "react";
import Web3 from "web3";

import { Header } from "./partials/Elements/Header/Header";
import { Button } from "./partials/Elements/Buttons/Button";
import { WalletInfo } from "./partials/Screen/Main/Wallet/WalletInfo";
import { TransactionHash } from "./partials/Screen/Main/TransactionHash/TransactionHash";

import useLoadBalance from "./utilities/hooks/useLoadBalance";
import useLoadTokens from "./utilities/hooks/useLoadTokens";

import { connectWallet } from "./utilities/connectWallet";
import { handleTokenChange } from "./utilities/changeToken";
import { handleTransfer } from "./utilities/transfer";
import { knownTokens } from "./utilities/knownTokens";
import { ERC20_ABI } from "./utilities/erc20";

import "./App.css";
import useWeb3Setup from "./utilities/hooks/useWeb3Setup";

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
  // const loadTokens = useLoadTokens(web3Ref.current, setTokens);

  const loadTokens = useCallback(
    async (account) => {
      const web3 = web3Ref.current;
      const tokenBalances = [];
      try {
        const ethBalance = await web3.eth.getBalance(account);

        tokenBalances.push({
          symbol: "ETH",
          balance: Web3.utils.fromWei(ethBalance, "ether"),
          address: '0x0000000000000000000000000000000000000000',
        });
      } catch (error) {
        console.error("Failed to load ETH balance:", error);
      }
      for (const token of knownTokens) {
        try {
          const tokenContract = new web3.eth.Contract(ERC20_ABI, token.address);
          const balance = await tokenContract.methods.balanceOf(account).call();
          const decimals = await tokenContract.methods.decimals().call();
          const symbol = await tokenContract.methods.symbol().call();
          tokenBalances.push({
            symbol,
            balance: Number(balance) / 10 ** Number(decimals),
            address: token.address,
          });
        } catch (error) {
          console.error(`Failed to load token ${token.name}:`, error);
        }
      }
      setTokens(tokenBalances);
    },
    [knownTokens]
  );

  useWeb3Setup({ web3Ref, setAccount, loadTokens, loadBalance, setBalance, selectedToken });

  function connectWalletHandler() {
    connectWallet({ web3Ref, setAccount, loadTokens, loadBalance, selectedToken })
  }

  function handleTokenChangeHandler(event) {
    handleTokenChange({ tokens, setSelectedToken, account, loadBalance, setBalance, event });
  };

  function handleTransferHandler() {
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
            handleTokenChange={handleTokenChangeHandler}
            handleTransfer={handleTransferHandler}
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