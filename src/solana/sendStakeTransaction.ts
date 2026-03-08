import * as Linking from "expo-linking";

export async function sendStakeTransaction(
  fromWallet: string,
  toWallet: string,
  amount: string
) {

  const redirect = Linking.createURL("onStake");

  const url =
    `https://phantom.app/ul/v1/transfer` +
    `?from=${fromWallet}` +
    `&to=${toWallet}` +
    `&amount=${amount}` +
    `&cluster=devnet` +
    `&redirect_link=${encodeURIComponent(redirect)}`;

  await Linking.openURL(url);

}