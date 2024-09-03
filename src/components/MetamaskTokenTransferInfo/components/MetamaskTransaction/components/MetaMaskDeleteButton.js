export default function MetaMaskDeleteButton({
  setAccount,
  setBalance,
  setRecipient,
  setAmount,
  setTransactionHash,
}) {
  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setRecipient('');
    setAmount('');
    setTransactionHash(null);
    window.location.reload();
  };
  return <button onClick={disconnectWallet}>Disconnect</button>;
}
