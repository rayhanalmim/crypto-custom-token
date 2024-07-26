import { useCallback } from "react";
import Web3 from "web3";
import { ERC20_ABI } from "../erc20";
import { knownTokens } from "../knownTokens";

const useLoadTokens = (web3Ref, setTokens) => {
    
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
    return loadTokens;
};

export default useLoadTokens;
