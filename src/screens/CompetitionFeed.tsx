import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

export default function CompetitionFeed() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Live Competition</Text>

      <View style={styles.videoContainer}>

        <View style={styles.videoBox}>
          <Video
            source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
          />

          <Text style={styles.pool}>Pool A: 120 SKR</Text>

          <TouchableOpacity style={styles.stakeButton}>
            <Text style={styles.stakeText}>Stake A</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.videoBox}>
          <Video
            source={{ uri: "https://www.w3schools.com/html/movie.mp4" }}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            isMuted
          />

          <Text style={styles.pool}>Pool B: 80 SKR</Text>

          <TouchableOpacity style={styles.stakeButton}>
            <Text style={styles.stakeText}>Stake B</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
    alignItems: "center"
  },

  title: {
    fontSize: 28,
    color: "#39FF14",
    fontWeight: "bold",
    marginBottom: 20
  },

  videoContainer: {
    flexDirection: "row",
    gap: 15
  },

  videoBox: {
    width: 160,
    alignItems: "center"
  },

  video: {
    width: 160,
    height: 250,
    borderRadius: 10
  },

  pool: {
    color: "#39FF14",
    marginTop: 10
  },

  stakeButton: {
    backgroundColor: "#39FF14",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10
  },

  stakeText: {
    color: "#000",
    fontWeight: "bold"
  }

});