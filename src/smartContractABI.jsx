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
  const address = '0xF652E3004BF6025dFE423728257bC5096a0ACF99';
  const abi = [
    {
      inputs: [],
      name: 'enter',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'pickWinner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'getPlayers',
      outputs: [
        {
          internalType: 'address payable[]',
          name: '',
          type: 'address[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'manager',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'players',
      outputs: [
        {
          internalType: 'address payable',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  //const [error, setError] = useState(undefined);

  const connect = async () => {
    const signer = provider?.getSigner();
    const callContract = new ethers.Contract(address, abi, signer);
    const players = await callContract.getPlayers();
    console.log(players);
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
