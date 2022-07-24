import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import Transactions from './components/Transactions';
import Account from './components/Account';

const MyWallet = () => {
  let walletAddress = '';
  
  const wallet = useWallet();
  
  if (wallet.connected && wallet.publicKey) {
    walletAddress = wallet.publicKey.toString();
  }

  return (
    <>
      {wallet.connected && <p>Your wallet is {walletAddress}</p>}

      <div className="multi-wrapper">
        <span className="button-wrapper">
          <WalletModalProvider>
            <WalletMultiButton />
          </WalletModalProvider>
        </span>
        {wallet.connected && (
          <>
            <div><Transactions walletAddress={walletAddress} /></div>
            <div><Account /></div>

            <div><WalletDisconnectButton /></div>
          </>
        )}
      </div>
    </>
  );
};
export default MyWallet;
