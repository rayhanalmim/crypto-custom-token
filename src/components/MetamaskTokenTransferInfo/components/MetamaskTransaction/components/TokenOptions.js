import { useContext } from "react";
import CryptoContext from "../../../../../AppContext/CryptoContext";

export function TokenOptions({ onTokenChange }) {
  const {
    selectedToken,
    tokens,
    setSelectedToken
  } = useContext(CryptoContext);

  function tokenChangeHandler(event) {
    const token = tokens.find((t) => t.address === event.target.value);
    setSelectedToken(token);
  }
  
  return (
    <select onChange={tokenChangeHandler} value={selectedToken?.address || ''}>
      <option value='' disabled>
        Select Token
      </option>
      {tokens.map((token) => (
        <option key={token.symbol} value={token.address}>
          {token.symbol} ({token.balance})
        </option>
      ))}
    </select>
  );
}
