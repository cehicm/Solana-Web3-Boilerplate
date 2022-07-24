import { PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useState, useEffect } from 'react';

const Account = () => {
  const { publicKey } = useWallet();
  const [accountRenderData, setAccountRenderData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let datas = [];
    const solanaConnection = new Connection(clusterApiUrl('devnet'));

    const pubKey = new PublicKey(publicKey);
    let transactionList = await solanaConnection.getSignaturesForAddress(
      pubKey
    );

    transactionList.forEach((transaction, i) => {
      const date = new Date(transaction.blockTime * 1000);
      
      datas.push([
        i + 1,
        transaction.signature,
        date,
        transaction.confirmationStatus,
      ]);
    });

    if (datas) {
      setAccountRenderData(datas);
    }
  };

  return (
    <>
      <>Transaction history:</>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Signature</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {accountRenderData &&
            accountRenderData.map((data, index) => (
              <tr key={index}>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{JSON.stringify(data[2])}</td>
                <td>{data[3]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Account;
