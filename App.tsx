import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import { WalletProvider } from "./src/context/WalletContext";

export default function App() {
  return (
    <WalletProvider>
      <HomeScreen />
    </WalletProvider>
  );
}