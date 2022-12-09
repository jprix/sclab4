import React from 'react';
import {
  coinbaseWallet,
  coinbaseHooks,
  network,
  networkHooks,
} from './connectors';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { Web3ReactProvider } from '@web3-react/core';
import { CoinbaseWalletCard } from './coinbaseCard';
import { FetchContract } from './smartContractABI';

function App() {
  const connectors = [
    [coinbaseWallet, coinbaseHooks],
    [network, networkHooks],
  ];
  return (
    <ChakraProvider theme={theme}>
      <Web3ReactProvider connectors={connectors}>
        <CoinbaseWalletCard />
        <FetchContract />
      </Web3ReactProvider>
    </ChakraProvider>
  );
}

export default App;
