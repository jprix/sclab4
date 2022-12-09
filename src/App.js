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
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Web3ReactProvider } from '@web3-react/core';
import { CoinbaseWalletCard } from './coinbaseCard';

function App() {
  const connectors = [
    [coinbaseWallet, coinbaseHooks],
    [network, networkHooks],
  ];
  return (
    <ChakraProvider theme={theme}>
      <Web3ReactProvider connectors={connectors}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <CoinbaseWalletCard />
              <Text>
                Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
              </Text>
              <Link
                color="teal.500"
                href="https://chakra-ui.com"
                fontSize="2xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn Chakra
              </Link>
            </VStack>
          </Grid>
        </Box>
      </Web3ReactProvider>
    </ChakraProvider>
  );
}

export default App;
