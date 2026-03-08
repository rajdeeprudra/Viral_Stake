import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";

export async function createStakeTransaction(
  userWallet: string,
  amount: string
) {

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  const fromPubkey = new PublicKey(userWallet);

  const poolWallet = new PublicKey(
    "65Cdg5UVsGadJBLnejR42hWmN6tDYeZLgSzm2h4j4bi6"
  );

  const lamports = Math.floor(Number(amount) * LAMPORTS_PER_SOL);

  const { blockhash } = await connection.getLatestBlockhash();

  const transaction = new Transaction({
    recentBlockhash: blockhash,
    feePayer: fromPubkey
  });

  transaction.add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey: poolWallet,
      lamports
    })
  );

  return transaction;

}