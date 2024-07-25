import Web3 from "web3";
import bigInt from "big-integer";
import { ERC20_ABI } from "./erc20";

async function handleTransfer(web3, account, recipient, amount, selectedToken, setTransactionHash) {
    if (web3 && account && recipient && amount && selectedToken) {
        try {
            let tx;
            if (selectedToken.symbol === "ETH") {
                tx = await web3.eth.sendTransaction({
                    from: account,
                    to: recipient,
                    value: Web3.utils.toWei(amount, "ether"),
                });
            } else {
                const tokenContract = new web3.eth.Contract(ERC20_ABI, selectedToken.address);
                const decimals = await tokenContract.methods.decimals().call();
                const value = bigInt(Web3.utils.toWei(amount, "ether")).divide(
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
}

export default handleTransfer;
