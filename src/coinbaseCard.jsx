import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  Button,
  Card,
  Text,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Box,
  Grid,
  VStack,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

export function CoinbaseWalletCard() {
  const {
    connector,
    isActive,
    isActivating,
    account,
    accounts,
    chainId,
    provider,
  } = useWeb3React();

  const [error, setError] = useState(undefined);

  const connect = () => {
    console.log('connector', connector);
    connector?.activate(chainId);
  };

  const disconnect = () => {
    connector?.deactivate(chainId);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Button onClick={connect} disabled={isActive}>
            Connect
          </Button>

          {isActive ? (
            <Card>
              <CardHeader>
                <Heading size="md">Wallet Info</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Summary
                    </Heading>

                    <UnorderedList>
                      <ListItem>isActive: {isActive.toString()}</ListItem>
                      <ListItem>
                        isActivating: {isActivating.toString()}
                      </ListItem>
                      <ListItem>accounts: {accounts}</ListItem>
                      <ListItem>account: {account}</ListItem>
                      <ListItem>chainId: {chainId}</ListItem>
                    </UnorderedList>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          ) : (
            ''
          )}
          {isActive ? <Button onClick={disconnect}>Disconnect</Button> : ''}
        </VStack>
      </Grid>
    </Box>
  );
}
