import { ERC20_ABI } from "./erc20";

export const getTokenInfo = async (web3, account, token) => {
    try {
      const tokenContract = new web3.eth.Contract(ERC20_ABI, token.address);
      const balance = await tokenContract.methods.balanceOf(account).call();
      const decimals = await tokenContract.methods.decimals().call();
      const symbol = await tokenContract.methods.symbol().call();
  
      return {
        symbol,
        balance: Number(balance) / 10 ** Number(decimals),
        address: token.address,
      };
    } catch (error) {
      console.error(`Failed to load token ${token.name}:`, error);
      return null;
    }
  };
  