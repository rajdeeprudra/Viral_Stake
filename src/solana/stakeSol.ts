import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

const stakeSOL = async () => {
  try {

    const response = await fetch("https://viral-stake.onrender.com/stake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    console.log("Transaction signature:", data.signature);

    alert(
      "Stake successful!\n\nView transaction on Solana Explorer:\nhttps://explorer.solana.com/tx/" +
      data.signature +
      "?cluster=devnet"
    );

  } catch (error) {

    console.log("Stake error:", error);
    alert("Transaction failed");

  }
};