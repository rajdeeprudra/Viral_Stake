import * as Linking from "expo-linking";

export async function connectWallet() {

  const phantomUrl = "https://phantom.app/ul";

  await Linking.openURL(phantomUrl);

}