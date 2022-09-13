import { FunctionComponent } from 'react';
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }: AppProps) {
  const C = Component as FunctionComponent;
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <C {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
