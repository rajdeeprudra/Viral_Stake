import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { connectWallet } from "../wallet/connectWallet";
import { useWallet } from "../context/WalletContext";
import CompetitionFeed from "./CompetitionFeed";
import { getSkrBalance } from "../solana/getSkrBalance";

export default function HomeScreen() {

  const { walletAddress, setWalletAddress } = useWallet();
  const [skrBalance, setSkrBalance] = useState<number | null>(null);

  useEffect(() => {

    if (walletAddress) {
      getSkrBalance(walletAddress).then((balance) => {
        setSkrBalance(balance);
      });
    }

  }, [walletAddress]);

  const connectWalletHandler = async () => {

    await connectWallet();

    setWalletAddress("7LKVMGM2WmgYGH1qghkSDUUJQ2QsqxM3unZUJkqyiaYk");

  };

  const stakeSOL = async (side: string): Promise<string | null> => {

  try {

    const res = await fetch("https://viral-stake.onrender.com/stake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        wallet: walletAddress,
        side: side
      })
    });

    const data = await res.json();

    return data.signature;

  } catch (err) {

    console.log(err);
    return null;

  }

};

  if (walletAddress) {

    return (

      <View style={{ flex: 1, backgroundColor: "#000" }}>

        <CompetitionFeed stakeSOL={stakeSOL} />

        <View style={{ alignItems: "center", padding: 20 }}>

          <Text style={styles.walletText}>
            {walletAddress.slice(0,4)}...{walletAddress.slice(-4)}
          </Text>

          {skrBalance !== null && (
            <Text style={{ color: "#39FF14", marginTop: 10 }}>
              Balance: {skrBalance} SOL
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
        Two videos compete. Stake on the one you believe will win.
      </Text>

      <TouchableOpacity style={styles.button} onPress={connectWalletHandler}>
        <Text style={styles.buttonText}>
          Connect Phantom
        </Text>
      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#000",
    justifyContent:"center",
    alignItems:"center",
    padding:30
  },

  title:{
    fontSize:42,
    fontWeight:"bold",
    color:"#39FF14",
    marginBottom:20
  },

  subtitle:{
    fontSize:20,
    color:"#fff",
    marginBottom:20,
    textAlign:"center"
  },

  description:{
    fontSize:16,
    color:"#aaa",
    textAlign:"center",
    marginBottom:40
  },

  button:{
    backgroundColor:"#39FF14",
    paddingVertical:15,
    paddingHorizontal:40,
    borderRadius:10
  },

  buttonText:{
    color:"#000",
    fontWeight:"bold",
    fontSize:18
  },

  walletText:{
    color:"#39FF14",
    marginTop:20,
    fontSize:16
  }

});