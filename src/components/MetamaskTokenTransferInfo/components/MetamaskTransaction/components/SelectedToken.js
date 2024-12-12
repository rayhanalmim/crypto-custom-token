import { useContext } from "react";
import CryptoContext from "../../../../../AppContext/CryptoContext";

export function SelectedToken() {
  const {
    selectedToken,
    balance
  } = useContext(CryptoContext);
  return (
    <>
      {selectedToken && (
        <p>
          Balance: ${balance} {selectedToken.symbol}
        </p>
      )}
    </>
  );
}
