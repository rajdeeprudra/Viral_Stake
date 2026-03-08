const express = require("express");
const cors = require("cors");
const bs58 = require("bs58");
const {
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  PublicKey
} = require("@solana/web3.js");

const app = express();
app.use(cors());
app.use(express.json());

const connection = new Connection("https://api.devnet.solana.com");

/* YOUR DEVNET PRIVATE KEY */
const PRIVATE_KEY = "3Rp5rzPpqGJLF5nv6fiNGeusQA5M1nRkLpKyGsmBdz48XVxAMW2qDZNqvJaG3vywSanvoGZ9nRN6h96aa6LR2taG";

const sender = Keypair.fromSecretKey(
  bs58.decode(PRIVATE_KEY)
);

console.log("Using wallet:", sender.publicKey.toString());

const poolWallet = new PublicKey(
  "5XBZyMvM5DaScPFnfP5fcpouFy6mSWgqhoKpN6FNRGZB"
);

/* store stakes */
let stakes = [];

app.post("/stake", async (req, res) => {
console.log("Stake request body:", req.body);
  try {

    const { wallet, side } = req.body;

    const lamports = 0.1 * 1000000000;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: poolWallet,
        lamports
      })
    );

    const signature = await connection.sendTransaction(transaction, [sender]);

    await connection.confirmTransaction(signature);

    /* save stake */
    stakes.push({
      wallet,
      side,
      amount: 0.1
    });

    console.log("Stake recorded:", stakes);

    res.json({ signature });

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Transaction failed" });

  }

});

/* distribute rewards */

app.post("/distribute", async (req, res) => {

  console.log("Distribute endpoint triggered");

  try {

    const { winner } = req.body;

    const totalPool = stakes.reduce((sum, s) => sum + s.amount, 0);

    const winnerPool = stakes
      .filter(s => s.side === winner)
      .reduce((sum, s) => sum + s.amount, 0);

    if (winnerPool === 0) {
      return res.json({ message: "No winners" });
    }

    const payouts = [];

    for (const s of stakes) {

      if (s.side !== winner) continue;

      const share = s.amount / winnerPool;
      const reward = share * totalPool;

      const lamports = reward * 1000000000;

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: sender.publicKey,
          toPubkey: new PublicKey(s.wallet),
          lamports
        })
      );

      const sig = await connection.sendTransaction(tx, [sender]);

      payouts.push({
        wallet: s.wallet,
        reward,
        signature: sig
      });

      console.log("Reward sent:", sig);

    }

    stakes = [];

    res.json({
      winner,
      payouts
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Distribution failed" });

  }

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});