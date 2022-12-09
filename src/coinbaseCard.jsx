import { useEffect, useState } from 'react';
//import { coinbaseWallet, hooks } from '../connector/coinbaseWallet';
import { coinbaseWallet, networkHooks } from './connectors';

const {
  useAccounts,
  useIsActivating,
  useIsActive,
  useChainId,
  useProvider,
  useENSNames,
} = networkHooks;

console.log(useChainId, useENSNames);
console.log(useAccounts, useIsActivating, useIsActive);

export function CoinbaseWalletCard() {
  const chainId = useChainId();
  console.log(chainId);
  const accounts = useAccounts();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [error, setError] = useState(undefined);

  // attempt to connect eagerly on mount
  useEffect(() => {
    void coinbaseWallet.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to coinbase wallet');
    });
  }, []);

  return (
    <div
      connector={coinbaseWallet}
      chainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
  );
}
