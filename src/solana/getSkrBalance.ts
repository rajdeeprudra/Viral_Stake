import { PublicKey } from "@solana/web3.js";
import { connection } from "./connection";
import { getAssociatedTokenAddress } from "@solana/spl-token";

const SKR_TOKEN_MINT = "6QdR4F5enCL3SGJk373BwgXgfH2Hw1w6mtVfqFBbBkao";

export async function getSkrBalance(walletAddress: string) {
  try {
    const wallet = new PublicKey(walletAddress);
    const mint = new PublicKey(SKR_TOKEN_MINT);

    const tokenAccount = await getAssociatedTokenAddress(mint, wallet);

    const balance = await connection.getTokenAccountBalance(tokenAccount);

    return balance.value.uiAmount;
  } catch (err) {
    console.log("Error fetching SKR balance", err);
    return 0;
  }
}

//test token mint address: 6QdR4F5enCL3SGJk373BwgXgfH2Hw1w6mtVfqFBbBkao