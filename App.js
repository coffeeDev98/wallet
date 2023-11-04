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
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./components/StackNav";
import { GlobalContext } from "./context/global";
import MakeTransactionScreen from "./screens/MakeTransactionScreen";
import BottomNavbar from "./components/BottomNavbar";
import AccountTrasactions from "./screens/AccountTrasactions";

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
            {/* <NavigationContainer>
            <StackNav />
          </NavigationContainer> */}
            {screen === "create" && <CreateWallet />}
            {/* <Hr /> */}
            {/* <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text>Address:</Text>
          <Text>{account?.address}</Text>
        </View> */}
            {screen === "wallet" && account && (
              <WalletDashboard account={account} />
            )}
            {screen === "send" && <MakeTransactionScreen />}
            {screen === "history" && <AccountTrasactions account={account} />}
            {/* <StatusBar style="auto" /> */}
            {account && <BottomNavbar />}
          </View>
        </AccountContext.Provider>
      </GlobalContext.Provider>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  seedPhraseInputContainer: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  seedPhraseInput: {
    borderWidth: 1,
    padding: 10,
    maxWidth: 240,
    borderColor: "#777",
  },
});
