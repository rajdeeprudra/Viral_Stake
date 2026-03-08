import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export async function getSkrBalance(walletAddress: string) {

  try {

    const connection = new Connection(clusterApiUrl("devnet"));

    const publicKey = new PublicKey(walletAddress);

    const balanceLamports = await connection.getBalance(publicKey);

    const balanceSOL = balanceLamports / 1e9;

    return balanceSOL;

  } catch (err) {

    console.log("Error fetching balance", err);
    return 0;

  }

}