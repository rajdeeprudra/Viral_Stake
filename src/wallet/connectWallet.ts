import * as Linking from "expo-linking";
import nacl from "tweetnacl";
import bs58 from "bs58";

export async function connectWallet(): Promise<string | null> {
  try {

    const dappKeyPair = nacl.box.keyPair();

    const redirectLink = Linking.createURL("onConnect");

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: "devnet",
      app_url: "https://viralstake.app",
      redirect_link: redirectLink,
    });

    const phantomUrl = `https://phantom.app/ul/v1/connect?${params.toString()}`;

    await Linking.openURL(phantomUrl);

    return null; // until redirect handler returns wallet

  } catch (err) {
    console.log("Wallet connection error:", err);
    return null;
  }
}