import { useMemo } from "react";

const useKnownTokens = () => {
    
  const knownTokens = useMemo(
    () => [
      { name: "LINK", address: "0x779877A7B0D9E8603169DdbD7836e478b4624789" },
      { name: "WETH", address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14" },
    ],
    []
  );

  return knownTokens;
};

export default useKnownTokens;
