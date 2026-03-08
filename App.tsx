import 'react-native-get-random-values'
import 'react-native-url-polyfill/auto'

import { Buffer } from "buffer"
global.Buffer = Buffer

import React from "react"
import HomeScreen from "./src/screens/HomeScreen"
import { WalletProvider } from "./src/context/WalletContext"

export default function App() {
  return (
    <WalletProvider>
      <HomeScreen />
    </WalletProvider>
  )
}