import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';
import { URLS } from './chains';
import { Network } from '@web3-react/network';

export const [network, networkHooks] = initializeConnector(
  (actions) => new Network({ actions, urlMap: URLS })
);

export const [coinbaseWallet, coinbaseHooks] = initializeConnector(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: URLS[1][0],
        appName: 'web3-react',
      },
    })
);
