import BlocknativeSdk from 'bnc-sdk';
import WebSocket from 'ws';
import { dotDotDotAbi } from './abi.js';

const DOT_CONTRACT_ADDRESS = "0x67Ed645EC1994c60d7e3664CA2bEd0A56B48595F";
const DOT_CONTRACT_ABI = dotDotDotAbi;
const DOT_ADMIN_ADDRESS = "0xd29dcbd273d73714eb6bea7bd4f8d99d0fbc3398"

const options = {
  dappId: 'YOUR_DAPP_ID', //Head to blocknative.com to setup your free account!
  networkId: 1,
  system: 'ethereum',
  ws: WebSocket,
  transactionHandlers: [async (event) => await mint(event.transaction)],
  onerror: (error) => {console.error('error!!!   ', error)}
}

const main = async () => {
  const sdk = new BlocknativeSdk(options)
  console.log('listening until error msg is seen...')
  await sdk.configuration({
    scope: DOT_CONTRACT_ADDRESS,
    abi: DOT_CONTRACT_ABI,
    filters: [
      { from:  DOT_ADMIN_ADDRESS },
      { "contractCall.methodName": "flipSaleState" },
      { status: "pending" }
    ],
    watchAddress: true
  })
}

const mint = async (txData) => {
  await signer.sendTransaction({
    to: DOT_CONTRACT_ADDRESS,
    data: mintOne,
    type: 2,
    value: ETHER.div(100).mul(5),
    maxFeePerGas: BigNumber.from(txData.maxFeePerGas).sub(1),
    maxPriorityFeePerGas: txData.maxPriorityFeePerGas,
    gasLimit: 200000,
    chainId: 1
  })
}

await main()
