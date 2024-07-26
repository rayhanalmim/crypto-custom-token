
export function handleTokenChange({ tokens, setSelectedToken, account, loadBalance, setBalance, event }) {
    const token = tokens.find((t) => t.address === event.target.value);
    setSelectedToken(token);
    if (account) {
        loadBalance(account, token, setBalance);
    }
}