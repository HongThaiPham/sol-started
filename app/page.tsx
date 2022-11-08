"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { BalanceDisplay } from "../components/BalanceDisplay";
import { PingButton } from "../components/PingButton";
require("@solana/wallet-adapter-react-ui/styles.css");

export default function Home() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const sendSol = (event: any) => {
    event.preventDefault();

    const transaction = new Transaction();
    const recipientPubKey = new PublicKey(
      "3qK87Xu54yDQXkrvYqmZ6qTPeUbWk5g1in1QMnB5RaDS"
    );

    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: publicKey!,
      toPubkey: recipientPubKey,
      lamports: LAMPORTS_PER_SOL * 0.1,
    });

    transaction.add(sendSolInstruction);
    sendTransaction(transaction, connection).then((sig) => {
      console.log(sig);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WalletMultiButton />
      <BalanceDisplay />
      <button onClick={sendSol}>send</button>
      <PingButton />
    </div>
  );
}
