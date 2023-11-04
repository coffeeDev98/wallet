import "react-native-gesture-handler";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { generateAccount } from "./utils/accountUtils";
import WalletDashboard from "./screens/WalletDashboard";
import Hr from "./components/ui/Hr";
import { AccountContext } from "./context/account";
import CreateWallet from "./screens/CreateWallet";
import { appStyles } from "./stylesheets/app";
import { GlobalContext } from "./context/global";
import MakeTransactionScreen from "./screens/MakeTransactionScreen";
import BottomNavbar from "./components/BottomNavbar.jsx";
import AccountTrasactions from "./screens/AccountTrasactions";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./components/StackNav";
import { createStackNavigator } from "@react-navigation/stack";

const recoveryPhraseKeyName = "recoveryPhrase";

export default function App() {
  const [screen, setScreen] = useState("create");
  const [account, setAccount] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState("");

  useEffect(() => {
    console.log("ACCOUNT: ", account);
    if (account?.address) {
      setScreen("wallet");
    }
  }, [account]);
  // useEffect(() => {
  //   console.log("RECOVERY_SEED_PHRASE: ", seedPhrase);
  // }, [seedPhrase]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <GlobalContext.Provider value={{ screen, setScreen }}>
        <AccountContext.Provider
          value={{ account, setAccount, seedPhrase, setSeedPhrase }}
        >
          <View style={appStyles.container}>
            <NavigationContainer>
              <StackNav />
            </NavigationContainer>
            {/* {account && <BottomNavbar />} */}
            {/* {screen === "create" && <CreateWallet />}
            {screen === "wallet" && account && (
              <WalletDashboard account={account} />
            )}
            {screen === "send" && <MakeTransactionScreen />}
            {screen === "history" && <AccountTrasactions account={account} />} */}
            {/* <StatusBar style="auto" /> */}
          </View>
        </AccountContext.Provider>
      </GlobalContext.Provider>
    </TouchableWithoutFeedback>
  );
}
