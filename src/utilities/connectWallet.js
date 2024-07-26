
export async function connectWallet({ web3Ref, setAccount, loadTokens, loadBalance, selectedToken }) {
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

