import React, { useState, useEffect, useCallback, useRef } from "react";
import Web3 from "web3";
import bigInt from "big-integer";
import { Header } from "./partials/Elements/Header/Header";
import { Button } from "./partials/Elements/Buttons/Button";
import { WalletInfo } from "./partials/Screen/Main/Wallet/WalletInfo";
import { TransactionHash } from "./partials/Screen/Main/TransactionHash/TransactionHash";
import "./App.css";
import { ERC20_ABI } from "./utilities/erc20";
// import { knownTokens } from "./utilities/knownTokens";
import useLoadBalance from "./utilities/hooks/useLoadBalance";
import useLoadTokens from "./utilities/hooks/useLoadTokens";
import { connectWallet } from "./utilities/connectWallet";
import { handleTokenChange } from "./utilities/changeToken";
import useKnownTokens from "./utilities/hooks/useKnownTokens";
import handleTransfer from "./utilities/transfer";

const App = () => {

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState([]);
  console.log(tokens, 'tokens', balance, 'balance')
  const [selectedToken, setSelectedToken] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState(null);

  const web3Ref = useRef(null);

  const loadBalance = useLoadBalance(web3Ref.current, setBalance);
  // const loadTokens = useLoadTokens(web3Ref.current, setTokens);
  const knownTokens = useKnownTokens();

  // const loadBalance = useCallback(
  //   async (account, token) => {
  //     const web3 = web3Ref.current;
  //     if (web3 && token) {
  //       try {
  //         if (token.symbol === "ETH") {
  //           const balance = await web3.eth.getBalance(account);
  //           setBalance(Web3.utils.fromWei(balance, "ether"));
  //         } else {
  //           const tokenContract = new web3.eth.Contract(ERC20_ABI, token.address);
  //           const balance = await tokenContract.methods.balanceOf(account).call();
  //           const decimals = await tokenContract.methods.decimals().call();
  //           setBalance(Number(balance) / 10 ** Number(decimals));
  //         }
  //       } catch (error) {
  //         console.error(`Failed to load balance for token ${token.symbol}:`, error);
  //         setBalance(null);
  //       }
  //     }
  //   },
  //   []
  // );

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
      // for (const token of knownTokens) {
      //   try {
      //     const tokenContract = new web3.eth.Contract(ERC20_ABI, token.address);
      //     const balance = await tokenContract.methods.balanceOf(account).call();
      //     const decimals = await tokenContract.methods.decimals().call();
      //     const symbol = await tokenContract.methods.symbol().call();
      //     tokenBalances.push({
      //       symbol,
      //       balance: Number(balance) / 10 ** Number(decimals),
      //       address: token.address,
      //     });
      //   } catch (error) {
      //     console.error(`Failed to load token ${token.name}:`, error);
      //   }
      // }
      setTokens(tokenBalances);
    },
    [knownTokens]
  );

  useEffect(() => {
    if (window.ethereum) {
      web3Ref.current = new Web3(window.ethereum);
      const web3 = web3Ref.current;


      const handleAccountsChanged = async (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await loadTokens(accounts[0]);
          if (selectedToken) {
            loadBalance(accounts[0], selectedToken);
          }
        } else {
          setAccount(null);
          setBalance(null);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    } else {
      alert("MetaMask is not installed");
    }
  }, [loadTokens, loadBalance, selectedToken, web3Ref]);


  const connectWalletHandler = () => connectWallet({ web3Ref, setAccount, loadTokens, loadBalance, selectedToken })

  const handleTokenChangeHandler = handleTokenChange(tokens, setSelectedToken, account, loadBalance, setBalance);

  const handleTransferHandler = () => {
    handleTransfer(web3Ref.current, account, recipient, amount, selectedToken, setTransactionHash);
  };
 
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