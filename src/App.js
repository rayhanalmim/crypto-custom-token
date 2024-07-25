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
          address: "",
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

  const connectWallet = async () => {
    const web3 = web3Ref.current;

    if (web3) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        await loadTokens(accounts[0]);
        if (selectedToken) {
          loadBalance(accounts[0], selectedToken);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleTokenChange = (e) => {
    const token = tokens.find((t) => t.address === e.target.value);
    setSelectedToken(token);
    if (account) {
      loadBalance(account, token);
    }
  };

  // const handleTokenChangeHandler = handleTokenChange(tokens, setSelectedToken, account, loadBalance, setBalance);

  const handleTransfer = async () => {
    const web3 = web3Ref.current;
    if (web3 && account && recipient && amount && selectedToken) {
      try {
        let tx;
        if (selectedToken.symbol === "ETH") {
          tx = await web3.eth.sendTransaction({
            from: account,
            to: recipient,
            value: web3.utils.toWei(amount, "ether"),
          });
        } else {
          const tokenContract = new web3.eth.Contract(ERC20_ABI, selectedToken.address);
          const decimals = await tokenContract.methods.decimals().call();
          const value = bigInt(web3.utils.toWei(amount, "ether")).divide(
            bigInt(10).pow(18 - Number(decimals))
          );
          console.log(`Transferring ${value.toString()} ${selectedToken.symbol} to ${recipient}`);
          tx = await tokenContract.methods.transfer(recipient, value.toString()).send({ from: account });
        }
        console.log("Transaction:", tx);
        setTransactionHash(tx.transactionHash);
      } catch (error) {
        console.error("Failed to transfer token:", error);
      }
    }
  };

  return (
    <div className="App">
      <div className="main">
        <Header />
        {!account ? (
          <Button text={"Connect MetaMask"} action={connectWallet} />
          // <Button text={"Connect MetaMask"} action={() => connectWallet({ web3Ref, setAccount, loadTokens, loadBalance, selectedToken })} />
        ) : (
          <WalletInfo
            account={account}
            setAccount={setAccount}
            setBalance={setBalance}
            setTransactionHash={setTransactionHash}
            amount={amount}
            balance={balance}
            handleTokenChange={handleTokenChange}
            handleTransfer={handleTransfer}
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
