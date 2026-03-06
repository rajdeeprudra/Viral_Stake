import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol";

export async function connectWallet() {
  try {

    const authorizationResult = await transact(async (wallet) => {

      const auth = await wallet.authorize({
        cluster: "devnet",
        identity: {
          name: "ViralStake",
        },
      });

      return auth;
    });

    console.log("Connected wallet:", authorizationResult.accounts[0].address);

    return authorizationResult.accounts[0].address;

  } catch (err) {
    console.error("Wallet connection failed:", err);
  }
}