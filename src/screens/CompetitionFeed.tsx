import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface Props {
  stakeSOL: (side: string) => Promise<string | null>;
}

export default function CompetitionFeed({ stakeSOL }: Props) {

  const [poolA, setPoolA] = useState(1.2);
  const [poolB, setPoolB] = useState(0.8);

  const [timeLeft, setTimeLeft] = useState(30);
  const [winner, setWinner] = useState<string | null>(null);
  const [distributionDone, setDistributionDone] = useState(false);
  const [rewardMessage, setRewardMessage] = useState("");

  const stakeA = async () => {
    const sig = await stakeSOL("A");
    if (sig) setPoolA(prev => prev + 0.1);
  };

  const stakeB = async () => {
    const sig = await stakeSOL("B");
    if (sig) setPoolB(prev => prev + 0.1);
  };

  useEffect(() => {

    if (timeLeft <= 0 && !distributionDone) {

      const distribute = async () => {

        let winSide = "Draw";

        if (poolA > poolB) winSide = "A";
        else if (poolB > poolA) winSide = "B";

        setWinner(winSide);

        if (winSide !== "Draw") {

          try {

            const res = await fetch("http://192.168.31.70:3000/distribute", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                winner: winSide
              })
            });

            const data = await res.json();

            console.log("Distribution result:", data);

            setRewardMessage("Rewards distributed successfully!");

          } catch (err) {

            console.log("Distribution error:", err);
            setRewardMessage("Reward distribution failed");

          }

        }

        setDistributionDone(true);

      };

      distribute();

      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft, poolA, poolB, distributionDone]);

  const total = poolA + poolB;
  const percentA = ((poolA / total) * 100).toFixed(0);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Live Competition</Text>

      <Text style={styles.timer}>
        Competition ends in: {timeLeft > 0 ? `${timeLeft}s` : "Finished"}
      </Text>

      <View style={styles.row}>

        <View style={styles.card}>
          <Image
            source={{ uri: "https://i.imgur.com/8Km9tLL.png" }}
            style={styles.image}
          />

          <Text style={styles.pool}>
            Pool A: {poolA.toFixed(2)} SOL
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={stakeA}
            disabled={timeLeft <= 0}
          >
            <Text style={styles.buttonText}>Stake A</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Image
            source={{ uri: "https://i.imgur.com/F28w3Ac.png" }}
            style={styles.image}
          />

          <Text style={styles.pool}>
            Pool B: {poolB.toFixed(2)} SOL
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={stakeB}
            disabled={timeLeft <= 0}
          >
            <Text style={styles.buttonText}>Stake B</Text>
          </TouchableOpacity>
        </View>

      </View>

      <Text style={styles.dominance}>
        Video A dominance: {percentA}%
      </Text>

      {winner && (
        <Text style={styles.winner}>
          Winner: {winner}
        </Text>
      )}

      {rewardMessage !== "" && (
        <Text style={styles.reward}>
          {rewardMessage}
        </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    padding:20
  },

  title:{
    fontSize:32,
    fontWeight:"bold",
    color:"#39FF14",
    textAlign:"center",
    marginBottom:10
  },

  timer:{
    color:"#fff",
    textAlign:"center",
    marginBottom:20
  },

  row:{
    flexDirection:"row",
    justifyContent:"space-between"
  },

  card:{
    width:"45%",
    backgroundColor:"#111",
    padding:10,
    borderRadius:10
  },

  image:{
    width:"100%",
    height:150,
    borderRadius:10
  },

  pool:{
    color:"#39FF14",
    marginTop:10
  },

  button:{
    backgroundColor:"#39FF14",
    padding:10,
    marginTop:10,
    borderRadius:8
  },

  buttonText:{
    color:"#000",
    fontWeight:"bold",
    textAlign:"center"
  },

  dominance:{
    color:"#fff",
    textAlign:"center",
    marginTop:20
  },

  winner:{
    marginTop:20,
    textAlign:"center",
    color:"#FFD700",
    fontSize:22
  },

  reward:{
    marginTop:10,
    textAlign:"center",
    color:"#00FFFF",
    fontSize:16
  }

});