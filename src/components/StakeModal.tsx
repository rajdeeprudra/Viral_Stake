import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  side: "A" | "B";
};

export default function StakeModal({ visible, onClose, side }: Props) {

  const [amount, setAmount] = useState("");

  const handleStake = () => {
    console.log(`Stake ${amount} SKR on ${side}`);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">

      <View style={styles.overlay}>
        <View style={styles.modal}>

          <Text style={styles.title}>Stake on Video {side}</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter SKR amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <TouchableOpacity style={styles.confirmButton} onPress={handleStake}>
            <Text style={styles.confirmText}>Confirm Stake</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>

        </View>
      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    width: 300,
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#39FF14"
  },

  title: {
    color: "#39FF14",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center"
  },

  input: {
    borderWidth: 1,
    borderColor: "#39FF14",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20
  },

  confirmButton: {
    backgroundColor: "#39FF14",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },

  confirmText: {
    color: "#000",
    fontWeight: "bold"
  },

  cancel: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 10
  }

});