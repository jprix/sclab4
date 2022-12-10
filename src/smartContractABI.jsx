import * as React from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import {
  Button,
  Box,
  Grid,
  VStack,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

export function FetchContract() {
  const [currentPlayers, setCurrentPlayers] = React.useState([]);
  const [currentManager, setCurrentManager] = React.useState('');
  const [currentBalance, setCurrentBalance] = React.useState('');
  const [currentValue, setCurrentValue] = React.useState('');
  const [currentMessage, setCurrentMessage] = React.useState({
    message: 'Waiting on transaction to process...',
  });

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
  const signer = provider?.getSigner();
  console.log(signer);
  const callContract = new ethers.Contract(address, abi, signer);
  //const [error, setError] = useState(undefined);
  const connect = async () => {
    const manager = await callContract.manager();
    setCurrentManager(manager);
    const players = callContract.getPlayers();
    setCurrentPlayers(players.length);
    const balance = await provider.getBalance(callContract.address);
    const etherBalance = ethers.utils.formatEther(balance);
    console.log(etherBalance);

    setCurrentBalance(etherBalance);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('clicked', currentValue, callContract);
    console.log(currentValue * 10e17);
    const weiPrice = currentValue * 10e17;

    await callContract.enter({
      value: '11000000000000000',
    });

    setCurrentMessage({ message: 'You have been entered!' });
  };

  const pickWinner = async () => {
    //const accounts = await callContract.getPlayers();
    setCurrentMessage({ message: 'Waiting on Transaction Success' });

    await callContract.pickWinner({
      gasLimit: 100000,
    });

    setCurrentMessage({
      message: 'A winner has been picked',
    });
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Button onClick={connect}>Call Contract</Button>
          <div>
            <h2>Lottery Contract</h2>
            <p>This contract is managed by {currentManager}.</p>
            <p>
              There are currently
              {currentPlayers} entered and competing for {currentBalance}
            </p>
          </div>
          <h4>Want to try your luck?</h4>
          <FormControl>
            <FormLabel>Amount of Ether to enter</FormLabel>
            <Input
              value={currentValue}
              onChange={(event) => setCurrentValue(event.target.value)}
            />
            <Button onClick={onSubmit}>Enter</Button>
          </FormControl>
          <hr />
          <h1>{currentMessage.message}</h1>
          <hr />
          <h4>Ready to Pick a winner?</h4>
          <Button onClick={pickWinner}>Pick Winner</Button>
          <h1>{currentMessage.message}</h1>
        </VStack>
      </Grid>
    </Box>
  );
}
