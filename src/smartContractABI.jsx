import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import {
  Button,
  Box,
  Grid,
  VStack,
  //   UnorderedList,
  //   ListItem,
} from '@chakra-ui/react';

export function FetchContract() {
  const { provider } = useWeb3React();
  const address = '0x5D7eA595C044dfF343A584859A1FC4E59Aab3499';
  const abi = [
    {
      constant: true,
      inputs: [],
      name: 'manager',
      outputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'pickWinner',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'getPlayers',
      outputs: [
        {
          name: '',
          type: 'address[]',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'enter',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      name: 'players',
      outputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
  ];
  //const [error, setError] = useState(undefined);

  const connect = async () => {
    let currentProvider = ethers.providers.getNetwork('goerli');
    console.log('provider', currentProvider);
    const callContract = new ethers.Contract(abi, address, provider);
    // const players = await callContract.getPlayers();
    console.log(callContract.getValue());
    // alert(callContract);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Button onClick={connect}>Call Contract</Button>

          {/* <UnorderedList>
            <ListItem>isActive: {isActive.toString()}</ListItem>
            <ListItem>isActivating: {isActivating.toString()}</ListItem>
            <ListItem>accounts: {accounts}</ListItem>
            <ListItem>account: {account}</ListItem>
            <ListItem>chainId: {chainId}</ListItem>
          </UnorderedList>
          {isActive ? <Button onClick={disconnect}>Disconnect</Button> : ''} */}
        </VStack>
      </Grid>
    </Box>
  );
}
