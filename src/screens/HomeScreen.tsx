import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Linking from "expo-linking";

import { connectWallet } from "../wallet/connectWallet";
import { useWallet } from "../context/WalletContext";
import CompetitionFeed from "./CompetitionFeed";
import { getSkrBalance } from "../solana/getSkrBalance";

export default function HomeScreen() {

  const { walletAddress, setWalletAddress } = useWallet();
  const [skrBalance, setSkrBalance] = useState<number | null>(null);

  // Listen for Phantom redirect
  useEffect(() => {

    const handleWalletRedirect = (event: { url: string }) => {

      const { url } = event;

      console.log("Redirect URL:", url);

      const parsed = Linking.parse(url);

      const walletKey =
        parsed.queryParams?.phantom_encryption_public_key as string | undefined;

      if (walletKey) {
        setWalletAddress(walletKey);
      }

    };

    const subscription = Linking.addEventListener("url", handleWalletRedirect);

    return () => {
      subscription.remove();
    };

  }, []);

  // Fetch SKR balance
  useEffect(() => {

    if (walletAddress) {
      getSkrBalance(walletAddress).then((balance) => {
        setSkrBalance(balance);
      });
    }

  }, [walletAddress]);

  const connectWalletHandler = async () => {
    await connectWallet();
  };

  // If wallet connected show competition feed
  if (walletAddress) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        
        <CompetitionFeed />

        <View style={{ alignItems: "center", padding: 20 }}>
          <Text style={styles.walletText}>
            {walletAddress.slice(0,4)}...{walletAddress.slice(-4)}
          </Text>

          {skrBalance !== null && (
            <Text style={{ color: "#39FF14", marginTop: 10 }}>
              SKR Balance: {skrBalance}
            </Text>
          )}
        </View>

      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>ViralStake</Text>

      <Text style={styles.subtitle}>
        Stake on viral videos and earn crypto.
      </Text>

      <Text style={styles.description}>
        Two videos compete. The community stakes on the one they believe will win.
        The side with the biggest pool wins the competition.
      </Text>

      <TouchableOpacity style={styles.button} onPress={connectWalletHandler}>
        <Text style={styles.buttonText}>
          Connect Wallet
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#39FF14",
    marginBottom: 20
  },

  subtitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center"
  },

  description: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 40
  },

  button: {
    backgroundColor: "#39FF14",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18
  },

  walletText: {
    color: "#39FF14",
    marginTop: 20,
    fontSize: 16
  }

});