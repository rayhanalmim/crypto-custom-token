export function TokenOptions({ selectedToken, tokens, onTokenChange }) {
  return (
    <select onChange={onTokenChange} value={selectedToken?.address || ''}>
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
