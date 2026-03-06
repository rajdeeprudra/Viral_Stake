import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connectWallet } from "../wallet/connectWallet";

export default function HomeScreen() {

  const connectWalletHandler = async () => {
  const address = await connectWallet();
  console.log(address);
};

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
        <Text style={styles.buttonText}>Connect Wallet</Text>
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
  }

});